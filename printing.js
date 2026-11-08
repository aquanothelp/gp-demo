/* Offline, fictional paper-trail previews. Source layouts are historical references,
   not current-use approvals. No credentials, storage, network, seals or QR codes. */
(function () {
  'use strict';

  const SAMPLE_DATE = '2026-11-07';
  const SOURCE_2015 = '2015-07-14 GR; appended notification 2015-07-10';
  const SOURCE_URL_2015 = 'https://aaplesarkar.mahaonline.gov.in/pdf/RTS_Rural_Development_Department_Notification.pdf';
  const formats = {
    residence: { formatId: 'SERVICE-05', sourceId: 'FMS01', form: '2015 residence format', pages: [13], sourceVersion: SOURCE_2015, sourceUrl: SOURCE_URL_2015, paper: 'portrait', en: 'Residence certificate', mr: 'रहिवासी दाखला', warning: 'Historical 2015 residence layout; current-use approval and authority are unverified. This is not Revenue domicile certification. No residence inquiry was performed.', warningMr: 'ऐतिहासिक २०१५ रहिवासी नमुना; सध्याची मंजुरी व प्राधिकरण अपडताळलेले. हा महसूल अधिवास दाखला नाही. रहिवास चौकशी केलेली नाही.' },
    birth: { formatId: 'SERVICE-01', sourceId: 'FMS01', form: 'Form 5', pages: [9], sourceVersion: SOURCE_2015, sourceUrl: SOURCE_URL_2015, paper: 'portrait', en: 'Birth certificate', mr: 'जन्म प्रमाणपत्र', warning: 'Historical 2015 Form 5. No birth register was consulted; current form and Registrar appointment are unverified.', warningMr: 'ऐतिहासिक २०१५ नमुना ५. जन्म नोंदवही तपासलेली नाही; सध्याचा नमुना व निबंधकाची नियुक्ती अपडताळलेली आहे.' },
    death: { formatId: 'CIVIL-06', sourceId: 'FMS03', form: 'Form 6', pages: [20], sourceVersion: 'Rules 2000, effective 2002-05-01; older compilation includes 2021 amendment; issue date unknown', sourceUrl: 'https://bombayhighcourt.gov.in/bhc/libweb/legislation/rules/R2000.001.pdf', paper: 'portrait', en: 'Death certificate', mr: 'मृत्यू प्रमाणपत्र', warning: 'Older Rules compilation Form 6; current form and authority are unverified. Cause of death is excluded. The defective 2015 service-pack death page is not used.', warningMr: 'जुन्या नियम संकलनातील नमुना ६; सध्याचा नमुना व प्राधिकरण अपडताळलेले आहे. मृत्यूचे कारण समाविष्ट नाही. दोषयुक्त २०१५ मृत्यू पृष्ठ वापरलेले नाही.' },
    marriage: { formatId: 'SERVICE-03', sourceId: 'FMS01', form: 'Form E', pages: [11], sourceVersion: SOURCE_2015, sourceUrl: SOURCE_URL_2015, paper: 'portrait', en: 'Certificate of registration of marriage', mr: 'विवाह नोंदणीचे प्रमाणपत्र', warning: '2015 rendering of Form E, section 6(1)/rule 5, with photograph/identifier spaces. This is not a checked register entry or solemnisation.', warningMr: 'कलम ६(१)/नियम ५ मधील नमुना ईचे २०१५ रूप, फोटो/ओळख क्रमांकाच्या जागांसह. ही पडताळलेली विवाह नोंद किंवा विवाह संपन्न केल्याचा पुरावा नाही.' },
    nodues: { formatId: 'SERVICE-08', sourceId: 'FMS01', form: '2015 service format', pages: [16], sourceVersion: SOURCE_2015, sourceUrl: SOURCE_URL_2015, paper: 'portrait', en: 'No Dues Certificate', mr: 'थकबाकी नसल्याचे प्रमाणपत्र', warning: '2015 GP-dues statement only. No GP accounts or period have been checked; it does not clear Revenue, bank or other liabilities.', warningMr: '२०१५ मधील ग्रामपंचायत थकबाकीचे स्वरूप. कोणतेही खाते किंवा कालावधी तपासलेला नाही; महसूल, बँक किंवा इतर देणी यातून निकाली निघत नाहीत.' },
    bpl: { formatId: 'SERVICE-06', sourceId: 'FMS01', form: '2015 service format', pages: [14], sourceVersion: SOURCE_2015, sourceUrl: SOURCE_URL_2015, paper: 'portrait', en: 'Below Poverty Line Certificate', mr: 'दारिद्र्य रेषेखालील कुटुंबाचा दाखला', warning: '2015 list-based format. No authoritative BPL list or eligibility was checked. The historical designation is not proof of a current appointment.', warningMr: '२०१५ मधील यादीवर आधारित नमुना. अधिकृत दारिद्र्यरेषेची यादी किंवा पात्रता तपासलेली नाही. ऐतिहासिक पदनाम सध्याच्या नियुक्तीचा पुरावा नाही.' },
    assessment: { formatId: 'SERVICE-04', sourceId: 'FMS01', form: 'Assessment List Extract — historical 2015 Form 8', pages: [12], sourceVersion: SOURCE_2015, sourceUrl: SOURCE_URL_2015, paper: 'landscape', en: 'Assessment List Extract — historical 2015 format', mr: 'कर आकारणी नोंदवही उतारा — ऐतिहासिक २०१५ नमुना', warning: 'Historical 16-column 2015 extract. The register was substituted in 2016; current certified-extract approval is unknown. Labels are editorially normalized and fields reflowed for legibility, not a facsimile. No title, building permission or tax amount is certified.', warningMr: 'ऐतिहासिक २०१५ उताऱ्याचे १६ स्तंभ. २०१६ मध्ये नोंदवही बदलली; सध्याच्या प्रमाणित उताऱ्याची मंजुरी अपडताळलेली आहे. वाचनीयतेसाठी स्तंभनामे संपादित व मांडणी बदललेली आहे; मूळ प्रतिकृती नाही. मालकीहक्क, बांधकाम परवानगी किंवा कर रक्कम प्रमाणित नाही.' }
  };
  const assessmentRegisterInfo = Object.freeze({ formatId: 'ACCOUNTS-08', sourceId: 'FMS02', form: 'Form 8 — Tax Levy Register', pages: Object.freeze([2, 4]), sourceVersion: '2016-03-03 Gazette; substituted rule 32 and Form 8', sourceUrl: 'https://maharashtra.gov.in/Upload/PDF/Notification%20rdd%203.3.2016.pdf', paper: 'landscape', en: 'Form 8 — Tax Levy Register field study', mr: 'नमुना ८ — कर आकारणी नोंदवही स्तंभ अभ्यास', available: true, warning: 'All 27 numbered register columns are shown in readable groups. This is an institutional register reference, not a citizen certificate, approved certified extract, title evidence or planning approval. No assessment or tax calculation was performed.', warningMr: 'नोंदवहीचे सर्व २७ क्रमांकित स्तंभ वाचनीय गटांत दाखवले आहेत. हा संस्थात्मक नोंदवहीचा संदर्भ आहे; नागरिकाचा दाखला, मंजूर प्रमाणित उतारा, मालकीहक्काचा पुरावा किंवा बांधकाम परवानगी नाही. आकारणी किंवा कर गणना केलेली नाही.' });
  Object.values(formats).forEach(info => { Object.freeze(info.pages); Object.freeze(info); });
  Object.freeze(formats);

  const serviceNames = {
    residence: ['Residence certificate', 'रहिवासी दाखला'], noc: ['No-objection certificate', 'ना हरकत दाखला'], building: ['Building permission', 'बांधकाम परवाना'], taxreceipt: ['Form 10 · Tax receipt', 'नमुना १० · कर पावती'], generalreceipt: ['General receipt', 'सामान्य पावती'], 'marriage-registration': ['Marriage registration', 'विवाह नोंदणी'],
    birth: ['Birth certificate copy', 'जन्म प्रमाणपत्राची प्रत'], assessment: ['Property assessment extract', 'मालमत्ता आकारणी उतारा'],
    marriage: ['Marriage certificate copy', 'विवाह प्रमाणपत्राची प्रत'], nodues: ['No-dues certificate', 'थकबाकी नसल्याचा दाखला'],
    water: ['Water service request', 'पाणीपुरवठा सेवा'], grievance: ['Village issue', 'गावातील समस्या'],
    death: ['Death certificate copy', 'मृत्यू प्रमाणपत्राची प्रत'], bpl: ['BPL certificate request', 'दारिद्र्यरेषेखालील दाखला'],
    niradhar: ['Niradhar age certificate request', 'निराधार योजनेसाठी वयाच्या दाखल्याचा अर्ज']
  };
  const statuses = { submitted: ['Submitted', 'सादर'], review: ['In review', 'पडताळणीत'], action: ['Details needed', 'अधिक माहिती आवश्यक'], approved: ['Demo decision approved', 'डेमो निर्णय मंजूर'], ready: ['Demo output ready', 'डेमो प्रत तयार'], completed: ['Demo complete', 'डेमो पूर्ण'], rejected: ['Demo request rejected', 'डेमो अर्ज नामंजूर'], resolved: ['Demo issue resolved', 'डेमो समस्या निकाली'], referred: ['Demo issue referred', 'डेमो समस्या पुढे पाठवली'] };
  const actions = { approved: ['Decision approved', 'निर्णय मंजूर'], 'output-prepared': ['Demo output prepared', 'डेमो प्रत तयार'], delivered: ['Demo delivery recorded', 'डेमो वितरण नोंदले'], 'resolution-confirmed': ['Resolution confirmed', 'निराकरणाची पुष्टी'], 'response-received': ['Citizen response received', 'नागरिकाचे उत्तर प्राप्त'], 'issue-unresolved': ['Issue reported unresolved', 'समस्या अनिराकृत नोंदली'], 'information-requested': ['Additional information requested', 'अधिक माहिती मागितली'], 'review-started': ['Review started', 'पडताळणी सुरू'], rejected: ['Reasoned rejection recorded', 'कारणासह नामंजुरी नोंदली'], referred: ['Referral recorded', 'पुढे पाठवल्याची नोंद'], resolved: ['Resolution recorded', 'निराकरण नोंदले'] };
  const trustedPreviews = new WeakSet();
  const esc = value => String(value == null ? '' : value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const text = (en, mr, lang) => lang === 'mr' ? mr : en;
  const choose = (value, lang) => {
    if (value == null) return '';
    if (typeof value === 'object') return String(value[lang] || value.en || value.mr || value.name || '');
    return String(value);
  };
  const requestText = (request, key, lang) => lang === 'mr' && request[`${key}Mr`] ? choose(request[`${key}Mr`], lang) : choose(request[key], lang);
  const serviceIdOf = service => typeof service === 'string' ? service : service?.id || '';
  const serviceLabel = (id, lang, service) => choose(service && typeof service === 'object' ? service[lang] || service.en : '', lang) || (serviceNames[id] ? serviceNames[id][lang === 'mr' ? 1 : 0] : id || text('Unspecified service', 'सेवा नमूद नाही', lang));
  const statusLabel = (status, lang) => statuses[status] ? statuses[status][lang === 'mr' ? 1 : 0] : String(status || '—');
  const channelLabel = (request, lang) => request.channel === 'assisted' ? text('Office-assisted (demo)', 'कार्यालयाच्या मदतीने (डेमो)', lang) : text('Citizen (demo)', 'नागरिक (डेमो)', lang);
  const actorLabel = (actor, lang) => actor === 'office' ? text('Demo office', 'डेमो कार्यालय', lang) : actor === 'citizen' ? text('Demo citizen', 'डेमो नागरिक', lang) : String(actor || '—');
  const actionLabel = (action, lang) => actions[action] ? actions[action][lang === 'mr' ? 1 : 0] : String(action || '');
  function dateLabel(value, lang, withTime = false) {
    if (!value) return '—';
    const date = new Date(value);
    if (!Number.isFinite(date.getTime())) return String(value);
    return new Intl.DateTimeFormat(lang === 'mr' ? 'mr-IN' : 'en-IN', { year: 'numeric', month: 'short', day: 'numeric', ...(withTime ? { hour: '2-digit', minute: '2-digit' } : {}), timeZone: 'Asia/Kolkata' }).format(date);
  }
  const blank = '<span class="print-blank" aria-label="Blank / रिक्त">________________</span>';
  const fieldValue = value => value === '' || value == null ? blank : esc(value);
  const fields = rows => `<dl class="print-fields">${rows.map(([label, value]) => `<div class="print-field"><dt>${esc(label)}</dt><dd>${fieldValue(value)}</dd></div>`).join('')}</dl>`;
  const section = (heading, html) => `<section class="print-section"><h2>${esc(heading)}</h2>${html}</section>`;
  const paragraph = value => `<p class="print-preserve">${esc(value)}</p>`;
  function table(headings, rows, className = '') {
    return `<div class="print-table-wrap"><table class="print-table ${className}"><thead><tr>${headings.map(heading => `<th scope="col">${esc(heading)}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(value => `<td>${fieldValue(value)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  }
  function getFormatInfo(service) {
    const id = serviceIdOf(service);
    const info = formats[id];
    if (info) return { ...info, pages: [...info.pages], available: true, label: info.en, labelMr: info.mr, historical: true, approvedCurrent: false };
    const age = id === 'niradhar';
    return {
      available: false, approvedCurrent: false, serviceId: id,
      label: serviceNames[id]?.[0] || 'No supported certificate format', labelMr: serviceNames[id]?.[1] || 'प्रमाणपत्राचा समर्थित नमुना नाही',
      reason: age ? 'A source-verified Niradhar age-certificate format has not been located. SERVICE-10 is a destitution statement, not an age certificate. Print the application or case history instead.' : 'This journey has no source-mapped certificate in this demo. Print its application, acknowledgement or case history instead.',
      reasonMr: age ? 'निराधार योजनेच्या वयाच्या दाखल्याचा स्रोत-पडताळलेला नमुना उपलब्ध नाही. SERVICE-10 हा निराधार असल्याचा दाखला आहे; वयाचा दाखला नाही. अर्ज किंवा केसचा इतिहास छापा.' : 'या सेवेसाठी डेमोमध्ये स्रोताशी जोडलेले प्रमाणपत्र नाही. अर्ज, पोहोच किंवा केसचा इतिहास छापा.'
    };
  }
  const supportsCertificate = service => Boolean(formats[serviceIdOf(service)]);

  function context(options) {
    const lang = options.lang === 'mr' ? 'mr' : 'en';
    const gp = options.gp || {};
    return { ...options, lang, gp, code: String(gp.code || ''), gpName: choose(gp[lang] || gp.name || gp.en || gp.mr, lang) || text('Unspecified Gram Panchayat', 'ग्रामपंचायत नमूद नाही', lang), district: choose(gp.district, lang), samiti: choose(gp.samiti, lang), taluka: choose(gp.taluka, lang), sample: options.kind === 'format' };
  }
  function sourceFor(kind, info) {
    if (info?.available) return { id: info.formatId, sourceId: info.sourceId, version: info.sourceVersion, pages: info.pages.join(', '), note: `${info.form} — historical source layout; current-use approval not established.` };
    if (kind === 'application' || kind === 'acknowledgement') return { id: 'APPLICATION-01', sourceId: 'FMS01', version: SOURCE_2015, pages: '7', note: 'Prototype intake/receipt summary, with historical application/acknowledgement field reference; not an exact prescribed form or fee receipt.' };
    return { id: 'PROTOTYPE-PAPER-TRAIL', sourceId: 'Local demo', version: SAMPLE_DATE, pages: 'not applicable', note: 'Prototype summary only; not a prescribed statutory register, issued certificate or revenue receipt.' };
  }
  function documentShell(ctx, title, body, paper, info) {
    const { lang } = ctx;
    const source = sourceFor(ctx.kind, info);
    const warning = text('DEMO / NOT VALID — FICTIONAL DATA ONLY', 'डेमो / वैध नाही — फक्त काल्पनिक माहिती', lang);
    const sourceLine = `${source.id} · ${source.sourceId} · ${source.version} · PDF p. ${source.pages} · Reviewed ${SAMPLE_DATE}`;
    const html = `<div class="print-preview" lang="${lang}" data-document-kind="${esc(ctx.kind)}" data-paper="${paper}" data-format-id="${esc(source.id)}"><article class="print-sheet"><table class="print-page-frame" role="presentation"><thead class="print-page-head"><tr><td><div class="print-running-warning" aria-hidden="true">${esc(warning)} · GP ${esc(ctx.code)}${ctx.request?.id ? ` · ${esc(ctx.request.id)}` : ""}</div></td></tr></thead><tfoot class="print-page-foot"><tr><td><div class="print-running-footer" aria-hidden="true">${esc(sourceLine)}<br><span>${esc(text("UNSIGNED DEMO · Historical/adapted reference · Not approved for live issuance", "सही नसलेला डेमो · ऐतिहासिक/संपादित संदर्भ · प्रत्यक्ष वितरणासाठी मंजूर नाही", lang))}</span></div></td></tr></tfoot><tbody><tr><td class="print-page-content"><header class="print-document-header"><p class="print-demo-warning">${esc(warning)}</p><div class="print-office-heading"><strong>${esc(ctx.gpName)}</strong><span>GP ${esc(ctx.code || '—')} · ${esc([ctx.samiti ? `${text('Panchayat Samiti', 'पंचायत समिती', lang)}: ${ctx.samiti}` : '', ctx.district ? `${text('District', 'जिल्हा', lang)}: ${ctx.district}` : '', text('Maharashtra', 'महाराष्ट्र', lang)].filter(Boolean).join(' · '))}</span>${ctx.gp.officeName ? `<small>${esc(choose(ctx.gp.officeName, lang))} · ${esc(text('sample office', 'नमुना कार्यालय', lang))}</small>` : ''}</div><h1>${esc(title)}</h1><p class="print-document-meta">${esc(text('Fixed demo print date', 'डेमो छपाई दिनांक', lang))}: ${esc(dateLabel(SAMPLE_DATE, lang))}${ctx.request ? ` · ${esc(text('Demo case', 'डेमो केस', lang))}: ${esc(ctx.request.id || '—')}` : ''}</p></header><div class="print-document-body">${body}</div><aside class="print-source-note" data-source-id="${esc(source.sourceId)}"><strong>${esc(text('Source / version and limits', 'स्रोत / आवृत्ती आणि मर्यादा', lang))}</strong><p>${esc(sourceLine)}</p><p>${esc(info?.available ? (lang === 'mr' ? info.warningMr : info.warning) : text(source.note, ctx.kind === 'application' || ctx.kind === 'acknowledgement' ? 'हा डेमो अर्ज/पोहोच सारांश आहे; ऐतिहासिक अर्ज/पोहोच नमुना फक्त संदर्भासाठी. हा तंतोतंत विहित अर्ज किंवा शुल्क पावती नाही.' : 'हा फक्त डेमो सारांश आहे; विहित वैधानिक नोंदवही, वितरित प्रमाणपत्र किंवा महसुली पावती नाही.', lang))}</p><p>${esc(text('No official issue, signature, seal, QR validation, payment or government submission. Manual fields are blank; do not sign or use this fictional copy for a real transaction.', 'अधिकृत वितरण, सही, शिक्का, क्यूआर पडताळणी, शुल्क किंवा शासकीय सादरीकरण केलेले नाही. कार्यालयीन जागा रिक्त आहेत; प्रत्यक्ष व्यवहारासाठी या काल्पनिक प्रतीवर सही करू नका किंवा वापरू नका.', lang))}</p></aside></td></tr></tbody></table></article></div>`;
    const preview = Object.freeze({ title, html, paper, formatId: info?.formatId || source.id });
    trustedPreviews.add(preview);
    return preview;
  }
  function manualTrail(lang, includeApplicant = true) {
    return section(text('Paper trail — blank manual record spaces', 'कागदी नोंद — कार्यालयीन नोंदीसाठी रिक्त जागा', lang), `<p class="print-small">${esc(text('Illustrative spaces only. No physical receipt, dispatch or verification has occurred.', 'फक्त नमुना जागा. प्रत्यक्ष पोहोच, जावक किंवा पडताळणी झालेली नाही.', lang))}</p>${fields([
      [text('Office inward / file number', 'कार्यालयीन आवक / फाईल क्रमांक', lang), ''], [text('Physical receipt date / time', 'प्रत्यक्ष प्राप्ती दिनांक / वेळ', lang), ''],
      [text('Receiving staff name / signature', 'स्वीकारणाऱ्या कर्मचाऱ्याचे नाव / सही', lang), ''], [text('Dispatch number / date', 'जावक क्रमांक / दिनांक', lang), ''],
      ...(includeApplicant ? [[text('Applicant receipt acknowledgement / date', 'अर्जदाराची पोहोच / दिनांक', lang), '']] : []), [text('Signature / receipt record (blank)', 'सही / पोहोच नोंद (रिक्त)', lang), '']
    ])}`);
  }
  function requestSummary(ctx) {
    const { request: r, lang } = ctx;
    return fields([
      [text('Demo reference', 'डेमो अर्ज क्रमांक', lang), r.id], [text('Service', 'सेवा', lang), serviceLabel(r.service, lang, ctx.service)],
      [text('Applicant — fictional', 'अर्जदार — काल्पनिक', lang), r.applicant], [text('Channel', 'अर्जाचा मार्ग', lang), channelLabel(r, lang)],
      [text('Recorded at (IST)', 'नोंद वेळ (भारतीय प्रमाणवेळ)', lang), dateLabel(r.created, lang, true)], [text('Current demo status', 'सध्याची डेमो स्थिती', lang), statusLabel(r.status, lang)]
    ]);
  }
  function renderApplication(ctx) {
    const { request: r, lang } = ctx;
    return requestSummary(ctx) + section(text('Applicant and request details', 'अर्जदार आणि अर्जाचा तपशील', lang), fields([
      [text('Sample contact number (if supplied)', 'नमुना संपर्क क्रमांक (दिल्यास)', lang), r.mobile || ''], [text('Location / ward / landmark', 'ठिकाण / प्रभाग / खूण', lang), requestText(r, 'location', lang)],
      [text('Existing source-register reference', 'मूळ नोंदवहीतील संदर्भ', lang), requestText(r, 'register', lang)], [text('Attachment filename only — no contents retained', 'फक्त जोडपत्राचे नाव — मजकूर जतन नाही', lang), r.attachment || '']
    ]) + paragraph(requestText(r, 'details', lang))) + section(text('Applicant declaration / signature space', 'अर्जदाराचे निवेदन / सहीची जागा', lang), paragraph(text('This is a fictional request summary. No official application or supporting document has been submitted. No fee is collected by this demo.', 'हा काल्पनिक अर्जाचा सारांश आहे. अधिकृत अर्ज किंवा आधार कागदपत्रे सादर केलेली नाहीत. डेमोमध्ये कोणतेही शुल्क घेतले जात नाही.', lang)) + fields([[text('Applicant signature / date — blank', 'अर्जदाराची सही / दिनांक — रिक्त', lang), '']])) + manualTrail(lang);
  }
  function renderAcknowledgement(ctx) {
    const { lang } = ctx;
    return `<p class="print-notice">${esc(text('DEMO ACKNOWLEDGEMENT — the reference records activity in this browser only. It is not proof that a government office received an application.', 'डेमो पोहोच — अर्ज क्रमांक फक्त या ब्राउझरमधील नोंद दर्शवतो. सरकारी कार्यालयाने अर्ज स्वीकारल्याचा हा पुरावा नाही.', lang))}</p>` + requestSummary(ctx) + section(text('Request recorded', 'नोंदवलेला अर्ज', lang), paragraph(requestText(ctx.request, 'details', lang))) + fields([[text('Fee collected by demo', 'डेमोमध्ये घेतलेले शुल्क', lang), text('None — no payment or fee receipt', 'काहीही नाही — शुल्क किंवा पावती नाही', lang)]]) + manualTrail(lang);
  }
  function renderHistory(ctx) {
    const { request: r, lang } = ctx;
    const events = Array.isArray(r.events) ? r.events : [];
    return requestSummary(ctx) + section(text('Request details', 'अर्जाचा तपशील', lang), paragraph(requestText(r, 'details', lang)) + fields([[text('Source-register reference', 'मूळ नोंदवहीतील संदर्भ', lang), requestText(r, 'register', lang)], [text('Attachment filename only', 'फक्त जोडपत्राचे नाव', lang), r.attachment || '']])) + section(text('Full case history — recorded sequence', 'केसचा संपूर्ण इतिहास — नोंदवलेला क्रम', lang), events.length ? `<ol class="print-history">${events.map((item, index) => `<li class="print-history-entry"><div class="print-history-heading"><strong>${index + 1}. ${esc(statusLabel(item.status, lang))}${item.action ? ` · ${esc(actionLabel(item.action, lang))}` : ''}</strong><span>${esc(dateLabel(item.at, lang, true))} · ${esc(actorLabel(item.actor, lang))}</span></div><p class="print-preserve">${esc(requestText(item, 'note', lang))}</p></li>`).join('')}</ol>` : paragraph(text('No timeline entries are recorded for this demo request.', 'या डेमो अर्जासाठी इतिहासाची नोंद नाही.', lang))) + workflowEvidence(ctx) + manualTrail(lang);
  }
  function workflowEvidence(ctx) {
    const { request: r, lang } = ctx;
    const blocks = [];
    const add = (headingEn, headingMr, rows) => blocks.push(section(text(headingEn, headingMr, lang), fields(rows)));
    const at = record => [text('Recorded at (IST)', 'नोंद वेळ (भारतीय प्रमाणवेळ)', lang), dateLabel(record.at, lang, true)];
    const actor = record => [text('Recorded actor', 'नोंद करणारा', lang), actorLabel(record.actor, lang)];
    if (r.verification && typeof r.verification === 'object') {
      const v = r.verification;
      add('Recorded sample verification', 'नोंदवलेली नमुना पडताळणी', [
        [text('Record-check assertion', 'नोंद तपासल्याचे निवेदन', lang), v.recordChecked === true ? text('Recorded as checked in demo; not independently verified', 'डेमोमध्ये तपासल्याची नोंद; स्वतंत्र पडताळणी नाही', lang) : v.recordChecked === false ? text('Recorded as not checked', 'न तपासल्याची नोंद', lang) : ''],
        [text('Verification reference', 'पडताळणी संदर्भ', lang), v.reference || ''], at(v), actor(v)
      ]);
    }
    if (r.decision && typeof r.decision === 'object') {
      const d = r.decision;
      const outcome = d.outcome === 'approved' ? text('Approved — recorded demo decision', 'मंजूर — नोंदवलेला डेमो निर्णय', lang) : d.outcome === 'rejected' ? text('Rejected — recorded demo decision', 'नामंजूर — नोंदवलेला डेमो निर्णय', lang) : choose(d.outcome, lang);
      add('Recorded decision — not inferred from status', 'नोंदवलेला निर्णय — स्थितीवरून गृहीत नाही', [
        [text('Outcome', 'निर्णय', lang), outcome], [text('Reason', 'कारण', lang), choose(d.reason, lang)],
        [text('Authority as recorded — appointment unverified', 'नोंदवलेले प्राधिकरण — नियुक्ती अपडताळलेली', lang), choose(d.authority, lang)],
        [text('Verification reference in decision', 'निर्णयातील पडताळणी संदर्भ', lang), choose(d.verificationReference, lang)], at(d)
      ]);
      if (d.appeal && typeof d.appeal === 'object') add('Recorded appeal guidance — live details unverified', 'नोंदवलेले अपील मार्गदर्शन — प्रत्यक्ष तपशील अपडताळलेले', [
        [text('Appeal authority', 'अपील प्राधिकारी', lang), choose(d.appeal.authority, lang)], [text('Contact', 'संपर्क', lang), choose(d.appeal.contact, lang)], [text('Filing-period guidance as recorded', 'नोंदवलेली अपील मुदतीची माहिती', lang), choose(d.appeal.period, lang)]
      ]);
    }
    if (r.output && typeof r.output === 'object') {
      const o = r.output;
      add('Recorded demo output preparation', 'नोंदवलेली डेमो प्रत तयारी', [
        [text('Prepared flag', 'तयार असल्याची नोंद', lang), o.prepared === true ? text('Yes — demo flag only', 'होय — फक्त डेमो नोंद', lang) : o.prepared === false ? text('No', 'नाही', lang) : ''],
        [text('Output reference', 'प्रत संदर्भ', lang), choose(o.reference, lang)], [text('Format reference as recorded', 'नोंदवलेला नमुना संदर्भ', lang), choose(o.formatId, lang)], at(o)
      ]);
    }
    if (r.delivery && typeof r.delivery === 'object') {
      const d = r.delivery;
      const modes = { counter: ['Counter', 'कार्यालयात'], post: ['Post', 'टपाल'], download: ['Download', 'डाउनलोड'] };
      add('Recorded demo delivery', 'नोंदवलेले डेमो वितरण', [[text('Method', 'पद्धत', lang), modes[d.mode]?.[lang === 'mr' ? 1 : 0] || choose(d.mode, lang)], [text('Sample recipient', 'नमुना प्राप्तकर्ता', lang), choose(d.recipient, lang)], [text('Delivery reference', 'वितरण संदर्भ', lang), choose(d.reference, lang)], [text('Delivery note', 'वितरण नोंद', lang), choose(d.note, lang)], at(d), actor(d)]);
    }
    if (r.referral && typeof r.referral === 'object') {
      const f = r.referral;
      add('Recorded referral', 'नोंदवलेला पुढील संदर्भ', [[text('Referred to', 'पुढे पाठवलेले कार्यालय', lang), choose(f.to, lang)], [text('Reason', 'कारण', lang), choose(f.reason, lang)], at(f), actor(f)]);
    }
    if (r.resolution && typeof r.resolution === 'object') {
      const v = r.resolution;
      add('Recorded local-issue resolution', 'नोंदवलेले स्थानिक समस्येचे निराकरण', [[text('Resolution note', 'निराकरणाची नोंद', lang), choose(v.note, lang)], at(v), actor(v)]);
    }
    if (r.confirmation && typeof r.confirmation === 'object') {
      const c = r.confirmation;
      add('Recorded resolution confirmation', 'निराकरणाची नोंदवलेली पुष्टी', [[text('Confirmed by', 'पुष्टी करणारा', lang), actorLabel(c.by, lang)], [text('Confirmation note', 'पुष्टीची नोंद', lang), choose(c.note, lang)], at(c), actor(c)]);
    }
    return blocks.length ? `<div class="print-workflow-record">${paragraph(text('The following fields reproduce explicit demo records. A status label alone is never treated as approval, preparation or delivery; absent records are not invented.', 'खालील माहिती स्पष्ट डेमो नोंदींवर आधारित आहे. फक्त स्थितीवरून मंजुरी, प्रत तयारी किंवा वितरण गृहीत धरलेले नाही; नसलेल्या नोंदी तयार केलेल्या नाहीत.', lang))}${blocks.join('')}</div>` : '';
  }
  function renderList(ctx, citizen) {
    const { lang } = ctx;
    const list = ctx.requests;
    const filter = choose(ctx.filter, lang) || text('All statuses', 'सर्व स्थिती', lang);
    const intro = fields([[text('Scope', 'व्याप्ती', lang), citizen ? text('One fictional Demo Citizen in this selected GP', 'निवडलेल्या ग्रामपंचायतीतील एक काल्पनिक डेमो नागरिक', lang) : text('Selected GP and currently visible Admin filter', 'निवडलेली ग्रामपंचायत आणि सध्याचा प्रशासक फिल्टर', lang)], [text('Visible filter', 'दिसणारा फिल्टर', lang), filter], [text('Number of visible requests', 'दिसणाऱ्या अर्जांची संख्या', lang), String(list.length)]]);
    if (!list.length) return intro + `<p class="print-notice">${esc(text('No visible demo requests in this scope. No other GP data is included.', 'या व्याप्तीत डेमो अर्ज नाहीत. इतर ग्रामपंचायतींची माहिती समाविष्ट नाही.', lang))}</p>`;
    const headers = [text('Reference', 'अर्ज क्रमांक', lang), text('Service', 'सेवा', lang), text('Applicant', 'अर्जदार', lang), text('Channel', 'मार्ग', lang), text('Status', 'स्थिती', lang), text('Recorded (IST)', 'नोंद वेळ', lang), text('Latest update (IST)', 'शेवटची नोंद', lang), text('Manual dispatch no. / date — blank', 'जावक क्र. / दिनांक — रिक्त', lang), text('Receipt / signature — blank', 'पोहोच / सही — रिक्त', lang)];
    return intro + table(headers, list.map(r => {
      const events = Array.isArray(r.events) ? r.events : [];
      return [r.id, serviceLabel(r.service, lang), r.applicant, channelLabel(r, lang), statusLabel(r.status, lang), dateLabel(r.created, lang, true), dateLabel(events.length ? events[events.length - 1].at : r.created, lang, true), '', ''];
    }), 'print-register-table') + paragraph(text('Manual columns are unfilled paper-trail spaces, not evidence of dispatch or delivery. This list is a prototype view, not a prescribed statutory register.', 'कार्यालयीन स्तंभ रिक्त जागा आहेत; जावक किंवा वितरणाचा पुरावा नाही. ही डेमो यादी आहे; विहित वैधानिक नोंदवही नाही.', lang));
  }
  function renderProfile(ctx) {
    const { lang, gp } = ctx;
    const enabled = Array.isArray(gp.services) ? gp.services : [];
    return fields([
      [text('Gram Panchayat', 'ग्रामपंचायत', lang), ctx.gpName], [text('GP code — snapshot identity', 'ग्रामपंचायत क्रमांक — दिनांकित ओळख', lang), ctx.code],
      [text('State', 'राज्य', lang), choose(gp.state, lang) || text('Maharashtra', 'महाराष्ट्र', lang)], [text('District', 'जिल्हा', lang), ctx.district],
      [text('Panchayat Samiti / block', 'पंचायत समिती / गट', lang), ctx.samiti], [text('Office name — sample', 'कार्यालयाचे नाव — नमुना', lang), choose(gp.officeName, lang)]
    ]) + section(text('Enabled demo services', 'निवडलेल्या डेमो सेवा', lang), enabled.length ? `<ul class="print-service-list">${enabled.map(value => `<li>${esc(serviceLabel(serviceIdOf(value), lang, value))}</li>`).join('')}</ul>` : paragraph(text('No service configuration supplied to this preview.', 'या पूर्वदृश्यासाठी सेवांची निवड दिलेली नाही.', lang))) + paragraph(text('This sheet describes only the supplied demo GP identity/configuration. Official appointment, office contacts, signatures, authority and live activation are not verified.', 'हे पृष्ठ फक्त दिलेली डेमो ग्रामपंचायत ओळख/निवड दर्शवते. अधिकृत नियुक्ती, संपर्क, सही, प्राधिकरण किंवा प्रत्यक्ष सक्रियता पडताळलेली नाही.', lang));
  }
  function formData(ctx) {
    const { lang, sample } = ctx;
    const r = ctx.request || {};
    return {
      applicant: r.applicant || text('Demo Citizen', 'नमुना नागरिक', lang),
      reference: r.id || `DEMO-${ctx.code || 'GP'}-FORMAT`,
      register: requestText(r, 'register', lang) || (sample ? 'DEMO-REG-001' : ''),
      residence: requestText(r, 'location', lang) || (sample ? `${ctx.gpName} — ${text('fictional residence', 'काल्पनिक निवास', lang)}` : ''),
      value(en, mr) { return sample ? text(en, mr, lang) : ''; }
    };
  }
  function sourceSignature(ctx, designation) {
    return section(text('Signature / seal spaces from the source — left blank', 'स्रोतातील सही / शिक्क्याच्या जागा — रिक्त', ctx.lang), fields([
      [text('Designation printed in historical source', 'ऐतिहासिक स्रोतात छापलेले पदनाम', ctx.lang), designation],
      [text('Signature of issuing authority — blank', 'वितरण प्राधिकाऱ्याची सही — रिक्त', ctx.lang), ''],
      [text('Seal — no seal applied', 'शिक्का — लावलेला नाही', ctx.lang), '']
    ]));
  }
  function renderCivil(ctx, death) {
    const { lang } = ctx;
    const d = formData(ctx);
    const rows = death ? [
      [text('Name', 'नाव', lang), d.applicant], [text('Sex', 'लिंग', lang), d.value('Sample — not recorded', 'नमुना — नोंद नाही')],
      [text('Date of Death', 'मृत्यू दिनांक', lang), d.value('2026-01-02 (fictional)', '२०२६-०१-०२ (काल्पनिक)')], [text('Place of Death', 'मृत्यूचे ठिकाण', lang), d.residence],
      [text('Name of Father', 'वडिलांचे नाव', lang), d.value('Demo Father', 'नमुना वडील')], [text('Name of Mother', 'आईचे नाव', lang), d.value('Demo Mother', 'नमुना आई')]
    ] : [
      [text('Name of Child', 'बाळाचे पूर्ण नाव', lang), d.applicant], [text('Sex', 'लिंग', lang), d.value('Sample — not recorded', 'नमुना — नोंद नाही')],
      [text('Date of Birth', 'जन्म तारीख', lang), d.value('2020-01-02 (fictional)', '२०२०-०१-०२ (काल्पनिक)')], [text('Place of Birth', 'जन्म ठिकाण', lang), d.residence],
      [text('Full Name of Mother', 'आईचे पूर्ण नाव', lang), d.value('Demo Mother', 'नमुना आई')], [text('Full Name of Father', 'वडिलांचे पूर्ण नाव', lang), d.value('Demo Father', 'नमुना वडील')],
      [text('Address of parents at the time of birth', 'जन्मावेळी आई-वडिलांचा पत्ता', lang), d.residence], [text('Permanent Address of the parents', 'आई-वडिलांचा कायमचा पत्ता', lang), d.value('Fictional sample address', 'काल्पनिक नमुना पत्ता')],
      [text('Aadhaar number — historical field; not collected', 'आधार क्रमांक — ऐतिहासिक जागा; घेतलेला नाही', lang), '']
    ];
    return `<p class="print-form-caption">${esc(death ? 'Form 6 — [See Rule 8] — Issued under Section 12/17 (historical source heading)' : 'Form 5 — Section 12/17; Rules 8/13 (2015 source heading)')}</p><p class="print-notice">${esc(text('Fictional form content only. The intake applicant is shown for demonstration; this does not identify a real child, deceased person or original register entry. Uncollected source fields remain blank.', 'फक्त काल्पनिक नमुना मजकूर. अर्जदाराचे नाव डेमोसाठी वापरले आहे; प्रत्यक्ष बालक, मृत व्यक्ती किंवा मूळ नोंदीची ओळख दर्शवत नाही. न घेतलेली मूळ माहिती रिक्त ठेवली आहे.', lang))}</p>` + fields([
      ...(!death ? [[text('Certificate No. — DEMO reference', 'प्रमाणपत्र क्र. — डेमो संदर्भ', lang), d.reference]] : []),
      [text('Local area / local body', 'स्थानिक क्षेत्र / संस्था', lang), ctx.gpName], [text('Tehsil / block — unverified if blank', 'तालुका / गट — रिक्त असल्यास अपडताळलेला', lang), ctx.taluka], [text('District', 'जिल्हा', lang), ctx.district],
      ...rows, [text('Registration No. — sample / unverified', 'नोंदणी क्र. — नमुना / अपडताळलेला', lang), d.register], [text('Date of Registration', 'नोंदणी दिनांक', lang), death ? d.value('2026-01-03 (fictional)', '२०२६-०१-०३ (काल्पनिक)') : d.value('2020-01-03 (fictional)', '२०२०-०१-०३ (काल्पनिक)')],
      ...(!death ? [[text('Remarks (if any)', 'शेरा (असल्यास)', lang), text('DEMO ONLY — no record certified', 'फक्त डेमो — नोंद प्रमाणित नाही', lang)]] : []), [text('Certificate Issue Date — DEMO only', 'प्रमाणपत्र दिनांक — फक्त डेमो', lang), dateLabel(SAMPLE_DATE, lang)]
    ]) + (death ? paragraph(text('Source restriction: No disclosure shall be made of particulars regarding the cause of death as entered in the Register. No cause-of-death field is included here.', 'स्रोत मर्यादा: नोंदवहीतील मृत्यूच्या कारणाचा तपशील उघड करू नये. येथे मृत्यूच्या कारणाचा स्तंभ समाविष्ट नाही.', lang)) : '') + sourceSignature(ctx, text('Registrar of Births and Deaths — historical designation; appointment unverified', 'जन्म-मृत्यू निबंधक — ऐतिहासिक पदनाम; नियुक्ती अपडताळलेली', lang));
  }
  function renderMarriage(ctx) {
    const { lang } = ctx;
    const d = formData(ctx);
    return `<p class="print-form-caption">Form E · See Section 6(1) and Rule 5 · 2015 rendering</p><p class="print-notice">${esc(text('Fictional source-field preview. No marriage or registration has been verified; the demo applicant occupies one sample name space only.', 'काल्पनिक स्रोत-स्तंभ पूर्वदृश्य. विवाह किंवा नोंदणी पडताळलेली नाही; डेमो अर्जदाराचे नाव फक्त एका नमुना जागेत दाखवले आहे.', lang))}</p><div class="print-photo-row"><div>${esc(text('Husband photograph — blank', 'पतीचा फोटो — रिक्त', lang))}</div><div>${esc(text('Wife photograph — blank', 'पत्नीचा फोटो — रिक्त', lang))}</div></div>` + fields([
      [text('Husband Name', 'पतीचे नाव', lang), d.applicant], [text('Husband residence', 'पतीचा पत्ता', lang), d.residence],
      [text('Husband Aadhaar — historical field; blank', 'पतीचा आधार — ऐतिहासिक जागा; रिक्त', lang), ''], [text('Wife Name', 'पत्नीचे नाव', lang), d.value('Demo Spouse', 'नमुना जोडीदार')],
      [text('Wife residence', 'पत्नीचा पत्ता', lang), d.value('Fictional sample address', 'काल्पनिक नमुना पत्ता')], [text('Wife Aadhaar — historical field; blank', 'पत्नीचा आधार — ऐतिहासिक जागा; रिक्त', lang), ''],
      [text('Marriage solemnized on', 'विवाह दिनांक', lang), d.value('2020-02-03 (fictional)', '२०२०-०२-०३ (काल्पनिक)')], [text('Marriage solemnized at', 'विवाहाचे ठिकाण', lang), d.value('Fictional sample place', 'काल्पनिक नमुना ठिकाण')],
      [text('Register Volume', 'नोंदवही खंड क्रमांक', lang), d.value('DEMO-VOL-01', 'DEMO-VOL-01')], [text('Register Serial No.', 'नोंदवही अनुक्रमांक', lang), d.register],
      [text('Registered on', 'नोंदणी दिनांक', lang), d.value('2020-02-04 (fictional)', '२०२०-०२-०४ (काल्पनिक)')], [text('Place', 'ठिकाण', lang), ctx.gpName], [text('Date — DEMO only', 'दिनांक — फक्त डेमो', lang), dateLabel(SAMPLE_DATE, lang)]
    ]) + sourceSignature(ctx, text('Registrar of Marriage / Gramsevak / Village Development Officer — as printed in 2015; appointment unverified', 'विवाह निबंधक / ग्रामसेवक / ग्रामविकास अधिकारी — २०१५ स्रोतानुसार; नियुक्ती अपडताळलेली', lang));
  }
  function renderResidence(ctx) {
    const { lang } = ctx, d = formData(ctx);
    return fields([
      [text('GP office', 'ग्रामपंचायत कार्यालय', lang), ctx.gpName],
      [text('Taluka', 'तालुका', lang), ctx.taluka], [text('District', 'जिल्हा', lang), ctx.district],
      [text('Demo dispatch reference', 'डेमो जावक संदर्भ', lang), d.reference],
      [text('Demo date', 'डेमो दिनांक', lang), dateLabel(SAMPLE_DATE, lang)],
      [text('Applicant', 'अर्जदार', lang), d.applicant], [text('Residence / village', 'रहिवास / गाव', lang), d.residence],
      [text('Permanent / temporary — not verified', 'कायम / तात्पुरता — अपडताळलेले', lang), ''],
      [text('Residence inquiry reference — not checked', 'रहिवास चौकशी संदर्भ — तपासलेला नाही', lang), ''],
      [text('Identity field — not collected', 'ओळख क्रमांक — घेतलेला नाही', lang), ''],
      [text('Place', 'ठिकाण', lang), ctx.gpName]
    ]) + paragraph(text('Historical residence-statement field structure only; no residence or eligibility is certified by this demo.', 'फक्त ऐतिहासिक रहिवासी दाखल्याच्या जागांची रचना; डेमोतून रहिवास किंवा पात्रता प्रमाणित होत नाही.', lang)) + sourceSignature(ctx, text('Historical signatory space — unsigned', 'ऐतिहासिक स्वाक्षरीची जागा — स्वाक्षरी नाही', lang));
  }
  function renderLocalCertificate(ctx, bpl) {
    const { lang } = ctx;
    const d = formData(ctx);
    const sourceStatement = bpl ? text('Source statement structure: the named resident appears in the Below Poverty Line list for the stated year and list number. No such list has been checked in this demo.', 'स्रोत वाक्यरचना: नमूद व्यक्तीचे नाव दिलेल्या वर्षाच्या दारिद्र्यरेषेखालील यादीत दिलेल्या क्रमांकावर आहे. डेमोमध्ये अशी कोणतीही यादी तपासलेली नाही.', lang) : text('Source statement structure: the named permanent resident has no balance due towards this Gram Panchayat; issued on the applicant’s request. No dues or residence have been checked in this demo.', 'स्रोत वाक्यरचना: नमूद कायम रहिवाशाकडे या ग्रामपंचायतीची कोणत्याही प्रकारची थकबाकी नाही; अर्जदाराच्या विनंतीनुसार दाखला. डेमोमध्ये थकबाकी किंवा रहिवास तपासलेला नाही.', lang);
    return fields([
      [text('Grampanchayat Office', 'ग्रामपंचायत कार्यालय', lang), choose(ctx.gp.officeName, lang) || ctx.gpName], [text('Taluka — unverified if blank', 'तालुका — रिक्त असल्यास अपडताळलेला', lang), ctx.taluka], [text('District', 'जिल्हा', lang), ctx.district],
      [text('Dispatch no. — DEMO reference, not official dispatch', 'जावक क्र. — डेमो संदर्भ; अधिकृत जावक नाही', lang), d.reference], [text('Date — DEMO only', 'दिनांक — फक्त डेमो', lang), dateLabel(SAMPLE_DATE, lang)],
      [text('Mr. / Mrs. — fictional applicant', 'श्री. / श्रीमती — काल्पनिक अर्जदार', lang), d.applicant], [text('Aadhaar number — historical field; not collected', 'आधार क्रमांक — ऐतिहासिक जागा; घेतलेला नाही', lang), ''],
      [text('Residing at / village', 'राहणार / गाव', lang), d.residence],
      ...(bpl ? [[text('Below Poverty Line list year', 'दारिद्र्यरेषेखालील यादीचे वर्ष', lang), d.value('DEMO-YEAR — unverified', 'डेमो वर्ष — अपडताळलेले')], [text('Below Poverty Line list number', 'दारिद्र्यरेषेखालील यादीतील क्रमांक', lang), d.value('DEMO-LIST-001', 'DEMO-LIST-001')], [text('Relationship line as printed — blank', 'स्रोतातील नातेसंबंधाची जागा — रिक्त', lang), '']] : []),
      [text('Place', 'ठिकाण', lang), ctx.gpName]
    ]) + `<p class="print-notice">${esc(sourceStatement)}</p>` + sourceSignature(ctx, bpl ? text('Gramsevak / Village Development Officer — historical printed designation', 'ग्रामसेवक / ग्रामविकास अधिकारी — ऐतिहासिक छापील पदनाम', lang) : text('Sarpanch / Gramsevak / Village Development Officer — historical printed designations', 'सरपंच / ग्रामसेवक / ग्रामविकास अधिकारी — ऐतिहासिक छापील पदनामे', lang));
  }
  function renderAssessmentExtract(ctx) {
    const { lang } = ctx;
    const d = formData(ctx);
    const columns = [
      ['Serial No.', 'अनुक्रमांक', d.value('1', '१')], ['Property / house No.', 'मिळकत नंबर / घर क्र.', d.register],
      ['Property description', 'मिळकतीचे वर्णन', d.value('Fictional sample house', 'काल्पनिक नमुना घर')], ['Owner name — source Marathi label', 'मालकाचे नाव — मूळ मराठी स्तंभ', d.applicant],
      ["Occupier's name", 'भोगवटा करणाऱ्याचे नाव', d.value('Demo Occupier', 'नमुना भोगवटादार')], ['Value (₹)', 'किंमत (रु.)', ''],
      ['Dimensions in feet — see source-language note', 'घराची लांबी / रुंदी (फुटात) — भाषांतर नोंद पाहा', ''], ['Total area (sq. ft.)', 'क्षेत्रफळ एकूण (चौ. फूट)', ''], ['Rate per sq. ft. (₹)', 'दर प्रति चौ. फूट (रु.)', ''],
      ['Property tax (₹)', 'घरपट्टी कर (रु.)', ''], ['Street light tax (₹)', 'वीज कर (रु.)', ''], ['Health tax (₹)', 'आरोग्य कर (रु.)', ''], ['Other tax (₹)', 'इतर कर (रु.)', ''], ['Total (₹)', 'एकूण (रु.)', ''],
      ['Assessment / alteration resolution number and date', 'आकारणी / फेरफार ठराव क्रमांक व तारीख', ''], ['Remarks', 'शेरा', '']
    ];
    const groups = [[text('Columns 1–9: property and valuation', 'स्तंभ १–९: मालमत्ता व मूल्य', lang), 0, 9], [text('Columns 10–14: assessment amounts', 'स्तंभ १०–१४: आकारणी रक्कमा', lang), 9, 14], [text('Columns 15–16: resolution and remarks', 'स्तंभ १५–१६: ठराव आणि शेरा', lang), 14, 16]];
    return `<p class="print-form-caption">Assessment List Extract (Format No. 8) · SERVICE-04 · 14 July 2015</p><p class="print-notice">${esc(text('HISTORICAL 2015 EXTRACT — CURRENT APPROVAL UNKNOWN. This 16-column source predates the 2016 substituted Tax Levy Register. Numbering and groups are retained as readable field rows; this is not a facsimile or a certified current extract. No ownership, planning permission or tax amount is certified.', 'ऐतिहासिक २०१५ उतारा — सध्याची मंजुरी अपडताळलेली. या १६ स्तंभांच्या नमुन्यानंतर २०१६ मध्ये कर आकारणी नोंदवही बदलली. क्रमांक व गट वाचनीय ओळींत ठेवले आहेत; ही मूळ प्रतिकृती किंवा सध्याचा प्रमाणित उतारा नाही. मालकीहक्क, बांधकाम परवानगी किंवा कर रक्कम प्रमाणित नाही.', lang))}</p>` + fields([
      [text('Assessment period — from year', 'आकारणी कालावधी — पासून वर्ष', lang), ctx.sample ? '2026 (DEMO)' : ''], [text('To year', 'पर्यंत वर्ष', lang), ctx.sample ? '2027 (DEMO)' : ''],
      [text('Gram Panchayat', 'ग्रामपंचायत', lang), ctx.gpName], [text('Taluka — unverified if blank', 'तालुका — रिक्त असल्यास अपडताळलेला', lang), ctx.taluka], [text('District', 'जिल्हा', lang), ctx.district]
    ]) + groups.map(([heading, start, end]) => section(heading, `<table class="print-table print-assessment-fields"><thead><tr><th scope="col">${esc(text('Column no.', 'स्तंभ क्र.', lang))}</th><th scope="col">${esc(text('Source field — normalized label', 'स्रोतातील स्तंभ — संपादित नाव', lang))}</th><th scope="col">${esc(text('Fictional value / blank', 'काल्पनिक माहिती / रिक्त', lang))}</th></tr></thead><tbody>${columns.slice(start, end).map((column, index) => `<tr data-source-column="${start + index + 1}"><th scope="row">(${start + index + 1})</th><td>${esc(column[lang === 'mr' ? 1 : 0])}</td><td>${fieldValue(column[2])}</td></tr>`).join('')}</tbody></table>`)).join('') + paragraph(text('Source-language note: column 4 is owner name in Marathi, while its printed English says “Name of the Property”; column 7 says length/width in Marathi and “Length & height” in English. These labels are editorial summaries, not official corrections. Uncollected valuation and tax amounts remain blank.', 'स्रोत भाषेची नोंद: स्तंभ ४ मराठीत मालकाचे नाव आहे; छापील इंग्रजीत “Name of the Property” आहे. स्तंभ ७ मराठीत लांबी/रुंदी व इंग्रजीत “Length & height” आहे. येथे संपादित अर्थ दिला आहे; ही अधिकृत दुरुस्ती नाही. न घेतलेली मूल्ये व कर रक्कमा रिक्त आहेत.', lang));
  }
  function renderAssessmentRegister(ctx) {
    const { lang } = ctx;
    const d = formData(ctx);
    const columns = [
      ['Serial No.', 'अनुक्रमांक', d.value('1', '१')], ['Name of street / lane', 'रस्त्याचे / गल्लीचे नाव', d.residence],
      ['Gat / Survey / City Survey No.', 'गट / भूमापन / नगर भूमापन क्र.', d.value('DEMO-SURVEY', 'DEMO-SURVEY')], ['Property No.', 'मिळकत / मालमत्ता क्र.', d.register],
      ['Name of owner', 'मालकाचे नाव', d.applicant], ['Name of occupier', 'भोगवटादाराचे नाव', d.value('Demo Occupier', 'नमुना भोगवटादार')],
      ['Description of property', 'मालमत्तेचे वर्णन', d.value('Fictional sample house', 'काल्पनिक नमुना घर')], ['Construction year / property age', 'बांधकाम वर्ष / मिळकतीचे वय', ''],
      ['Area — square feet / square metre', 'क्षेत्रफळ — चौ. फू. / चौ. मी.', ''], ['Annual statement of rates: land (₹/sq. m.)', 'वार्षिक मूल्य दर: जमीन (रु./चौ. मी.)', ''],
      ['Annual statement of rates: building (₹/sq. m.)', 'वार्षिक मूल्य दर: इमारत (रु./चौ. मी.)', ''], ['Annual statement of rates: construction (₹/sq. m.)', 'वार्षिक मूल्य दर: बांधकाम (रु./चौ. मी.)', ''],
      ['Depreciation rate', 'घसारा दर', ''], ['Weight as per building usage', 'इमारतीच्या वापरानुसार भारांक', ''], ['Capital value (₹)', 'भांडवली मूल्य (रु.)', ''], ['Rate of tax (paise)', 'कराचा दर (पैसे)', ''],
      ['Assessed property tax (₹)', 'आकारलेला मालमत्ता कर (रु.)', ''], ['Assessed lighting tax (₹)', 'आकारलेला दिवाबत्ती कर (रु.)', ''], ['Assessed health tax (₹)', 'आकारलेला आरोग्य कर (रु.)', ''], ['Assessed water tax (₹)', 'आकारलेली पाणीपट्टी (रु.)', ''], ['Total assessed (₹)', 'एकूण आकारणी (रु.)', ''],
      ['Property tax after appeal / alteration (₹)', 'अपील / फेरफारानंतर मालमत्ता कर (रु.)', ''], ['Lighting tax after appeal / alteration (₹)', 'अपील / फेरफारानंतर दिवाबत्ती कर (रु.)', ''], ['Health tax after appeal / alteration (₹)', 'अपील / फेरफारानंतर आरोग्य कर (रु.)', ''], ['Water tax after appeal / alteration (₹)', 'अपील / फेरफारानंतर पाणीपट्टी (रु.)', ''], ['Total after appeal / alteration (₹)', 'अपील / फेरफारानंतर एकूण (रु.)', ''],
      ['Remarks; order references for increases / decreases; remarks and corrections attested by Sarpanch', 'शेरा; वाढ / घट आदेशांचे संदर्भ; शेरा व दुरुस्त्या सरपंचाने अनुप्रमाणित कराव्यात', '']
    ];
    const groups = [
      [text('Columns 1–9: property identity', 'स्तंभ १–९: मालमत्ता ओळख', lang), 0, 9],
      [text('Columns 10–16: valuation and rate', 'स्तंभ १०–१६: मूल्य व दर', lang), 9, 16],
      [text('Columns 17–21: amount of taxes assessed', 'स्तंभ १७–२१: आकारलेले कर', lang), 16, 21],
      [text('Columns 22–26: result of appeals and subsequent alterations', 'स्तंभ २२–२६: अपिलांचे निकाल व नंतरचे फेरफार', lang), 21, 26],
      [text('Column 27: remarks and attestation', 'स्तंभ २७: शेरा व अनुप्रमाणन', lang), 26, 27]
    ];
    return `<p class="print-form-caption">Form 8 · [See rule 32(1)] · Tax Levy Register · Gazette 3 March 2016</p><p class="print-notice">${esc(text('REGISTER BASIS ONLY — NOT A CERTIFIED EXTRACT. The 27 source columns are reflowed into numbered field rows for legibility; this is not a facsimile. Values not captured by the demo remain blank, including all tax amounts. No title or liability is certified.', 'फक्त नोंदवहीचा आधार — प्रमाणित उतारा नाही. वाचनीयतेसाठी मूळ २७ स्तंभ क्रमांकित ओळींत मांडले आहेत; ही मूळ पृष्ठाची प्रतिकृती नाही. डेमोमध्ये न घेतलेली माहिती व सर्व कर रक्कमा रिक्त आहेत. मालकीहक्क किंवा देणी प्रमाणित नाहीत.', lang))}</p>` + fields([[text('Tax Levy Register for the year', 'कर आकारणी नोंदवहीचे वर्ष', lang), ctx.sample ? '2026–2027 (DEMO)' : ''], [text('Village Panchayat', 'ग्रामपंचायत', lang), ctx.gpName]]) + groups.map(([heading, start, end]) => section(heading, `<table class="print-table print-assessment-fields"><thead><tr><th scope="col">${esc(text('Column no.', 'स्तंभ क्र.', lang))}</th><th scope="col">${esc(text('Source field / group', 'स्रोतातील स्तंभ / गट', lang))}</th><th scope="col">${esc(text('Fictional value / blank', 'काल्पनिक माहिती / रिक्त', lang))}</th></tr></thead><tbody>${columns.slice(start, end).map((column, index) => `<tr data-source-column="${start + index + 1}"><th scope="row">(${start + index + 1})</th><td>${esc(column[lang === 'mr' ? 1 : 0])}</td><td>${fieldValue(column[2])}</td></tr>`).join('')}</tbody></table>`)).join('');
  }
  function gapDocument(ctx, en, mr) {
    const title = text('Format reference unavailable', 'नमुन्याचा संदर्भ उपलब्ध नाही', ctx.lang);
    return documentShell(ctx, title, `<p class="print-notice print-gap">${esc(text(en, mr, ctx.lang))}</p>`, 'portrait', null);
  }
  function renderDocument(options = {}) {
    const ctx = context(options);
    const allowedKinds = ['certificate', 'format', 'acknowledgement', 'application', 'history', 'register', 'citizen-list', 'gp-profile', 'assessment-register', 'module-report', 'scheme-guide', 'notice'];
    if (!allowedKinds.includes(ctx.kind)) { delete ctx.request; return gapDocument(ctx, 'Choose a supported demo paper-trail document.', 'समर्थित डेमो कागदी नोंदीचा प्रकार निवडा.'); }
    if (!ctx.code) { delete ctx.request; return gapDocument(ctx, 'A selected GP identity is required. No request data is included.', 'निवडलेल्या ग्रामपंचायतीची ओळख आवश्यक आहे. अर्जाची माहिती समाविष्ट नाही.'); }
    if(['module-report','scheme-guide','notice'].includes(ctx.kind)){
      const r=ctx.record;if(!r||String(r.gpCode)!==ctx.code)return gapDocument(ctx,'Record unavailable for this GP.','या ग्रामपंचायतीसाठी नोंद उपलब्ध नाही.');
      return documentShell(ctx, r.title+' — DEMO', fields([[text('Reference','संदर्भ',ctx.lang),r.id],...(Array.isArray(r.fields)?r.fields:[])])+paragraph(r.summary), 'portrait', null);
    }
    const single = ['certificate', 'acknowledgement', 'application', 'history'].includes(ctx.kind);
    if ((single && !ctx.request) || (ctx.request && String(ctx.request.gp || '') !== ctx.code)) {
      // Never echo the mismatched request, even in the metadata/header of an error.
      delete ctx.request;
      return gapDocument(ctx, 'The request is unavailable in the selected GP. No other GP data is included.', 'निवडलेल्या ग्रामपंचायतीत हा अर्ज उपलब्ध नाही. इतर ग्रामपंचायतीची माहिती समाविष्ट नाही.');
    }
    // The caller owns workflow eligibility, including the recorded decision and
    // readiness/delivery checks. A printed specimen never establishes approval.
    if (ctx.kind === 'assessment-register') {
      const title = `${ctx.lang === 'mr' ? assessmentRegisterInfo.mr : assessmentRegisterInfo.en} — ${text('DEMO institutional reference', 'डेमो संस्थात्मक संदर्भ', ctx.lang)}`;
      return documentShell(ctx, title, renderAssessmentRegister(ctx), 'landscape', assessmentRegisterInfo);
    }
    if (ctx.kind === 'format' || ctx.kind === 'certificate') {
      const id = ctx.kind === 'certificate' ? ctx.request.service : serviceIdOf(ctx.service) || ctx.request?.service || '';
      const info = getFormatInfo(id);
      if (!info.available) return gapDocument(ctx, info.reason, info.reasonMr);
      const title = `${ctx.lang === 'mr' ? info.mr : info.en} — ${text('DEMO preview', 'डेमो पूर्वदृश्य', ctx.lang)}`;
      const body = id === 'birth' || id === 'death' ? renderCivil(ctx, id === 'death') : id === 'marriage' ? renderMarriage(ctx) : id === 'assessment' ? renderAssessmentExtract(ctx) : id === 'residence' ? renderResidence(ctx) : renderLocalCertificate(ctx, id === 'bpl');
      return documentShell(ctx, title, body, info.paper, info);
    }
    if (ctx.kind === 'register' || ctx.kind === 'citizen-list') {
      ctx.requests = (Array.isArray(ctx.requests) ? ctx.requests : []).filter(r => r && String(r.gp || '') === ctx.code);
      const citizen = ctx.kind === 'citizen-list';
      return documentShell(ctx, text(citizen ? 'My demo request list' : 'Office request register — visible filter', citizen ? 'माझ्या डेमो अर्जांची यादी' : 'कार्यालयीन अर्ज यादी — सध्याचा फिल्टर', ctx.lang), renderList(ctx, citizen), 'landscape', null);
    }
    const titles = { acknowledgement: ['Demo acknowledgement', 'डेमो पोहोच'], application: ['Demo service application summary', 'डेमो सेवा अर्जाचा सारांश'], history: ['Demo case history / office file', 'डेमो केसचा इतिहास / कार्यालयीन फाईल'], 'gp-profile': ['Demo GP workspace profile', 'डेमो ग्रामपंचायत कार्यक्षेत्राची माहिती'] };
    const body = ctx.kind === 'acknowledgement' ? renderAcknowledgement(ctx) : ctx.kind === 'application' ? renderApplication(ctx) : ctx.kind === 'history' ? renderHistory(ctx) : renderProfile(ctx);
    return documentShell(ctx, titles[ctx.kind][ctx.lang === 'mr' ? 1 : 0], body, 'portrait', null);
  }
  function clear() {
    document.body?.classList.remove('printing-document');
    if (document.body) delete document.body.dataset.printPaper;
    document.getElementById('printRoot')?.remove();
  }
  function print(preview) {
    if (!trustedPreviews.has(preview) || !document.body) return false;
    clear();
    const root = document.createElement('section');
    root.id = 'printRoot';
    root.setAttribute('aria-label', preview.title);
    root.innerHTML = preview.html; // Only immutable HTML returned by this module is accepted.
    document.body.append(root);
    document.body.dataset.printPaper = preview.paper;
    document.body.classList.add('printing-document');
    try { window.print(); } catch (_) { clear(); return false; }
    // Native afterprint (or explicit clear on sign-out) owns cleanup. In particular,
    // do not erase the prepared tree when a browser/QA print stub returns early.
    return true;
  }
  window.addEventListener('afterprint', clear);
  window.GPPrinting = Object.freeze({ renderDocument, print, clear, supportsCertificate, getFormatInfo });
})();
