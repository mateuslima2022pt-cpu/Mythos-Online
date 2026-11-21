(function(){'use strict';
const C=MythosCore;
function random(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return ((t^t>>>14)>>>0)/4294967296;};}
function distSegment(x,y,a,b){const dx=b[0]-a[0],dy=b[1]-a[1],t=C.clamp(((x-a[0])*dx+(y-a[1])*dy)/(dx*dx+dy*dy),0,1);return Math.hypot(x-a[0]-t*dx,y-a[1]-t*dy);}
const paths=[[[600,1850],[715,1690],[860,1480],[1000,1300],[1120,1140],[1440,1120],[1720,1120],[1960,960],[2280,800],[2510,520]],[[860,1480],[640,1250],[650,1100],[900,880],[1150,980],[1120,1140]],[[1960,960],[1990,1470],[2300,1680]]];
const npcs=[{id:'aelric',name:'Aelric',subtitle:'Guia dos primeiros juramentos',x:795,y:1560,r:16},{id:'stone',name:'Pedra do Juramento',x:1020,y:1370,r:22},{id:'shrine',name:'Santuário da Aurora',x:550,y:1515,r:30},{id:'dummy',name:'Boneco de treino',x:940,y:1670,r:15}];
const crystals=[{id:0,x:650,y:1100},{id:1,x:900,y:880},{id:2,x:1150,y:980}];
const definitions={broto:{name:'Broto de Esporos',hp:62,power:10,def:5,speed:48,xp:20,gold:4,range:42,windup:.68,cooldown:1.8,kind:'physical',radius:15,level:1},gosma:{name:'Gosma de Éter',hp:76,power:12,def:8,speed:39,xp:24,gold:5,range:180,windup:.8,cooldown:2.4,kind:'magic',radius:18,level:2},wolf:{name:'Lobo das Raízes',hp:108,power:17,def:20,speed:78,xp:32,gold:7,range:47,windup:.5,cooldown:1.45,kind:'physical',radius:18,level:3},boss:{name:'Cerne Corrompido',hp:640,power:33,def:45,speed:42,xp:125,gold:25,range:110,windup:1.25,cooldown:2.8,kind:'physical',radius:36,level:5}};
const spawns=[['broto',970,1270],['broto',780,1190],['broto',1090,1080],['broto',730,960],['broto',1230,1370],['broto',1280,920],['gosma',920,1040],['gosma',1120,830],['gosma',1280,1080],['gosma',1860,1150],['gosma',1870,850],['wolf',1980,970],['wolf',2160,820],['wolf',2210,1100],['wolf',2320,680],['wolf',2010,1400],['wolf',2380,1500],['boss',2520,510]];
function createWorld(){
 const rand=random(32911),trees=[],rocks=[],obstacles=[];
 const nearPath=(x,y,d)=>paths.some(path=>path.slice(1).some((p,i)=>distSegment(x,y,path[i],p)<d));
 for(let i=0;i<1600&&trees.length<330;i++){
  const x=80+rand()*3040,y=80+rand()*2240;
  if(C.isWater(x,y,45)||nearPath(x,y,62)||Math.hypot(x-715,y-1610)<220||Math.hypot(x-2520,y-510)<180||spawns.some(s=>Math.hypot(x-s[1],y-s[2])<65)||crystals.some(c=>Math.hypot(x-c.x,y-c.y)<75)||npcs.some(n=>Math.hypot(x-n.x,y-n.y)<70))continue;
  if(trees.some(t=>Math.hypot(t.x-x,t.y-y)<57))continue;
  const t={x,y,r:13+rand()*5,type:rand()<.2?2:Math.floor(rand()*4),size:145+rand()*90,seed:rand()*10};trees.push(t);obstacles.push(t);
 }
 for(let i=0;i<48;i++){const x=rand()*3100+50,y=rand()*2300+50;if(C.isWater(x,y,25)||nearPath(x,y,70)||spawns.some(s=>Math.hypot(x-s[1],y-s[2])<50)||crystals.some(c=>Math.hypot(x-c.x,y-c.y)<55)||npcs.some(n=>Math.hypot(x-n.x,y-n.y)<65)||Math.hypot(x-715,y-1610)<235||Math.hypot(x-2520,y-510)<180)continue;const r={x,y,r:13+rand()*12,seed:rand()};rocks.push(r);obstacles.push(r);}
 // Ruined columns have physical bases, never invisible canopy-sized blockers.
 const columns=[{x:2390,y:435,r:20},{x:2650,y:435,r:20},{x:2390,y:625,r:20},{x:2650,y:625,r:20}];obstacles.push(...columns);
 return{trees,rocks,obstacles,paths,npcs,crystals,columns,random:rand,spawns:spawns.map((s,i)=>({id:i,type:s[0],sx:s[1],sy:s[2]})),definitions};
}
window.MythosWorld={createWorld,random,distSegment};
})();
