"""Máscara e orientação são essenciais: não pode aparecer um quadrado preto."""
import importlib.util,struct,unittest,zlib
from pathlib import Path

spec=importlib.util.spec_from_file_location('convert',Path(__file__).resolve().parents[1]/'tools/convert_cursors.py')
convert=importlib.util.module_from_spec(spec);spec.loader.exec_module(convert)

class CursorConversion(unittest.TestCase):
    def test_dib_bottom_up_and_mask_become_rgba(self):
        # Imagem 2x2: vermelho/verde em cima, azul/branco embaixo.
        # O verde é transparente. Linhas DIB são de baixo para cima e alinhadas a 4 bytes.
        header=struct.pack('<IiiHHIIiiII',40,2,4,1,24,0,0,0,0,0,0)
        pixels=bytes([255,0,0,255,255,255,0,0, 0,0,255,0,255,0,0,0])
        # Pixel mascarado tem XOR preto (não há operação de inversão).
        pixels=pixels[:11]+bytes([0,0,0])+pixels[14:]
        mask=bytes([0,0,0,0, 64,0,0,0])
        dib=header+pixels+mask
        raw=struct.pack('<HHHBBBBHHII',0,2,1,2,2,0,0,1,1,len(dib),22)+dib
        frame=convert.decode_cur(raw)
        self.assertEqual(frame['hotspot'],[1,1]);self.assertEqual(frame['transparent_pixels'],1)
        encoded=frame['png'];pos=8;idat=b''
        while pos<len(encoded):
            size=struct.unpack_from('>I',encoded,pos)[0];tag=encoded[pos+4:pos+8]
            if tag==b'IDAT':idat+=encoded[pos+8:pos+8+size]
            pos+=size+12
        self.assertEqual(zlib.decompress(idat),bytes([0,255,0,0,255,0,0,0,0, 0,0,0,255,255,255,255,255,255]))

if __name__=='__main__':unittest.main()
