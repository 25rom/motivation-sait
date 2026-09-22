#!/usr/bin/env node
/*
 * Pranaway — статические страницы состояний для поиска и нейросетей.
 *
 * ЗАПУСК: положи файл в папку motivation-sait (рядом с states.js) и выполни
 *         node build-pages.js
 *
 * ЧТО ДЕЛАЕТ
 *   • s/<slug>.html — по странице на каждое состояние. Текст уже в HTML,
 *     без JavaScript: его видят Яндекс, Google, нейросети и превью в мессенджерах.
 *   • sitemap.xml — список всех страниц для поисковиков.
 *   • sostoyaniya.html — обновляет только список ссылок между метками
 *     <!-- STATIC-INDEX:START --> и <!-- STATIC-INDEX:END --> (если метки есть).
 *
 * ЧЕГО НЕ ТРОГАЕТ
 *   states.js, symbols.js, share-deck.js, QR-адреса sostoyaniya.html#slug, бота.
 *   Если s/<slug>.html уже существует — картинка превью (og:image) переносится
 *   из старого файла в новый.
 *
 * ИСТОЧНИК ПРАВДЫ — по-прежнему states.js. Поменял текст → запусти скрипт снова.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = __dirname;
const SITE = 'https://www.pranaway.art/motivation-sait/';
const DECK = 'Набор состояний';           // название набора в текстах страниц
const DECK_SHORT = 'Набор';
const BOT = 'https://t.me/o_cardbot';
const BUY = 'https://t.me/neuro25';   // «Купить набор» — пока личный telegram
const OUT_DIR = path.join(ROOT, 's');

// ---------- данные ----------
function loadWindowVar(file, name) {
  const code = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const sandbox = { window: {}, document: {} };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: file });
  return sandbox.window[name] || [];
}
const STATES = loadWindowVar('states.js', 'PRANAWAY_STATES');
const SYMS = loadWindowVar('symbols.js', 'PRANAWAY_SYMBOLS');
if (!STATES.length) { console.error('Не найден states.js или он пуст.'); process.exit(1); }

// ---------- берём оформление и счётчики из действующей страницы ----------
const PAGE = fs.readFileSync(path.join(ROOT, 'sostoyaniya.html'), 'utf8');
const pick = (re) => { const m = PAGE.match(re); return m ? m[0] : ''; };
const CSS = (PAGE.match(/<style>([\s\S]*?)<\/style>/) || [, ''])[1];
const GA = pick(/<!-- Google tag[\s\S]*?<\/script>\s*<script>[\s\S]*?<\/script>/);
const YM = pick(/<!-- Yandex\.Metrika[\s\S]*?<\/noscript>/);
const FONTS = pick(/<link href="https:\/\/fonts\.googleapis\.com[^>]*>/);
const FOOTER = pick(/<footer>[\s\S]*?<\/footer>/);

// ---------- утилиты ----------
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const isFull = st => st.narrative && st.narrative.length > 0;
const symById = id => SYMS.find(s => s.id === id) || null;
const pageUrl = slug => SITE + 's/' + slug + '.html';

// тот же детерминированный выбор символов, что на sostoyaniya.html
function seededPick(slug, pool, n) {
  let h = 2166136261;
  for (let i = 0; i < slug.length; i++) { h ^= slug.charCodeAt(i); h = Math.imul(h, 16777619); }
  const rnd = () => { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return ((h >>> 0) / 4294967296); };
  const arr = pool.slice();
  for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); const t = arr[i]; arr[i] = arr[j]; arr[j] = t; }
  return arr.slice(0, n);
}
function stateSymbolsRow(st) {
  if (!SYMS.length) return '';
  const own = symById(st.slug);
  const others = SYMS.filter(s => s.id !== st.slug);
  const count = 3 + (st.slug.length % 2);
  const picked = seededPick(st.slug, others, own ? count - 1 : count);
  let html = '<div class="state-syms" aria-hidden="true">';
  if (own) html += '<span class="own" title="' + esc(own.name) + '">' + own.petro + '</span>';
  picked.forEach((s, i) => { html += '<span>' + (i % 2 ? s.alch : s.petro) + '</span>'; });
  return html + '</div>';
}

// описание для сниппета: первые предложения нарратива до ~160 знаков
function description(st) {
  const text = (st.narrative[0] || '').replace(/\s+/g, ' ').trim();
  if (text.length <= 160) return text;
  const sentences = text.match(/[^.!?…]+[.!?…]+/g) || [text];
  let out = '';
  for (const s of sentences) { if ((out + s).trim().length > 160) break; out += s; }
  out = out.trim();
  if (out.length >= 70) return out;
  const cut = text.slice(0, 157);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:—–-]\s*$/, '') + '…';
}

// перенос картинки превью из уже существующего s/<slug>.html
function existingImageTags(slug) {
  const f = path.join(OUT_DIR, slug + '.html');
  if (!fs.existsSync(f)) return '';
  const old = fs.readFileSync(f, 'utf8');
  const tags = old.match(/<meta[^>]+(?:property|name)=["'](?:og:image[^"']*|twitter:image[^"']*)["'][^>]*>/gi) || [];
  return tags.join('\n    ');
}

function deckList(activeSlug) {
  return STATES.map(st => {
    const own = symById(st.slug);
    const active = st.slug === activeSlug;
    return '<li><a href="' + st.slug + '.html"' + (active ? ' class="active" aria-current="page"' : '') + '>' +
      (own ? '<span class="tile-sym">' + own.petro + '</span>' : '') +
      '<span class="nm">' + esc(st.title) + '</span>' +
      (isFull(st) ? '<span class="full-dot" title="полный нарратив"></span>' : '') +
      '</a></li>';
  }).join('');
}

const HEADER =
  '<header>\n        <div class="container">\n            <nav class="top">\n' +
  '                <a href="../index.html" class="logo">pranaway</a>\n' +
  '                <div class="nav-links">\n' +
  '                    <a href="../about.html">О проекте</a>\n' +
  '                    <a href="../cases.html">Практика</a>\n' +
  '                    <a href="../sostoyaniya.html" class="active">Состояния</a>\n' +
  '                    <a href="../cases.html#bot">Бот</a>\n' +
  '                </div>\n            </nav>\n        </div>\n    </header>';

const SCRIPT =
  '<script>\n' +
  'function toggleOverlay(open){var ov=document.getElementById("deckOverlay");ov.classList.toggle("open",open);ov.setAttribute("aria-hidden",open?"false":"true");document.body.style.overflow=open?"hidden":"";}\n' +
  'document.getElementById("deckChevron").addEventListener("click",function(){var n=document.getElementById("deckNav");var o=!n.classList.contains("open");n.classList.toggle("open",o);this.setAttribute("aria-expanded",o?"true":"false");});\n' +
  '(function(){var a=document.querySelector("#deckList a.active");if(a&&a.offsetParent)a.scrollIntoView({block:"nearest"});})();\n' +
  '</script>';

// ---------- страница состояния ----------
function renderPage(st, i) {
  const N = STATES.length;
  const prev = STATES[(i - 1 + N) % N];
  const next = STATES[(i + 1) % N];
  const num = String(i + 1).padStart(2, '0');
  const url = pageUrl(st.slug);
  const desc = description(st);
  const img = existingImageTags(st.slug);
  const ld = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: st.title,
    description: desc,
    url: url,
    inDefinedTermSet: { '@type': 'DefinedTermSet', name: DECK + ' Pranaway', url: SITE + 'sostoyaniya.html' }
  }).replace(/</g, '\\u003c');

  const body = isFull(st)
    ? '<div class="narrative">' + st.narrative.map(p => '<p>' + esc(p) + '</p>').join('') + '</div>'
    : '<div class="loading-note">Текст готовится.</div>';

  return `<!DOCTYPE html>
<html lang="ru">
<head>
    ${GA}
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${esc(st.title)}: что это такое — Pranaway</title>
    <meta name="description" content="${esc(desc)}">
    <link rel="canonical" href="${url}">
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="Pranaway">
    <meta property="og:locale" content="ru_RU">
    <meta property="og:title" content="${esc(st.title)} — ${DECK}">
    <meta property="og:description" content="${esc(desc)}">
    <meta property="og:url" content="${url}">
    ${img}
    <meta name="twitter:card" content="${img ? 'summary_large_image' : 'summary'}">
    ${FONTS}
    ${YM}
    <style>${CSS}
        /* статическая версия: список набора сразу раскрыт */
        .deck-list a .full-dot { flex-shrink: 0; }
    </style>
    <script type="application/ld+json">${ld}</script>
