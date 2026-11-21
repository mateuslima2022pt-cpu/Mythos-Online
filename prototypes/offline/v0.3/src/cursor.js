/* Os arquivos Windows são transcodificados sem perdas e embutidos no build.
 * Camada sem eventos: a posição de clique continua sendo a posição nativa.
 */
(function(){'use strict';
class MythosCursor{
 constructor(game){
  this.g=game;this.assets=window.MythosCursorAssets||{};this.images={};this.ready=false;this.visible=false;this.mode='normal';this.started=0;this.lastFrame=-1;this.x=0;this.y=0;
  if(!this.assets.normal)return;
  this.canvas=document.createElement('canvas');this.canvas.id='gameCursor';this.canvas.setAttribute('aria-hidden','true');document.body.append(this.canvas);this.ctx=this.canvas.getContext('2d');this.resize();
  const track=e=>{if(e.pointerType==='touch')return;this.x=e.clientX;this.y=e.clientY;this.visible=true;};
  document.addEventListener('pointermove',track,{passive:true});document.addEventListener('pointerdown',track,{passive:true});
  document.addEventListener('pointerout',e=>{if(!e.relatedTarget)this.hide();});
  window.addEventListener('blur',()=>this.hide());window.addEventListener('resize',()=>this.resize());
  const pending=[];for(const [name,asset] of Object.entries(this.assets)){
   this.images[name]=asset.frames.map(frame=>{const im=new Image();pending.push(new Promise((resolve,reject)=>{im.onload=resolve;im.onerror=reject;im.src=frame.src;}));return im;});
  }
  Promise.all(pending).then(()=>{this.ready=true;}).catch(()=>{this.ready=false;this.hide();document.documentElement.classList.remove('mythos-cursor');});
 }
 resize(){if(!this.canvas)return;this.dpr=Math.min(window.devicePixelRatio||1,2);this.canvas.width=32*this.dpr;this.canvas.height=32*this.dpr;this.ctx.setTransform(this.dpr,0,0,this.dpr,0,0);this.lastFrame=-1;}
 hide(){this.visible=false;if(this.canvas)this.canvas.hidden=true;}
 tick(now){
  if(!this.ready)return;this.canvas.hidden=!this.visible;if(!this.visible)return;document.documentElement.classList.add('mythos-cursor');
  const surface=document.elementFromPoint(this.x,this.y),g=this.g;
  const hover=g.state==='play'&&!g.panel&&surface===g.renderer.canvas?g.pointerTarget({x:this.x/g.camera.scale+g.camera.x,y:this.y/g.camera.scale+g.camera.y}):null;
  const mode=hover?.cursor||'normal';if(mode!==this.mode){this.mode=mode;this.started=now;this.lastFrame=-1;}
  const asset=this.assets[this.mode],index=CursorRules.animationFrame(asset,now-this.started),frame=asset.frames[index];
  this.canvas.style.transform='translate3d('+(this.x-frame.hotspot[0])+'px,'+(this.y-frame.hotspot[1])+'px,0)';
  if(index!==this.lastFrame){this.ctx.clearRect(0,0,32,32);this.ctx.drawImage(this.images[this.mode][index],0,0,frame.width,frame.height);this.lastFrame=index;}
 }
}
window.MythosCursor=MythosCursor;
})();
