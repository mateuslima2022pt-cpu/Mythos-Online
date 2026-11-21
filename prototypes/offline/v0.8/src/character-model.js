/* Distribuição provisória; o personagem só muda na confirmação atômica. */
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('./core.js'));else root.AttributeDraft=factory(root.MythosCore);})(typeof globalThis!=='undefined'?globalThis:this,function(C){
 'use strict';
 function begin(p){return {base:{...p.attrs},budget:p.unspent,level:p.level,added:Object.fromEntries(C.ATTRS.map(k=>[k,0])),closed:false};}
 function valid(p,d){return !!d&&!!d.base&&!!d.added&&!d.closed&&d.level===p.level&&Number.isSafeInteger(d.budget)&&d.budget>=0&&d.budget===p.unspent&&C.ATTRS.every(k=>d.base[k]===p.attrs[k]&&Number.isSafeInteger(d.added[k])&&d.added[k]>=0)&&total(d)<=d.budget;}
 function total(d){return C.ATTRS.reduce((n,k)=>n+d.added[k],0);}
 function remaining(d){return d.budget-total(d);}
 function adjust(p,d,key,delta){if(!C.ATTRS.includes(key)||![-1,1].includes(delta)||!valid(p,d)||delta===1&&remaining(d)<1||delta===-1&&d.added[key]<1)return false;d.added[key]+=delta;return true;}
 function preview(p,d){if(!valid(p,d))return null;const attrs=Object.fromEntries(C.ATTRS.map(k=>[k,p.attrs[k]+d.added[k]]));return {...p,attrs,unspent:remaining(d)};}
 function apply(p,d){const next=preview(p,d);if(!next||total(d)<1)return false;const before=C.stats(p),after=C.stats(next);p.attrs=next.attrs;p.unspent=next.unspent;p.hp+=after.hp-before.hp;p.mp+=after.mp-before.mp;d.closed=true;return true;}
 return {begin,valid,total,remaining,adjust,preview,apply};
});
