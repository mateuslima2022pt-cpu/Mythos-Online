(function(root){
'use strict';
class SpriteRenderer{
 constructor(images,atlas){const factory=root.GuardianCanvasFactory||((w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;return c;});const calibrated=atlas.prepared?{images,report:{}}:GuardianPalette.apply(images,factory,atlas);this.images=calibrated.images;this.paletteReport=calibrated.report;this.atlas=atlas;this.frames={};for(const [name,sheet] of Object.entries(atlas.sheets))this.frames[name]=sheet.rows.map(row=>row.frames.map(f=>{const c=factory(f.sw,f.sh);c.getContext('2d').drawImage(this.images[row.source||name],f.sx,f.sy,f.sw,f.sh,0,0,f.sw,f.sh);return c;}));}
 draw(ctx,model,x,y,zoom=1,options={}){
  const action=model.action,dir=model.dir;const row=GuardianEngine.DIRECTIONS.indexOf(dir);const sheet=this.atlas.sheets[action];const frame=sheet.rows[row].frames[model.frame()];const image=this.frames[action][row][model.frame()];const scale=sheet.rows[row].scale*zoom;const flip=sheet.rows[row].flip;
  let bob=0;if(!model.paused){if(action==='walk')bob=-Math.abs(Math.sin(model.clock*Math.PI*8))*1.8;if(action==='run')bob=-Math.abs(Math.sin(model.clock*Math.PI*12))*5;if(action==='attack'&&model.moving)bob=-Math.abs(Math.sin(model.moveClock*Math.PI*(model.locomotion==='run'?12:8)))*2;}
  ctx.save();ctx.translate(x,y+bob*zoom);if(flip)ctx.scale(-1,1);
  if(action==='idle'&&!model.paused){const breath=1+Math.sin(model.time*2.4)*.005;ctx.scale(1,breath);}
  const dx=-frame.anchorX*scale,dy=-frame.anchorY*scale,w=frame.sw*scale,h=frame.sh*scale;
  ctx.beginPath();ctx.rect(dx-2*zoom,dy-2*zoom,w+4*zoom,h+4*zoom);ctx.clip();
  ctx.imageSmoothingEnabled=options.smoothing!==false;ctx.imageSmoothingQuality='high';
  // Crown-only strip displacement: low-amplitude wind, no eye/face movement.
  if(options.hair!==false&&!model.paused){
   const hairEnd=Math.max(1,Math.round(frame.hairEnd)),strips=6,step=hairEnd/strips;
   // Clip full-frame copies, retaining the exact sampling of torso, clothes and face.
   ctx.save();ctx.beginPath();ctx.rect(dx-2*zoom,dy+hairEnd*scale,w+4*zoom,h-hairEnd*scale+2*zoom);ctx.clip();ctx.drawImage(image,0,0,frame.sw,frame.sh,dx,dy,w,h);ctx.restore();
   for(let n=0;n<strips;n++){const sy=n*step,eh=Math.min(step+.02,hairEnd-sy),amp=(1-n/strips)*.95*zoom,offset=Math.sin(model.time*3.1+n*.45)*amp;ctx.save();ctx.beginPath();ctx.rect(dx-2*zoom,dy+sy*scale,w+4*zoom,eh*scale);ctx.clip();ctx.drawImage(image,0,0,frame.sw,frame.sh,dx+offset,dy,w,h);ctx.restore();}
  }else ctx.drawImage(image,0,0,frame.sw,frame.sh,dx,dy,w,h);
  if(options.bounds){ctx.strokeStyle='#8bb4ab';ctx.lineWidth=1/zoom;ctx.setLineDash([3,3]);ctx.strokeRect(dx,dy,w,h);ctx.setLineDash([]);ctx.strokeStyle='#f3cf82';ctx.beginPath();ctx.moveTo(-6,0);ctx.lineTo(6,0);ctx.moveTo(0,-6);ctx.lineTo(0,6);ctx.stroke();}
  ctx.restore();
 }
 sheet(ctx,action,cell=384){const spec=this.atlas.sheets[action];ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);const fake={action,dir:'south',clock:0,time:0,paused:true,frame:()=>0};for(let row=0;row<4;row++){fake.dir=GuardianEngine.DIRECTIONS[row];for(let col=0;col<spec.columns;col++){fake.frame=()=>col;this.draw(ctx,fake,col*cell+cell/2,row*cell+cell*.88,1.625,{hair:false});}}}
}
root.GuardianRenderer=SpriteRenderer;
})(typeof globalThis!=='undefined'?globalThis:this);
