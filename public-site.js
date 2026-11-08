/* Shared GP website content and public dialogs. app.js owns the single shell, routing and login. */
'use strict';
(() => {
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const icon = name => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
  function init(options) {
    const root = document.getElementById('publicDialogs') || document.createElement('div');
    root.id = 'publicDialogs';
    if (!root.isConnected) document.body.append(root);
    const registry = options.registry || {};
    const gps = registry.gps || [];
    const gpMap = new Map(gps.map(item => [String(item.code), item]));
    if (!gpMap.has('171415')) throw new Error('Keep the supplied GP registry with the public website.');
    const districts = registry.districts || [];
    const districtMap = new Map(districts.map(item => [String(item.code), item]));
    const samitiMap = new Map((registry.samitis || []).map(item => [String(item.code), item]));
    // The single app router resolves URL/stored GP selection before supplying this context.
    const state = { gp: gpMap.has(options.gpCode) ? options.gpCode : '171415', lang: options.language === 'en' ? 'en' : 'mr', section: 'home', preferencesScroll: 0, signedIn: false, role: 'citizen' };
    let chooser = null;
    let returnFocus = null;
    const L = (en, mr) => state.lang === 'mr' ? mr : en;
    const text = value => typeof value === 'string' ? value : value?.[state.lang] || value?.en || '';
    const gp = () => gpMap.get(state.gp);
    const profile = () => window.GP_PUBLIC_SITE_DATA?.forGP(state.gp);
    const gpName = () => text(gp());
    const districtName = () => text(districtMap.get(String(gp()?.districtCode)));
    const samitiName = () => text(samitiMap.get(String(gp()?.samitiCode)));
    const team = () => (window.GP_DEMO_PEOPLE?.forGP(state.gp) || []).filter(item => item.gpCode === state.gp);
    const related = () => (window.GP_DEMO_PEOPLE?.relatedOfficesForGP(state.gp) || []).filter(item => item.gpCode === state.gp);
    const sections = () => [['home', L('Home', 'मुख्यपृष्ठ'), 'home'], ['about', L('Our villages', 'आपली गावे'), 'pin'], ['leadership', L('Leadership & team', 'पदाधिकारी व कर्मचारी'), 'users'], ['services', L('Citizen services', 'नागरिक सेवा'), 'file'], ['contact', L('Contact & visit', 'संपर्क व भेट'), 'phone']];
    const link = (id, label, className = '') => `<a href="#public-${id}" class="${className}" data-public-section="${id}">${label}</a>`;
    const loginButton = (label, intent = 'home', extra = '', secondary = false) => `<button type="button" class="button ${secondary ? 'secondary' : 'primary'}" data-open-login data-login-intent="${intent}" ${extra}>${label}${icon('arrow')}</button>`;
    function facts() {
      return `<div class="public-facts"><div class="public-fact"><span>${L('District', 'जिल्हा')}</span><strong>${esc(districtName())}</strong></div><div class="public-fact"><span>${L('Panchayat Samiti', 'पंचायत समिती')}</span><strong>${esc(samitiName())}</strong></div><div class="public-fact"><span>${L('Official GP code', 'अधिकृत ग्रामपंचायत क्रमांक')}</span><strong>${esc(state.gp)}</strong></div></div>`;
    }
    function villageArt() {
      return `<div class="public-hero-art" aria-label="${L('Illustration of village life', 'ग्रामीण जीवनाचे रेखाचित्र')}"><svg viewBox="0 0 400 225" role="img" aria-label="${L('Village illustration', 'गावाचे रेखाचित्र')}"><circle cx="317" cy="52" r="29" fill="#f5c89e"/><path d="M0 178Q85 126 184 166T400 155V225H0Z" fill="#dcece3"/><path d="M0 205Q125 161 250 202T400 186V225H0Z" fill="#c6dfd1"/><path d="M163 103h113v91H163Z" fill="#fff" stroke="#c88a60" stroke-width="2"/><path d="m152 104 68-43 67 43Z" fill="#d57036"/><path d="M192 139h53v55h-53Z" fill="#edf3fc" stroke="#5479a5" stroke-width="2"/><path d="M219 139v55" stroke="#5479a5" stroke-width="2"/><path d="M91 147h54v53H91Z" fill="#fff9f1" stroke="#b89b7d" stroke-width="2"/><path d="m84 148 34-28 35 28Z" fill="#d08a53"/><path d="M110 174h15v26h-15Z" fill="#709b8d"/><path d="M293 154h59v49h-59Z" fill="#fff" stroke="#9cb8aa" stroke-width="2"/><path d="m286 155 36-27 37 27Z" fill="#74978a"/><path d="M316 178h15v25h-15Z" fill="#537da8"/><path d="M54 205v-70" stroke="#5c8171" stroke-width="4"/><circle cx="54" cy="128" r="25" fill="#7faf95"/><circle cx="38" cy="141" r="20" fill="#96bda2"/><circle cx="70" cy="141" r="19" fill="#6a9e82"/><path d="m200 225 12-31h15l19 31" fill="#f2cda7"/><path d="M365 209v-56" stroke="#709b80" stroke-width="4"/><ellipse cx="365" cy="145" rx="17" ry="29" fill="#9dbf96"/></svg><span class="public-visual-caption">${L('Village illustration', 'गावाचे रेखाचित्र')}</span></div>`;
    }
    function personCard(person) {
      return `<article class="public-person-card" data-public-person-card="${esc(person.id)}" data-person-category="${esc(person.category)}" data-gp="${esc(state.gp)}">${window.GPPeople.thumbnail({ gpCode: state.gp, lang: state.lang }, person, true)}<div class="person-card-caption"><h3>${esc(text(person.name))}</h3><p class="public-person-role">${esc(text(person.role))}</p></div><button type="button" class="person-card-open" data-public-person="${esc(person.id)}" aria-label="${esc(L('View profile: ', 'माहिती पाहा: ') + text(person.name))}"></button></article>`;
    }
    function leadership(compact = false) {
      const list = team();
      if (!list.length) return `<div class="public-empty panel" data-public-people-empty><h3>${L('Leadership details awaiting publication', 'पदाधिकाऱ्यांची माहिती प्रसिद्ध व्हायची आहे')}</h3><p>${L('Current names and public contacts need confirmation for this Gram Panchayat.', 'या ग्रामपंचायतीतील सध्याची नावे आणि सार्वजनिक संपर्कांची पुष्टी आवश्यक आहे.')}</p></div>`;
      if (compact) {
        const leaders = ['sarpanch', 'up-sarpanch', 'officer-secretary'].map(key => list.find(person => person.roleKey === key)).filter(Boolean);
        return `<p class="public-source-note">${L('Sourced profiles; current appointments are not independently confirmed.', 'स्रोतांवर आधारित माहिती; सध्याच्या नियुक्तीची स्वतंत्र पुष्टी नाही.')}</p><div class="public-leader-grid">${leaders.map(personCard).join('')}</div>`;
      }
      return `<p class="public-source-note">${L('One profile per named person, with separate source and term records. This is not a certified complete council or staff list.', 'प्रत्येक नावाची एक माहितीपत्रिका; स्रोत व कार्यकाळाच्या नोंदी स्वतंत्र. ही प्रमाणित संपूर्ण परिषद किंवा कर्मचारी यादी नाही.')}</p>${[['elected', L('Elected representatives', 'निर्वाचित पदाधिकारी')], ['officers', L('GP officers', 'ग्रामपंचायत अधिकारी')], ['staff', L('Office & field staff', 'कार्यालयीन व क्षेत्रीय कर्मचारी')]].map(([category, title]) => { const members = list.filter(person => person.category === category); return `<section class="public-people-group"><h2 class="public-section-title">${title}</h2>${members.length ? `<div class="public-team-grid">${members.map(personCard).join('')}</div>` : `<p class="public-source-note">${L('No separately verified staff list has been supplied; this does not establish a vacancy.', 'स्वतंत्र पडताळलेली कर्मचारी यादी उपलब्ध नाही; याचा अर्थ पद रिक्त आहे असा नाही.')}</p>`}</section>`; }).join('')}`;
    }
    const sectionHead = (title, route, caption = '') => `<div class="public-section-head"><div><h2 class="public-section-title">${title}</h2>${caption ? `<p>${caption}</p>` : ''}</div>${route ? link(route, L('View more', 'अधिक पाहा') + icon('arrow'), 'text-button') : ''}</div>`;
    function services() {
      const items = [['file', L('Certificates & records', 'दाखले व नोंदी'), L('Browse document requests and record-copy guidance.', 'दाखले व नोंदींच्या प्रतींची माहिती पाहा.')], ['drop', L('Local services', 'स्थानिक सेवा'), L('Explore water, streetlight and village service requests.', 'पाणी, पथदिवे आणि गावातील सेवांचे अर्ज पाहा.')], ['search', L('Track request', 'अर्जाची स्थिती'), L('Sign in to follow your application and its history.', 'अर्जाची स्थिती आणि इतिहास पाहण्यासाठी प्रवेश करा.')]];
      return `<div class="public-service-grid">${items.map(([symbol, title, copy], index) => `<button type="button" class="public-service-link" ${index === 2 ? 'data-open-login data-login-intent="track"' : 'data-public-section="services"'}><span class="service-icon ${index === 1 ? 'sage' : 'sand'}">${icon(symbol)}</span><strong>${title}</strong><span>${copy}</span><span class="public-service-action">${index === 2 ? L('Track a request', 'अर्जाची स्थिती') : L('Browse services', 'सेवांची माहिती पाहा')}${icon('arrow')}</span></button>`).join('')}</div>`;
    }
    function contactPanel() {
      const office = profile()?.office || {};
      const missing = L('Awaiting GP confirmation', 'ग्रामपंचायतीकडून पुष्टी बाकी');
      const contactMissing = office.contactsMasked ? L('Masked in the official profile', 'अधिकृत प्रोफाइलमध्ये लपविलेले') : missing;
      const address = text(office.address);
      return `<div class="public-contact-scene${state.section === 'home' ? ' public-contact-home' : ''}"><section class="public-contact-panel panel"><div class="public-contact-intro"><p class="public-kicker">${L('YOUR PANCHAYAT', 'आपली ग्रामपंचायत')}</p><h2>${L('Contact', 'संपर्क')}</h2><p>${esc(gpName())} · ${esc(samitiName())} · ${esc(districtName())}</p></div><div class="public-contact-grid"><div class="public-contact-item">${icon('phone')}<div><span>${L('GP office phone', 'ग्रामपंचायत कार्यालय दूरध्वनी')}</span><strong data-public-office-phone>${esc(office.phone || contactMissing)}</strong></div></div><div class="public-contact-item">${icon('chat')}<div><span>${L('GP office email', 'कार्यालयाचा ईमेल')}</span><strong>${esc(office.email || contactMissing)}</strong></div></div><div class="public-contact-item">${icon('clock')}<div><span>${L('Visiting hours', 'भेटण्याची वेळ')}</span><strong>${esc(text(office.hours) || missing)}</strong></div></div>${address ? `<div class="public-contact-item public-office-address" data-public-office-address data-source="${esc(office.sourceId)}">${icon('pin')}<div><span>${L('Office address as published', 'प्रसिद्ध केलेला कार्यालयाचा पत्ता')}</span><strong>${esc(address)}<span class="public-office-pin">PIN ${esc(office.pin)}</span></strong><div class="public-contact-source"><a href="${esc(office.sourceUrl)}" target="_blank" rel="noopener noreferrer">${L('eGramSwaraj GP profile · accessed 7 Nov 2026', 'eGramSwaraj ग्रामपंचायत प्रोफाइल · ७ नोव्हेंबर २०२६')}${icon('arrow')}</a><p>${L('Published address; independent site visit and deliverability are not confirmed.', 'प्रसिद्ध पत्ता; प्रत्यक्ष भेट किंवा टपाल वितरणाची स्वतंत्र पुष्टी नाही.')}</p></div></div></div>` : ''}</div></section></div>`;
    }
    function home() {
      const p = profile();
      return `<div class="public-home-overview"><div class="public-home-intro"><section class="public-hero"><div class="public-hero-copy"><p class="public-kicker">${L('OUR VILLAGE. OUR PANCHAYAT.', 'आपले गाव. आपली ग्रामपंचायत.')}</p><h1>${esc(p ? text(p.editorial.welcome.title) : L(`Welcome to ${gpName()}.`, `${gpName()} ग्रामपंचायतीत स्वागत.`))}</h1><p class="public-hero-lead">${esc(p ? text(p.editorial.welcome.body) : L('Discover your Gram Panchayat and explore citizen services. Local profile details are awaiting publication.', 'ग्रामपंचायतीची ओळख आणि नागरिक सेवा पाहा. स्थानिक माहिती प्रसिद्ध व्हायची आहे.'))}</p><div class="public-hero-actions">${link('services', L('Explore citizen services', 'नागरिक सेवा पाहा') + icon('arrow'), 'button primary')}${link('about', L('Discover our village', 'आपल्या गावाची ओळख'), 'button secondary')}</div></div>${villageArt()}</section>${facts()}</div><section class="public-home-leadership">${sectionHead(L('Leadership', 'पदाधिकारी'), 'leadership')}${leadership(true)}</section></div><section>${sectionHead(L('Services', 'सेवा'), 'services')}${services()}</section>${p ? `<section>${sectionHead(L('Village services', 'गावातील सेवा'), 'about', L('Illustrative focus areas for this public-page demonstration.', 'या सार्वजनिक पृष्ठाच्या डेमोसाठी उदाहरणार्थ लक्षक्षेत्रे.'))}<div class="public-focus-grid">${p.illustrativeFocusAreas.map((item, index) => `<article class="public-focus-card"><span>${icon(['drop', 'users', 'sun'][index])}</span><h3>${esc(text(item.title))}</h3><p>${esc(text(item.description).replace(/^Illustrative focus: /, '').replace(/^उदाहरणार्थ लक्षक्षेत्र: /, ''))}</p></article>`).join('')}</div></section>` : ''}${contactPanel()}`;
    }
    function about() {
      const p = profile();
      return `<div class="public-page-heading"><p class="public-kicker">${L('GET TO KNOW US', 'आपली ओळख')}</p><h1>${L('Our villages', 'आपली गावे')}</h1><p>${esc(p ? text(p.editorial.about.body) : L('One Panchayat for every village it serves. Explore the retained village mappings and Panchayat identity below; local updates await publication.', 'आपल्या प्रत्येक गावासाठी एक ग्रामपंचायत. खाली गाव-जोडण्या आणि ग्रामपंचायतीची ओळख पाहा; स्थानिक माहिती प्रसिद्ध व्हायची आहे.'))}</p></div>${facts()}${window.GPVillages?.render({ gpCode: state.gp, lang: state.lang }) || ''}<div class="public-about-grid"><section class="panel"><h2>${L('Panchayat identity', 'ग्रामपंचायतीची ओळख')}</h2><dl class="admin-profile-grid"><div><dt>${L('Gram Panchayat', 'ग्रामपंचायत')}</dt><dd>${esc(gpName())}</dd></div><div><dt>${L('State', 'राज्य')}</dt><dd>${L('Maharashtra', 'महाराष्ट्र')}</dd></div><div><dt>${L('Population / area', 'लोकसंख्या / क्षेत्रफळ')}</dt><dd>${L('Not verified', 'पडताळलेले नाही')}</dd></div></dl></section><section class="panel"><h2>${L('Village stories', 'गावाच्या गोष्टी')}</h2><p>${L('Village history, local traditions, approved photographs and verified development updates can form this Panchayat’s public introduction.', 'गावाचा इतिहास, स्थानिक परंपरा, मान्य छायाचित्रे आणि पडताळलेल्या विकासाच्या बातम्यांतून ग्रामपंचायतीची सार्वजनिक ओळख मांडता येईल.')}</p><p class="field-hint">${L('No verified local photos, achievements or project claims are included in this demonstration.', 'या डेमोमध्ये स्थानिक छायाचित्रे, यश किंवा प्रकल्पांविषयी अपडताळलेले दावे नाहीत.')}</p>${link('contact', L('Contact the Panchayat', 'ग्रामपंचायतीशी संपर्क'), 'text-button')}</section></div>`;
    }
    function body() {
      if (state.section === 'home') return home();
      if (state.section === 'about') return about();
      if (state.section === 'leadership') return `<div class="public-page-heading"><p class="public-kicker">${L('PEOPLE & CONTACTS', 'पदाधिकारी व संपर्क')}</p><h1>${L('Panchayat team', 'पदाधिकारी व कर्मचारी')}</h1><p>${L('Official published records and the user-supplied Meri Panchayat screenshot are distinguished. They do not independently confirm current appointments.', 'अधिकृत प्रसिद्ध नोंदी आणि वापरकर्त्याचा Meri Panchayat स्क्रीनशॉट स्वतंत्र दाखविले आहेत. त्यांवरून सध्याच्या नियुक्तीची स्वतंत्र पुष्टी होत नाही.')}</p></div>${leadership()}`;
      if (state.section === 'services') return services(); // The full catalogue has one owner in app.js.
      return `<div class="public-page-heading"><p class="public-kicker">${L('CONTACT & VISIT', 'संपर्क व भेट')}</p><h1>${L('Contact', 'संपर्क')}</h1><p>${L('GP contacts and related government offices are kept separate.', 'ग्रामपंचायतीचे संपर्क आणि संबंधित कार्यालये स्वतंत्र आहेत.')}</p></div>${contactPanel()}${related().length ? `<section>${sectionHead(L('Related offices', 'संबंधित कार्यालये'), null, L('Georai Panchayat Samiti · official listing updated26Feb2025; current posting not reconfirmed.', 'गेवराई पंचायत समिती · अधिकृत नोंद२६फेब्रुवारी२०२५; सध्याच्या पदभाराची पुनर्पुष्टी नाही.'))}<div class="public-leader-grid">${related().map(personCard).join('')}</div></section>` : ''}<section class="panel"><h2>${L('Application help', 'अर्जासाठी मदत')}</h2><p>${L('Browse services here, then sign in when you are ready to apply.', 'येथे सेवांची माहिती पाहा; अर्ज करायचा असेल तेव्हा लॉगिन करा.')}</p>${link('services', L('Browse citizen services', 'नागरिक सेवांची माहिती') + icon('arrow'), 'button primary')}</section>`;
    }
    function dialogHeader(id, title) { return `<header class="modal-header"><div><span class="eyebrow">${esc(gpName())} · GP ${esc(state.gp)}</span><h2 id="${id}">${title}</h2></div><button type="button" class="icon-button" data-public-close aria-label="${L('Close', 'बंद करा')}">${icon('close')}</button></header>`; }
    function footer() {
      const isBeed = String(gp().districtCode) === '470';
      const resourceURL = isBeed ? 'https://www.zpbeed.gov.in/' : 'https://rdd.maharashtra.gov.in/';
      const resourceLabel = isBeed ? L('Beed Zilla Parishad', 'बीड जिल्हा परिषद') : L('Maharashtra Rural Development', 'महाराष्ट्र ग्रामविकास विभाग');
      return `<footer class="public-footer">
        <div class="public-footer-grid">
          <section class="public-footer-identity">
            <span class="public-footer-eyebrow">${L('GRAM PANCHAYAT', 'ग्रामपंचायत')}</span>
            <h2>${esc(gpName())}</h2>
            <p class="public-footer-location">${esc(samitiName())} · ${esc(districtName())} · ${L('Maharashtra', 'महाराष्ट्र')}</p>
            <span class="public-footer-code">GP ${esc(state.gp)}</span>
            ${link('contact', `${L('Contact & visit', 'संपर्क व भेट')}${icon('arrow')}`, 'public-footer-visit')}
          </section>
          <nav class="public-footer-group" aria-label="${L('Explore the Panchayat', 'ग्रामपंचायत माहिती')}">
            <h2>${L('Explore', 'ग्रामपंचायत माहिती')}</h2>
            <div class="public-footer-links">${link('home', L('Home', 'मुख्यपृष्ठ'))}${link('about', L('Our villages', 'आपली गावे'))}${link('leadership', L('Leadership & team', 'पदाधिकारी व कर्मचारी'))}</div>
          </nav>
          <nav class="public-footer-group" aria-label="${L('Citizen services', 'नागरिक सेवा')}">
            <h2>${L('Citizen services', 'नागरिक सेवा')}</h2>
            <div class="public-footer-links">${link('services', L('Explore services', 'सेवांची माहिती'))}${state.signedIn ? (state.role === 'office' ? '<button type="button" class="text-button" data-admin-route="queue">' + L('Administration', 'प्रशासन') + icon('arrow') + '</button>' : '<button type="button" class="text-button" data-route="requests">' + L('My requests', 'माझे अर्ज') + icon('arrow') + '</button>') : loginButton(L('Login', 'लॉगिन'), 'home', '', true)}</div>
          </nav>
          <nav class="public-footer-group" aria-label="${L('Useful links', 'उपयुक्त दुवे')}">
            <h2>${L('Useful links', 'उपयुक्त दुवे')}</h2>
            <div class="public-footer-links">
              <a href="https://aaplesarkar.mahaonline.gov.in/" target="_blank" rel="noopener noreferrer">${L('Aaple Sarkar', 'आपले सरकार')}${icon('arrow')}</a>
              <a href="https://meripanchayat.gov.in/" target="_blank" rel="noopener noreferrer">${L('Meri Panchayat', 'मेरी पंचायत')}${icon('arrow')}</a>
              <a href="${resourceURL}" target="_blank" rel="noopener noreferrer">${resourceLabel}${icon('arrow')}</a>
              <button type="button" class="text-button" data-public-preferences>${L('Website preferences', 'संकेतस्थळ पसंती')}</button>
            </div>
          </nav>
        </div>
        <div class="public-footer-bottom">
          <span>©2026 · ${esc(gpName())}<small>${L('Local website concept', 'स्थानिक संकेतस्थळ संकल्पना')}</small></span>
          <button type="button" class="text-button" data-public-about-site>${L('About this website & sources', 'संकेतस्थळ आणि स्रोतांविषयी')}${icon('arrow')}</button>
        </div>
      </footer>`;
    }
    function renderDialogs() {
      root.innerHTML = `<dialog id="publicPreferencesDialog" aria-labelledby="publicPreferencesTitle">${dialogHeader('publicPreferencesTitle', L('Website preferences', 'संकेतस्थळ पसंती'))}<form id="publicPreferencesForm"><div class="modal-body"><div class="form-field"><label for="publicLanguage">${L('Website language', 'संकेतस्थळाची भाषा')}</label><select id="publicLanguage"><option value="mr" ${state.lang === 'mr' ? 'selected' : ''}>मराठी (Marathi)</option><option value="en" ${state.lang === 'en' ? 'selected' : ''}>English (इंग्रजी)</option></select><p class="field-hint">${L('Choose your language for this website. After login you can change it under Profile.', 'या संकेतस्थळाची भाषा निवडा. लॉगिन केल्यानंतर खात्यातून भाषा बदलता येते.')}</p></div></div><footer class="modal-footer"><button type="button" class="button secondary" data-public-close>${L('Cancel', 'रद्द करा')}</button><button type="submit" class="button primary" id="savePublicPreferences">${L('Save preferences', 'पसंती जतन करा')}</button></footer></form></dialog><dialog id="publicGPDialog" aria-labelledby="publicGPTitle">${dialogHeader('publicGPTitle', L('Explore a Gram Panchayat', 'ग्रामपंचायत शोधा'))}<form id="publicGPForm"><div class="modal-body"><div class="form-field"><label for="publicDistrict">${L('District · Maharashtra', 'जिल्हा · महाराष्ट्र')}</label><select id="publicDistrict">${districts.map(item => `<option value="${esc(item.code)}" ${String(item.code) === String(gp().districtCode) ? 'selected' : ''}>${esc(text(item))}</option>`).join('')}</select></div><div class="form-field"><label for="publicGPSearch">${L('GP name or code', 'ग्रामपंचायतीचे नाव किंवा क्रमांक')}</label><input type="search" id="publicGPSearch" autocomplete="off"></div><div class="form-field"><label for="publicGPSelect">${L('Gram Panchayat', 'ग्रामपंचायत')}</label><select id="publicGPSelect" required></select><p class="field-hint" id="publicGPStatus" aria-live="polite"></p></div><p class="field-hint">${L('Directory identities are dated references. A profile preview does not activate an official GP website or account.', 'निर्देशिकेतील ओळख दिनांकित संदर्भ आहे. माहिती पाहणे म्हणजे अधिकृत संकेतस्थळ किंवा खाते सक्रिय करणे नाही.')}</p></div><footer class="modal-footer"><button type="button" class="button secondary" data-public-close>${L('Cancel', 'रद्द करा')}</button><button type="submit" class="button primary" id="publicGPApply">${L('View Panchayat', 'ग्रामपंचायत पाहा')}</button></footer></form></dialog><dialog id="publicPersonDialog" aria-labelledby="publicPersonTitle">${dialogHeader('publicPersonTitle', L('Profile & contact details', 'व्यक्ती आणि संपर्काची माहिती'))}<div class="modal-body" id="publicPersonBody"></div><footer class="modal-footer"><button type="button" class="button secondary" data-public-close>${L('Close', 'बंद करा')}</button></footer></dialog><dialog id="publicAboutDialog" aria-labelledby="publicAboutTitle">${dialogHeader('publicAboutTitle', L('About this website', 'या संकेतस्थळाविषयी'))}<div class="modal-body"><p>${L('This is a local demonstration of one GP website with public services and signed-in actions. Directory identity is a7Nov2026 snapshot. Editorial village introductions and illustrative focus areas are not claims of completed projects.', 'हे एकाच ग्रामपंचायत संकेतस्थळाचे, सार्वजनिक सेवा व प्रवेशानंतरच्या कृतींसह स्थानिक प्रात्यक्षिक आहे. निर्देशिकेतील ओळख७नोव्हेंबर२०२६ची आहे. परिचय व उदाहरणार्थ लक्षक्षेत्रे म्हणजे पूर्ण झालेल्या प्रकल्पांचे दावे नाहीत.')}</p><p>${L('Direct official listings, user-supplied screenshot records and dated related-office listings are labelled separately. Original verified portraits, complete GP phone/email, population and office hours have not been supplied. Published office address/PIN is shown with its source. Header artwork does not establish government endorsement. No authentic signature or live transaction is created.', 'थेट अधिकृत नोंदी, वापरकर्त्याचे स्क्रीनशॉट व जुन्या संबंधित कार्यालयीन नोंदी स्वतंत्र लेबलसह आहेत. मूळ पडताळलेली छायाचित्रे, संपूर्ण दूरध्वनी/ईमेल, लोकसंख्या व वेळा उपलब्ध नाहीत. प्रसिद्ध पत्ता/पिन स्रोतासह दिला आहे. शीर्षकातील राजचिन्हांमुळे शासनाची मान्यता सिद्ध होत नाही. अधिकृत स्वाक्षरी किंवा प्रत्यक्ष व्यवहार तयार होत नाही.')}</p><p>${L('Demo credentials remain in tab memory and disappear on reload; synthetic cases may persist separately in this browser.', 'डेमो लॉगिन तपशील टॅबच्या मेमरीत राहतात आणि पान पुन्हा उघडल्यावर मिटतात; काल्पनिक अर्ज स्वतंत्रपणे ब्राउझरमध्ये राहू शकतात.')}</p></div><footer class="modal-footer"><button type="button" class="button secondary" data-public-close>${L('Close', 'बंद करा')}</button></footer></dialog>`;
      root.querySelectorAll('dialog').forEach(item => item.addEventListener('close', () => {
        if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
      }));
    }
    function update(values = {}) {
      const changed = (gpMap.has(values.gpCode) && state.gp !== values.gpCode) || (['mr', 'en'].includes(values.lang) && state.lang !== values.lang);
      if (changed) closeDialogs();
      if (gpMap.has(values.gpCode)) state.gp = values.gpCode;
      if (['mr', 'en'].includes(values.lang)) state.lang = values.lang;
      if (typeof values.signedIn === 'boolean') state.signedIn = values.signedIn;
      if (['citizen', 'office'].includes(values.role)) state.role = values.role;
      if (changed || !root.querySelector('#publicGPDialog')) renderDialogs();
    }
    function closeDialogs() { root.querySelectorAll('dialog[open]').forEach(item => item.close()); }
    function openDialog(id) { returnFocus = document.activeElement; root.querySelector(`#${id}`)?.showModal(); }
    function openChooser() {
      chooser = { district: String(gp().districtCode), search: gp().en, gp: state.gp };
      root.querySelector('#publicGPSearch').value = chooser.search;
      updateGPOptions(); openDialog('publicGPDialog');
    }
    function openPreferences() { state.preferencesScroll = scrollY; openDialog('publicPreferencesDialog'); }
    function openPerson(id) {
      const content = window.GPPeople?.profile({ gpCode: state.gp, lang: state.lang }, id);
      if (content) { root.querySelector('#publicPersonBody').innerHTML = content; openDialog('publicPersonDialog'); }
    }
    function updateGPOptions() {
      const query = (chooser.search || '').normalize('NFKC').toLocaleLowerCase();
      const matches = gps.filter(item => String(item.districtCode) === chooser.district && `${item.en} ${item.mr} ${item.code}`.normalize('NFKC').toLocaleLowerCase().includes(query));
      const shown = matches.slice(0, 100);
      root.querySelector('#publicGPSelect').innerHTML = `<option value="">${L('Choose a Panchayat', 'ग्रामपंचायत निवडा')}</option>${shown.map(item => `<option value="${esc(item.code)}" ${String(item.code) === chooser.gp ? 'selected' : ''}>${esc(text(item))} · ${esc(item.code)}</option>`).join('')}`;
      root.querySelector('#publicGPStatus').textContent = matches.length ? L(`${matches.length} matches · showing up to100. Refine the search if needed.`, `${matches.length} जुळणाऱ्या नोंदी · जास्तीत जास्त१००. गरजेनुसार शोध मर्यादित करा.`) : L('No matching GP in this district.', 'या जिल्ह्यात जुळणारी ग्रामपंचायत नाही.');
    }
    // Shared-shell actions stay public. The app callback guards login and private routes.
    document.addEventListener('click', event => {
      const target = event.target.closest('button, a'); if (!target) return;
      if (target.dataset.publicSection) { event.preventDefault(); options.onNavigate?.(target.dataset.publicSection); return; }
      if (target.hasAttribute('data-open-login')) { event.preventDefault(); options.onLogin?.(target.dataset.loginIntent || 'home'); return; }
      if (target.id === 'publicPreferences' || target.hasAttribute('data-public-preferences')) { openPreferences(); return; }
      if (target.id === 'publicGPChooser') { openChooser(); return; }
      if (target.dataset.publicPerson) { openPerson(target.dataset.publicPerson); return; }
      if (target.hasAttribute('data-public-about-site')) { openDialog('publicAboutDialog'); return; }
      if (target.hasAttribute('data-public-close')) target.closest('dialog')?.close();
    });
    root.addEventListener('change', event => {
      if (event.target.id === 'publicDistrict') { chooser.district = event.target.value; chooser.search = ''; chooser.gp = ''; root.querySelector('#publicGPSearch').value = ''; updateGPOptions(); }
      if (event.target.id === 'publicGPSelect') chooser.gp = event.target.value;
    });
    root.addEventListener('input', event => { if (event.target.id === 'publicGPSearch') { chooser.search = event.target.value; updateGPOptions(); } });
    root.addEventListener('submit', event => {
      if (event.target.id === 'publicPreferencesForm') {
        event.preventDefault(); const lang = root.querySelector('#publicLanguage').value;
        if (!['mr', 'en'].includes(lang)) return;
        const y = state.preferencesScroll; closeDialogs(); options.onLanguageChange?.(lang);
        requestAnimationFrame(() => window.scrollTo({ top: y, behavior: 'instant' }));
      }
      if (event.target.id === 'publicGPForm') {
        event.preventDefault(); const selected = gpMap.get(chooser?.gp);
        if (!selected || String(selected.districtCode) !== chooser.district) return;
        closeDialogs(); options.onGPChange?.(String(selected.code));
      }
    });
    update();
    return Object.freeze({
      update,
      render(section = 'home', values = {}) { update(values); state.section = sections().some(item => item[0] === section) ? section : 'home'; return body(); },
      footer(values = {}) { update(values); return footer(); },
      openChooser, openPreferences, openPerson, openAbout() { openDialog('publicAboutDialog'); }, closeDialogs,
      get gpCode() { return state.gp; }, get language() { return state.lang; }
    });
  }
  window.GPPublicSite = Object.freeze({ init });
})();
