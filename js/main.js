/* Teacher Patrícia · interações da landing page */
(function () {
  'use strict';

  /* ---------- Tema claro / escuro ---------- */
  var root = document.documentElement;
  var btn = document.getElementById('theme');
  var KEY = 'tp-theme';

  function isDark() {
    if (root.dataset.theme) return root.dataset.theme === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  function paint() { btn.textContent = isDark() ? '☀️' : '🌙'; }

  try {
    var saved = localStorage.getItem(KEY);
    if (saved) root.dataset.theme = saved;
  } catch (e) {}
  paint();

  btn.addEventListener('click', function () {
    var next = isDark() ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem(KEY, next); } catch (e) {}
    paint();
  });

  /* ---------- Abas Business / Tech ---------- */
  var tabs = document.querySelectorAll('.tabs button[data-tab]');
  var panels = document.querySelectorAll('.panel');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('on'); });
      panels.forEach(function (p) { p.classList.remove('on'); });
      tab.classList.add('on');
      document.getElementById(tab.dataset.tab).classList.add('on');
    });
  });

  /* ---------- Phrase of the day ---------- */
  var phrases = {
    biz: [
      ['Let’s circle back on this next week.', 'Vamos retomar isso na semana que vem.'],
      ['Could you loop me in on that thread?', 'Pode me incluir nessa conversa?'],
      ['Let’s touch base after the call.', 'Vamos nos falar depois da call.'],
      ['I’d like to flag a potential risk.', 'Quero sinalizar um possível risco.'],
      ['We’re on the same page.', 'Estamos alinhados.']
    ],
    tech: [
      ['I’ll push a fix to staging today.', 'Vou subir uma correção no staging hoje.'],
      ['Can you review my pull request?', 'Pode revisar meu pull request?'],
      ['The build is failing on CI.', 'O build está falhando no CI.'],
      ['We need to roll back the release.', 'Precisamos reverter a release.'],
      ['I’m blocked by the API team.', 'Estou bloqueado pelo time da API.']
    ]
  };
  var pos = { biz: 0, tech: 0 };

  document.querySelectorAll('[data-next]').forEach(function (b) {
    b.addEventListener('click', function () {
      var k = b.dataset.next;
      pos[k] = (pos[k] + 1) % phrases[k].length;
      document.getElementById('ph-' + k).textContent = '“' + phrases[k][pos[k]][0] + '”';
      document.getElementById('tr-' + k).textContent = '= ' + phrases[k][pos[k]][1];
    });
  });

  /* ---------- Reveal ao rolar ---------- */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Hero: seletor Aulas particulares (submenu) ---------- */
  var ctaBtn = document.querySelector('[data-cta]');
  if (ctaBtn) {
    var sub = document.getElementById(ctaBtn.getAttribute('aria-controls'));
    ctaBtn.addEventListener('click', function () {
      var open = !ctaBtn.classList.contains('on');
      ctaBtn.classList.toggle('on', open);
      ctaBtn.setAttribute('aria-expanded', String(open));
      ctaBtn.setAttribute('aria-selected', String(open));
      sub.classList.toggle('on', open);
    });
  }

  /* ---------- Copiar e-mail ---------- */
  var copyBtn = document.querySelector('[data-copy]');
  if (copyBtn) {
    var status = document.getElementById('copy-status');
    var label = copyBtn.textContent;
    var done = function (ok) {
      copyBtn.textContent = ok ? 'Copiado ✓' : 'Copie manualmente';
      copyBtn.classList.toggle('ok', ok);
      if (status) status.textContent = ok ? 'E-mail copiado' : 'Não foi possível copiar';
      setTimeout(function () { copyBtn.textContent = label; copyBtn.classList.remove('ok'); }, 2200);
    };
    var fallback = function (text) {
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', '');
      ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(ta);
      done(ok);
    };
    copyBtn.addEventListener('click', function () {
      var text = copyBtn.dataset.copy;
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(function () { done(true); }, function () { fallback(text); });
      } else { fallback(text); }
    });
  }

  /* ---------- Ano no rodapé ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();
})();
