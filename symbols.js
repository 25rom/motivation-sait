// База сайта определяется автоматически по адресу этого файла —
// куда бы ни был выложен states.js, ссылки бота попадут в ту же папку.
try { if (document.currentScript && document.currentScript.src) window.PRANAWAY_BASE = document.currentScript.src.replace(/[^/]+\.js(\?.*)?$/, ''); } catch(e) {}

/* ============================================================
   PRANAWAY · БИБЛИОТЕКА СИМВОЛОВ · symbols.js
   ------------------------------------------------------------
   35 понятий, у каждого два языка формы:
   petro — петроглиф (плотный штрих), alch — алхимия (тонкий).
   Цвет наследуется через CSS (currentColor).
   Подключается страницами сайта и веб-приложением бота.
   ============================================================ */

window.PRANAWAY_SYMBOLS = [
 {
  id: 'uporstvo',
  name: 'Упорство',
  petro: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="29" cy="30" r="11"/><circle cx="43" cy="42" r="11"/></svg>',
  alch: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="24" y="24" width="24" height="24"/><line x1="36" y1="14" x2="36" y2="24"/><line x1="36" y1="48" x2="36" y2="58"/></svg>'
 },
 {
  id: 'ustoychivost',
  name: 'Устойчивость',
  petro: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M14 54 L36 18 L58 54 Z"/><line x1="22" y1="42" x2="50" y2="42"/></svg>',
  alch: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="22" y="22" width="28" height="28"/><path d="M30 22 L38 14 L58 14 L50 22"/><path d="M50 22 L50 50 L58 42 L58 14"/></svg>'
 },
 {
  id: 'vyderzka',
  name: 'Выдержка',
  petro: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16 L50 16 L34 38 L50 60 L22 60 L38 38 Z"/></svg>',
  alch: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M22 18 Q36 30 50 18"/><path d="M22 54 Q36 42 50 54"/><line x1="36" y1="30" x2="36" y2="42"/></svg>'
 },
 {
  id: 'terpenie',
  name: 'Терпение',
  petro: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="36" y1="34" x2="36" y2="58"/><path d="M36 34 Q26 26 28 16 Q38 20 36 34"/><line x1="20" y1="58" x2="52" y2="58"/></svg>',
  alch: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M36 16 C50 34 50 52 36 58 C22 52 22 34 36 16 Z"/></svg>'
 },
 {
  id: 'reshimost',
  name: 'Решимость',
  petro: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="36" y1="58" x2="36" y2="18"/><path d="M26 28 L36 16 L46 28"/></svg>',
  alch: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="36" cy="44" r="12"/><line x1="36" y1="32" x2="36" y2="14"/><line x1="28" y1="20" x2="44" y2="20"/></svg>'
 },
 {
  id: 'userdie',
  name: 'Усердие',
  petro: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="20" y1="24" x2="34" y2="24"/><line x1="20" y1="36" x2="40" y2="36"/><line x1="20" y1="48" x2="34" y2="48"/><line x1="48" y1="20" x2="48" y2="52"/></svg>',
  alch: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M36 20 L44 30 L36 30 L44 40 L36 40 L44 50"/><circle cx="36" cy="18" r="3"/></svg>'
 },
 {
  id: 'igrivost',
  name: 'Игривость',
  petro: '<svg aria-hidden="true" viewBox="0 0 72 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M10 44 Q22 18 36 40 Q50 62 62 36"/><circle cx="22" cy="22" r="2.4" fill="#94652b"/><circle cx="62" cy="34" r="2.4" fill="#94652b"/></svg>',
  alch: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M36 36 C42 36 42 28 36 28 C27 28 27 44 38 44 C52 44 52 22 36 22 C16 22 16 50 38 50"/></svg>'
 },
 {
  id: 'lyboznatelnost',
  name: 'Любознательность',
  petro: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 54 Q22 30 44 30 Q56 30 50 42 Q46 50 38 46"/><circle cx="36" cy="58" r="2.4" fill="#94652b"/></svg>',
  alch: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="32" cy="32" r="13"/><line x1="42" y1="42" x2="56" y2="56"/><line x1="32" y1="26" x2="32" y2="34" opacity="0.6"/></svg>'
 },
 {
  id: 'uverennost',
  name: 'Уверенность',
  petro: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="36" y1="18" x2="36" y2="54"/><line x1="26" y1="54" x2="46" y2="54"/><line x1="29" y1="22" x2="43" y2="22"/></svg>',
  alch: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="36" cy="36" r="16"/><circle cx="36" cy="36" r="2.6" fill="#A6843C" stroke="none"/></svg>'
 },
 {
  id: 'celeystremlennost',
  name: 'Целеустремлённость',
  petro: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="14" y1="36" x2="50" y2="36"/><path d="M40 26 L52 36 L40 46"/><circle cx="58" cy="36" r="3"/></svg>',
  alch: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="36" cy="36" r="18"/><circle cx="36" cy="36" r="9"/><circle cx="36" cy="36" r="2" fill="#A6843C" stroke="none"/></svg>'
 },
 {
  id: 'smelost',
  name: 'Смелость',
  petro: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M36 58 Q22 46 30 30 Q34 38 38 32 Q44 22 36 14 Q52 24 48 44 Q46 54 36 58 Z"/></svg>',
  alch: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M22 28 L50 28 L36 52 Z"/><line x1="36" y1="14" x2="36" y2="28"/></svg>'
 },
 {
  id: 'tvorchestvo',
  name: 'Творчество',
  petro: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="36" y1="14" x2="36" y2="58"/><line x1="14" y1="36" x2="58" y2="36"/><line x1="21" y1="21" x2="51" y2="51"/><line x1="51" y1="21" x2="21" y2="51"/></svg>',
  alch: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="36" cy="26" r="11"/><line x1="36" y1="37" x2="36" y2="58"/><line x1="27" y1="48" x2="45" y2="48"/></svg>'
 },
 {
  id: 'volya',
  name: 'Воля',
  petro: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M36 60 Q24 48 32 32 Q35 40 38 34 Q44 22 36 12 Q50 24 46 46 Q44 56 36 60 Z"/></svg>',
  alch: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M22 30 L50 30 L36 54 Z"/></svg>'
 },
 {
  id: 'proyavlennost',
  name: 'Проявленность',
  petro: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="52" x2="54" y2="52"/><line x1="36" y1="52" x2="36" y2="22"/><path d="M27 31 L36 20 L45 31"/></svg>',
  alch: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M22 30 L50 30 L36 54 Z"/><line x1="28" y1="40" x2="44" y2="40"/></svg>'
 },
 {
  id: 'blagodarnost',
  name: 'Благодарность',
  petro: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M22 30 Q24 48 36 48"/><path d="M50 30 Q48 48 36 48"/><circle cx="36" cy="22" r="2.6" fill="#94652b"/></svg>',
  alch: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M36 52 C20 41 23 24 36 31 C49 24 52 41 36 52 Z"/></svg>'
 },
 {
  id: 'sochustvie',
  name: 'Сочувствие',
  petro: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M28 24 C24 34 28 42 28 50"/><path d="M44 24 C48 34 44 42 44 50"/><path d="M28 50 Q36 56 44 50"/></svg>',
  alch: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M28 18 C20 36 36 36 28 54"/><path d="M44 18 C36 36 52 36 44 54"/></svg>'
 },
 {
  id: 'iskrennost',
  name: 'Искренность',
  petro: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="36" cy="36" r="18"/><line x1="36" y1="20" x2="36" y2="52"/></svg>',
  alch: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M22 40 Q36 26 50 40"/><path d="M30 32 L36 18 L42 32"/></svg>'
 },
 {
  id: 'vnimatelnost',
  name: 'Внимательность',
  petro: '<svg aria-hidden="true" viewBox="0 0 72 56" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M14 30 Q36 14 58 30 Q36 46 14 30 Z"/><circle cx="36" cy="30" r="6"/></svg>',
  alch: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="36" cy="36" r="6"/><circle cx="36" cy="36" r="13"/><circle cx="36" cy="36" r="20"/></svg>'
 },
 {
  id: 'konsistentnost',
  name: 'Консистентность',
  petro: '<svg aria-hidden="true" viewBox="0 0 72 56" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M10 34 Q20 22 30 34 Q40 46 50 34 Q60 22 66 30"/></svg>',
  alch: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><line x1="20" y1="26" x2="52" y2="26"/><line x1="20" y1="36" x2="52" y2="36"/><line x1="20" y1="46" x2="52" y2="46"/></svg>'
 },
 {
  id: 'osoznannost',
  name: 'Осознанность',
  petro: '<svg aria-hidden="true" viewBox="0 0 72 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M16 36 Q36 22 56 36"/><path d="M16 36 Q36 50 56 36"/><circle cx="36" cy="36" r="3" fill="#94652b"/></svg>',
  alch: '<svg aria-hidden="true" viewBox="0 0 72 64" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M36 12 L56 50 L16 50 Z"/><path d="M26 40 Q36 33 46 40 Q36 47 26 40 Z"/><circle cx="36" cy="40" r="2" fill="#A6843C" stroke="none"/></svg>'
 },
 {
  id: 'nevozmutimost',
  name: 'Невозмутимость',
  petro: '<svg aria-hidden="true" viewBox="0 0 72 56" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="14" y1="34" x2="58" y2="34"/><path d="M22 24 Q36 18 50 24" opacity="0.6"/></svg>',
  alch: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="36" cy="36" r="18"/><line x1="20" y1="40" x2="52" y2="40"/></svg>'
 },
 {
  id: 'celostnost',
  name: 'Целостность',
  petro: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="36" cy="36" r="18"/><line x1="36" y1="18" x2="36" y2="54"/><line x1="18" y1="36" x2="54" y2="36"/></svg>',
  alch: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="36" cy="36" r="20"/><circle cx="36" cy="36" r="12"/><circle cx="36" cy="36" r="4"/></svg>'
 },
 {
  id: 'autentichnost',
  name: 'Аутентичность',
  petro: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M36 16 C44 24 44 30 36 30 C28 30 28 38 36 40 C46 42 46 52 36 56" opacity="0.95"/></svg>',
  alch: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="36" cy="36" r="18"/><path d="M28 30 Q36 44 44 30"/><circle cx="36" cy="36" r="2" fill="#A6843C" stroke="none"/></svg>'
 },
 {
  id: 'samobytnost',
  name: 'Самобытность',
  petro: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M22 50 Q30 18 40 40 Q46 52 54 26"/></svg>',
  alch: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><line x1="36" y1="16" x2="36" y2="56"/><line x1="19" y1="26" x2="53" y2="46"/><line x1="53" y1="26" x2="19" y2="46"/></svg>'
 },
 {
  id: 'estestvennost',
  name: 'Естественность',
  petro: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M36 58 C36 40 24 30 18 24 C34 26 36 36 36 36 C36 28 44 18 56 16 C50 30 44 40 36 58 Z"/></svg>',
  alch: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M36 56 Q30 40 36 24 Q42 40 36 56 Z"/><path d="M36 56 Q24 46 22 32 Q34 40 36 56"/></svg>'
 },
 {
  id: 'svoboda',
  name: 'Свобода',
  petro: '<svg aria-hidden="true" viewBox="0 0 72 52" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M8 34 Q24 12 36 32"/><path d="M64 34 Q48 12 36 32"/><circle cx="36" cy="35" r="2" fill="#94652b"/></svg>',
  alch: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="36" cy="20" r="5"/><path d="M20 52 Q36 31 52 52"/><line x1="36" y1="31" x2="36" y2="39"/></svg>'
 },
 {
  id: 'gibkost',
  name: 'Гибкость',
  petro: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M30 56 Q30 30 50 18"/><path d="M30 44 Q34 34 44 30" opacity="0.7"/></svg>',
  alch: '<svg aria-hidden="true" viewBox="0 0 72 56" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 36 Q28 14 36 32 Q44 50 60 28"/></svg>'
 },
 {
  id: 'soprichastnost',
  name: 'Сопричастность',
  petro: '<svg aria-hidden="true" viewBox="0 0 72 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="22" cy="30" r="9"/><circle cx="50" cy="30" r="9"/><circle cx="36" cy="46" r="9"/></svg>',
  alch: '<svg aria-hidden="true" viewBox="0 0 72 64" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="28" cy="32" r="14"/><circle cx="44" cy="32" r="14"/></svg>'
 },
 {
  id: 'zabota',
  name: 'Забота',
  petro: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 34 Q36 22 54 34"/><line x1="36" y1="40" x2="36" y2="56"/><path d="M30 48 Q36 44 42 48"/></svg>',
  alch: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20 30 Q36 18 52 30"/><path d="M28 38 C28 50 44 50 44 38"/></svg>'
 },
 {
  id: 'otkrytost',
  name: 'Открытость',
  petro: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 52 Q20 28 36 28 Q52 28 52 52"/><line x1="36" y1="28" x2="36" y2="16"/></svg>',
  alch: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M52 24 A20 20 0 1 0 52 48"/><line x1="36" y1="14" x2="36" y2="22" opacity="0.6"/><line x1="58" y1="36" x2="50" y2="36" opacity="0.6"/></svg>'
 },
 {
  id: 'prinytie',
  name: 'Принятие',
  petro: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 30 Q36 56 54 30"/><line x1="36" y1="16" x2="36" y2="24"/></svg>',
  alch: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M22 28 Q36 50 50 28"/><circle cx="36" cy="20" r="3"/></svg>'
 },
 {
  id: 'umerennost',
  name: 'Умеренность',
  petro: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 30 L36 18 L52 30"/><path d="M20 44 L36 56 L52 44"/></svg>',
  alch: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M22 24 L34 24 L26 40 Q40 40 40 30"/><path d="M50 48 L38 48 L46 32 Q32 32 32 42"/></svg>'
 },
 {
  id: 'uvazhenie',
  name: 'Уважение',
  petro: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 26 Q36 40 54 26"/><line x1="36" y1="40" x2="36" y2="56"/></svg>',
  alch: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><line x1="36" y1="18" x2="36" y2="54"/><rect x="26" y="14" width="20" height="6"/><rect x="28" y="54" width="16" height="4"/></svg>'
 },
 {
  id: 'staratelnost',
  name: 'Старательность',
  petro: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="28" x2="54" y2="28"/><line x1="18" y1="40" x2="54" y2="40"/><line x1="18" y1="52" x2="54" y2="52"/><circle cx="30" cy="20" r="2.4" fill="#94652b"/></svg>',
  alch: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M36 18 L50 27 L50 45 L36 54 L22 45 L22 27 Z"/></svg>'
 },
 {
  id: 'sostradanie',
  name: 'Сострадание',
  petro: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M36 54 C20 43 23 26 36 33 C49 26 52 43 36 54 Z"/><path d="M30 40 Q36 36 42 40"/></svg>',
  alch: '<svg aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="36" cy="36" r="20"/><path d="M36 48 C26 41 28 30 36 34 C44 30 46 41 36 48 Z"/></svg>'
 },
];
