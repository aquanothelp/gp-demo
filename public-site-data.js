/* Curated public-page content for one dated GP snapshot. No live office lookup.
   Unknown facts remain null; other GPs receive no Chaklamba content. */
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
  const publishedOffice = global.GP_DEMO_PEOPLE?.officeForGP?.('171415');
  if (!publishedOffice) throw new Error('Keep people-data.js before public-site-data.js for the sourced GP office record.');
  const sourceRelativePath = 'output/gram_panchayat_profiles_20261107_pincodes/district_470.md#gp-171415';
  const profilePath = '../output/gram_panchayat_profiles_20261107_pincodes/district_470.md#gp-171415';
  const sources = freeze({
    'PUBLIC-CHAKLAMBA-DIRECTORY': {
      id: 'PUBLIC-CHAKLAMBA-DIRECTORY', title: 'Verified Chaklamba GP profile and accepted village mapping',
      publisher: 'Local publication derived from retained official LGD sources',
      sourceRelativePath, profilePath, checkedAt, snapshotDate: checkedAt,
      methodPath: '../docs/gp_directory_enrichment.md',
      officialSourceBase: 'https://lgdirectory.gov.in/webservices/lgdws/',
      evidence: 'verified-retained-directory-and-accepted-mapping',
      note: { en: 'One accepted returned village mapping, not proof of complete or whole-village coverage. Census identifiers are not population figures. Office address/PIN comes from the separate official GP profile; phone/email, hours, population and area remain unconfirmed.', mr: 'स्रोतातून परत आलेली एक स्वीकृत गाव-जोडणी; पूर्ण व्याप्तीचा पुरावा नाही. जनगणना क्रमांक म्हणजे लोकसंख्या नाही. कार्यालयाचा प्रसिद्ध पत्ता/पिन स्वतंत्र अधिकृत प्रोफाइलमधील आहे; दूरध्वनी, ईमेल, वेळा, लोकसंख्या व क्षेत्रफळाची पुष्टी नाही.' }
    },
    'PUBLIC-SITE-EDITORIAL': {
      id: 'PUBLIC-SITE-EDITORIAL', title: 'Local demonstration welcome, about and illustrative focus areas',
      publisher: 'Prototype editorial content', checkedAt, evidence: 'editorial-illustration',
      note: { en: 'Welcome/about wording is editorial. Focus areas illustrate possible public-site content; they are not adopted plans, completed works, funded schemes or achievements.', mr: 'स्वागत/परिचयाचा मजकूर संपादित आहे. लक्षक्षेत्रे सार्वजनिक संकेतस्थळावरील संभाव्य मजकुराची उदाहरणे आहेत; मंजूर योजना, पूर्ण कामे, निधी किंवा उपलब्धी नाहीत.' }
    },
    'PUBLIC-PEOPLE-REFERENCES': {
      id: 'PUBLIC-PEOPLE-REFERENCES', title: 'Direct official listings, user-supplied screenshot records and separate dated related-office listings',
      module: 'GP_DEMO_PEOPLE', guidePath: 'PEOPLE_DIRECTORY.md', checkedAt,
      sourceIds: ['CHAK-ER01', 'CHAK-PROFILE01', 'CHAK-MERI-SCREENSHOT01', 'PEOPLE-GEORAI-OFFICES'],
      evidence: 'refer-to-person-specific-evidence',
      note: { en: 'Curated person groups retain separate underlying source/term records. Published listings and the user-confirmed screenshot do not independently establish current appointments or a complete council. Related Panchayat Samiti contacts are not GP contacts.', mr: 'व्यक्तींच्या नोंदींमध्ये प्रत्येक स्रोत/कार्यकाळ स्वतंत्र ठेवला आहे. प्रसिद्ध नोंदी आणि वापरकर्त्याचे स्क्रीनशॉट म्हणजे सध्याची नियुक्ती किंवा संपूर्ण परिषद प्रमाणित नाही. पंचायत समितीचा संपर्क ग्रामपंचायतीचा संपर्क नाही.' }
    },
    'CHAK-PROFILE01': {
      id: 'CHAK-PROFILE01', title: 'eGramSwaraj public Chaklamba GP profile — office address',
      url: 'https://egramswaraj.gov.in/getZpProfileDetails.do?lbc=171415', checkedAt,
      evidencePath: '../docs/project-memory/lookups/CHAKLAMBA_OFFICEHOLDERS_2026-11-07.md',
      sourceType: 'direct-official-retrieval',
      note: { en: 'Official published Office Contact Details, manually transcribed in the retained research. No independent office visit/deliverability check; phone/email are masked, hours are unknown.', mr: 'अधिकृत प्रोफाइलमधील कार्यालयीन संपर्क माहिती संशोधनात नोंदवली आहे. प्रत्यक्ष भेट किंवा टपाल वितरणाची स्वतंत्र पडताळणी नाही; दूरध्वनी/ईमेल लपविलेले, वेळा अज्ञात.' }
    }
  });
  const chaklamba = freeze({
    gpCode: '171415',
    name: { en: 'Chaklamba', mr: 'चाकलांबा' },
    villageName: { en: 'Chaklamba', mr: 'चकलांबा' },
    state: { code: '27', name: { en: 'Maharashtra', mr: 'महाराष्ट्र' } },
    district: { code: '470', name: { en: 'Beed', mr: 'बीड' } },
    zillaParishad: { code: '428', name: { en: 'Beed', mr: 'बीड' } },
    samiti: { code: '4683', name: { en: 'Georai', mr: 'गेवराई' }, sourceName: 'Georai', marathiDisplayEditorial: true },
    talukas: [{ code: '4218', name: { en: 'Georai', mr: 'गेवराई' }, sourceName: 'Georai', marathiDisplayEditorial: true }],
    developmentBlocks: [{ code: '4325', name: { en: 'Georai', mr: 'गेवराई' }, sourceName: 'Georai', marathiDisplayEditorial: true }],
    mappedVillageCount: 1,
    villages: [{ code: '559282', name: { en: 'Chaklamba', mr: 'चकलांबा' }, talukaCode: '4218', developmentBlockCode: '4325', pin: null, sourceId: 'PUBLIC-CHAKLAMBA-DIRECTORY' }],
    mappingScope: {
      kind: 'accepted-returned-mapping', count: 1,
      completeCoverageEstablished: false, fullVersusPartKnown: false, populationDerived: false,
      note: { en: 'One accepted village mapping returned by the official source; completeness and full-versus-part coverage are not established.', mr: 'अधिकृत स्रोतातून परत आलेली एक स्वीकृत गाव-जोडणी; पूर्णता व पूर्ण/अंशतः व्याप्ती स्थापित नाही.' }
    },
    editorial: {
      verification: 'editorial', sourceId: 'PUBLIC-SITE-EDITORIAL',
      welcome: {
        title: { en: 'Welcome to Chaklamba.', mr: 'चाकलांबा ग्रामपंचायतीत आपले स्वागत.' },
        body: { en: 'One Panchayat for every village it serves. Explore citizen services and connect with the right office.', mr: 'आपल्या सर्व गावांसाठी एक ग्रामपंचायत. नागरिक सेवा आणि योग्य कार्यालयाचा संपर्क एकाच ठिकाणी पाहा.' }
      },
      about: {
        title: { en: 'About our Gram Panchayat', mr: 'आपल्या ग्रामपंचायतीविषयी' },
        body: { en: 'A shared Panchayat for every village it serves. Chaklamba is under Georai Panchayat Samiti in Beed; explore village mappings and citizen-service information together.', mr: 'आपल्या प्रत्येक गावासाठी एक ग्रामपंचायत. चाकलांबा बीड जिल्ह्यातील गेवराई पंचायत समितीअंतर्गत आहे. गावे आणि नागरिक सेवांची माहिती एकत्र पाहा.' }
      }
    },
    illustrativeFocusAreas: [
      { id: 'water', title: { en: 'Water & repairs', mr: 'पाणी आणि स्थानिक देखभाल' }, description: { en: 'Illustrative focus: water-supply concerns and maintenance follow-up.', mr: 'उदाहरणार्थ लक्षक्षेत्र: पाणीपुरवठ्याच्या समस्या आणि देखभालीचा पाठपुरावा.' }, verification: 'illustrative', sourceId: 'PUBLIC-SITE-EDITORIAL' },
      { id: 'citizen-services', title: { en: 'Citizen services', mr: 'नागरिक सेवा' }, description: { en: 'Illustrative focus: clear guidance, assisted requests and status updates.', mr: 'उदाहरणार्थ लक्षक्षेत्र: स्पष्ट मार्गदर्शन, मदतीने अर्ज आणि स्थितीची माहिती.' }, verification: 'illustrative', sourceId: 'PUBLIC-SITE-EDITORIAL' },
      { id: 'cleanliness', title: { en: 'Cleanliness', mr: 'स्वच्छता आणि सार्वजनिक जागा' }, description: { en: 'Illustrative focus: reporting local cleanliness and shared-space concerns.', mr: 'उदाहरणार्थ लक्षक्षेत्र: स्वच्छता आणि सार्वजनिक जागांवरील समस्या नोंदवणे.' }, verification: 'illustrative', sourceId: 'PUBLIC-SITE-EDITORIAL' }
    ],
    leadershipIds: ['chaklamba-priyanka-khedkar', 'chaklamba-ismail-pathan'],
    relatedOfficeIds: ['georai-bdo-listed-2025', 'georai-assistant-bdo-listed-2025'],
    office: publishedOffice,
    population: null, area: null, photos: [],
    sourceRelativePath, profilePath, sourceCheckedAt: checkedAt, checkedAt,
    sourceIds: ['PUBLIC-CHAKLAMBA-DIRECTORY', 'PUBLIC-SITE-EDITORIAL', 'PUBLIC-PEOPLE-REFERENCES', 'CHAK-PROFILE01']
  });
  global.GP_PUBLIC_SITE_DATA = freeze({
    checkedAt, sources,
    forGP(code) { return String(code == null ? '' : code).trim() === '171415' ? chaklamba : null; }
  });
})(window);
