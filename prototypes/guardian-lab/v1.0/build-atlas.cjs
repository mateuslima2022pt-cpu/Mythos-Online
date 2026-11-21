// Reads alpha to register frames. Source PNGs are never modified.
const {loadImage,createCanvas}=require('@napi-rs/canvas');const fs=require('node:fs'),path=require('node:path');
const root=__dirname;
(async()=>{const sheets={};for(const [name,cols] of Object.entries({idle:4,walk:6,run:6,attack:6})){
const image=await loadImage(path.join(root,'assets/sprites/guardian-'+name+'.png'));const canvas=createCanvas(image.width,image.height),ctx=canvas.getContext('2d');ctx.drawImage(image,0,0);const pixels=ctx.getImageData(0,0,image.width,image.height).data;const rows=[];
for(let row=0;row<4;row++){const frames=[];for(let col=0;col<cols;col++){
const sx=Math.round(col*image.width/cols),sy=Math.round(row*image.height/4),sw=Math.round((col+1)*image.width/cols)-sx,sh=Math.round((row+1)*image.height/4)-sy;let minX=sw,minY=sh,maxX=-1,maxY=-1,count=0;const mask=new Uint8Array(sw*sh);for(let y=0;y<sh;y++)for(let x=0;x<sw;x++){if(pixels[((sy+y)*image.width+sx+x)*4+3]>100)mask[y*sw+x]=1;}
let largest=[];const queue=new Int32Array(sw*sh);for(let start=0;start<mask.length;start++){if(!mask[start])continue;let first=0,last=1;queue[0]=start;mask[start]=0;while(first<last){const at=queue[first++],x=at%sw,y=(at/sw)|0;for(const near of [x>0?at-1:-1,x<sw-1?at+1:-1,y>0?at-sw:-1,y<sh-1?at+sw:-1])if(near>=0&&mask[near]){mask[near]=0;queue[last++]=near;}}
if(last>largest.length)largest=Array.from(queue.subarray(0,last));}
for(const at of largest){const x=at%sw,y=(at/sw)|0;minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,y);maxY=Math.max(maxY,y);count++;}
if(count<500)throw Error('Empty frame '+name+'/'+row+'/'+col);const height=maxY-minY+1;let sumX=0,feetCount=0;for(const at of largest){if(((at/sw)|0)>maxY-height*.15){sumX+=at%sw;feetCount++;}}
frames.push({sx,sy,sw,sh,anchorX:Math.round(sumX/feetCount),anchorY:maxY,visible:{x:minX,y:minY,width:maxX-minX+1,height},hairEnd:Math.round(minY+height*.10),pixels:count});}
// Same body scale throughout a row, preserving anticipation and stride differences.
const heights=frames.map(f=>f.visible.height).sort((a,b)=>a-b);const median=heights[Math.floor(heights.length/2)];rows.push({direction:['south','west','east','north'][row],flip:row===1&&(name==='idle'||name==='attack'),scale:128/median,frames});}
sheets[name]={file:'assets/sprites/guardian-'+name+'.png',width:image.width,height:image.height,columns:cols,rows};}
const atlas={version:'1.0',style:'Guardião estilizado; regata bege, shorts branco, espada de madeira',directions:['south','west','east','north'],frameCount:88,cellExport:192,groundAnchor:[96,169],notes:['PNG originais preservados.','Linhas oeste de idle/attack são espelhadas pelo renderizador; JSON documenta flip.','A lateralidade visual da espada necessita revisão para integração final.','Direções diagonais usam a orientação cardinal mais próxima.'],sheets};fs.writeFileSync(path.join(root,'assets/sprites/atlas.json'),JSON.stringify(atlas,null,2));console.log('Atlas validado:',Object.values(sheets).reduce((n,s)=>n+s.columns*4,0),'quadros');})().catch(e=>{console.error(e);process.exitCode=1;});
