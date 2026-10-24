/* Teacher Patrícia · Tema do mês
   Aplica uma camada decorativa discreta conforme o mês do ano.
   - Pré-visualizar: ?mes=1 a ?mes=12 (ex.: index.html?mes=3)
   - Forçar ligado/desligado: ?tema=on | ?tema=off
   Roda antes do main.js (que usa window.TP_SEASON para as frases do dia). */
(function () {
  'use strict';

  var THEMES = [
    {
      key: 'ano-novo', name: 'Ano Novo', icon: '🎆', color: '#D4A017', corner: null,
      items: ['✨', '🎇', '✨', '🥂', '✨'], greeting: 'Happy New Year!',
      phrases: [['New year, new goals.', 'Ano novo, novas metas.'], ['Let’s set our goals for the year.', 'Vamos definir nossas metas para o ano.']]
    },
    {
      key: 'carnaval', name: 'Carnaval', icon: '🎭', color: '#9B5DE5', corner: null,
      items: ['🎉', '🎊', '🎶', '🎭', '🎊'], greeting: 'Let’s celebrate!',
      phrases: [['Let’s celebrate!', 'Vamos comemorar!'], ['It’s time to have fun.', 'É hora de se divertir.']]
    },
    {
      key: 'saint-patrick', name: 'St. Patrick’s Day', icon: '☘️', color: '#2E9E5B', corner: '🍀',
      items: ['☘️', '🍀', '☘️', '🌈', '☘️'], greeting: 'Happy St. Patrick’s Day!',
      phrases: [['Wishing you the luck of the Irish.', 'Desejo a você a sorte dos irlandeses.'], ['Sláinte! Cheers to a great week.', 'Sláinte! Um brinde a uma ótima semana.']]
    },
    {
      key: 'pascoa', name: 'Páscoa', icon: '🐰', color: '#E08FB5', corner: null,
      items: ['🥚', '🐣', '🌷', '🥚', '🐰'], greeting: 'Happy Easter!',
      phrases: [['Happy Easter!', 'Feliz Páscoa!'], ['Hop to it!', 'Mãos à obra!']]
    },
    {
      key: 'dia-das-maes', name: 'Dia das Mães', icon: '💐', color: '#E26D8C', corner: null,
      items: ['🌸', '💐', '💗', '🌷', '🌸'], greeting: 'Happy Mother’s Day!',
      phrases: [['Mom knows best.', 'Mãe sabe o que é melhor.'], ['Happy Mother’s Day!', 'Feliz Dia das Mães!']]
    },
    {
      key: 'festa-junina', name: 'Festa Junina', icon: '🌽', color: '#D9822B', corner: null,
      items: ['🌽', '🔥', '🏮', '🌽', '🎈'], greeting: 'Happy Festa Junina!',
      phrases: [['It’s party time!', 'É hora da festa!'], ['Pass the corn, please.', 'Passe o milho, por favor.']]
    },
    {
      key: 'ferias', name: 'Férias de inverno', icon: '❄️', color: '#5BA8E0', corner: null,
      items: ['❄️', '☃️', '❄️', '☕', '❄️'], greeting: 'Enjoy your break!',
      phrases: [['Time to recharge.', 'Hora de recarregar as energias.'], ['I’m in vacation mode.', 'Estou em modo férias.']]
    },
    {
      key: 'dia-dos-pais', name: 'Dia dos Pais', icon: '👔', color: '#3F6FA8', corner: null,
      items: ['👔', '⭐', '🎩', '👔', '⭐'], greeting: 'Happy Father’s Day!',
      phrases: [['Like father, like son.', 'Tal pai, tal filho.'], ['Happy Father’s Day!', 'Feliz Dia dos Pais!']]
    },
    {
      key: 'primavera', name: 'Primavera', icon: '🌸', color: '#D77FA1', corner: null,
      items: ['🌸', '🦋', '🌼', '🌱', '🌸'], greeting: 'Happy Spring!',
      phrases: [['Spring into action.', 'Entre em ação com a energia da primavera.'], ['Everything is in bloom.', 'Tudo está florescendo.']]
    },
    {
      key: 'halloween', name: 'Halloween', icon: '🎃', color: '#F08A3C', corner: '🕸️',
      items: ['🦇', '🦇', '🎃', '🦇', '🕸️'], greeting: 'Happy Halloween!',
      phrases: [['It gives me the creeps.', 'Isso me dá arrepios.'], ['Trick or treat?', 'Doce ou travessura?']]
    },
    {
      key: 'black-friday', name: 'Black Friday', icon: '🏷️', color: '#C9A227', corner: null,
      items: ['🏷️', '⭐', '💥', '🏷️', '⭐'], greeting: 'Happy Black Friday!',
      phrases: [['It’s a steal!', 'É uma pechincha!'], ['That’s a great deal.', 'Isso é um ótimo negócio.']]
    },
    {
      key: 'natal', name: 'Natal', icon: '🎄', color: '#D6453D', corner: null,
      items: ['❄️', '⭐', '🎁', '❄️', '⭐'], greeting: 'Merry Christmas!',
      phrases: [['Season’s greetings!', 'Boas festas!'], ['Merry Christmas!', 'Feliz Natal!']]
    }
  ];

  var KEY = 'tp-season';
  var params = new URLSearchParams(window.location.search);
  var month = new Date().getMonth();
  var q = parseInt(params.get('mes'), 10);
  if (q >= 1 && q <= 12) month = q - 1;
  var s = THEMES[month];

  var forced = params.get('tema');
  var stored = null;
  try { stored = localStorage.getItem(KEY); } catch (e) { }
  var on = forced === 'on' ? true : forced === 'off' ? false : stored !== 'off';

  window.TP_SEASON = { on: on, key: s.key, name: s.name, phrases: s.phrases };
  var root = document.documentElement;
  root.style.setProperty('--season', s.color);

  function persist(value) {
    try { localStorage.setItem(KEY, value); } catch (e) { }
    var u = new URL(window.location.href);
    u.searchParams.delete('tema');
    window.location.href = u.toString();
  }

  /* Botão no rodapé (sempre disponível, inclusive no celular) */
  var footer = document.querySelector('.footer');
  if (footer) {
    var p = document.createElement('p');
    p.className = 'season-foot';
    var b = document.createElement('button');
    b.type = 'button';
    b.textContent = on ? 'Tema do mês: ' + s.name + ' · Desativar' : 'Ativar tema do mês (' + s.name + ')';
    b.addEventListener('click', function () { persist(on ? 'off' : 'on'); });
    p.appendChild(b);
    footer.appendChild(p);
  }

  if (!on) return;
  root.classList.add('season-on');
  root.dataset.season = s.key;

  /* Camada decorativa (atrás do conteúdo) */
  var spots = [
    { l: '6%', t: 150, s: 30, r: -12, d: 0 }, { l: '47%', t: 118, s: 24, r: 10, d: 1.5 },
    { l: '90%', t: 200, s: 30, r: 14, d: 3 }, { l: '58%', t: 330, s: 22, r: -8, d: 2 },
    { l: '3%', t: 430, s: 26, r: 6, d: 4 }
  ];
  var layer = document.createElement('div');
  layer.className = 'season-layer';
  layer.setAttribute('aria-hidden', 'true');
  if (s.corner) {
    var c = document.createElement('span');
    c.className = 'season-item corner';
    c.textContent = s.corner;
    layer.appendChild(c);
  }
  spots.forEach(function (sp, i) {
    var el = document.createElement('span');
    el.className = 'season-item';
    el.textContent = s.items[i % s.items.length];
    el.style.cssText = 'left:' + sp.l + ';top:' + sp.t + 'px;font-size:' + sp.s + 'px;--r:' + sp.r + 'deg;--d:' + sp.d + 's';
    layer.appendChild(el);
  });
  document.body.insertBefore(layer, document.body.firstChild);

  /* Selo ao lado da etiqueta do hero */
  var tag = document.querySelector('.hero-text .tag');
  if (tag) {
    var chip = document.createElement('span');
    chip.className = 'season-chip';
    chip.textContent = s.icon + ' ' + s.name;
    tag.insertAdjacentElement('afterend', chip);
  }

  /* Botão no menu para desligar o tema */
  var theme = document.getElementById('theme');
  if (theme) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'season-btn';
    btn.textContent = s.icon;
    btn.title = 'Tema do mês: ' + s.name + ' (clique para desativar)';
    btn.setAttribute('aria-label', 'Tema do mês: ' + s.name + '. Clique para desativar');
    btn.addEventListener('click', function () { persist('off'); });
    theme.parentNode.insertBefore(btn, theme);
  }

  /* Saudação no chat do notebook */
  var m3 = document.querySelector('.chat .msg:nth-child(3)');
  if (m3) m3.textContent = s.greeting + ' ' + s.icon;
})();
