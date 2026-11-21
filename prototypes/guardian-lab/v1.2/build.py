from pathlib import Path
import json,base64
r=Path(__file__).parent
atlas=json.loads((r/'assets/registered/runtime-atlas.json').read_text());images={name:'data:image/png;base64,'+base64.b64encode((r/sheet['file']).read_bytes()).decode() for name,sheet in atlas['sources'].items()}
data={'atlas':atlas,'images':images}
html=(r/'src/index.template.html').read_text().replace('<!--DATA-->','<script>const GuardianData='+json.dumps(data,separators=(',',':'))+';</script>').replace('<!--SCRIPTS-->','\n'.join('<script>\n'+(r/'src'/name).read_text()+'\n</script>' for name in ['engine.js','palette.js','renderer.js','app.js']))
(r/'Mythos_Online_Guardiao_Laboratorio_v1.2.html').write_text(html,encoding='utf-8');(r/'index.html').write_text(html,encoding='utf-8');print('HTML offline:',round(len(html.encode())/1024/1024,2),'MB')
