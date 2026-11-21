(function(root){
'use strict';
class SpriteRenderer{
 constructor(images,atlas){this.images=images;this.atlas=atlas;}
 draw(ctx,model,x,y,zoom=1,options={}){
  const action=model.action,dir=model.dir;const row=GuardianEngine.DIRECTIONS.indexOf(dir);const sheet=this.atlas.sheets[action];const frame=sheet.rows[row].frames[model.frame()];const image=this.images[action];const scale=sheet.rows[row].scale*zoom;const flip=sheet.rows[row].flip;
  let bob=0;if(!model.paused){if(action==='walk')bob=-Math.abs(Math.sin(model.clock*Math.PI*8))*1.8;if(action==='run')bob=-Math.abs(Math.sin(model.clock*Math.PI*12))*5;}
  ctx.save();ctx.translate(x,y+bob*zoom);if(flip)ctx.scale(-1,1);
  if(action==='idle'&&!model.paused){const breath=1+Math.sin(model.time*2.4)*.005;ctx.scale(1,breath);}
  const dx=-frame.anchorX*scale,dy=-frame.anchorY*scale,w=frame.sw*scale,h=frame.sh*scale;
  ctx.imageSmoothingEnabled=options.smoothing!==false;
  // Crown-only strip displacement: low-amplitude wind, no eye/face movement.
  if(action!=='death'&&options.hair!==false&&!model.paused){
   const hairEnd=Math.max(1,Math.round(frame.hairEnd));const strips=6,step=hairEnd/strips;
   for(let n=0;n<strips;n++){const sy=n*step,eh=Math.min(step+.7,hairEnd-sy);const amp=(1-n/strips)*.95*zoom;const offset=Math.sin(model.time*3.1+n*.45)*amp;ctx.drawImage(image,frame.sx,frame.sy+sy,frame.sw,eh,dx+offset,dy+sy*scale,w,eh*scale);}
   ctx.drawImage(image,frame.sx,frame.sy+hairEnd,frame.sw,frame.sh-hairEnd,dx,dy+hairEnd*scale,w,(frame.sh-hairEnd)*scale);
  }else ctx.drawImage(image,frame.sx,frame.sy,frame.sw,frame.sh,dx,dy,w,h);
  if(options.bounds){ctx.strokeStyle='#8bb4ab';ctx.lineWidth=1/zoom;ctx.setLineDash([3,3]);ctx.strokeRect(dx,dy,w,h);ctx.setLineDash([]);ctx.strokeStyle='#f3cf82';ctx.beginPath();ctx.moveTo(-6,0);ctx.lineTo(6,0);ctx.moveTo(0,-6);ctx.lineTo(0,6);ctx.stroke();}
  ctx.restore();
 }
 sheet(ctx,action,cell=this.atlas.sheets[action].cellExport||192){const spec=this.atlas.sheets[action];ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);const fake={action,dir:'south',clock:0,time:0,paused:true,frame:()=>0};for(let row=0;row<4;row++){fake.dir=GuardianEngine.DIRECTIONS[row];for(let col=0;col<spec.columns;col++){fake.frame=()=>col;this.draw(ctx,fake,col*cell+cell/2,row*cell+cell*.88,1,{hair:false});}}}
}
root.GuardianRenderer=SpriteRenderer;
})(typeof globalThis!=='undefined'?globalThis:this);
