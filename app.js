(function(){
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
// loader
const loader=$('#loader');
function hideLoader(){loader&&loader.classList.add('done');document.body.classList.add('ready');$$('.hero .eyebrow,.hero h1,.hero .loc,.hero .quote,.hero .btns').forEach((e,i)=>{e.style.transitionDelay=(i*.15)+'s';e.classList.add('in')})}
if(loader){ if(sessionStorage.getItem('seen')){loader.style.display='none';hideLoader()}else{setTimeout(()=>{hideLoader();sessionStorage.setItem('seen',1)},1700)}} else hideLoader();
// curtain page transition
const curtain=$('#curtain');
curtain.style.transform='translateY(0)';curtain.style.transition='none';
requestAnimationFrame(()=>requestAnimationFrame(()=>{curtain.style.transition='';curtain.style.transform='translateY(-100%)';setTimeout(()=>{curtain.style.transition='none';curtain.style.transform='translateY(100%)';setTimeout(()=>curtain.style.transition='',50)},800)}));
$$('a[href]').forEach(a=>{const h=a.getAttribute('href');if(!h||h[0]=='#'||h.startsWith('http')||h.startsWith('tel')||a.target=='_blank')return;
a.addEventListener('click',e=>{if(e.metaKey||e.ctrlKey)return;e.preventDefault();curtain.classList.add('in');setTimeout(()=>location.href=h,650)})});
window.addEventListener('pageshow',e=>{if(e.persisted)curtain.classList.remove('in')});
// nav
const nav=$('.nav'),prog=$('#progress'),top=$('.top');
function onScroll(){const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;nav.classList.toggle('scrolled',y>60);prog.style.width=(y/h*100)+'%';top.classList.toggle('show',y>600);
const hs=$('.hero .slide.on');if(hs&&y<innerHeight)$('.hero-in').style.transform='translateY('+y*.25+'px)',$('.hero-in').style.opacity=1-y/(innerHeight*.8)}
addEventListener('scroll',onScroll,{passive:true});onScroll();
top.onclick=()=>scrollTo({top:0});
const burger=$('.burger'),links=$('.links');
burger.onclick=()=>{burger.classList.toggle('open');links.classList.toggle('open')};
$$('.dd>a').forEach(a=>a.addEventListener('click',e=>{if(innerWidth<=980){e.preventDefault();a.parentElement.classList.toggle('open')}}));
$$('.panel a').forEach(a=>a.addEventListener('click',()=>{burger.classList.remove('open');links.classList.remove('open')}));
// reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
$$('.rv').forEach(e=>io.observe(e));
// split text
$$('.split').forEach(el=>{const t=el.textContent.trim().split(' ');el.innerHTML=t.map((w,i)=>`<span style="animation-delay:${.9+i*.08}s">${w}</span>`).join(' ')});
// hero slider
const slides=$$('.hero .slide'),dots=$$('.dots b');let si=0,st;
function go(i){if(!slides.length)return;slides[si].classList.remove('on');dots[si]&&dots[si].classList.remove('on');si=(i+slides.length)%slides.length;slides[si].classList.add('on');dots[si]&&dots[si].classList.add('on')}
if(slides.length){go(0);st=setInterval(()=>go(si+1),6500);dots.forEach((d,i)=>d.onclick=()=>{clearInterval(st);go(i);st=setInterval(()=>go(si+1),6500)})}
// particles
const pc=$('.particles');if(pc){for(let i=0;i<28;i++){const p=document.createElement('i');p.style.left=Math.random()*100+'%';p.style.animationDuration=(8+Math.random()*10)+'s';p.style.animationDelay=(-Math.random()*14)+'s';const s=1+Math.random()*3;p.style.width=p.style.height=s+'px';pc.appendChild(p)}}
// counters
const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;co.unobserve(e.target);const el=e.target,end=+el.dataset.n,suf=el.dataset.s||'',t0=performance.now();
(function f(t){const p=Math.min((t-t0)/2000,1),v=Math.round(end*(1-Math.pow(1-p,4)));el.textContent=v+suf;if(p<1)requestAnimationFrame(f)})(t0)}),{threshold:.6});
$$('[data-n]').forEach(e=>co.observe(e));
// glow cursor
const g=$('#glow');if(g){addEventListener('mousemove',e=>{g.style.opacity=1;g.style.left=e.clientX+'px';g.style.top=e.clientY+'px'})}
// magnetic buttons
$$('.btn').forEach(b=>{b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.15}px,${(e.clientY-r.top-r.height/2)*.25-3}px)`});b.addEventListener('mouseleave',()=>b.style.transform='')});
// read more
const rm=$('#readmore');if(rm)rm.onclick=()=>{const m=$('.more');m.classList.toggle('open');rm.textContent=m.classList.contains('open')?'Read Less ↑':'Read More ↓'};
// gallery tabs
$$('.tabs button').forEach(b=>b.onclick=()=>{$$('.tabs button').forEach(x=>x.classList.toggle('active',x===b));['photos','videos'].forEach(id=>$('#'+id).classList.toggle('hidden',id!==b.dataset.type));$$('.rv').forEach(e=>io.observe(e))});
// lightbox
const lb=$('#lb');if(lb){const imgs=$$('[data-lb]');let li=0;const im=$('img',lb);
const open=i=>{li=(i+imgs.length)%imgs.length;im.src=imgs[li].dataset.lb||imgs[li].src;lb.classList.add('on')};
imgs.forEach((e,i)=>e.addEventListener('click',()=>open(i)));
$('.x',lb).onclick=()=>lb.classList.remove('on');$('.p',lb).onclick=()=>open(li-1);$('.n',lb).onclick=()=>open(li+1);
lb.onclick=e=>{if(e.target===lb)lb.classList.remove('on')};
addEventListener('keydown',e=>{if(!lb.classList.contains('on'))return;if(e.key=='Escape')lb.classList.remove('on');if(e.key=='ArrowRight')open(li+1);if(e.key=='ArrowLeft')open(li-1)})}
})();
