from pathlib import Path
import base64,csv,hashlib,json,subprocess,zipfile
ROOT=Path(__file__).resolve().parent
DIST=ROOT/'dist';DIST.mkdir(exist_ok=True)
html=(ROOT/'src/index.template.html').read_text()
html=html.replace('/* STYLE */',(ROOT/'src/style.css').read_text())
for token,name in [('CATALOG','catalog'),('MODEL','model'),('APP','app')]:html=html.replace('/* '+token+' */',(ROOT/('src/'+name+'.js')).read_text())
html=html.replace('__GUARDIAN__','data:image/png;base64,'+base64.b64encode((ROOT/'assets/guardian.png').read_bytes()).decode())
assert '/* STYLE */' not in html and '__GUARDIAN__' not in html
out=DIST/'Mythos_Online_Arvore_Passivas_v1.0.html';out.write_text(html);(DIST/'index.html').write_text(html)
data=json.loads(subprocess.check_output(['node','-e',"const t=require('./src/catalog.js');console.log(JSON.stringify({nodes:t.nodes.map(n=>({...n,description:t.lines(n)})),modifiers:t.MODS,families:t.families.map(f=>({key:f.key,name:f.name})),groups:t.groups.length,edges:t.edges.length}))"],cwd=ROOT,text=True))
(DIST/'catalogo.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
with (DIST/'CATALOGO_PASSIVAS.csv').open('w',newline='',encoding='utf-8-sig') as f:
 writer=csv.writer(f,delimiter=';');writer.writerow(['ID','Título','Afinidade','Tipo','Efeitos','Conexões'])
 families={f['key']:f['name'] for f in data['families']}
 for n in data['nodes']:
  if n['id']=='root':continue
  writer.writerow([n['id'],n['title'],families[n['family']],n['type'],' | '.join(n['description']),', '.join(n['neighbors'])])
archive=DIST/'Mythos_Online_Arvore_Passivas_v1.0.zip'
with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED,compresslevel=9) as z:
 for f in [out,DIST/'catalogo.json',DIST/'CATALOGO_PASSIVAS.csv']:z.write(f,f.name)
 for name in ['README.md','LEIA-ME.txt','ATRIBUTOS_PASSIVOS.md','VALIDACAO.md','build.py']:z.write(ROOT/name,name)
 for folder in ['src','assets','tests']:
  for p in sorted((ROOT/folder).rglob('*')):
   if p.is_file() and '__pycache__' not in p.parts:z.write(p,str(p.relative_to(ROOT)))
 assert z.testzip() is None
checksums={p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in [out,archive]};(DIST/'SHA256SUMS.json').write_text(json.dumps(checksums,indent=2)+'\n')
print(json.dumps({'html_bytes':out.stat().st_size,'zip_bytes':archive.stat().st_size,'passives':len(data['nodes'])-1,'groups':data['groups'],'modifiers':len(data['modifiers'])},indent=2))
