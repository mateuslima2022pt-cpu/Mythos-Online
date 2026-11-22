/* Adapter: visual state reads the real game; it never applies damage, XP or equipment stats. */
(function(root){'use strict';const DIR=['south','west','east','north'];
function direction(x,y){return Math.abs(x)>Math.abs(y)?(x>0?'east':'west'):(y>0?'south':'north');}
class MythosGuardian{
 constructor(game){this.g=game;this.images={};this.renderer=null;this.portrait=MythosGuardianAssets.portrait;for(const [name,src]of Object.entries(MythosGuardianAssets.images)){const im=new Image();im.src=src;this.images[name]=im;}this.reset();}
 reset(){this.pose={action:'idle',dir:'south',clock:0,time:0,paused:false,frame:()=>this.frame()};this.lastX=this.g.p.x;this.lastY=this.g.p.y;this.currentFrame=0;}
 ensure(){if(this.renderer)return true;if(Object.values(this.images).some(im=>!im.complete||!(im.naturalWidth||im.width)))return false;this.renderer=new MythosGuardianRenderer(this.images,MythosGuardianAssets.atlas);return true;}
 frame(){return this.currentFrame;}
 update(dt){const g=this.g,p=this.pose;const dx=g.p.x-this.lastX,dy=g.p.y-this.lastY,displaced=Math.hypot(dx,dy)>.02;this.lastX=g.p.x;this.lastY=g.p.y;p.time+=dt;p.paused=false;
 let action='idle',dir=direction(Math.cos(g.aim),Math.sin(g.aim));
 if(g.life!=='alive'){action='death';dir=g.deathDirection||p.dir;this.currentFrame=Math.min(5,Math.floor(g.deathTime*8));}
 else if(g.action&&['basic','frontal'].includes(g.action.id)){action='attack';const a=g.action;dir=direction(Math.cos(a.angle),Math.sin(a.angle));this.currentFrame=a.elapsed<a.windup?Math.min(2,Math.floor(a.elapsed/Math.max(.001,a.windup)*3)):Math.min(5,3+Math.floor((a.elapsed-a.windup)/Math.max(.001,a.recovery)*3));}
 else{if(displaced){action=g.running||g.dash?'run':'walk';dir=direction(dx,dy);}if(action!==p.action||dir!==p.dir)p.clock=0;else p.clock+=dt;if(action==='idle'){const q=p.clock%3.8;this.currentFrame=q<3.48?0:q<3.54?1:q<3.64?2:q<3.7?1:3;}else this.currentFrame=Math.floor(p.clock*(action==='run'?12:8))%6;}
 p.action=action;p.dir=dir;}
 draw(c,x,y){if(!this.ensure())return false;const g=this.g;this.pose.paused=!!g.panel;const corpse=g.life!=='alive';g.renderer.shadow(c,x,y,corpse?29:18);c.save();if(g.dash)c.globalAlpha=.58;if(!corpse&&g.blockTime>0){g.renderer.glow(c,x,y-22,40,'#e8d69944');c.strokeStyle='#e9d895aa';c.lineWidth=2;c.beginPath();c.arc(x,y-8,31,g.aim-.9,g.aim+.9);c.stroke();}this.renderer.draw(c,this.pose,x,y,.58,{hair:g.settings.effects&&!corpse});c.restore();return true;}
}
root.MythosGuardian=MythosGuardian;root.MythosGuardianDirection=direction;
})(typeof globalThis!=='undefined'?globalThis:this);
