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

  /* ---------- Formulário de interesse (entrevistas) ---------- */
  var dlg = document.getElementById('interest-dialog');
  if (dlg) {
    var form = document.getElementById('interest-form');
    var err = document.getElementById('interest-error');
    var WA = '5551989406926';
    var ok = document.getElementById('interest-ok');
    var head = dlg.querySelectorAll('.dlg-sub');

    var reset = function () {
      form.reset(); form.hidden = false; ok.hidden = true;
      head.forEach(function (p) { p.hidden = false; });
      err.hidden = true;
      form.querySelectorAll('.invalid').forEach(function (el) { el.classList.remove('invalid'); });
    };
    var open = function () {
      reset();
      if (typeof dlg.showModal === 'function') { dlg.showModal(); } else { dlg.setAttribute('open', ''); }
      var first = dlg.querySelector('input'); if (first) first.focus();
    };
    var close = function () {
      if (typeof dlg.close === 'function') { dlg.close(); } else { dlg.removeAttribute('open'); }
    };
    document.querySelectorAll('[data-open-dialog]').forEach(function (b) {
      b.addEventListener('click', open);
    });
    dlg.addEventListener('click', function (e) {
      if (e.target === dlg || e.target.hasAttribute('data-close-dialog')) close();
    });

    var val = function (id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; };
    var message = function () {
      var lines = ['Olá, Patrícia! Tenho interesse no treinamento para entrevistas de emprego em inglês.', ''];
      lines.push('Nome: ' + val('f-nome'));
      lines.push('WhatsApp: ' + val('f-whats'));
      if (val('f-email')) lines.push('E-mail: ' + val('f-email'));
      if (val('f-nivel')) lines.push('Nível de inglês: ' + val('f-nivel'));
      if (val('f-area')) lines.push('Área/vaga: ' + val('f-area'));
      if (val('f-msg')) lines.push('', val('f-msg'));
      return lines.join('\n');
    };
    var valid = function () {
      var ok = true, msg = '';
      ['f-nome', 'f-whats'].forEach(function (id) {
        var el = document.getElementById(id);
        var bad = !el.value.trim();
        el.classList.toggle('invalid', bad);
        if (bad) ok = false;
      });
      if (!ok) msg = 'Preencha o nome e o WhatsApp para continuar.';
      var em = document.getElementById('f-email');
      if (ok && em.value.trim() && !em.checkValidity()) { ok = false; msg = 'Confira o e-mail digitado.'; em.classList.add('invalid'); }
      else em.classList.remove('invalid');
      err.hidden = ok; err.textContent = msg;
      return ok;
    };
    var done = function (canal) {
      document.getElementById('interest-canal').textContent = canal;
      form.hidden = true; ok.hidden = false;
      head.forEach(function (p) { p.hidden = true; });
    };
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!valid()) return;
      window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(message()), '_blank', 'noopener');
      done('WhatsApp');
    });
  }

  /* ---------- Carrossel de depoimentos ---------- */
  var car = document.querySelector('.carousel');
  if (car) {
    var viewport = car.querySelector('.car-viewport');
    var cards = Array.prototype.slice.call(car.querySelectorAll('.rcard'));
    var dotsBox = car.querySelector('.car-dots');
    var pauseBtn = car.querySelector('.car-pause');
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var current = 0, userPaused = false, hovering = false;

    var dots = cards.map(function (_, i) {
      var d = document.createElement('button');
      d.type = 'button'; d.className = 'car-dot';
      d.setAttribute('aria-label', 'Ir para o depoimento ' + (i + 1));
      d.addEventListener('click', function () { go(i); });
      dotsBox.appendChild(d); return d;
    });

    function setActive(i) {
      current = i;
      cards.forEach(function (c, k) { c.classList.toggle('is-active', k === i); });
      dots.forEach(function (d, k) { d.setAttribute('aria-current', String(k === i)); });
    }
    function go(i) {
      var n = cards.length;
      i = (i + n) % n;
      var c = cards[i];
      viewport.scrollTo({ left: c.offsetLeft - (viewport.clientWidth - c.offsetWidth) / 2, behavior: reduced ? 'auto' : 'smooth' });
      setActive(i);
    }
    function nearest() {
      var mid = viewport.scrollLeft + viewport.clientWidth / 2, best = 0, bestD = Infinity;
      cards.forEach(function (c, k) {
        var d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid);
        if (d < bestD) { bestD = d; best = k; }
      });
      return best;
    }
    var ticking = false;
    viewport.addEventListener('scroll', function () {
      if (ticking) return; ticking = true;
      requestAnimationFrame(function () { ticking = false; var k = nearest(); if (k !== current) setActive(k); });
    }, { passive: true });

    car.querySelector('[data-car="prev"]').addEventListener('click', function () { go(current - 1); });
    car.querySelector('[data-car="next"]').addEventListener('click', function () { go(current + 1); });
    viewport.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(current + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(current - 1); }
    });

    car.addEventListener('mouseenter', function () { hovering = true; });
    car.addEventListener('mouseleave', function () { hovering = false; });
    car.addEventListener('focusin', function () { hovering = true; });
    car.addEventListener('focusout', function () { hovering = false; });
    car.addEventListener('touchstart', function () { hovering = true; }, { passive: true });
    car.addEventListener('touchend', function () { setTimeout(function () { hovering = false; }, 5000); }, { passive: true });

    if (pauseBtn) {
      pauseBtn.addEventListener('click', function () {
        userPaused = !userPaused;
        pauseBtn.textContent = userPaused ? 'Continuar' : 'Pausar';
        pauseBtn.setAttribute('aria-pressed', String(userPaused));
      });
    }
    if (!reduced) {
      setInterval(function () {
        if (userPaused || hovering || document.hidden) return;
        go(current + 1);
      }, 7000);
    }
    // posição inicial: primeiro depoimento em destaque, sem animação
    window.addEventListener('load', function () { viewport.scrollLeft = cards[0].offsetLeft - (viewport.clientWidth - cards[0].offsetWidth) / 2; setActive(0); });
    setActive(0);
  }

  /* ---------- Ano no rodapé ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();
})();
