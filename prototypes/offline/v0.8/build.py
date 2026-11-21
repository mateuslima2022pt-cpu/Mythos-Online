"""Empacota o jogo em um único HTML que funciona também por file://.
Python 3, biblioteca padrão. Nenhum servidor ou instalação no cliente.
"""
from pathlib import Path
import base64, json, shutil, zipfile, runpy

ROOT = Path(__file__).resolve().parent
DIST = ROOT / 'dist'
DIST.mkdir(exist_ok=True)

def data_url(name):
    return 'data:image/png;base64,' + base64.b64encode((ROOT/'assets'/name).read_bytes()).decode('ascii')

runpy.run_path(str(ROOT/'tools/convert_cursors.py'),run_name='__main__')
html = (ROOT/'src/index.template.html').read_text()
css = ((ROOT/'src/style.css').read_text() + '\n' + (ROOT/'src/interface.css').read_text() + '\n' + (ROOT/'src/inventory.css').read_text() + '\n' + (ROOT/'src/character.css').read_text()).replace('__COVER_DATA__', data_url('cover.png')).replace('__INVENTORY_FRAME__', data_url('inventory-frame.png'))
scripts = '\n'.join((ROOT/'src'/name).read_text() for name in ['world.js', 'render.js', 'ui.js', 'cursor-rules.js', 'cursor.js', 'inventory-model.js', 'inventory.js', 'character-model.js', 'character.js', 'game.js'])
scripts='window.MythosCursorAssets='+ (ROOT/'assets/cursors/cursors.json').read_text() + ';\n' + scripts
for token, name in [('__TREES_DATA__','trees.png'),('__GUARDIAN_DATA__','guardian.png'),('__MONSTERS_DATA__','monsters.png'),('__INVENTORY_ITEMS__','inventory-items.png'),('__INVENTORY_REFERENCE__','inventory-reference.png')]:
    scripts = scripts.replace(token, data_url(name))
html = html.replace('/* INLINE_STYLE */', css).replace('/* INLINE_CORE */', (ROOT/'src/core.js').read_text()).replace('/* INLINE_GAME */', scripts)
assert '__TREES_DATA__' not in html and '/* INLINE_' not in html
target = DIST/'Mythos_Online_Offline_v0.8.html'
target.write_text(html)
# Exact same self-contained build is used by the managed preview.
(DIST/'index.html').write_text(html)
for name in ['LEIA-ME.txt', 'ARQUITETURA.md', 'CHANGELOG.md', 'VALIDACAO.md']:
    if (ROOT/name).exists(): shutil.copy2(ROOT/name, DIST/name)
archive = DIST/'Mythos_Online_Offline_v0.8.zip'
with zipfile.ZipFile(archive, 'w', zipfile.ZIP_DEFLATED, compresslevel=9) as z:
    z.write(target, target.name)
    for name in ['LEIA-ME.txt', 'ARQUITETURA.md', 'CHANGELOG.md', 'VALIDACAO.md', 'build.py']:
        if (ROOT/name).exists(): z.write(ROOT/name, name)
    for folder in ['src', 'assets', 'tests', 'tools']:
        for p in sorted((ROOT/folder).rglob('*')):
            if p.is_file() and '__pycache__' not in p.parts and p.suffix!='.pyc': z.write(p, str(p.relative_to(ROOT)))
    assert z.testzip() is None
print(json.dumps({'html_bytes': target.stat().st_size, 'zip_bytes': archive.stat().st_size, 'output': str(DIST)}, indent=2))
