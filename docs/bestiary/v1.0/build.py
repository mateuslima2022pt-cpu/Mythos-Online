from pathlib import Path
import json,csv,html,base64,re,zipfile,hashlib,struct,textwrap
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import landscape,A4
from reportlab.lib.utils import ImageReader
R=Path(__file__).resolve().parent;d=json.loads((R/'catalogo.json').read_text());cs=json.loads((R/'chapters.json').read_text());E=html.escape
profiles=[['Físico','Mágico','Físico','Físico','Físico','Veneno','Físico','Mágico / Veneno'],['Veneno','Físico','Fogo','Físico / Veneno','Fogo / Físico','Fogo','Fogo','Fogo / Físico'],['Físico','Mágico','Físico','Físico','Físico','Fogo','Fogo / Físico','Mágico / Físico'],['Veneno','Físico / Sangramento','Físico','Físico','Veneno / Físico','Físico','Mágico','Físico / Mágico'],['Físico / Veneno','Físico','Físico','Físico','Físico','Mágico','Mágico / Físico','Fogo / Mágico'],['Gelo / Físico','Gelo','Físico','Físico','Físico / Gelo','Gelo','Físico / Gelo','Gelo'],['Fogo','Fogo','Físico','Fogo / Físico','Fogo / Físico','Fogo','Físico / Fogo','Fogo'],['Raio','Físico','Raio','Mágico','Raio / Físico','Mágico','Físico','Raio / Mágico'],['Mágico','Mágico','Mágico / Físico','Físico / Mágico','Mágico','Mágico','Mágico','Mágico'],['Mágico','Mágico / Físico','Mágico','Físico','Mágico / Físico','Mágico','Mágico','Mágico']]
profiles.append(['Físico','Mágico','Físico / Mágico'])
for m in d['monsters']:
 i=int(m['chapter'])-1;slot=m['slot'];m['damageType']=profiles[i][slot];m['attackCooldown']=m.pop('attackInterval',m.get('attackCooldown',2));m['speed']=({'Broto de Esporos':48,'Gosma de Éter':39,'Lobo das Raízes':78,'Cerne Corrompido':42}.get(m['name'],42+i*2+(8 if slot in[2,3] else 0)));m['range']=({'Broto de Esporos':42,'Gosma de Éter':180,'Lobo das Raízes':47,'Cerne Corrompido':110}.get(m['name'],180 if slot in[5,7] and any(x in m['damageType'] for x in ['Mágico','Fogo','Gelo','Raio']) else 55))
(R/'catalogo.json').write_text(json.dumps(d,ensure_ascii=False,indent=2))
keys=['id','name','level','rank','region','place','party','hp','attack','physicalDefense','magicDefense','damageType','attackCooldown','speed','range','xp','difficulty','mechanic','respawn','control','enrage','status']
with (R/'CATALOGO_MONSTROS.csv').open('w',newline='',encoding='utf-8-sig') as f:
 w=csv.DictWriter(f,fieldnames=keys,extrasaction='ignore',delimiter=';');w.writeheader();w.writerows(d['monsters'])
