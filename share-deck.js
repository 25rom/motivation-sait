/*
 * Pranaway — кнопка «Поделиться» на странице колоды (sostoyaniya.html).
 *
 * Подключение: перед </body> на sostoyaniya.html добавить
 *   <script src="share-deck.js" defer></script>
 *
 * Кнопка сама появляется на открытом состоянии и делится ссылкой s/<slug>.html
 * (у неё есть превью карты). QR на картах ведут на sostoyaniya.html#slug и не меняются.
 *
 * На телефоне — системное окно «Поделиться» (Telegram, WhatsApp, VK, Instagram и всё,
 * что установлено). На компьютере — маленькое меню: Telegram, WhatsApp, VK, Facebook,
 * X и «Скопировать ссылку».
 *
 * Про Instagram: у него нет ссылки для шеринга из веба (ни у одной соцсети её для IG нет).
 * Поделиться в Instagram можно только через системное окно на телефоне (истории), поэтому
 * отдельной кнопки IG на компьютере быть не может — это ограничение самого Instagram.
 */
(function () {
  'use strict';

  var SLUG = /^[A-Za-z0-9_-]{1,64}$/;
  var BRAND = 'Колода состояний Pranaway';

  function shareUrl(slug) {
    return new URL('s/' + slug + '.html', location.href).href; // .../motivation-sait/s/<slug>.html
  }

  function currentSlug() {
    var q = new URLSearchParams(location.search).get('s');
    var h = decodeURIComponent(location.hash.replace(/^#/, ''));
    var slug = (q || h || '').trim().toLowerCase();
    return SLUG.test(slug) ? slug : '';
  }

  function networks(url, text) {
    var U = encodeURIComponent(url);
    var T = encodeURIComponent(text);
    var TU = encodeURIComponent(text + ' ' + url);
    return [
      { key: 'telegram', label: 'Telegram', color: '#2AABEE',
        href: 'https://t.me/share/url?url=' + U + '&text=' + T,
        icon: '<path d="M22 3 2 10.5l5.5 2L18 6l-8 8 8.5 5L22 3Z"/>' },
      { key: 'whatsapp', label: 'WhatsApp', color: '#25D366',
        href: 'https://api.whatsapp.com/send?text=' + TU,
        icon: '<path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3Z"/><path d="M8.5 8.5c1 2.5 2.5 4 5 5"/>' },
      { key: 'vk', label: 'VK', color: '#0077FF',
        href: 'https://vk.com/share.php?url=' + U,
        icon: '<path d="M4 8h3c.4 3 1.6 5 3 5V8h3v3.5c.2 1.4 1.6-1 2.5-3.5h3c-1 2.5-2.5 4-2.5 4s1.7 1.4 2.7 4h-3c-.8-2-2-3-2.7-3V20h-1C7 20 4 14 4 8Z"/>' },
      { key: 'facebook', label: 'Facebook', color: '#1877F2',
        href: 'https://www.facebook.com/sharer/sharer.php?u=' + U,
        icon: '<path d="M14 8h2V5h-2c-1.7 0-3 1.3-3 3v2H9v3h2v6h3v-6h2l1-3h-3V8Z"/>' },
      { key: 'twitter', label: 'X (Twitter)', color: '#111111',
        href: 'https://twitter.com/intent/tweet?url=' + U + '&text=' + T,
        icon: '<path d="M4 3h4l12 18h-4L4 3Z"/><path d="M20 3 4 21"/>' }
    ];
  }

  function svg(inner) {
    return '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" ' +
      'stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + inner + '</svg>';
  }

  function ensureStyle() {
    if (document.getElementById('share-state-style')) return;
    var css =
      '.share-state-btn{display:inline-flex;align-items:center;justify-content:center;' +
      'margin-left:12px;padding:18px 34px;border-radius:100px;border:1px solid rgba(0,0,0,.14);' +
      'background:transparent;color:inherit;font:inherit;font-weight:600;cursor:pointer;transition:.25s;vertical-align:middle}' +
      '.share-state-btn:hover{transform:translateY(-2px);box-shadow:0 8px 18px rgba(45,40,30,.12)}' +
      '.share-state-btn:focus-visible{outline:2px solid #C9962E;outline-offset:3px}' +
      '.share-pop-backdrop{position:fixed;inset:0;z-index:998;background:transparent}' +
      '.share-pop{position:fixed;z-index:999;background:#fff;border:1px solid #EAE3D6;border-radius:16px;' +
      'box-shadow:0 18px 48px rgba(45,40,30,.18);padding:8px;min-width:230px;font:400 15px/1.3 Inter,system-ui,sans-serif}' +
      '.share-pop button{display:flex;align-items:center;gap:12px;width:100%;padding:11px 12px;border:0;border-radius:10px;' +
      'background:transparent;color:#2D2D2D;font:inherit;text-align:left;cursor:pointer}' +
      '.share-pop button:hover{background:#F7F2E9}' +
      '.share-pop .net{width:34px;height:34px;border-radius:9px;display:grid;place-items:center;color:#fff;flex:0 0 auto}' +
      '.share-pop .copy .net{background:#C9962E}' +
      '.share-pop hr{border:0;border-top:1px solid #EFE9DE;margin:6px 4px}' +
      '@media (max-width:520px){.share-state-btn{margin:12px 0 0}}';
    var s = document.createElement('style');
    s.id = 'share-state-style';
    s.textContent = css;
    document.head.appendChild(s);
  }

  function copy(url, done) {
    var fallback = function () { window.prompt('Ссылка на состояние', url); };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(url).then(done, fallback);
    } else {
      fallback();
    }
  }

  function closePopover() {
    var p = document.getElementById('share-pop');
    var b = document.getElementById('share-pop-backdrop');
    if (p) p.remove();
    if (b) b.remove();
    document.removeEventListener('keydown', onEsc);
  }
  function onEsc(e) { if (e.key === 'Escape') closePopover(); }

  function openPopover(anchor, url, text) {
    closePopover();
    var back = document.createElement('div');
    back.id = 'share-pop-backdrop';
    back.className = 'share-pop-backdrop';
    back.addEventListener('click', closePopover);

    var pop = document.createElement('div');
    pop.id = 'share-pop';
    pop.className = 'share-pop';
    pop.setAttribute('role', 'menu');

    networks(url, text).forEach(function (n) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('role', 'menuitem');
      b.innerHTML = '<span class="net" style="background:' + n.color + '">' + svg(n.icon) + '</span>' + n.label;
      b.addEventListener('click', function () {
        window.open(n.href, '_blank', 'noopener,width=640,height=680');
        closePopover();
      });
      pop.appendChild(b);
    });

    pop.appendChild(document.createElement('hr'));
    var copyBtn = document.createElement('button');
    copyBtn.type = 'button';
    copyBtn.className = 'copy';
    copyBtn.setAttribute('role', 'menuitem');
    copyBtn.innerHTML = '<span class="net">' +
      svg('<path d="M9 9h10v10H9z"/><path d="M5 15V5h10"/>') + '</span><span class="lbl">Скопировать ссылку</span>';
    copyBtn.addEventListener('click', function () {
      copy(url, function () { copyBtn.querySelector('.lbl').textContent = 'Ссылка скопирована'; setTimeout(closePopover, 900); });
    });
    pop.appendChild(copyBtn);

    document.body.appendChild(back);
    document.body.appendChild(pop);

    var r = anchor.getBoundingClientRect();
    var pr = pop.getBoundingClientRect();
    var top = r.bottom + 10;
    if (top + pr.height > window.innerHeight - 8) top = Math.max(8, r.top - pr.height - 10);
    var left = Math.min(Math.max(8, r.left), window.innerWidth - pr.width - 8);
    pop.style.top = top + 'px';
    pop.style.left = left + 'px';
    document.addEventListener('keydown', onEsc);
  }

  function onClick(e) {
    e.preventDefault();
    var btn = e.currentTarget;
    var slug = btn.getAttribute('data-slug');
    var url = shareUrl(slug);
    var title = btn.getAttribute('data-title') || 'Pranaway';
    var text = '«' + title + '» — ' + BRAND;
    if (navigator.share) {
      navigator.share({ title: title, text: text, url: url }).catch(function (err) {
        if (!err || err.name !== 'AbortError') openPopover(btn, url, text);
      });
    } else {
      openPopover(btn, url, text);
    }
  }

  function makeButton(slug, title) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'share-state-btn';
    b.setAttribute('data-slug', slug);
    b.setAttribute('data-title', title);
    b.setAttribute('aria-haspopup', 'menu');
    b.setAttribute('aria-label', 'Поделиться этим состоянием');
    b.innerHTML = svg('<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>' +
      '<line x1="8.6" y1="10.5" x2="15.4" y2="6.5"/><line x1="8.6" y1="13.5" x2="15.4" y2="17.5"/>') +
      '<span style="margin-left:8px">Поделиться</span>';
    b.addEventListener('click', onClick);
    return b;
  }

  function inject() {
    var slug = currentSlug();
    if (!slug) { closePopover(); return; }
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
    new MutationObserver(function () { inject(); }).observe(content, { childList: true, subtree: true });
    window.addEventListener('hashchange', function () { closePopover(); inject(); });
    window.addEventListener('resize', closePopover);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
