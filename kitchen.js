/* Kitchen Helper widgets v1. Usage:
   console: KitchenHelper.console(SESSION)   command: KitchenHelper.command(CMDS)
   Both render into the element with id "kh". */
(function(){
var CSS=".kc{background:var(--surface-2);border:0.5px solid var(--border);border-radius:12px;padding:1rem 1.25rem;position:relative}.kc-row{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--text-secondary)}.kc-t{border-top:0.5px solid var(--border);padding:12px 0;margin-top:10px}.kc-t.ring{border:2px solid var(--border-danger);border-radius:var(--radius);padding:12px}.kc-lab{font-size:16px;font-weight:500;margin:0}.kc-time{font-size:44px;font-weight:500;font-variant-numeric:tabular-nums;margin:2px 0;line-height:1.2}.kc-bar{height:6px;background:var(--surface-1);border-radius:3px;overflow:hidden}.kc-bar>div{height:100%;background:var(--fill-accent);width:100%}.kc-sub{font-size:13px;color:var(--text-secondary);margin:6px 0 0}.kc-btns{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:10px}.kc-btns button{height:44px;font-size:15px}.kc-step{font-size:14px;padding:4px 0;color:var(--text-muted);margin:0}.kc-step.cur{color:var(--text-primary);font-size:16px;font-weight:500}", CONSOLE_HTML="<div class=\"kc\" id=\"kc\">\n  <div class=\"kc-row\"><i class=\"ti ti-chef-hat\" style=\"font-size:18px\" aria-hidden=\"true\"></i><span id=\"kc-title\">Kitchen console</span></div>\n  <p id=\"kc-status\" style=\"font-size:13px;color:var(--text-muted);margin:4px 0 0\">Starting</p>\n  <div id=\"kc-steps\" style=\"margin-top:8px\"></div>\n  <div id=\"kc-timers\"></div>\n  <div class=\"kc-btns\" id=\"kc-main\"><button id=\"kc-sound\"><i class=\"ti ti-volume\" aria-hidden=\"true\"></i> Enable sound</button><button id=\"kc-end\"><i class=\"ti ti-x\" aria-hidden=\"true\"></i> End session</button></div>\n  <video id=\"kc-v\" muted playsinline loop autoplay aria-hidden=\"true\" style=\"position:absolute;width:1px;height:1px;opacity:0.01;left:0;top:0;pointer-events:none\" src=\"data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAMxbW9vdgAAAGxtdmhkAAAAAAAAAAAAAAAAAAAD6AAAB9AAAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAlt0cmFrAAAAXHRraGQAAAADAAAAAAAAAAAAAAABAAAAAAAAB9AAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAABAAAAAQAAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAAfQAAAAAAABAAAAAAHTbWRpYQAAACBtZGhkAAAAAAAAAAAAAAAAAABAAAAAgABVxAAAAAAALWhkbHIAAAAAAAAAAHZpZGUAAAAAAAAAAAAAAABWaWRlb0hhbmRsZXIAAAABfm1pbmYAAAAUdm1oZAAAAAEAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAAT5zdGJsAAAAvnN0c2QAAAAAAAAAAQAAAK5hdmMxAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAABAAEABIAAAASAAAAAAAAAABFUxhdmM2MC4zMS4xMDIgbGlieDI2NAAAAAAAAAAAAAAAGP//AAAANGF2Y0MBZAAK/+EAF2dkAAqs2V7ARAAAAwAEAAADAAg8SJZYAQAGaOvjyyLA/fj4AAAAABBwYXNwAAAAAQAAAAEAAAAUYnRydAAAAAAAAAtEAAALRAAAABhzdHRzAAAAAAAAAAEAAAACAABAAAAAABRzdHNzAAAAAAAAAAEAAAABAAAAHHN0c2MAAAAAAAAAAQAAAAEAAAACAAAAAQAAABxzdHN6AAAAAAAAAAAAAAACAAACxQAAAAwAAAAUc3RjbwAAAAAAAAABAAADYQAAAGJ1ZHRhAAAAWm1ldGEAAAAAAAAAIWhkbHIAAAAAAAAAAG1kaXJhcHBsAAAAAAAAAAAAAAAALWlsc3QAAAAlqXRvbwAAAB1kYXRhAAAAAQAAAABMYXZmNjAuMTYuMTAwAAAACGZyZWUAAALZbWRhdAAAAq0GBf//qdxF6b3m2Ui3lizYINkj7u94MjY0IC0gY29yZSAxNjQgcjMxMDggMzFlMTlmOSAtIEguMjY0L01QRUctNCBBVkMgY29kZWMgLSBDb3B5bGVmdCAyMDAzLTIwMjMgLSBodHRwOi8vd3d3LnZpZGVvbGFuLm9yZy94MjY0Lmh0bWwgLSBvcHRpb25zOiBjYWJhYz0xIHJlZj0zIGRlYmxvY2s9MTowOjAgYW5hbHlzZT0weDM6MHgxMTMgbWU9aGV4IHN1Ym1lPTcgcHN5PTEgcHN5X3JkPTEuMDA6MC4wMCBtaXhlZF9yZWY9MSBtZV9yYW5nZT0xNiBjaHJvbWFfbWU9MSB0cmVsbGlzPTEgOHg4ZGN0PTEgY3FtPTAgZGVhZHpvbmU9MjEsMTEgZmFzdF9wc2tpcD0xIGNocm9tYV9xcF9vZmZzZXQ9LTIgdGhyZWFkcz0xIGxvb2thaGVhZF90aHJlYWRzPTEgc2xpY2VkX3RocmVhZHM9MCBucj0wIGRlY2ltYXRlPTEgaW50ZXJsYWNlZD0wIGJsdXJheV9jb21wYXQ9MCBjb25zdHJhaW5lZF9pbnRyYT0wIGJmcmFtZXM9MyBiX3B5cmFtaWQ9MiBiX2FkYXB0PTEgYl9iaWFzPTAgZGlyZWN0PTEgd2VpZ2h0Yj0xIG9wZW5fZ29wPTAgd2VpZ2h0cD0yIGtleWludD0yNTAga2V5aW50X21pbj0xIHNjZW5lY3V0PTQwIGludHJhX3JlZnJlc2g9MCByY19sb29rYWhlYWQ9NDAgcmM9Y3JmIG1idHJlZT0xIGNyZj0yMy4wIHFjb21wPTAuNjAgcXBtaW49MCBxcG1heD02OSBxcHN0ZXA9NCBpcF9yYXRpbz0xLjQwIGFxPTE6MS4wMACAAAAAEGWIhAAW//730z/MsuyaJYEAAAAIQZohbEFf/vA=\"></video>\n</div>", COMMAND_HTML="<div style=\"display:flex;align-items:center;gap:8px;font-size:13px;color:var(--text-secondary);padding:4px 0\"><i class=\"ti ti-send\" style=\"font-size:16px\" aria-hidden=\"true\"></i><span id=\"o\">Sending</span></div>";
function mount(html){var root=document.getElementById('kh')||document.body.appendChild(document.createElement('div'));var s=document.createElement('style');s.textContent=CSS;root.appendChild(s);var d=document.createElement('div');d.innerHTML=html;root.appendChild(d);}
window.KitchenHelper={version:'1',
console:function(SESSION){mount(CONSOLE_HTML);
const K='kh_state',L='kh_leader',Q='kh_inbox',me=Math.random().toString(36).slice(2);
const $=i=>document.getElementById(i),now=()=>Date.now();
const rd=k=>{try{return JSON.parse(localStorage.getItem(k))}catch(e){return null}};
const wr=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
const fmt=ms=>{const s=Math.max(0,Math.ceil(ms/1000)),h=Math.floor(s/3600),m=Math.floor(s%3600/60),r=s%60;return (h?h+':'+String(m).padStart(2,'0'):m)+':'+String(r).padStart(2,'0')};
const spoken=ms=>{const s=Math.max(0,Math.round(ms/1000)),m=Math.floor(s/60),r=s%60;return m&&r?m+' min '+r+' sec':m?m+' min':r+' sec'};
const clock=t=>new Date(t).toLocaleTimeString([],{hour:'numeric',minute:'2-digit'});
const created=Date.parse(SESSION.createdAt)||now();
let timerLoop=null;
function halt(msg){if(timerLoop)clearInterval(timerLoop);timerLoop=null;$('kc-status').textContent=msg;$('kc-main').style.display='none';$('kc-timers').innerHTML='';try{$('kc-v').pause()}catch(e){}}
let st=rd(K);
if(now()-created>12*3600e3){halt('This kitchen session has ended.');return}
if(!st||!st.session||st.session.id!==SESSION.id){
  if(st&&st.session&&st.session.createdAt>created){halt('Replaced by a newer kitchen session.');return}
  st={session:{id:SESSION.id,createdAt:created,recipe:SESSION.recipe||'Kitchen',steps:SESSION.steps||[],current:SESSION.current||0,ended:false},timers:[],done:[]};
  wr(K,st);
  const q=rd(Q)||[];(SESSION.start||[]).forEach(c=>{if(c&&c.id&&!q.some(x=>x.id===c.id))q.push(c)});wr(Q,q);
}
if(st.session.ended){halt('This kitchen session has ended.');return}
let awake='checking',sound=false,actx=null,ringing={},lastBeep=0,outq=[],lastPost=0,pendNote=0,notes=new Set(),dirty=false,stepKey='';
const nm=x=>x.label+(x.step?' (step '+x.step+')':'');
const remOf=x=>x.left!=null?x.left:x.endsAt-now();
function post(m,urgent){if(urgent)outq.unshift(m);else outq.push(m)}
function flush(force){if(!outq.length)return;if(!force&&now()-lastPost<2500)return;lastPost=now();const m=outq.shift();try{sendPrompt(m)}catch(e){}}
function lead(){const l=rd(L);if(!l||l.id===me||now()-l.ts>4000){wr(L,{id:me,ts:now(),sid:SESSION.id});const c=rd(L);return !!c&&c.id===me}return false}
function find(t){const ts=st.timers.filter(x=>!x.posted&&!x.cancelled);if(!t||t==='latest')return ts.slice(-1);if(t==='all')return ts;const k=String(t).toLowerCase();const exact=ts.filter(x=>x.id===t);return exact.length?exact:ts.filter(x=>x.label.toLowerCase().includes(k))}
function desc(x){if(x.cancelled)return nm(x)+' cancelled';if(x.left!=null)return nm(x)+' paused with '+spoken(x.left)+' left';return nm(x)+' now ends at '+clock(x.endsAt)+', '+spoken(x.endsAt-now())+' left'}
function apply(c){
  let hit=[];
  if(c.cmd==='start'){const secs=Math.max(1,+c.seconds||60);const w=c.warn==null?60:+c.warn;const t={id:c.timerId||c.id,label:c.label||'Timer',step:+c.step||0,cue:c.cue||'',next:c.next||'',endsAt:now()+secs*1000,total:secs*1000,left:null,warn:w,warned:!w||secs<=w*2,posted:false,cancelled:false,kind:'timer'};st.timers.push(t);if(t.step)st.session.current=t.step;hit=[t]}
  else if(c.cmd==='cue'){(c.items||[]).forEach((it,i)=>{const at=Date.parse(it.at);if(!at)return;const t={id:c.id+'_'+i,label:it.text||'Cue',step:0,cue:'',next:'',endsAt:at,total:Math.max(1,at-now()),left:null,warn:0,warned:true,posted:false,cancelled:false,kind:'cue'};st.timers.push(t);hit.push(t)})}
  else if(c.cmd==='pause'){hit=find(c.target).filter(x=>x.kind==='timer'&&x.left==null);hit.forEach(x=>{x.left=Math.max(0,x.endsAt-now())})}
  else if(c.cmd==='resume'){hit=find(c.target).filter(x=>x.left!=null);hit.forEach(x=>{x.endsAt=now()+x.left;x.left=null})}
  else if(c.cmd==='add'){const d=(+c.seconds||60)*1000;hit=find(c.target).filter(x=>x.kind==='timer');hit.forEach(x=>{if(x.left!=null)x.left=Math.max(0,x.left+d);else x.endsAt+=d;x.total=Math.max(x.total+d,1);if(remOf(x)>x.warn*1000*2)x.warned=false})}
  else if(c.cmd==='cancel'){hit=find(c.target);hit.forEach(x=>{x.cancelled=true;delete ringing[x.id]})}
  else if(c.cmd==='step'){st.session.current=+c.n||st.session.current}
  else if(c.cmd==='recipe'){if(c.recipe)st.session.recipe=c.recipe;if(Array.isArray(c.steps))st.session.steps=c.steps;st.session.current=+c.current||0}
  else if(c.cmd==='end'){st.session.ended=true;st.timers.forEach(x=>{x.cancelled=true});wr(K,st);if(c.src==='tap'){post('Kitchen session ended (tapped).');flush(true)}halt('Kitchen session ended.');return 'stop'}
  if(c.src==='tap'&&hit.length){hit.forEach(x=>notes.add(x.id));pendNote=now()+3000}
}
function beep(){if(!sound||!actx)return;try{[0,0.35,0.7].forEach(t=>{const o=actx.createOscillator(),g=actx.createGain();o.frequency.value=880;o.connect(g);g.connect(actx.destination);g.gain.setValueAtTime(0.35,actx.currentTime+t);g.gain.exponentialRampToValueAtTime(0.001,actx.currentTime+t+0.28);o.start(actx.currentTime+t);o.stop(actx.currentTime+t+0.3)})}catch(e){}}
function ring(id){ringing[id]=now()+60e3}
function tick(){
  const cur=rd(K);
  if(cur&&cur.session&&cur.session.id!==SESSION.id){halt('Replaced by a newer kitchen session.');return}
  if(cur)st=cur;
  if(st.session.ended){halt('Kitchen session ended.');return}
  if(lead()){
    const q=rd(Q)||[];
    if(q.length){wr(Q,[]);for(const c of q){if(!c||!c.id||st.done.includes(c.id))continue;st.done.push(c.id);dirty=true;if(apply(c)==='stop')return}}
    if(st.done.length>300)st.done=st.done.slice(-300);
    for(const x of st.timers){
      if(x.posted||x.cancelled)continue;
      const rem=remOf(x);
      if(x.kind==='cue'){if(rem<=0){x.posted=true;dirty=true;if(-rem<3600e3){post('Kitchen cue: '+x.label+'.'+(-rem>60e3?' [late by '+spoken(-rem)+']':''),true);ring(x.id)}}continue}
      if(x.left==null&&rem<=0){x.posted=true;dirty=true;const late=-rem;if(late<3600e3){post('Timer done: '+st.session.recipe+', '+nm(x)+'.'+(x.cue?' Look for: '+x.cue+'.':'')+(x.next?' Next: '+x.next:'')+(late>10e3?' [fired '+spoken(late)+' late, likely missed while the screen was off]':''),true);ring(x.id)}}
      else if(x.left==null&&!x.warned&&rem<=x.warn*1000){x.warned=true;dirty=true;post('Timer update: '+nm(x)+' has '+spoken(rem)+' left.'+(x.cue?' Start checking for: '+x.cue+'.':''))}
    }
    if(pendNote&&now()>=pendNote){pendNote=0;const parts=[...notes].map(id=>st.timers.find(t=>t.id===id)).filter(Boolean).map(desc);notes.clear();if(parts.length)post('Timer update (tapped): '+parts.join('; ')+'.')}
    const before=st.timers.length;st.timers=st.timers.filter(x=>!(x.posted||x.cancelled)||ringing[x.id]||now()-x.endsAt<3600e3);if(st.timers.length!==before)dirty=true;
    if(dirty){wr(K,st);dirty=false}
    flush();
  }
  Object.keys(ringing).forEach(id=>{if(now()>ringing[id])delete ringing[id]});
  if(Object.keys(ringing).length&&now()-lastBeep>2500){lastBeep=now();beep()}
  render();
}
const nodes={};
function render(){
  $('kc-title').textContent=st.session.recipe;
  $('kc-status').textContent='Keep-awake: '+awake+' · Sound: '+(sound?'on':'off, tap to enable');
  const s=st.session,key=s.current+'|'+(s.steps||[]).length+'|'+s.recipe;
  if(key!==stepKey){stepKey=key;const box=$('kc-steps');box.innerHTML='';const steps=s.steps||[];if(steps.length&&s.current){const i=s.current-1;[i-1,i,i+1].forEach(j=>{if(j<0||j>=steps.length)return;const p=document.createElement('p');p.className='kc-step'+(j===i?' cur':'');const st0=steps[j];p.textContent=(j+1)+'. '+(typeof st0==='string'?st0:st0.text)+(j===i&&st0.cue?' — look for: '+st0.cue:'');box.appendChild(p)})}else if(steps.length){const p=document.createElement('p');p.className='kc-step';p.textContent=steps.length+' steps ready. Prep first.';box.appendChild(p)}}
  const list=st.timers.filter(x=>!x.cancelled&&(!x.posted||ringing[x.id]));
  const tb=$('kc-timers');
  Object.keys(nodes).forEach(id=>{if(!list.some(x=>x.id===id)){nodes[id].remove();delete nodes[id]}});
  for(const x of list){
    let n=nodes[x.id];
    if(!n){n=document.createElement('div');n.className='kc-t';n.dataset.id=x.id;n.innerHTML='<p class="kc-lab"></p><p class="kc-time"></p><div class="kc-bar"><div></div></div><p class="kc-sub"></p><div class="kc-btns"><button data-a="pp"></button><button data-a="add"><i class="ti ti-plus" aria-hidden="true"></i> 1 min</button><button data-a="cancel"><i class="ti ti-x" aria-hidden="true"></i> Cancel</button><button data-a="stop"><i class="ti ti-bell-off" aria-hidden="true"></i> Stop alarm</button></div>';tb.appendChild(n);nodes[x.id]=n}
    const r=remOf(x),isRing=!!ringing[x.id],paused=x.left!=null;
    n.classList.toggle('ring',isRing);
    n.querySelector('.kc-lab').textContent=(x.kind==='cue'?'Cue: ':'')+nm(x);
    n.querySelector('.kc-time').textContent=isRing?'0:00':fmt(r);
    n.querySelector('.kc-bar>div').style.width=Math.max(0,Math.min(100,r/x.total*100)).toFixed(1)+'%';
    n.querySelector('.kc-sub').textContent=isRing?(x.kind==='cue'?'Now':'Done')+(x.next?' · Next: '+x.next:''):(paused?'Paused':'Ends '+clock(x.endsAt))+(x.cue?' · Look for: '+x.cue:'');
    const pp=n.querySelector('[data-a="pp"]');pp.innerHTML=paused?'<i class="ti ti-player-play" aria-hidden="true"></i> Resume':'<i class="ti ti-player-pause" aria-hidden="true"></i> Pause';
    pp.style.display=isRing||x.kind==='cue'?'none':'';n.querySelector('[data-a="add"]').style.display=isRing||x.kind==='cue'?'none':'';
    n.querySelector('[data-a="cancel"]').style.display=isRing?'none':'';n.querySelector('[data-a="stop"]').style.display=isRing?'':'none';
  }
}
function enqueue(c){const q=rd(Q)||[];c.id='tap-'+now()+'-'+Math.random().toString(36).slice(2,6);c.src='tap';q.push(c);wr(Q,q)}
function unlock(){try{if(!actx)actx=new (window.AudioContext||window.webkitAudioContext)();actx.resume();sound=true}catch(e){}try{const v=$('kc-v');if(v.paused)v.play().then(()=>{if(awake==='off')awake='silent video (unconfirmed)'}).catch(()=>{})}catch(e){}}
$('kc').addEventListener('click',e=>{unlock();const b=e.target.closest('button');if(!b)return;
  if(b.id==='kc-sound'){render();return}
  if(b.id==='kc-end'){enqueue({cmd:'end'});return}
  const card=b.closest('.kc-t');if(!card)return;const id=card.dataset.id,a=b.dataset.a,x=st.timers.find(t=>t.id===id);if(!x)return;
  if(a==='stop'){delete ringing[id];render();return}
  if(a==='pp')enqueue({cmd:x.left!=null?'resume':'pause',target:id});
  if(a==='add')enqueue({cmd:'add',target:id,seconds:60});
  if(a==='cancel')enqueue({cmd:'cancel',target:id});
});
(async()=>{let ok=false;try{if('wakeLock' in navigator){await navigator.wakeLock.request('screen');ok=true;awake='on (wake lock)'}}catch(e){}
  if(!ok){try{await $('kc-v').play();awake='silent video (unconfirmed)'}catch(e){awake='off'}}})();
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'){try{$('kc-v').play().catch(()=>{})}catch(e){}tick()}});
window.addEventListener('storage',e=>{if(e.key===Q||e.key===K)tick()});
timerLoop=setInterval(tick,500);tick();
},
command:function(CMDS){mount(COMMAND_HTML);
const o=document.getElementById('o'),now=()=>Date.now();
const rd=k=>{try{return JSON.parse(localStorage.getItem(k))}catch(e){return null}};
const wr=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
const sp=ms=>{const s=Math.max(0,Math.round(ms/1000)),m=Math.floor(s/60),r=s%60;return m&&r?m+' min '+r+' sec':m?m+' min':r+' sec'};
const clock=t=>new Date(t).toLocaleTimeString([],{hour:'numeric',minute:'2-digit'});
const sent=rd('kh_sent')||[];
const todo=CMDS.filter(c=>c&&c.id&&!sent.includes(c.id));
if(!todo.length){o.textContent='Command already sent';return}
wr('kh_sent',sent.concat(todo.map(c=>c.id)).slice(-300));
const live=()=>{const l=rd('kh_leader');return !!l&&now()-l.ts<6000};
function status(){const st=rd('kh_state');if(!st||!st.session||st.session.ended)return 'Kitchen status: no active kitchen session.';
  const ts=(st.timers||[]).filter(x=>!x.posted&&!x.cancelled);
  const parts=ts.map(x=>{const rem=x.left!=null?x.left:x.endsAt-now();return (x.kind==='cue'?'cue "'+x.label+'"':x.label)+(x.left!=null?': paused with '+sp(rem)+' left':': '+sp(rem)+' left, at '+clock(x.endsAt))});
  const s=st.session,n=(s.steps||[]).length;
  return 'Kitchen status: '+s.recipe+'. '+(s.current&&n?'On step '+s.current+' of '+n+'. ':'')+(parts.length?parts.join('; ')+'.':'No timers running.')+(live()?'':' [Console not running; timers may be frozen.]')}
const out=[],labels=[];
const q=rd('kh_inbox')||[];
for(const c of todo){
  if(c.cmd==='status'){out.push(status());labels.push('Checked timers');continue}
  if(!q.some(x=>x.id===c.id))q.push(c);
  labels.push(c.cmd==='start'?'Started '+(c.label||'timer')+' · '+sp((+c.seconds||60)*1000):c.cmd==='step'?'Step '+c.n:c.cmd==='cue'?'Scheduled '+(c.items||[]).length+' cue(s)':(c.cmd.charAt(0).toUpperCase()+c.cmd.slice(1))+(c.target&&c.target!=='latest'?' '+c.target:''));
}
if(q.length)wr('kh_inbox',q);
o.textContent=labels.join(' · ');
const needsConsole=todo.some(c=>c.cmd!=='status');
if(out.length){try{sendPrompt(out.join(' '))}catch(e){}}
if(needsConsole)setTimeout(()=>{const q2=rd('kh_inbox')||[];const stuck=todo.some(c=>c.cmd!=='status'&&q2.some(x=>x.id===c.id));if(stuck&&!live()){o.textContent='Not delivered: no kitchen console running';try{sendPrompt('Kitchen console not running: '+todo.map(c=>c.cmd+(c.label?' '+c.label:'')).join(', ')+' was not delivered.')}catch(e){}}},3000);
}};
})();
