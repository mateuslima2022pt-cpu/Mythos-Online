/* Interface clássica aprovada. Chat local; nenhuma conexão de rede. */
(function(){'use strict';
const $=id=>document.getElementById(id);
const paths={
 bag:'<path d="M8 11V8a8 8 0 0 1 16 0v3" fill="none" stroke="#d6b677" stroke-width="2"/><path d="M6 10h20l2 17q-12 5-24 0z" fill="#ae8a50"/><path d="M6 10q10 12 20 0l-1 9H7z" fill="#e2c18a"/><path d="M8 22h16v6H8z" fill="#806135"/><path d="M13 16h6v7h-6z" fill="#edcf8c"/><path d="M16 17v4" stroke="#604729"/>',
 person:'<path d="M4 30q0-10 12-12 12 2 12 12" fill="#9c7b45"/><path d="M8 8q8-9 16 0v10l-8 7-8-7z" fill="#d4b273"/><path d="M7 10q0-10 9-10t9 10l-6-2-3-5-3 5z" fill="#e4c794"/><path d="M11 12h3m4 0h3M16 12v6m-4 3 4 2 4-2" fill="none" stroke="#705333" stroke-width="1.6"/><path d="M3 28l6-4m20 4-6-4" stroke="#f0d49e"/>',
 tree:'<path d="M16 28V5m0 14L6 12m10 11 10-11" fill="none" stroke="#d1ad6d" stroke-width="2.5"/><g fill="#e1bf7e" stroke="#7c5d33"><circle cx="16" cy="4" r="3.3"/><circle cx="6" cy="11" r="3.3"/><circle cx="26" cy="11" r="3.3"/><circle cx="16" cy="28" r="3.3"/><circle cx="16" cy="19" r="2.5"/></g>',
 gear:'<path d="M12 1h8l1 5 4 2 4-1 3 7-4 3-1 4 2 4-6 5-4-3h-5l-4 3-6-5 2-4-1-4-4-3 3-7 4 1 4-2z" fill="#ceb177" stroke="#76603b"/><circle cx="16" cy="16" r="6" fill="#25211b" stroke="#e5c68c"/>',
 shield:'<path d="M4 5 16 1l12 4v14q-1 7-12 12Q5 26 4 19z" fill="#a58140" stroke="#f5dda1" stroke-width="1.8"/><path d="M8 8 16 5l8 3v10q0 5-8 9-8-4-8-9z" fill="#56616a"/><path d="M16 8v15m-6-10h12" stroke="#f3d99d" stroke-width="3"/>',
 sword:'<path d="m4 28 5-5 2 2-5 5z" fill="#957044"/><path d="m8 17 9 9 2-3-8-8z" fill="#e3bd65"/><path d="m13 18 13-16 5-2-1 6-15 14z" fill="#e6e3ca" stroke="#a8976b"/><path d="M15 16 28 3" stroke="#fffbe3"/><path d="M3 3 29 29" stroke="#a37047" stroke-width="2" opacity=".65"/>',
 dash:'<circle cx="23" cy="5" r="4" fill="#e4c48a"/><path d="m15 11 5-3 6 8m-11-5-4 7 7 3-5 8m4-15 5 6 7 1M3 11h7M0 17h7m-4 7h5" fill="none" stroke="#dfbd7e" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>'
};
function icon(name){
 let p=paths[name];
 if(name==='hp'||name==='mp'){const color=name==='hp'?'#c74759':'#4095bb';p='<path d="M12 3h8v10q9 5 8 12-1 7-12 6Q5 31 4 25q-1-7 8-12z" fill="#b6d8dc22" stroke="#b9c6b5" stroke-width="1.2"/><path d="M8 20q8 3 16 0 7 10-8 9Q2 30 8 20" fill="'+color+'"/><path d="M11 1h10v4H11z" fill="#b29769"/><path d="M11 16q-6 5-4 9" fill="none" stroke="#eee8ce" opacity=".6"/>';}
 return '<svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">'+(p||'')+'</svg>';
}
class MythosUI{
 static icon=icon;
 constructor(game){
  this.g=game;this.messages=[];this.channel='Geral';this.mapZoom=1;this.portraitDrawn=false;
  document.querySelectorAll('[data-icon]').forEach(el=>el.innerHTML=icon(el.dataset.icon));
  for(let n=3;n<=8;n++){const b=document.createElement('button');b.id='consumable'+n;b.className='empty-slot';b.title='Espaço de consumível vazio [F'+n+']';b.setAttribute('aria-label',b.title);b.innerHTML='<kbd>F'+n+'</kbd>';b.onclick=()=>this.emptyConsumable('F'+n);$('consumables').append(b);}
  $('questToggle').onclick=()=>{game.settings.questsCollapsed=!game.settings.questsCollapsed;this.applyPreferences();game.save();};
  $('mapZoomIn').onclick=()=>this.zoom(.5);$('mapZoomOut').onclick=()=>this.zoom(-.5);
  document.querySelectorAll('[data-channel]').forEach(b=>b.onclick=()=>this.selectChannel(b.dataset.channel));
  $('chatForm').onsubmit=e=>{e.preventDefault();this.send();};
  $('chatInput').onfocus=()=>{game.keys.clear();game.mouse.down=false;};
  $('chatInput').onkeydown=e=>{e.stopPropagation();if(e.code==='Escape'){e.preventDefault();$('chatInput').blur();game.keys.clear();}else if(e.code==='Enter'){e.preventDefault();if(!e.repeat)this.send();}};
  this.system('Bem-vindo ao Bosque da Aurora.');this.system('Converse com Aelric para iniciar sua jornada.');this.applyPreferences();
 }
 system(text){this.add('Sistema',String(text));}
 add(channel,text){this.messages.push({channel,text:String(text).slice(0,240)});if(this.messages.length>100)this.messages.shift();this.renderChat();}
 selectChannel(channel){if(!['Geral','Grupo','Guilda','Global','Sistema'].includes(channel))return;this.channel=channel;document.querySelectorAll('[data-channel]').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.channel===channel)));$('chatInput').disabled=channel==='Sistema';$('chatSend').disabled=channel==='Sistema';$('chatInput').placeholder=channel==='Sistema'?'Mensagens do sistema':'Digite sua mensagem...';this.renderChat();}
 renderChat(){const log=$('chatLog');log.innerHTML='';for(const m of this.messages){if(this.channel!=='Geral'&&m.channel!==this.channel&&m.channel!=='Sistema')continue;const line=document.createElement('div');line.className='chat-line channel-'+m.channel.toLowerCase();line.textContent='['+m.channel+'] '+m.text;log.append(line);}log.scrollTop=log.scrollHeight;}
 send(){const input=$('chatInput'),text=input.value.trim().slice(0,180);if(!text||this.channel==='Sistema')return;this.add(this.channel,this.g.p.name+': '+text);input.value='';}
 focusChat(){if(this.channel==='Sistema')this.selectChannel('Geral');this.g.keys.clear();this.g.mouse.down=false;$('chatInput').focus();}
 emptyConsumable(key){this.g.toast('Espaço de consumível vazio ['+key+'].');}
 applyPreferences(){const collapsed=!!this.g.settings.questsCollapsed;$('questContent').hidden=collapsed;$('questToggle').textContent=collapsed?'+':'−';$('questToggle').setAttribute('aria-expanded',String(!collapsed));$('questToggle').setAttribute('aria-label',collapsed?'Expandir missões':'Minimizar missões');$('questToggle').title=collapsed?'Expandir missões':'Minimizar missões';}
 zoom(delta){this.mapZoom=MythosCore.clamp(this.mapZoom+delta,1,3);$('mapZoomIn').disabled=this.mapZoom>=3;$('mapZoomOut').disabled=this.mapZoom<=1;this.g.renderer.map($('minimap'),false,this.mapZoom);}
 refresh(){
  const p=this.g.p;$('coordinates').textContent='X: '+Math.round(p.x)+' · Y: '+Math.round(p.y);$('xpText').textContent=p.level>=99?'Exp. Máx.':'Exp. '+(p.xp/MythosCore.xpFor(p.level)*100).toFixed(1)+'%';
  const image=this.g.renderer.hero;if(!this.portraitDrawn&&image.complete&&image.naturalWidth){const c=$('portrait').getContext('2d');c.clearRect(0,0,192,192);const grad=c.createRadialGradient(96,80,10,96,96,100);grad.addColorStop(0,'#65513b');grad.addColorStop(1,'#171514');c.fillStyle=grad;c.fillRect(0,0,192,192);c.drawImage(image,225,8,185,205,0,0,192,212);this.portraitDrawn=true;}
 }
}
window.MythosUI=MythosUI;
})();
