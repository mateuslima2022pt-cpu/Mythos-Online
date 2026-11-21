/* Resolução única para o cursor e para a ação de clique. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.CursorRules=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 function isSafe(x,y){return Math.hypot(x-715,y-1610)<192;}
 function attackable(player,e){return !!e&&!e.dead&&e.hp>0&&e.hostile!==false&&e.attackable!==false&&!isSafe(player.x,player.y)&&!isSafe(e.x,e.y);}
 function ellipse(p,x,y,rx,ry){return ((p.x-x)/rx)**2+((p.y-y)/ry)**2<=1;}
 function rect(p,x,y,w,h){return Math.abs(p.x-x)<=w/2&&p.y>=y-h&&p.y<=y+7;}
 function pick(g,p){
  // Saque pequeno no chão tem precedência somente quando o ponteiro toca a peça.
  const loot=g.loot.filter(l=>l.life>0&&ellipse(p,l.x,l.y-5,13,16)).sort((a,b)=>b.y-a.y)[0];
  if(loot)return {kind:'loot',cursor:'pickup',entity:loot};
  const npc=g.world.npcs.filter(n=>n.id==='aelric'&&rect(p,n.x,n.y,40,55)).sort((a,b)=>b.y-a.y)[0];
  if(npc)return {kind:'npc',cursor:g.p.quest>0&&g.p.quest<6&&g.questTurnInReady(npc)?'quest':'talk',entity:npc};
  const enemy=g.enemies.filter(e=>attackable(g.p,e)&&rect(p,e.x,e.y,...({broto:[57,55],gosma:[60,56],wolf:[86,71],boss:[153,160]}[e.type]||[40,55]))).sort((a,b)=>b.y-a.y)[0];
  if(enemy)return {kind:'enemy',cursor:'attack',entity:enemy};
  const crystal=g.world.crystals.find(c=>!g.p.flags.crystals.includes(c.id)&&rect(p,c.x,c.y,32,40));
  if(crystal)return {kind:'gather',cursor:'gather',entity:{...crystal,id:'crystal'+crystal.id,crystalID:crystal.id,name:'Cristal da Aurora'}};
  const object=g.world.npcs.find(n=>['stone','shrine'].includes(n.id)&&rect(p,n.x,n.y,n.id==='shrine'?58:48,n.id==='shrine'?90:65));
  return object?{kind:'object',cursor:'normal',entity:object}:{kind:'none',cursor:'normal',entity:null};
 }
 function animationFrame(asset,elapsed){
  const total=asset.durations.reduce((a,b)=>a+b,0);let t=((elapsed%total)+total)%total;
  for(let i=0;i<asset.durations.length;i++){if(t<asset.durations[i])return asset.sequence[i];t-=asset.durations[i];}
  return asset.sequence[0];
 }
 return {isSafe,attackable,pick,animationFrame};
});