N=lambda n:format(n,',').replace(',','.')
css='''*{box-sizing:border-box}body{margin:0;background:#0a0e13;color:#d8d0be;font:16px/1.6 Georgia,serif}header,main,footer{max-width:1400px;margin:auto;padding:30px}header{border-bottom:1px solid #9c783f}h1,h2,h3{font-weight:400;color:#e2c18a;line-height:1.2}h1{font-size:44px;margin:5px 0}h2{font-size:32px}h3{font-size:23px;margin:6px 0}small,.muted{color:#ab9d83}.tag{color:#dfb66f;font-size:12px;letter-spacing:2px}nav{display:flex;gap:10px;flex-wrap:wrap}a{color:#d9ba82}nav a,button,select,input{color:#dfc898;background:#171b21;border:1px solid #765c37;padding:9px 12px;border-radius:3px;font:14px Georgia}input{min-width:260px}button{cursor:pointer}.filters{display:flex;gap:12px;flex-wrap:wrap;position:sticky;top:0;background:#0c1118f5;padding:15px;z-index:3;border:1px solid #6f5635;margin:25px 0}.chapter{padding-top:25px;margin-top:40px;border-top:1px solid #9b7940}.board{display:block;width:100%;height:auto;border:1px solid #947341;margin:18px 0}.cards{display:grid;grid-template-columns:1fr 1fr;gap:18px}.card{border:1px solid #685333;padding:20px;background:linear-gradient(135deg,#20252d,#11171d);scroll-margin-top:95px}.badge{display:inline-block;font-size:12px;border:1px solid #7d6746;padding:2px 7px;margin:3px 5px 6px 0;color:#d0bc99}.live{border-color:#6d9a7a;color:#afc5ae}.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:14px 0}.stats span{font-size:12px;color:#a79a84}.stats b{display:block;font-size:19px;color:#dad0ea;font-weight:400}.card p{font-size:14px;margin:8px 0}.places{width:100%;border-collapse:collapse;font-size:14px;margin:18px 0}.places th,.places td{text-align:left;border-bottom:1px solid #6c563c;padding:10px}.notes{padding:20px;border:1px solid #765d39;background:#191b20;margin:20px 0}.cards [hidden],section[hidden]{display:none!important}@media(max-width:800px){.cards{grid-template-columns:1fr}h1{font-size:32px}header,main,footer{padding:20px}.places{font-size:12px}}@media print{.filters,nav,button{display:none}.card{break-inside:avoid}body{background:white;color:#191919}.chapter{break-before:page}.cards{display:block}.board{max-height:80vh;object-fit:contain}.card{background:white}h1,h2,h3{color:#493919}}'''
parts=['<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Mythos Online · Bestiário v1.0</title><style>'+css+'</style><header><span class="tag">MYTHOS ONLINE · CATÁLOGO DE CONTEÚDO v1.0</span><h1>Bestiário de Elyndra</h1><p>83 fichas ilustradas · níveis 1–99 · 10 áreas e 11 instâncias PvE.</p><p class="muted">Proposta de progressão e balanceamento. Quatro encontros já existem no protótipo v0.9; as novas artes são conceitos para análise, não sprites aplicados ao jogo.</p><nav>']
for c in cs:parts.append(f'<a href="#chapter{c[0]}">{E(c[3])}</a>')
parts.append('</nav></header><main><aside class="notes"><b>Como ler:</b> HP é vida máxima; ATQ é dano-base bruto por golpe; DF/DM são defesa física/mágica. A defesa usa 500 / (500 + defesa), não uma porcentagem direta. Grupo, experiência, drops e resistências das novas fichas são propostas. Sinais de ataque incluem forma e som, além de cor. Nenhum chefe exige uma classe exclusiva ou possuir voo.</aside><div class="filters"><input id="search" type="search" placeholder="Buscar nome, local, nível ou tipo..."><select id="rank"><option value="">Todas as categorias</option>')
for rank in sorted({m['rank'] for m in d['monsters']}):parts.append(f'<option>{E(rank)}</option>')
parts.append('</select><select id="state"><option value="">Todos os estados</option><option>No protótipo v0.9</option><option>Proposta v1.0</option></select><button id="reset">Limpar filtros</button><span id="count">83 fichas</span></div>')
for c in cs:
 num,area,region,band,climate,dungeon,party,low,high,_=c
 parts.append(f'<section class="chapter" id="chapter{num}"><span class="tag">{E(region)} · NÍVEIS {E(band)}</span><h2>{E(area)}</h2><p>{E(climate)}. Instância: <b>{E(dungeon)}</b> · {low}–{high} · {party} jogadores.</p><img class="board" src="png/{num}.png" alt="Prancha de criaturas de {E(area)}"><div class="cards">')
 for m in [m for m in d['monsters'] if m['chapter']==num]:
  text=' '.join(str(m[k]) for k in ['id','name','level','rank','region','place','damageType']);res=', '.join(f'{k}: {v}%' for k,v in m['resistances'].items());res=res.replace('fire','fogo').replace('cold','gelo').replace('lightning','raio').replace('poison','veneno')
  parts.append(f'<article class="card" id="{m["id"]}" data-search="{E(text,quote=True)}" data-rank="{E(m["rank"])}" data-state="{E(m["status"])}"><span class="tag">{m["id"]} · NV. {m["level"]}</span><h3>{E(m["name"])}</h3><span class="badge">{E(m["rank"])}</span><span class="badge {"live" if m["status"].startswith("No") else ""}">{E(m["status"])}</span><p><b>Local:</b> {E(m["place"])}<br><b>Dificuldade:</b> {E(m["difficulty"])} · <b>Grupo:</b> {m["party"]} jogador(es)</p><div class="stats">'+''.join(f'<div><span>{label}</span><b>{N(m[key])}</b></div>' for label,key in [('HP','hp'),('ATQ','attack'),('DF','physicalDefense'),('DM','magicDefense')])+f'</div><p><b>Dano:</b> {E(m["damageType"])} · <b>EXP:</b> {N(m["xp"])}<br><b>Recarga de ataque:</b> {m["attackCooldown"]} s · <b>Preparo:</b> {m["telegraph"]}<br><b>Movimento:</b> {m["speed"]} unid./s · <b>Alcance:</b> {m["range"]} unidades</p><p><b>Resistências:</b> {res}</p><p><b>Mecânica:</b> {E(m["mechanic"])}</p><p><b>Controle:</b> {E(m["control"])}<br><b>Enrage:</b> {E(m["enrage"])}</p><p><b>Reaparecimento:</b> {E(m["respawn"])}<br><b>Recompensas:</b> {E(m["loot"])}</p></article>')
 parts.append('</div></section>')
