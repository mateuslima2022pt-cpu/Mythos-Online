(function(){'use strict';
const C=MythosCore,$=id=>document.getElementById(id),KEY='mythos.aurora.save.v1';
const attrNames={forca:'Força',destreza:'Destreza',magia:'Magia',vitalidade:'Vitalidade'};
const escapeHTML=s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
class Sound{
 constructor(){this.enabled=true;this.ctx=null;}
 init(){try{this.ctx??=new(window.AudioContext||window.webkitAudioContext)();if(this.ctx.state==='suspended')this.ctx.resume();}catch{this.enabled=false;}}
 tone(freq=330,duration=.12,kind='sine',volume=.035,slide=1){if(!this.enabled||!this.ctx)return;try{const c=this.ctx,o=c.createOscillator(),v=c.createGain();o.type=kind;o.frequency.setValueAtTime(freq,c.currentTime);o.frequency.exponentialRampToValueAtTime(Math.max(20,freq*slide),c.currentTime+duration);v.gain.setValueAtTime(volume,c.currentTime);v.gain.exponentialRampToValueAtTime(.0001,c.currentTime+duration);o.connect(v);v.connect(c.destination);o.start();o.stop(c.currentTime+duration);}catch{}}
 hit(){this.tone(125,.1,'triangle',.035,.35);}
 chime(){[0,.09,.18].forEach((n,i)=>setTimeout(()=>this.tone([392,494,587][i],.35,'sine',.025),n*1000));}
}
class Game{
 constructor(){
  this.p=C.fresh();this.world=MythosWorld.createWorld();this.settings={audio:true,effects:true,dodge:'movement',questsCollapsed:false};this.sound=new Sound();this.state='title';this.panel=null;this.keys=new Set();this.mouse={x:innerWidth/2,y:innerHeight/2,down:false};this.camera={x:0,y:0,scale:1};this.aim=-Math.PI/2;this.walk=0;this.moving=false;this.time=0;this.action=null;this.cooldowns={basic:0,frontal:0,block:0,dash:0,hp:0,mp:0};this.blockTime=0;this.rootTime=0;this.combat=0;this.dash=null;this.effects=[];this.floaters=[];this.loot=[];this.projectiles=[];this.shake=0;this.hitFlash=0;this.target=null;this.zone='';this.saveTimer=0;this.uiTimer=0;this.ambientTimer=0;this.mpHeal=0;this.debug=false;this.deadCount=0;this.storageOK=true;this.near=null;
  this.enemies=this.world.spawns.map(s=>this.newEnemy(s));this.renderer=new MythosRenderer(this);this.setup();this.cursor=new MythosCursor(this);this.last=performance.now();requestAnimationFrame(t=>this.frame(t));
 }
 newEnemy(s){const spec=this.world.definitions[s.type];return {...s,x:s.sx,y:s.sy,spec,hp:spec.hp,state:'idle',timer:0,cooldown:1+s.id*.08,flash:0,dead:false,respawn:0,wander:s.id};}
 setup(){
  for(let i=1;i<=9;i++){const b=document.createElement('button');b.id='skill'+i;b.className='locked';b.innerHTML=`<kbd>${i}</kbd><span>${i===1?MythosUI.icon('sword'):i===2?MythosUI.icon('shield'):''}</span><em></em>`;b.title=i===1?'Golpe Frontal · aprenda com Aelric no nível 5 [1]':i===2?'Postura de Bastião · aprenda com Aelric [2]':'Espaço de técnica ainda vazio';b.onclick=()=>this.skill(i);$('skillSlots').append(b);}
  this.ui=new MythosUI(this);this.inventory=new MythosInventory(this);
  $('startButton').onclick=()=>this.start(false);$('continueButton').onclick=()=>this.start(true);
  $('hpPotion').onclick=()=>this.potion('hp');$('mpPotion').onclick=()=>this.potion('mp');$('dashSlot').onclick=()=>this.dodge();$('mapButton').onclick=()=>this.open('map');
  document.querySelectorAll('[data-panel]').forEach(b=>b.onclick=()=>this.open(b.dataset.panel));$('closeModal').onclick=()=>this.close();$('modalBackdrop').onclick=e=>{if(e.target===$('modalBackdrop'))this.close();};
  try{const raw=localStorage.getItem(KEY);if(raw){C.validateSave(JSON.parse(raw).player||JSON.parse(raw));$('continueButton').hidden=false;$('startButton').textContent='Começar nova jornada';}}catch{this.storageOK=false;}
  document.addEventListener('keydown',e=>this.keyDown(e));document.addEventListener('keyup',e=>this.keys.delete(e.code));window.addEventListener('blur',()=>{this.keys.clear();this.mouse.down=false;if(this.state==='play'&&!this.panel)this.open('settings');});
  this.renderer.canvas.addEventListener('mousemove',e=>{this.mouse.x=e.clientX;this.mouse.y=e.clientY;});
  this.renderer.canvas.addEventListener('mousedown',e=>this.worldPointerDown(e));
  window.addEventListener('mouseup',()=>this.mouse.down=false);this.renderer.canvas.addEventListener('contextmenu',e=>e.preventDefault());
  window.addEventListener('beforeunload',()=>{if(this.state==='play')this.save();});
  $('saveFile').onchange=async e=>{const f=e.target.files?.[0];if(!f)return;try{if(f.size>200000)throw Error('Arquivo muito grande.');const raw=JSON.parse(await f.text());const p=C.validateSave(raw.player||raw);if(!C.validPosition(p.x,p.y,13,this.world.obstacles)){p.x=C.SPAWN.x;p.y=C.SPAWN.y;}this.p=p;this.resetRuntime(InventoryModel.groundGold(raw.groundGold));this.save();this.close();this.refreshHUD();this.toast('Jornada importada. Bem-vindo de volta.');}catch(error){this.toast('Não foi possível importar: '+error.message);}e.target.value='';};
 }
 start(load){
  let groundGold=[];
  if(!load&&!$('continueButton').hidden&&!confirm('Começar uma nova jornada substituirá o salvamento deste navegador. Deseja continuar?'))return;
  if(load){try{const raw=JSON.parse(localStorage.getItem(KEY));groundGold=InventoryModel.groundGold(raw.groundGold);this.p=C.validateSave(raw.player||raw);if(raw.settings){this.settings.audio=raw.settings.audio!==false;this.settings.effects=raw.settings.effects!==false;this.settings.dodge=raw.settings.dodge==='cursor'?'cursor':'movement';this.settings.questsCollapsed=raw.settings.questsCollapsed===true;}if(!C.validPosition(this.p.x,this.p.y,13,this.world.obstacles)){this.p.x=C.SPAWN.x;this.p.y=C.SPAWN.y;}}catch{this.toast('Salvamento indisponível. Uma nova jornada começou.');this.p=C.fresh($('nameInput').value);}}
  else this.p=C.fresh($('nameInput').value);
  this.ui.applyPreferences();this.state='play';$('startScreen').hidden=true;$('hud').hidden=false;this.sound.enabled=this.settings.audio;this.sound.init();this.sound.chime();this.resetRuntime(groundGold);this.refreshHUD();this.toast('Bem-vindo ao Bosque da Aurora. Procure Aelric, ao norte.');this.save();
 }
 resetRuntime(groundGold=null){const retained=groundGold===null?this.loot.filter(l=>l.playerDropped&&l.life>0):groundGold;this.keys.clear();this.mouse.down=false;this.lastBasicHand=null;this.action=null;this.dash=null;this.blockTime=0;this.rootTime=0;this.combat=0;this.cooldowns={basic:0,frontal:0,block:0,dash:0,hp:0,mp:0};this.effects=[];this.projectiles=[];this.loot=retained.filter(l=>C.validPosition(l.x,l.y,3,this.world.obstacles));this.mpHeal=0;this.enemies=this.world.spawns.map(s=>this.newEnemy(s));this.target=null;}
 keyDown(e){
  if(['F1','F2','F3','F4','F5','F6','F7','F8','Space'].includes(e.code))e.preventDefault();
  if(this.state!=='play')return;if(this.inventory?.dropOpen){if(e.code==='Escape'){e.preventDefault();this.inventory.closeDrop();}return;}if(['INPUT','TEXTAREA','SELECT'].includes(e.target?.tagName?.toUpperCase())||e.target?.isContentEditable)return;
  if(e.code==='Escape'){e.preventDefault();this.panel?this.close():this.open('settings');return;}
  if(['KeyC','KeyI','KeyT','KeyM'].includes(e.code)&&!e.repeat){const panel={KeyC:'character',KeyI:'inventory',KeyT:'tree',KeyM:'map'}[e.code];if(this.panel===panel)this.close();else this.open(panel);return;}
  if(!this.panel&&e.code==='Enter'&&e.target?.tagName?.toUpperCase()!=='BUTTON'){e.preventDefault();this.ui.focusChat();return;}
  if(this.panel)return;this.keys.add(e.code);if(e.repeat)return;
  if(e.code==='KeyQ')this.dodge();if(e.code==='KeyF')this.interact();if(/^Digit[1-9]$/.test(e.code))this.skill(+e.code.at(-1));if(e.code==='F1')this.potion('hp');if(e.code==='F2')this.potion('mp');if(/^F[3-8]$/.test(e.code))this.ui.emptyConsumable(e.code);
 }
 mouseWorld(){return{x:this.mouse.x/this.camera.scale+this.camera.x,y:this.mouse.y/this.camera.scale+this.camera.y};}
 updateAim(){const m=this.mouseWorld();this.aim=Math.atan2(m.y-this.p.y,m.x-this.p.x);}
 frame(now){const dt=Math.min((now-this.last)/1000,.04);this.last=now;this.time+=dt;if(this.state==='play'&&!this.panel)this.update(dt);this.renderer.draw();this.cursor.tick(now);if(this.state==='play'){this.uiTimer-=dt;if(this.uiTimer<=0){this.refreshHUD();this.uiTimer=.1;}}requestAnimationFrame(t=>this.frame(t));}
 update(dt){
  this.updateAim();for(const k in this.cooldowns)this.cooldowns[k]=Math.max(0,this.cooldowns[k]-dt);this.blockTime=Math.max(0,this.blockTime-dt);this.rootTime=Math.max(0,this.rootTime-dt);this.combat=Math.max(0,this.combat-dt);this.shake=Math.max(0,this.shake-dt*20);this.hitFlash=Math.max(0,this.hitFlash-dt*3);
  this.effects=this.effects.filter(e=>{e.life-=dt;if(e.type==='particle'){e.x+=e.vx*dt;e.y+=e.vy*dt;}return e.life>0;});this.floaters=this.floaters.filter(f=>(f.life-=dt)>0);
  const s=C.stats(this.p);if(!this.combat)this.p.hp=Math.min(s.hp,this.p.hp+s.hp*.02*dt);this.p.mp=Math.min(s.mp,this.p.mp+s.mp*(this.combat?.005:.03)*dt);if(this.mpHeal>0){const heal=Math.min(this.mpHeal,12*dt);this.mpHeal-=heal;this.p.mp=Math.min(s.mp,this.p.mp+heal);}
  let dx=(this.keys.has('KeyD')?1:0)-(this.keys.has('KeyA')?1:0),dy=(this.keys.has('KeyS')?1:0)-(this.keys.has('KeyW')?1:0),length=Math.hypot(dx,dy);this.moving=length>0&&!this.rootTime;
  if(this.dash){this.dash.elapsed+=dt;const q=C.clamp(this.dash.elapsed/.3,0,1);this.p.x=this.dash.x+(this.dash.tx-this.dash.x)*q;this.p.y=this.dash.y+(this.dash.ty-this.dash.y)*q;if(this.settings.effects&&Math.random()<.7)this.effect('particle',this.p.x,this.p.y-16,.25,{vx:0,vy:0,color:'#c8d5ae'});if(q>=1)this.dash=null;}
  else if(this.moving){const speed=132*(this.blockTime>0?.7:1)*(this.action&&this.action.elapsed>this.action.windup?.83:1);this.move(this.p,dx/length*speed*dt,dy/length*speed*dt,true);this.walk+=dt*10;}
  if(this.mouse.down&&!this.dash)this.basic();
  if(this.action){this.action.elapsed+=dt;if(!this.action.released&&this.action.elapsed>=this.action.windup){this.action.released=true;this.release(this.action);}if(this.action&&this.action.elapsed>=this.action.windup+this.action.recovery)this.action=null;}
  for(const e of this.enemies)this.enemyUpdate(e,dt);
  for(const b of this.projectiles){b.life-=dt;const nx=b.x+b.vx*dt,ny=b.y+b.vy*dt;if(!C.validPosition(nx,ny,3,this.world.obstacles,true))b.life=0;b.x=nx;b.y=ny;if(Math.hypot(b.x-this.p.x,b.y-this.p.y)<18&&b.life>0){this.takeDamage(b.power,'magic',b.x,b.y,false);b.life=0;}}
  this.projectiles=this.projectiles.filter(b=>b.life>0);
  for(const l of this.loot)l.life-=dt;
  this.loot=this.loot.filter(l=>l.life>0);this.near=this.getNear();this.updateZone();this.saveTimer+=dt;if(this.saveTimer>10){this.save();this.saveTimer=0;}
  this.ambientTimer+=dt;if(this.ambientTimer>10){this.ambientTimer=0;this.sound.tone(980,.3,'sine',.004,1.4);setTimeout(()=>this.sound.tone(1350,.2,'sine',.003,.8),250);}
 }
 move(actor,dx,dy,player=false){const r=player?13:actor.spec.radius*.7;const valid=(x,y)=>C.validPosition(x,y,r,this.world.obstacles)&&(!player||!this.enemies.some(e=>!e.dead&&Math.hypot(x-e.x,y-e.y)<13+e.spec.radius*.8));if(valid(actor.x+dx,actor.y))actor.x+=dx;if(valid(actor.x,actor.y+dy))actor.y+=dy;}
 basic(){if(this.state!=='play'||this.panel||this.dash)return;const hand=C.offhandAttack(this.p)&&(!C.ITEMS[this.p.equipment.weapon]||C.dualWield(this.p)&&this.lastBasicHand==='weapon')?'offhand':'weapon';if(C.startAction(this,{id:'basic',mana:0,cooldown:.58,windup:.12,recovery:.32,angle:this.aim,hand}))this.lastBasicHand=hand;}
 // Core action uses the resource directly; expose it through getters for a single source of truth.
 get mp(){return this.p.mp;} set mp(v){this.p.mp=v;}
 skill(n){if(this.state!=='play'||this.panel)return;if(n>2){this.toast('Este espaço de técnica está vazio.');return;}if(n===1&&!this.p.learned){this.toast('Golpe Frontal: aprenda com Aelric no nível 5.');return;}if(n===2&&!this.p.blockLearned){this.toast('Postura de Bastião: conclua o treinamento de Aelric.');return;}if(n===2&&!C.shieldItem(this.p)){this.toast('Equipe um escudo para usar a Postura de Bastião.');return;}if(this.dash)return;
  const spec=n===1?{id:'frontal',mana:10,cooldown:5,windup:.25,recovery:.35,angle:this.aim}:{id:'block',mana:14,cooldown:12,windup:.1,recovery:.15,angle:this.aim};
  if(!C.startAction(this,spec)){if(this.p.mp<spec.mana)this.toast('Mana insuficiente.');return;}this.combat=8;
 }
 release(a){
  if(a.id==='block'){if(!C.shieldItem(this.p))return;this.blockTime=2;this.effect('ring',this.p.x,this.p.y,.45,{radius:42,color:'#e3d39b'});this.sound.tone(380,.25,'triangle',.03,1.8);return;}
  const special=a.id==='frontal',range=special?64:53,arc=Math.PI/2,s=C.stats(this.p),power=a.hand==='offhand'&&a.id==='basic'?s.secondaryPower:s.power;if(power<=0)return;this.effect('slash',this.p.x,this.p.y,.22,{angle:a.angle,special});this.sound.tone(special?200:270,.13,'triangle',.02,.35);let hit=false;
  for(const e of this.enemies)if(this.canAttackTarget(e)&&C.cone(this.p.x,this.p.y,a.angle,e.x,e.y,range,arc,e.spec.radius*.6)){
    const crit=Math.random()<s.crit,damage=C.damage(power*(special?1.4:1),e.spec.def,crit);e.hp-=damage;e.flash=.15;e.state=e.state==='idle'?'chase':e.state;this.combat=8;this.target=e;this.float(damage+(crit?'!':''),e.x,e.y-46,crit?'#f7da83':'#f0e5bd',crit);this.particles(e.x,e.y-20,'#d9bd88',8);hit=true;if(e.hp<=0)this.kill(e);
  }
  if(C.cone(this.p.x,this.p.y,a.angle,940,1670,range,arc,15)){const damage=C.damage(power*(special?1.4:1),0,false);this.float(damage,940,1610,'#d8d6af');this.particles(940,1640,'#bfa577',5);hit=true;}
  if(hit){this.sound.hit();this.shake=special?2.5:1;}
 }
 dodge(){
  if(this.state!=='play'||this.panel||this.cooldowns.dash>0||this.dash)return;if(this.rootTime>0){this.toast('Você está enraizado. Aguarde o efeito terminar.');return;}
  let dx=+(this.keys.has('KeyD'))-+(this.keys.has('KeyA')),dy=+(this.keys.has('KeyS'))-+(this.keys.has('KeyW'));if(this.settings.dodge==='cursor'||(!dx&&!dy)){dx=Math.cos(this.aim);dy=Math.sin(this.aim);}const end=C.dashEnd(this.p.x,this.p.y,dx,dy,(x,y)=>C.validPosition(x,y,13,this.world.obstacles));const len=Math.hypot(dx,dy)||1;while(Math.hypot(end.x-this.p.x,end.y-this.p.y)>=8&&this.enemies.some(e=>!e.dead&&Math.hypot(end.x-e.x,end.y-e.y)<13+e.spec.radius*.8)){end.x-=dx/len*4;end.y-=dy/len*4;}if(Math.hypot(end.x-this.p.x,end.y-this.p.y)<8){this.toast('Não há espaço para esquivar nessa direção.');return;}
  this.action=null;this.cooldowns.dash=10;this.dash={x:this.p.x,y:this.p.y,tx:end.x,ty:end.y,elapsed:0};this.p.flags.dodged=true;this.sound.tone(500,.15,'sine',.014,.45);
 }
 potion(kind){if(this.state!=='play'||this.panel)return;const s=C.stats(this.p);if(this.cooldowns[kind]>0||this.p.potions[kind]<1)return;if((kind==='hp'&&this.p.hp>=s.hp)||(kind==='mp'&&this.p.mp>=s.mp)){this.toast(kind==='hp'?'Sua vida já está completa.':'Sua mana já está completa.');return;}this.p.potions[kind]--;this.cooldowns[kind]=20;if(kind==='hp'){const v=Math.min(80,s.hp-this.p.hp);this.p.hp+=v;this.float('+'+Math.round(v),this.p.x,this.p.y-55,'#a7d3a0');}else this.mpHeal+=60;this.effect('ring',this.p.x,this.p.y,.6,{radius:35,color:kind==='hp'?'#a6d79a':'#91c1de'});this.sound.tone(560,.3,'sine',.02,1.5);this.save();}
 enemyUpdate(e,dt){
  e.flash=Math.max(0,e.flash-dt);if(e.dead){e.respawn-=dt;if(e.respawn<=0)Object.assign(e,this.newEnemy(e));return;}e.cooldown-=dt;
  const p=this.p,dist=Math.hypot(e.x-p.x,e.y-p.y),homeDist=Math.hypot(e.x-e.sx,e.y-e.sy),safe=CursorRules.isSafe(p.x,p.y);
  if(e.state==='return'||homeDist>(e.type==='boss'?240:320)||safe&&e.state!=='idle'){
    e.state='return';e.hp=Math.min(e.spec.hp,e.hp+e.spec.hp*.2*dt);if(homeDist<8){e.state='idle';e.hp=e.spec.hp;}else this.steer(e,(e.sx-e.x)/homeDist,(e.sy-e.y)/homeDist,e.spec.speed*1.35*dt);return;
  }
  if(e.state==='windup'){e.timer+=dt;if(e.timer>=e.spec.windup){this.enemyRelease(e);e.state='recover';e.timer=0;e.cooldown=e.spec.cooldown*(e.type==='boss'&&e.hp<e.spec.hp*.5?.75:1);}return;}
  if(e.state==='recover'){e.timer+=dt;if(e.timer>.4)e.state='chase';return;}
  if(dist<(e.type==='boss'?220:190)&&!safe)e.state='chase';if(e.state==='chase'){
    if(dist>440){e.state='return';return;}
    if(dist<=e.spec.range+10&&e.cooldown<=0){e.state='windup';e.timer=0;e.attackAngle=Math.atan2(p.y-e.y,p.x-e.x);e.targetX=p.x;e.targetY=p.y;return;}
    if(dist>e.spec.range*.75)this.steer(e,(p.x-e.x)/dist,(p.y-e.y)/dist,e.spec.speed*dt);
  }else {e.wander+=dt*.23;const tx=e.sx+Math.cos(e.wander)*23,ty=e.sy+Math.sin(e.wander*.77)*17,dd=Math.hypot(tx-e.x,ty-e.y);if(dd>4)this.steer(e,(tx-e.x)/dd,(ty-e.y)/dd,e.spec.speed*.23*dt);}
 }
 steer(e,dx,dy,d){const oldX=e.x,oldY=e.y;this.move(e,dx*d,dy*d);if(Math.hypot(e.x-oldX,e.y-oldY)<d*.25){const turn=e.id%2?1:-1;this.move(e,-dy*d*turn,dx*d*turn);}}
 enemyRelease(e){
  if(e.type==='gosma'){const a=Math.atan2(e.targetY-e.y,e.targetX-e.x);this.projectiles.push({x:e.x,y:e.y-10,vx:Math.cos(a)*175,vy:Math.sin(a)*175,power:e.spec.power,life:3});this.sound.tone(700,.16,'sine',.008,.6);}
  else if(e.type==='boss'){this.effect('root',e.targetX,e.targetY,.5,{});this.particles(e.targetX,e.targetY,'#b19d65',14);if(Math.hypot(this.p.x-e.targetX,this.p.y-e.targetY)<112+13){const hit=this.takeDamage(e.spec.power,'physical',e.x,e.y,true);if(hit&&!(this.dash&&this.dash.elapsed<.2))this.rootTime=.8;}this.shake=Math.max(this.shake,2);}
  else if(C.cone(e.x,e.y,e.attackAngle,this.p.x,this.p.y,e.spec.range,1.6,13))this.takeDamage(e.spec.power,e.spec.kind,e.x,e.y,false);
 }
 takeDamage(power,kind,x,y,ground){
  if(this.dash&&this.dash.elapsed<.2){this.float('ESQUIVA',this.p.x,this.p.y-58,'#c7ddba');return false;}const s=C.stats(this.p),angle=Math.atan2(y-this.p.y,x-this.p.x),front=Math.abs(Math.atan2(Math.sin(angle-this.aim),Math.cos(angle-this.aim)))<=Math.PI/3,block=this.blockTime>0&&front&&!ground;
  const dmg=C.damage(power,kind==='magic'?s.magicDefense:s.defense,false,block);this.p.hp-=dmg;this.combat=8;this.hitFlash=.4;this.shake=block?1:2;this.float((block?'BLOQUEIO ':'−')+dmg,this.p.x,this.p.y-52,block?'#decea0':'#e6a193');this.sound.hit();if(this.p.hp<=0)this.die();return true;
 }
 kill(e){
  e.dead=true;e.hp=0;e.respawn=e.type==='boss'?95:24+e.id%5*2;this.gainXP(e.spec.xp);if(e.type==='boss')this.p.flags.boss=true;else this.p.flags[e.type]++;
  this.loot.push({x:e.x,y:e.y,kind:'gold',amount:e.spec.gold,life:120});if(Math.random()<.23)this.loot.push({x:e.x+16,y:e.y+5,kind:Math.random()<.7?'hp':'mp',amount:1,life:120});
  this.effect('ring',e.x,e.y,.5,{radius:e.type==='boss'?90:30,color:e.type==='boss'?'#e8cd8f':'#a9c4a1'});this.particles(e.x,e.y-12,e.type==='boss'?'#ddc27d':'#bdcc94',e.type==='boss'?26:10);if(e.type==='boss'){this.toast('O Cerne caiu. A floresta respira outra vez. Volte a Aelric.','levelup');this.sound.chime();}this.save();
 }
 gainXP(amount){const levels=C.gainXP(this.p,amount);this.float('+'+amount+' EXP',this.p.x,this.p.y-66,'#d4c68c');if(levels){this.toast('Nível '+this.p.level+' · +'+5*levels+' atributos · +'+levels+' talento'+(levels>1?'s':''),'levelup');this.effect('ring',this.p.x,this.p.y,.9,{radius:100,color:'#ead797'});this.sound.chime();}}
 die(){this.deadCount++;this.p.x=C.SPAWN.x;this.p.y=C.SPAWN.y;const s=C.stats(this.p);this.p.hp=s.hp;this.p.mp=s.mp;this.action=null;this.dash=null;this.rootTime=0;this.blockTime=0;this.combat=0;this.projectiles=[];for(const e of this.enemies)if(!e.dead)e.state='return';this.mouse.down=false;this.save();this.open('death');}
 effect(type,x,y,life,extra){if(!this.settings.effects&&type==='particle')return;this.effects.push({type,x,y,life,max:life,...extra});}
 particles(x,y,color,count){if(!this.settings.effects)return;for(let i=0;i<count;i++){const a=Math.random()*7,s=20+Math.random()*70;this.effect('particle',x,y,.2+Math.random()*.3,{color,vx:Math.cos(a)*s,vy:Math.sin(a)*s});}}
 float(text,x,y,color='#ddd1a4',big=false){this.floaters.push({text:String(text),x,y,color,big,life:1,max:1});}
 toast(text,kind=''){this.ui?.system(text);const el=document.createElement('div');el.className='toast '+kind;el.textContent=text;$('toastList').append(el);while($('toastList').children.length>4)$('toastList').firstChild.remove();setTimeout(()=>el.remove(),5200);}
 getNear(){const p=this.p,targets=[...this.world.npcs.filter(n=>n.id!=='dummy'),...this.world.crystals.filter(c=>!p.flags.crystals.includes(c.id)).map(c=>({...c,id:'crystal'+c.id,crystalID:c.id,name:'Cristal da Aurora'}))];return targets.filter(n=>Math.hypot(n.x-p.x,n.y-p.y)<85).sort((a,b)=>Math.hypot(a.x-p.x,a.y-p.y)-Math.hypot(b.x-p.x,b.y-p.y))[0]||null;}
 interact(clicked=false,target=null){if(this.panel||this.state!=='play')return;const n=target||this.getNear();if(!n){if(clicked)this.toast('Aproxime-se de Aelric, de um santuário ou de um cristal.');return;}if(!this.canReachInteraction(n)){this.toast('Aproxime-se de '+n.name+'.');return;}if(n.id==='aelric')this.open('guide');else if(n.id==='stone'){this.p.flags.stone=true;this.open('stone');this.sound.chime();this.save();}else if(n.id==='shrine'){if(this.combat>0){this.toast('O santuário só pode ser usado fora de combate.');return;}const s=C.stats(this.p);this.p.hp=s.hp;this.p.mp=s.mp;this.p.potions.hp=Math.max(this.p.potions.hp,5);this.p.potions.mp=Math.max(this.p.potions.mp,3);this.effect('ring',this.p.x,this.p.y,.7,{radius:75,color:'#a2dbcc'});this.toast('Vida, mana e provisões restauradas.');this.sound.chime();this.save();}else if(n.id.startsWith('crystal')){if(this.p.flags.crystals.includes(n.crystalID))return;this.p.flags.crystals.push(n.crystalID);this.gainXP(10);this.toast('Cristal da Aurora recolhido ('+this.p.flags.crystals.length+'/3).');this.particles(n.x,n.y-15,'#b3e0c5',14);this.sound.chime();this.save();}}
 dropGold(amount){
  if(this.state!=='play'||this.panel!=='inventory'||!Number.isSafeInteger(amount)||amount<1||!Number.isSafeInteger(this.p.gold)||amount>this.p.gold||this.loot.filter(l=>l.playerDropped&&l.life>0).length>=200)return false;
  let position=null;for(const radius of [30,22,14,0]){for(const turn of [0,.7,-.7,1.57,-1.57,3.14]){const x=this.p.x+Math.cos(this.aim+turn)*radius,y=this.p.y+Math.sin(this.aim+turn)*radius;if(C.validPosition(x,y,4,this.world.obstacles)&&this.canReachInteraction({x,y})){position={x,y};break;}}if(position)break;}
  if(!position)return false;
  const item={id:'gold-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,10),...position,kind:'gold',amount,life:120,playerDropped:true};
  this.p.gold-=amount;this.loot.push(item);this.save();this.ui.system('Você soltou '+amount.toLocaleString('pt-BR')+' moedas no chão.');return true;
 }
 questTurnInReady(npc){return npc.id==='aelric'&&this.p.quest>0&&this.p.quest<6&&C.questReady(this.p);}
 canAttackTarget(e){return CursorRules.attackable(this.p,e);}
 pointerTarget(point=this.mouseWorld()){return CursorRules.pick(this,point);}
 canReachInteraction(target){const d=Math.hypot(target.x-this.p.x,target.y-this.p.y);if(d>85)return false;for(let t=8;t<d;t+=8){const x=this.p.x+(target.x-this.p.x)*t/d,y=this.p.y+(target.y-this.p.y)*t/d;if(!C.validPosition(x,y,4,this.world.obstacles))return false;}return true;}
 worldPointerDown(e){
  if(this.state!=='play'||this.panel||![0,2].includes(e.button))return;
  this.mouse.x=e.clientX;this.mouse.y=e.clientY;this.updateAim();this.sound.init();const target=this.pointerTarget();
  this.mouse.down=false;
  if(target.kind==='loot'&&!e.shiftKey){this.pickupLoot(target.entity);return;}
  if(['npc','gather','object'].includes(target.kind)&&!e.shiftKey){this.interact(true,target.entity);return;}
  if(e.button===0){this.mouse.down=true;this.basic();}
 }
 pickupLoot(item){
  if(this.state!=='play'||this.panel||!this.loot.includes(item)||item.life<=0)return false;
  if(!this.canReachInteraction(item)){this.toast('Aproxime-se do item para recolher.');return false;}
  if(item.kind!=='gold'&&this.p.potions[item.kind]>=99){this.toast('Sua reserva deste consumível está cheia.');return false;}
  // Remove a instância antes de conceder para impedir duplicação por clique repetido.
  item.life=0;this.loot=this.loot.filter(l=>l!==item);
  if(item.kind==='gold'){this.p.gold+=item.amount;this.float('+'+item.amount+' ouro',item.x,item.y-10,'#ead38a');}
  else{this.p.potions[item.kind]++;this.toast('Recolheu uma poção de '+(item.kind==='hp'?'vida':'mana')+'.');}
  this.sound.tone(620,.12,'sine',.015,1.3);this.save();return true;
 }
 updateZone(){const p=this.p;const zone=p.x>2250&&p.y<790?'Ruínas do Cerne':p.x>1750?'Trilha das Raízes':Math.abs(p.x-C.riverX(p.y))<200?'Ponte das Raízes':p.y<1130?'Jardim dos Cristais':p.y<1430?'Vereda dos Esporos':'Clareira do Primeiro Juramento';if(zone!==this.zone){const initial=!this.zone;this.zone=zone;$('areaName').textContent=zone;if(!initial)this.ui.system('Você descobriu: '+zone+'.');}}
 save(){if(this.state!=='play')return;try{localStorage.setItem(KEY,JSON.stringify(this.snapshot()));this.storageOK=true;$('saveIndicator').textContent='● SALVO NESTE NAVEGADOR';$('saveIndicator').classList.remove('save-error');}catch{this.storageOK=false;$('saveIndicator').textContent='EXPORTAR JORNADA EM OPÇÕES';$('saveIndicator').classList.add('save-error');}}
 snapshot(){return{game:'Mythos Online',version:1,player:this.p,settings:this.settings,groundGold:this.loot.filter(l=>l.playerDropped&&l.life>0).map(({id,x,y,amount,life})=>({id,x,y,amount,life})),savedAt:new Date().toISOString()};}
 exportSave(){const blob=new Blob([JSON.stringify(this.snapshot(),null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='Mythos_Aurora_Jornada.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),2000);}
 refreshHUD(){
  const p=this.p,s=C.stats(p);$('heroName').textContent=p.name;$('level').textContent='NV '+p.level;$('hpText').textContent=Math.ceil(p.hp)+' / '+s.hp;$('mpText').textContent=Math.floor(p.mp)+' / '+s.mp;$('hpFill').style.width=(p.hp/s.hp*100)+'%';$('mpFill').style.width=(p.mp/s.mp*100)+'%';$('xpFill').style.width=(p.xp/C.xpFor(p.level)*100)+'%';$('xpFill').parentElement.title=p.xp+' / '+C.xpFor(p.level)+' EXP';$('pointBadge').textContent=p.unspent?'+'+p.unspent:'';$('pointBadge').hidden=!p.unspent;this.ui.refresh();
  for(const kind of ['hp','mp']){const b=$(kind+'Potion');b.querySelector('b').textContent=p.potions[kind];b.querySelector('em').textContent=this.cooldowns[kind]>0?Math.ceil(this.cooldowns[kind]):'';}
  $('dashSlot').querySelector('em').textContent=this.cooldowns.dash>0?Math.ceil(this.cooldowns.dash):'';
  for(const [i,id,learned]of[[1,'frontal',p.learned],[2,'block',p.blockLearned]]){const b=$('skill'+i);b.classList.toggle('locked',!learned);b.querySelector('em').textContent=learned?(this.cooldowns[id]>0?Math.ceil(this.cooldowns[id]):''):'';}
  const q=this.questData();$('questTitle').textContent=q.title;$('questGoals').innerHTML=q.goals.map(([text,done])=>`<div class="goal ${done?'done':''}">${escapeHTML(text)}</div>`).join('');$('questHint').textContent=q.hint;
  $('interaction').hidden=!this.near||!!this.panel;if(this.near)$('interaction').querySelector('span').textContent=(this.near.id==='aelric'?'Conversar com ':this.near.id==='shrine'?'Descansar no ':this.near.id==='stone'?'Examinar ':'Recolher ')+this.near.name;
  const m=this.mouseWorld(),hovered=this.pointerTarget(m);this.target=(hovered.kind==='enemy'?hovered.entity:null)||(this.target&&!this.target.dead&&Math.hypot(this.target.x-p.x,this.target.y-p.y)<280?this.target:null);$('enemyTarget').hidden=!this.target;if(this.target){const b=$('enemyTarget');b.querySelector('strong').textContent=this.target.spec.name+' · NV '+this.target.spec.level;b.querySelector('i').style.width=this.target.hp/this.target.spec.hp*100+'%';b.querySelector('.bar span').textContent=Math.ceil(this.target.hp)+' / '+this.target.spec.hp;}
  $('skillHint').textContent=this.rootTime>0?'Enraizado · aguarde o efeito terminar':this.combat>0?'Em combate · Q esquiva · F1 vida · F2 mana':p.learned?'1 Golpe Frontal · 2 Bastião · Q esquiva':'Clique para atacar · WASD para explorar · Q esquiva';this.renderer.map($('minimap'),false,this.ui.mapZoom);
 }
 questData(){const f=this.p.flags;switch(this.p.quest){
  case 0:return{title:'O primeiro juramento',goals:[['Converse com Aelric',false]],hint:'O guia espera junto à bandeira azul, ao norte da clareira.'};
  case 1:return{title:'Passos na floresta',goals:[['Examine a Pedra do Juramento',f.stone],['Use a esquiva com Q',f.dodged],...(f.stone&&f.dodged?[['Volte a Aelric',false]]:[])],hint:'Siga a trilha para nordeste. F permite interagir.'};
  case 2:return{title:'Esporos e éter',goals:[[`Brotos de Esporos: ${Math.min(3,f.broto)} / 3`,f.broto>=3],[`Gosmas de Éter: ${Math.min(2,f.gosma)} / 2`,f.gosma>=2],...(f.broto>=3&&f.gosma>=2?[['Volte a Aelric',false]]:[])],hint:'As criaturas vivem a noroeste da pedra. Ataque na direção do mouse.'};
  case 3:return{title:'A luz sob as folhas',goals:[[`Cristais da Aurora: ${f.crystals.length} / 3`,f.crystals.length>=3],...(f.crystals.length>=3?[['Volte a Aelric',false]]:[])],hint:'Três cristais brilham no jardim ao norte. Veja os pontos no mapa [M].'};
  case 4:return{title:'O despertar do aço',goals:[['Alcance o nível 5',this.p.level>=5],['Aprenda Golpe Frontal com Aelric',this.p.learned]],hint:'Treine com o guia. C distribui atributos; T abre a árvore.'};
  case 5:return{title:'O coração corrompido',goals:[['Derrote o Cerne Corrompido',f.boss],...(f.boss?[['Volte a Aelric',false]]:[])],hint:'Atravesse a ponte e siga para nordeste. Saia dos círculos de raízes.'};
  default:return{title:'Uma história para continuar',goals:[['Bosque da Aurora protegido',true],['Explore, treine e experimente sua build',false]],hint:'Sua primeira jornada está completa. Novas áreas nascerão nas próximas versões.'};}}
 close(){this.inventory?.dismiss();$('modal').classList.remove('inventory-modal');this.panel=null;$('hud').inert=false;$('modalBackdrop').hidden=true;this.mouse.down=false;this.keys.clear();this.save();}
 open(panel){if(this.state!=='play')return;this.inventory?.dismiss();this.panel=panel;$('modal').classList.toggle('inventory-modal',panel==='inventory');$('hud').inert=true;this.keys.clear();this.mouse.down=false;$('modalBackdrop').hidden=false;$('modalBody').innerHTML='';const names={guide:['GUIA DOS PRIMEIROS JURAMENTOS','Aelric, o Vigia'],character:['CONTRATO DO AÇO','Seu Guardião'],inventory:['EQUIPAMENTOS E PROVISÕES','Mochila'],tree:['CAMINHOS DE PODER','Árvore de talentos'],map:['REGIÃO INICIAL · NÍVEIS 1–6','Bosque da Aurora'],settings:['PROTÓTIPO OFFLINE · VERSÃO 0.7','Opções e análise'],stone:['O PRIMEIRO JURAMENTO','Memória da clareira'],death:['O SANTUÁRIO O CHAMOU','Um novo fôlego']};$('modalEyebrow').textContent=names[panel][0];$('modalTitle').textContent=names[panel][1];this.renderPanel(panel);$('closeModal').focus();}
 renderPanel(panel){const body=$('modalBody'),p=this.p,s=C.stats(p);if(panel==='guide')return this.guidePanel();
  if(panel==='character'){
   body.innerHTML=`<div class="panel-grid"><div class="paper-card"><h3>${escapeHTML(p.name)} <span class="gold">· Nível ${p.level}</span></h3><p class="muted">Guardião · Armadura pesada · Origem no Bosque da Aurora</p><div class="level-points">${p.unspent} pontos de atributos disponíveis</div>${C.ATTRS.map(k=>`<div class="stat-row"><span>${attrNames[k]}<br><small>${{forca:'Poder físico de armas pesadas',destreza:'Atributo de armas ágeis e requisitos',magia:'Mana e requisitos mágicos',vitalidade:'20 de vida por ponto'}[k]}</small></span><b>${s[k]}</b><button data-attr="${k}" ${p.unspent<1?'disabled':''} aria-label="Aumentar ${attrNames[k]}">+</button></div>`).join('')}<p class="muted" style="margin-top:14px">Cada nível concede 5 pontos. Talentos também somam atributos.</p></div><div class="paper-card"><h3>Estado de combate</h3>${[['Vida máxima',s.hp],['Mana máxima',s.mp],['Poder da arma primária',s.power.toFixed(1)],['Poder da arma secundária',s.secondaryPower.toFixed(1)],['Defesa física',s.defense.toFixed(0)],['Redução física',(s.defense/(s.defense+500)*100).toFixed(1)+'%'],['Defesa mágica',s.magicDefense],['Chance crítica',(s.crit*100).toFixed(0)+'%'],['Dano crítico','150%'],['EXP atual',p.xp+' / '+C.xpFor(p.level)],['Pontos de talentos',p.treePoints]].map(([k,v])=>`<div class="stat-row"><span>${k}</span><b>${v}</b></div>`).join('')}</div></div>`;
   body.querySelectorAll('[data-attr]').forEach(b=>b.onclick=()=>{C.allocate(p,b.dataset.attr);this.renderPanel('character');this.refreshHUD();this.save();});
  }else if(panel==='inventory'){
   this.inventory.render();
  }else if(panel==='tree')this.treePanel();
  else if(panel==='map'){body.innerHTML='<canvas id="largeMap" width="900" height="600" class="map-large"></canvas><div class="legend"><span>▲ Você</span><span class="gold">● Aelric</span><span style="color:#94e2c9">● Cristais</span><span style="color:#d78c72">● Cerne Corrompido</span></div><p class="muted" style="margin-top:10px">A ponte é a passagem segura pelo rio. Troncos, rochas, água e colunas possuem colisão.</p>';this.renderer.map($('largeMap'),true);}
  else if(panel==='settings')this.settingsPanel();
  else if(panel==='stone'){body.innerHTML='<div class="dialog-speaker"><div class="npc-portrait">✧</div><div><h3>“Nenhuma árvore escolhe a forma de suas raízes.</h3><p class="gold">Mas você pode escolher aonde elas chegam.”</p></div></div><p>Um juramento antigo está gravado na pedra. Defender não significa permanecer imóvel: observe a intenção do inimigo e saia do alcance antes do impacto.</p><div class="notice"><kbd>Q</kbd> Passo Evasivo · até 3 metros em 0,3 s · recarga de 10 s. Os primeiros 0,2 s evitam dano e novos controles. A esquiva atravessa criaturas e respeita o terreno.</div><div class="button-row"><button id="stoneDone" class="primary">Continuar minha jornada</button></div>';$('stoneDone').onclick=()=>this.close();}
  else if(panel==='death'){body.innerHTML='<p>O bosque ainda guarda caminhos perigosos. A luz do santuário trouxe você de volta à clareira com a vida e a mana restauradas.</p><div class="notice">Nesta versão de análise, a derrota não remove ouro, EXP ou equipamentos. Observe as áreas marcadas no chão, use Q para sair do perigo e F1 para recuperar vida.</div><div class="button-row"><button id="revive" class="primary">Voltar à floresta</button></div>';$('revive').onclick=()=>this.close();}
 }
 guidePanel(){
  const p=this.p,f=p.flags,body=$('modalBody'),q=this.questData(),ready=C.questReady(p);
  const speeches=[
   'Vejo que trouxe uma espada… mas uma lâmina não faz um Guardião. Este bosque sente algo crescer sob as ruínas. Antes de investigar, aprenda a ouvir o lugar que vai proteger.',
   ready?'Você encontrou a pedra e aprendeu a se mover. Agora precisamos abrir as trilhas: esporos instáveis e criaturas de éter estão chegando perto da clareira.':'Siga a trilha para nordeste até a Pedra do Juramento. Examine-a e experimente um passo evasivo. O bosque ensina a quem presta atenção.',
   ready?'Bom trabalho. Um Guardião sabe a hora de avançar. Agora traga três cristais vivos do jardim ao norte. A luz deles vai despertar sua técnica.':'Brotos e gosmas ocupam o jardim. Enfrente três brotos e duas gosmas. Observe o preparo dos golpes e saia do alcance antes do impacto.',
   ready?'Os cristais ainda estão vivos. Essa luz merece um protetor. Chegou o momento de dar intenção ao aço.':'Há três cristais na trilha do jardim. Aproxime-se e use F. O mapa mostra a luz deles sob as árvores.',
   'Golpe Frontal transforma um movimento de espada em uma técnica. No nível 5, posso ensinar você a conduzir sua força. Também vamos treinar a Postura de Bastião para enfrentar o que habita as ruínas.',
   f.boss?'A floresta voltou a respirar. Não foi a espada sozinha que a salvou: foram suas escolhas. Leve esta armadura e faça do seu poder uma história que mereça ser contada.':'Atravesse a ponte e siga até as ruínas a nordeste. O Cerne Corrompido enraizou a pedra antiga. Quando o chão brilhar, recue: seu escudo não detém raízes que vêm de baixo.',
   'Este foi apenas seu primeiro juramento. Explore, experimente equipamentos e encontre seu próprio caminho na árvore. A próxima história será sua.'
  ];
  body.innerHTML=`<div class="dialog-speaker"><div class="npc-portrait">♙</div><div><h3>Aelric, o Vigia</h3><span class="muted">Guia dos iniciantes · Mestre do Guardião</span></div></div><p>${speeches[p.quest]}</p><div class="quest-checklist"><b class="gold">${q.title}</b>${q.goals.map(([text,done])=>`<div>${done?'✓':'◇'} ${escapeHTML(text)}</div>`).join('')}</div><div id="guideRewards"></div><div class="button-row" id="guideActions"></div>`;
  const actions=$('guideActions');const button=(text,handler,primary=false,disabled=false)=>{const b=document.createElement('button');b.textContent=text;if(primary)b.className='primary';b.disabled=disabled;b.onclick=handler;actions.append(b);};
  if(p.quest===4){
   $('guideRewards').innerHTML='<span class="reward">Golpe Frontal · 140% do poder · 10 mana · 5 s</span><span class="reward">Bastião · bloqueio frontal de 70% por 2 s</span><p class="muted" style="margin-top:12px">Treinamento: nível 5, 3 cristais e 5 de ouro. Recompensa: Lâmina do Primeiro Juramento. Se faltar EXP, continue enfrentando criaturas.</p>';
   button(p.learned?'Concluir treinamento':'Aprender técnicas · 5 ouro',()=>{if(!p.learned){if(p.level<5||p.gold<5||f.crystals.length<3)return;p.gold-=5;p.learned=true;p.blockLearned=true;this.sound.chime();}C.turnIn(p);this.save();this.refreshHUD();this.guidePanel();},true,p.level<5||!p.learned&&(p.gold<5||f.crystals.length<3));
  }else if(ready&&p.quest<6){
   const labels=['Aceitar o primeiro juramento','Concluir · explorar as trilhas','Concluir · receber recompensa','Entregar cristais','', 'Concluir · receber Cota da Aurora'];
   $('guideRewards').innerHTML=(p.quest===0?'':p.quest===1?'<span class="reward">40 EXP · 8 ouro</span>':p.quest===2?'<span class="reward">70 EXP · 15 ouro · Escudo de Carvalho Antigo</span>':p.quest===3?'<span class="reward">60 EXP · 15 ouro</span>':'<span class="reward">100 EXP · 35 ouro · Cota da Aurora</span>');
   button(labels[p.quest],()=>{const before=p.level;if(C.turnIn(p)){if(p.level>before){this.toast('Nível '+p.level+' · novos pontos disponíveis','levelup');this.sound.chime();}this.save();this.refreshHUD();this.guidePanel();}},true);
  }
  button('Voltar à floresta',()=>this.close());
  if(p.quest>=4&&!p.learned&&p.level<5)button('Como ganhar EXP?',()=>this.toast('Derrote criaturas no jardim. Elas reaparecem após alguns segundos.'));
 }
 treePanel(){
  const p=this.p,body=$('modalBody');body.innerHTML=`<div style="display:flex;justify-content:space-between;gap:20px"><p><span class="gold">${p.treePoints} ponto${p.treePoints!==1?'s':''} disponíve${p.treePoints!==1?'is':'l'}</span> · 1 ponto por nível, a partir do nível 2.</p><button id="treeReset" ${p.tree.length<1||p.gold<20||this.combat>0||Math.hypot(p.x-715,p.y-1610)>230?'disabled':''}>Reiniciar · 20 ouro</button></div><div class="tree-wrap"><svg id="treeSvg" viewBox="-410 -385 820 510" role="img" aria-label="Recorte navegável da árvore do Guardião"></svg></div><div id="nodeInfo" class="notice" style="margin-top:12px">Escolha um nó conectado ao seu caminho. Cada nó custa 1 ponto, incluindo Bastião de Ferro.</div><p class="muted" style="margin-top:10px">Recorte inicial da árvore compartilhada. A versão completa será expandida com novas classes e ramificações.</p>`;
  const svg=$('treeSvg');let html='';for(const n of C.TREE)for(const id of n.parents){const par=C.TREE.find(x=>x.id===id);html+=`<line x1="${n.x}" y1="${n.y}" x2="${par.x}" y2="${par.y}" stroke="${p.tree.includes(n.id)?'#a99a60':'#4a614b'}" stroke-width="${p.tree.includes(n.id)?3:2}"/>`;}
  for(const n of C.TREE){const owned=n.id==='root'||p.tree.includes(n.id),available=C.canNode(p,n.id),r=n.notable?29:n.id==='root'?30:21;html+=`<g class="tree-node ${owned?'owned':available?'available':'locked'}" data-node="${n.id}" role="button" tabindex="0" aria-label="${n.title}: ${n.desc}"><circle cx="${n.x}" cy="${n.y}" r="${r}"/><text x="${n.x}" y="${n.y+6}" text-anchor="middle" style="font-size:${n.notable?22:17}px">${n.id==='root'?'♜':owned?'✦':n.notable?'⛨':'◇'}</text><text x="${n.x}" y="${n.y+r+20}" text-anchor="middle" style="font-size:12px">${n.title}</text></g>`;}svg.innerHTML=html;
  svg.querySelectorAll('[data-node]').forEach(el=>{const choose=()=>{const n=C.TREE.find(n=>n.id===el.dataset.node);$('nodeInfo').textContent=n.title+' · '+n.desc+(n.id==='root'?'':p.tree.includes(n.id)?' · Já escolhido.':C.canNode(p,n.id)?' · Clique novamente para investir 1 ponto.':' · Requer um caminho conectado e 1 ponto disponível.');if(this.selectedNode===n.id&&C.buyNode(p,n.id)){this.sound.tone(620,.25,'sine',.02,1.3);this.save();this.refreshHUD();this.treePanel();}this.selectedNode=n.id;};el.onclick=choose;el.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();choose();}};});
  $('treeReset').onclick=()=>{p.gold-=20;p.treePoints+=p.tree.length;p.tree=[];C.enforceEquipment(p);const s=C.stats(p);p.hp=Math.min(p.hp,s.hp);p.mp=Math.min(p.mp,s.mp);this.selectedNode=null;this.save();this.treePanel();};
 }
 settingsPanel(){
  const body=$('modalBody');body.innerHTML=`<div class="settings-grid"><section class="paper-card"><h3>Preferências</h3><label class="toggle-line">Sons e ambiente <input id="audioSetting" type="checkbox" ${this.settings.audio?'checked':''}></label><label class="toggle-line">Partículas e impacto <input id="effectsSetting" type="checkbox" ${this.settings.effects?'checked':''}></label><label class="toggle-line">Direção da esquiva <select id="dodgeSetting"><option value="movement" ${this.settings.dodge==='movement'?'selected':''}>WASD, ou mouse parado</option><option value="cursor" ${this.settings.dodge==='cursor'?'selected':''}>Sempre o mouse</option></select></label><p class="muted">Painéis pausam a simulação. O chat é local nesta versão offline e mantém o mundo em movimento.</p><h3 style="margin-top:20px">Sua jornada</h3><p class="muted">O jogo salva automaticamente neste navegador. Exporte uma cópia para levar seu progresso a outro navegador ou computador.</p><div class="button-row"><button id="exportSave">Exportar jornada</button><button id="importSave">Importar jornada</button></div><p class="muted" style="margin-top:12px">${this.storageOK?'Salvamento local disponível.':'Salvamento local indisponível: use a exportação.'}</p></section><section class="paper-card"><h3>Controles</h3><div class="key-guide"><kbd>Enter / Esc</kbd><span>Escrever no chat / voltar ao jogo</span><kbd>W A S D</kbd><span>Movimentação</span><kbd>Mouse esquerdo</kbd><span>Mirar e atacar; segure para repetir</span><kbd>1</kbd><span>Golpe Frontal (aprenda no nível 5)</span><kbd>2</kbd><span>Postura de Bastião</span><kbd>Q</kbd><span>Esquiva · 10 s de recarga</span><kbd>F1 / F2</kbd><span>Poções de vida / mana</span><kbd>F / clique direito</kbd><span>Interagir quando próximo</span><kbd>C / I / T / M</kbd><span>Atributos / mochila / árvore / mapa</span><kbd>Esc</kbd><span>Pausar / fechar painel</span></div></section></div><div class="button-row"><button id="resume" class="primary">Voltar à floresta</button><button id="analysisTools">Ferramentas de análise</button><button id="restart" class="danger">Recomeçar jornada</button></div><div id="analysisPanel" hidden class="notice" style="margin-top:18px"><b class="gold">Ferramentas de teste</b><p>Atalhos para avaliar o protótipo. Alteram o salvamento atual.</p><div class="button-row"><button id="testTraining">Preparar Guardião nível 5</button><button id="testBoss">Ir às ruínas</button><button id="testCamp">Voltar à clareira</button><button id="testHeal">Restaurar vida e mana</button><button id="testTwoHand">Adicionar arma de duas mãos</button></div></div><p class="muted" style="margin-top:18px">Mythos Online · Bosque da Aurora v0.7 · Área e combate offline. Valores desta área são calibráveis; ainda não há conexão com o servidor.</p>`;
  $('audioSetting').onchange=e=>{this.settings.audio=e.target.checked;this.sound.enabled=this.settings.audio;this.sound.init();this.save();};$('effectsSetting').onchange=e=>{this.settings.effects=e.target.checked;this.save();};$('dodgeSetting').onchange=e=>{this.settings.dodge=e.target.value;this.save();};$('exportSave').onclick=()=>this.exportSave();$('importSave').onclick=()=>$('saveFile').click();$('resume').onclick=()=>this.close();$('analysisTools').onclick=()=>$('analysisPanel').hidden=!$('analysisPanel').hidden;
  $('testTraining').onclick=()=>{while(this.p.level<5)C.gainXP(this.p,C.xpFor(this.p.level)-this.p.xp);this.p.gold=Math.max(100,this.p.gold);this.p.flags.stone=true;this.p.flags.dodged=true;this.p.flags.broto=Math.max(3,this.p.flags.broto);this.p.flags.gosma=Math.max(2,this.p.flags.gosma);this.p.flags.crystals=[0,1,2];while(this.p.quest<4)C.turnIn(this.p);this.p.x=750;this.p.y=1595;this.resetRuntime();this.save();this.open('guide');this.toast('Teste preparado: nível 5. Aprenda as técnicas com Aelric.');};
  $('testBoss').onclick=()=>{this.p.x=2500;this.p.y=720;this.action=null;this.dash=null;this.combat=0;this.projectiles=[];this.close();};$('testCamp').onclick=()=>{this.p.x=C.SPAWN.x;this.p.y=C.SPAWN.y;this.resetRuntime();this.close();};$('testHeal').onclick=()=>{const s=C.stats(this.p);this.p.hp=s.hp;this.p.mp=s.mp;this.p.potions={hp:10,mp:10};this.save();this.toast('Recursos restaurados.');};
  $('testTwoHand').onclick=()=>{if(!this.p.bag.includes('espadao_treino'))this.p.bag.push('espadao_treino');this.save();this.open('inventory');this.toast('Espadão de Treino adicionado à mochila.');};
  $('restart').onclick=()=>{if(!confirm('Apagar o progresso deste navegador e começar de novo? Exporte sua jornada antes, se quiser guardá-la.'))return;this.p=C.fresh(this.p.name);this.resetRuntime([]);this.close();this.save();this.refreshHUD();this.toast('Uma nova jornada começou.');};
 }
}
window.mythos=new Game();
})();