</head>
<body>
    ${HEADER}

    <div class="mobile-bar" id="mobileBar">
        <span class="current">${esc(st.title)}</span>
        <button type="button" onclick="toggleOverlay(true)">${DECK_SHORT} · ${N}</button>
    </div>

    <div class="deck-overlay" id="deckOverlay" aria-hidden="true">
        <div class="overlay-head">
            <span class="overlay-title">${DECK}</span>
            <button class="overlay-close" type="button" onclick="toggleOverlay(false)" aria-label="Закрыть">✕</button>
        </div>
        <ul class="deck-list">${deckList(st.slug)}</ul>
    </div>

    <div class="container">
        <div class="layout">
            <aside class="deck-nav open" id="deckNav" aria-label="${DECK}">
                <div class="deck-head">
                    <a href="../sostoyaniya.html" class="deck-home">${DECK}</a>
                    <button class="deck-chevron" id="deckChevron" type="button" aria-expanded="true" aria-controls="deckList" aria-label="Свернуть список состояний">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                    </button>
                </div>
                <ul class="deck-list" id="deckList">${deckList(st.slug)}</ul>
                <a href="${BUY}" class="cta-btn">Купить набор</a>
                <a href="${BOT}" class="deck-try">одна карта в день в telegram</a>
            </aside>

            <main id="content">
                <article class="state-article">
                    <div class="eyebrow">${DECK} · ${num} / ${N}</div>
                    <h1>${esc(st.title)}</h1>
                    ${stateSymbolsRow(st)}
                    ${body}
                    <div class="state-actions">
                        <a href="${BUY}" class="cta-btn">Купить набор</a>
                        <div class="hint">Сначала попробовать — <a href="${BOT}">одна карта в день в telegram</a></div>
                    </div>
                    <nav class="state-footer-nav">
                        <a href="${prev.slug}.html"><span class="dir">← Предыдущее</span>${esc(prev.title)}</a>
                        <a href="${next.slug}.html" class="next"><span class="dir">Следующее →</span>${esc(next.title)}</a>
                    </nav>
                </article>
            </main>
        </div>
    </div>

    ${FOOTER}

    ${SCRIPT}
    <script src="../share-deck.js" defer></script>
