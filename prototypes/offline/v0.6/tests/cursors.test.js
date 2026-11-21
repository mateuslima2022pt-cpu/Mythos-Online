const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const R=require('../src/cursor-rules.js');
const root=path.resolve(__dirname,'..');
const assets=JSON.parse(fs.readFileSync(path.join(root,'assets/cursors/cursors.json')));
test('originais, frames, hotspots e ritmos correspondem aos seis arquivos fornecidos',()=>{
 const expected={normal:[10,0,0,4],gather:[7,10,31,3],attack:[1,2,0,null],pickup:[1,5,0,null],talk:[1,8,30,null],quest:[1,1,20,null]};
 for(const [name,[count,hx,hy,rate]] of Object.entries(expected)){
  const a=assets[name];assert.equal(a.frames.length,count);
  const raw=fs.readFileSync(path.join(root,'assets/cursors/original',a.source));assert.equal(crypto.createHash('sha256').update(raw).digest('hex'),a.sha256);
  for(const f of a.frames){assert.equal(f.width,32);assert.equal(f.height,32);assert.deepEqual(f.hotspot,[hx,hy]);const png=Buffer.from(f.src.split(',')[1],'base64');assert.equal(png.subarray(0,8).toString('hex'),'89504e470d0a1a0a');}
  if(rate)assert.ok(a.durations.every(ms=>Math.abs(ms-rate*1000/60)<1e-8));
 }
});
test('frame muda no tempo original e repete o ciclo sem depender do FPS do jogo',()=>{
 assert.equal(R.animationFrame(assets.normal,0),0);
 assert.equal(R.animationFrame(assets.normal,65),0);
 assert.equal(R.animationFrame(assets.normal,67),1);
 assert.equal(R.animationFrame(assets.normal,667),0);
 assert.equal(R.animationFrame(assets.gather,49),0);
 assert.equal(R.animationFrame(assets.gather,50),1);
 assert.equal(R.animationFrame(assets.gather,349),6);
 assert.equal(R.animationFrame(assets.gather,350),0);
 assert.equal(R.animationFrame({sequence:[2,0,1],durations:[20,30,40]},55),1);
});
