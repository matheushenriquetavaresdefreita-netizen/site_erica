/* =========================================================
   Lumière Studio — main.js
   Edite o bloco CONFIG para personalizar tudo.
   ========================================================= */
(() => {
'use strict';

/* ---------------- SUPABASE ---------------- */
// Bucket público. Use só o NOME do arquivo (ou URL completa começando com http).
const SB = 'https://idiejpihqjercgkbiwme.supabase.co/storage/v1/object/public/site_fotografia/';
const sb = f => !f ? null : /^https?:/.test(f) ? f : SB + encodeURIComponent(f);

/* ---------------- CONFIG ---------------- */
const CONFIG = {
  whatsapp: '554192662030', // DDI + DDD + número, só dígitos
  studio: 'Érica Escurceles – Momentos Reais',
  // Vídeos de fundo (caminho do arquivo .mp4/.webm, ou null para desativar)
  heroVideo: sb('video_1_corrigido.mp4'),      // ex.: 'media/hero.mp4'
  sessionsVideo: null,  // ex.: 'media/natal.mp4'
  currency: 'BRL',

  // Preços da calculadora
  pricing: {
    packages: [
      { id: 'essencial', name: 'Essencial', price: 300, desc: '15 fotos digitais em alta resolução + 5 fotos impressas 10x15 cm' },
      { id: 'memorias',  name: 'Memórias',  price: 400, desc: 'Todas as fotos digitais que ficarem boas + 8 impressas 10x15 cm' },
      { id: 'completo',  name: 'Completo',  price: 500, desc: 'Todas as fotos digitais que ficarem boas + 10 impressas 10x15 cm' }
    ],
    defaultPackage: 'memorias',
    perKm: 1.8,   // R$ por km rodado (ajuste ao seu custo)
    freeKm: 10,   // km totais sem cobrança
    options: [
      { id: 'express', label: 'Entrega expressa',    desc: 'Em até 7 dias',           price: 150 },
      { id: 'video',   label: 'Vídeo highlights',    desc: '1 a 2 min',               price: 80 }
    ]
  },

  // Data limite da campanha (ISO). Se já passou, usa hoje + 14 dias.
  campaignEnd: '2026-12-10T23:59:00-03:00',
  slots: [
    { day: 'Sáb 05/12', times: ['08:00','09:30','10:00','13:30','17:30'], taken: ['13:30','17:30'] },
    { day: 'Dom 06/12', times: ['08:00','09:30','10:00','11:00'], taken: ['11:00'] },
    { day: 'Sáb 12/12', times: ['09:00','09:30','10:00','11:30','14:00'], taken: ['15:00'] }
  ],
  testimonials: [
    { q: 'Em 20 minutos saíram as fotos mais bonitas que já tivemos da família inteira.', a: 'Camila' },
    { q: 'Processo leve, sem estresse, adoramos as imagens', a: 'Rafael M.' }
  ]
};

/* Fotos do portfólio. Troque `src` por suas imagens reais (veja README).
   Enquanto `src` for null, o site gera um placeholder com gradiente. */
const PHOTOS = [
  { t:'Casal Na Praia',   o:'pré-wedding',   s:'espontaneo',   e:'externo', h:24,  r:1.25, src: sb('ffd42ca465681f8605357068_IMG_3699.jpeg') },
  { t:'B&W',        o:'pré-wedding',   s:'classico', e:'externo', h:24, r:1.25,  src: sb('3b533a70a07db5b34e8fde3e_IMG_3624.jpeg') },
  { t:'Pegadas à beira-mar',     o:'corporativo',   s:'editorial', e:'externo', h:24, r:1.25,  src: sb('IMG_9608.JPG.jpeg') },
  { t:'Ao Ar Livre',  o:'pré-wedding', s:'espontaneo',  e:'estudio', h:24, r:1.25,  src: sb('677133969a78a99192ccc853_IMG_3655.jpeg') },
  { t:'Headshot clássico',     o:'familia', s:'espontaneo',   e:'externo', h:24,  r:1.25,  src: sb('IMG_9605.JPG.jpeg') },
  { t:'Encantador',o:'casamento',   s:'editorial',   e:'externo', h:24,  r:1.25,  src: sb('IMG_3195.JPG.jpeg') }
];

const QUESTIONS = [
  { key:'o', title:'Qual é a ocasião?', opts:[
    ['casamento','Casamento','Cerimônia e festa'],
    ['corporativo','Ensaio corporativo','Equipe, marca, retratos'],
    ['familia','Família','Crianças, casal, gerações'] ] },
  { key:'s', title:'Qual estilo você prefere?', opts:[
    ['editorial','Editorial','Poses, luz dramática'],
    ['espontaneo','Espontâneo','Momentos reais'],
    ['classico','Clássico','Atemporal e limpo'] ] },
  { key:'e', title:'Onde imagina as fotos?', opts:[
    ['externo','Ao ar livre','Luz natural'],
    ['interno','Em ambiente real','Casa, evento, escritório'],
    ['estudio','Estúdio','Controle total da luz'] ] },
  { key:'p', title:'O que mais importa na entrega?', opts:[
    ['qtd','Quantidade','Cobrir tudo'],
    ['arte','Poucas e artísticas','Cada foto é uma obra'],
    ['rapido','Rapidez','Receber logo'] ] }
];

const SPOTS = [
  { n:1, x:22, y:30, name:'Piçarras',     gh:'18h10 – 18h50', outfit:'Tons terrosos, linho, vestidos fluidos', best:'Casamento, família', h:110, note:'Luz lateral suave e reflexo na água.' },
  { n:2, x:58, y:22, name:'São Francisco do Sul',    gh:'17h50 – 18h30', outfit:'Cores sólidas, evitar estampas miúdas', best:'Casal, ensaio externo', h:25,  note:'Vista aberta, ótimo para contraluz.' },
  { n:3, x:75, y:58, name:'Guaratuba',      gh:'16h40 – 17h20', outfit:'Preto, branco e jeans', best:'Editorial, corporativo', h:210, note:'Textura de tijolo e trilhos.' },
  { n:4, x:38, y:68, name:'Jardim Botânico',     gh:'8h30 – 9h30',   outfit:'Tons claros e pastéis', best:'Família, casamento', h:130, note:'Manhã filtrada pelas folhas.' },
  { n:5, x:14, y:78, name:'Praça Central',       gh:'17h30 – 18h10', outfit:'Cores vivas contrastando com o verde', best:'Espontâneo, família', h:340, note:'Movimento de gente e bancos antigos.' }
];

/* ---------------- Helpers ---------------- */
const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];
const brl = n => n.toLocaleString('pt-BR',{style:'currency',currency:CONFIG.currency,maximumFractionDigits:0});
const wa = text => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasGSAP = () => typeof window.gsap !== 'undefined';

function placeholder(h, ratio){
  const bg = `linear-gradient(${150 + h % 60}deg, hsl(${h} 55% 62%), hsl(${(h+40)%360} 50% 28%))`;
  const glow = `radial-gradient(60% 45% at ${30 + h % 40}% 30%, hsla(${(h+20)%360},90%,80%,.55), transparent 70%)`;
  return `<div class="ph" role="img" style="aspect-ratio:1/${ratio};background:${glow},${bg}"></div>`;
}
function photoMarkup(p, label){
  const media = p.video
    ? `<video class="ph" muted loop playsinline preload="metadata" src="${sb(p.video)}" aria-label="${p.t}" style="aspect-ratio:1/${p.r};object-fit:cover;width:100%"></video>`
    : p.src
    ? `<img class="ph" loading="lazy" decoding="async" src="${sb(p.src)}" alt="${p.t}" style="aspect-ratio:1/${p.r};object-fit:cover;width:100%">`
    : placeholder(p.h, p.r);
  return `${media}<span class="tag">${label}</span><figcaption><b>${p.t}</b>${p.o} · ${p.s}</figcaption>`;
}

/* ---------------- Footer / links ---------------- */
$('#year').textContent = new Date().getFullYear();
$('#waFooter').href = wa(`Olá! Vim pelo site da ${CONFIG.studio}.`);

/* ---------------- 1. QUIZ + GALERIA ---------------- */
const quizBody = $('#quizBody'), quizBar = $('#quizBar');
const backBtn = $('#quizBack'), resetBtn = $('#quizReset');
const gallery = $('#gallery'), resultHead = $('#resultHead');
let step = 0, answers = {};

function renderStep(){
  const q = QUESTIONS[step];
  quizBar.style.width = `${(step / QUESTIONS.length) * 100}%`;
  backBtn.hidden = step === 0;
  resetBtn.hidden = true;
  quizBody.innerHTML = `
    <h3 class="q-title">${step+1}/${QUESTIONS.length} — ${q.title}</h3>
    <div class="q-opts">${q.opts.map(([v,l,d]) =>
      `<button type="button" class="q-opt" data-v="${v}"><b>${l}</b><small>${d}</small></button>`).join('')}</div>`;
  if (hasGSAP() && !reduce) gsap.from(quizBody.children, {opacity:0, y:18, stagger:.08, duration:.5, ease:'power3.out'});
  $$('.q-opt', quizBody).forEach(b => b.addEventListener('click', () => {
    answers[q.key] = b.dataset.v;
    step++;
    step < QUESTIONS.length ? renderStep() : finishQuiz();
  }));
}

function score(p){
  let s = 0;
  if (p.o === answers.o) s += 4;
  if (p.s === answers.s) s += 3;
  if (p.e === answers.e) s += 2;
  return s;
}

function finishQuiz(){
  quizBar.style.width = '100%';
  resetBtn.hidden = false; backBtn.hidden = true;
  const names = Object.fromEntries(QUESTIONS.slice(0,3).map(q => [q.key, q.opts.find(o => o[0]===answers[q.key])[1]]));
  quizBody.innerHTML = `<h3 class="q-title">Pronto! Montei uma galeria para você.</h3>
    <p style="color:var(--muted)">${names.o} · ${names.s} · ${names.e}</p>
    <p style="margin-top:14px"><a class="btn" id="waQuiz" href="#" target="_blank" rel="noopener">Quero conversar sobre isso</a></p>`;
  $('#waQuiz').href = wa(`Olá! Fiz a consultoria no site: ${names.o}, estilo ${names.s}, ${names.e}. Prioridade: ${QUESTIONS[3].opts.find(o=>o[0]===answers.p)[1]}.`);
  $('#resultTitle').textContent = `${names.o} no estilo ${names.s.toLowerCase()}`;
  $('#resultText').textContent = 'Os melhores encontros aparecem primeiro; os demais ficam mais suaves.';
  resultHead.hidden = false;
  renderGallery(true);
  resultHead.scrollIntoView({behavior: reduce ? 'auto':'smooth', block:'start'});
}

function renderGallery(filtered){
  const list = [...PHOTOS].map(p => ({p, s: filtered ? score(p) : 0}));
  if (filtered) list.sort((a,b) => b.s - a.s);
  gallery.innerHTML = list.map(({p,s}) => {
    const strong = !filtered || s >= 7;
    const label = !filtered ? p.o : (s >= 9 ? 'Combina 100%' : s >= 7 ? 'Muito parecido' : 'Para inspirar');
    return `<figure class="shot${strong ? '' : ' dim'}" data-reveal>${photoMarkup(p, label)}</figure>`;
  }).join('');
  animateShots();
}

function animateShots(){
  const shots = $$('.shot', gallery);
  if (!hasGSAP() || reduce) return;
  gsap.set(shots, {opacity:0, y:50, scale:.96});
  ScrollTrigger.batch(shots, {
    start:'top 92%', once:true,
    onEnter: b => gsap.to(b, {opacity: i => 1, y:0, scale:1, stagger:.09, duration:.8, ease:'power3.out',
      onComplete(){ b.forEach(el => { if(el.classList.contains('dim')) el.style.opacity = ''; }); }})
  });
  // Parallax sutil nas imagens
  shots.forEach(el => {
    const ph = $('.ph', el);
    gsap.fromTo(ph, {yPercent:-6}, {yPercent:6, ease:'none',
      scrollTrigger:{trigger:el, start:'top bottom', end:'bottom top', scrub:true}});
  });
  ScrollTrigger.refresh();
}

backBtn.addEventListener('click', () => { if(step>0){ step--; delete answers[QUESTIONS[step].key]; renderStep(); }});
resetBtn.addEventListener('click', () => { step = 0; answers = {}; resultHead.hidden = true; renderGallery(false); renderStep(); });
renderStep();
renderGallery(false);

/* Vídeos na galeria: tocam ao passar o mouse / tocar */
gallery.addEventListener('mouseover', e => { const v = e.target.closest('.shot')?.querySelector('video'); v && v.play().catch(()=>{}); });
gallery.addEventListener('mouseout',  e => { const v = e.target.closest('.shot')?.querySelector('video'); v && v.pause(); });
gallery.addEventListener('click',     e => { const v = e.target.closest('.shot')?.querySelector('video'); v && (v.paused ? v.play() : v.pause()); });

/* Vídeo de fundo (hero e sessões especiais) */
function bgVideo(parent, src){
  if (!src || reduce) return;
  const v = document.createElement('video');
  v.className = 'bgvideo'; v.src = src; v.muted = true; v.loop = true; v.autoplay = true; v.playsInline = true;
  parent.prepend(v); v.play().catch(()=>{});
}
bgVideo($('.hero-bg'), CONFIG.heroVideo);
bgVideo($('#sessoes'), CONFIG.sessionsVideo);

/* ---------------- 2. CALCULADORA ---------------- */
const optsBox = $('#opts');
optsBox.innerHTML = CONFIG.pricing.options.map(o => `
  <label class="opt" data-id="${o.id}">
    <input type="checkbox" value="${o.id}">
    <span>${o.label}<small>${o.desc} · +${brl(o.price)}</small></span>
  </label>`).join('');

const packsBox = $('#packs'), kmEl = $('#km'), roundEl = $('#roundTrip');
let packSel = CONFIG.pricing.defaultPackage, shownTotal = 0;
packsBox.innerHTML = CONFIG.pricing.packages.map(p => `
  <label class="opt pack">
    <input type="radio" name="pack" value="${p.id}" ${p.id === packSel ? 'checked' : ''}>
    <span>${p.name} · ${brl(p.price)}<small>${p.desc}</small></span>
  </label>`).join('');
packsBox.addEventListener('change', e => { packSel = e.target.value; updateCalc(); });

function calc(){
  const P = CONFIG.pricing;
  const pk = P.packages.find(p => p.id === packSel);
  const lines = [[`Pacote ${pk.name}`, pk.price]];
  const km = Math.max(0, +kmEl.value || 0) * (roundEl.checked ? 2 : 1);
  if (km) lines.push([`Deslocamento (${km} km${P.freeKm ? `, ${P.freeKm} grátis` : ''})`, Math.max(0, km - P.freeKm) * P.perKm]);
  $$('input:checked', optsBox).forEach(i => {
    const o = P.options.find(x => x.id === i.value);
    lines.push([o.label, o.price]);
  });
  const total = lines.reduce((a,[,v]) => a + v, 0);
  return {lines, total};
}

function updateCalc(){
  const c = calc();
  $$('.pack', packsBox).forEach(l => l.classList.toggle('on', $('input', l).checked));
  $$('.opt', optsBox).forEach(l => l.classList.toggle('on', $('input',l).checked));
  $('#summaryList').innerHTML = c.lines.map(([l,v]) => `<li><span>${l}</span><span>${v ? brl(v) : 'incluso'}</span></li>`).join('');
  const totalEl = $('#total');
  if (hasGSAP() && !reduce){
    const o = {v: shownTotal};
    gsap.to(o, {v:c.total, duration:.6, ease:'power2.out', overwrite:true, onUpdate:() => totalEl.textContent = brl(Math.round(o.v))});
  } else totalEl.textContent = brl(c.total);
  shownTotal = c.total;
  const txt = [`Olá! Montei meu pacote no site da ${CONFIG.studio}:`, ...c.lines.map(([l,v]) => `• ${l}${v ? ': ' + brl(v) : ''}`), `Estimativa: ${brl(c.total)}`, 'Podemos conversar sobre datas?'].join('\n');
  $('#waQuote').href = wa(txt);
}
[kmEl, roundEl].forEach(e => e.addEventListener('input', updateCalc));
optsBox.addEventListener('change', updateCalc);
updateCalc();

/* ---------------- 3. MAPA ---------------- */
const map = $('#map');
map.insertAdjacentHTML('afterbegin', `
<svg viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden="true">
  <rect width="400" height="300" fill="#e3e9d8"/>
  <path d="M0 210 C90 170 150 240 240 200 S360 170 400 190 L400 300 L0 300Z" fill="#c6dbe4"/>
  <path d="M-10 110 C80 90 130 140 220 120 S340 60 410 80" fill="none" stroke="#fff" stroke-width="9"/>
  <path d="M120 -10 C140 80 100 150 150 310" fill="none" stroke="#fff" stroke-width="7"/>
  <path d="M300 -10 C280 90 330 160 290 310" fill="none" stroke="#f4efe3" stroke-width="5"/>
  <circle cx="90" cy="95" r="30" fill="#c9d9b6"/><circle cx="250" cy="250" r="34" fill="#c9d9b6"/><circle cx="330" cy="50" r="26" fill="#d4e0c2"/>
</svg>`);
SPOTS.forEach(s => {
  const b = document.createElement('button');
  b.className = 'pin'; b.type = 'button';
  b.style.left = s.x + '%'; b.style.top = s.y + '%';
  b.setAttribute('aria-label', s.name);
  b.innerHTML = `<i><span>${s.n}</span></i>`;
  b.addEventListener('click', () => showSpot(s, b));
  map.appendChild(b);
});
function showSpot(s, btn){
  $$('.pin', map).forEach(p => p.classList.toggle('active', p === btn));
  const spot = $('#spot');
  spot.innerHTML = `${placeholder(s.h, 0.56)}
    <div class="body"><h3>${s.name}</h3><p style="color:var(--muted)">${s.note}</p>
    <dl><dt>Golden hour</dt><dd>${s.gh}</dd><dt>Roupas</dt><dd>${s.outfit}</dd><dt>Ideal para</dt><dd>${s.best}</dd></dl>
    <p style="margin-top:16px"><a class="btn" href="${wa(`Olá! Quero fazer um ensaio em: ${s.name}.`)}" target="_blank" rel="noopener">Ensaio neste local</a></p></div>`;
  if (hasGSAP() && !reduce) gsap.from(spot, {opacity:.2, y:14, duration:.5, ease:'power2.out'});
}
showSpot(SPOTS[0], $$('.pin', map)[0]);

/* ---------------- 4. SESSÕES: contagem, horários, depoimentos ---------------- */
let end = new Date(CONFIG.campaignEnd).getTime();
if (isNaN(end) || end < Date.now()) end = Date.now() + 14 * 864e5;
const pad = n => String(n).padStart(2,'0');
function tick(){
  let d = Math.max(0, end - Date.now());
  const days = Math.floor(d/864e5); d -= days*864e5;
  const h = Math.floor(d/36e5); d -= h*36e5;
  const m = Math.floor(d/6e4); d -= m*6e4;
  $('#cd-d').textContent = pad(days); $('#cd-h').textContent = pad(h);
  $('#cd-m').textContent = pad(m);   $('#cd-s').textContent = pad(Math.floor(d/1e3));
}
tick(); setInterval(tick, 1000);

const slotsBox = $('#slots'), waSlot = $('#waSlot');
let chosen = null;
slotsBox.innerHTML = CONFIG.slots.flatMap(d => d.times.map(t => {
  const off = d.taken.includes(t);
  return `<button type="button" class="slot" role="option" ${off ? 'disabled' : ''} data-v="${d.day} às ${t}"><small>${d.day}</small>${t}</button>`;
})).join('');
waSlot.href = wa('Olá! Quero reservar uma mini sessão de Natal.');
slotsBox.addEventListener('click', e => {
  const b = e.target.closest('.slot'); if (!b || b.disabled) return;
  $$('.slot', slotsBox).forEach(x => { x.classList.remove('sel'); x.setAttribute('aria-selected','false'); });
  b.classList.add('sel'); b.setAttribute('aria-selected','true');
  chosen = b.dataset.v;
  waSlot.href = wa(`Olá! Quero reservar a mini sessão de Natal: ${chosen}.`);
});

let ti = 0, tTimer;
const tq = $('#testiQuote'), ta = $('#testiAuthor'), td = $('#testiDots');
td.innerHTML = CONFIG.testimonials.map((_,i) => `<button type="button" aria-label="Depoimento ${i+1}"></button>`).join('');
function showTesti(i){
  ti = i;
  const t = CONFIG.testimonials[i];
  const apply = () => { tq.textContent = `“${t.q}”`; ta.textContent = `— ${t.a}`;
    $$('button', td).forEach((b,j) => b.classList.toggle('on', j===i)); };
  if (hasGSAP() && !reduce) gsap.to([tq,ta], {opacity:0, y:-8, duration:.25, onComplete(){ apply(); gsap.to([tq,ta], {opacity:1, y:0, duration:.4}); }});
  else apply();
}
td.addEventListener('click', e => { const i = $$('button', td).indexOf(e.target); if(i>-1){ clearInterval(tTimer); showTesti(i); }});
showTesti(0);
tTimer = setInterval(() => showTesti((ti+1) % CONFIG.testimonials.length), 6000);

/* ---------------- ANIMAÇÕES DE SCROLL (GSAP) ---------------- */
function initScroll(){
  if (!hasGSAP() || !window.ScrollTrigger || reduce){
    $$('.reveal').forEach(e => { e.style.opacity = 1; e.style.transform = 'none'; });
    $$('[data-count]').forEach(e => e.textContent = e.dataset.count + (e.dataset.suffix||''));
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  // Barra de progresso + nav
  gsap.to('#progress', {scaleX:1, ease:'none', scrollTrigger:{scrub:.2, start:0, end:'max'}});
  ScrollTrigger.create({start:80, end:'max', onUpdate: s => $('#nav').classList.toggle('solid', s.scroll() > 80 && s.scroll() > innerHeight*.8)});

  // Hero: entrada + saída ligada ao scroll
  gsap.from('.hero-title .line > span', {yPercent:110, duration:1.1, stagger:.15, ease:'power4.out', delay:.1});
  gsap.from(['.hero .eyebrow','.hero-sub','.hero .btn'], {opacity:0, y:24, stagger:.15, duration:.9, delay:.6, ease:'power3.out'});
  gsap.to('.hero-inner', {yPercent:-18, opacity:0, ease:'none', scrollTrigger:{trigger:'.hero', start:'top top', end:'bottom 30%', scrub:true}});
  gsap.to('.hero-bg', {yPercent:18, scale:1.12, ease:'none', scrollTrigger:{trigger:'.hero', start:'top top', end:'bottom top', scrub:true}});
  gsap.to('.scroll-hint', {opacity:0, scrollTrigger:{trigger:'.hero', start:'top top', end:'15% top', scrub:true}});

  // Reveals genéricos
  ScrollTrigger.batch('.reveal', {
    start:'top 88%', once:true,
    onEnter: b => gsap.to(b, {opacity:1, y:0, duration:.9, stagger:.12, ease:'power3.out'})
  });

  // Contadores
  $$('[data-count]').forEach(el => {
    const end = +el.dataset.count, suf = el.dataset.suffix || '', o = {v:0};
    ScrollTrigger.create({trigger:el, start:'top 90%', once:true, onEnter(){
      gsap.to(o, {v:end, duration:1.8, ease:'power2.out', onUpdate:() => el.textContent = Math.round(o.v) + suf});
    }});
  });

  // Título das seções com leve deslocamento horizontal
  $$('h2').forEach(h => gsap.fromTo(h, {x:-30}, {x:30, ease:'none', scrollTrigger:{trigger:h, start:'top bottom', end:'bottom top', scrub:true}}));

  // Pins do mapa "pulam" ao entrar
  gsap.from('.pin', {scale:0, transformOrigin:'50% 100%', stagger:.12, duration:.6, ease:'back.out(2)', scrollTrigger:{trigger:'#map', start:'top 75%', once:true}});

  // Contagem regressiva ganha destaque
  gsap.from('#countdown > div', {opacity:0, y:30, stagger:.1, duration:.7, scrollTrigger:{trigger:'#countdown', start:'top 85%', once:true}});

  ScrollTrigger.refresh();
}

// Os scripts do GSAP carregam com defer, antes deste; garante ordem mesmo assim.
if (document.readyState === 'complete') initScroll();
else addEventListener('load', initScroll);

})();
