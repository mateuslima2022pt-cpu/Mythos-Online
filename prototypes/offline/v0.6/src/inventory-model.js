(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.InventoryModel=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 const CAPACITY=48;
 const TABS=['Normal','Roupas'];
 const COSMETIC_SLOTS=[
  {key:'weapon',name:'Visual de arma',icon:'weapon',x:30,y:23},
  {key:'head',name:'Visual de cabeça',icon:'head',x:70,y:23},
  {key:'body',name:'Roupa superior',icon:'body',x:30,y:33.3},
  {key:'hands',name:'Visual de luvas',icon:'hands',x:70,y:33.3},
  {key:'legs',name:'Roupa inferior',icon:'legs',x:30,y:43.6},
  {key:'feet',name:'Visual de botas',icon:'feet',x:70,y:43.6}
 ];
 const SLOTS=[
  {key:'book',name:'Livros Encantados',icon:9,x:23.6,y:19.3},
  {key:'supplement',name:'Bolsa Suplementar',icon:10,x:23.6,y:27.7},
  {key:'helmet',name:'Helmo',icon:0,x:50,y:17.8},
  {key:'armor',name:'Armadura',icon:1,x:41.7,y:24.9},
  {key:'cape',name:'Capa',icon:2,x:58.4,y:24.9},
  {key:'pants',name:'Calça',icon:3,x:41.7,y:32.4},
  {key:'belt',name:'Cinto',icon:4,x:58.4,y:32.4},
  {key:'weapon',name:'Arma primária',icon:14,x:37.4,y:39.7},
  {key:'offhand',name:'Arma secundária / escudo',icon:14,x:62.7,y:39.7},
  {key:'boots',name:'Bota',icon:5,x:50,y:39.7},
  {key:'necklace',name:'Colar',icon:6,x:37.4,y:47.2},
  {key:'ring1',name:'Anel',icon:7,x:50,y:47.2},
  {key:'ring2',name:'Anel',icon:8,x:62.7,y:47.2},
  {key:'amulet',name:'Amuleto de regeneração de HP',icon:11,x:76.5,y:19.3},
  {key:'seal',name:'Selo de regeneração de MP',icon:12,x:76.5,y:27.7},
  {key:'wings',name:'Asas de voo',icon:13,x:76.5,y:36.5}
 ];
 function entries(p){const worn=new Set(Object.values(p.equipment).filter(Boolean));return [...p.bag.filter(id=>!worn.has(id)).map(id=>({id,kind:'gear',count:1})),...['hp','mp'].filter(k=>p.potions[k]>0).map(k=>({id:k,kind:'potion',count:p.potions[k]}))];}
 function dropAmount(text,balance){if(!Number.isSafeInteger(balance)||balance<0||typeof text!=='string'||!/^\d+$/.test(text))return null;const n=Number(text);return Number.isSafeInteger(n)&&n>0&&n<=balance?n:null;}
 function groundGold(raw){if(!Array.isArray(raw))return [];const ids=new Set();return raw.slice(0,200).filter(l=>{if(!l||typeof l.id!=='string'||!l.id.length||l.id.length>100||ids.has(l.id)||!Number.isSafeInteger(l.amount)||l.amount<1||l.amount>9999999||!Number.isFinite(l.x)||!Number.isFinite(l.y)||l.x<35||l.x>3165||l.y<35||l.y>2365||!Number.isFinite(l.life)||l.life<=0)return false;ids.add(l.id);return true;}).map(l=>({id:l.id.slice(0,100),kind:'gold',amount:l.amount,x:l.x,y:l.y,life:Math.min(120,l.life),playerDropped:true}));}
 return {CAPACITY,TABS,SLOTS,COSMETIC_SLOTS,entries,dropAmount,groundGold};
});
