/* Mythos Online — regras independentes do navegador. Sem dependências. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.MythosCore=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const VERSION=1, W=3200, H=2400, SPAWN={x:715,y:1690};
  const ATTRS=['forca','destreza','magia','vitalidade'];
  const EQUIP_KEYS=['weapon','shield','armor','helmet','cape','pants','belt','boots','necklace','ring1','ring2','book','supplement','amulet','seal','wings'];
  const ITEMS={
    espada:{id:'espada',name:'Espada do Juramento',slot:'weapon',rarity:'normal',power:20,minLevel:1,req:{forca:5},description:'A primeira lâmina de um Guardião. Um juramento ainda por escrever.'},
    escudo:{id:'escudo',name:'Escudo de Vigília',slot:'shield',rarity:'normal',def:25,minLevel:1,req:{forca:5},description:'Madeira de carvalho e aço gasto. Um abrigo entre você e a floresta.'},
    cota:{id:'cota',name:'Cota de Iniciado',slot:'armor',rarity:'normal',def:60,minLevel:1,req:{forca:5},description:'Armadura pesada do contrato de Guardião.'},
    lamina:{id:'lamina',name:'Lâmina do Primeiro Juramento',slot:'weapon',rarity:'incomum',power:26.25,minLevel:5,req:{forca:10},description:'Runas verdes despertam ao contato. Recompensa de Aelric.'},
    aurora:{id:'aurora',name:'Cota da Aurora',slot:'armor',rarity:'raro',def:103.5,minLevel:5,req:{forca:10},description:'Aço prateado e tecido azul. Forjada para o protetor do bosque.'},
    torre:{id:'torre',name:'Escudo de Carvalho Antigo',slot:'shield',rarity:'incomum',def:42,minLevel:3,req:{forca:8},description:'O emblema da clareira entalhado em madeira viva.'}
  };
  const TREE=[
    {id:'root',x:0,y:0,title:'Juramento do Guardião',desc:'Origem do caminho. Não concede bônus.',parents:[],bonus:{}},
    {id:'f1',x:-110,y:-75,title:'Força I',desc:'+5 de Força',parents:['root'],bonus:{forca:5}},
    {id:'v1',x:110,y:-75,title:'Vitalidade I',desc:'+5 de Vitalidade',parents:['root'],bonus:{vitalidade:5}},
    {id:'d1',x:-215,y:-145,title:'Aço Resoluto',desc:'+4% de dano físico',parents:['f1'],bonus:{physical:.04}},
    {id:'a1',x:215,y:-145,title:'Armadura Viva',desc:'+5% de defesa física',parents:['v1'],bonus:{defense:.05}},
    {id:'h1',x:105,y:-220,title:'Fôlego do Bosque',desc:'+2% de vida máxima',parents:['v1','a1'],bonus:{health:.02}},
    {id:'f2',x:-110,y:-220,title:'Força II',desc:'+5 de Força',parents:['f1','d1'],bonus:{forca:5}},
    {id:'bastiao',x:0,y:-310,title:'Bastião de Ferro',desc:'+10% de defesa física e +5 de Força',parents:['f2','h1'],bonus:{defense:.10,forca:5},notable:true},
    {id:'dex',x:-210,y:55,title:'Destreza',desc:'+5 de Destreza',parents:['root'],bonus:{destreza:5}},
    {id:'crit',x:-305,y:-20,title:'Precisão',desc:'+2 pontos percentuais de chance crítica',parents:['dex'],bonus:{crit:.02}},
    {id:'mag',x:210,y:55,title:'Magia',desc:'+5 de Magia',parents:['root'],bonus:{magia:5}},
    {id:'mana',x:305,y:-20,title:'Reserva Arcana',desc:'+3% de mana máxima',parents:['mag'],bonus:{mana:.03}}
  ];
  const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
  function xpFor(level){return [0,30,55,85,120,170,230,300,380][level]||Math.floor(380+85*(level-8)+12*Math.pow(level-8,1.6));}
  function fresh(name='Guardião') {return {version:VERSION,name:String(name).trim().slice(0,18)||'Guardião',level:1,xp:0,gold:0,attrs:{forca:5,destreza:5,magia:5,vitalidade:5},unspent:5,tree:[],treePoints:0,equipment:{...Object.fromEntries(EQUIP_KEYS.map(k=>[k,null])),weapon:'espada',shield:'escudo',armor:'cota'},bag:['espada','escudo','cota'],potions:{hp:5,mp:3},learned:false,blockLearned:false,quest:0,flags:{stone:false,dodged:false,broto:0,gosma:0,wolf:0,crystals:[],boss:false},rewards:[],x:SPAWN.x,y:SPAWN.y,hp:300,mp:100};}
  function stats(p){
    const b={forca:0,destreza:0,magia:0,vitalidade:0,physical:0,defense:0,health:0,mana:0,crit:0};
    for(const id of p.tree){const n=TREE.find(n=>n.id===id);if(n)for(const[k,v]of Object.entries(n.bonus))b[k]=(b[k]||0)+v;}
    const a=Object.fromEntries(ATTRS.map(k=>[k,p.attrs[k]+b[k]]));
    const weapon=ITEMS[p.equipment.weapon],armor=ITEMS[p.equipment.armor],shield=ITEMS[p.equipment.shield];
    return {...a,hp:Math.round((300+20*(p.level-1)+20*(a.vitalidade-5))*(1+b.health)),mp:Math.round((100+5*(p.level-1)+10*(a.magia-5))*(1+b.mana)),power:(weapon?.power||10)*(1+a.forca/100)*(1+b.physical),defense:((armor?.def||0)+(shield?.def||0))*(1+b.defense),magicDefense:25+a.magia*2,crit:.05+b.crit};
  }
  function gainXP(p,amount){p.xp+=Math.max(0,amount);let gained=0;while(p.level<99&&p.xp>=xpFor(p.level)){p.xp-=xpFor(p.level);p.level++;p.unspent+=5;p.treePoints++;gained++;}if(p.level===99)p.xp=0;if(gained){const s=stats(p);p.hp=s.hp;p.mp=s.mp;}return gained;}
  function allocate(p,key){if(!ATTRS.includes(key)||p.unspent<1)return false;const before=stats(p);p.attrs[key]++;p.unspent--;const after=stats(p);p.hp+=after.hp-before.hp;p.mp+=after.mp-before.mp;return true;}
  function canNode(p,id){const n=TREE.find(n=>n.id===id);return !!n&&id!=='root'&&!p.tree.includes(id)&&p.treePoints>0&&n.parents.some(x=>x==='root'||p.tree.includes(x));}
  function buyNode(p,id){if(!canNode(p,id))return false;const before=stats(p);p.tree.push(id);p.treePoints--;const after=stats(p);p.hp+=after.hp-before.hp;p.mp+=after.mp-before.mp;return true;}
  function equip(p,id){const i=ITEMS[id],s=stats(p);if(!i||!p.bag.includes(id)||p.level<i.minLevel||Object.entries(i.req).some(([k,v])=>s[k]<v))return false;p.equipment[i.slot]=id;return true;}
  function enforceEquipment(p){const s=stats(p),fallback={weapon:'espada',shield:'escudo',armor:'cota'};for(const slot of Object.keys(fallback)){if(p.equipment[slot]===null)continue;const i=ITEMS[p.equipment[slot]];if(!i||p.level<i.minLevel||Object.entries(i.req).some(([k,v])=>s[k]<v))p.equipment[slot]=fallback[slot];}}
  function damage(power,defense=0,crit=false,block=false){return Math.max(1,Math.round(power*(crit?1.5:1)*(500/(500+Math.max(0,defense)))*(block?.3:1)));}
  function cone(sx,sy,angle,tx,ty,range,arc=Math.PI/2,radius=0){const dx=tx-sx,dy=ty-sy;if(Math.hypot(dx,dy)>range+radius)return false;return Math.abs(Math.atan2(Math.sin(Math.atan2(dy,dx)-angle),Math.cos(Math.atan2(dy,dx)-angle)))<=arc/2;}
  function riverX(y){return 1600+120*Math.sin(y/260)+30*Math.sin(y/90);}
  function isWater(x,y,r=0){return Math.abs(x-riverX(y))<52+r&&!(y>1065+r&&y<1175-r);}
  function validPosition(x,y,r,obstacles=[],ignoreWater=false){return x>r+35&&x<W-r-35&&y>r+35&&y<H-r-35&&(!isWater(x,y,r)||ignoreWater)&&!obstacles.some(o=>Math.hypot(x-o.x,y-o.y)<r+o.r);}
  function dashEnd(x,y,dx,dy,valid){const len=Math.hypot(dx,dy)||1;let end={x,y};for(let d=4;d<=96;d+=4){const nx=x+dx/len*d,ny=y+dy/len*d;if(!valid(nx,ny))break;end={x:nx,y:ny};}return end;}
  function startAction(state,spec){if(state.action||state.cooldowns[spec.id]>0||state.mp<spec.mana)return false;state.mp-=spec.mana;state.cooldowns[spec.id]=spec.cooldown;state.action={id:spec.id,elapsed:0,windup:spec.windup,recovery:spec.recovery,angle:spec.angle,released:false};return true;}
  function questReady(p){switch(p.quest){case 0:return true;case 1:return p.flags.stone&&p.flags.dodged;case 2:return p.flags.broto>=3&&p.flags.gosma>=2;case 3:return p.flags.crystals.length>=3;case 4:return p.learned;case 5:return p.flags.boss;default:return false;}}
  const QUEST_XP=[20,40,70,60,0,100];
  function turnIn(p){if(!questReady(p)||p.rewards.includes(p.quest))return false;const q=p.quest;p.rewards.push(q);gainXP(p,QUEST_XP[q]);p.gold+=[0,8,15,15,0,35][q];if(q===2&&!p.bag.includes('torre'))p.bag.push('torre');if(q===4&&!p.bag.includes('lamina'))p.bag.push('lamina');if(q===5&&!p.bag.includes('aurora'))p.bag.push('aurora');p.quest++;return true;}
  function validateSave(raw){
    if(!raw||typeof raw!=='object'||raw.version!==VERSION)throw Error('Formato de salvamento incompatível.');
    const p=fresh(typeof raw.name==='string'?raw.name:'Guardião'),int=(v,a,b,d=a)=>Number.isFinite(v)?clamp(Math.floor(v),a,b):d;
    p.level=int(raw.level,1,99);p.xp=int(raw.xp,0,xpFor(p.level)-1);p.gold=int(raw.gold,0,9999999);p.quest=int(raw.quest,0,6);
    let attrBudget=5+5*(p.level-1);for(const k of ATTRS){const extra=int(raw.attrs?.[k],5,500)-5;p.attrs[k]=5+Math.min(extra,attrBudget);attrBudget-=p.attrs[k]-5;}p.unspent=attrBudget;
    const candidates=Array.isArray(raw.tree)?new Set(raw.tree):new Set();p.treePoints=p.level-1;
    for(let pass=0;pass<TREE.length;pass++)for(const n of TREE)if(candidates.has(n.id)&&canNode(p,n.id))buyNode(p,n.id);
    p.bag=Array.from(new Set(['espada','escudo','cota',...(Array.isArray(raw.bag)?raw.bag.filter(id=>ITEMS[id]):[])]));for(const slot of EQUIP_KEYS){const id=raw.equipment?.[slot];if(id===null)p.equipment[slot]=null;else if(ITEMS[id]?.slot===slot)equip(p,id);}
    p.potions={hp:int(raw.potions?.hp,0,99,5),mp:int(raw.potions?.mp,0,99,3)};p.learned=p.level>=5&&!!raw.learned;p.blockLearned=p.learned&&!!raw.blockLearned;
    p.flags={stone:!!raw.flags?.stone,dodged:!!raw.flags?.dodged,broto:int(raw.flags?.broto,0,9999),gosma:int(raw.flags?.gosma,0,9999),wolf:int(raw.flags?.wolf,0,9999),crystals:Array.from(new Set((Array.isArray(raw.flags?.crystals)?raw.flags.crystals:[]).filter(x=>[0,1,2].includes(x)))),boss:!!raw.flags?.boss};
    p.rewards=Array.isArray(raw.rewards)?Array.from(new Set(raw.rewards.filter(x=>Number.isInteger(x)&&x>=0&&x<p.quest))):[];
    p.x=Number.isFinite(raw.x)?clamp(raw.x,60,W-60):SPAWN.x;p.y=Number.isFinite(raw.y)?clamp(raw.y,60,H-60):SPAWN.y;const s=stats(p);p.hp=int(raw.hp,1,s.hp,s.hp);p.mp=int(raw.mp,0,s.mp,s.mp);return p;
  }
  return {VERSION,W,H,SPAWN,ATTRS,EQUIP_KEYS,ITEMS,TREE,clamp,xpFor,fresh,stats,gainXP,allocate,canNode,buyNode,equip,enforceEquipment,damage,cone,riverX,isWater,validPosition,dashEnd,startAction,questReady,turnIn,validateSave};
});
