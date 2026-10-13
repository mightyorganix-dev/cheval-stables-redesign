document.querySelector('.tog').onclick=e=>{const n=document.querySelector('nav');n.classList.toggle('open');e.target.setAttribute('aria-expanded',n.classList.contains('open'))};
document.querySelectorAll('nav a').forEach(a=>a.onclick=()=>document.querySelector('nav').classList.remove('open'));
(function(){const grid=document.getElementById('days'),title=document.getElementById('mon'),dateIn=document.getElementById('date');
const today=new Date();today.setHours(0,0,0,0);let view=new Date(today.getFullYear(),today.getMonth(),1),sel=null;
function render(){title.textContent=view.toLocaleString('en-US',{month:'long',year:'numeric'});grid.innerHTML='';'SMTWTFS'.split('').forEach(d=>grid.insertAdjacentHTML('beforeend','<div class="dow">'+d+'</div>'));
for(let i=0;i<view.getDay();i++)grid.insertAdjacentHTML('beforeend','<div></div>');const n=new Date(view.getFullYear(),view.getMonth()+1,0).getDate();
for(let d=1;d<=n;d++){const dt=new Date(view.getFullYear(),view.getMonth(),d),b=document.createElement('button');b.type='button';b.textContent=d;b.disabled=dt<today;if(sel&&+dt==+sel)b.className='sel';b.onclick=()=>{sel=dt;dateIn.value=dt.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'});render();upd()};grid.appendChild(b)}}
document.getElementById('prev').onclick=()=>{const p=new Date(view.getFullYear(),view.getMonth()-1,1);if(p>=new Date(today.getFullYear(),today.getMonth(),1)){view=p;render()}};
document.getElementById('next').onclick=()=>{view=new Date(view.getFullYear(),view.getMonth()+1,1);render()};
const f=document.getElementById('bk'),sum=document.getElementById('sum'),rw=document.getElementById('riderwrap');
function svc(){return f.querySelector('input[name=svc]:checked').value}
function upd(){const s=svc(),r=+f.riders.value||1;rw.querySelector('span').textContent=s==='trail'?'Number of riders (age 8+)':'Number of students';
sum.textContent=(s==='trail'?`Guided Trail Ride · ${r} rider${r>1?'s':''} × $65 = $${r*65} + tip`:`Riding Lesson · ${r} student${r>1?'s':''} · call for pricing`)+(sel?' · '+dateIn.value:' · pick a date')}
f.addEventListener('input',upd);
f.onsubmit=e=>{e.preventDefault();if(!sel){alert('Please pick a date on the calendar.');return}const s=svc()==='trail'?'Guided Trail Ride':'Riding Lesson';
const body=`Request type: ${s}\nDate: ${dateIn.value}\nPreferred time: ${f.time.value}\nRiders/students: ${f.riders.value}\nName: ${f.name.value}\nPhone: ${f.phone.value}\nNotes: ${f.notes.value}\n\n(Sent from the Cheval Stables preview booking form)`;
document.getElementById('res').hidden=false;document.getElementById('mail').href='mailto:ChevalStablesTN@gmail.com?subject='+encodeURIComponent(s+' request – '+dateIn.value)+'&body='+encodeURIComponent(body)};
render();upd()})();
(function(){const els=document.querySelectorAll('.reveal');if(!('IntersectionObserver'in window)||matchMedia('(prefers-reduced-motion: reduce)').matches){els.forEach(e=>e.classList.add('in'));return}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.05});els.forEach(e=>io.observe(e))})();
(function(){const imgs=[...document.querySelectorAll('.gallery img')],lb=document.getElementById('lb'),im=lb.querySelector('img'),cap=lb.querySelector('p');let i=0;
function show(n){i=(n+imgs.length)%imgs.length;im.src=imgs[i].src;im.alt=imgs[i].alt;cap.textContent=imgs[i].alt;lb.hidden=false}
imgs.forEach((g,n)=>g.onclick=()=>show(n));lb.querySelector('.lb-x').onclick=()=>lb.hidden=true;lb.querySelector('.lb-p').onclick=e=>{e.stopPropagation();show(i-1)};lb.querySelector('.lb-n').onclick=e=>{e.stopPropagation();show(i+1)};
lb.onclick=e=>{if(e.target===lb)lb.hidden=true};document.addEventListener('keydown',e=>{if(lb.hidden)return;if(e.key==='Escape')lb.hidden=true;if(e.key==='ArrowLeft')show(i-1);if(e.key==='ArrowRight')show(i+1)})})();
(function(){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const bands=document.querySelectorAll('.band');if(matchMedia('(min-width:900px) and (hover:hover)').matches)return;
addEventListener('scroll',()=>bands.forEach(b=>{const r=b.getBoundingClientRect();b.style.backgroundPosition='center '+(50+(r.top/innerHeight)*-12)+'%'}),{passive:true})})();
