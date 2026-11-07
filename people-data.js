/* Dated, GP-scoped source presentation. No live roster, credentials or authority lookup.
   Person IDs are manually curated display groups, never official appointment/record IDs.
   Separate source records retain conflicting dates/masked contacts; no current-term merge. */
(function (global) {
  'use strict';

  function freeze(value) {
    if (value && (typeof value === 'object' || typeof value === 'function') && !Object.isFrozen(value)) {
      Object.values(value).forEach(freeze);
      Object.freeze(value);
    }
    return value;
  }
  const checkedAt = '2026-11-07';
  const gpCode = '171415';
  const sourceIds = freeze(['CHAK-ER01', 'CHAK-PROFILE01', 'CHAK-MERI-SCREENSHOT01', 'PEOPLE-GEORAI-OFFICES']);
  const sources = freeze({
    'CHAK-ER01': {
      id: 'CHAK-ER01',
      title: 'eGramSwaraj public elected-representative response — Chaklamba 171415',
      publisher: 'Ministry of Panchayati Raj / eGramSwaraj',
      url: 'https://egramswaraj.gov.in/ElectedMemberRepresent.do?code=171415&stateCode=27&level=V',
      sourcePath: '../data/chaklamba_people/2026-11-07/elected-representatives.json',
      publicPath: 'sources.html#chak-er01',
      guidePath: '../docs/project-memory/lookups/CHAKLAMBA_OFFICEHOLDERS_2026-11-07.md',
      sha256: '822d32bff89a5b36ee2348405203c74047c2cc18cb16a928bbd1f598b14f1b66',
      verification: 'official-retrieval', evidence: 'direct-official-public-json',
      publishedAt: null, sourceUpdatedAt: null, checkedAt, recordCount: 5,
      note: {
        en: 'Direct official public response accessed 7 November 2026: one Sarpanch and four member records. This is a published listing, not an independently verified current appointment, complete council, ward-number list or term record. Source spellings and masked fields are retained per record.',
        mr: '७ नोव्हेंबर २०२६ रोजी थेट मिळालेला अधिकृत सार्वजनिक प्रतिसाद: एक सरपंच आणि चार सदस्यांच्या नोंदी. ही प्रसिद्ध यादी आहे; सध्याची नियुक्ती, संपूर्ण परिषद, प्रभाग क्रमांक किंवा कार्यकाळाची स्वतंत्र पुष्टी नाही. मूळ नावे व झाकलेले संपर्क प्रत्येक स्रोत-नोंदीत स्वतंत्र जतन केले आहेत.'
      }
    },
    'CHAK-PROFILE01': {
      id: 'CHAK-PROFILE01',
      title: 'eGramSwaraj public GP profile — Chaklamba 171415',
      publisher: 'Ministry of Panchayati Raj / eGramSwaraj',
      url: 'https://egramswaraj.gov.in/getZpProfileDetails.do?lbc=171415',
      sourcePath: '../docs/project-memory/lookups/CHAKLAMBA_OFFICEHOLDERS_2026-11-07.md',
      publicPath: 'sources.html#chak-profile01',
      verification: 'official-retrieval', evidence: 'direct-official-profile-manual-transcription',
      publishedAt: null, sourceUpdatedAt: null, checkedAt,
      note: {
        en: 'Visible official profile fields were inspected and manually transcribed; a raw HTML snapshot was not retained. The profile names the Sarpanch and an Officer/Secretary, shendekar ts. The initials/full name, current charge and statutory service-signing powers are not resolved. Masked contact fragments were not transcribed and must not be inferred from another source.',
        mr: 'अधिकृत प्रोफाइलमधील दिसणारे तपशील पाहून हस्तलिखित नोंद जतन केली; मूळ HTML प्रत जतन नाही. यात सरपंच आणि अधिकारी/सचिव म्हणून shendekar ts हे नाव आहे. पूर्ण नाव, सध्याचा पदभार व वैधानिक सेवा-स्वाक्षरी अधिकार स्पष्ट नाहीत. झाकलेल्या संपर्कांचे तुकडे नोंदवलेले नाहीत; ते दुसऱ्या स्रोतातून गृहीत धरू नयेत.'
      }
    },
    'CHAK-MERI-SCREENSHOT01': {
      id: 'CHAK-MERI-SCREENSHOT01',
      title: 'User-supplied Meri Panchayat elected-representative screenshot',
      publisher: 'Meri Panchayat portal as identified by the user; screenshot supplied by the user',
      url: 'https://meripanchayat.gov.in/citizen/gp#home',
      sourcePath: '../screenshots/chaklamba-people/2026-11-07_user-elected-representatives.png',
      publicPath: 'sources.html#chak-meri-screenshot01',
      guidePath: '../docs/project-memory/lookups/CHAKLAMBA_MERI_PANCHAYAT_SCREENSHOT_2026-11-07.md',
      sha256: 'c6b2ebdbfd473fb1b48eb6c9e96b9f63098aa9211566485879392b38f2cb194c',
      verification: 'user-screenshot', evidence: 'user-supplied-official-portal-screenshot',
      publishedAt: null, captureDate: null, receivedAt: checkedAt, checkedAt,
      recordCount: 11, gpAttribution: 'User confirmed Chaklamba; GP identity/code is not visible in the crop.',
      note: {
        en: 'All eleven visible cards are retained separately. The GP association is user-confirmed, not printed in this crop, and the roster was not independently retrieved live. Eight apparent elected-person groups are a manual display grouping, not a certified council count or identity/appointment merge. Repeated Priyanka, Sangita and Laxmi records keep their own dates and masked contacts. Truncated dates are not completed; screenshot portraits are not verified reusable assets.',
        mr: 'दिसणारी सर्व अकरा कार्डे स्वतंत्र जतन केली आहेत. चाकलांब्याशी संबंध वापरकर्त्याने स्पष्ट केला; या चित्रात ग्रामपंचायतीची ओळख नाही आणि यादी थेट पुन्हा मिळवलेली नाही. आठ संभाव्य व्यक्तींचे गट हे फक्त प्रदर्शनासाठीचे वर्गीकरण आहे; अधिकृत सदस्यसंख्या किंवा नियुक्तींचे एकत्रीकरण नाही. प्रियंका, संगीता व लक्ष्मींच्या पुनरावृत्त नोंदींच्या तारखा व झाकलेले संपर्क स्वतंत्र आहेत. अपूर्ण तारखा पूर्ण केलेल्या नाहीत; चित्रातील छायाचित्रे पडताळलेली पुनर्वापरयोग्य साधने नाहीत.'
      }
    },
    'PEOPLE-GEORAI-OFFICES': {
      id: 'PEOPLE-GEORAI-OFFICES', title: 'Beed Zilla Parishad public directory — Panchayat Samiti Georai',
      publisher: 'Zilla Parishad Beed', url: 'https://www.zpbeed.gov.in/en/directory/',
      publicPath: 'sources.html#georai-offices',
      verification: 'official-listing', evidence: 'official-public-listing', sourceUpdatedAt: '2025-02-26', checkedAt,
      note: { en: 'Public office contacts from an older official directory listing. The page also repeats these names/numbers for other blocks; whether this is additional charge or stale/copy data is unresolved. Current posting, availability and service-specific authority have not been reverified. These are related Panchayat Samiti offices, not GP staff. The shared email is an office address, not a personal address.', mr: 'जुन्या अधिकृत निर्देशिकेतील सार्वजनिक कार्यालयीन संपर्क. त्याच पृष्ठावर ही नावे/क्रमांक इतर गटांसाठीही आहेत; अतिरिक्त कार्यभार की जुनी/प्रतिलिपी माहिती हे स्पष्ट नाही. सध्याची पदस्थापना, उपलब्धता व सेवेनुसार अधिकार पुन्हा पडताळलेले नाहीत. ही संबंधित पंचायत समितीची कार्यालये आहेत; ग्रामपंचायत कर्मचारी नाहीत. सामायिक ईमेल हा कार्यालयाचा पत्ता आहे; वैयक्तिक नाही.' }
    }
  });

  // These local evidence IDs identify retained rows/cards only. No official person ID was supplied.
  const emptyTerm = { startRaw: null, endRaw: null, startDate: null, endDate: null };
  const officialRows = [
    { id: 'chak-er-row-01', position: 1, sourceName: 'priyanka shivprasad khedkar ', sourceRole: 'SARPANCH', wardRaw: null, maskedPhone: '97****7260', maskedEmail: 'p***************5@gmail.com' },
    { id: 'chak-er-row-02', position: 2, sourceName: 'dnyaneshwar shahadev nagare ', sourceRole: 'GRAMPANCHAYAT SADASYA', wardRaw: 'Chaklamba', maskedPhone: '91****1104', maskedEmail: 'd***************e@gmail.com' },
    { id: 'chak-er-row-03', position: 3, sourceName: 'laxmi somnath salve ', sourceRole: 'GRAMPANCHAYAT SADASYA', wardRaw: 'Chaklamba', maskedPhone: '95****3320', maskedEmail: 'l********e@gmail.com' },
    { id: 'chak-er-row-04', position: 4, sourceName: 'pushpa balu khedkar ', sourceRole: 'GRAMPANCHAYAT SADASYA', wardRaw: 'Chaklamba', maskedPhone: '97****4151', maskedEmail: 'p************2@gmail.com' },
    { id: 'chak-er-row-05', position: 5, sourceName: 'sangita popat pingale ', sourceRole: 'GRAMPANCHAYAT SADASYA', wardRaw: 'Chaklamba', maskedPhone: '86****7741', maskedEmail: 's************e@gmail.com' }
  ];
  const erRecords = officialRows.map(row => ({
    ...row, gpCode, sourceId: 'CHAK-ER01', sourceReference: 'CHAK-ER01',
    kind: 'official-retrieval', verification: 'official-retrieval', sourceType: 'official-json',
    sourceUrl: sources['CHAK-ER01'].url, sourcePath: sources['CHAK-ER01'].sourcePath,
    checkedAt, officialRecordId: null, term: { ...emptyTerm }, photo: null,
    note: {
      en: 'Exact saved public-response row. wardName Chaklamba is a source area label, not a verified ward number. No effective dates, complete council or independent present appointment is established.',
      mr: 'जतन केलेल्या सार्वजनिक प्रतिसादातील मूळ नोंद. wardName मधील Chaklamba हे स्रोताचे क्षेत्र-लेबल आहे; पडताळलेला प्रभाग क्रमांक नाही. प्रभावी तारखा, संपूर्ण परिषद किंवा सध्याची स्वतंत्र नियुक्ती-पुष्टी उपलब्ध नाही.'
    }
  }));
  const profileRecords = [
    {
      id: 'chak-profile-sarpanch', gpCode, sourceId: 'CHAK-PROFILE01', sourceReference: 'CHAK-PROFILE01',
      kind: 'official-retrieval', verification: 'official-retrieval', sourceType: 'official-profile-transcription',
      sourceUrl: sources['CHAK-PROFILE01'].url, sourcePath: sources['CHAK-PROFILE01'].sourcePath,
      checkedAt, officialRecordId: null, sourceSection: 'Sarpanch/President Details',
      sourceName: 'priyanka shivprasad khedkar ', sourceRole: 'Sarpanch/President',
      wardRaw: null, term: { ...emptyTerm }, maskedPhone: null, maskedEmail: null, photo: null,
      note: {
        en: 'Manual transcription of the visible official profile; raw HTML and masked contact fragments were not retained. This separate profile listing repeats the Sarpanch name, without independently confirming the present term.',
        mr: 'दिसणाऱ्या अधिकृत प्रोफाइलची हस्तलिखित नोंद; मूळ HTML व झाकलेल्या संपर्कांचे तुकडे जतन नाहीत. या स्वतंत्र प्रोफाइलमध्ये सरपंचाचे तेच नाव आहे; सध्याचा कार्यकाळ स्वतंत्रपणे पुष्ट होत नाही.'
      }
    },
    {
      id: 'chak-profile-officer-secretary', gpCode, sourceId: 'CHAK-PROFILE01', sourceReference: 'CHAK-PROFILE01',
      kind: 'official-retrieval', verification: 'official-retrieval', sourceType: 'official-profile-transcription',
      sourceUrl: sources['CHAK-PROFILE01'].url, sourcePath: sources['CHAK-PROFILE01'].sourcePath,
      checkedAt, officialRecordId: null, sourceSection: 'Officer/Secretary Details',
      sourceName: 'shendekar ts ', sourceRole: 'Officer/Secretary',
      wardRaw: null, term: { ...emptyTerm }, maskedPhone: null, maskedEmail: null, photo: null,
      note: {
        en: 'Manual transcription of the official Officer/Secretary field. Initials are not expanded. Current Gram Sevak/Gram Vikas Adhikari charge or service-signing authority requires a separate order. Masked contact fragments were not retained.',
        mr: 'अधिकृत अधिकारी/सचिव क्षेत्राची हस्तलिखित नोंद. आद्याक्षरांचा विस्तार केलेला नाही. सध्याचा ग्रामसेवक/ग्रामविकास अधिकारी पदभार किंवा सेवा-स्वाक्षरी अधिकारासाठी स्वतंत्र आदेश आवश्यक आहे. झाकलेल्या संपर्कांचे तुकडे जतन नाहीत.'
      }
    }
  ];
  // Screenshot dates/masks are source-local. Repeated rows must never inherit one another's contact or term.
  const screenshotRows = [
    { id: 'chak-meri-card-01', position: 1, sourceName: 'Priyanka Shivprasad Khe...', sourceRole: 'सरपंच', startRaw: '01/Dec/2022', startDate: '2022-12-01', maskedPhone: '97XXXXXX60', maskedEmail: 'p***@gmail.com' },
    { id: 'chak-meri-card-02', position: 2, sourceName: 'Priyanka Shivprasad Khe...', sourceRole: 'सरपंच', startRaw: '23/Dec/2022', startDate: '2022-12-23', maskedPhone: '97XXXXXX60', maskedEmail: 'k***@gmail.com' },
    { id: 'chak-meri-card-03', position: 3, sourceName: 'Ismail Usman Pathan', sourceRole: 'उप सरपंच', startRaw: '23/Dec/2022', startDate: '2022-12-23', maskedPhone: '99XXXXXX54', maskedEmail: 'k***@gmail.com' },
    { id: 'chak-meri-card-04', position: 4, sourceName: 'Dnyaneshwar Shahadev ...', sourceRole: 'ग्रामपंचायत सदस्य', startRaw: '01/Dec/202...', startDate: null, maskedPhone: '91XXXXXX04', maskedEmail: 'd***@gmail.com' },
    { id: 'chak-meri-card-05', position: 5, sourceName: 'Sangita Popat Pingale', sourceRole: 'ग्रामपंचायत सदस्य', startRaw: '01/Dec/202...', startDate: null, maskedPhone: '86XXXXXX41', maskedEmail: 's***@gmail.com' },
    { id: 'chak-meri-card-06', position: 6, sourceName: 'Jaya Kundlik Gunjal', sourceRole: 'ग्रामपंचायत सदस्य', startRaw: '23/Dec/202...', startDate: null, maskedPhone: '90XXXXXX90', maskedEmail: 'k***@gmail.com' },
    { id: 'chak-meri-card-07', position: 7, sourceName: 'Sangita Popat Pingale', sourceRole: 'ग्रामपंचायत सदस्य', startRaw: '23/Dec/202...', startDate: null, maskedPhone: '90XXXXXX90', maskedEmail: 'k***@gmail.com' },
    { id: 'chak-meri-card-08', position: 8, sourceName: 'Laxmi Somnath Salve', sourceRole: 'ग्रामपंचायत सदस्य', startRaw: '23/Dec/202...', startDate: null, maskedPhone: '73XXXXXX80', maskedEmail: 'k***@gmail.com' },
    { id: 'chak-meri-card-09', position: 9, sourceName: 'Adinath Arjun Khedkar', sourceRole: 'ग्रामपंचायत सदस्य', startRaw: '23/Dec/202...', startDate: null, maskedPhone: '90XXXXXX90', maskedEmail: 'k***@gmail.com' },
    { id: 'chak-meri-card-10', position: 10, sourceName: 'Pushpa Balu Khedkar', sourceRole: 'ग्रामपंचायत सदस्य', startRaw: '01/Dec/202...', startDate: null, maskedPhone: '97XXXXXX51', maskedEmail: 'p***@gmail.com' },
    { id: 'chak-meri-card-11', position: 11, sourceName: 'Laxmi Somnath Salve', sourceRole: 'ग्रामपंचायत सदस्य', startRaw: '01/Dec/202...', startDate: null, maskedPhone: '95XXXXXX20', maskedEmail: 'l***@gmail.com' }
  ];
  const screenshotRecords = screenshotRows.map(row => ({
    id: row.id, position: row.position, gpCode,
    sourceId: 'CHAK-MERI-SCREENSHOT01', sourceReference: 'CHAK-MERI-SCREENSHOT01',
    kind: 'user-screenshot', verification: 'user-screenshot', sourceType: 'user-screenshot',
    sourceUrl: sources['CHAK-MERI-SCREENSHOT01'].url, sourcePath: sources['CHAK-MERI-SCREENSHOT01'].sourcePath,
    checkedAt, receivedAt: checkedAt, captureDate: null, officialRecordId: null,
    gpAttribution: 'user-confirmed-selection-not-visible-in-crop',
    sourceName: row.sourceName, sourceRole: row.sourceRole, wardRaw: null,
    term: { startRaw: row.startRaw, endRaw: null, startDate: row.startDate, endDate: null },
    endDateTruncated: true, maskedPhone: row.maskedPhone, maskedEmail: row.maskedEmail, photo: null,
    note: {
      en: 'User-supplied screenshot card, manually transcribed in reading order. End date is truncated; incomplete years are not inferred. The crop does not show GP identity/capture date. Dates and masked contacts belong only to this card, not a verified current appointment or reusable contact.',
      mr: 'वापरकर्त्याने दिलेल्या चित्रातील कार्डाची वाचनक्रमानुसार हस्तलिखित नोंद. शेवटची तारीख अपूर्ण आहे; अपूर्ण वर्ष गृहीत धरलेले नाही. चित्रात ग्रामपंचायतीची ओळख/चित्र घेतल्याची तारीख नाही. तारखा व झाकलेले संपर्क फक्त या कार्डापुरते आहेत; सध्याची नियुक्ती किंवा वापरण्यायोग्य संपर्क म्हणून पुष्टी नाही.'
    }
  }));
  const evidenceRecords = freeze([...erRecords, ...profileRecords, ...screenshotRecords]);
  const evidenceRecordsById = freeze(Object.fromEntries(evidenceRecords.map(record => [record.id, record])));

  const generalResponsibilities = {
    en: 'Individual duties, current charge and service-signing authority are not independently verified from appointment or delegation records.',
    mr: 'नियुक्ती किंवा अधिकारप्रदान नोंदीतून वैयक्तिक कामे, सध्याचा पदभार व सेवा-स्वाक्षरी अधिकार स्वतंत्रपणे पडताळलेले नाहीत.'
  };
  const availability = {
    en: 'Current office hours and availability are not confirmed.',
    mr: 'सध्याच्या कार्यालयीन वेळा व उपलब्धतेची पुष्टी नाही.'
  };
  const officialDetail = {
    en: 'Name/designation published in an official source accessed 7 November 2026. Separate source records are retained; present appointment, full council, ward numbers and effective term dates are not independently certified.',
    mr: '७ नोव्हेंबर २०२६ रोजी पाहिलेल्या अधिकृत स्रोतात प्रसिद्ध नाव/पद. प्रत्येक स्रोताची नोंद स्वतंत्र जतन आहे; सध्याची नियुक्ती, संपूर्ण परिषद, प्रभाग क्रमांक व प्रभावी कार्यकाळ स्वतंत्रपणे प्रमाणित नाही.'
  };
  const screenshotDetail = {
    en: 'Displayed in the user-supplied Meri Panchayat screenshot, whose Chaklamba selection the user confirmed. This card was not independently retrieved live. The presentation grouping does not certify identity, current appointment, a complete council or full term dates.',
    mr: 'वापरकर्त्याने दिलेल्या मेरी पंचायत चित्रात दिसणारी नोंद; चाकलांबा निवडल्याचे वापरकर्त्याने स्पष्ट केले. हे कार्ड थेट स्वतंत्रपणे मिळवलेले नाही. प्रदर्शनातील गट म्हणजे व्यक्तीची ओळख, सध्याची नियुक्ती, संपूर्ण परिषद किंवा पूर्ण कार्यकाळाचे प्रमाणीकरण नाही.'
  };
  function presentation(row) {
    const records = row.evidenceRecordIds.map(id => evidenceRecordsById[id]);
    const rowSourceIds = [...new Set(records.map(record => record.sourceId))];
    return {
      ...row, gpCode,
      detail: row.detail || (row.verification === 'official-retrieval' ? officialDetail : screenshotDetail),
      responsibilities: generalResponsibilities, availability,
      ward: null, phone: null, email: null, term: null, photo: null,
      nameTranslation: 'Editorial Marathi transliteration, not an official-language name confirmation.',
      identityGrouping: 'manually-curated-display-group; source records are not merged',
      evidenceRecords: records, sourceIds: rowSourceIds,
      sourceId: rowSourceIds[0], sourceUrl: sources[rowSourceIds[0]].url, checkedAt,
      currentAppointmentVerified: false, termVerified: false, wardVerified: false
    };
  }
  const people = freeze([
    presentation({
      id: 'chaklamba-priyanka-khedkar', category: 'elected', roleKey: 'sarpanch',
      name: { en: 'Priyanka Shivprasad Khedkar', mr: 'प्रियंका शिवप्रसाद खेडकर' },
      role: { en: 'Sarpanch', mr: 'सरपंच' }, verification: 'official-retrieval',
      evidenceRecordIds: ['chak-er-row-01', 'chak-profile-sarpanch', 'chak-meri-card-01', 'chak-meri-card-02']
    }),
    presentation({
      id: 'chaklamba-ismail-pathan', category: 'elected', roleKey: 'up-sarpanch',
      name: { en: 'Ismail Usman Pathan', mr: 'इस्माईल उस्मान पठाण' },
      role: { en: 'Up-Sarpanch', mr: 'उपसरपंच' }, verification: 'user-screenshot',
      evidenceRecordIds: ['chak-meri-card-03']
    }),
    presentation({
      id: 'chaklamba-dnyaneshwar-nagare', category: 'elected', roleKey: 'member',
      name: { en: 'Dnyaneshwar Shahadev Nagare', mr: 'ज्ञानेश्वर शहादेव नागरे' },
      role: { en: 'Gram Panchayat member', mr: 'ग्रामपंचायत सदस्य' }, verification: 'official-retrieval',
      evidenceRecordIds: ['chak-er-row-02', 'chak-meri-card-04']
    }),
    presentation({
      id: 'chaklamba-sangita-pingale', category: 'elected', roleKey: 'member',
      name: { en: 'Sangita Popat Pingale', mr: 'संगीता पोपट पिंगळे' },
      role: { en: 'Gram Panchayat member', mr: 'ग्रामपंचायत सदस्य' }, verification: 'official-retrieval',
      evidenceRecordIds: ['chak-er-row-05', 'chak-meri-card-05', 'chak-meri-card-07']
    }),
    presentation({
      id: 'chaklamba-jaya-gunjal', category: 'elected', roleKey: 'member',
      name: { en: 'Jaya Kundlik Gunjal', mr: 'जया कुंडलिक गुंजाळ' },
      role: { en: 'Gram Panchayat member', mr: 'ग्रामपंचायत सदस्य' }, verification: 'user-screenshot',
      evidenceRecordIds: ['chak-meri-card-06']
    }),
    presentation({
      id: 'chaklamba-laxmi-salve', category: 'elected', roleKey: 'member',
      name: { en: 'Laxmi Somnath Salve', mr: 'लक्ष्मी सोमनाथ साळवे' },
      role: { en: 'Gram Panchayat member', mr: 'ग्रामपंचायत सदस्य' }, verification: 'official-retrieval',
      evidenceRecordIds: ['chak-er-row-03', 'chak-meri-card-08', 'chak-meri-card-11']
    }),
    presentation({
      id: 'chaklamba-adinath-khedkar', category: 'elected', roleKey: 'member',
      name: { en: 'Adinath Arjun Khedkar', mr: 'आदिनाथ अर्जुन खेडकर' },
      role: { en: 'Gram Panchayat member', mr: 'ग्रामपंचायत सदस्य' }, verification: 'user-screenshot',
      evidenceRecordIds: ['chak-meri-card-09']
    }),
    presentation({
      id: 'chaklamba-pushpa-khedkar', category: 'elected', roleKey: 'member',
      name: { en: 'Pushpa Balu Khedkar', mr: 'पुष्पा बाळू खेडकर' },
      role: { en: 'Gram Panchayat member', mr: 'ग्रामपंचायत सदस्य' }, verification: 'official-retrieval',
      evidenceRecordIds: ['chak-er-row-04', 'chak-meri-card-10']
    }),
    presentation({
      id: 'chaklamba-shendekar-ts', category: 'officers', roleKey: 'officer-secretary',
      name: { en: 'T. S. Shendekar', mr: 'टी. एस. शेंडेकर' },
      role: { en: 'Officer/Secretary', mr: 'अधिकारी/सचिव' }, verification: 'official-retrieval',
      detail: {
        en: 'Official profile source name: shendekar ts. Initials are retained without expansion. Current Gram Sevak/Gram Vikas Adhikari charge, full name and signing powers require appointment/charge evidence. The earlier non-government choudhar pd lead is not adopted as this person.',
        mr: 'अधिकृत प्रोफाइलमधील मूळ नाव: shendekar ts. आद्याक्षरे विस्ताराशिवाय ठेवली आहेत. सध्याचा ग्रामसेवक/ग्रामविकास अधिकारी पदभार, पूर्ण नाव व स्वाक्षरी अधिकारासाठी नियुक्ती/पदभार पुरावा आवश्यक आहे. अशासकीय स्रोतातील choudhar pd हे वेगळे नाव या व्यक्तीचे मानलेले नाही.'
      },
      evidenceRecordIds: ['chak-profile-officer-secretary']
    })
  ]);
  const officeAvailability = { en: 'Older public directory listing; current posting and hours have not been reverified.', mr: 'जुन्या सार्वजनिक निर्देशिकेतील नोंद; सध्याची पदस्थापना व वेळा पुन्हा पडताळलेल्या नाहीत.' };
  const officeDetail = { en: 'Related Panchayat Samiti office, not GP staff. Source last updated 26 February 2025; current posting and authority remain unverified.', mr: 'संबंधित पंचायत समिती कार्यालय; ग्रामपंचायत कर्मचारी नाहीत. स्रोत अखेर २६ फेब्रुवारी २०२५ रोजी अद्ययावत; सध्याची पदस्थापना व अधिकार अपडताळलेले आहेत.' };
  const relatedOffices = freeze([
    {
      id: 'georai-bdo-listed-2025', gpCode, category: 'related-office',
      name: { en: 'Shri Aniruddh Sanap', mr: 'श्री अनिरुद्ध सानप' }, role: { en: 'Block Development Officer — directory listing', mr: 'गटविकास अधिकारी — निर्देशिकेतील नोंद' },
      detail: officeDetail, office: { en: 'Panchayat Samiti Office, Georai', mr: 'पंचायत समिती कार्यालय, गेवराई' },
      responsibilities: { en: 'Listed BDO contact at the Panchayat Samiti. Confirm current assignment and the competent office for the particular service.', mr: 'पंचायत समितीच्या गटविकास अधिकाऱ्याचा निर्देशिकेतील संपर्क. सध्याची नेमणूक व संबंधित सेवेसाठी सक्षम कार्यालय निश्चित करा.' },
      availability: officeAvailability, ward: null, phone: '9850789950', email: 'bdogevrai47@gmail.com', emailScope: 'office',
      verification: 'official-listing', sourceId: 'PEOPLE-GEORAI-OFFICES', sourceUrl: sources['PEOPLE-GEORAI-OFFICES'].url,
      sourceUpdatedAt: '2025-02-26', checkedAt, term: null, photo: null
    },
    {
      id: 'georai-assistant-bdo-listed-2025', gpCode, category: 'related-office',
      name: { en: 'Shri Dongare V. Y.', mr: 'श्री डोंगरे व्ही. वाय.' }, role: { en: 'Assistant Block Development Officer — directory listing', mr: 'सहायक गटविकास अधिकारी — निर्देशिकेतील नोंद' },
      detail: officeDetail, office: { en: 'Panchayat Samiti Office, Georai', mr: 'पंचायत समिती कार्यालय, गेवराई' },
      responsibilities: { en: 'Listed Assistant BDO contact at the Panchayat Samiti. This entry alone does not verify an individual service or appeal appointment.', mr: 'पंचायत समितीच्या सहायक गटविकास अधिकाऱ्याचा निर्देशिकेतील संपर्क. या नोंदीवरून विशिष्ट सेवा किंवा अपील नियुक्ती पडताळली जात नाही.' },
      availability: officeAvailability, ward: null, phone: '9922787573', email: 'bdogevrai47@gmail.com', emailScope: 'office',
      verification: 'official-listing', sourceId: 'PEOPLE-GEORAI-OFFICES', sourceUrl: sources['PEOPLE-GEORAI-OFFICES'].url,
      sourceUpdatedAt: '2025-02-26', checkedAt, term: null, photo: null
    }
  ]);
  const office = freeze({
    gpCode, name: null, phone: null, email: null, hours: null,
    masked: true, contactsMasked: true,
    address: {
      en: 'AT-POST CHAKLAMBA TA-GEORAI-DIST-BEED; Chaklamba; georai',
      mr: 'AT-POST CHAKLAMBA TA-GEORAI-DIST-BEED; Chaklamba; georai'
    },
    addressRaw: 'AT-POST CHAKLAMBA TA-GEORAI-DIST-BEED; Chaklamba; georai; PIN 431130',
    pin: '431130', sourceId: 'CHAK-PROFILE01', sourceUrl: sources['CHAK-PROFILE01'].url,
    sourcePath: sources['CHAK-PROFILE01'].sourcePath, checkedAt,
    verification: 'official-published-address', sourceType: 'direct-official-profile-transcription',
    independentlyVisited: false, deliverabilityVerified: false
  });
  const empty = freeze([]);
  const isChaklamba = code => String(code == null ? '' : code).trim() === gpCode;
  global.GP_DEMO_PEOPLE = freeze({
    checkedAt, sources, evidenceRecords, evidenceRecordsById,
    forGP(code) { return isChaklamba(code) ? people : empty; },
    relatedOfficesForGP(code) { return isChaklamba(code) ? relatedOffices : empty; },
    officeForGP(code) { return isChaklamba(code) ? office : null; },
    sourceIdsForGP(code) { return isChaklamba(code) ? sourceIds : empty; },
    evidenceRecordsForGP(code) { return isChaklamba(code) ? evidenceRecords : empty; },
    evidenceForPerson(id) {
      return people.find(person => person.id === String(id))?.evidenceRecords || empty;
    }
  });
})(window);
