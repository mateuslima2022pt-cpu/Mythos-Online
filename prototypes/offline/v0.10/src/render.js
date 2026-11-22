(function(){'use strict';const C=MythosCore;
class MythosRenderer{
 constructor(game){this.g=game;this.canvas=document.getElementById('world');this.ctx=this.canvas.getContext('2d',{alpha:false});this.trees=new Image();this.trees.src='__TREES_DATA__';this.hero=new Image();this.hero.src='__GUARDIAN_DATA__';this.monsters=new Image();this.monsters.src='__MONSTERS_DATA__';this.ground=this.makeGround();this.resize();window.addEventListener('resize',()=>this.resize());}
 resize(){this.dpr=Math.min(devicePixelRatio||1,2);this.w=innerWidth;this.h=innerHeight;this.canvas.width=this.w*this.dpr;this.canvas.height=this.h*this.dpr;this.scale=Math.max(.85,Math.min(1.22,this.w/1260));}
 makeGround(){
  const canvas=document.createElement('canvas');canvas.width=C.W;canvas.height=C.H;const c=canvas.getContext('2d'),r=MythosWorld.random(51181);
  c.fillStyle='#243b27';c.fillRect(0,0,C.W,C.H);
  for(let i=0;i<850;i++){const x=r()*C.W,y=r()*C.H,rad=30+r()*140;c.fillStyle=['#1d352455','#40523644','#153b3438','#51603c22'][i%4];c.beginPath();c.ellipse(x,y,rad,rad*.65,0,0,Math.PI*2);c.fill();}
  // Trails: wide soft shoulders and a granular ochre floor.
  for(const path of this.g.world.paths){for(const [width,color]of [[94,'#42503a'],[75,'#626047'],[58,'#776a4d'],[47,'#817354']]){c.strokeStyle=color;c.lineWidth=width;c.lineCap='round';c.lineJoin='round';c.beginPath();path.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.stroke();}}
  c.fillStyle='#6c705044';c.beginPath();c.ellipse(715,1610,215,170,-.2,0,Math.PI*2);c.fill();
  for(let i=0;i<34000;i++){const x=r()*C.W,y=r()*C.H;c.fillStyle=['#d5c38f12','#0b281c3a','#798b5022','#8c975723'][i%4];c.fillRect(x,y,.8+r()*2,.7+r()*2);}
  for(let i=0;i<6800;i++){const x=r()*C.W,y=r()*C.H;if(this.g.world.paths.some(path=>path.slice(1).some((p,j)=>MythosWorld.distSegment(x,y,path[j],p)<36)))continue;c.strokeStyle=['#81935355','#71874366','#adc27c44'][i%3];c.lineWidth=.7;c.beginPath();c.moveTo(x-3,y);c.lineTo(x-5,y-4);c.moveTo(x,y+1);c.lineTo(x+1,y-6);c.moveTo(x+2,y);c.lineTo(x+5,y-3);c.stroke();if(i%9===0){c.fillStyle=['#afbc8055','#c7a9d177','#a0d5d755'][i%3];c.beginPath();c.arc(x+2,y-4,1.6,0,7);c.fill();}}
  // Water banks follow a curved river, cut only by the bridge.
  for(const [width,color] of [[143,'#142f25'],[128,'#3c6250'],[112,'#153e40'],[91,'#1c4d53'],[64,'#255d5e']]){c.strokeStyle=color;c.lineWidth=width;c.beginPath();for(let y=0;y<C.H;y+=6){const x=C.riverX(y);y?c.lineTo(x,y):c.moveTo(x,y);}c.stroke();}
  // Bridge joins both traversable banks.
  const bx=C.riverX(1120);c.fillStyle='#202b23';c.fillRect(bx-118,1063,236,116);c.fillStyle='#776745';c.fillRect(bx-119,1071,238,98);for(let x=bx-114;x<bx+120;x+=13){c.fillStyle=Math.floor(x)%3?'#8b7952':'#9c875b';c.fillRect(x,1073,11,94);c.strokeStyle='#322d20';c.lineWidth=1;c.strokeRect(x,1073,11,94);}c.fillStyle='#433e2c';c.fillRect(bx-125,1064,250,7);c.fillRect(bx-125,1170,250,7);for(const x of[bx-120,bx,bx+120])for(const y of[1065,1175]){c.fillStyle='#ac9464';c.fillRect(x-4,y-9,8,17);}
  // Sanctum and ruins floor.
  for(let i=0;i<28;i++){const a=i/28*Math.PI*2;c.fillStyle=i%2?'#76836c':'#626f5c';c.beginPath();c.ellipse(550+Math.cos(a)*52,1515+Math.sin(a)*31,7,4,a,0,7);c.fill();}
  c.fillStyle='#4f5d4660';c.beginPath();c.ellipse(2520,525,172,130,0,0,7);c.fill();for(let y=410;y<650;y+=32)for(let x=2380;x<2660;x+=37){if(r()>.2){c.fillStyle=r()>.5?'#6e79605a':'#88927b38';c.fillRect(x+r()*3,y+r()*3,32,26);}}
  for(let i=0;i<16;i++){const a=i/16*7;c.strokeStyle='#53694f';c.lineWidth=2;c.beginPath();c.moveTo(2520+Math.cos(a)*85,525+Math.sin(a)*55);c.lineTo(2520+Math.cos(a)*140,525+Math.sin(a)*95);c.stroke();}
  return canvas;
 }
 ellipse(c,x,y,rx,ry,color){c.fillStyle=color;c.beginPath();c.ellipse(x,y,rx,ry,0,0,7);c.fill();}
 shadow(c,x,y,r){this.ellipse(c,x,y+2,r,r*.4,'#03100c66');}
 text(c,text,x,y,color='#dbdfc7',size=12){c.font=`${size}px Georgia`;c.textAlign='center';c.fillStyle='#07130c';c.fillText(text,x+1,y+1);c.fillStyle=color;c.fillText(text,x,y);}
 glow(c,x,y,r,color){const grd=c.createRadialGradient(x,y,1,x,y,r);grd.addColorStop(0,color);grd.addColorStop(1,'transparent');c.fillStyle=grd;c.fillRect(x-r,y-r,r*2,r*2);}
 draw(){
  const g=this.g,c=this.ctx,t=g.time;this.scale=Math.max(.85,Math.min(1.22,this.w/1260));const vw=this.w/this.scale,vh=this.h/this.scale;
  const camX=C.clamp(g.p.x-vw/2,0,Math.max(0,C.W-vw)),camY=C.clamp(g.p.y-vh/2,0,Math.max(0,C.H-vh));g.camera={x:camX,y:camY,scale:this.scale};
  c.setTransform(this.dpr,0,0,this.dpr,0,0);c.fillStyle='#152d20';c.fillRect(0,0,this.w,this.h);c.save();c.scale(this.scale,this.scale);c.translate(-camX,-camY);
  if(g.shake>0&&g.settings.effects)c.translate(Math.sin(t*81)*g.shake,Math.cos(t*95)*g.shake*.6);
  c.drawImage(this.ground,0,0);
  // Slow glints in moving water; low contrast leaves paths readable.
  c.strokeStyle='#8dc1b628';c.lineWidth=1;for(let y=Math.floor(camY/28)*28;y<camY+vh;y+=28){const x=C.riverX(y)+Math.sin(y*3)*34;if(y>1060&&y<1180)continue;c.beginPath();c.ellipse(x,y+(t*12+y)%18,6+Math.sin(y)*3,1,0,0,Math.PI);c.stroke();}
  for(const x of this.g.world.crystals)if(!g.p.flags.crystals.includes(x.id)){this.glow(c,x.x,x.y-13,42,'#76d8c82b');this.crystal(c,x.x,x.y,t,x.id);}
  const stone=g.world.npcs.find(n=>n.id==='stone');this.drawStone(c,stone.x,stone.y,t);
  this.drawShrine(c,550,1515,t);
  // Camp details: lantern posts, tents, firepit, banner.
  this.camp(c,t);
  const visible=(o,pad=240)=>o.x>camX-pad&&o.x<camX+vw+pad&&o.y>camY-50&&o.y<camY+vh+pad;
  const entities=[];
  for(const rock of g.world.rocks)if(visible(rock))entities.push({y:rock.y,draw:()=>this.rock(c,rock)});
  for(const col of g.world.columns)if(visible(col))entities.push({y:col.y,draw:()=>this.column(c,col)});
  for(const tree of g.world.trees)if(visible(tree))entities.push({y:tree.y,draw:()=>this.tree(c,tree,t)});
  entities.push({y:1560,draw:()=>this.human(c,795,1560,0,0,true)});
  entities.push({y:1670,draw:()=>this.dummy(c,940,1670,t)});
  for(const e of g.enemies)if(!e.dead&&visible(e))entities.push({y:e.y,draw:()=>this.monster(c,e,t)});
  for(const l of g.loot)if(visible(l))entities.push({y:l.y,draw:()=>this.loot(c,l,t)});
  entities.push({y:g.p.y,draw:()=>this.human(c,g.p.x,g.p.y,g.aim,g.walk,false)});
  // Telegraphs live on the ground, actors remain legible above them.
  for(const e of g.enemies)if(!e.dead&&e.state==='windup'){
    const frac=C.clamp(e.timer/e.spec.windup,0,1);const color=e.type==='boss'?'#d17d5433':'#bd69491c';
    if(e.type==='boss'){this.ellipse(c,e.targetX,e.targetY,112,112,color);c.strokeStyle='#e8ac74aa';c.lineWidth=2;c.beginPath();c.arc(e.targetX,e.targetY,112,0,7);c.stroke();c.fillStyle='#cc795030';c.beginPath();c.moveTo(e.targetX,e.targetY);c.arc(e.targetX,e.targetY,112,-Math.PI/2,-Math.PI/2+frac*7);c.closePath();c.fill();}
    else if(e.type!=='gosma'){c.fillStyle=color;c.beginPath();c.moveTo(e.x,e.y);c.arc(e.x,e.y,e.spec.range+12,e.attackAngle-.8,e.attackAngle+.8);c.closePath();c.fill();c.strokeStyle='#ecae7170';c.lineWidth=1;c.stroke();}
    else {c.strokeStyle='#b7a2e070';c.setLineDash([4,6]);c.beginPath();c.moveTo(e.x,e.y-15);c.lineTo(e.targetX,e.targetY);c.stroke();c.setLineDash([]);}
  }
  entities.sort((a,b)=>a.y-b.y);for(const e of entities)e.draw();
  for(const projectile of g.projectiles){this.glow(c,projectile.x,projectile.y,22,'#96bbef55');this.ellipse(c,projectile.x,projectile.y,5,5,'#d4d0f3');}
  for(const effect of g.effects)this.effect(c,effect);
  // Labels are always above foliage.
  this.text(c,'Aelric',795,1504,'#e2d39a',13);this.text(c,'GUIA DE INICIANTES',795,1489,'#a3bc95',8);
  if(C.questReady(g.p)&&g.p.quest<6){this.glow(c,795,1470,16,'#edcf7d44');this.text(c,'◆',795,1477,'#ffe0a0',19);}
  if(Math.hypot(g.p.x-940,g.p.y-1670)<150)this.text(c,'Boneco de treino',940,1613,'#a9b79b',10);
  for(const e of g.enemies)if(!e.dead&&(e.hp<e.spec.hp||g.target===e||e.type==='boss')){
    const y=e.y-(e.type==='boss'?163:e.type==='wolf'?63:59);c.fillStyle='#091a13cc';c.fillRect(e.x-25,y,50,4);c.fillStyle=e.type==='boss'?'#d39964':'#a65a52';c.fillRect(e.x-25,y,50*e.hp/e.spec.hp,4);if(g.target===e||e.type==='boss')this.text(c,e.spec.name,e.x,y-6,e.type==='boss'?'#edc58c':'#d6d3bb',e.type==='boss'?14:10);
  }
  for(const f of g.floaters){const alpha=C.clamp(f.life/.3,0,1);c.globalAlpha=alpha;this.text(c,f.text,f.x,f.y-(1-f.life/f.max)*34,f.color,f.big?23:15);c.globalAlpha=1;}
  // Sun rays and pollen use screen-space additive blending.
  if(g.settings.effects){c.save();c.globalCompositeOperation='screen';for(let i=0;i<3;i++){const x=camX+150+i*340;c.fillStyle='#c4d89105';c.beginPath();c.moveTo(x,camY-50);c.lineTo(x+70,camY-50);c.lineTo(x+470,camY+vh);c.lineTo(x+250,camY+vh);c.fill();}for(let i=0;i<30;i++){const x=camX+((i*137+t*(2+i%3))%vw),y=camY+((i*83+Math.sin(t*.4+i)*14)%vh);this.ellipse(c,x,y,1,1,i%3?'#d9e5ad55':'#93d8c499');}c.restore();}
  c.restore();
  if(g.hitFlash>0){c.fillStyle=`rgba(155,31,37,${g.hitFlash*.22})`;c.fillRect(0,0,this.w,this.h);}
 }
 tree(c,o,t){if(!this.trees.complete||!this.trees.naturalWidth)return;const cell=this.trees.naturalWidth/2;let alpha=1;const p=this.g.p;if(Math.abs(p.x-o.x)<o.size*.46&&p.y<o.y+65&&p.y>o.y-o.size+20)alpha=.16;c.globalAlpha=alpha;this.shadow(c,o.x,o.y,o.size*.25);c.drawImage(this.trees,(o.type%2)*cell,Math.floor(o.type/2)*cell,cell,cell,o.x-o.size/2+Math.sin(t*.4+o.seed)*.8,o.y-o.size+12,o.size,o.size);c.globalAlpha=1;}
 rock(c,o){this.shadow(c,o.x,o.y,o.r*1.3);c.fillStyle='#576757';c.strokeStyle='#344b3a';c.lineWidth=2;c.beginPath();c.moveTo(o.x-o.r,o.y);c.lineTo(o.x-o.r*.7,o.y-o.r);c.lineTo(o.x+o.r*.3,o.y-o.r*1.4);c.lineTo(o.x+o.r,o.y-o.r*.3);c.lineTo(o.x+o.r*.8,o.y+5);c.closePath();c.fill();c.stroke();c.fillStyle='#859078';c.beginPath();c.moveTo(o.x-o.r*.7,o.y-o.r);c.lineTo(o.x+o.r*.3,o.y-o.r*1.4);c.lineTo(o.x+o.r*.6,o.y-o.r*.7);c.lineTo(o.x-o.r*.3,o.y-o.r*.3);c.closePath();c.fill();this.ellipse(c,o.x-o.r*.3,o.y-o.r*.5,o.r*.4,o.r*.15,'#829957');}
 column(c,o){this.shadow(c,o.x,o.y,30);c.fillStyle='#637264';c.fillRect(o.x-17,o.y-55,34,55);c.fillStyle='#85917b';c.fillRect(o.x-19,o.y-61,38,9);c.fillStyle='#a4ac90';c.fillRect(o.x-15,o.y-65,29,5);c.fillStyle='#495e4a';c.fillRect(o.x+6,o.y-53,7,51);c.fillStyle='#788566';c.fillRect(o.x-22,o.y-5,44,10);c.strokeStyle='#3b5640';c.beginPath();c.moveTo(o.x-12,o.y-42);c.lineTo(o.x+5,o.y-28);c.lineTo(o.x-1,o.y-16);c.stroke();this.ellipse(c,o.x-12,o.y-56,14,4,'#7e945c');}
 crystal(c,x,y,t,id){c.save();c.translate(x,y+Math.sin(t*1.8+id)*2);this.shadow(c,0,4,18);c.fillStyle='#74c6b3';c.strokeStyle='#c5f4d3';c.lineWidth=1;c.beginPath();c.moveTo(0,-36);c.lineTo(11,-16);c.lineTo(7,0);c.lineTo(-9,0);c.lineTo(-13,-18);c.closePath();c.fill();c.stroke();c.fillStyle='#b6ead0';c.beginPath();c.moveTo(0,-36);c.lineTo(0,-3);c.lineTo(-9,0);c.lineTo(-13,-18);c.closePath();c.fill();c.restore();}
 drawStone(c,x,y,t){this.shadow(c,x,y,29);c.fillStyle='#667969';c.strokeStyle='#96a08a';c.lineWidth=2;c.beginPath();c.moveTo(x-23,y);c.lineTo(x-19,y-52);c.lineTo(x-2,y-65);c.lineTo(x+20,y-50);c.lineTo(x+24,y);c.closePath();c.fill();c.stroke();this.glow(c,x,y-28,37,'#d4dca222');this.text(c,'✧',x,y-22,'#cfdbb1',27);if(Math.hypot(this.g.p.x-x,this.g.p.y-y)<150)this.text(c,'Pedra do Juramento',x,y-77,'#d9d2ac',11);}
 drawShrine(c,x,y,t){this.glow(c,x,y-25,65,'#8bcfc32a');c.fillStyle='#7c8f7c';c.fillRect(x-24,y-10,48,12);c.fillStyle='#a4b4a1';c.fillRect(x-18,y-18,36,10);for(const s of[-1,1]){c.fillStyle='#789585';c.fillRect(x+s*19-4,y-47,8,29);}this.ellipse(c,x,y-47,27,8,'#9fb5a1');this.ellipse(c,x,y-49,23,5,'#518d90');this.glow(c,x,y-65,30,'#82d6d255');this.crystal(c,x,y-43,t,4);if(Math.hypot(this.g.p.x-x,this.g.p.y-y)<175)this.text(c,'Santuário da Aurora',x,y-103,'#c7dfcc',11);}
 camp(c,t){
  // Two small canvas tents anchored behind the spawn; woven banner.
  for(const [x,y,flip]of[[610,1725,1],[575,1610,-1]]){this.shadow(c,x,y,44);c.fillStyle='#607655';c.beginPath();c.moveTo(x-38,y);c.lineTo(x,y-59);c.lineTo(x+43,y);c.closePath();c.fill();c.fillStyle='#a0a177';c.beginPath();c.moveTo(x-38,y);c.lineTo(x,y-59);c.lineTo(x+4,y);c.closePath();c.fill();c.fillStyle='#283d2c';c.beginPath();c.moveTo(x-13,y);c.lineTo(x+1,y-40);c.lineTo(x+19,y);c.closePath();c.fill();c.strokeStyle='#acaa7c';c.lineWidth=1;c.beginPath();c.moveTo(x,y-59);c.lineTo(x+65,y+6);c.moveTo(x,y-59);c.lineTo(x-60,y+3);c.stroke();}
  c.fillStyle='#756044';c.fillRect(831,1495,4,69);c.fillStyle='#4b7381';c.beginPath();c.moveTo(835,1496);c.lineTo(867,1497);c.lineTo(864,1532);c.lineTo(851,1541);c.lineTo(835,1532);c.fill();this.text(c,'♜',851,1525,'#d6c493',19);
  for(let i=0;i<9;i++){const a=i/9*7;this.ellipse(c,696+Math.cos(a)*19,1585+Math.sin(a)*9,6,4,'#63725b');}this.glow(c,696,1578,72,'#f4bc5330');for(let i=0;i<4;i++){c.fillStyle=i%2?'#ead894':'#d3914e';c.beginPath();c.moveTo(686+i*5,1585);c.quadraticCurveTo(681+i*6+Math.sin(t*6+i)*3,1567,696+Math.sin(t*3+i)*5,1558+i*2);c.quadraticCurveTo(705,1577,701+i*2,1584);c.fill();}
 }
 dummy(c,x,y,t){this.shadow(c,x,y,20);c.strokeStyle='#6e5037';c.lineWidth=6;c.beginPath();c.moveTo(x,y);c.lineTo(x,y-51);c.moveTo(x-25,y-31);c.lineTo(x+26,y-31);c.stroke();c.fillStyle='#a19261';c.fillRect(x-14,y-42,28,24);this.ellipse(c,x,y-52,11,12,'#b4a475');c.strokeStyle='#6b5e3d';c.lineWidth=1;c.beginPath();c.moveTo(x-13,y-30);c.lineTo(x+12,y-30);c.moveTo(x,y-42);c.lineTo(x,y-18);c.stroke();}
 human(c,x,y,angle,walk,npc){
  if(!npc&&(this.g.life!=='alive'||this.g.settings.guardianLook!=='equipment')&&this.g.guardian?.draw(c,x,y))return;
  const g=this.g,bob=npc?Math.sin(g.time*1.8)*.6:Math.abs(Math.sin(walk))*1.7,moving=!npc&&g.moving;this.shadow(c,x,y,18);
  c.save();c.translate(x,y-bob);if(!npc&&g.dash)c.globalAlpha=.58;
  if(!npc&&g.blockTime>0){this.glow(c,0,-17,43,'#e8d69944');c.strokeStyle='#e9d895aa';c.lineWidth=2;c.beginPath();c.arc(0,-8,31,angle-.9,angle+.9);c.stroke();}
  const unarmored=!npc&&!g.p.equipment.armor;
  const armored=!npc&&g.p.equipment.armor==='aurora',blade=!npc&&g.p.equipment.weapon==='lamina',tower=!npc&&g.p.equipment.shield==='torre';
  const facing=Math.cos(angle)>=0?1:-1;const step=moving?Math.sin(walk)*4:0;
  if(!npc&&!unarmored&&this.hero.complete&&this.hero.naturalWidth){const cell=this.hero.naturalWidth/2,back=Math.sin(angle)<-.4;const row=armored?1:0;c.save();c.scale(facing,1);if(moving)c.rotate(Math.sin(walk)*.025);c.drawImage(this.hero,(back?1:0)*cell,row*cell,cell,cell,-40,-76,80,80);c.restore();}else{
  // Back cloak, leather boots and trousers.
  c.fillStyle=npc?'#4e7256':armored?'#315775':'#5c5943';c.beginPath();c.moveTo(-12,-34);c.lineTo(12,-34);c.lineTo(17,-2);c.quadraticCurveTo(0,6,-17,-2);c.closePath();c.fill();
  c.fillStyle='#29352e';c.fillRect(-10,-13,8,14+step);c.fillRect(3,-13,8,14-step);c.fillStyle='#393f35';this.ellipse(c,-7,2+step,6,3,'#333b31');this.ellipse(c,8,2-step,6,3,'#333b31');
  const chest=c.createLinearGradient(-13,-35,14,-15);chest.addColorStop(0,npc?'#82936c':unarmored?'#6a7550':armored?'#c1cec2':'#abb5a0');chest.addColorStop(.5,npc?'#4e7052':unarmored?'#455538':armored?'#789fa9':'#748a7c');chest.addColorStop(1,npc?'#34543e':unarmored?'#293b2b':'#435c55');c.fillStyle=chest;c.beginPath();c.moveTo(-11,-35);c.lineTo(11,-35);c.lineTo(13,-17);c.lineTo(7,-10);c.lineTo(-8,-10);c.lineTo(-13,-18);c.closePath();c.fill();
  c.fillStyle='#302f25';c.fillRect(-11,-16,22,4);c.fillStyle='#c0a577';c.fillRect(-3,-17,6,6);
  this.ellipse(c,-13,-31,7,5,npc?'#81936b':'#b4baa1');this.ellipse(c,13,-31,7,5,npc?'#6c825d':'#899e90');
  // Neck and face under a swept helmet / guide's silver hair.
  this.ellipse(c,0,-40,8,9,'#c9ab84');c.fillStyle=npc?'#c4c6ac':armored?'#bac9bd':'#a8b39f';c.beginPath();c.moveTo(-9,-43);c.quadraticCurveTo(-8,-54,1,-53);c.quadraticCurveTo(11,-52,10,-42);c.lineTo(5,-44);c.lineTo(3,-48);c.lineTo(-2,-44);c.closePath();c.fill();c.strokeStyle=npc?'#d8d7b9':'#d0d2b4';c.lineWidth=1.5;c.beginPath();c.moveTo(-6,-49);c.lineTo(4,-51);c.stroke();
  c.fillStyle='#3f4b3e';c.fillRect(facing*3-1,-41,2,1.5);if(npc){c.fillStyle='#c6c9af';c.beginPath();c.moveTo(-6,-36);c.lineTo(1,-28);c.lineTo(7,-36);c.closePath();c.fill();}
  }
  if(npc){c.strokeStyle='#8d7951';c.lineWidth=3;c.beginPath();c.moveTo(18,3);c.lineTo(18,-53);c.stroke();this.glow(c,18,-54,18,'#cbd79333');this.ellipse(c,18,-54,4,5,'#c6d59a');}
  else {
    const shield=C.shieldItem(g.p),primary=C.ITEMS[g.p.equipment.weapon],secondary=C.offhandItem(g.p);
    if(shield){const sx=-facing*19,sy=-26,isTower=shield.id==='torre';c.fillStyle=isTower?'#829c71':'#667f74';c.strokeStyle=isTower?'#d4c28a':'#b6b99c';c.lineWidth=2;c.beginPath();c.moveTo(sx-9,sy-12);c.lineTo(sx+9,sy-12);c.lineTo(sx+9,sy+5);c.lineTo(sx,sy+15);c.lineTo(sx-9,sy+5);c.closePath();c.fill();c.stroke();c.strokeStyle='#d5c898';c.beginPath();c.moveTo(sx,sy-6);c.lineTo(sx,sy+7);c.moveTo(sx-5,sy);c.lineTo(sx+5,sy);c.stroke();}
    const action=g.action;const weaponAngle=hand=>{if(action&&(action.id==='basic'||action.id==='frontal')&&(action.hand||'weapon')===hand){const progress=C.clamp((action.elapsed-action.windup)/action.recovery,0,1);return action.angle-1.3+progress*2.5;}return angle+(hand==='offhand'?.18:0);};
    if(primary)this.drawHeldWeapon(c,C.twoHanded(primary)?facing*10:facing*18,-28,weaponAngle('weapon'),primary);
    if(secondary?.slot==='weapon'&&!C.twoHanded(primary))this.drawHeldWeapon(c,-facing*18,-28,weaponAngle('offhand'),secondary);
  }
  c.restore();
 }
 drawHeldWeapon(c,x,y,angle,item){
  c.save();c.translate(x,y);c.rotate(angle+Math.PI/2);if(C.twoHanded(item))c.scale(1.2,1.35);const enchanted=item.id==='lamina';if(enchanted)this.glow(c,0,-24,23,'#9ad69733');c.fillStyle='#aa8c52';c.fillRect(-6,-6,12,3);c.fillStyle='#554b33';c.fillRect(-2,-3,4,C.twoHanded(item)?15:11);c.fillStyle=enchanted?'#b8dfbf':'#d0d4bb';c.strokeStyle=enchanted?'#88bd99':'#82928a';c.lineWidth=1;c.beginPath();c.moveTo(-3,-7);c.lineTo(-3,-30);c.lineTo(0,-38);c.lineTo(3,-30);c.lineTo(3,-7);c.closePath();c.fill();c.stroke();c.strokeStyle='#eef0d0';c.beginPath();c.moveTo(0,-33);c.lineTo(0,-8);c.stroke();c.restore();
 }
 monster(c,e,t){
  const x=e.x,y=e.y,bob=Math.sin(t*3+e.id)*2;this.shadow(c,x,y,e.spec.radius*1.2);c.save();c.translate(x,y+bob);if(e.flash>0)c.globalAlpha=.6;
  if(this.monsters.complete&&this.monsters.naturalWidth){
   const rect={broto:[110,140,450,435,57,55],gosma:[690,140,460,430,60,56],wolf:[0,665,627,520,86,71],boss:[632,550,622,650,153,160]}[e.type];
   const [sx,sy,sw,sh,dw,dh]=rect;c.save();if(e.type==='wolf')c.scale(e.x<this.g.p.x?1:-1,1);if(e.state==='windup'){c.scale(1.035,1.035);this.glow(c,0,-dh*.4,dh*.45,'#d4a06016');}c.drawImage(this.monsters,sx,sy,sw,sh,-dw/2,-dh+4,dw,dh);c.restore();c.restore();return;
  }
  if(e.type==='broto'){
   c.fillStyle='#c7bd93';c.beginPath();c.moveTo(-8,0);c.quadraticCurveTo(-10,-13,-4,-25);c.lineTo(7,-25);c.quadraticCurveTo(8,-11,11,0);c.closePath();c.fill();this.ellipse(c,0,-24,22,13,'#8a5b69');c.fillStyle='#b9868e';c.beginPath();c.ellipse(0,-30,22,13,0,Math.PI,7);c.fill();this.ellipse(c,-8,-34,4,2,'#e7bdb0');this.ellipse(c,7,-38,3,2,'#e6c3a9');this.ellipse(c,15,-30,2,2,'#e6c3a9');this.ellipse(c,-3,-13,2,2,'#2f4737');this.ellipse(c,5,-13,2,2,'#2f4737');c.strokeStyle='#64754b';c.lineWidth=2;c.beginPath();c.moveTo(-7,-8);c.lineTo(-16,-3);c.moveTo(8,-7);c.lineTo(17,-4);c.stroke();
  }else if(e.type==='gosma'){
   this.glow(c,0,-9,30,'#6eabb629');const grd=c.createRadialGradient(-6,-23,1,0,-12,29);grd.addColorStop(0,'#a3c0cf');grd.addColorStop(.5,'#709cae');grd.addColorStop(1,'#396b7e');c.fillStyle=grd;c.beginPath();c.moveTo(-23,0);c.bezierCurveTo(-27,-8,-12,-35,1,-35);c.bezierCurveTo(18,-37,17,-10,25,-4);c.quadraticCurveTo(13,8,-2,4);c.quadraticCurveTo(-14,6,-23,0);c.fill();this.ellipse(c,-7,-14,2,3,'#193e49');this.ellipse(c,7,-14,2,3,'#193e49');this.ellipse(c,-9,-25,4,2,'#c6e4e1a0');
  }else if(e.type==='wolf'){
   const face=e.x<this.g.p.x?1:-1;c.scale(face,1);c.strokeStyle='#283b2c';c.lineWidth=5;for(const [x,y2]of[[-17,0],[12,1]]){c.beginPath();c.moveTo(x,-17);c.lineTo(x+Math.sin(t*10)*3,y2);c.stroke();}this.ellipse(c,-2,-20,27,14,'#5b6b4c');this.ellipse(c,-7,-27,17,8,'#7b8056');c.fillStyle='#596a49';c.beginPath();c.moveTo(13,-30);c.lineTo(17,-44);c.lineTo(23,-36);c.lineTo(29,-42);c.lineTo(29,-27);c.lineTo(40,-20);c.lineTo(30,-14);c.lineTo(14,-17);c.closePath();c.fill();this.ellipse(c,28,-26,2,1.5,'#edc77b');c.fillStyle='#2d4936';c.beginPath();c.moveTo(-23,-20);c.quadraticCurveTo(-45,-30,-38,-45);c.quadraticCurveTo(-25,-33,-21,-28);c.fill();c.strokeStyle='#b3b37b';c.lineWidth=1.5;for(let i=0;i<4;i++){c.beginPath();c.moveTo(-18+i*8,-27);c.lineTo(-24+i*8,-40+i%2*6);c.stroke();}c.fillStyle='#96ad67';for(let i=0;i<4;i++)this.ellipse(c,-18+i*8,-34-i%2*4,5,2,'#82975e');
  }else{
   // Corrupted treant: bark, roots, branch crown and a living amber core.
   c.strokeStyle='#504a35';c.lineWidth=12;for(const [dx,dy]of[[-24,6],[24,6],[-38,-49],[40,-49]]){c.beginPath();c.moveTo(dx*.5,-37);c.lineTo(dx,dy-12);c.lineTo(dx*1.3,dy);c.stroke();}c.fillStyle='#66704b';c.beginPath();c.moveTo(-28,0);c.lineTo(-19,-74);c.lineTo(9,-88);c.lineTo(25,-68);c.lineTo(30,0);c.lineTo(9,-11);c.lineTo(0,1);c.lineTo(-12,-13);c.closePath();c.fill();c.strokeStyle='#8a8c59';c.lineWidth=3;for(let i=0;i<5;i++){c.beginPath();c.moveTo(-20+i*10,-7);c.lineTo(-14+i*8,-40);c.lineTo(-20+i*9,-69);c.stroke();}this.glow(c,0,-43,28,'#efbb5966');this.ellipse(c,0,-43,10,15,'#d8b160');this.ellipse(c,0,-43,4,8,'#f3ddb0');this.ellipse(c,-10,-69,4,2,'#edc47a');this.ellipse(c,12,-69,4,2,'#edc47a');c.strokeStyle='#5f6541';c.lineWidth=5;for(const [dx,dy]of[[-31,-107],[-13,-122],[20,-114],[40,-102]]){c.beginPath();c.moveTo(0,-72);c.lineTo(dx,dy);c.lineTo(dx+15,dy-11);c.stroke();this.ellipse(c,dx,dy,18,7,'#6e8051');}
  }c.restore();
 }
 loot(c,l,t){this.glow(c,l.x,l.y-5,20,l.kind==='gold'?'#d8be6c25':'#e598a829');if(l.kind==='gold'){this.ellipse(c,l.x,l.y,6,3,'#dfc675');c.fillStyle='#9a783c';c.fillRect(l.x-5,l.y,10,2);}else{c.fillStyle=l.kind==='hp'?'#bc6470':'#659fb9';c.fillRect(l.x-4,l.y-11,8,10);c.fillStyle='#dfd1a5';c.fillRect(l.x-2,l.y-14,4,3);}}
 effect(c,e){const a=C.clamp(e.life/e.max,0,1);c.save();c.globalAlpha=a;if(e.type==='slash'){c.strokeStyle=e.special?'#e0dfae':'#e9e0bb';c.lineWidth=e.special?9:4;c.lineCap='round';c.beginPath();c.arc(e.x,e.y-14,e.special?62:48,e.angle-.8,e.angle+.8);c.stroke();c.strokeStyle=e.special?'#eec67c':'#9fbea7';c.lineWidth=1;c.beginPath();c.arc(e.x,e.y-14,e.special?69:53,e.angle-.8,e.angle+.8);c.stroke();}else if(e.type==='ring'){c.strokeStyle=e.color||'#b6d8b1';c.lineWidth=3;c.beginPath();c.ellipse(e.x,e.y,(1-a)*e.radius,(1-a)*e.radius*.7,0,0,7);c.stroke();}else if(e.type==='root'){c.strokeStyle='#b0a466';c.lineWidth=4;for(let i=0;i<12;i++){const angle=i/12*7;c.beginPath();c.moveTo(e.x+Math.cos(angle)*35,e.y+Math.sin(angle)*35);c.lineTo(e.x+Math.cos(angle)*100,e.y+Math.sin(angle)*100);c.stroke();}}else{c.fillStyle=e.color||'#dfc995';c.fillRect(e.x,e.y,3,3);}c.restore();}
 map(canvas,large=false,zoom=1){const c=canvas.getContext('2d'),sx=canvas.width/C.W,sy=canvas.height/C.H;c.fillStyle='#152c24';c.fillRect(0,0,canvas.width,canvas.height);c.save();const z=large?1:C.clamp(zoom,1,3);c.scale(sx*z,sy*z);c.translate(-C.clamp(this.g.p.x-C.W/(2*z),0,C.W-C.W/z),-C.clamp(this.g.p.y-C.H/(2*z),0,C.H-C.H/z));c.lineCap='round';for(const p of this.g.world.paths){c.strokeStyle='#aa946488';c.lineWidth=large?17:25;c.beginPath();p.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.stroke();}c.strokeStyle='#52918c88';c.lineWidth=85;c.beginPath();for(let y=0;y<C.H;y+=20)y?c.lineTo(C.riverX(y),y):c.moveTo(C.riverX(y),y);c.stroke();c.strokeStyle='#ae956a';c.lineWidth=65;c.beginPath();c.moveTo(C.riverX(1120)-130,1120);c.lineTo(C.riverX(1120)+130,1120);c.stroke();for(const tree of this.g.world.trees)this.ellipse(c,tree.x,tree.y,27,27,'#587b4a60');this.ellipse(c,715,1610,140,110,'#9cbe6f22');for(const crystal of this.g.world.crystals)if(!this.g.p.flags.crystals.includes(crystal.id))this.ellipse(c,crystal.x,crystal.y,large?16:30,large?16:30,'#94e2c9');this.ellipse(c,795,1560,large?23:33,large?23:33,'#edcd80');this.ellipse(c,2520,510,large?28:36,large?28:36,this.g.p.flags.boss?'#a7bd8b':'#d78c72');const p=this.g.p;c.save();c.translate(p.x,p.y);c.rotate(this.g.aim+Math.PI/2);c.fillStyle='#f7f2ca';c.beginPath();c.moveTo(0,-(large?29:47));c.lineTo(large?19:32,large?20:30);c.lineTo(0,large?11:18);c.lineTo(large?-19:-32,large?20:30);c.closePath();c.fill();c.restore();c.restore();if(large){c.textAlign='center';c.font='14px Georgia';c.fillStyle='#d4d7b5';for(const [name,x,y]of[['Clareira do Juramento',690,1885],['Jardim dos Cristais',830,685],['Ponte das Raízes',1550,1300],['Ruínas do Cerne',2520,300]])c.fillText(name,x*sx,y*sy);}}
}
window.MythosRenderer=MythosRenderer;
})();
