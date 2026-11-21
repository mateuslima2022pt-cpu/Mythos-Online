/* Same exposure reference in all actions. Continuous shading, no palette quantisation. */
(function(root){'use strict';
const clamp=x=>Math.max(0,Math.min(1,x)),smooth=(a,b,x)=>{const t=clamp((x-a)/(b-a));return t*t*(3-2*t);};
function weights(r,g,b){const max=Math.max(r,g,b),min=Math.min(r,g,b),sat=(max-min)/(max||1),v=max/255;const linen=1-smooth(.22,.32,sat),dark=1-smooth(.23,.43,v),beige=(1-linen)*smooth(.31,.51,b/Math.max(1,r));return {linen:linen*(1-dark),beige:beige*(1-dark),warm:(1-linen-beige)*(1-dark),shadow:dark};}
function read(image,create){const c=create(image.width,image.height),ctx=c.getContext('2d');ctx.drawImage(image,0,0);return {canvas:c,ctx,pixels:ctx.getImageData(0,0,image.width,image.height)};}
function medians(data){const keys=['linen','beige','warm','shadow'],groups=Object.fromEntries(keys.map(k=>[k,new Float64Array(256)])),total={linen:0,beige:0,warm:0,shadow:0};for(let i=0;i<data.length;i+=4){if(data[i+3]<230)continue;const r=data[i],g=data[i+1],b=data[i+2],l=Math.round(.2126*r+.7152*g+.0722*b),w=weights(r,g,b);for(const kind of keys)if(w[kind]>.15){groups[kind][l]+=w[kind];total[kind]+=w[kind];}}const out={};for(const kind of keys){let sum=0;for(let l=0;l<256;l++){sum+=groups[kind][l];if(sum>=total[kind]/2){out[kind]=l;break;}}}return out;}
function apply(images,create,atlas){
 const prepared={},frameLists={};for(const [name,image] of Object.entries(images)){const record=read(image,create),data=record.pixels.data;const frames=[];for(const [action,sheet] of Object.entries(atlas.sheets))for(const row of sheet.rows)if((row.source||action)===name)frames.push(...row.frames);frameLists[name]=frames;
 // Only the registered connected silhouette enters the renderer. No matte or neighbour pixels.
 for(let i=3;i<data.length;i+=4)data[i]=0;for(const f of frames)for(let n=0;n<f.maskRuns.length;n+=2){const begin=f.maskRuns[n],length=f.maskRuns[n+1];for(let j=0;j<length;j++)data[(begin+j)*4+3]=255;}record.ctx.putImageData(record.pixels,0,0);prepared[name]=record;}
 const target=medians(prepared.idle.pixels.data),out={},report={};
 for(const [name,record] of Object.entries(prepared)){const {canvas,ctx,pixels}=record,data=pixels.data;
  for(let fidx=0;fidx<frameLists[name].length;fidx++){const f=frameLists[name][fidx],patch=ctx.getImageData(f.sx,f.sy,f.sw,f.sh),before=medians(patch.data);let current=before,gains={},passes=0;
   for(;passes<6;passes++){let maxError=0;for(const kind of Object.keys(target)){maxError=Math.max(maxError,Math.abs(current[kind]-target[kind]));gains[kind]=Math.max(.88,Math.min(1.12,target[kind]/(current[kind]||target[kind])));}if(maxError<=3)break;
    for(let i=0;i<patch.data.length;i+=4){const p=patch.data;if(!p[i+3])continue;const w=weights(p[i],p[i+1],p[i+2]);let factor=0;for(const kind of Object.keys(w))factor+=w[kind]*gains[kind];for(let c=0;c<3;c++)p[i+c]=Math.min(255,Math.round(p[i+c]*factor));}current=medians(patch.data);
   }ctx.putImageData(patch,f.sx,f.sy);report[name+'/'+fidx]={before,target,gains,passes,after:current};
  }out[name]=canvas;
 }return {images:out,report};
}
root.GuardianPalette={apply,weights,medians};})(typeof globalThis!=='undefined'?globalThis:this);
