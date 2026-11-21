"""Transcodifica CUR/ANI do usuário em PNG RGBA, sem alterar a arte.

Preserva AND mask, hotspots, ordem e tempos RIFF (jiffies/60). Biblioteca padrão.
Os originais são mantidos em assets/cursors/original.
"""
from pathlib import Path
import base64, hashlib, json, struct, zlib

ROOT = Path(__file__).resolve().parents[1]
NAMES = {'normal':'CursorNormal.ani','attack':'Atack.cur','gather':'Coleta.ani',
         'pickup':'PegarItens.cur','talk':'ConversasNPC.cur','quest':'MissaoCompleta.cur'}

def chunks(data, offset=0):
    while offset + 8 <= len(data):
        tag, size = struct.unpack_from('<4sI', data, offset)
        end = offset + 8 + size
        if end > len(data): raise ValueError('Chunk RIFF truncado')
        yield tag, data[offset+8:end]
        offset = end + size % 2

def png(width, height, rgba):
    def chunk(tag, content):
        return struct.pack('>I', len(content))+tag+content+struct.pack('>I',zlib.crc32(tag+content)&0xffffffff)
    rows=b''.join(b'\0'+bytes(rgba[y*width*4:(y+1)*width*4]) for y in range(height))
    return b'\x89PNG\r\n\x1a\n'+chunk(b'IHDR',struct.pack('>IIBBBBB',width,height,8,6,0,0,0))+chunk(b'IDAT',zlib.compress(rows,9))+chunk(b'IEND',b'')

def decode_cur(data):
    reserved, kind, count=struct.unpack_from('<HHH',data)
    if reserved or kind!=2 or not count: raise ValueError('CUR inválido')
    entries=[struct.unpack_from('<BBBBHHII',data,6+i*16) for i in range(count)]
    entry=max(entries,key=lambda e:(e[0] or 256)*(e[1] or 256))
    _,_,_,_,hx,hy,size,offset=entry
    dib=data[offset:offset+size]
    head,w,double_h,planes,bits,compression=struct.unpack_from('<IiiHHI',dib)
    if head<40 or planes!=1 or compression!=0 or bits not in (1,4,8,24,32):
        raise ValueError('Formato DIB não suportado')
    h=abs(double_h)//2
    if not 0<w<=256 or not 0<h<=256: raise ValueError('Dimensão inválida')
    used=struct.unpack_from('<I',dib,32)[0]
    colors=(used or 1<<bits) if bits<=8 else 0
    palette=[tuple(dib[head+i*4:head+i*4+3][::-1]) for i in range(colors)]
    xor_start=head+colors*4;xor_stride=((w*bits+31)//32)*4
    and_start=xor_start+xor_stride*h;and_stride=((w+31)//32)*4
    if and_start+and_stride*h>len(dib): raise ValueError('Máscara truncada')
    meaningful_alpha=bits==32 and any(dib[xor_start+y*xor_stride+x*4+3] for y in range(h) for x in range(w))
    rgba=bytearray();inverted=0;transparent=0
    for y in range(h):
        row=h-1-y if double_h>0 else y
        for x in range(w):
            pos=xor_start+row*xor_stride
            if bits==24: b,g,r=dib[pos+x*3:pos+x*3+3];a=255
            elif bits==32: b,g,r,a=dib[pos+x*4:pos+x*4+4];a=a if meaningful_alpha else 255
            else:
                shift=8-bits-(x*bits%8);index=(dib[pos+x*bits//8]>>shift)&((1<<bits)-1)
                r,g,b=palette[index];a=255
            masked=(dib[and_start+row*and_stride+x//8]>>(7-x%8))&1
            if masked:
                if r or g or b: inverted+=1
                a=0;transparent+=1
            rgba.extend((r,g,b,a))
    if not(0<=hx<w and 0<=hy<h): raise ValueError('Hotspot inválido')
    return {'width':w,'height':h,'hotspot':[hx,hy],'png':png(w,h,rgba),'inverted_pixels':inverted,'transparent_pixels':transparent}

def decode_ani(data):
    if data[:4]!=b'RIFF' or data[8:12]!=b'ACON': raise ValueError('ANI inválido')
    header=None;order=None;rates=None;frames=[]
    for tag,body in chunks(data,12):
        if tag==b'anih':header=struct.unpack_from('<9I',body)
        elif tag==b'seq ':order=list(struct.unpack('<'+'I'*(len(body)//4),body))
        elif tag==b'rate':rates=list(struct.unpack('<'+'I'*(len(body)//4),body))
        elif tag==b'LIST' and body[:4]==b'fram':
            frames.extend(decode_cur(icon) for name,icon in chunks(body,4) if name==b'icon')
    if header is None or len(frames)!=header[1]:raise ValueError('Número de frames incompatível')
    steps=header[2];order=order if order is not None else [i%len(frames) for i in range(steps)]
    rates=rates if rates is not None else [header[7]]*steps
    if len(order)!=steps or len(rates)!=steps or any(i>=len(frames) for i in order):raise ValueError('Sequência inválida')
    return frames,order,[max(1,t)*1000/60 for t in rates]

def convert():
    result={};folder=ROOT/'assets/cursors';frame_dir=folder/'frames';frame_dir.mkdir(parents=True,exist_ok=True)
    for name,source in NAMES.items():
        raw=(folder/'original'/source).read_bytes()
        frames,sequence,durations=decode_ani(raw) if source.endswith('.ani') else ([decode_cur(raw)],[0],[1000])
        out=[]
        for i,f in enumerate(frames):
            file=f'{name}-{i:02}.png';(frame_dir/file).write_bytes(f['png'])
            out.append({'width':f['width'],'height':f['height'],'hotspot':f['hotspot'],
                        'src':'data:image/png;base64,'+base64.b64encode(f['png']).decode()})
        result[name]={'source':source,'sha256':hashlib.sha256(raw).hexdigest(),'frames':out,'sequence':sequence,'durations':durations}
        print(f'{source}: {len(frames)} frame(s), hotspots {sorted(set(tuple(f["hotspot"]) for f in frames))}, duração {sum(durations):.2f} ms, pixels de inversão {sum(f["inverted_pixels"] for f in frames)}')
        # Os seis arquivos fornecidos usam transparência normal; inversão requer outro compositing.
        if any(f['inverted_pixels'] for f in frames): raise ValueError('Cursor exige inversão de cores do fundo')
    (folder/'cursors.json').write_text(json.dumps(result,separators=(',',':')))
    return result

if __name__=='__main__':convert()