parts.append('<section class="chapter"><h2>Áreas e instâncias</h2><table class="places"><thead><tr><th>Local</th><th>Região</th><th>Níveis</th><th>Formato</th><th>Grupo / duração</th></tr></thead><tbody>')
for p in d['places']:parts.append(f'<tr><td>{E(p["name"])}</td><td>{E(p["region"])}</td><td>{E(p["levels"])}</td><td>{E(p["kind"])}</td><td>{E(str(p["party"]))} · {E(p["duration"])}</td></tr>')
parts.append('</tbody></table></section><aside class="notes"><h2>Critérios da proposta</h2><p>Os capítulos são faixas de planejamento; não obrigam uma rota linear. Chefes regionais são eventos públicos; dungeons têm reinício de instância; a última instância propõe raid de 8 jogadores. Entradas seguras e caminhos terrestres mantêm o PvE acessível sem voo. O boss inicial Cerne Corrompido permanece solo.</p><p>Recompensas indicam categorias, sem prometer drop garantido ou taxas finais de raridade. Valores de refino e pedras seguem seus próprios sistemas. Modos heroicos, variantes sazonais e expansões futuras terão fichas versionadas quando definidos.</p></aside></main><footer>Mythos Online · Bestiário v1.0 · Proposta para avaliação · O jogo v0.9 não foi alterado.</footer><script>const norm=s=>s.normalize("NFD").replace(/[\\u0300-\\u036f]/g,"").toLowerCase();const $=id=>document.getElementById(id);function filter(){let total=0;for(const chapter of document.querySelectorAll("section.chapter[id]")){let matches=0;for(const card of chapter.querySelectorAll(".card")){const ok=norm(card.dataset.search).includes(norm($("search").value.trim()))&&(!$("rank").value||card.dataset.rank===$("rank").value)&&(!$("state").value||card.dataset.state===$("state").value);card.hidden=!ok;if(ok)matches++;}chapter.hidden=!matches;total+=matches;}$("count").textContent=total+" fichas";}for(const id of ["search","rank","state"])$(id).addEventListener(id==="search"?"input":"change",filter);$("reset").onclick=()=>{for(const id of ["search","rank","state"])$(id).value="";filter();};</script></html>')
relative=''.join(parts);(R/'index.html').write_text(relative)
embedded=relative
for c in cs:embedded=embedded.replace('src="png/'+c[0]+'.png"','src="data:image/png;base64,'+base64.b64encode((R/'png'/f'{c[0]}.png').read_bytes()).decode()+'"')
(R/'Mythos_Online_Bestiario_v1.0.html').write_text(embedded)
# PDF: index + ten illustrated spreads and ten concise encounter sheets.
W,H=landscape(A4);pdf=canvas.Canvas(str(R/'Mythos_Online_Bestiario_v1.0.pdf'),pagesize=(W,H));pdf.setTitle('Mythos Online — Bestiário v1.0');page=0
from reportlab.lib.colors import HexColor
from reportlab.lib.utils import simpleSplit
def base(title):
 global page
 page+=1;pdf.setFillColor(HexColor('#0b1118'));pdf.rect(0,0,W,H,fill=1,stroke=0);pdf.setFillColor(HexColor('#e0c08a'));pdf.setFont('Times-Roman',20);pdf.drawString(25,H-35,title);pdf.setStrokeColor(HexColor('#8d703f'));pdf.line(25,H-45,W-25,H-45);pdf.setFont('Helvetica',8);pdf.setFillColor(HexColor('#aea38e'));pdf.drawString(25,18,'MYTHOS ONLINE · BESTIÁRIO v1.0 · Proposta de conteúdo e balanceamento');pdf.drawRightString(W-25,18,str(page))
base('Bestiário de Elyndra · Progressão 1–99');pdf.setFont('Helvetica',11);y=H-80
for line in ['83 fichas · 11 pranchas PNG · 10 áreas abertas e 11 instâncias PvE.','Quatro criaturas preservam os dados do protótipo; demais encontros são propostas.','As imagens são conceitos visuais novos e ainda não foram aplicadas ao jogo.']:
 pdf.drawString(25,y,line);y-=20
