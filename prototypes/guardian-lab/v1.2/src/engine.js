/* Mythos Online • Laboratório isolado do Guardião. Não acessa saves do jogo. */
(function(root){
'use strict';
const ACTIONS={idle:{label:'Repouso',frames:4,fps:3},walk:{label:'Caminhada',frames:6,fps:8},run:{label:'Corrida',frames:6,fps:12},attack:{label:'Ataque básico',frames:6,fps:10}};
const DIRECTIONS=['south','west','east','north'];
function facing(x,y,previous='south'){if(!x&&!y)return previous;return Math.abs(x)>Math.abs(y)?(x>0?'east':'west'):(y>0?'south':'north');}
function idleFrame(t,blink=true){if(!blink)return 0;const q=((t%3.8)+3.8)%3.8;if(q<3.48)return 0;if(q<3.54)return 1;if(q<3.64)return 2;if(q<3.7)return 1;return 3;}
class Controller{
 constructor(){this.x=450;this.y=350;this.dir='south';this.action='idle';this.clock=0;this.time=0;this.attackTime=0;this.attackSerial=0;this.hitSerial=-1;this.paused=false;this.manual='auto';this.speed=1;this.blink=true;this.keys=new Set();this.attackDir='south';this.stepFrame=0;this.stepping=false;this.moving=false;this.locomotion='idle';this.moveClock=0;}
 get duration(){return ACTIONS.attack.frames/ACTIONS.attack.fps;}
 reset(){this.x=450;this.y=350;this.dir='south';this.manual='auto';this.action='idle';this.clock=0;this.attackTime=0;this.keys.clear();this.stepping=false;this.paused=false;this.moving=false;this.locomotion='idle';this.moveClock=0;}
 attack(dir=this.dir){if(this.paused||this.attackTime>0)return false;this.dir=dir;this.attackDir=dir;this.attackTime=this.duration;this.clock=0;this.attackSerial++;this.stepping=false;return true;}
 choose(action){if(action!=='auto'&&!ACTIONS[action])return;this.manual=action;this.clock=0;this.attackTime=0;this.stepping=false;this.action=action==='auto'?'idle':action;}
 setDirection(dir){if(DIRECTIONS.includes(dir)){this.dir=dir;this.attackDir=dir;}}
 step(){const current=this.frame();this.paused=true;this.stepFrame=(current+1)%ACTIONS[this.action].frames;this.stepping=true;}
 frame(){if(this.stepping)return this.stepFrame;if(this.action==='idle')return idleFrame(this.clock,this.blink);const n=ACTIONS[this.action].frames;return Math.min(n-1,Math.floor(this.clock*ACTIONS[this.action].fps)%n);}
 update(realDelta,bounds={width:900,height:600}){
  const events=[];if(this.paused)return events;this.stepping=false;const dt=Math.min(Math.max(realDelta,0),.05)*this.speed;this.time+=dt;
  const k=this.keys;let dx=Number(k.has('d')||k.has('arrowright'))-Number(k.has('a')||k.has('arrowleft'));let dy=Number(k.has('s')||k.has('arrowdown'))-Number(k.has('w')||k.has('arrowup'));const length=Math.hypot(dx,dy);
  this.moving=length>0&&this.manual==='auto';this.locomotion=this.moving?(k.has('shift')?'run':'walk'):'idle';
  if(this.moving){dx/=length;dy/=length;const velocity=this.locomotion==='run'?210:112;const margin=bounds.marginX??45;this.x=Math.max(margin,Math.min(bounds.width-margin,this.x+dx*velocity*dt));this.y=Math.max(bounds.minY??145,Math.min(bounds.height-40,this.y+dy*velocity*dt));this.moveClock+=dt;}else this.moveClock=0;
  if(this.attackTime>0){this.action='attack';this.clock+=dt;this.attackTime=Math.max(0,this.attackTime-dt);this.dir=this.attackDir;
   if(this.clock>=.3&&this.hitSerial!==this.attackSerial){events.push({type:'hit',x:this.x,y:this.y,dir:this.dir});this.hitSerial=this.attackSerial;}
   if(this.attackTime===0){this.action=this.manual==='auto'?this.locomotion:this.manual;this.clock=0;if(this.moving)this.dir=facing(dx,dy,this.dir);}return events;
  }
  const next=this.manual==='auto'?this.locomotion:this.manual;
  if(next!==this.action){this.clock=0;this.action=next;}
  if(this.moving)this.dir=facing(dx,dy,this.dir);
  this.clock+=dt;
  return events;
 }
}
root.GuardianEngine={ACTIONS,DIRECTIONS,Controller,facing,idleFrame};
})(typeof globalThis!=='undefined'?globalThis:this);
