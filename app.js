/* Offline presentation prototype. All cases are synthetic; no backend or real authority. */
'use strict';
(() => {
  const workflow = window.GPWorkflow;
  const PREFIX = 'apli-gp-demo-v1:';
  const memory = new Map();
  const memoryOnly = new Set();
  const read = (key, fallback) => {
    if (memoryOnly.has(key)) return memory.has(key) ? memory.get(key) : fallback;
    try { const value = localStorage.getItem(PREFIX + key); return value === null ? fallback : JSON.parse(value); }
    catch (_) { return memory.has(key) ? memory.get(key) : fallback; }
  };
  const write = (key, value) => {
    memory.set(key, value);
    try { localStorage.setItem(PREFIX + key, JSON.stringify(value)); memoryOnly.delete(key); }
    catch (_) { memoryOnly.add(key); /* File/private-mode/quota fallback stays in this tab. */ }
  };
  const seedRegistry = [
    { code: '171415', en: 'Chaklamba', mr: 'चाकलांबा' },
    { code: '171410', en: 'Bhogalgaon', mr: 'भोगलगांव' },
    { code: '171411', en: 'Bhojgaon', mr: 'भोजगांव' },
    { code: '171412', en: 'Borgaon Bk.', mr: 'बोरगांव बु.' }
  ];
  const registry = window.GP_DEMO_REGISTRY?.gps || seedRegistry;
  const registryStates = window.GP_DEMO_REGISTRY?.states || [{ code: '27', en: 'Maharashtra', mr: 'महाराष्ट्र' }];
  const registryDistricts = window.GP_DEMO_REGISTRY?.districts || [];
  const registrySamitis = window.GP_DEMO_REGISTRY?.samitis || [];
  const defaultGP = String(window.GP_DEMO_REGISTRY?.defaultSelection?.gpCode || '171415');
  let authenticatedGP = null;
  let sessionUsername = '';
  let enrollmentController;
  let publicController;
  let siteSearchController;
  let authOpen = false;
  let pendingIntent = null;
  const hasSession = () => Boolean(authenticatedGP && authenticatedGP === state.gp && sessionUsername);
  const services = [
    { id: 'birth', en: 'Birth certificate copy', mr: 'जन्म प्रमाणपत्राची प्रत', icon: 'file', tone: 'sage', category: 'certificates', desc: ['Request a copy of an existing birth entry.', 'नोंदवलेल्या जन्माच्या प्रमाणपत्राची प्रत मागवा.'] },
    { id: 'assessment', en: 'Property assessment extract', mr: 'मालमत्ता आकारणी उतारा', icon: 'home', tone: 'sand', category: 'certificates', desc: ['Request an extract from the GP tax register.', 'ग्रामपंचायतीच्या कर नोंदवहीतील उतारा मागवा.'] },
    { id: 'marriage', en: 'Marriage certificate copy', mr: 'विवाह प्रमाणपत्राची प्रत', icon: 'heart', tone: 'rose', category: 'certificates', desc: ['Request a copy for a registered marriage.', 'नोंदणीकृत विवाहाच्या प्रमाणपत्राची प्रत मागवा.'] },
    { id: 'nodues', en: 'No-dues certificate', mr: 'थकबाकी नसल्याचा दाखला', icon: 'shield', tone: 'blue', category: 'certificates', desc: ['Ask the office to check relevant GP dues.', 'संबंधित ग्रामपंचायत थकबाकीची पडताळणी मागवा.'] },
    { id: 'water', en: 'Water service request', mr: 'पाणीपुरवठा सेवा', icon: 'drop', tone: 'blue', category: 'local', desc: ['Report a supply issue or request connection help.', 'पाणीपुरवठ्याची अडचण कळवा किंवा जोडणीसाठी मदत मागवा.'] },
    { id: 'grievance', en: 'Report a village issue', mr: 'गावातील समस्या नोंदवा', icon: 'chat', tone: 'peach', category: 'local', desc: ['Tell us about lights, cleanliness or local repairs.', 'पथदिवे, स्वच्छता किंवा दुरुस्तीची समस्या कळवा.'] },
    { id: 'death', en: 'Death certificate copy', mr: 'मृत्यू प्रमाणपत्राची प्रत', icon: 'file', tone: 'sage', category: 'certificates', desc: ['Request a copy of an existing death entry.', 'नोंदवलेल्या मृत्यूच्या प्रमाणपत्राची प्रत मागवा.'] },
    { id: 'bpl', en: 'BPL certificate request', mr: 'दारिद्र्यरेषेखालील दाखला', icon: 'users', tone: 'sand', category: 'certificates', desc: ['Request a check against the applicable BPL record.', 'लागू दारिद्र्यरेषेच्या नोंदीतून पडताळणी मागवा.'] },
    { id: 'niradhar', en: 'Niradhar age certificate', mr: 'निराधार योजनेसाठी वयाचा दाखला', icon: 'users', tone: 'rose', category: 'certificates', desc: ['Request age certification for the relevant purpose.', 'संबंधित प्रयोजनासाठी वयाची पडताळणी मागवा.'] }
  ];
  const defaults = ['birth', 'assessment', 'marriage', 'nodues', 'water', 'grievance', 'death', 'bpl', 'niradhar'];
  const strings = {
    people: ['People & contacts', 'पदाधिकारी व संपर्क'],
    demoRoleView: ['Demo role view', 'डेमो भूमिका'], adminQueue: ['Request queue', 'अर्जांची यादी'], adminWorkspace: ['Office details', 'कार्यालयाची माहिती'], adminPermissions: ['Users & permissions', 'वापरकर्ते व परवानग्या'], adminNavigation: ['ADMINISTRATION', 'प्रशासन'], adminContext: ['ADMIN WORKSPACE', 'प्रशासक कार्यालय'], roleDemoNote: ['Demo role view. Real officer permissions are not verified.', 'डेमो भूमिका. प्रत्यक्ष अधिकाऱ्यांची परवानगी पडताळलेली नाही.'],
    brand: ['Apli Grampanchayat', 'आपली ग्रामपंचायत'], prototype: ['CONCEPT DEMO', 'संवादासाठी डेमो'], sampleOnly: ['Illustrative data only', 'फक्त नमुना माहिती'], citizen: ['Citizen', 'नागरिक'], office: ['Admin', 'प्रशासक'], reset: ['Reset', 'रीसेट'], citizenService: ['CITIZEN SERVICE CENTRE', 'नागरिक सेवा केंद्र'], yourServices: ['YOUR SERVICES', 'तुमच्या सेवा'], home: ['Overview', 'मुख्यपृष्ठ'], allServices: ['All services', 'सर्व सेवा'], myRequests: ['My requests', 'माझे अर्ज'], track: ['Track a request', 'अर्जाची स्थिती'], help: ['Help & guidance', 'मदत व मार्गदर्शन'], comingLater: ['FUTURE MODULES', 'पुढील टप्प्यात'], meetings: ['Gram Sabha & resolutions', 'ग्रामसभा व ठराव'], works: ['Village development', 'विकासकामे'], finance: ['Taxes & finance', 'कर व अर्थव्यवस्था'], needHelp: ['A little help goes a long way.', 'अर्ज भरायला मदत हवी?'], helpCopy: ['Understand the steps, or explore assisted applications at the office.', 'प्रक्रिया समजून घ्या. कार्यालयाच्या मदतीने अर्ज करण्याचा पर्याय पाहा.'], getHelp: ['Find help', 'मदत पाहा'], villageFirst: ['Your village. Your services.', 'तुमचे गाव. तुमच्या सेवा.'], yourPanchayat: ['YOUR GRAM PANCHAYAT', 'तुमची ग्रामपंचायत'], placeLocation: ['Georai · Beed', 'गेवराई · बीड'], demoCitizen: ['Demo citizen', 'नमुना नागरिक'], footerDemo: ['Concept demo · No official submissions', 'संकल्पना डेमो · कोणताही शासकीय अर्ज पाठवला जात नाही'], apply: ['Apply now', 'अर्ज करा'], viewAll: ['View all services', 'सर्व सेवा पाहा'], reference: ['Request reference', 'अर्ज क्रमांक'], submitted: ['Submitted', 'अर्ज नोंदवला'], review: ['In review', 'पडताळणी सुरू'], action: ['Details needed', 'अधिक माहिती आवश्यक'], completed: ['Demo case complete', 'डेमो केस पूर्ण'], back: ['Back', 'मागे'], next: ['Continue', 'पुढे जा'], close: ['Close', 'बंद करा'], submit: ['Record demo request', 'डेमो अर्ज नोंदवा'], details: ['Details', 'माहिती'], view: ['View request', 'अर्ज पाहा'], cancel: ['Cancel', 'रद्द करा']
  };
  Object.assign(strings, {
    submitted: ['Received', 'अर्ज प्राप्त'], action: ['Information needed', 'अधिक माहिती हवी'],
    ready: ['Ready for delivery (demo)', 'डेमो प्रत वितरणासाठी तयार'],
    completed: ['Closed (demo)', 'डेमो केस बंद'], rejected: ['Rejected (demo)', 'डेमो अर्ज नामंजूर'],
    resolved: ['Resolved — confirmation needed', 'समस्या निकाली — पुष्टी हवी'],
    referred: ['Referred — next office', 'पुढील कार्यालयाकडे पाठवले']
  });
  const publicRoutes = new Set(['home', 'about', 'leadership', 'services', 'contact', 'people', 'help']);
  const citizenRoutes = new Set(['home', 'services', 'requests', 'track', 'people', 'help']);
  const adminRoutes = new Set(['queue', 'workspace', 'people', 'permissions']);
  const futureRoutes = new Set(['meetings', 'works', 'finance']);
  const requestedGP = new URL(location.href).searchParams.get('gp');
  const storedGP = String(read('activeGP', defaultGP));
  // A stale/out-of-scope link must not reuse a different saved GP implicitly.
  const initialGP = requestedGP !== null
    ? (registry.some(gp => gp.code === requestedGP) ? requestedGP : defaultGP)
    : (registry.some(gp => gp.code === storedGP) ? storedGP : defaultGP);
  const state = { lang: read('language', 'mr') === 'en' ? 'en' : 'mr', gp: initialGP, view: 'citizen', route: 'home', filter: 'all', query: '', peopleFilter: 'all', peopleQuery: '', officeFilter: 'all', officeQuery: '', lastTrack: null, draft: null, draftStep: 0, returnFocus: null };
  let configs = read('configs', null);
  if (!configs || typeof configs !== 'object' || !configs['171415']) {
    configs = {
      '171415': { officeName: 'Chaklamba GP office (demo)', officer: 'Sample office lead', help: 'Ask for help at the demo service desk.', services: [...defaults] },
      '171411': { officeName: 'Bhojgaon GP office (demo)', officer: 'Sample office lead', help: 'Ask for help at the demo service desk.', services: ['water', 'grievance', 'assessment'] }
    };
    write('configs', configs);
  }
  if (!registry.some(gp => gp.code === state.gp)) state.gp = defaultGP;
  const L = (en, mr) => state.lang === 'en' ? en : mr;
  const t = key => strings[key] ? L(...strings[key]) : key;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const icon = name => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
  const gpObject = code => registry.find(gp => gp.code === code) || seedRegistry[0];
  const gpName = (code = state.gp) => gpObject(code)[state.lang];
  const serviceById = id => services.find(service => service.id === id) || services[0];
  const serviceName = id => serviceById(id)[state.lang];
  const statusPill = status => `<span class="status-pill ${esc(status)}">${status === 'completed' ? icon('check') : '<span class="status-dot"></span>'}${t(status)}</span>`;
  const date = iso => new Intl.DateTimeFormat(state.lang === 'mr' ? 'mr-IN' : 'en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Kolkata' }).format(new Date(iso));
  const now = () => new Date().toISOString();
  const event = (status, note, actor = 'office') => ({ status, note, actor, at: now() });
  const sampleRequests = code => (window.GP_DEMO_CASES || [])
    .filter(sample => (configs[code]?.services || defaults).includes(sample.service))
    .map(sample => ({
      id: `DEMO-${code}-${sample.suffix}`, gp: code, sampleScenario: sample.key,
      service: sample.service, applicant: 'Demo Citizen', mobile: '', attachment: '',
      channel: sample.channel, status: sample.status, created: sample.created,
      location: sample.location.en, locationMr: sample.location.mr,
      details: sample.details.en, detailsMr: sample.details.mr,
      register: sample.register.en, registerMr: sample.register.mr,
      events: sample.events.map(item => ({ ...item, note: item.note.en, noteMr: item.note.mr }))
    }));
  // Stable scenario keys let new examples join older browser data without resetting it.
  // Numeric references can already belong to a user-created case: never overwrite them.
  function mergeSampleRequests(code, existing) {
    const records = [...existing];
    const usedIds = new Set(records.map(item => item.id.toUpperCase()));
    let added = 0; let changed = false;
    for (const sample of sampleRequests(code)) {
      if (records.some(item => item.sampleScenario === sample.sampleScenario)) continue;
      const legacyIndex = code === '171415' && Number(sample.id.split('-').at(-1)) <= 3
        ? records.findIndex(item => !item.sampleScenario && item.id === sample.id && item.service === sample.service && item.created === sample.created && item.applicant === sample.applicant) : -1;
      if (legacyIndex >= 0) { records[legacyIndex] = { ...records[legacyIndex], sampleScenario: sample.sampleScenario }; changed = true; continue; }
      let id = sample.id;
      if (usedIds.has(id.toUpperCase())) {
        let next = Math.max(0, ...records.map(item => Number(item.id.split('-').at(-1)) || 0)) + 1;
        do { id = `DEMO-${code}-${String(next++).padStart(3, '0')}`; } while (usedIds.has(id.toUpperCase()));
      }
      records.push({ ...sample, id }); usedIds.add(id.toUpperCase()); added++; changed = true;
    }
    return { records, added, changed };
  }
  const getRequests = (code = state.gp) => {
    if (!hasSession() || code !== authenticatedGP) return [];
    const data = read(`requests:${code}`, null);
    const records = Array.isArray(data) ? data.filter(item => item && item.gp === code && typeof item.id === 'string' && Array.isArray(item.events) && workflow.statuses.includes(item.status)) : [];
    if (code === '171415') {
      const result = mergeSampleRequests(code, records);
      if (!Array.isArray(data) || result.changed) write(`requests:${code}`, result.records);
      return result.records;
    }
    if (!Array.isArray(data)) write(`requests:${code}`, records);
    return records;
  };
  const saveRequests = data => hasSession() && write(`requests:${state.gp}`, data);
  const noteText = item => L(item?.note || '', item?.noteMr || item?.note || '');
  const findRequest = id => getRequests().find(item => item.id.toUpperCase() === String(id).trim().toUpperCase());
  const getServices = () => services.filter(service => (window.GPPortalAccess?.getGP(state.gp)?.services || configs[state.gp]?.services || defaults).includes(service.id));
  const root = document.getElementById('routeContent');
  const dialog = document.getElementById('appDialog');
  const modal = document.getElementById('modalContent');
  const printDialog = document.getElementById('printPreviewDialog');
  const printContent = document.getElementById('printPreviewContent');
  const certificateServices = new Set(['birth', 'death', 'marriage', 'assessment', 'nodues', 'bpl', 'niradhar']);
  let preparedPrint = null;
  let printReturnFocus = null;
  let toastTimer;
  let profileScroll = null;
  const rolePopover = document.getElementById('roleViewPopover');
  const roleControl = document.getElementById('activeRoleIndicator');
  function closeRolePopover() {
    if (rolePopover.matches(':popover-open')) rolePopover.hidePopover();
    roleControl.setAttribute('aria-expanded', 'false');
  }
  function positionRolePopover() {
    if (!rolePopover.matches(':popover-open')) return;
    const panel = rolePopover.getBoundingClientRect();
    // Keep anchored coordinates in layout pixels when CSS zoom scales the header.
    const scale = panel.width / rolePopover.offsetWidth || 1;
    rolePopover.style.maxWidth = Math.max(160, (window.innerWidth - 24) / scale) + 'px';
    const bounds = rolePopover.getBoundingClientRect();
    const anchor = roleControl.getBoundingClientRect();
    rolePopover.style.left = Math.max(12, Math.min(anchor.right - bounds.width, window.innerWidth - bounds.width - 12)) / scale + 'px';
    rolePopover.style.top = Math.max(12, Math.min(anchor.bottom + 8, window.innerHeight - bounds.height - 12)) / scale + 'px';
  }
  rolePopover.addEventListener('toggle', event => {
    const open = event.newState === 'open';
    roleControl.setAttribute('aria-expanded', String(open));
    if (open) { positionRolePopover(); rolePopover.querySelector('[aria-pressed="true"]')?.focus({ preventScroll: true }); }
  });
  window.addEventListener('resize', positionRolePopover);
  window.addEventListener('scroll', positionRolePopover, { passive: true });

  function toast(message) {
    const el = document.getElementById('toast'); el.textContent = message; el.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(() => { el.hidden = true; }, 4500);
  }
  const printAction = (kind, label, requestId = '') => `<button type="button" class="button secondary small" data-print-kind="${esc(kind)}" ${requestId ? `data-print-request="${esc(requestId)}"` : ''}>${icon('file')}${label}</button>`;
  function casePrintActions(request) {
    const format = window.GPPrinting?.getFormatInfo(request.service);
    const certificate = workflow.kindFor(request.service) === 'certificate';
    const output = workflow.canPrintCertificate(request) && format?.available;
    return `<div class="print-actions">${printAction('acknowledgement', L('Print acknowledgement', 'पोहोच छापा'), request.id)}${printAction('application', L('Print application', 'अर्ज छापा'), request.id)}${printAction('history', L('Print case history', 'अर्जाचा इतिहास छापा'), request.id)}${output ? printAction('certificate', L('View prepared demo output', 'तयार डेमो प्रत पाहा'), request.id) : ''}${certificate ? `<button type="button" class="button secondary small" data-format-service="${esc(request.service)}">${icon('file')}${L('View source-format specimen', 'मूळ नमुन्याचा डेमो पाहा')}</button>` : ''}${state.view === 'office' && request.service === 'assessment' ? printAction('assessment-register', L('View 2016 register reference', '२०१६ नोंदवहीचा नमुना पाहा'), request.id) : ''}</div>`;
  }
  function clearPrintPreview() {
    if (printDialog.open) printDialog.close();
    preparedPrint = null; printContent.replaceChildren(); window.GPPrinting?.clear();
  }
  function openPrintPreview(kind, requestId = '', service = '') {
    if (!authenticatedGP || state.gp !== authenticatedGP || !window.GPPrinting) return;
    if (['register', 'gp-profile', 'assessment-register'].includes(kind) && state.view !== 'office') return;
    if (kind === 'citizen-list' && state.view !== 'citizen') return;
    if (!['acknowledgement', 'application', 'history', 'certificate', 'format', 'register', 'citizen-list', 'gp-profile', 'assessment-register'].includes(kind)) return;
    const request = requestId ? findRequest(requestId) : null;
    if (['acknowledgement', 'application', 'history', 'certificate', 'assessment-register'].includes(kind) && !request) return;
    if (kind === 'assessment-register' && request.service !== 'assessment') return;
    if (kind === 'certificate' && (!workflow.canPrintCertificate(request) || !window.GPPrinting.supportsCertificate(request.service))) return;
    if (kind === 'format' && (!certificateServices.has(service) || !getServices().some(item => item.id === service))) return;
    const gp = gpObject(state.gp);
    const district = registryDistricts.find(item => item.code === gp.districtCode);
    const samiti = registrySamitis.find(item => item.code === gp.samitiCode);
    const requests = kind === 'register' ? visibleOfficeRequests() : getRequests();
    preparedPrint = window.GPPrinting.renderDocument({
      kind, lang: state.lang, service: service || request?.service, request, requests,
      filter: [(state.officeFilter === 'all' ? L('All requests', 'सर्व अर्ज') : t(state.officeFilter)), ...(kind === 'register' && state.officeQuery.trim() ? [L('Search: ', 'शोध: ') + state.officeQuery.trim()] : [])].join(' · '),
      gp: { code: state.gp, name: gpName(), en: gp.en, mr: gp.mr, state: 'Maharashtra', district: district?.[state.lang] || district?.en || '', samiti: samiti?.[state.lang] || samiti?.en || '', officeName: configs[state.gp]?.officeName || '', services: getServices().map(item => item[state.lang]) }
    });
    printReturnFocus = document.activeElement;
    printContent.innerHTML = `<header class="modal-header"><div><span class="eyebrow">${esc(gpName())} · GP ${state.gp}</span><h2 id="printPreviewTitle">${esc(preparedPrint.title)}</h2><p>${L('DEMO preview · Check the source/version shown on the document.', 'डेमो नमुना · कागदपत्रावरील स्रोत आणि आवृत्ती तपासा.')}</p></div><button type="button" class="icon-button" data-close-print aria-label="${t('close')}">${icon('close')}</button></header><div class="print-preview-body">${preparedPrint.html}</div><footer class="modal-footer"><button type="button" class="button secondary" data-close-print>${t('close')}</button><button type="button" class="button primary" id="printPreparedDocument">${icon('file')}${L('Print document', 'कागदपत्र छापा')}</button></footer>`;
    if (!printDialog.open) printDialog.showModal();
  }
  function translateShell() {
    const signedIn = hasSession(), isAdmin = signedIn && state.view === 'office';
    document.documentElement.lang = state.lang;
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    const labels = { home: L('Home', 'मुख्यपृष्ठ'), about: L('Our villages', 'आपली गावे'), leadership: L('Leadership & team', 'पदाधिकारी व कर्मचारी'), contact: L('Contact & visit', 'संपर्क व भेट'), explore: L('Explore another Panchayat', 'दुसरी ग्रामपंचायत पाहा'), preferences: L('Website preferences', 'संकेतस्थळ पसंती') };
    document.querySelectorAll('[data-shell-label]').forEach(el => { el.textContent = labels[el.dataset.shellLabel] || ''; });
    shell.dataset.authState = signedIn ? 'signed-in' : 'anonymous';
    shell.dataset.activeGp = state.gp; shell.dataset.authenticatedGp = authenticatedGP || ''; shell.dataset.page = state.route;
    portalRoot.dataset.role = isAdmin ? 'admin' : signedIn ? 'citizen' : 'anonymous';
    root.dataset.role = portalRoot.dataset.role; root.dataset.route = state.route;
    document.getElementById('mainContent').dataset.role = portalRoot.dataset.role; document.getElementById('mainContent').dataset.route = state.route;
    document.getElementById('shellGPName').textContent = gpName();
    const district = registryDistricts.find(item => item.code === gpObject(state.gp).districtCode);
    const samiti = registrySamitis.find(item => item.code === gpObject(state.gp).samitiCode);
    document.querySelector('.place-location').textContent = [samiti?.[state.lang] || samiti?.en, district?.[state.lang] || district?.en].filter(Boolean).join(' · ');
    document.getElementById('sidebarDistrict').textContent = [district?.[state.lang] || district?.en, L('Maharashtra', 'महाराष्ट्र')].filter(Boolean).join(' · ');
    document.getElementById('shellLogin').hidden = signedIn; document.getElementById('shellLogin').textContent = L('Login', 'लॉगिन');
    document.getElementById('profileButton').hidden = !signedIn;
    document.getElementById('profileButton').setAttribute('aria-label', L('Open your profile', 'माझे खाते उघडा'));
    document.querySelector('.profile-caption').textContent = L('Profile', 'माझे खाते');
    document.querySelector('.user-label').textContent = signedIn ? sessionUsername : '';
    document.querySelector('.user-avatar').textContent = isAdmin ? L('A', 'प्र') : L('C', 'ना');
    const roleBadge = document.getElementById('activeRoleIndicator');
    roleBadge.hidden = !signedIn;
    const roleLabel = isAdmin ? L('Admin view', 'प्रशासक दृश्य') : L('Citizen view', 'नागरिक दृश्य');
    const previewNote = L('Demo role preview for the same signed-in account; official permissions are not verified.', 'त्याच प्रवेश केलेल्या खात्याची डेमो भूमिका; अधिकृत परवानग्या पडताळलेल्या नाहीत.');
    roleBadge.innerHTML = icon(isAdmin ? 'shield' : 'users') + '<span>' + esc(roleLabel) + '</span><svg class="icon role-badge-chevron" aria-hidden="true"><use href="#i-chevron"/></svg>';
    roleBadge.title = previewNote; roleBadge.setAttribute('aria-label', roleLabel + '. ' + previewNote);
    document.getElementById('rolePreviewNote').textContent = previewNote;
    document.querySelectorAll('.view-switch [data-view]').forEach(button => { const active = button.dataset.view === state.view; button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active)); });
    document.getElementById('citizenNav').hidden = !signedIn || isAdmin;
    document.getElementById('adminNav').hidden = !isAdmin; document.getElementById('adminFutureModules').hidden = !isAdmin;
    document.getElementById('citizenSidebarHelp').hidden = true; document.getElementById('adminSidebarNote').hidden = !isAdmin;
    document.getElementById('roleNavHeading').hidden = !signedIn;
    document.getElementById('roleNavHeading').textContent = isAdmin ? t('adminNavigation') : L('Your account', 'तुमचे खाते');
    document.getElementById('sidebarRoleContext').textContent = isAdmin ? t('adminContext') : t('citizenService');
    const count = signedIn ? getRequests().length : '';
    document.getElementById('requestCount').textContent = count; document.getElementById('adminRequestCount').textContent = count;
    document.querySelectorAll('#sidebar [data-route], #sidebar [data-admin-route], #sidebar [data-placeholder]').forEach(button => {
      const active = (button.dataset.route || button.dataset.adminRoute || button.dataset.placeholder) === state.route;
      button.classList.toggle('active', active); if (active) button.setAttribute('aria-current', 'page'); else button.removeAttribute('aria-current');
    });
    publicController?.update({ gpCode: state.gp, lang: state.lang, signedIn, role: state.view });
    document.getElementById('sharedFooter').innerHTML = publicController?.footer({ gpCode: state.gp, lang: state.lang, signedIn, role: state.view }) || '';
    document.title = gpName() + ' · ' + t('brand') + ' · Demo';
    siteSearchController?.update();
    syncWorkspaceNavigation();
  }
  const breadcrumb = label => `<div class="breadcrumb">${esc(gpName())}<span>/</span>${label}<span class="gp-code">GP ${state.gp}</span></div>`;
  const titleBlock = (title, description, extra = '') => `<div class="page-heading"><div><h1 class="page-title">${title}</h1><p class="page-intro">${description}</p></div>${extra}</div>`;

  const peopleContext = () => ({ gpCode: state.gp, gpName: gpName(), lang: state.lang, filter: state.peopleFilter, query: state.peopleQuery });
  function renderPeople() {
    root.innerHTML = `${breadcrumb(t('people'))}${titleBlock(L('People behind your Panchayat.', 'तुमच्या ग्रामपंचायतीतील पदाधिकारी व कर्मचारी.'), L('Find representatives, officers and the right team for your query.', 'तुमच्या प्रश्नासाठी लोकप्रतिनिधी, अधिकारी आणि संबंधित कर्मचारी यांची माहिती पाहा.'))}${window.GPPeople?.render(peopleContext()) || emptyContent(L('Directory could not load', 'संपर्क यादी उघडता आली नाही'), L('Keep all prototype files together and reload.', 'सर्व डेमो फाईल एकत्र ठेवून पुन्हा उघडा.'), 'users')}`;
  }
  function updatePeopleResults() {
    const results = document.getElementById('peopleResults');
    if (!results) return;
    results.innerHTML = window.GPPeople.results(peopleContext());
    document.querySelectorAll('[data-people-filter]').forEach(button => { const active = button.dataset.peopleFilter === state.peopleFilter; button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active)); });
  }
  function openPerson(id) {
    const content = window.GPPeople?.profile(peopleContext(), id);
    if (!content) return;
    openDialog(`${modalHeader(L('Person & contact details', 'व्यक्ती आणि संपर्काची माहिती'))}<div class="modal-body">${content}</div><footer class="modal-footer"><button type="button" class="button secondary" data-close>${t('close')}</button></footer>`);
  }

  function serviceCard(service) {
    return `<button type="button" class="service-card" data-service-id="${service.id}"><span class="service-card-head"><span class="service-icon ${service.tone}">${icon(service.icon)}</span><span class="service-card-copy"><span class="service-tag">${L(service.category === 'local' ? 'LOCAL SERVICE' : 'CERTIFICATES & RECORDS', service.category === 'local' ? 'स्थानिक सेवा' : 'दाखले व नोंदी')}</span><strong>${esc(service[state.lang])}</strong></span></span><span class="service-meta">${esc(L(...service.desc))}</span><span class="service-bottom"><span>${hasSession() ? (service.id === 'grievance' ? L('Report an issue', 'समस्या नोंदवा') : t('apply')) : L('View service', 'सेवा पाहा')}</span>${icon('arrow')}</span></button>`;
  }
  function trackingForm(compact = false) {
    return `<form id="trackingForm" class="tracking-form"><label for="trackingId">${t('reference')}</label><div class="input-action"><input id="trackingId" name="trackingId" placeholder="DEMO-${state.gp}-001" autocomplete="off" required><button type="submit" class="button primary ${compact ? 'icon-only' : ''}" aria-label="${t('track')}">${compact ? icon('arrow') : t('track')}</button></div><p class="field-hint">${L('Use the reference on your demo acknowledgement.', 'डेमो पावतीवरील अर्ज क्रमांक वापरा.')}</p></form><div id="trackingError" class="inline-error" role="alert" hidden></div>`;
  }
  function requestRow(request) {
    return `<button type="button" class="request-row" data-request-id="${esc(request.id)}"><span class="request-row-icon">${icon(serviceById(request.service).icon)}</span><span class="request-main"><strong>${esc(serviceName(request.service))}</strong><small>${esc(request.id)} · ${date(request.created)}</small></span>${statusPill(request.status)}${icon('chevron')}</button>`;
  }
  function renderServices() {
    root.innerHTML = `${breadcrumb(t('allServices'))}${titleBlock(L('What would you like to do?', 'तुम्हाला कोणती सेवा हवी?'), L('Browse services and guidance. Login only when you want to apply.', 'सेवा आणि मार्गदर्शन पाहा. अर्ज करायचा असेल तेव्हाच लॉगिन करा.'))}<div class="catalog-toolbar"><label class="search-box" for="serviceSearch">${icon('search')}<input type="search" id="serviceSearch" placeholder="${L('Search certificates, water, complaints…', 'दाखले, पाणी, समस्या शोधा…')}" value="${esc(state.query)}"></label><div class="filter-pills" role="group" aria-label="Service category">${[['all', L('All services', 'सर्व सेवा')], ['certificates', L('Certificates & records', 'दाखले व नोंदी')], ['local', L('Local services', 'स्थानिक सेवा')]].map(([id, label]) => `<button type="button" data-filter="${id}" class="filter-pill ${state.filter === id ? 'active' : ''}" aria-pressed="${state.filter === id}">${label}</button>`).join('')}</div></div><div class="services-grid" id="serviceResults"></div><div class="info-note">${icon('help')}<p>${L('This demonstration shows request intake. Actual service availability, documents, fees and issuing authority need GP verification before launch.', 'या डेमोमध्ये अर्ज नोंदणी दाखवली आहे. प्रत्यक्ष सेवा, कागदपत्रे, शुल्क आणि अधिकारी ग्रामपंचायतीने सुरू करण्यापूर्वी तपासणे आवश्यक आहे.')}</p></div>`;
    updateServiceResults();
  }
  function updateServiceResults() {
    const query = state.query.trim().toLowerCase();
    const results = getServices().filter(service => (state.filter === 'all' || service.category === state.filter) && `${service.en} ${service.mr} ${service.desc.join(' ')}`.toLowerCase().includes(query));
    document.getElementById('serviceResults').innerHTML = results.length ? results.map(serviceCard).join('') : `<div class="panel empty-span">${emptyContent(L('No matching service', 'जुळणारी सेवा नाही'), L('Try another word or select All services.', 'दुसरा शब्द वापरा किंवा सर्व सेवा निवडा.'), 'search')}</div>`;
  }
  const emptyContent = (title, description, symbol = 'file') => `<div class="empty-state"><span class="empty-icon">${icon(symbol)}</span><h3>${title}</h3><p>${description}</p></div>`;
  function renderRequests() {
    const requests = getRequests();
    root.innerHTML = `${breadcrumb(t('myRequests'))}${titleBlock(t('myRequests'), L('Sample activity for the currently selected Panchayat.', 'सध्या निवडलेल्या ग्रामपंचायतीतील नमुना अर्ज.'), `<button type="button" class="button primary" data-route="services">${icon('plus')}${L('New request', 'नवीन अर्ज')}</button>`)}<div class="panel"><div class="section-header"><h2>${L('Request history', 'अर्जांचा तपशील')} <span class="count-badge">${requests.length}</span></h2><span class="demo-inline">${L('Sample citizen workspace', 'नमुना नागरिक खाते')}</span></div><div class="request-list">${requests.length ? [...requests].reverse().map(requestRow).join('') : emptyContent(L('No requests yet', 'अद्याप अर्ज नाहीत'), L('Start with a certificate or a local service request.', 'दाखला किंवा स्थानिक सेवेसाठी अर्ज करा.'))}</div></div>`;
  }
  function timeline(request) {
    const actions = {
      approved: ['Demo decision approved', 'डेमो निर्णय मंजूर'],
      'output-prepared': ['Demo output prepared', 'डेमो प्रत तयार केली'],
      delivered: ['Demo delivery recorded', 'डेमो वितरण नोंदवले'],
      'response-received': ['Clarification received — resubmitted', 'अधिक माहिती प्राप्त — पुन्हा सादर'],
      'issue-unresolved': ['Problem still reported — reopened', 'समस्या कायम — पुन्हा पडताळणीत'],
      'resolution-confirmed': ['Resolution confirmation recorded', 'समस्या सुटल्याची पुष्टी नोंदवली'],
      'information-requested': ['Information requested', 'अधिक माहिती मागितली'],
      'review-started': ['Review started', 'पडताळणी सुरू केली']
    };
    return `<ol class="timeline">${request.events.map(item => `<li class="timeline-item"><span class="timeline-dot ${esc(item.status)}">${icon(item.status === 'completed' ? 'check' : item.actor === 'citizen' ? 'file' : 'clock')}</span><div class="timeline-content"><strong>${actions[item.action] ? L(...actions[item.action]) : t(item.status)}</strong><small>${date(item.at)} · ${item.actor === 'citizen' ? t('citizen') : t('office')}</small><p>${esc(noteText(item))}</p></div></li>`).join('')}</ol>`;
  }
  function workflowSummary(request) {
    const local = workflow.kindFor(request.service) === 'local';
    const nextSteps = {
      submitted: L('The office first checks the request and its jurisdiction.', 'कार्यालय प्रथम अर्ज आणि संबंधित कार्यक्षेत्र तपासेल.'),
      review: L('The office checks the relevant sample record before making a decision.', 'निर्णयापूर्वी कार्यालय संबंधित नमुना नोंद तपासेल.'),
      action: L('Read the specific question and send the requested sample details.', 'मागितलेली माहिती वाचा आणि नमुना तपशील पाठवा.'),
      ready: L('A demo decision and output are recorded. Delivery still needs a separate entry.', 'डेमो निर्णय व प्रत नोंदवली आहे. वितरणाची स्वतंत्र नोंद बाकी आहे.'),
      resolved: L('The office recorded work done. Confirm whether the problem is resolved.', 'कार्यालयाने केलेली कृती नोंदवली आहे. समस्या सुटली का ते कळवा.'),
      rejected: L('Read the recorded reasons and the applicable appeal guidance below.', 'नोंदवलेली कारणे आणि खालील अपील मार्गदर्शन वाचा.'),
      referred: L('Follow up with the named office. A referral does not mean the service was delivered.', 'नमूद कार्यालयाकडे पाठपुरावा करा. पुढे पाठवणे म्हणजे सेवा मिळाली असे नाही.'),
      completed: request.delivery ? L('A separate demo delivery entry is recorded below.', 'खाली स्वतंत्र डेमो वितरण नोंद आहे.') : request.confirmation ? L('The recorded resolution was confirmed before closure.', 'केस बंद करण्यापूर्वी समस्या सुटल्याची पुष्टी नोंदवली आहे.') : L('Legacy demo closure: decision and delivery were not recorded. No approval or receipt has been added.', 'जुनी डेमो बंद नोंद: निर्णय किंवा वितरण नोंदलेले नाही. मंजुरी किंवा पोहोच नव्याने गृहीत धरलेली नाही.')
    };
    const rows = [];
    const add = (label, value) => { if (value !== undefined && value !== null && value !== '') rows.push([label, value]); };
    if (request.verification) add(L('Sample verification reference', 'नमुना पडताळणी संदर्भ'), request.verification.reference);
    if (request.decision) {
      add(L('Decision', 'निर्णय'), request.decision.outcome === 'approved' ? L('Approved — demo only', 'मंजूर — फक्त डेमो') : L('Rejected — demo only', 'नामंजूर — फक्त डेमो'));
      add(L('Decision reason', 'निर्णयाचे कारण'), request.decision.reason);
      add(L('Decision authority', 'निर्णय प्राधिकरण'), request.decision.authority);
      if (request.decision.at) add(L('Decision date', 'निर्णय दिनांक'), date(request.decision.at));
    }
    if (request.output?.prepared) {
      add(L('Demo output reference — not a register number', 'डेमो प्रतीचा संदर्भ — मूळ नोंद क्रमांक नाही'), request.output.reference);
      add(L('Source-format ID', 'स्रोत नमुना क्रमांक'), request.output.formatId);
    }
    if (request.delivery) {
      const mode = { counter: L('Counter handover', 'कार्यालयातून दिले'), post: L('Post / dispatch', 'टपाल / जावक'), download: L('Electronic delivery', 'इलेक्ट्रॉनिक वितरण') }[request.delivery.mode] || request.delivery.mode;
      add(L('Demo delivery method', 'डेमो वितरण पद्धत'), mode);
      add(L('Sample recipient', 'नमुना स्वीकारणारा'), request.delivery.recipient);
      add(L('Delivery reference', 'वितरण संदर्भ'), request.delivery.reference);
      if (request.delivery.at) add(L('Delivery recorded', 'वितरण नोंद दिनांक'), date(request.delivery.at));
    }
    if (request.referral) add(L('Referred to', 'पुढे पाठवलेले कार्यालय'), request.referral.to);
    if (request.resolution) add(L('Work / resolution recorded', 'केलेली कृती / उपाय'), request.resolution.note);
    if (request.confirmation) {
      add(L('Confirmed by', 'पुष्टी कोणी दिली'), request.confirmation.by === 'citizen' ? t('citizen') : L('Office recording citizen confirmation', 'नागरिकांची पुष्टी नोंदवणारे कार्यालय'));
      add(L('Confirmation', 'पुष्टी'), request.confirmation.note);
    }
    const appeal = request.decision?.appeal;
    return `<section class="workflow-summary" aria-label="${L('Progress and next action', 'प्रक्रिया आणि पुढची कृती')}"><p class="workflow-path">${local ? L('Receive → Check → Work / refer → Confirm', 'अर्ज → तपासणी → कृती / पुढे पाठवा → पुष्टी') : L('Receive → Verify → Decide → Prepare → Deliver', 'अर्ज → पडताळणी → निर्णय → प्रत → वितरण')}</p><strong>${L('What happens next', 'पुढची कृती')}</strong><p>${nextSteps[request.status] || ''}</p>${rows.length ? `<dl class="workflow-records">${rows.map(([label, value]) => `<div><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`).join('')}</dl>` : ''}${request.service === 'niradhar' ? `<p class="workflow-warning">${L('No source-verified Niradhar age-output format is configured. This software gap does not decide eligibility or justify refusal. The office can continue review or refer for competent handling.', 'निराधार वयाच्या दाखल्याचा पडताळलेला नमुना उपलब्ध नाही. सॉफ्टवेअरची ही उणीव म्हणजे पात्रतेचा निर्णय किंवा नकाराचे कारण नाही. कार्यालय पडताळणी सुरू ठेवू शकते किंवा सक्षम कार्यालयाकडे पाठवू शकते.')}</p>` : ''}${!local ? `<p class="workflow-clock-note">${L('Legal service clock not configured: current documents, calendar and local authority need verification. Asking for information does not automatically pause or reset a deadline.', 'कायदेशीर सेवा कालगणना जोडलेली नाही: सध्याची कागदपत्रे, दिनदर्शिका व स्थानिक अधिकारी पडताळणे बाकी आहे. अधिक माहिती मागितल्याने मुदत आपोआप थांबत किंवा नव्याने सुरू होत नाही.')}</p>` : `<p class="workflow-clock-note">${L('Operational request: no statutory RTS service deadline is configured for this case.', 'स्थानिक सेवा अर्ज: या केससाठी अधिसूचित लोकसेवा मुदत जोडलेली नाही.')}</p>`}${appeal ? `<aside class="workflow-appeal"><strong>${L('Appeal guidance — not filed by this demo', 'अपील मार्गदर्शन — डेमोतून दाखल होत नाही')}</strong><dl class="workflow-records"><div><dt>${L('First appellate authority', 'प्रथम अपील अधिकारी')}</dt><dd>${esc(appeal.authority)}</dd></div><div><dt>${L('Contact / verification limit', 'संपर्क / पडताळणी मर्यादा')}</dt><dd>${esc(appeal.contact)}</dd></div><div><dt>${L('Filing period reference', 'अपील मुदतीचा संदर्भ')}</dt><dd>${esc(appeal.period)}</dd></div></dl><a href="https://rdd.maharashtra.gov.in/en/right-to-public-services-act/" target="_blank" rel="noopener noreferrer">${L('Official RDD service and appeal information', 'विभागाचे अधिकृत सेवा व अपील मार्गदर्शन')}</a></aside>` : ''}</section>`;
  }
  function resolutionReply(request) {
    if (state.view !== 'citizen' || request.status !== 'resolved' || workflow.kindFor(request.service) !== 'local') return '';
    return `<form id="resolutionReplyForm" class="workflow-response" data-id="${esc(request.id)}" data-gp="${state.gp}"><h3>${L('Did this resolve the problem?', 'तुमची समस्या सुटली का?')}</h3><div class="form-field"><label for="resolutionChoice">${L('Your response', 'तुमचा प्रतिसाद')}</label><select id="resolutionChoice" required><option value="confirm">${L('Yes — confirm resolution', 'होय — समस्या सुटली')}</option><option value="problem">${L('The problem is still present', 'समस्या अद्याप आहे')}</option></select></div><div class="form-field"><label for="resolutionNote">${L('Sample response', 'नमुना प्रतिसाद')} *</label><textarea id="resolutionNote" minlength="5" maxlength="500" required></textarea></div><div id="resolutionError" class="inline-error" role="alert" hidden></div><button type="submit" class="button primary">${L('Record my response', 'माझा प्रतिसाद नोंदवा')}</button></form>`;
  }
  function requestDetail(request, compact = false) {
    return `${casePrintActions(request)}<div class="request-detail"><div class="detail-top"><div><span class="field-overline">${t('reference')}</span><h3 class="receipt-id">${esc(request.id)}</h3></div>${statusPill(request.status)}</div><h2>${esc(serviceName(request.service))}</h2><p class="muted">${esc(gpName())} · GP ${state.gp} · ${esc(request.applicant)}</p><p class="field-hint">${L('Application channel', 'अर्जाचा मार्ग')}: <strong>${request.channel === 'assisted' ? L('Office-assisted (demo)', 'कार्यालयाच्या मदतीने (डेमो)') : L('Citizen online (demo)', 'नागरिकांचा ऑनलाइन अर्ज (डेमो)')}</strong>${request.location ? `<br>${L('Location', 'ठिकाण')}: ${esc(L(request.location, request.locationMr || request.location))}` : ''}</p><div class="info-note small-note">${icon('file')}<p>${esc(L(request.details, request.detailsMr || request.details))}</p></div>${workflowSummary(request)}${request.status === 'action' && state.view === 'citizen' ? `<div class="action-needed"><strong>${L('The office needs a little more information.', 'कार्यालयाला अधिक माहिती हवी आहे.')}</strong><p>${esc(noteText(request.events.at(-1)))}</p><button type="button" class="button primary small" data-reply="${esc(request.id)}">${L('Send clarification', 'अधिक माहिती पाठवा')}${icon('arrow')}</button></div>` : ''}${resolutionReply(request)}<h3 class="subheading">${L('What happened so far', 'आतापर्यंतची प्रक्रिया')}</h3>${timeline(request)}${!compact ? `<button type="button" class="button secondary" data-download="${esc(request.id)}">${icon('download')}${L('Download demo acknowledgement', 'डेमो पावती डाउनलोड करा')}</button>` : ''}</div>`;
  }
  function renderTrack() {
    root.innerHTML = `${breadcrumb(t('track'))}${titleBlock(L('Know where your request stands.', 'तुमच्या अर्जाची स्थिती जाणून घ्या.'), L('Updates and the next action, in one place.', 'प्रक्रियेची माहिती आणि पुढची पायरी, एकाच ठिकाणी.'))}<div class="track-layout"><section class="panel tracking-card"><h2>${L('Find your request', 'तुमचा अर्ज शोधा')}</h2><p>${L('Showing records only for', 'फक्त या ग्रामपंचायतीतील नोंदी')} <strong>${esc(gpName())}</strong> · GP ${state.gp}</p>${trackingForm()}<div class="sample-reference"><span>${L('Try a sample', 'नमुना क्रमांक')}</span><button type="button" class="text-button" id="useSample">${esc(getRequests()[0]?.id || L('No sample in this GP', 'या ग्रामपंचायतीत नमुना नाही'))}</button></div></section><section class="panel" id="trackingResult" aria-live="polite">${state.lastTrack && findRequest(state.lastTrack) ? requestDetail(findRequest(state.lastTrack)) : emptyContent(L('A clearer picture, at every step.', 'प्रत्येक टप्प्याची स्पष्ट माहिती.'), L('Enter a demo reference to see its timeline and any action needed.', 'अर्ज क्रमांक टाका आणि प्रक्रिया व आवश्यक माहिती पाहा.'), 'clock')}</section></div>`;
  }
  function renderHelp() {
    root.innerHTML = `${breadcrumb(t('help'))}${titleBlock(L('You do not have to figure it out alone.', 'मदतीसाठी आम्ही आहोत.'), L('A simple guide to using your Panchayat service portal.', 'ग्रामपंचायत सेवा पोर्टल वापरण्याचे सोपे मार्गदर्शन.'))}<div class="help-grid"><section class="panel"><span class="service-icon sage">${icon('file')}</span><h2>${L('Apply in three small steps', 'तीन सोप्या पायऱ्यांत अर्ज')}</h2><ol class="help-steps"><li>${L('Choose the service you need.', 'हवी असलेली सेवा निवडा.')}</li><li>${L('Add sample applicant and request details.', 'नमुना अर्जदार व अर्जाची माहिती भरा.')}</li><li>${L('Save the demo reference and follow updates.', 'डेमो अर्ज क्रमांक जतन करा आणि स्थिती पाहा.')}</li></ol><button type="button" class="button primary" data-route="services">${t('allServices')}${icon('arrow')}</button></section><section class="panel"><span class="service-icon sand">${icon('users')}</span><h2>${L('Prefer help at the office?', 'कार्यालयाची मदत हवी?')}</h2><p>${L('An assisted journey helps an operator record a request with the citizen. This button demonstrates that channel with sample details.', 'कार्यालयातील कर्मचाऱ्याच्या मदतीने अर्ज करता येईल. या बटणातून नमुना माहितीसह तो पर्याय पाहा.')}</p><button type="button" class="button secondary" data-assisted="birth">${L('Try an assisted demo request', 'मदतीने अर्ज करण्याचा डेमो पाहा')}</button><p class="field-hint">${L('No office hours, phone number or live helpdesk is asserted in this prototype.', 'या डेमोमध्ये प्रत्यक्ष कार्यालयीन वेळा, दूरध्वनी किंवा मदत केंद्र जोडलेले नाही.')}</p></section><section class="panel"><span class="service-icon blue">${icon('search')}</span><h2>${L('Asked for more details?', 'अधिक माहिती मागितली आहे?')}</h2><p>${L('Open your request, read the office note and send a clarification. The updated timeline shows what you sent.', 'अर्ज उघडा, कार्यालयाची सूचना वाचा आणि अधिक माहिती पाठवा. ती अर्जाच्या प्रक्रियेत दिसेल.')}</p><button type="button" class="text-button" data-route="requests">${t('myRequests')}${icon('arrow')}</button></section></div>`;
  }
  function renderPlaceholder(module) {
    if (!hasSession() || state.view !== 'office') { navigate('home'); return; }
    const copy = { meetings: [L('Gram Sabha & resolutions', 'ग्रामसभा व ठराव'), L('Meeting notices, agendas, approved minutes and action tracking.', 'बैठकीच्या सूचना, अजेंडा, मंजूर इतिवृत्त आणि कृतींचा पाठपुरावा.')], works: [L('Village development', 'विकासकामे'), L('Development plans, works, progress and assets.', 'विकास आराखडे, कामांची प्रगती आणि मालमत्ता.')], finance: [L('Taxes & finance', 'कर व अर्थव्यवस्था'), L('Verified demands, authorized payments, budgets and accounts.', 'पडताळलेली मागणी, अधिकृत देयके, अंदाजपत्रक आणि लेखे.')] }[module];
    root.innerHTML = `${breadcrumb(L('Future module', 'भावी विभाग'))}<section class="panel placeholder-panel"><span class="service-icon sand">${icon(module === 'finance' ? 'coins' : module === 'works' ? 'home' : 'users')}</span><span class="demo-inline">${L('PLACEHOLDER · NEXT PHASE', 'पुढील टप्पा · फक्त संकल्पना')}</span><h1 class="page-title">${copy[0]}</h1><p>${copy[1]}</p><p class="muted">${L('This lean demo focuses on citizen requests, office follow-up and GP information. This module is intentionally a placeholder.', 'या लहान डेमोचा भर नागरिकांचे अर्ज, कार्यालयीन पाठपुरावा आणि ग्रामपंचायत माहितीवर आहे. हा विभाग पुढील टप्प्यासाठी ठेवला आहे.')}</p><button type="button" class="button primary" data-route="home">${state.view === 'office' ? L('Return to request queue', 'अर्जांच्या यादीकडे परत जा') : L('Return to citizen services', 'नागरिक सेवांकडे परत जा')}${icon('arrow')}</button></section>`;
  }
  const officeQueryKey = value => String(value ?? '').normalize('NFKC').toLocaleLowerCase('mr').replace(/\s+/g, ' ').trim();
  function visibleOfficeRequests() {
    if (!hasSession() || state.view !== 'office') return [];
    const terms = officeQueryKey(state.officeQuery).split(' ').filter(Boolean);
    return getRequests().filter(request => {
      if (state.officeFilter !== 'all' && request.status !== state.officeFilter) return false;
      const service = serviceById(request.service);
      const searchable = officeQueryKey([request.id, request.applicant, request.service, service.en, service.mr, ...service.desc, request.register, request.registerMr, request.location, request.locationMr, request.channel, request.channel === 'assisted' ? 'office assisted कार्यालयाच्या मदतीने' : 'citizen नागरिक', request.status, ...(strings[request.status] || [])].filter(Boolean).join(' '));
      return terms.every(term => searchable.includes(term));
    }).reverse();
  }
  function officeQueueTable(requests) {
    if (!requests.length) {
      const hasFilters = state.officeQuery.trim() || state.officeFilter !== 'all';
      return emptyContent(hasFilters ? L('No matching requests', 'जुळणारे अर्ज नाहीत') : L('No requests in this queue', 'या यादीत अर्ज नाहीत'), hasFilters ? L('Try another name, reference or service, or change the status filter.', 'दुसरे नाव, अर्ज क्रमांक किंवा सेवा शोधा; अथवा स्थितीचा फिल्टर बदला.') : L('New citizen requests for this GP will appear here.', 'या ग्रामपंचायतीचे नागरिक अर्ज येथे दिसतील.'));
    }
    return `<div class="table-wrap"><table class="queue-table"><thead><tr><th>${t('reference')}</th><th>${L('Service / applicant', 'सेवा / अर्जदार')}</th><th>${L('Status', 'स्थिती')}</th><th><span class="sr-only">${t('view')}</span></th></tr></thead><tbody>${requests.map(request => `<tr data-queue-request="${esc(request.id)}"><td><strong>${esc(request.id)}</strong><small>${date(request.created)}</small></td><td><strong>${esc(serviceName(request.service))}</strong><small>${esc(request.applicant)}${request.channel === 'assisted' ? ` · ${L('Office-assisted', 'कार्यालयाच्या मदतीने')}` : ''}</small></td><td>${statusPill(request.status)}</td><td><button type="button" class="button secondary small" data-request-id="${esc(request.id)}">${L('Review', 'पडताळा')}${icon('chevron')}</button></td></tr>`).join('')}</tbody></table></div>`;
  }
  function updateOfficeResults() {
    if (!hasSession() || state.view !== 'office' || state.route !== 'queue') return;
    const results = document.getElementById('officeQueueResults');
    if (!results) return;
    const requests = visibleOfficeRequests();
    results.innerHTML = officeQueueTable(requests);
    document.getElementById('officeResultCount').textContent = L(requests.length + ' of ' + getRequests().length + ' GP requests', getRequests().length + ' पैकी ' + requests.length + ' ग्रामपंचायत अर्ज');
    document.getElementById('clearOfficeSearch').hidden = !state.officeQuery;
    document.getElementById('officeQueuePanel').dataset.resultCount = String(requests.length);
  }
  function renderOffice() {
    const requests = getRequests();
    const partitions = [
      { id: 'received', states: ['submitted'], label: L('Received', 'प्राप्त अर्ज'), icon: 'file' },
      { id: 'progress', states: ['review'], label: L('In progress', 'प्रक्रिया सुरू'), icon: 'clock' },
      { id: 'waiting', states: ['action', 'ready', 'resolved', 'referred'], label: L('Waiting / next action', 'पुढची कृती बाकी'), icon: 'chat' },
      { id: 'closed', states: ['completed', 'rejected'], label: L('Closed / decided', 'बंद / निर्णय नोंदवले'), icon: 'check' }
    ];
    root.innerHTML = `${breadcrumb(t('office'))}${titleBlock(L('Review citizen requests.', 'नागरिकांचे अर्ज तपासा.'), L('Admin view: check records, record a reasoned decision and track the next action.', 'प्रशासक विभाग: नोंदी तपासा, कारणासह निर्णय नोंदवा आणि पुढची कृती पाहा.'), `<span class="demo-inline">${L('Admin demo workspace', 'प्रशासक डेमो कार्यालय')}</span>`)}<div class="stats-grid">${partitions.map(partition => `<div class="stat-card" data-queue-partition="${partition.id}"><span class="stat-icon ${partition.id}">${icon(partition.icon)}</span><span><strong>${requests.filter(request => partition.states.includes(request.status)).length}</strong><small>${partition.label}</small></span></div>`).join('')}</div><section class="panel office-queue-panel" id="officeQueuePanel" aria-labelledby="officeQueueTitle"><header class="queue-toolbar"><div class="queue-heading"><h2 id="officeQueueTitle">${L('Service request queue', 'सेवा अर्जांची यादी')}</h2><p id="officeResultCount" role="status" aria-live="polite" aria-atomic="true"></p></div><div class="queue-search">${icon('search')}<label class="sr-only" for="officeSearch">${L('Search requests by applicant name, reference number or service', 'अर्जदाराचे नाव, अर्ज क्रमांक किंवा सेवेनुसार अर्ज शोधा')}</label><input type="search" id="officeSearch" autocomplete="off" maxlength="160" value="${esc(state.officeQuery)}" placeholder="${L('Name, reference or service…', 'नाव, अर्ज क्रमांक किंवा सेवा…')}" aria-describedby="officeResultCount"><button type="button" class="queue-search-clear" id="clearOfficeSearch" aria-label="${L('Clear request search', 'अर्जांचा शोध रिकामा करा')}" hidden>${icon('close')}</button><button type="button" class="queue-search-filter" id="officeFilterButton" aria-controls="officeFilter" aria-haspopup="listbox" aria-label="${L('Filter requests by status', 'स्थितीनुसार अर्ज निवडा')}">${icon('settings')}</button></div><div class="queue-status"><label class="sr-only" for="officeFilter">${L('Filter requests by status', 'स्थितीनुसार अर्ज निवडा')}</label><select id="officeFilter">${['all', ...workflow.statuses].map(status => `<option value="${status}" ${state.officeFilter === status ? 'selected' : ''}>${status === 'all' ? L('All requests', 'सर्व अर्ज') : t(status)}</option>`).join('')}</select></div></header><div id="officeQueueResults" aria-describedby="officeResultCount"></div><p class="field-hint queue-followup-note">${L('Waiting includes information, delivery, confirmation and referral follow-up. A referral is not a fulfilled service.', 'माहिती, वितरण, पुष्टी आणि पुढे पाठवलेल्या अर्जांचा पाठपुरावा पुढची कृती म्हणून दिसतो. पुढे पाठवणे म्हणजे सेवा पूर्ण नाही.')}</p></section><div class="info-note">${icon('shield')}<p>${L('Review actions are simulated. No official certificate is signed or issued, and no real officer access is provisioned.', 'या कृती फक्त डेमोसाठी आहेत. कोणत्याही अधिकृत प्रमाणपत्रावर सही किंवा वितरण होत नाही आणि प्रत्यक्ष अधिकारी खाते तयार होत नाही.')}</p></div>`;
    updateOfficeResults();
  }
  function renderAdminWorkspace() {
    const gp = gpObject(state.gp);
    const district = registryDistricts.find(item => item.code === gp.districtCode);
    const samiti = registrySamitis.find(item => item.code === gp.samitiCode);
    const region = registryStates[0];
    const office = configs[state.gp];
    const identityLabel = (item, code) => item ? `${item[state.lang] || item.en} · ${code}` : code || L('Not mapped in this snapshot', 'या निर्देशिकेत नोंद नाही');
    const rows = [
      [L('Gram Panchayat', 'ग्रामपंचायत'), gpName()],
      [L('GP code', 'ग्रामपंचायत क्रमांक'), gp.code],
      [L('State', 'राज्य'), identityLabel(region, region?.code)],
      [L('District', 'जिल्हा'), identityLabel(district, gp.districtCode)],
      [L('Panchayat Samiti', 'पंचायत समिती'), identityLabel(samiti, gp.samitiCode)],
      [L('Office name (sample)', 'कार्यालयाचे नाव (नमुना)'), office.officeName],
      [L('Signed-in demo account', 'प्रवेश केलेले डेमो खाते'), sessionUsername],
      [L('Directory snapshot', 'निर्देशिकेची तारीख'), window.GP_DEMO_REGISTRY?.snapshot || '2026-11-07']
    ];
    root.innerHTML = `${breadcrumb(t('adminWorkspace'))}${titleBlock(L('Your GP workspace, at a glance.', 'तुमच्या ग्रामपंचायत कार्यालयाची माहिती.'), L('Read-only identity and service setup for the signed-in Gram Panchayat.', 'प्रवेश केलेल्या ग्रामपंचायतीची ओळख आणि सेवांची माहिती. येथे बदल करता येत नाही.'), `<button type="button" id="workspaceQueueLink" class="button secondary" data-admin-route="queue">${icon('file')}${t('adminQueue')}</button>`)}
      <section id="adminWorkspace" class="panel admin-workspace-panel">
        <div class="section-header"><h2>${L('Panchayat identity', 'ग्रामपंचायतीची ओळख')}</h2><span class="demo-inline">${L('READ ONLY · DEMO', 'फक्त वाचन · डेमो')}</span></div>
        <dl class="admin-profile-grid">${rows.map(([label, value]) => `<div><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`).join('')}</dl>
        <div id="workspaceAuthorityStatus" class="admin-authority-note">${icon('shield')}<div><strong>${L('Official authority: verification pending', 'अधिकृत अधिकार: पडताळणी बाकी')}</strong><p>${L('Directory identity and a demo sign-in do not verify an officer appointment or permission to issue services.', 'निर्देशिकेतील ओळख आणि डेमो प्रवेश म्हणजे अधिकाऱ्याची नियुक्ती किंवा सेवा वितरणाची परवानगी पडताळलेली नाही.')}</p></div></div>
      </section>
      <section class="panel admin-services-panel"><div class="section-header"><h2>${L('Enabled demo services', 'डेमोमधील उपलब्ध सेवा')}</h2><span class="count-badge">${getServices().length}</span></div><div class="admin-service-list">${getServices().map(service => `<span class="admin-service-chip">${icon(service.icon)}${esc(service[state.lang])}</span>`).join('')}</div><p class="field-hint">${L('This menu is illustrative. Real service rules, fees, documents and issuing authority require verification before launch.', 'ही नमुना यादी आहे. प्रत्यक्ष वापरापूर्वी सेवा नियम, शुल्क, कागदपत्रे आणि वितरण अधिकार तपासणे आवश्यक आहे.')}</p></section>
      ${window.GPVillages?.render({ gpCode: state.gp, lang: state.lang }) || ''}
      <section class="panel admin-services-panel" id="sampleDataPanel"><div class="section-header"><h2>${L('Sample cases for your walkthrough', 'डेमोसाठी नमुना अर्ज')}</h2><span class="demo-inline">${L('FICTIONAL DATA', 'काल्पनिक माहिती')}</span></div><p>${L('Add a small set of certificate, property, water, village-issue and assisted-service examples for the services enabled in this GP. Existing requests and updates are kept.', 'या ग्रामपंचायतीतील उपलब्ध सेवांसाठी दाखले, मालमत्ता, पाणी, गावातील समस्या आणि मदतीने केलेल्या अर्जांचे काही नमुने जोडा. सध्याचे अर्ज आणि सूचना जतन होतील.')}</p><button type="button" id="loadDemoScenarios" class="button secondary">${icon('plus')}${L('Add sample cases', 'नमुना अर्ज जोडा')}</button></section>
      <div class="admin-workspace-actions"><button type="button" class="button primary" data-admin-route="queue">${L('Review citizen requests', 'नागरिकांचे अर्ज तपासा')}${icon('arrow')}</button><button type="button" id="returnCitizenView" class="button secondary">${L('See Citizen view', 'नागरिक विभाग पाहा')}${icon('users')}</button></div>`;
  }
  function renderAdminPermissions() {
    root.innerHTML = `${breadcrumb(t('adminPermissions'))}${titleBlock(t('adminPermissions'), L('A preview of the role model to validate before a real launch.', 'प्रत्यक्ष वापरापूर्वी पडताळायच्या भूमिकांची संकल्पना.'))}<section id="adminPermissions" class="panel admin-permissions-panel"><span class="demo-inline">${L('PLACEHOLDER · NO USER MANAGEMENT', 'फक्त संकल्पना · वापरकर्ता व्यवस्थापन नाही')}</span><h2>${L('Role views for this discussion', 'या चर्चेसाठी भूमिका')}</h2><div class="admin-role-comparison"><div><span class="service-icon sage">${icon('users')}</span><h3>${t('citizen')}</h3><p>${L('Discover services, submit sample requests, track progress and send clarifications.', 'सेवा शोधा, नमुना अर्ज करा, स्थिती पाहा आणि अधिक माहिती पाठवा.')}</p></div><div><span class="service-icon sand">${icon('shield')}</span><h3>${t('office')}</h3><p>${L('Review the selected GP’s queue, explain status updates and inspect its workspace details.', 'निवडलेल्या ग्रामपंचायतीचे अर्ज तपासा, स्थितीची सूचना द्या आणि कार्यालयाची माहिती पाहा.')}</p></div></div><p class="info-note">${L('These role buttons are presentation controls. Verified appointments, staff permissions and server-side access checks are future production work. No accounts or real permissions can be assigned here.', 'ही भूमिका बटणे फक्त सादरीकरणासाठी आहेत. नियुक्ती पडताळणी, कर्मचाऱ्यांच्या परवानग्या आणि सर्व्हरवरील प्रवेश तपासणी प्रत्यक्ष प्रणालीत करावी लागेल. येथे खाती किंवा प्रत्यक्ष परवानग्या देता येत नाहीत.')}</p><button type="button" class="button secondary" data-admin-route="queue">${t('adminQueue')}${icon('arrow')}</button></section>`;
  }
  function render(focus = false) {
    translateShell(); root.hidden = authOpen; enrollmentRoot.hidden = !authOpen;
    if (authOpen) { root.replaceChildren(); delete root.dataset.home; document.querySelector('.skip-link').href = '#enrollmentRoot'; return; }
    document.querySelector('.skip-link').href = '#mainContent';
    if (['home', 'about', 'leadership', 'contact'].includes(state.route)) {
      root.innerHTML = publicController?.render(state.route, { gpCode: state.gp, lang: state.lang }) || '';
      if (state.route === 'home') root.dataset.home = 'shared'; else delete root.dataset.home;
    } else {
      delete root.dataset.home;
      if (state.route === 'services') renderServices();
      else if (state.route === 'people') renderPeople();
      else if (state.route === 'help') renderHelp();
      else if (!hasSession()) { state.route = 'home'; root.innerHTML = publicController?.render('home') || ''; }
      else if (state.view === 'office') {
        if (state.route === 'workspace') renderAdminWorkspace();
        else if (state.route === 'permissions') renderAdminPermissions();
        else if (futureRoutes.has(state.route)) renderPlaceholder(state.route);
        else renderOffice();
      } else ({ requests: renderRequests, track: renderTrack }[state.route] || renderServices)();
    }
    const pagePrint = hasSession() && state.view === 'office' && state.route === 'queue' ? printAction('register', L('Print office register', 'कार्यालयीन यादी छापा')) : hasSession() && state.view === 'office' && state.route === 'workspace' ? printAction('gp-profile', L('Print GP file cover', 'ग्रामपंचायत फाईलचे मुखपृष्ठ छापा')) : hasSession() && state.view === 'citizen' && state.route === 'requests' ? printAction('citizen-list', L('Print my requests', 'माझ्या अर्जांची यादी छापा')) : '';
    if (pagePrint) root.querySelector('.page-heading')?.insertAdjacentHTML('beforeend', '<div class="print-actions">' + pagePrint + '</div>');
    if (focus) { root.focus({ preventScroll: true }); window.scrollTo({ top: 0, behavior: 'instant' }); }
  }
  function navigate(route) {
    closeRolePopover(); clearPrintPreview(); closeDialog(); publicController?.closeDialogs();
    if (authOpen) {
      if (enrollmentController?.suspend() === false) return;
      authOpen = false;
      // Leaving Login cancels the pending application.
      pendingIntent = null;
    }
    if (publicRoutes.has(route)) state.route = route;
    else if (!hasSession()) { showAuthentication({ gpCode: state.gp, route }); return; }
    else {
      const allowed = state.view === 'office' ? adminRoutes : citizenRoutes;
      state.route = allowed.has(route) || (state.view === 'office' && futureRoutes.has(route)) ? route : 'home';
    }
    closeMobileNav(); render(true);
  }
  function switchRole(view) {
    if (!hasSession() || !['citizen', 'office'].includes(view)) return;
    closeRolePopover(); clearPrintPreview(); closeDialog(); publicController?.closeDialogs(); modal.replaceChildren(); state.draft = null;
    state.view = view; state.route = 'home'; state.officeFilter = 'all'; state.officeQuery = ''; closeMobileNav(); render(true);
  }
  function switchGP(code, view = state.view) {
    if (!configs[code] || code !== authenticatedGP) return;
    clearPrintPreview(); closeDialog(); state.gp = code; state.lastTrack = null; state.officeFilter = 'all'; state.officeQuery = ''; state.query = ''; state.view = view; state.route = 'home'; write('activeGP', code); render(true);
  }
  function openDialog(content) { closeRolePopover(); const wasOpen = dialog.open; if (!wasOpen) state.returnFocus = document.activeElement; modal.innerHTML = content; if (!wasOpen) dialog.showModal(); else { const first = modal.querySelector('#applicantName, #dialogTitle'); if (first) { first.tabIndex = first.tagName === 'INPUT' ? 0 : -1; first.focus(); } } }
  function closeDialog() { if (dialog.open) dialog.close(); }
  const modalHeader = (title, subtitle = '') => `<header class="modal-header"><div><span class="eyebrow">${esc(gpName())} · GP ${state.gp}</span><h2 id="dialogTitle">${title}</h2>${subtitle ? `<p>${subtitle}</p>` : ''}</div><button type="button" class="icon-button dialog-close" data-close aria-label="${t('close')}">${icon('close')}</button></header>`;
  function openProfile() {
    if (!authenticatedGP || state.gp !== authenticatedGP) return;
    profileScroll = { x: window.scrollX, y: window.scrollY, trackingValue: document.getElementById('trackingId')?.value };
    openDialog(`${modalHeader(L('Your profile', 'माझे खाते'))}<form id="profileForm"><div class="modal-body"><div class="profile-summary"><strong>${esc(sessionUsername)}</strong>${esc(gpName())} · GP ${state.gp}<br>${t(state.view === 'office' ? 'office' : 'citizen')} · ${L('Demo view', 'डेमो')}</div><div class="form-field"><label for="profileLanguage">${L('Preferred language', 'पसंतीची भाषा')}</label><select id="profileLanguage" name="language" required><option value="mr" ${state.lang === 'mr' ? 'selected' : ''}>मराठी (Marathi)</option><option value="en" ${state.lang === 'en' ? 'selected' : ''}>English (इंग्रजी)</option></select><p class="field-hint">${L('Your current page and request history stay in place. This preference belongs to this demo account in the open tab.', 'सध्याचे पृष्ठ आणि अर्जांचा इतिहास कायम राहील. ही पसंती उघड्या टॅबमधील या डेमो खात्यासाठी आहे.')}</p></div><section class="profile-account-section" aria-labelledby="profileAccountActions"><h3 id="profileAccountActions">${L('Account actions', 'खात्याच्या कृती')}</h3><div class="profile-account-actions"><button type="button" class="button secondary" id="portalSignOut">${L('Sign out', 'बाहेर पडा')}${icon('arrow')}</button><button type="button" class="button secondary" id="resetDemo">${icon('refresh')}${L('Reset demo', 'डेमो रीसेट करा')}</button></div><p class="field-hint">${L('Choose the appropriate GP and use its provided demo sign-in. GP provisioning belongs to portal IT before go-live. Reset asks before clearing this site’s fictional cases and preferences; portal IT setup and GP readiness stay in place.', 'योग्य ग्रामपंचायत निवडून तिचे दिलेले डेमो लॉगिन वापरा. प्रत्यक्ष वापरापूर्वी पोर्टल IT कडून ग्रामपंचायतीची पूर्वतयारी केली जाते. काल्पनिक अर्ज व पसंती काढण्यापूर्वी पुष्टी मागितली जाते; पोर्टल IT ची पूर्वतयारी आणि ग्रामपंचायतीची तयार स्थिती कायम राहते.')}</p></section></div><footer class="modal-footer"><button type="button" class="button secondary" data-close>${t('cancel')}</button><button type="submit" id="saveProfileLanguage" class="button primary">${L('Save preferences', 'पसंती जतन करा')}</button></footer></form>`);
  }
  function publicServiceGuidance(service) {
    const local = service.category === 'local';
    return '<span class="service-icon ' + service.tone + '">' + icon(service.icon) + '</span><p class="modal-lead">' + esc(L(...service.desc)) + '</p><h3>' + L('What you can prepare', 'कोणती माहिती तयार ठेवावी') + '</h3><ul class="detail-list"><li>' + L('Applicant name and a brief explanation of your request.', 'अर्जदाराचे नाव आणि अर्जाची थोडक्यात माहिती.') + '</li><li>' + (local ? L('Location or landmark and a clear description of the issue.', 'ठिकाण किंवा खूण आणि समस्येचा स्पष्ट तपशील.') : L('Existing entry or assessment reference, if available.', 'उपलब्ध असल्यास नोंद किंवा मालमत्ता आकारणी क्रमांक.')) + '</li><li>' + L('The office must confirm current documents, fees, authority and availability.', 'सध्याची कागदपत्रे, शुल्क, अधिकारी व उपलब्धता कार्यालयाने निश्चित करावी.') + '</li></ul>' + (service.id === 'assessment' ? '<p class="info-note">' + L('An assessment extract is a tax record, not a title deed or building permission.', 'आकारणी उतारा ही कर नोंद आहे; मालकीहक्काचा दस्त किंवा बांधकाम परवानगी नाही.') + '</p>' : '') + (service.id === 'niradhar' ? '<p class="info-note">' + L('The age-certificate format is not verified in this demo. This does not establish ineligibility or remove an entitlement.', 'या डेमोमध्ये वयाच्या दाखल्याचा नमुना पडताळलेला नाही. त्यामुळे अपात्रता किंवा हक्काचा अभाव सिद्ध होत नाही.') + '</p>' : '') + '<div class="info-note">' + icon('help') + '<p>' + L('Browse guidance without an account. Login is required only to record a sample application. No government submission, payment or official certificate is made.', 'खात्याशिवाय मार्गदर्शन पाहा. नमुना अर्ज नोंदवण्यासाठीच लॉगिन आवश्यक आहे. शासकीय अर्ज, शुल्क किंवा अधिकृत प्रमाणपत्र तयार होत नाही.') + '</p></div>';
  }
  function openService(id, channel = 'citizen', guidanceOnly = false) {
    const service = services.find(item => item.id === id);
    if (!service || !getServices().some(item => item.id === id)) return;
    if (guidanceOnly || !hasSession() || state.view !== 'citizen') {
      openDialog(modalHeader(esc(service[state.lang]), L('Service guidance', 'सेवेचे मार्गदर्शन')) + '<div class="modal-body" data-public-service="' + esc(id) + '">' + publicServiceGuidance(service) + '</div><footer class="modal-footer"><button type="button" class="button secondary" data-close>' + t('close') + '</button><button type="button" class="button primary" data-apply-service="' + esc(id) + '" data-channel="' + esc(channel) + '">' + (hasSession() ? L('Apply as Citizen', 'नागरिक म्हणून अर्ज करा') : L('Login to apply', 'अर्जासाठी लॉगिन करा')) + icon('arrow') + '</button></footer>');
      return;
    }
    state.draft = { service: id, applicant: L('Demo Citizen', 'नमुना नागरिक'), mobile: '', location: L('Ward 2 (sample)', 'प्रभाग २ (नमुना)'), details: '', register: '', attachment: '', channel };
    state.draftStep = 0; renderApplication();
  }
  function applyForService(id, channel = 'citizen') {
    if (!services.some(item => item.id === id)) return;
    if (!hasSession()) { showAuthentication({ gpCode: state.gp, serviceId: id, channel, route: 'services' }); return; }
    state.view = 'citizen'; state.route = 'services'; closeDialog(); render(); openService(id, channel);
  }
  function renderApplication() {
    const draft = state.draft; const service = serviceById(draft.service); const local = service.category === 'local';
    const steps = [L('Service', 'सेवा'), L('Your details', 'तुमची माहिती'), L('Review', 'पुनरावलोकन')];
    let body = '';
    if (state.draftStep === 0) body = `<span class="service-icon ${service.tone}">${icon(service.icon)}</span><p class="modal-lead">${esc(L(...service.desc))}</p><h3>${L('What you can prepare', 'कोणती माहिती तयार ठेवावी')}</h3><ul class="detail-list"><li>${L('Applicant name and a brief explanation of your request.', 'अर्जदाराचे नाव आणि अर्जाची थोडक्यात माहिती.')}</li><li>${local ? L('Location or landmark and a clear description of the issue.', 'ठिकाण किंवा खूण आणि समस्येचा स्पष्ट तपशील.') : L('Existing entry or assessment reference, if available.', 'उपलब्ध असल्यास नोंद किंवा मालमत्ता आकारणी क्रमांक.')}</li><li>${L('The office will explain any additional verification needed.', 'अधिक पडताळणी लागल्यास कार्यालय माहिती देईल.')}</li></ul>${service.id === 'assessment' ? `<p class="info-note">${L('An assessment extract is a tax record, not a title deed or building permission.', 'आकारणी उतारा ही कर नोंद आहे; मालकीहक्काचा दस्त किंवा बांधकाम परवानगी नाही.')}</p>` : ''}<div class="info-note">${icon('help')}<p>${L('Use sample information only. This prototype does not submit to government or issue certificates.', 'फक्त नमुना माहिती वापरा. या डेमोतून शासकीय अर्ज किंवा प्रमाणपत्र वितरण होत नाही.')}</p></div>`;
    if (state.draftStep === 1) body = `<form id="applicationForm"><div class="field-grid"><div class="form-field"><label for="applicantName">${L('Applicant name (sample)', 'अर्जदाराचे नाव (नमुना)')} *</label><input id="applicantName" name="applicantName" value="${esc(draft.applicant)}" minlength="2" maxlength="80" autocomplete="off" required></div><div class="form-field"><label for="applicantMobile">${L('Mobile (optional)', 'मोबाईल (ऐच्छिक)')}</label><input id="applicantMobile" name="applicantMobile" value="${esc(draft.mobile)}" type="tel" inputmode="numeric" pattern="[0-9]{10}" maxlength="10" placeholder="${L('Leave blank for demo', 'डेमोसाठी रिकामे ठेवा')}" autocomplete="off"></div></div><div class="form-field"><label for="applicationLocation">${L('Location / ward / landmark', 'ठिकाण / प्रभाग / खूण')}${local ? ' *' : ''}</label><input id="applicationLocation" name="applicationLocation" value="${esc(draft.location)}" maxlength="150" ${local ? 'required' : ''}></div>${!local ? `<div class="form-field"><label for="registerReference">${L('Existing record reference (optional)', 'आधीचा नोंद क्रमांक (ऐच्छिक)')}</label><input id="registerReference" value="${esc(draft.register)}" maxlength="100" placeholder="${L('If known', 'माहित असल्यास')}"></div>` : ''}<div class="form-field"><label for="applicationDetails">${L('Tell us what you need', 'तुमची गरज थोडक्यात सांगा')} *</label><textarea id="applicationDetails" name="applicationDetails" minlength="5" maxlength="1000" required placeholder="${local ? L('Describe a sample water or maintenance issue…', 'पाणी किंवा दुरुस्तीची नमुना समस्या लिहा…') : L('For example: a sample request for a registered certificate copy.', 'उदा.: नोंदणीकृत प्रमाणपत्राच्या प्रतीसाठी नमुना अर्ज. अनुक्रमांक असल्यास नमूद करा.')}">${esc(draft.details)}</textarea></div><label class="upload-box" for="applicationAttachment">${icon('upload')}<span><strong>${L('Optional sample attachment', 'ऐच्छिक नमुना कागदपत्र')}</strong><small>${esc(draft.attachment || L('Do not select personal documents. Only a filename is kept in the demo.', 'वैयक्तिक कागदपत्र निवडू नका. डेमोमध्ये फक्त फाईलचे नाव दिसेल.'))}</small></span><input id="applicationAttachment" type="file" accept=".pdf,.png,.jpg,.jpeg,.txt"></label></form>`;
    if (state.draftStep === 2) body = `<h3>${L('Please check your demo request.', 'तुमचा डेमो अर्ज तपासा.')}</h3><dl class="review-list">${[[L('Service', 'सेवा'), service[state.lang]], [L('Panchayat', 'ग्रामपंचायत'), `${gpName()} · ${state.gp}`], [L('Applicant', 'अर्जदार'), draft.applicant], [L('Location', 'ठिकाण'), draft.location || '—'], [L('Channel', 'अर्जाचा मार्ग'), draft.channel === 'assisted' ? L('Office assisted (demo)', 'कार्यालयाच्या मदतीने (डेमो)') : t('citizen')], [L('Details', 'माहिती'), draft.details], ...(draft.attachment ? [[L('Sample filename', 'नमुना फाईल'), draft.attachment]] : [])].map(([label, value]) => `<div class="review-row"><dt>${label}</dt><dd>${esc(value)}</dd></div>`).join('')}</dl><div class="info-note">${icon('shield')}<p>${L('You will get a DEMO reference. No fee is collected and no official application is submitted.', 'तुम्हाला DEMO अर्ज क्रमांक मिळेल. कोणतेही शुल्क घेतले जात नाही आणि अधिकृत अर्ज पाठवला जात नाही.')}</p></div>`;
    openDialog(`${modalHeader(esc(service[state.lang]), draft.channel === 'assisted' ? L('Assisted service preview', 'कार्यालयाच्या मदतीने अर्जाचा डेमो') : L('A simple request, step by step.', 'टप्प्याटप्प्याने सोपा अर्ज.'))}<div class="modal-stepper">${steps.map((label, index) => `<span class="${index === state.draftStep ? 'active' : ''}" ${index === state.draftStep ? 'aria-current="step"' : ''}><b>${index + 1}</b>${label}</span>`).join('')}</div><div class="modal-body">${body}</div><footer class="modal-footer"><button type="button" class="button secondary" id="applicationBack">${state.draftStep ? t('back') : t('cancel')}</button>${state.draftStep === 1 ? `<button type="submit" form="applicationForm" class="button primary" id="applicationNext">${t('next')}${icon('arrow')}</button>` : `<button type="button" class="button primary" id="applicationNext">${state.draftStep === 2 ? t('submit') : L('Start demo request', 'डेमो अर्ज सुरू करा')}${icon(state.draftStep === 2 ? 'check' : 'arrow')}</button>`}</footer>`);
    if (state.draftStep === 0 && certificateServices.has(draft.service)) dialog.querySelector('.modal-body').insertAdjacentHTML('beforeend', `<div class="print-actions"><button type="button" class="button secondary" data-format-service="${esc(draft.service)}">${icon('file')}${draft.service === 'niradhar' ? L('Check certificate format status', 'दाखल्याच्या नमुन्याची स्थिती पाहा') : L('Preview source-based sample format', 'शासकीय स्रोतावर आधारित नमुना पाहा')}</button></div>`);
  }
  function collectDraft() {
    const form = document.getElementById('applicationForm'); if (!form) return;
    state.draft.applicant = form.querySelector('#applicantName').value.trim(); state.draft.mobile = form.querySelector('#applicantMobile').value.trim(); state.draft.location = form.querySelector('#applicationLocation').value.trim(); state.draft.details = form.querySelector('#applicationDetails').value.trim(); state.draft.register = form.querySelector('#registerReference')?.value.trim() || '';
    const file = form.querySelector('#applicationAttachment').files[0]; if (file) state.draft.attachment = file.name;
  }
  function submitRequest() {
    if (state.view !== 'citizen' || !authenticatedGP || state.gp !== authenticatedGP) return;
    if (!state.draft || state.draftStep !== 2) return;
    const requests = getRequests(); const next = Math.max(0, ...requests.map(request => Number(request.id.split('-').at(-1)) || 0)) + 1;
    const id = `DEMO-${state.gp}-${String(next).padStart(3, '0')}`;
    const request = { ...state.draft, id, gp: state.gp, created: now(), status: 'submitted', events: [event('submitted', L('Demo request recorded. No government submission was made.', 'डेमो अर्ज नोंदवला. शासकीय अर्ज पाठवलेला नाही.'), 'citizen')] };
    requests.push(request); saveRequests(requests); state.draft = null; state.lastTrack = id; render();
    openDialog(`${modalHeader(L('Your demo request is recorded.', 'तुमचा डेमो अर्ज नोंदवला.'))}<div class="modal-body receipt-body"><span class="success-icon">${icon('check')}</span><p class="eyebrow">${L('KEEP YOUR REFERENCE', 'अर्ज क्रमांक जतन करा')}</p><h3 class="receipt-id" id="receiptReference" tabindex="-1">${esc(id)}</h3><p>${esc(serviceName(request.service))} · ${esc(gpName())}</p><p class="muted">${L('This is a demo acknowledgement, not an issued certificate or an official submission.', 'ही डेमो पावती आहे. अधिकृत प्रमाणपत्र किंवा शासकीय अर्जाची पावती नाही.')}</p></div><footer class="modal-footer"><button type="button" class="button secondary" data-download="${id}">${icon('download')}${L('Save acknowledgement', 'पावती जतन करा')}</button><button type="button" class="button primary" data-track-request="${id}">${t('track')}${icon('arrow')}</button></footer>`);
    document.getElementById('receiptReference').focus();
    dialog.querySelector('.modal-footer').insertAdjacentHTML('afterbegin', printAction('acknowledgement', L('Print acknowledgement', 'पोहोच छापा'), id));
  }
  function openRequest(id) {
    if (!authenticatedGP || state.gp !== authenticatedGP) return;
    const request = findRequest(id); if (!request) return;
    if (state.view !== 'office') { state.lastTrack = request.id; navigate('track'); return; }
    const next = workflow.allowedTransitions(request);
    const label = status => status === 'ready' ? L('Approve & prepare demo output', 'मंजुरी व डेमो प्रत तयार करा') : status === 'completed' ? request.status === 'ready' ? L('Record demo delivery', 'डेमो वितरण नोंदवा') : L('Close after confirmation', 'पुष्टीनंतर केस बंद करा') : status === 'review' && request.status === 'action' ? L('Record response received', 'प्रतिसाद मिळाल्याची नोंद करा') : status === 'review' && request.status === 'resolved' ? L('Problem still present — review again', 'समस्या कायम — पुन्हा तपासा') : t(status);
    openDialog(`${modalHeader(esc(serviceName(request.service)), `${esc(request.id)} · ${esc(request.applicant)}`)}<div class="modal-body">${requestDetail(request, true)}${next.length ? `<form id="statusForm" class="workflow-update-form" data-id="${esc(request.id)}" data-gp="${state.gp}"><h3 class="subheading">${L('Send the next update', 'पुढची स्थिती नोंदवा')}</h3><div class="form-field"><label for="statusSelect">${L('Next action', 'पुढची कृती')}</label><select id="statusSelect">${next.map(status => `<option value="${status}">${label(status)}</option>`).join('')}</select></div><div class="form-field"><label for="statusReason">${L('Reason / note for the citizen', 'नागरिकांसाठी कारण / सूचना')} *</label><textarea id="statusReason" minlength="5" maxlength="500" required placeholder="${L('Explain what was checked or which specific information is needed.', 'काय तपासले किंवा नेमकी कोणती माहिती हवी ते लिहा.')}"></textarea></div><div id="transitionFields" class="workflow-transition-fields"></div><div id="workflowError" class="inline-error" role="alert" hidden></div><button type="submit" class="button primary" id="saveStatus">${L('Save demo update', 'डेमो स्थिती जतन करा')}${icon('check')}</button></form>` : `<div class="info-note"><p>${L('No ordinary next action is available. The recorded history and guidance remain accessible. No official document was issued by the demo.', 'पुढची नियमित कृती उपलब्ध नाही. नोंदवलेला इतिहास व मार्गदर्शन पाहता येईल. डेमोतून अधिकृत कागदपत्र वितरित केलेले नाही.')}</p></div>`}</div><footer class="modal-footer"><button type="button" class="button secondary" data-close>${t('close')}</button></footer>`);
    if (next.length) updateTransitionFields(request, next[0]);
  }
  function updateTransitionFields(request, next) {
    const target = document.getElementById('transitionFields');
    if (!target) return;
    const field = (id, label, minimum, placeholder = '') => `<div class="form-field"><label for="${id}">${label} *</label><input id="${id}" minlength="${minimum}" maxlength="160" placeholder="${esc(placeholder)}" autocomplete="off" required></div>`;
    const check = (id, label) => `<label class="checkbox-row workflow-check"><input type="checkbox" id="${id}" required><span>${label}</span></label>`;
    let content = '';
    if (next === 'ready') content = `<p class="field-hint">${L('Record a demo decision only after checking the sample record. This prepares an unsigned demo output; delivery is a later action.', 'नमुना नोंद तपासून डेमो निर्णय नोंदवा. यात सही नसलेली डेमो प्रत तयार होईल; वितरण पुढची कृती आहे.')}</p>${check('recordChecked', L('I checked the relevant fictional sample record.', 'मी संबंधित काल्पनिक नमुना नोंद तपासली.'))}${field('verificationReference', L('Sample record / verification reference', 'नमुना नोंद / पडताळणी संदर्भ'), 3, 'DEMO-CHECK-001')}`;
    if (next === 'rejected') content = `<p class="field-hint">${L('Give the actual sample reason. A missing software template is not itself a lawful reason to refuse eligibility. This demo records guidance only; it files no appeal.', 'नमुना निर्णयाचे नेमके कारण द्या. सॉफ्टवेअरमध्ये नमुना नसणे हे पात्रता नाकारण्याचे कायदेशीर कारण नाही. डेमो फक्त मार्गदर्शन नोंदवतो; अपील दाखल करत नाही.')}</p><div class="form-field"><label for="appealAuthority">${L('First appellate authority — role reference', 'प्रथम अपील अधिकारी — पदाचा संदर्भ')}</label><input id="appealAuthority" value="${esc(L('Assistant Block Development Officer — dated 2019/2020 schedule', 'सहायक गटविकास अधिकारी — २०१९/२०२० अधिसूचनेचा संदर्भ'))}" readonly></div><div class="form-field"><label for="appealContact">${L('Local authority / contact verification', 'स्थानिक अधिकारी / संपर्क पडताळणी')}</label><textarea id="appealContact" rows="2" readonly>${L('Local officer name, address and contact are not configured — demo only. Obtain current official details before live use.', 'स्थानिक अधिकाऱ्याचे नाव, पत्ता व संपर्क जोडलेले नाहीत — फक्त डेमो. प्रत्यक्ष वापरापूर्वी सध्याची अधिकृत माहिती घ्या.')}</textarea></div><div class="form-field"><label for="appealPeriod">${L('Appeal period — legal reference', 'अपील मुदत — कायद्याचा संदर्भ')}</label><textarea id="appealPeriod" rows="2" readonly>${L('Act section 9(1): 30 days from receiving the rejection; sufficient-cause late admission is for the authority to assess. Verify live routing.', 'अधिनियम कलम ९(१): नकार प्राप्त झाल्यापासून ३० दिवस; उशिराचे योग्य कारण मान्य करणे अधिकाऱ्याच्या निर्णयात येते. प्रत्यक्ष मार्ग तपासा.')}</textarea></div>`;
    if (next === 'referred') content = `${field('referredTo', L('Office / agency for next handling (sample)', 'पुढील कार्यवाहीचे कार्यालय (नमुना)'), 3, L('Sample competent office', 'नमुना सक्षम कार्यालय'))}<p class="field-hint">${L('The note should explain the next step. Referral is not approval, delivery or a completed repair.', 'पुढची पायरी सूचनेत लिहा. पुढे पाठवणे म्हणजे मंजुरी, वितरण किंवा दुरुस्ती पूर्ण होणे नाही.')}</p>`;
    if (request.status === 'action' && next === 'review') content = `${check('responseReceived', L('A sample response was received at the office / counter.', 'कार्यालयात नमुना प्रतिसाद मिळाला आहे.'))}<p class="field-hint">${L('Use the note above to record the response; it returns to review without approving the request.', 'वरील सूचनेत मिळालेला प्रतिसाद लिहा. अर्ज पुन्हा पडताळणीत जाईल; मंजूर होणार नाही.')}</p>`;
    if (request.status === 'ready' && next === 'completed') content = `<p class="field-hint">${L('Record a separate fictional handover / electronic delivery. Opening or printing a document never fills this record.', 'स्वतंत्र काल्पनिक प्रत्यक्ष / इलेक्ट्रॉनिक वितरण नोंदवा. कागदपत्र उघडणे किंवा छापणे म्हणजे वितरण नाही.')}</p><div class="form-field"><label for="deliveryMode">${L('Demo delivery method', 'डेमो वितरण पद्धत')} *</label><select id="deliveryMode" required><option value="">${L('Choose a method', 'पद्धत निवडा')}</option><option value="counter">${L('Counter handover', 'कार्यालयातून दिले')}</option><option value="post">${L('Post / dispatch', 'टपाल / जावक')}</option><option value="download">${L('Electronic delivery', 'इलेक्ट्रॉनिक वितरण')}</option></select></div>${field('deliveryRecipient', L('Sample recipient', 'नमुना स्वीकारणारा'), 2, L('Demo citizen', 'नमुना नागरिक'))}${field('deliveryReference', L('Sample handover / delivery reference', 'नमुना वितरण / पोहोच संदर्भ'), 3, 'DEMO-DELIVERY-001')}`;
    if (request.status === 'resolved' && next === 'completed') content = `${check('resolutionConfirmed', L('A sample citizen confirmation was received and is recorded in the note.', 'नागरिकांची नमुना पुष्टी मिळाली असून ती सूचनेत नोंदवली आहे.'))}<p class="field-hint">${L('Do not assume satisfaction from the repair note alone.', 'फक्त दुरुस्तीची नोंद म्हणजे नागरिकांचे समाधान असे गृहीत धरू नका.')}</p>`;
    if (request.status === 'resolved' && next === 'review') content = `<p class="field-hint">${L('Record the specific report explaining why the problem is still present. The case returns to review.', 'समस्या अद्याप कशी आहे तो नेमका प्रतिसाद लिहा. केस पुन्हा पडताळणीत जाईल.')}</p>`;
    target.innerHTML = content;
    document.getElementById('statusReason').minLength = next === 'rejected' ? 10 : 5;
    document.getElementById('saveStatus').innerHTML = `${next === 'ready' ? L('Approve & prepare demo output', 'मंजुरी व डेमो प्रत तयार करा') : next === 'completed' && request.status === 'ready' ? L('Record demo delivery', 'डेमो वितरण नोंदवा') : L('Save demo update', 'डेमो स्थिती जतन करा')}${icon('check')}`;
    const error = document.getElementById('workflowError'); if (error) error.hidden = true;
  }
  function recordWorkflowUpdate(id, next, data, actor) {
    const requests = getRequests();
    const index = requests.findIndex(item => item.id === id && item.gp === authenticatedGP);
    if (index < 0) return { ok: false, error: L('No matching request in this GP.', 'या ग्रामपंचायतीत जुळणारा अर्ज नाही.') };
    const result = workflow.transition(requests[index], next, data, { actor, at: now() });
    if (result.ok) { requests[index] = result.record; saveRequests(requests); }
    return result;
  }
  function showWorkflowError(id, error) {
    const target = document.getElementById(id);
    if (target) { target.textContent = L('Update not saved: ', 'बदल जतन झाला नाही: ') + error; target.hidden = false; }
  }
  function statusTransitionData(request, next) {
    const note = document.getElementById('statusReason').value.trim();
    const data = { note };
    if (next === 'ready') {
      data.recordChecked = document.getElementById('recordChecked')?.checked === true;
      data.verificationReference = document.getElementById('verificationReference')?.value.trim() || '';
      data.formatAvailable = window.GPPrinting?.supportsCertificate(request.service) === true;
      data.formatId = window.GPPrinting?.getFormatInfo(request.service).formatId || '';
    }
    if (next === 'rejected') data.appeal = { authority: document.getElementById('appealAuthority').value, contact: document.getElementById('appealContact').value, period: document.getElementById('appealPeriod').value };
    if (next === 'referred') data.referredTo = document.getElementById('referredTo').value.trim();
    if (next === 'review' && ['action', 'resolved'].includes(request.status)) data.responseNote = note;
    if (request.status === 'ready' && next === 'completed') data.delivery = { mode: document.getElementById('deliveryMode').value, recipient: document.getElementById('deliveryRecipient').value.trim(), reference: document.getElementById('deliveryReference').value.trim() };
    if (request.status === 'resolved' && next === 'completed') data.confirmation = { by: 'office', note };
    return data;
  }
  function openReply(id) {
    if (state.view !== 'citizen' || !authenticatedGP || state.gp !== authenticatedGP) return;
    const request = findRequest(id); if (!request || request.status !== 'action') return;
    openDialog(`${modalHeader(L('Add the information requested.', 'मागितलेली माहिती द्या.'), esc(id))}<form id="replyForm" data-id="${esc(id)}" data-gp="${state.gp}"><div class="modal-body"><div class="info-note"><p>${esc(noteText(request.events.at(-1)))}</p></div><div class="form-field"><label for="citizenReply">${L('Your clarification (sample)', 'तुमची अधिक माहिती (नमुना)')} *</label><textarea id="citizenReply" minlength="5" maxlength="750" required></textarea></div><div id="replyError" class="inline-error" role="alert" hidden></div></div><footer class="modal-footer"><button type="button" class="button secondary" data-close>${t('cancel')}</button><button type="submit" class="button primary">${L('Send clarification', 'अधिक माहिती पाठवा')}${icon('arrow')}</button></footer></form>`);
  }
  function downloadAcknowledgement(id) {
    const request = findRequest(id); if (!request) return;
    const text = `DEMO ACKNOWLEDGEMENT / नमुना पावती\nNot an official application or certificate.\n\nReference: ${request.id}\nGP: ${gpObject(state.gp).en} (${state.gp})\nService: ${serviceById(request.service).en}\nApplicant: ${request.applicant}\nRecorded: ${request.created}\nStatus: ${request.status}\n\nThis browser-only prototype does not submit to government, collect fees or issue certificates.\n`;
    const url = URL.createObjectURL(new Blob(['\ufeff', text], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = `${request.id}-acknowledgement.txt`; link.click(); setTimeout(() => URL.revokeObjectURL(url), 500); toast(L('Demo acknowledgement saved.', 'डेमो पावती जतन केली.'));
  }
  let sidebarCollapsed = false; // Tab memory only; never changes role, route or case data.
  function measureWorkspaceHeader(entry) {
    if (portalRoot.hidden) return;
    const box = entry?.borderBoxSize;
    const height = (Array.isArray(box) ? box[0]?.blockSize : box?.blockSize) || Number.parseFloat(getComputedStyle(workspaceHeader).height) || workspaceHeader.offsetHeight;
    if (height > 0) {
      // CSS zoom scales viewport units too; fixed rails need the viewport in layout pixels.
      const scale = workspaceHeader.getBoundingClientRect().height / height || 1;
      workspaceShell.style.setProperty('--public-header-height', height + 'px');
      workspaceShell.style.setProperty('--workspace-header-height', height + 'px');
      workspaceShell.style.setProperty('--public-viewport-height', window.innerHeight / scale + 'px');
    }
  }
  function syncWorkspaceNavigation() {
    const sidebar = document.getElementById('sidebar');
    const menu = document.getElementById('menuToggle');
    const mobile = workspaceMobile.matches;
    const expanded = mobile ? sidebar.classList.contains('open') : !sidebarCollapsed;
    portalRoot.classList.toggle('sidebar-collapsed', sidebarCollapsed);
    shell.classList.toggle('sidebar-collapsed', sidebarCollapsed);
    sidebar.inert = mobile && !expanded;
    if (mobile && !expanded) sidebar.setAttribute('aria-hidden', 'true'); else sidebar.removeAttribute('aria-hidden');
    menu.setAttribute('aria-expanded', String(expanded));
    const label = mobile ? expanded ? L('Close navigation', 'मेनू बंद करा') : L('Open navigation', 'मेनू उघडा') : expanded ? L('Collapse navigation', 'मेनू लहान करा') : L('Expand navigation', 'मेनू विस्तृत करा');
    menu.setAttribute('aria-label', label); menu.title = label;
    sidebar.querySelectorAll('.nav-btn, .public-side-bottom button').forEach(button => {
      const label = button.hasAttribute('data-return-public') ? L('GP website', 'ग्रामपंचायत संकेतस्थळ') : button.querySelector('[data-i18n]')?.textContent || button.textContent.trim();
      button.setAttribute('aria-label', label); button.title = label;
    });
    const brand = document.querySelector('#portalRoot .brand');
    brand.setAttribute('aria-label', `${gpName()} · ${t('home')}`);
    measureWorkspaceHeader();
  }
  function closeMobileNav() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('mobileShade').hidden = true;
    syncWorkspaceNavigation();
  }
  function toggleWorkspaceNavigation() {
    if (workspaceMobile.matches) {
      const open = document.getElementById('sidebar').classList.toggle('open');
      document.getElementById('mobileShade').hidden = !open;
    } else sidebarCollapsed = !sidebarCollapsed;
    syncWorkspaceNavigation();
  }

  document.addEventListener('click', e => {
    const button = e.target.closest('button'); if (!button) return;
    if (button.hasAttribute('data-return-public')) { showPublicWebsite(); return; }
    if (button.hasAttribute('data-close-print')) { printDialog.close(); return; }
    if (button.id === 'printPreparedDocument') { if (preparedPrint && authenticatedGP && state.gp === authenticatedGP) window.GPPrinting?.print(preparedPrint); return; }
    if (button.id === 'officeFilterButton') { if (!hasSession() || state.view !== 'office') return; const select = document.getElementById('officeFilter'); select.focus(); if (typeof select.showPicker === 'function') { try { select.showPicker(); } catch (_) { /* Native focus/keyboard selection remains available. */ } } return; }
    if (button.id === 'clearOfficeSearch') { if (!hasSession() || state.view !== 'office') return; state.officeQuery = ''; document.getElementById('officeSearch').value = ''; updateOfficeResults(); document.getElementById('officeSearch').focus(); return; }
    if (button.dataset.printKind) { openPrintPreview(button.dataset.printKind, button.dataset.printRequest || ''); return; }
    if (button.dataset.formatService) { openPrintPreview('format', '', button.dataset.formatService); return; }
    if (button.id === 'profileButton') { openProfile(); return; }
    if (button.id === 'loadDemoScenarios') {
      if (state.view !== 'office' || !authenticatedGP || state.gp !== authenticatedGP) return;
      openDialog(`${modalHeader(L('Add fictional sample cases?', 'काल्पनिक नमुना अर्ज जोडायचे?'))}<div class="modal-body"><p><strong>${esc(gpName())} · GP ${state.gp}</strong></p><p>${L('Only missing examples for this GP’s enabled services will be added. Your existing requests, status updates and account stay as they are.', 'फक्त या ग्रामपंचायतीतील उपलब्ध सेवांचे नसलेले नमुने जोडले जातील. सध्याचे अर्ज, स्थितीच्या सूचना आणि खाते कायम राहील.')}</p><div class="admin-service-list">${sampleRequests(state.gp).map(item => `<span class="admin-service-chip">${esc(serviceName(item.service))}</span>`).join('')}</div><p class="field-hint">${L('All examples belong to one fictional demo citizen. No real applications or official outputs are created.', 'सर्व नमुने एकाच काल्पनिक डेमो नागरिकाचे आहेत. प्रत्यक्ष अर्ज किंवा अधिकृत कागदपत्र तयार होत नाही.')}</p></div><footer class="modal-footer"><button type="button" class="button secondary" data-close>${t('cancel')}</button><button type="button" class="button primary" id="confirmSampleData" data-gp="${state.gp}">${L('Add sample cases', 'नमुना अर्ज जोडा')}</button></footer>`);
      return;
    }
    if (button.id === 'confirmSampleData') {
      if (state.view !== 'office' || !authenticatedGP || state.gp !== authenticatedGP || button.dataset.gp !== authenticatedGP) return;
      const result = mergeSampleRequests(state.gp, getRequests());
      if (result.changed) saveRequests(result.records);
      closeDialog(); render();
      toast(result.added ? L(`${result.added} fictional sample cases added to this GP.`, `या ग्रामपंचायतीत ${result.added} काल्पनिक नमुना अर्ज जोडले.`) : L('Sample cases are already present. Existing work was kept.', 'नमुना अर्ज आधीच आहेत. सध्याचे काम जतन केले आहे.'));
      return;
    }
    if (button.id === 'portalSignOut') { clearPrintPreview(); closeDialog(); enrollmentController?.signOut(); return; }
    if (button.dataset.view) { switchRole(button.dataset.view); return; }
    if (button.id === 'returnCitizenView') { switchRole('citizen'); return; }
    if (button.dataset.adminRoute) { if (hasSession() && state.view === 'office') navigate(button.dataset.adminRoute); return; }
    if (button.dataset.route) { navigate(button.dataset.route); return; }
    if (button.dataset.placeholder) { navigate(button.dataset.placeholder); return; }
    if (button.dataset.applyService) { applyForService(button.dataset.applyService, button.dataset.channel || 'citizen'); return; }
    if (button.dataset.serviceId) { openService(button.dataset.serviceId); return; }
    if (button.dataset.assisted) { openService(button.dataset.assisted, 'assisted'); return; }
    if (button.dataset.requestId) { openRequest(button.dataset.requestId); return; }
    if (button.dataset.filter) { state.filter = button.dataset.filter; renderServices(); return; }
    if (button.dataset.peopleFilter) { if (state.route === 'people' && ['all', 'elected', 'officers', 'staff'].includes(button.dataset.peopleFilter)) { state.peopleFilter = button.dataset.peopleFilter; updatePeopleResults(); } return; }
    if (button.dataset.personId) { openPerson(button.dataset.personId); return; }
    if (button.hasAttribute('data-close')) { closeDialog(); return; }
    if (button.dataset.download) { downloadAcknowledgement(button.dataset.download); return; }
    if (button.dataset.trackRequest) { state.lastTrack = button.dataset.trackRequest; navigate('track'); return; }
    if (button.dataset.reply) { openReply(button.dataset.reply); return; }
    if (button.dataset.openGp) { switchGP(button.dataset.openGp, 'citizen'); return; }
    if (button.dataset.openOffice) { switchGP(button.dataset.openOffice, 'office'); return; }
    if (button.id === 'applicationBack') { if (state.draftStep === 0) closeDialog(); else { collectDraft(); state.draftStep--; renderApplication(); } return; }
    if (button.id === 'applicationNext' && state.draftStep !== 1) { if (state.draftStep === 0) { state.draftStep = 1; renderApplication(); } else submitRequest(); return; }
    if (button.id === 'useSample' && getRequests()[0]) { document.getElementById('trackingId').value = getRequests()[0].id; document.getElementById('trackingForm').requestSubmit(); return; }
    if (button.id === 'menuToggle') { toggleWorkspaceNavigation(); return; }
    if (button.id === 'mobileShade') { closeMobileNav(); return; }
    if (button.id === 'resetDemo') { if (!hasSession()) return; openDialog(`${modalHeader(L('Reset this demo?', 'हा डेमो रीसेट करायचा?'))}<div class="modal-body"><p>${L('Fictional cases and this site’s saved preferences will reset in this browser. The initial sample cases will return. Portal IT setup and GP readiness are retained. Other websites and project files are unaffected.', 'या ब्राउझरमधील काल्पनिक अर्ज आणि या संकेतस्थळाच्या जतन केलेल्या पसंती रीसेट होतील. मूळ नमुना अर्ज पुन्हा दिसतील. पोर्टल IT ची पूर्वतयारी आणि ग्रामपंचायतीची तयार स्थिती कायम राहील. इतर वेबसाइट किंवा प्रकल्पातील फाईल बदलणार नाहीत.')}</p></div><footer class="modal-footer"><button class="button secondary" type="button" data-close>${t('cancel')}</button><button type="button" class="button primary" id="confirmReset">${L('Reset demo', 'डेमो रीसेट करा')}</button></footer>`); return; }
    if (button.id === 'confirmReset') { if (!hasSession()) return; clearPrintPreview(); try { Object.keys(localStorage).filter(key => key.startsWith(PREFIX)).forEach(key => localStorage.removeItem(key)); } catch (_) {} memory.clear(); location.reload(); }
  });
  document.addEventListener('input', e => {
    if (typeof e.target.setCustomValidity === 'function') e.target.setCustomValidity('');
    if (e.target.id === 'officeSearch' && hasSession() && state.view === 'office') { state.officeQuery = e.target.value; updateOfficeResults(); }
    if (e.target.id === 'serviceSearch') { state.query = e.target.value; updateServiceResults(); }
    if (e.target.id === 'peopleSearch') { state.peopleQuery = e.target.value; updatePeopleResults(); }
    if (e.target.id === 'applicationAttachment') { const file = e.target.files[0]; if (file && state.draft) { state.draft.attachment = file.name; e.target.closest('.upload-box').querySelector('small').textContent = file.name; } }
  });
  document.addEventListener('change', e => {
    if (e.target.id === 'panchayatSelect') switchGP(e.target.value);
    if (e.target.id === 'officeFilter' && hasSession() && state.view === 'office') { state.officeFilter = e.target.value; updateOfficeResults(); }
    if (e.target.id === 'statusSelect' && state.view === 'office') {
      const form = document.getElementById('statusForm');
      const request = form && findRequest(form.dataset.id);
      if (request && form.dataset.gp === authenticatedGP) updateTransitionFields(request, e.target.value);
    }
  });
  document.addEventListener('submit', e => {
    if (e.target.id === 'profileForm') {
      e.preventDefault();
      if (!authenticatedGP || state.gp !== authenticatedGP) return;
      const language = document.getElementById('profileLanguage').value;
      if (!['mr', 'en'].includes(language)) return;
      const scroll = profileScroll || { x: window.scrollX, y: window.scrollY };
      // Disable automatic anchor adjustment during translation, then restore this view.
      const previousAnchor = document.documentElement.style.overflowAnchor;
      document.documentElement.style.overflowAnchor = 'none';
      state.lang = language; write('language', language); enrollmentController?.setLanguage(language);
      closeDialog(); render(); profileScroll = null;
      if (typeof scroll.trackingValue === 'string' && document.getElementById('trackingId')) document.getElementById('trackingId').value = scroll.trackingValue;
      requestAnimationFrame(() => {
        window.scrollTo({ left: scroll.x, top: scroll.y, behavior: 'instant' });
        requestAnimationFrame(() => { document.documentElement.style.overflowAnchor = previousAnchor; });
      });
      return;
    }
    if (e.target.id === 'applicationForm') { e.preventDefault(); if (!hasSession() || state.view !== 'citizen' || !state.draft) return; collectDraft(); if (state.draft.applicant.length < 2 || state.draft.details.length < 5) { const field = e.target.querySelector(state.draft.applicant.length < 2 ? '#applicantName' : '#applicationDetails'); field.setCustomValidity(L('Please enter meaningful sample details.', 'कृपया अर्थपूर्ण नमुना माहिती भरा.')); field.reportValidity(); return; } state.draftStep = 2; renderApplication(); }
    if (e.target.id === 'trackingForm') {
      e.preventDefault(); const input = document.getElementById('trackingId').value.trim(); const request = findRequest(input);
      if (!request) { state.lastTrack = null; const error = document.getElementById('trackingError'); error.textContent = L('No matching demo request in this Panchayat. Check the reference and selected GP.', 'या ग्रामपंचायतीत हा डेमो अर्ज सापडला नाही. अर्ज क्रमांक आणि निवडलेली ग्रामपंचायत तपासा.'); error.hidden = false; const result = document.getElementById('trackingResult'); if (result) result.innerHTML = emptyContent(L('No matching request', 'जुळणारा अर्ज नाही'), L('Check the reference before viewing or printing a case.', 'अर्ज पाहण्यापूर्वी किंवा छापण्यापूर्वी अर्ज क्रमांक तपासा.'), 'search'); return; }
      state.lastTrack = request.id;
      if (state.route !== 'track') navigate('track'); else { document.getElementById('trackingResult').innerHTML = requestDetail(request); document.getElementById('trackingError').hidden = true; }
    }
    if (e.target.id === 'statusForm') {
      e.preventDefault();
      if (state.view !== 'office' || !authenticatedGP || state.gp !== authenticatedGP || e.target.dataset.gp !== authenticatedGP) return;
      const request = findRequest(e.target.dataset.id); if (!request) return;
      const next = document.getElementById('statusSelect').value;
      if (request.status === 'action' && next === 'review' && !document.getElementById('responseReceived')?.checked) {
        showWorkflowError('workflowError', L('Confirm that a sample response was received.', 'नमुना प्रतिसाद मिळाल्याची पुष्टी करा.')); return;
      }
      if (request.status === 'resolved' && next === 'completed' && !document.getElementById('resolutionConfirmed')?.checked) {
        showWorkflowError('workflowError', L('Record the sample citizen confirmation before closure.', 'केस बंद करण्यापूर्वी नागरिकांची नमुना पुष्टी नोंदवा.')); return;
      }
      const result = recordWorkflowUpdate(request.id, next, statusTransitionData(request, next), 'office');
      if (!result.ok) { showWorkflowError('workflowError', result.error); return; }
      closeDialog(); render(); toast(L('Demo update saved. The citizen timeline is updated.', 'डेमो स्थिती जतन केली. नागरिकांच्या अर्जात ती दिसेल.'));
    }
    if (e.target.id === 'replyForm') {
      e.preventDefault();
      if (state.view !== 'citizen' || !authenticatedGP || state.gp !== authenticatedGP || e.target.dataset.gp !== authenticatedGP) return;
      const request = findRequest(e.target.dataset.id); const note = document.getElementById('citizenReply').value.trim();
      if (!request || request.status !== 'action' || note.length < 5) return;
      const result = recordWorkflowUpdate(request.id, 'review', { responseNote: note }, 'citizen');
      if (!result.ok) { showWorkflowError('replyError', result.error); return; }
      closeDialog(); state.lastTrack = request.id; state.route = 'track'; render(); toast(L('Clarification recorded for office review.', 'अधिक माहिती कार्यालयीन पडताळणीसाठी नोंदवली.'));
    }
    if (e.target.id === 'resolutionReplyForm') {
      e.preventDefault();
      if (state.view !== 'citizen' || !authenticatedGP || state.gp !== authenticatedGP || e.target.dataset.gp !== authenticatedGP) return;
      const request = findRequest(e.target.dataset.id);
      if (!request || request.status !== 'resolved' || workflow.kindFor(request.service) !== 'local') return;
      const note = document.getElementById('resolutionNote').value.trim();
      const confirmed = document.getElementById('resolutionChoice').value === 'confirm';
      const data = confirmed ? { note, confirmation: { by: 'citizen', note } } : { responseNote: note };
      const result = recordWorkflowUpdate(request.id, confirmed ? 'completed' : 'review', data, 'citizen');
      if (!result.ok) { showWorkflowError('resolutionError', result.error); return; }
      state.lastTrack = request.id; state.route = 'track'; render();
      toast(confirmed ? L('Demo resolution confirmed and case closed.', 'समस्या सुटल्याची डेमो पुष्टी नोंदवून केस बंद केली.') : L('The issue is back in review with your response.', 'तुमच्या प्रतिसादासह समस्या पुन्हा पडताळणीत आहे.'));
    }
  });
  dialog.addEventListener('click', e => { if (e.target === dialog) { const bounds = dialog.getBoundingClientRect(); if (e.clientX < bounds.left || e.clientX > bounds.right || e.clientY < bounds.top || e.clientY > bounds.bottom) closeDialog(); } });
  dialog.addEventListener('close', () => { if (state.returnFocus?.isConnected) state.returnFocus.focus({ preventScroll: true }); });
  printDialog.addEventListener('close', () => { if (printReturnFocus?.isConnected) printReturnFocus.focus({ preventScroll: true }); });
  printDialog.addEventListener('click', e => { if (e.target === printDialog) { const bounds = printDialog.getBoundingClientRect(); if (e.clientX < bounds.left || e.clientX > bounds.right || e.clientY < bounds.top || e.clientY > bounds.bottom) printDialog.close(); } });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMobileNav(); });
  document.querySelector('#portalRoot .brand').addEventListener('click', e => { e.preventDefault(); navigate('home'); });
  const portalRoot = document.getElementById('portalRoot');
  const shell = document.getElementById('gpShell');
  const workspaceShell = shell;
  const workspaceHeader = document.getElementById('workspaceHeader');
  const workspaceMobile = window.matchMedia('(max-width: 800px)');
  const workspaceHeaderObserver = typeof ResizeObserver === 'function' ? new ResizeObserver(entries => measureWorkspaceHeader(entries[0])) : null;
  workspaceHeaderObserver?.observe(workspaceHeader);
  workspaceMobile.addEventListener('change', closeMobileNav);
  window.addEventListener('resize', () => { measureWorkspaceHeader(); });
  syncWorkspaceNavigation();
  const enrollmentRoot = document.getElementById('enrollmentRoot');
  function showPublicWebsite() {
    if (enrollmentController && !enrollmentController.suspend()) return;
    authOpen = false; state.route = 'home'; pendingIntent = null;
    closeRolePopover(); clearPrintPreview(); closeDialog(); closeMobileNav(); render(true);
  }
  function ensureEnrollment() {
    if (enrollmentController) return true;
    if (!window.GPEnrollment) { enrollmentRoot.textContent = 'Keep all prototype files together and reload.'; return false; }
    enrollmentController = window.GPEnrollment.init({
      root: enrollmentRoot, registry: window.GP_DEMO_REGISTRY, language: state.lang,
      getExpectedGPCode: () => state.gp,
      onGPChange(code) {
        authenticatedGP = null; sessionUsername = ''; state.view = 'citizen'; state.draft = null; state.officeQuery = ''; state.officeFilter = 'all'; pendingIntent = null;
        closeRolePopover(); clearPrintPreview(); closeDialog(); modal.replaceChildren();
        if (code && registry.some(item => item.code === String(code))) state.gp = String(code);
        publicController?.update({ gpCode: state.gp, lang: state.lang, signedIn: false });
        translateShell();
      },
      onSignIn(payload) {
        if (String(payload.gp.code) !== state.gp) throw new Error('GP context does not match the sign-in.');
        clearPrintPreview(); publicController?.closeDialogs();
        authenticatedGP = payload.gp.code; sessionUsername = payload.username;
        state.peopleQuery = ''; state.peopleFilter = 'all'; state.officeQuery = ''; state.officeFilter = 'all';
        const oldConfig = configs[authenticatedGP];
        configs[authenticatedGP] = { officeName: payload.officeName || oldConfig?.officeName || payload.gp.en + ' GP office (demo)', officer: 'Sample office lead', help: oldConfig?.help || 'Ask the demo office for assistance.', services: Array.isArray(payload.services) ? payload.services.filter(id => defaults.includes(id)) : oldConfig?.services || [...defaults] };
        write('configs', configs);
        state.gp = authenticatedGP; state.view = 'citizen'; state.route = 'home'; state.lastTrack = null;
        state.lang = payload.lang || state.lang; write('language', state.lang); authOpen = false;
        const intent = pendingIntent?.gpCode === authenticatedGP ? pendingIntent : null; pendingIntent = null;
        if (intent?.route && citizenRoutes.has(intent.route)) state.route = intent.route;
        render(true);
        if (intent?.serviceId) openService(intent.serviceId, intent.channel || 'citizen');
      },
      onSignOut() {
        closeRolePopover(); clearPrintPreview(); closeDialog(); modal.replaceChildren();
        authenticatedGP = null; sessionUsername = ''; state.view = 'citizen'; state.draft = null; state.officeQuery = ''; state.officeFilter = 'all';
        if (!authOpen) { state.route = 'home'; pendingIntent = null; }
        render(true);
      }
    });
    enrollmentRoot.hidden = true;
    return true;
  }
  function showAuthentication(intent = null) {
    if (enrollmentController?.isBusy) return;
    closeRolePopover(); clearPrintPreview(); closeDialog(); modal.replaceChildren(); publicController?.closeDialogs(); closeMobileNav();
    if (intent) pendingIntent = intent;
    authenticatedGP = null; sessionUsername = ''; state.draft = null; state.view = 'citizen';
    authOpen = true; state.route = 'login';
    if (!ensureEnrollment()) { render(); return; }
    enrollmentController.openLogin();
    enrollmentController.setLanguage(state.lang);
    render(true);
  }
  function changePublicGP(code) {
    if (!registry.some(item => item.code === String(code))) return;
    if (enrollmentController?.isBusy) return;
    enrollmentController?.suspend(); authOpen = false; pendingIntent = null;
    closeRolePopover(); clearPrintPreview(); closeDialog(); modal.replaceChildren(); state.draft = null;
    state.gp = String(code); state.route = 'home'; state.lastTrack = null; state.query = ''; state.peopleQuery = ''; state.officeQuery = ''; state.officeFilter = 'all';
    publicController?.update({ gpCode: state.gp, lang: state.lang }); closeMobileNav(); render(true);
  }
  if (window.GPPublicSite && window.GP_DEMO_REGISTRY) {
    publicController = window.GPPublicSite.init({
      registry: window.GP_DEMO_REGISTRY, gpCode: state.gp, language: state.lang,
      onNavigate: navigate,
      onLogin(intent = 'home') { if (hasSession()) { if (['requests', 'track'].includes(intent)) state.view = 'citizen'; navigate(intent); } else showAuthentication({ gpCode: state.gp, route: intent }); },
      onGPChange: changePublicGP,
      onLanguageChange(lang) {
        if (!['mr', 'en'].includes(lang)) return;
        state.lang = lang; write('language', lang);
        if (hasSession() || authOpen) enrollmentController?.setLanguage(lang);
        render();
      }
    });
    siteSearchController = window.GPSiteSearch?.init({
      getContext: () => ({ gpCode: state.gp, gpName: gpName(), lang: state.lang, role: state.view, signedIn: hasSession() }),
      getServices: () => getServices(),
      getPeople: () => [...(window.GP_DEMO_PEOPLE?.forGP(state.gp) || []), ...(window.GP_DEMO_PEOPLE?.relatedOfficesForGP(state.gp) || [])],
      getVillages: () => window.GP_DEMO_VILLAGES?.forGP(state.gp) || [],
      onBeforeOpen() { closeRolePopover(); closeMobileNav(); publicController?.closeDialogs(); },
      onSelect(entry) {
        if (entry.kind === 'service') { navigate('services'); openService(entry.serviceId, 'citizen', true); }
        else if (entry.kind === 'person') { navigate('leadership'); publicController?.openPerson(entry.personId); }
        else if (entry.kind === 'village') {
          navigate('about');
          requestAnimationFrame(() => document.querySelector(`[data-village-code="${entry.villageCode}"]`)?.scrollIntoView({ block: 'nearest' }));
        }
        else if (entry.route === 'preferences') publicController?.openPreferences();
        else if (entry.route === 'choose-gp') publicController?.openChooser();
        else if (entry.route === 'about-site') publicController?.openAbout();
        else if (entry.route === 'profile' && hasSession()) openProfile();
        else navigate(entry.route);
      }
    });
    render();
  } else root.textContent = 'Keep all prototype files together and reload. / सर्व डेमो फाईल एकत्र ठेवून पुन्हा उघडा.';
})();
