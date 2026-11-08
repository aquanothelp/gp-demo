/* Local website-search demonstration. Index public content and permitted navigation only. */
'use strict';
(() => {
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const normalized = value => String(value ?? '').normalize('NFKC').toLocaleLowerCase('mr').replace(/\s+/g, ' ').trim();
  const localized = (value, lang) => typeof value === 'string' ? value : value?.[lang] || value?.en || '';
  const icon = value => `<svg class="icon" aria-hidden="true"><use href="#i-${value}"/></svg>`;
  function init(options) {
    const trigger = document.getElementById('headerSiteSearch');
    const dialog = document.getElementById('siteSearchDialog');
    let signature = '', returnFocus = true;
    const context = () => options.getContext();
    const L = (en, mr) => context().lang === 'mr' ? mr : en;
    const field = id => dialog.querySelector('#' + id);
    function entries() {
      const ctx = context();
      const page = (route, en, mr, terms = '', access = 'public') => ({ key: 'page:' + route, kind: 'page', route, title: { en, mr }, terms, access });
      const pages = [
        page('home', 'Home', 'मुख्यपृष्ठ', ctx.gpName + ' ' + ctx.gpCode),
        page('about', 'Our villages', 'आपली गावे', 'about village panchayat Beed Maharashtra माहिती गाव बीड महाराष्ट्र ' + ctx.gpName),
        page('services', 'All citizen services', 'सर्व नागरिक सेवा', 'certificate documents दाखले कागदपत्रे'),
        page('leadership', 'Leadership & team', 'पदाधिकारी व कर्मचारी', 'people representatives sarpanch secretary ग्रामसेवक सरपंच सचिव सदस्य'),
        page('contact', 'Contact & visit', 'संपर्क व भेट', 'office address phone hours PIN कार्यालय पत्ता दूरध्वनी वेळा'),
        page('help', 'Help & guidance', 'मदत व मार्गदर्शन', 'application documents assistance अर्ज कागदपत्रे मदत'),
        page('preferences', 'Website language & preferences', 'संकेतस्थळाची भाषा व पसंती', 'settings English Marathi भाषा इंग्रजी मराठी'),
        page('choose-gp', 'Choose another Panchayat', 'दुसरी ग्रामपंचायत निवडा', 'GP village directory Beed ग्रामपंचायत निर्देशिका'),
        page('about-site', 'Website information & sources', 'संकेतस्थळाची माहिती व स्रोत', 'source directory Meri Panchayat माहिती स्रोत'),
      ];
      if (!ctx.signedIn || ctx.role !== 'office') pages.push(page('track', 'Track a request', 'अर्जाची स्थिती', 'status progress tracking स्थिती पाठपुरावा', 'login'));
      if (!ctx.signedIn) pages.push(page('login', 'Login', 'लॉगिन', 'sign in account प्रवेश खाते'));
      else if (ctx.role === 'office') pages.push(
        page('queue', 'Request queue', 'अर्जांची यादी', 'admin applications review प्रशासक पडताळणी', 'admin'),
        page('workspace', 'Office details', 'कार्यालयाची माहिती', 'admin services configuration प्रशासक कार्यालय', 'admin'),
        page('permissions', 'Users & permissions', 'वापरकर्ते व परवानग्या', 'admin roles प्रशासक भूमिका', 'admin'),
        page('meetings', 'Gram Sabha & resolutions', 'ग्रामसभा व ठराव', 'meeting preview placeholder बैठक', 'admin-preview'),
        page('works', 'Village development', 'विकासकामे', 'works plans preview placeholder योजना', 'admin-preview'),
        page('finance', 'Taxes & finance', 'कर व अर्थव्यवस्था', 'accounts preview placeholder लेखे', 'admin-preview')
      );
      else pages.push(page('requests', 'My requests', 'माझे अर्ज', 'applications history माझे अर्ज इतिहास', 'citizen'));
      if (ctx.signedIn) pages.push(page('profile', 'My profile & language', 'माझे खाते व भाषा', 'account settings language खाते भाषा', 'account'));
      const services = options.getServices().map(service => ({ key: 'service:' + service.id, kind: 'service', serviceId: service.id,
        title: { en: service.en, mr: service.mr }, description: { en: service.desc[0], mr: service.desc[1] }, terms: service.id, access: 'public' }));
      const people = options.getPeople().filter(person => String(person.gpCode) === String(ctx.gpCode)).map(person => ({
        key: 'person:' + person.id, kind: 'person', personId: person.id, title: person.name, description: person.role, terms: person.roleKey || '', access: 'public'
      }));
      const villages = (options.getVillages?.() || []).map(village => ({ key: 'village:' + village.code, kind: 'village', villageCode: village.code,
        title: { en: village.en, mr: village.mr }, description: { en: 'Village code ' + village.code, mr: 'गाव क्रमांक ' + village.code }, terms: 'village गाव ' + village.code, access: 'public' }));
      return [...pages, ...services, ...villages, ...people];
    }
    function matches(query) {
      const ctx = context(), terms = normalized(query).split(' ').filter(Boolean);
      return entries().filter(entry => {
        const text = normalized([localized(entry.title, 'en'), localized(entry.title, 'mr'), localized(entry.description, 'en'), localized(entry.description, 'mr'), entry.terms].join(' '));
        return terms.every(term => text.includes(term));
      });
    }
    function results() {
      const query = field('siteSearchInput').value, ctx = context(), found = matches(query);
      const shown = query.trim() ? found.slice(0, 12) : found.slice(0, 6);
      const categories = { page: L('Page', 'पृष्ठ'), service: L('Service', 'सेवा'), person: L('People', 'व्यक्ती'), village: L('Village', 'गाव') };
      field('siteSearchClear').hidden = !query;
      field('siteSearchCount').textContent = query.trim() ? L(`${found.length} results in this Panchayat website`, `या ग्रामपंचायतीच्या संकेतस्थळावर ${found.length} निकाल`) : L('Quick links · or search services, villages and people', 'थेट दुवे · किंवा सेवा, गावे व व्यक्ती शोधा');
      field('siteSearchResults').innerHTML = shown.map(entry => {
        const detail = localized(entry.description, ctx.lang) || (entry.access === 'login' && !ctx.signedIn ? L('Login to view your request', 'तुमचा अर्ज पाहण्यासाठी लॉगिन करा') : entry.access === 'admin-preview' ? L('Future module preview', 'भावी विभागाची संकल्पना') : ctx.gpName);
        return `<li><button type="button" class="site-search-result" data-site-search-key="${esc(entry.key)}" data-search-kind="${entry.kind}">${icon(entry.kind === 'person' ? 'users' : entry.kind === 'service' ? 'file' : entry.kind === 'village' ? 'pin' : 'arrow')}<span><strong>${esc(localized(entry.title, ctx.lang))}</strong><small>${esc(detail)}</small></span><span class="site-search-category">${categories[entry.kind]}</span></button></li>`;
      }).join('');
      field('siteSearchEmpty').hidden = shown.length > 0;
    }
    function reset() {
      if (field('siteSearchInput')) field('siteSearchInput').value = '';
      field('siteSearchResults')?.replaceChildren();
      if (field('siteSearchCount')) field('siteSearchCount').textContent = '';
      if (field('siteSearchClear')) field('siteSearchClear').hidden = true;
      trigger.setAttribute('aria-expanded', 'false');
    }
    function close(restore = true) { returnFocus = restore; if (dialog.open) dialog.close(); reset(); }
    function update() {
      const ctx = context(), next = [ctx.gpCode, ctx.lang, ctx.role, ctx.signedIn].join('|');
      if (signature && signature !== next) { close(false); dialog.replaceChildren(); }
      signature = next;
      trigger.setAttribute('aria-label', L('Search', 'शोध'));
      trigger.title = trigger.getAttribute('aria-label');
    }
    function open() {
      update(); options.onBeforeOpen?.();
      const ctx = context(); returnFocus = true; dialog.lang = ctx.lang;
      dialog.innerHTML = `<header class="site-search-heading"><div><h2 id="siteSearchTitle">${L('Search', 'शोध')}</h2><p>${esc(ctx.gpName)} · GP ${esc(ctx.gpCode)}</p></div><button type="button" class="icon-button" id="siteSearchClose" aria-label="${L('Close search', 'शोध बंद करा')}">${icon('close')}</button></header><div class="site-search-field">${icon('search')}<label class="sr-only" for="siteSearchInput">${L('Search pages, services and people', 'पृष्ठे, सेवा आणि व्यक्ती शोधा')}</label><input id="siteSearchInput" type="search" maxlength="120" autocomplete="off" placeholder="${L('Search pages, services or people…', 'पृष्ठे, सेवा किंवा व्यक्ती शोधा…')}" aria-describedby="siteSearchCount" aria-controls="siteSearchResults"><button type="button" class="icon-button" id="siteSearchClear" aria-label="${L('Clear search', 'शोध रिकामा करा')}" hidden>${icon('close')}</button></div><p id="siteSearchCount" class="site-search-count" role="status" aria-live="polite" aria-atomic="true"></p><ul id="siteSearchResults" class="site-search-results"></ul><div id="siteSearchEmpty" class="site-search-empty" hidden><strong>${L('No matches found', 'जुळणारा निकाल नाही')}</strong><p>${L('Try a page, service or person’s name.', 'पृष्ठ, सेवा किंवा व्यक्तीचे नाव शोधा.')}</p></div><footer class="site-search-footer">${L('Esc to close', 'बंद करण्यासाठी Esc')}</footer>`;
      results(); dialog.showModal(); trigger.setAttribute('aria-expanded', 'true'); field('siteSearchInput').focus();
    }
    trigger.addEventListener('click', open);
    dialog.addEventListener('cancel', event => { event.preventDefault(); close(); });
    dialog.addEventListener('close', () => { if (dialog.open) return; reset(); if (returnFocus && trigger.isConnected) trigger.focus({ preventScroll: true }); });
    dialog.addEventListener('input', event => { if (event.target.id === 'siteSearchInput') results(); });
    dialog.addEventListener('keydown', event => {
      // Chrome otherwise uses the first Escape to clear a search input, leaving the dialog open.
      if (event.key === 'Escape') { event.preventDefault(); close(); return; }
      if (event.key === 'Enter' && event.target.id === 'siteSearchInput') { event.preventDefault(); field('siteSearchResults').querySelector('button')?.click(); }
    });
    dialog.addEventListener('click', event => {
      const button = event.target.closest('button'); if (!button) return;
      if (button.id === 'siteSearchClose') return close();
      if (button.id === 'siteSearchClear') { field('siteSearchInput').value = ''; results(); field('siteSearchInput').focus(); return; }
      if (button.dataset.siteSearchKey) {
        const entry = matches(field('siteSearchInput').value).find(item => item.key === button.dataset.siteSearchKey);
        if (entry) { close(false); options.onSelect(entry); }
      }
    });
    update();
    return Object.freeze({ open, close, update });
  }
  window.GPSiteSearch = Object.freeze({ init });
})();