</body>
</html>
`;
}

// ---------- сборка ----------
fs.mkdirSync(OUT_DIR, { recursive: true });
let kept = 0;
STATES.forEach((st, i) => {
  if (existingImageTags(st.slug)) kept++;
  fs.writeFileSync(path.join(OUT_DIR, st.slug + '.html'), renderPage(st, i), 'utf8');
});

// sitemap.xml
const today = new Date().toISOString().slice(0, 10);
const urls = ['index.html', 'about.html', 'cases.html', 'sostoyaniya.html']
  .map(f => SITE + f)
  .concat(STATES.map(st => pageUrl(st.slug)));
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'),
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.map(u => '  <url><loc>' + u + '</loc><lastmod>' + today + '</lastmod></url>').join('\n') +
  '\n</urlset>\n', 'utf8');

// список ссылок внутри sostoyaniya.html (между метками)
const START = '<!-- STATIC-INDEX:START -->', END = '<!-- STATIC-INDEX:END -->';
let indexNote = 'меток нет — sostoyaniya.html не изменён';
if (PAGE.includes(START) && PAGE.includes(END)) {
  const list = '\n                <div class="static-index">\n                    <h1>' + DECK + '</h1>\n                    <ul>\n' +
    STATES.map(st => '                        <li><a href="s/' + st.slug + '.html">' + esc(st.title) + '</a></li>').join('\n') +
    '\n                    </ul>\n                </div>\n                ';
  const updated = PAGE.replace(new RegExp(START + '[\\s\\S]*?' + END), START + list + END);
  if (updated !== PAGE) { fs.writeFileSync(path.join(ROOT, 'sostoyaniya.html'), updated, 'utf8'); indexNote = 'список ссылок обновлён'; }
  else indexNote = 'список ссылок без изменений';
}

console.log('Готово.');
console.log('  s/*.html:        ' + STATES.length + ' стр. (картинка превью перенесена у ' + kept + ')');
console.log('  sitemap.xml:     ' + urls.length + ' адресов');
console.log('  sostoyaniya.html: ' + indexNote);
