/*
 * Pranaway — кнопка «Поделиться» на странице колоды (sostoyaniya.html).
 *
 * Подключение: перед </body> на sostoyaniya.html добавить
 *   <script src="share-deck.js" defer></script>
 * Больше ничего править не нужно — кнопка сама появляется на открытом состоянии
 * и делится ссылкой s/<slug>.html (у неё есть превью карты).
 * QR на картах ведут на sostoyaniya.html#slug и не меняются.
 */
(function () {
  'use strict';

  var SLUG = /^[A-Za-z0-9_-]{1,64}$/;

  // адрес страницы-превью строится от текущей страницы: .../motivation-sait/s/<slug>.html
  function shareUrl(slug) {
    return new URL('s/' + slug + '.html', location.href).href;
  }

  function currentSlug() {
    var q = new URLSearchParams(location.search).get('s');
    var h = decodeURIComponent(location.hash.replace(/^#/, ''));
    var slug = (q || h || '').trim().toLowerCase();
    return SLUG.test(slug) ? slug : '';
  }

  function flash(btn, text) {
    if (btn._html == null) btn._html = btn.innerHTML;
    btn.textContent = text;
    clearTimeout(btn._t);
    btn._t = setTimeout(function () { btn.innerHTML = btn._html; btn._html = null; }, 1800);
  }

  function copy(btn, url) {
    var fallback = function () { window.prompt('Ссылка на состояние', url); };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(url).then(function () { flash(btn, 'Ссылка скопирована'); }, fallback);
    } else {
      fallback();
    }
  }

  function onClick(e) {
    e.preventDefault();
    var btn = e.currentTarget;
    var slug = btn.getAttribute('data-slug');
    var url = shareUrl(slug);
    var title = btn.getAttribute('data-title') || 'Pranaway';
    if (navigator.share) {
      navigator.share({ title: title, url: url }).catch(function (err) {
        if (!err || err.name !== 'AbortError') copy(btn, url);
      });
    } else {
      copy(btn, url);
    }
  }

  function makeButton(slug, title) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'share-state-btn';
    b.setAttribute('data-slug', slug);
    b.setAttribute('data-title', title);
    b.setAttribute('aria-label', 'Поделиться этим состоянием');
    b.innerHTML =
      '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" ' +
      'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ' +
      'style="vertical-align:-3px;margin-right:8px"><circle cx="18" cy="5" r="3"/>' +
      '<circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>' +
      '<line x1="8.6" y1="10.5" x2="15.4" y2="6.5"/><line x1="8.6" y1="13.5" x2="15.4" y2="17.5"/></svg>' +
      'Поделиться';
    b.addEventListener('click', onClick);
    return b;
  }

  // единожды добавляем стиль кнопки (пилюля в духе колоды, вторичная к .cta-btn)
  function ensureStyle() {
    if (document.getElementById('share-state-style')) return;
    var css =
      '.share-state-btn{display:inline-flex;align-items:center;justify-content:center;' +
      'margin-left:12px;padding:18px 34px;border-radius:100px;border:1px solid rgba(0,0,0,.14);' +
      'background:transparent;color:inherit;font:inherit;font-weight:600;cursor:pointer;' +
      'transition:.25s;vertical-align:middle}' +
      '.share-state-btn:hover{transform:translateY(-2px);box-shadow:0 8px 18px rgba(45,40,30,.12)}' +
      '.share-state-btn:focus-visible{outline:2px solid #C9962E;outline-offset:3px}' +
      '@media (max-width:520px){.share-state-btn{margin:12px 0 0;width:auto}}';
    var s = document.createElement('style');
    s.id = 'share-state-style';
    s.textContent = css;
    document.head.appendChild(s);
  }

  // после каждого рендера состояния добавляем кнопку в .state-actions
  function inject() {
    var slug = currentSlug();
    if (!slug) return;
    var actions = document.querySelector('.state-actions');
    if (!actions || actions.querySelector('.share-state-btn')) return;
    var h1 = document.querySelector('.state-article h1');
    var title = h1 ? h1.textContent.trim() : 'Pranaway';
    ensureStyle();
    var cta = actions.querySelector('.cta-btn');
    var btn = makeButton(slug, title);
    if (cta && cta.parentNode === actions) cta.insertAdjacentElement('afterend', btn);
    else actions.appendChild(btn);
  }

  function start() {
    inject();
    var content = document.getElementById('content') || document.body;
    // колода перерисовывает состояние при навигации — следим и добавляем кнопку снова
    new MutationObserver(function () { inject(); }).observe(content, { childList: true, subtree: true });
    window.addEventListener('hashchange', inject);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
