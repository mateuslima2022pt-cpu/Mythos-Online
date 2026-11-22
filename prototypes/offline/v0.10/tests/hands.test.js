const {test}=require('node:test');
const assert=require('node:assert/strict');
const C=require('../src/core.js');
const I=require('../src/inventory-model.js');
const training=()=>{const p=C.fresh();p.bag.push('espadao_treino');return p;};
test('arma de uma mão vai para esquerda por padrão e escudo nunca ocupa esquerda',()=>{
 const p=C.fresh();assert.equal(p.equipment.weapon,'espada');assert.equal(p.equipment.offhand,'escudo');
 const before=JSON.stringify(p.equipment);assert.equal(C.equip(p,'escudo','weapon'),false);assert.equal(JSON.stringify(p.equipment),before);
 assert.equal(C.equip(p,'espada','offhand'),true);assert.equal(p.equipment.weapon,null);assert.equal(p.equipment.offhand,'espada');assert.equal(C.shieldItem(p),null);
 assert.equal(C.equip(p,'espada'),true);assert.equal(p.equipment.weapon,'espada');assert.equal(p.equipment.offhand,null);assert.equal(p.bag.filter(id=>id==='espada').length,1);
});
test('duas mãos vinculam dois slots ao mesmo item sem duplicar poder ou propriedade',()=>{
 const p=training();assert.equal(C.equip(p,'espadao_treino'),true);
 assert.equal(p.equipment.weapon,'espadao_treino');assert.equal(p.equipment.offhand,'espadao_treino');assert.equal(p.equipment.shield,null);
 assert.equal(C.stats(p).secondaryPower,0);assert.equal(C.stats(p).power,21);assert.equal(C.stats(p).defense,60);
 assert.equal(C.shieldItem(p),null);assert.equal(p.bag.filter(id=>id==='espadao_treino').length,1);assert.equal(I.entries(p).filter(i=>i.id==='espadao_treino').length,0);
 assert.equal(C.unequip(p,'offhand'),true);assert.equal(p.equipment.weapon,null);assert.equal(p.equipment.offhand,null);assert.equal(I.entries(p).filter(i=>i.id==='espadao_treino').length,1);
});
test('trocar uma arma de duas mãos libera a outra mão e preserva os itens na mochila',()=>{
 const p=training();C.equip(p,'espadao_treino');C.equip(p,'escudo');assert.equal(p.equipment.weapon,null);assert.equal(p.equipment.offhand,'escudo');assert.equal(C.shieldItem(p).id,'escudo');
 C.equip(p,'espadao_treino','offhand');C.equip(p,'espada');assert.equal(p.equipment.weapon,'espada');assert.equal(p.equipment.offhand,null);assert.equal(I.entries(p).filter(i=>i.id==='espadao_treino').length,1);
});
test('troca que excede a capacidade falha antes de alterar as mãos',()=>{
 const p=training();for(let i=0;i<45;i++)p.bag.push('fixture-'+i);const before=JSON.stringify(p.equipment);assert.equal(I.entries(p).length,48);
 assert.equal(C.equip(p,'espadao_treino'),false);assert.equal(JSON.stringify(p.equipment),before);
 p.bag.pop();assert.equal(C.equip(p,'espadao_treino'),true);assert.equal(I.entries(p).length,48);
});
test('saves antigos migram escudo; duas mãos restauram o vínculo; uma mão não é duplicada',()=>{
 const old=C.fresh();old.equipment={weapon:'espada',shield:'escudo',armor:'cota'};const migrated=C.validateSave(old);assert.equal(migrated.equipment.offhand,'escudo');
 const p=training();C.equip(p,'espadao_treino');p.equipment.offhand='escudo';const back=C.validateSave(JSON.parse(JSON.stringify(p)));assert.equal(back.equipment.weapon,'espadao_treino');assert.equal(back.equipment.offhand,'espadao_treino');assert.equal(back.bag.filter(id=>id==='espadao_treino').length,1);
 old.equipment.offhand='espada';const one=C.validateSave(old);assert.equal(one.equipment.weapon,'espada');assert.equal(one.equipment.offhand,null);
});
test('mão secundária respeita requisitos e não conta como escudo',()=>{
 const p=C.fresh();p.bag.push('lamina');const before=JSON.stringify(p.equipment);assert.equal(C.equip(p,'lamina','offhand'),false);assert.equal(JSON.stringify(p.equipment),before);
 while(p.level<5)C.gainXP(p,C.xpFor(p.level));for(let i=0;i<5;i++)C.allocate(p,'forca');assert.equal(C.equip(p,'lamina','offhand'),true);assert.equal(C.dualWield(p),true);assert.equal(C.shieldItem(p),null);assert.ok(C.stats(p).secondaryPower>0);
});
test('slots de mãos ficam na mesma linha, um de cada lado da bota',()=>{
 const primary=I.SLOTS.find(s=>s.key==='weapon'),boots=I.SLOTS.find(s=>s.key==='boots'),secondary=I.SLOTS.find(s=>s.key==='offhand');
 assert.equal(I.SLOTS.length,16);assert.equal(primary.y,boots.y);assert.equal(secondary.y,boots.y);assert.ok(primary.x<boots.x&&secondary.x>boots.x);
});