for c in cs:pdf.drawString(25,y,f'{c[3]}   {c[1]}   /   {c[5]}');y-=26
pdf.setFont('Helvetica',9)
for line in simpleSplit('HP: vida máxima. ATQ: dano-base bruto. DF/DM: defesa física/mágica. Recarga não inclui todo o tempo de animação. Os grupos e valores precisam de simulação e playtest; não são promessas de balanceamento final. Consulte o HTML, CSV e JSON para as fichas completas.', 'Helvetica',9,W-50):pdf.drawString(25,y-10,line);y-=14
pdf.showPage()
for c in cs:
 base(c[1]+' · Níveis '+c[3]);pdf.drawImage(str(R/'png'/f'{c[0]}.png'),25,45,width=W-50,height=H-105,preserveAspectRatio=True,anchor='c');pdf.showPage();base('Fichas · '+c[1]);ms=[m for m in d['monsters'] if m['chapter']==c[0]]
 for j,m in enumerate(ms):
  x=25+(j%2)*(W/2-10);y=H-65-(j//2)*124;cw=W/2-35;pdf.setStrokeColor(HexColor('#695737'));pdf.rect(x,y-115,cw,113,fill=0,stroke=1);pdf.setFillColor(HexColor('#e2c38b'));pdf.setFont('Times-Roman',11)
  title=f'{m["id"]} · {m["name"]} · Nv. {m["level"]}'
  pdf.drawString(x+8,y-15,title);pdf.setFillColor(HexColor('#ded6c9'));pdf.setFont('Helvetica',8)
  lines=[m['rank']+' · '+m['difficulty']+' · Grupo: '+str(m['party']),f'HP {N(m["hp"])} · ATQ {N(m["attack"])} · DF {m["physicalDefense"]} · DM {m["magicDefense"]}',f'{m["damageType"]} · Recarga {m["attackCooldown"]} s · EXP {N(m["xp"])}',m['status']]+simpleSplit(m['mechanic'],'Helvetica',8,cw-16)
  yy=y-29
  for line in lines[:8]:pdf.drawString(x+8,yy,line);yy-=10
 pdf.showPage()
pdf.save()
# Asset, relationship and prototype-data checks.
assert len(d['monsters'])==83 and len({m['id'] for m in d['monsters']})==83
assert len(d['places'])==21 and len({p['id'] for p in d['places']})==21
for m in d['monsters']:
 assert 1<=m['level']<=99 and all(m[k]>0 for k in ['hp','attack','physicalDefense','magicDefense','attackCooldown','speed','range','xp'])
 assert m['placeId'] in {p['id'] for p in d['places']}
for c in cs:
 ms=[m for m in d['monsters'] if m['chapter']==c[0]];assert len(ms)==(3 if c[0]=='11' else 8) and any(m['rank']=='Miniboss' for m in ms) and any(m['rank'].startswith('Chefe de') for m in ms)
 raw=(R/'png'/f'{c[0]}.png').read_bytes();assert raw[:8]==b'\x89PNG\r\n\x1a\n';width,height=struct.unpack('>II',raw[16:24]);assert width>1000 and height>700
for name,values in {'Broto de Esporos':(1,62,10,5),'Gosma de Éter':(2,76,12,8),'Lobo das Raízes':(3,108,17,20),'Cerne Corrompido':(5,640,33,45)}.items():
 m=next(m for m in d['monsters'] if m['name']==name);assert tuple(m[k] for k in ['level','hp','attack','physicalDefense'])==values
assert embedded.count('data:image/png;base64,')==11 and len(re.findall('<article class="card"',embedded))==83
(R/'filter-check.js').write_text(re.search('<script>(.*?)</script>',embedded,re.S).group(1))
# ZIP holds relative HTML + original PNGs, avoiding duplicate base64 art.
with zipfile.ZipFile(R/'Mythos_Online_Bestiario_PNG_v1.0.zip','w',zipfile.ZIP_DEFLATED,compresslevel=6) as z:
 for file in ['index.html','catalogo.json','CATALOGO_MONSTROS.csv','README.md','BALANCEAMENTO.md']:
  z.write(R/file,file)
 for p in sorted((R/'png').glob('*.png')):z.write(p,str(p.relative_to(R)))
 assert z.testzip() is None
sums={p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in R.iterdir() if p.suffix in ['.html','.pdf','.zip']};(R/'SHA256SUMS.json').write_text(json.dumps(sums,indent=2))
print(json.dumps({'monsters':83,'places':21,'png':11,'pdf_pages':page,'artifacts':{p.name:p.stat().st_size for p in R.iterdir() if p.suffix in ['.html','.pdf','.zip']}},indent=2))
