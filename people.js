/* Read-only, GP-scoped people evidence. Listings are not current appointments. */
'use strict';
(() => {
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const icon = name => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
  const label = (ctx, en, mr) => ctx.lang === 'mr' ? mr : en;
  const localized = (ctx, value) => typeof value === 'string' ? value : value?.[ctx.lang] || value?.en || '';
  function scoped(ctx, entries) {
    const seen = new Set();
    return entries.filter(person => person && String(person.gpCode) === String(ctx.gpCode) && !seen.has(person.id) && seen.add(person.id));
  }
  const roster = ctx => scoped(ctx, window.GP_DEMO_PEOPLE?.forGP(ctx.gpCode) || []);
  const offices = ctx => scoped(ctx, window.GP_DEMO_PEOPLE?.relatedOfficesForGP(ctx.gpCode) || []);
  const categories = ctx => [['all', label(ctx, 'Everyone', 'सर्व')], ['elected', label(ctx, 'Elected representatives', 'लोकप्रतिनिधी')], ['officers', label(ctx, 'Officers', 'अधिकारी')], ['staff', label(ctx, 'Office & field staff', 'कार्यालयीन व क्षेत्रीय कर्मचारी')]];
  const name = (ctx, person) => localized(ctx, person.name);
  const initials = person => (person.name?.en || '').trim().split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]).join('').toUpperCase();
  function date(ctx, value) {
    if (!value) return label(ctx, 'Not confirmed', 'पुष्टी नाही');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return String(value);
    const parsed = new Date(`${value}T12:00:00+05:30`);
    return Number.isFinite(parsed.getTime()) ? new Intl.DateTimeFormat(ctx.lang === 'mr' ? 'mr-IN' : 'en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' }).format(parsed) : String(value);
  }
  const sourceMetadata = id => window.GP_DEMO_PEOPLE?.sources?.[id];
  function records(person) {
    if (Array.isArray(person.evidenceRecords)) return person.evidenceRecords;
    return (person.evidenceRecordIds || []).map(id => window.GP_DEMO_PEOPLE?.evidenceRecordsById?.[id]).filter(Boolean);
  }
  function badge(ctx, person) {
    const kind = person.verification || person.kind || '';
    const labels = {
      'official-retrieval': ['Official source · directly retrieved', 'अधिकृत स्रोत · थेट प्राप्त माहिती'],
      'user-screenshot': ['User-supplied portal screenshot', 'वापरकर्त्याने दिलेला पोर्टल स्क्रीनशॉट'],
      'official-listing': ['Dated official office listing', 'दिनांकित अधिकृत कार्यालयीन नोंद'],
      reported: ['Reported name · confirmation pending', 'प्रसिद्ध नाव · पुष्टी बाकी'],
      sample: ['Fictional demo profile', 'काल्पनिक डेमो व्यक्ती']
    };
    const copy = labels[kind] || ['Source details available', 'स्रोत माहिती उपलब्ध'];
    return `<span class="person-evidence ${esc(kind)}" data-evidence="${esc(kind)}">${label(ctx, ...copy)}</span>`;
  }
  function verifiedPhotoPath(person) {
    const photo = person.photo;
    return photo && typeof photo === 'object' && photo.verified === true && photo.originalAsset === true && sourceMetadata(photo.sourceId) && /^(?:assets|images)\/[A-Za-z0-9_/-]+\.(?:png|jpe?g|webp)$/i.test(photo.path || '') ? photo.path : null;
  }
  function portrait(ctx, person, large = false) {
    const path = verifiedPhotoPath(person);
    return `<span class="person-avatar${large ? ' large' : ''}" ${path ? '' : 'aria-hidden="true"'}>${path ? `<img src="${esc(path)}" alt="${esc(name(ctx, person))}">` : esc(initials(person))}</span>`;
  }
  function thumbnail(ctx, person, publicCard = false) {
    const path = verifiedPhotoPath(person);
    const className = `person-thumbnail ${publicCard ? 'public-person-avatar' : 'person-avatar'}`;
    return path
      ? `<span class="${className}" data-portrait="verified"><img src="${esc(path)}" alt="${esc(name(ctx, person))}" loading="lazy" decoding="async"></span>`
      : `<span class="${className}" data-portrait="placeholder" role="img" aria-label="${esc(label(ctx, 'Photo not available: ', 'छायाचित्र उपलब्ध नाही: ') + name(ctx, person))}"><svg class="person-photo-placeholder" viewBox="0 0 240 180" aria-hidden="true" focusable="false"><circle cx="120" cy="64" r="28"/><path d="M57 164v-18a63 63 0 0 1 126 0v18Z"/></svg></span>`;
  }
  const relatedContact = person => person.category === 'related-office' && person.verification === 'official-listing';
  function contact(ctx, person) {
    if (relatedContact(person) && /^[6-9]\d{9}$/.test(person.phone || '')) return `<a class="person-phone" href="tel:+91${esc(person.phone)}">${icon('phone')}<span>${esc(person.phone)}</span></a>`;
    return `<span class="person-contact-missing">${label(ctx, 'Usable phone not verified', 'वापरता येणारा दूरध्वनी पडताळलेला नाही')}</span>`;
  }
  function sourceLink(ctx, url, text = '') {
    return /^https:\/\//.test(url || '') ? `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${text || label(ctx, 'View source', 'स्रोत पाहा')}${icon('arrow')}</a>` : '';
  }
  function assetLink(ctx, path, publicPath) {
    const raw = String(path || '').replace(/\\/g, '/');
    const clean = raw.replace(/^\.\.\//, '');
    if (!/^(?:data|screenshots|docs)\/[A-Za-z0-9_./#%-]+$/.test(clean) || clean.includes('..')) return '';
    const guide = /^sources\.html#[a-z0-9-]+$/.test(publicPath || '') ? publicPath : 'sources.html#offline-archives';
    return `<a href="${esc(guide)}" target="_blank" rel="noopener noreferrer">${label(ctx, 'Source & archive notes', 'स्रोत व जतन नोंदी')}${icon('file')}</a>`;
  }
  function card(ctx, person, external = false, compact = false) {
    return `<article class="person-card${compact ? ' person-card-compact' : ''}" data-person="${esc(person.id)}" data-gp="${esc(person.gpCode)}" data-person-kind="${external ? 'related-office' : 'gp-team'}" data-person-category="${esc(person.category)}">${thumbnail(ctx, person)}<div class="person-card-caption"><h3>${esc(name(ctx, person))}</h3><p class="person-role">${esc(localized(ctx, person.role))}</p></div><button type="button" class="person-card-open" data-person-id="${esc(person.id)}" aria-label="${esc(label(ctx, 'View profile: ', 'माहिती पाहा: ') + name(ctx, person))}"></button></article>`;
  }
  function overview(ctx) {
    const people = roster(ctx);
    const leaders = ['sarpanch', 'up-sarpanch', 'officer-secretary'].map(key => people.find(person => person.roleKey === key)).filter(Boolean);
    if (!leaders.length) return `<div class="people-overview-empty" data-gp="${esc(ctx.gpCode)}">${label(ctx, 'Source-linked leadership details have not been added for this Panchayat.', 'या ग्रामपंचायतीसाठी स्रोताशी जोडलेली नेतृत्व माहिती अद्याप जोडलेली नाही.')}</div>`;
    return `<div class="people-overview-grid" data-gp="${esc(ctx.gpCode)}">${leaders.map(person => card(ctx, person, false, true)).join('')}</div>`;
  }
  function matches(ctx, person) {
    const query = (ctx.query || '').trim().toLocaleLowerCase();
    const values = [person.name, person.role, person.responsibilities, person.ward, person.office].flatMap(item => [localized({ lang: 'en' }, item), localized({ lang: 'mr' }, item)]);
    values.push(person.roleKey || '', ...records(person).flatMap(item => [item.sourceName || '', item.sourceRole || '']));
    return !query || values.join(' ').toLocaleLowerCase().includes(query);
  }
  function results(ctx) {
    const people = roster(ctx).filter(person => (!ctx.filter || ctx.filter === 'all' || person.category === ctx.filter) && matches(ctx, person));
    const related = (!ctx.filter || ['all', 'officers'].includes(ctx.filter)) ? offices(ctx).filter(person => matches(ctx, person)) : [];
    if (!people.length && !related.length) return `<div class="panel empty-state" data-directory-empty><span class="empty-icon">${icon('users')}</span><h3>${label(ctx, 'No matches', 'निकाल नाही')}</h3><p>${ctx.filter === 'staff' ? label(ctx, 'No verified staff roster has been supplied. This does not establish that the GP has no staff.', 'पडताळलेली कर्मचारी यादी उपलब्ध नाही. याचा अर्थ ग्रामपंचायतीत कर्मचारी नाहीत असा होत नाही.') : label(ctx, 'Try another name, role or category. This view is not a complete council or staff roster.', 'दुसरे नाव, पद किंवा गट निवडा. ही संपूर्ण सदस्य किंवा कर्मचारी यादी नाही.')}</p></div>`;
    const groups = categories(ctx).slice(1).map(([id, title]) => {
      const members = people.filter(person => person.category === id);
      return members.length ? `<section class="people-group"><div class="section-header"><h2>${title}</h2></div><div class="people-grid">${members.map(person => card(ctx, person)).join('')}</div></section>` : '';
    }).join('');
    const relatedSection = related.length ? `<section class="people-group related-offices"><div class="section-header"><div><h2>${label(ctx, 'Related offices', 'संबंधित कार्यालये')}</h2><p>${label(ctx, 'Separate public office contacts · not GP employees', 'स्वतंत्र सार्वजनिक कार्यालयीन संपर्क · ग्रामपंचायत कर्मचारी नाहीत')}</p></div></div><p class="people-source-note">${label(ctx, 'Zilla Parishad Beed listing updated 26 Feb 2025. Current postings are unverified; repeated names/numbers elsewhere in that directory remain unresolved.', 'जिल्हा परिषद बीड निर्देशिका: २६ फेब्रुवारी २०२५. सध्याचे पदभार अपडताळलेले; निर्देशिकेतील इतर ठिकाणी पुनरावृत्त नावे/क्रमांक अस्पष्ट आहेत.')}</p><div class="people-grid">${related.map(person => card(ctx, person, true)).join('')}</div></section>` : '';
    return `${groups}${relatedSection}`;
  }
  function officeLocation(ctx) {
    const office = window.GP_DEMO_PEOPLE?.officeForGP?.(ctx.gpCode);
    if (!office || (office.gpCode && String(office.gpCode) !== String(ctx.gpCode))) return '';
    const address = office.addressRaw || localized(ctx, office.address);
    if (!address) return '';
    return `<section class="people-office-location">${icon('pin')}<div><strong>${label(ctx, 'Published GP office address', 'प्रसिद्ध ग्रामपंचायत कार्यालयाचा पत्ता')}</strong><p>${esc(address)}</p><small>${label(ctx, 'Official profile field, reviewed 7 Nov 2026; not independently visited. Complete phone, email and office hours remain unverified.', 'अधिकृत प्रोफाइलमधील पत्ता, ७ नोव्हेंबर २०२६ रोजी पाहिला; स्वतंत्र प्रत्यक्ष भेट नाही. पूर्ण दूरध्वनी, ईमेल व कार्यालयीन वेळा अपडताळलेल्या आहेत.')}</small>${sourceLink(ctx, office.sourceUrl)}</div></section>`;
  }
  function render(ctx) {
    if (!roster(ctx).length) return `<section id="peopleDirectory" data-gp="${esc(ctx.gpCode)}" class="panel empty-state" data-directory-empty><span class="empty-icon">${icon('users')}</span><h2>${label(ctx, 'Directory pending', 'संपर्क यादी प्रलंबित')}</h2><p>${label(ctx, 'Names, appointments and public contacts need evidence. People from another GP are never substituted.', 'नावे, नियुक्त्या व सार्वजनिक संपर्कांसाठी पुरावे आवश्यक आहेत. इतर ग्रामपंचायतीतील व्यक्ती येथे वापरल्या जात नाहीत.')}</p></section>`;
    return `<div id="peopleDirectory" data-gp="${esc(ctx.gpCode)}"><div class="directory-context">${icon('users')}<div><strong>${label(ctx, 'People linked to published evidence', 'प्रसिद्ध पुराव्यांशी जोडलेली व्यक्ती-माहिती')}</strong><p>${label(ctx, 'Direct eGramSwaraj records and a user-supplied Meri Panchayat screenshot are labelled separately. These entries are not a certified complete council or independently verified current appointments.', 'थेट प्राप्त ई-ग्रामस्वराज नोंदी आणि वापरकर्त्याने दिलेला मेरी पंचायत स्क्रीनशॉट स्वतंत्र लेबलांनी दाखवले आहेत. ही प्रमाणित संपूर्ण सदस्य यादी किंवा स्वतंत्रपणे पडताळलेल्या सध्याच्या नियुक्त्या नाहीत.')}</p></div></div>${officeLocation(ctx)}<div class="catalog-toolbar"><label class="search-box" for="peopleSearch">${icon('search')}<span class="sr-only">${label(ctx, 'Search people, roles or responsibilities', 'नावे, पदे किंवा जबाबदाऱ्या शोधा')}</span><input type="search" id="peopleSearch" value="${esc(ctx.query || '')}" placeholder="${label(ctx, 'Search by name, role or service…', 'नाव, पद किंवा सेवेनुसार शोधा…')}" autocomplete="off"></label><div class="filter-pills" role="group" aria-label="${label(ctx, 'Directory category', 'संपर्क यादीतील गट')}">${categories(ctx).map(([id, title]) => `<button class="filter-pill ${(!ctx.filter && id === 'all') || ctx.filter === id ? 'active' : ''}" type="button" data-people-filter="${id}" aria-pressed="${(!ctx.filter && id === 'all') || ctx.filter === id}">${title}</button>`).join('')}</div></div><div id="peopleResults" aria-live="polite">${results(ctx)}</div><details class="people-provenance"><summary>${label(ctx, 'How to read the sources, dates and portraits', 'स्रोत, दिनांक व छायाचित्रे कशी समजावीत')}</summary><p>${label(ctx, 'A person appears once; individual source records stay separate in the profile. Repeated screenshot records do not prove separate seats or terms. Masked contacts remain exactly masked within their own evidence records and cannot be called or emailed. Ward numbers, current terms and appointments are unconfirmed. No verified original portraits are available, so neutral photo placeholders are shown.', 'प्रत्येक व्यक्ती एकदाच दिसते; स्वतंत्र स्रोत नोंदी माहितीमध्ये वेगळ्या ठेवल्या आहेत. पुनरावृत्त स्क्रीनशॉट नोंदींवरून स्वतंत्र जागा किंवा कार्यकाळ सिद्ध होत नाहीत. झाकलेले संपर्क त्यांच्या मूळ नोंदीत तसेच ठेवले आहेत; त्यावर कॉल/ईमेल करता येत नाही. प्रभाग क्रमांक, सध्याचे कार्यकाळ व नियुक्त्या अपडताळलेल्या आहेत. पडताळलेली मूळ छायाचित्रे नसल्याने छायाचित्रांसाठी तटस्थ प्रतीक दाखवले आहे.')}</p></details></div>`;
  }
  const fieldRows = rows => `<dl class="person-profile-records">${rows.map(([key, value]) => `<div><dt>${esc(key)}</dt><dd>${esc(value)}</dd></div>`).join('')}</dl>`;
  function evidenceSection(ctx, person) {
    const evidence = records(person);
    if (!evidence.length) return '';
    return `<section class="person-source-records"><h3>${label(ctx, 'Sources', 'स्रोत')}</h3><p class="people-source-note">${label(ctx, 'Raw source spellings, masked contacts and truncated dates are preserved per record. They are not combined into a verified appointment or contact. Record labels below are local evidence references, not appointment IDs.', 'मूळ शब्दलेखन, झाकलेले संपर्क व अपूर्ण दिनांक प्रत्येक नोंदीप्रमाणे जतन केले आहेत. त्यांवरून एकत्रित पडताळलेली नियुक्ती किंवा संपर्क तयार केलेला नाही. खालील लेबले स्थानिक पुरावा संदर्भ आहेत; नियुक्ती क्रमांक नाहीत.')}</p>${evidence.map((entry, index) => {
      const source = sourceMetadata(entry.sourceId);
      const sourceTitle = localized(ctx, source?.title) || entry.sourceReference || entry.sourceId;
      const rows = [[label(ctx, 'Name as displayed', 'प्रदर्शित नाव'), entry.sourceName], [label(ctx, 'Role as displayed', 'प्रदर्शित पद'), entry.sourceRole]];
      if (entry.wardRaw != null) rows.push([label(ctx, 'Source ward / area text — not a verified ward number', 'स्रोतातील प्रभाग / क्षेत्र मजकूर — पडताळलेला प्रभाग क्रमांक नाही'), entry.wardRaw]);
      if (entry.term?.startRaw != null || entry.term?.endRaw != null) rows.push([label(ctx, 'Start date text as displayed', 'प्रदर्शित सुरुवात दिनांकाचा मजकूर'), entry.term.startRaw || label(ctx, 'Not readable / not shown', 'वाचता येत नाही / दिलेला नाही')], [label(ctx, 'End date text as displayed', 'प्रदर्शित शेवटच्या दिनांकाचा मजकूर'), entry.term.endRaw || label(ctx, 'Not readable / not shown', 'वाचता येत नाही / दिलेला नाही')]);
      rows.push([label(ctx, 'Evidence reviewed', 'पुरावा पाहिल्याची तारीख'), date(ctx, entry.checkedAt)]);
      return `<article class="person-evidence-record" data-evidence-record="${esc(entry.id)}" data-source-id="${esc(entry.sourceId)}" data-source-kind="${esc(entry.kind)}"><header><span class="person-source-ordinal">${label(ctx, 'Record', 'नोंद')} ${index + 1} · ${esc(entry.sourceReference || entry.sourceId)}</span><h4>${esc(sourceTitle)}</h4>${badge(ctx, { verification: entry.kind })}</header>${fieldRows(rows)}${entry.maskedPhone || entry.maskedEmail ? `<div class="person-masked-contacts"><strong>${label(ctx, 'Masked fields from this record only', 'फक्त या नोंदीतील झाकलेले संपर्क')}</strong>${entry.maskedPhone ? `<p><span>${label(ctx, 'Phone', 'दूरध्वनी')}</span><code data-masked-contact="phone">${esc(entry.maskedPhone)}</code></p>` : ''}${entry.maskedEmail ? `<p><span>${label(ctx, 'Email', 'ईमेल')}</span><code data-masked-contact="email">${esc(entry.maskedEmail)}</code></p>` : ''}<small>${label(ctx, 'Not a usable contact. No reconstruction or dial/email action.', 'वापरता येणारा संपर्क नाही. पूर्ण क्रमांक तयार केलेला नाही; कॉल/ईमेल कृती नाही.')}</small></div>` : ''}${entry.note ? `<p class="person-source-caveat">${esc(localized(ctx, entry.note))}</p>` : ''}<footer>${sourceLink(ctx, entry.sourceUrl)}${assetLink(ctx, entry.sourcePath, source?.publicPath)}</footer></article>`;
    }).join('')}</section>`;
  }
  function profile(ctx, id) {
    const person = [...roster(ctx), ...offices(ctx)].find(item => item.id === id);
    if (!person) return null;
    const external = relatedContact(person);
    const rows = [
      [label(ctx, 'Listed role', 'नोंदवलेले पद'), localized(ctx, person.role)],
      [label(ctx, 'Verified ward number', 'पडताळलेला प्रभाग क्रमांक'), label(ctx, 'Not confirmed', 'पुष्टी नाही')],
      [label(ctx, 'Availability', 'भेटण्याची वेळ'), localized(ctx, person.availability) || label(ctx, 'Not confirmed', 'पुष्टी नाही')],
      [label(ctx, 'Current appointment / complete term', 'सध्याची नियुक्ती / संपूर्ण कार्यकाळ'), label(ctx, 'Not confirmed', 'पुष्टी नाही')],
      [label(ctx, 'Evidence reviewed', 'पुरावा पाहिल्याची तारीख'), date(ctx, person.checkedAt)]
    ];
    const officeEmail = external && person.emailScope === 'office' && /^[\w.+-]+@[\w.-]+\.[a-z]{2,}$/i.test(person.email || '') && !/\.invalid$/i.test(person.email);
    const source = sourceMetadata(person.sourceId);
    return `<div class="person-profile-intro" data-person-category="${esc(person.category)}">${portrait(ctx, person, true)}<div><h3>${esc(name(ctx, person))}</h3><p>${esc(localized(ctx, person.role))}</p>${badge(ctx, person)}</div></div>${fieldRows(rows)}<div class="person-profile-contact">${contact(ctx, person)}${officeEmail ? `<span>${label(ctx, 'Office email', 'कार्यालयीन ईमेल')}: <a href="mailto:${esc(person.email)}">${esc(person.email)}</a></span>` : `<span>${label(ctx, 'Usable GP email not verified', 'वापरता येणारा ग्रामपंचायत ईमेल पडताळलेला नाही')}</span>`}</div>${evidenceSection(ctx, person)}${external ? `<div class="person-source-detail">${person.sourceUpdatedAt ? `<p>${label(ctx, 'Source last updated: ', 'स्रोत अद्ययावत: ')}${date(ctx, person.sourceUpdatedAt)}</p>` : ''}<p>${esc(localized(ctx, source?.note) || localized(ctx, person.detail))}</p>${sourceLink(ctx, person.sourceUrl)}</div>` : ''}`;
  }
  window.GPPeople = Object.freeze({ render, results, profile, overview, thumbnail });
})();
