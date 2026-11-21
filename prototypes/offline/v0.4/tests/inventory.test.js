const {test}=require('node:test');
const assert=require('node:assert/strict');
const C=require('../src/core.js');
const I=require('../src/inventory-model.js');
test('quantidade de moedas rejeita zero, frações, sinal, notação e saldo insuficiente',()=>{
 for(const value of ['',null,1,'0','000','-1','+1','1.5','1e2','Infinity','NaN','101','9007199254740993'])assert.equal(I.dropAmount(value,100),null);
 assert.equal(I.dropAmount('1',100),1);assert.equal(I.dropAmount('010',100),10);assert.equal(I.dropAmount('100',100),100);assert.equal(I.dropAmount('1',NaN),null);
});
test('moedas no chão são limitadas, validadas e não duplicadas ao importar',()=>{
 const valid={id:'a',amount:23,x:715,y:1690,life:100};
 const raw=[valid,valid,{...valid,id:'b',amount:-1},{...valid,id:'c',amount:1.5},{...valid,id:'d',x:Infinity},{...valid,id:'e',life:0}];
 const out=I.groundGold(raw);assert.equal(out.length,1);assert.equal(out[0].amount,23);assert.equal(out[0].playerDropped,true);
 assert.equal(I.groundGold([{...valid,life:10000}])[0].life,120);assert.deepEqual(I.groundGold(undefined),[]);
});
test('personagens antigos continuam válidos e retirar armadura persiste',()=>{
 const old=C.fresh();old.equipment={weapon:'espada',shield:'escudo',armor:'cota'};
 const loaded=C.validateSave(old);assert.equal(loaded.equipment.armor,'cota');assert.equal(loaded.equipment.wings,null);assert.equal(I.entries(loaded).length,2);
 loaded.equipment.armor=null;const back=C.validateSave(JSON.parse(JSON.stringify(loaded)));assert.equal(back.equipment.armor,null);C.enforceEquipment(back);assert.equal(back.equipment.armor,null);assert.equal(I.entries(back).length,3);assert.equal(C.stats(back).defense,25);
});
