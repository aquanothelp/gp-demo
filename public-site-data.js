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
    name: { en: 'Chaklamba', mr: 'चकलांबा' },
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
        title: { en: 'Welcome to Chaklamba.', mr: 'चकलांबा ग्रामपंचायतीमध्ये आपले स्वागत आहे 🙏' },
        body: { en: 'One Panchayat for every village it serves. Explore citizen services and connect with the right office.', mr: 'आपल्या सर्व गावांसाठी एक ग्रामपंचायत. नागरिक सेवा आणि योग्य कार्यालयाचा संपर्क एकाच ठिकाणी पाहा.' }
      },
      about: {
        title: { en: 'About our Gram Panchayat', mr: 'आपल्या ग्रामपंचायतीविषयी' },
        body: { en: 'A shared Panchayat for every village it serves. Chaklamba is under Georai Panchayat Samiti in Beed; explore village mappings and citizen-service information together.', mr: 'आपल्या प्रत्येक गावासाठी एक ग्रामपंचायत. चकलांबा बीड जिल्ह्यातील गेवराई पंचायत समितीअंतर्गत आहे. गावे आणि नागरिक सेवांची माहिती एकत्र पाहा.' }
      }
    },
    illustrativeFocusAreas: [
      { id: 'water', title: { en: 'Water & repairs', mr: 'पाणी व दुरुस्ती' }, description: { en: 'Illustrative focus: water-supply concerns and maintenance follow-up.', mr: 'उदाहरणार्थ लक्षक्षेत्र: पाणीपुरवठ्याच्या समस्या आणि देखभालीचा पाठपुरावा.' }, verification: 'illustrative', sourceId: 'PUBLIC-SITE-EDITORIAL' },
      { id: 'citizen-services', title: { en: 'Citizen services', mr: 'नागरिक सेवा' }, description: { en: 'Illustrative focus: clear guidance, assisted requests and status updates.', mr: 'उदाहरणार्थ लक्षक्षेत्र: स्पष्ट मार्गदर्शन, मदतीने अर्ज आणि स्थितीची माहिती.' }, verification: 'illustrative', sourceId: 'PUBLIC-SITE-EDITORIAL' },
      { id: 'cleanliness', title: { en: 'Cleanliness', mr: 'स्वच्छता' }, description: { en: 'Illustrative focus: reporting local cleanliness and shared-space concerns.', mr: 'उदाहरणार्थ लक्षक्षेत्र: स्वच्छतांवरील समस्या नोंदवणे.' }, verification: 'illustrative', sourceId: 'PUBLIC-SITE-EDITORIAL' }
    ],
    leadershipIds: ['chaklamba-priyanka-khedkar', 'chaklamba-ismail-pathan'],
    relatedOfficeIds: ['georai-bdo-listed-2025', 'georai-assistant-bdo-listed-2025'],
    office: publishedOffice,
    population: null, area: null, photos: [],
    sourceRelativePath, profilePath, sourceCheckedAt: checkedAt, checkedAt,
    sourceIds: ['PUBLIC-CHAKLAMBA-DIRECTORY', 'PUBLIC-SITE-EDITORIAL', 'PUBLIC-PEOPLE-REFERENCES', 'CHAK-PROFILE01']
  });
  const schemes = freeze([
  {
    "id": "employment",
    "icon": "file",
    "tone": "peach",
    "title": {
      "en": "Rural employment",
      "mr": "ग्रामीण रोजगार"
    },
    "short": {
      "en": "MNREGA / MGNREGA",
      "mr": "मनरेगा / रोजगार हमी"
    },
    "benefit": {
      "en": "Job-card, work-demand and wage-status guidance. Current framework: VB–G RAM G, from July 2026.",
      "mr": "जॉब कार्ड, कामाची मागणी आणि मजुरीच्या स्थितीसाठी मार्गदर्शन. जुलै २०२६ पासून सध्याची चौकट: विकसित भारत–जी राम जी."
    },
    "who": {
      "en": "Rural households whose adult members seek unskilled manual work.",
      "mr": "अकुशल शारीरिक काम करू इच्छिणारे प्रौढ सदस्य असलेली ग्रामीण कुटुंबे."
    },
    "help": {
      "en": "Approach the GP for registration and work-demand guidance; follow up with the Programme Officer where needed.",
      "mr": "नोंदणी व कामाची मागणी करण्यासाठी ग्रामपंचायतीशी संपर्क करा; आवश्यक असल्यास कार्यक्रम अधिकाऱ्याकडे पाठपुरावा करा."
    },
    "next": {
      "en": "Bring your existing job card, if any. Ask how to register a work demand and obtain its receipt.",
      "mr": "विद्यमान जॉब कार्ड असल्यास सोबत आणा. कामाची मागणी नोंदवून पोहोच कशी घ्यावी ते विचारा."
    },
    "url": "https://nrega.dord.gov.in/",
    "sourceIds": [
      "SCHEME-EMPLOYMENT-2026",
      "SCHEME-EMPLOYMENT-FAQ"
    ],
    "localAvailabilityVerified": false,
    "reviewedAt": "2026-11-08",
    "category": "employment",
    "details": {
      "overview": {
        "en": "Job-card, work-demand and wage-status guidance. Current framework: VB–G RAM G, from July 2026.",
        "mr": "जॉब कार्ड, कामाची मागणी आणि मजुरीच्या स्थितीसाठी मार्गदर्शन. जुलै २०२६ पासून सध्याची चौकट: विकसित भारत–जी राम जी."
      },
      "eligibility": {
        "en": [
          "Rural households with adults willing to do unskilled manual work.",
          "Registration and work demand follow the current rural-employment framework."
        ],
        "mr": [
          "अकुशल शारीरिक काम करण्यास इच्छुक प्रौढ सदस्य असलेली ग्रामीण कुटुंबे.",
          "नोंदणी आणि कामाची मागणी सध्याच्या ग्रामीण रोजगार चौकटीत करावी."
        ]
      },
      "documents": {
        "en": [
          "Household members’ names, ages and address.",
          "Existing job card, if held; ask the GP which current identity/eKYC records apply."
        ],
        "mr": [
          "कुटुंबातील सदस्यांची नावे, वय आणि पत्ता.",
          "विद्यमान जॉब कार्ड असल्यास; लागू ओळख/eKYC पुरावे ग्रामपंचायतीकडून तपासा."
        ]
      },
      "steps": {
        "en": [
          "Contact the GP or Programme Officer for registration.",
          "Register a work demand and retain its acknowledgement; follow the official work/wage record."
        ],
        "mr": [
          "नोंदणीसाठी ग्रामपंचायत किंवा कार्यक्रम अधिकाऱ्याशी संपर्क करा.",
          "कामाची मागणी नोंदवून पोहोच घ्या; अधिकृत काम/मजुरी नोंद तपासा."
        ]
      },
      "documentsStatus": "preparation-guide",
      "deadline": {
        "status": "not-verified",
        "date": null,
        "en": "No current closing date verified. Check the scheme or district’s current notice.",
        "mr": "सध्याची अंतिम तारीख पडताळलेली नाही. योजना किंवा जिल्ह्याची चालू सूचना तपासा."
      },
      "application": {
        "url": "https://nrega.dord.gov.in/",
        "mode": "guidance",
        "label": {
          "en": "Official process / guidance",
          "mr": "अधिकृत प्रक्रिया / मार्गदर्शन"
        }
      },
      "beneficiaries": {
        "status": "official-link",
        "url": "https://nrega.dord.gov.in/",
        "description": {
          "en": "Use official job-card/work reports; no worker bank or identity details are copied here.",
          "mr": "अधिकृत जॉब कार्ड/काम अहवाल वापरा; कामगारांची बँक किंवा ओळख माहिती येथे नक्कल केलेली नाही."
        }
      }
    }
  },
  {
    "id": "housing",
    "icon": "home",
    "tone": "sand",
    "title": {
      "en": "Rural housing",
      "mr": "ग्रामीण घरकुल"
    },
    "short": {
      "en": "PMAY-G",
      "mr": "प्रधानमंत्री आवास योजना–ग्रामीण"
    },
    "benefit": {
      "en": "Housing assistance for eligible rural households under PMAY-G.",
      "mr": "प्रधानमंत्री आवास योजना–ग्रामीण अंतर्गत पात्र ग्रामीण कुटुंबांसाठी घरकुल सहाय्य."
    },
    "who": {
      "en": "Households assessed through the scheme’s rural housing eligibility and beneficiary-list process.",
      "mr": "योजनेच्या घरकुल पात्रता आणि लाभार्थी यादी प्रक्रियेनुसार तपासली जाणारी कुटुंबे."
    },
    "help": {
      "en": "Ask about the housing survey, Gram Sabha list verification and the next block-office step.",
      "mr": "घरकुल सर्वेक्षण, ग्रामसभेतील यादी पडताळणी आणि पंचायत समितीतील पुढील प्रक्रियेची माहिती घ्या."
    },
    "next": {
      "en": "Ask the GP to help locate your survey or beneficiary record before starting a fresh request.",
      "mr": "नवीन विनंती करण्यापूर्वी सर्वेक्षण किंवा लाभार्थी यादीतील तुमची नोंद शोधण्यासाठी ग्रामपंचायतीची मदत घ्या."
    },
    "url": "https://pmayg.dord.gov.in/",
    "sourceIds": [
      "SCHEME-PMAYG",
      "SCHEME-PMAYG-GUIDELINES"
    ],
    "localAvailabilityVerified": false,
    "reviewedAt": "2026-11-08",
    "category": "housing",
    "details": {
      "overview": {
        "en": "Housing assistance for eligible rural households under PMAY-G.",
        "mr": "प्रधानमंत्री आवास योजना–ग्रामीण अंतर्गत पात्र ग्रामीण कुटुंबांसाठी घरकुल सहाय्य."
      },
      "eligibility": {
        "en": [
          "Rural houseless/kutcha-house households assessed under the applicable survey and exclusion rules.",
          "Selection requires verified housing records and the designated approval process."
        ],
        "mr": [
          "लागू सर्वेक्षण व अपात्रता निकषांनुसार तपासलेली बेघर/कच्च्या घरातील ग्रामीण कुटुंबे.",
          "निवडीसाठी पडताळलेल्या घरकुल नोंदी आणि संबंधित मंजुरी प्रक्रिया आवश्यक."
        ]
      },
      "documents": {
        "en": [
          "Prepare survey/beneficiary reference, available identity and bank details.",
          "Bring relevant land/house records; confirm the current official checklist."
        ],
        "mr": [
          "सर्वेक्षण/लाभार्थी संदर्भ, उपलब्ध ओळख व बँक तपशील तयार ठेवा.",
          "संबंधित जमीन/घर नोंदी आणा; सध्याची अधिकृत कागदपत्र यादी तपासा."
        ]
      },
      "steps": {
        "en": [
          "Ask the GP about your survey entry and Gram Sabha list verification.",
          "Follow the block/district approval process; check official beneficiary status."
        ],
        "mr": [
          "सर्वेक्षण नोंद व ग्रामसभा यादी पडताळणीबाबत ग्रामपंचायतीकडे विचारा.",
          "तालुका/जिल्हा मंजुरी प्रक्रियेचा पाठपुरावा करा; अधिकृत लाभार्थी स्थिती पाहा."
        ]
      },
      "documentsStatus": "preparation-guide",
      "deadline": {
        "status": "not-verified",
        "date": null,
        "en": "No current closing date verified. Check the scheme or district’s current notice.",
        "mr": "सध्याची अंतिम तारीख पडताळलेली नाही. योजना किंवा जिल्ह्याची चालू सूचना तपासा."
      },
      "application": {
        "url": "https://pmayg.dord.gov.in/",
        "mode": "guidance",
        "label": {
          "en": "Official process / guidance",
          "mr": "अधिकृत प्रक्रिया / मार्गदर्शन"
        }
      },
      "beneficiaries": {
        "status": "official-link",
        "url": "https://pmayg.dord.gov.in/",
        "description": {
          "en": "Open the official PMAY-G beneficiary/report options and select your location.",
          "mr": "अधिकृत PMAY-G लाभार्थी/अहवाल पर्यायांत आपले ठिकाण निवडा."
        }
      }
    }
  },
  {
    "id": "sanitation",
    "icon": "sun",
    "tone": "sage",
    "title": {
      "en": "Toilet support",
      "mr": "शौचालय सहाय्य"
    },
    "short": {
      "en": "Swachh Bharat · Gramin",
      "mr": "स्वच्छ भारत मिशन–ग्रामीण"
    },
    "benefit": {
      "en": "Household-toilet assistance for eligible families, alongside village sanitation and waste-management work.",
      "mr": "पात्र कुटुंबांना वैयक्तिक शौचालयासाठी सहाय्य, तसेच गावातील स्वच्छता व कचरा व्यवस्थापन."
    },
    "who": {
      "en": "Eligible new or left-out rural households without a household toilet, subject to scheme verification.",
      "mr": "वैयक्तिक शौचालय नसलेली पात्र नवीन किंवा वंचित ग्रामीण कुटुंबे; योजनेनुसार पडताळणी आवश्यक."
    },
    "help": {
      "en": "The GP helps identify households and supports local sanitation work; block and district processes also apply.",
      "mr": "कुटुंबांची ओळख आणि स्थानिक स्वच्छतेच्या कामात ग्रामपंचायत मदत करते; तालुका व जिल्हास्तरीय प्रक्रिया देखील लागू होतात."
    },
    "next": {
      "en": "Ask the GP about the household-toilet application and local verification process.",
      "mr": "वैयक्तिक शौचालय अर्ज आणि स्थानिक पडताळणी प्रक्रियेबाबत ग्रामपंचायतीकडे चौकशी करा."
    },
    "url": "https://swachhbharatmission.ddws.gov.in/",
    "sourceIds": [
      "SCHEME-SBMG-FAQ",
      "SCHEME-SBMG-GUIDELINES"
    ],
    "localAvailabilityVerified": false,
    "reviewedAt": "2026-11-08",
    "category": "basic",
    "details": {
      "overview": {
        "en": "Household-toilet assistance for eligible families, alongside village sanitation and waste-management work.",
        "mr": "पात्र कुटुंबांना वैयक्तिक शौचालयासाठी सहाय्य, तसेच गावातील स्वच्छता व कचरा व्यवस्थापन."
      },
      "eligibility": {
        "en": [
          "Eligible new/left-out BPL households and specified APL categories without a toilet.",
          "Local identification is followed by block/district verification."
        ],
        "mr": [
          "शौचालय नसलेली पात्र नवीन/वंचित BPL कुटुंबे व नमूद APL प्रवर्ग.",
          "स्थानिक ओळखीनंतर तालुका/जिल्हा पडताळणी होते."
        ]
      },
      "documents": {
        "en": [
          "Prepare household/address details, eligibility/category records and bank information requested in the current application."
        ],
        "mr": [
          "चालू अर्जात मागितलेले कुटुंब/पत्ता तपशील, पात्रता/प्रवर्ग पुरावे आणि बँक माहिती तयार ठेवा."
        ]
      },
      "steps": {
        "en": [
          "Ask the GP about an IHHL request and current verification.",
          "Follow construction/verification and payment steps explained by the responsible office."
        ],
        "mr": [
          "वैयक्तिक शौचालय अर्ज व सध्याच्या पडताळणीबाबत ग्रामपंचायतीकडे विचारा.",
          "संबंधित कार्यालयाने सांगितलेल्या बांधकाम/पडताळणी व सहाय्य प्रक्रियेचा पाठपुरावा करा."
        ]
      },
      "documentsStatus": "preparation-guide",
      "deadline": {
        "status": "not-verified",
        "date": null,
        "en": "No current closing date verified. Check the scheme or district’s current notice.",
        "mr": "सध्याची अंतिम तारीख पडताळलेली नाही. योजना किंवा जिल्ह्याची चालू सूचना तपासा."
      },
      "application": {
        "url": "https://swachhbharatmission.ddws.gov.in/",
        "mode": "guidance",
        "label": {
          "en": "Official process / guidance",
          "mr": "अधिकृत प्रक्रिया / मार्गदर्शन"
        }
      },
      "beneficiaries": {
        "status": "not-linked",
        "url": null,
        "description": {
          "en": "No verified public beneficiary list is linked for this GP. Ask the office about a lawfully published list.",
          "mr": "या ग्रामपंचायतीसाठी पडताळलेली सार्वजनिक लाभार्थी यादी जोडलेली नाही. नियमांनुसार प्रसिद्ध यादीबाबत कार्यालयात चौकशी करा."
        }
      }
    }
  },
  {
    "id": "water",
    "icon": "drop",
    "tone": "blue",
    "title": {
      "en": "Tap water",
      "mr": "नळाद्वारे पाणी"
    },
    "short": {
      "en": "Jal Jeevan Mission",
      "mr": "जल जीवन मिशन"
    },
    "benefit": {
      "en": "Village drinking-water connections, service planning and water-quality information.",
      "mr": "गावातील नळजोडणी, पाणीपुरवठ्याचे नियोजन आणि पाण्याच्या गुणवत्तेची माहिती."
    },
    "who": {
      "en": "Rural households and communities covered by village water-supply planning.",
      "mr": "गावातील पाणीपुरवठा नियोजनात समाविष्ट ग्रामीण कुटुंबे व समुदाय."
    },
    "help": {
      "en": "The GP and Paani Samiti help plan, manage and maintain in-village water supply.",
      "mr": "ग्रामपंचायत आणि पाणी समिती गावातील पाणीपुरवठ्याचे नियोजन, व्यवस्थापन व देखभाल करतात."
    },
    "next": {
      "en": "Ask the GP or Paani Samiti about your connection, supply issues or water testing.",
      "mr": "नळजोडणी, पाणीपुरवठ्याची अडचण किंवा पाणी तपासणीसाठी ग्रामपंचायत किंवा पाणी समितीकडे चौकशी करा."
    },
    "url": "https://ejalshakti.gov.in/jjm/citizen_corner/villageinformation.aspx",
    "sourceIds": [
      "SCHEME-JJM",
      "SCHEME-JJM-CITIZEN"
    ],
    "localAvailabilityVerified": false,
    "reviewedAt": "2026-11-08",
    "category": "basic",
    "details": {
      "overview": {
        "en": "Village drinking-water connections, service planning and water-quality information.",
        "mr": "गावातील नळजोडणी, पाणीपुरवठ्याचे नियोजन आणि पाण्याच्या गुणवत्तेची माहिती."
      },
      "eligibility": {
        "en": [
          "Rural households covered by village water planning; connection/service arrangements depend on the local system."
        ],
        "mr": [
          "गावातील पाणी नियोजनात समाविष्ट ग्रामीण कुटुंबे; जोडणी/सेवा प्रक्रिया स्थानिक यंत्रणेवर अवलंबून असते."
        ]
      },
      "documents": {
        "en": [
          "Prepare the household address and existing connection reference, if any.",
          "A universal mandatory application checklist is not verified here."
        ],
        "mr": [
          "घराचा पत्ता आणि विद्यमान जोडणी क्रमांक असल्यास तयार ठेवा.",
          "येथे सर्वत्र लागू अनिवार्य अर्ज-कागदपत्र यादी पडताळलेली नाही."
        ]
      },
      "steps": {
        "en": [
          "Contact the GP/Paani Samiti about connection or service needs.",
          "Use Citizen Corner for village supply and water-quality information."
        ],
        "mr": [
          "जोडणी किंवा सेवेसाठी ग्रामपंचायत/पाणी समितीशी संपर्क करा.",
          "गावातील पुरवठा व पाणी गुणवत्तेसाठी Citizen Corner वापरा."
        ]
      },
      "documentsStatus": "preparation-guide",
      "deadline": {
        "status": "not-verified",
        "date": null,
        "en": "No single connection-application deadline verified; check the local village plan.",
        "mr": "जोडणी अर्जाची एकच अंतिम तारीख पडताळलेली नाही; स्थानिक गाव आराखडा तपासा."
      },
      "application": {
        "url": "https://ejalshakti.gov.in/jjm/citizen_corner/villageinformation.aspx",
        "mode": "guidance",
        "label": {
          "en": "Official process / guidance",
          "mr": "अधिकृत प्रक्रिया / मार्गदर्शन"
        }
      },
      "beneficiaries": {
        "status": "official-link",
        "url": "https://ejalshakti.gov.in/jjm/citizen_corner/villageinformation.aspx",
        "description": {
          "en": "Village coverage/quality information, not an individual beneficiary list.",
          "mr": "गावाची पुरवठा/गुणवत्ता माहिती; वैयक्तिक लाभार्थी यादी नाही."
        }
      }
    }
  },
  {
    "id": "livelihoods",
    "icon": "users",
    "tone": "rose",
    "title": {
      "en": "Women’s livelihoods",
      "mr": "महिलांची उपजीविका"
    },
    "short": {
      "en": "UMED · DAY-NRLM",
      "mr": "उमेद · ग्रामीण जीवनोन्नती अभियान"
    },
    "benefit": {
      "en": "Self-help groups, livelihood skills and links to financial services through Maharashtra’s rural livelihoods mission.",
      "mr": "महाराष्ट्राच्या ग्रामीण जीवनोन्नती अभियानातून बचत गट, उपजीविका कौशल्ये आणि आर्थिक सेवांशी जोडणी."
    },
    "who": {
      "en": "Rural poor and vulnerable households, including women participating in self-help groups.",
      "mr": "बचत गटांत सहभागी महिलांसह ग्रामीण गरीब व जोखीमप्रवण कुटुंबे."
    },
    "help": {
      "en": "Ask the GP where to contact a local SHG, village organisation or the block mission team.",
      "mr": "स्थानिक बचत गट, ग्रामसंघ किंवा तालुका अभियान कक्षाशी संपर्क कसा करावा ते ग्रामपंचायतीकडे विचारा."
    },
    "next": {
      "en": "Contact a local SHG or block mission team about joining, training and livelihood support.",
      "mr": "सहभाग, प्रशिक्षण आणि उपजीविका सहाय्यासाठी स्थानिक बचत गट किंवा तालुका अभियान कक्षाशी संपर्क करा."
    },
    "url": "https://umed.in/",
    "sourceIds": [
      "SCHEME-UMED",
      "SCHEME-MSRLM"
    ],
    "localAvailabilityVerified": false,
    "reviewedAt": "2026-11-08",
    "category": "livelihoods",
    "details": {
      "overview": {
        "en": "Self-help groups, livelihood skills and links to financial services through Maharashtra’s rural livelihoods mission.",
        "mr": "महाराष्ट्राच्या ग्रामीण जीवनोन्नती अभियानातून बचत गट, उपजीविका कौशल्ये आणि आर्थिक सेवांशी जोडणी."
      },
      "eligibility": {
        "en": [
          "Rural poor/vulnerable households; SHG/mission-component conditions apply."
        ],
        "mr": [
          "ग्रामीण गरीब/जोखीमप्रवण कुटुंबे; बचत गट/अभियान घटकाचे निकष लागू."
        ]
      },
      "documents": {
        "en": [
          "Prepare basic household and membership details.",
          "For credit/enterprise support, obtain the specific SHG/bank/mission checklist."
        ],
        "mr": [
          "मूलभूत कुटुंब व सदस्यत्व तपशील तयार ठेवा.",
          "कर्ज/उद्योग सहाय्यासाठी संबंधित गट/बँक/अभियानाची कागदपत्र यादी घ्या."
        ]
      },
      "steps": {
        "en": [
          "Contact a local SHG/village organisation or block mission team.",
          "Choose membership, training or enterprise support and follow that component’s process."
        ],
        "mr": [
          "स्थानिक बचत गट/ग्रामसंघ किंवा तालुका अभियान कक्षाशी संपर्क करा.",
          "सदस्यत्व, प्रशिक्षण किंवा उद्योग सहाय्य घटक निवडून त्याची प्रक्रिया पूर्ण करा."
        ]
      },
      "documentsStatus": "preparation-guide",
      "deadline": {
        "status": "not-verified",
        "date": null,
        "en": "No current closing date verified. Check the scheme or district’s current notice.",
        "mr": "सध्याची अंतिम तारीख पडताळलेली नाही. योजना किंवा जिल्ह्याची चालू सूचना तपासा."
      },
      "application": {
        "url": "https://umed.in/",
        "mode": "guidance",
        "label": {
          "en": "Official process / guidance",
          "mr": "अधिकृत प्रक्रिया / मार्गदर्शन"
        }
      },
      "beneficiaries": {
        "status": "not-linked",
        "url": null,
        "description": {
          "en": "No verified public beneficiary list is linked for this GP. Ask the office about a lawfully published list.",
          "mr": "या ग्रामपंचायतीसाठी पडताळलेली सार्वजनिक लाभार्थी यादी जोडलेली नाही. नियमांनुसार प्रसिद्ध यादीबाबत कार्यालयात चौकशी करा."
        }
      }
    }
  },
  {
    "id": "ramai",
    "title": {
      "en": "Ramai housing",
      "mr": "रमाई आवास"
    },
    "short": {
      "en": "Ramai Awas · Rural",
      "mr": "रमाई आवास योजना · ग्रामीण"
    },
    "benefit": {
      "en": "Rural housing support for eligible Scheduled Caste and Neo-Buddhist households.",
      "mr": "पात्र अनुसूचित जाती व नवबौद्ध ग्रामीण कुटुंबांसाठी घरकुल सहाय्य."
    },
    "who": {
      "en": "Eligible Maharashtra SC/Neo-Buddhist households without adequate housing.",
      "mr": "योग्य निवारा नसलेली महाराष्ट्रातील पात्र अनुसूचित जाती व नवबौद्ध कुटुंबे."
    },
    "help": {
      "en": "Ask the GP/DRDA about selection and the Social Welfare office about applicable conditions.",
      "mr": "निवडीसाठी ग्रामपंचायत/जिल्हा ग्रामीण विकास यंत्रणा आणि अटींसाठी समाजकल्याण कार्यालयाशी संपर्क करा."
    },
    "next": {
      "en": "Read the application steps below and contact the responsible office.",
      "mr": "खालील अर्जप्रक्रिया वाचा आणि संबंधित कार्यालयाशी संपर्क करा."
    },
    "url": "https://socialwelfare.maharashtra.gov.in/scheme/रमाई-आवास-योजना-ग्रामीण-व/",
    "sourceIds": [
      "EXP-RAMAI"
    ],
    "icon": "home",
    "tone": "sand",
    "category": "housing",
    "localAvailabilityVerified": false,
    "reviewedAt": "2026-11-08",
    "details": {
      "overview": {
        "en": "Rural housing support for eligible Scheduled Caste and Neo-Buddhist households.",
        "mr": "पात्र अनुसूचित जाती व नवबौद्ध ग्रामीण कुटुंबांसाठी घरकुल सहाय्य."
      },
      "eligibility": {
        "en": [
          "SC/Neo-Buddhist applicant; published conditions include15years’ Maharashtra residence.",
          "Own plot/kutcha house and no previous housing-scheme benefit; current rural income/priority rules must be checked."
        ],
        "mr": [
          "अनुसूचित जाती/नवबौद्ध अर्जदार; प्रसिद्ध अटींमध्ये महाराष्ट्रातील १५ वर्षांचा रहिवास नमूद आहे.",
          "स्वतःची जागा/कच्चे घर व पूर्वी घरकुल लाभ नसणे; सध्याचे ग्रामीण उत्पन्न/प्राधान्य निकष तपासा."
        ]
      },
      "documents": {
        "en": [
          "Prepare caste/residence/income evidence, plot/house records and bank details.",
          "This is a preparation guide, not a verified exhaustive rural checklist."
        ],
        "mr": [
          "जात/रहिवास/उत्पन्न पुरावे, जागा/घर नोंदी आणि बँक तपशील तयार ठेवा.",
          "ही तयारीची मार्गदर्शक यादी आहे; संपूर्ण अनिवार्य ग्रामीण यादी नाही."
        ]
      },
      "steps": {
        "en": [
          "Ask the GP/DRDA and Social Welfare office about the applicable rural selection process.",
          "Submit through the designated office and retain the receipt/reference."
        ],
        "mr": [
          "लागू ग्रामीण निवड प्रक्रियेसाठी ग्रामपंचायत/जिल्हा ग्रामीण विकास यंत्रणा व समाजकल्याण कार्यालयात विचारा.",
          "नियुक्त कार्यालयात अर्ज देऊन पोहोच/संदर्भ जतन करा."
        ]
      },
      "documentsStatus": "preparation-guide",
      "deadline": {
        "status": "not-verified",
        "date": null,
        "en": "No current closing date verified. Check the scheme or district’s current notice.",
        "mr": "सध्याची अंतिम तारीख पडताळलेली नाही. योजना किंवा जिल्ह्याची चालू सूचना तपासा."
      },
      "application": {
        "url": "https://socialwelfare.maharashtra.gov.in/scheme/रमाई-आवास-योजना-ग्रामीण-व/",
        "mode": "guidance",
        "label": {
          "en": "Official process / guidance",
          "mr": "अधिकृत प्रक्रिया / मार्गदर्शन"
        }
      },
      "beneficiaries": {
        "status": "not-linked",
        "url": null,
        "description": {
          "en": "No verified public beneficiary list is linked for this GP. Ask the office about a lawfully published list.",
          "mr": "या ग्रामपंचायतीसाठी पडताळलेली सार्वजनिक लाभार्थी यादी जोडलेली नाही. नियमांनुसार प्रसिद्ध यादीबाबत कार्यालयात चौकशी करा."
        }
      }
    }
  },
  {
    "id": "shabari",
    "title": {
      "en": "Shabari housing",
      "mr": "शबरी आवास"
    },
    "short": {
      "en": "Shabari Adivasi Gharkul",
      "mr": "शबरी आदिवासी घरकुल योजना"
    },
    "benefit": {
      "en": "Rural housing support for eligible Scheduled Tribe households.",
      "mr": "पात्र अनुसूचित जमातीच्या ग्रामीण कुटुंबांसाठी घरकुल सहाय्य."
    },
    "who": {
      "en": "Eligible rural ST households needing a permanent home.",
      "mr": "पक्क्या घराची गरज असलेली पात्र ग्रामीण अनुसूचित जमातीची कुटुंबे."
    },
    "help": {
      "en": "Ask the GP about the recommended list and the designated housing/Tribal Development office about selection.",
      "mr": "शिफारस यादीसाठी ग्रामपंचायत आणि निवडीसाठी संबंधित गृहनिर्माण/आदिवासी विकास कार्यालयाशी संपर्क करा."
    },
    "next": {
      "en": "Read the application steps below and contact the responsible office.",
      "mr": "खालील अर्जप्रक्रिया वाचा आणि संबंधित कार्यालयाशी संपर्क करा."
    },
    "url": "https://www.zpkolhapur.gov.in/scheme/शबरी-आवास-योजना/",
    "sourceIds": [
      "EXP-SHABARI"
    ],
    "icon": "home",
    "tone": "sand",
    "category": "housing",
    "localAvailabilityVerified": false,
    "reviewedAt": "2026-11-08",
    "details": {
      "overview": {
        "en": "Rural housing support for eligible Scheduled Tribe households.",
        "mr": "पात्र अनुसूचित जमातीच्या ग्रामीण कुटुंबांसाठी घरकुल सहाय्य."
      },
      "eligibility": {
        "en": [
          "Eligible rural Scheduled Tribe households needing housing.",
          "Gram Sabha recommendation and designated district-level selection apply; verify current income/land conditions."
        ],
        "mr": [
          "घरकुलाची गरज असलेली पात्र ग्रामीण अनुसूचित जमातीची कुटुंबे.",
          "ग्रामसभा शिफारस व संबंधित जिल्हास्तरीय निवड लागू; सध्याचे उत्पन्न/जागा निकष तपासा."
        ]
      },
      "documents": {
        "en": [
          "Prepare ST certificate, residence and relevant plot/house evidence, plus available bank/identity records.",
          "Obtain the current rural checklist from the designated housing/Tribal office."
        ],
        "mr": [
          "अनुसूचित जमातीचा दाखला, रहिवास व संबंधित जागा/घर पुरावे आणि उपलब्ध बँक/ओळख नोंदी तयार ठेवा.",
          "गृहनिर्माण/आदिवासी कार्यालयाकडून सध्याची ग्रामीण कागदपत्र यादी घ्या."
        ]
      },
      "steps": {
        "en": [
          "Contact the GP about the recommended housing list.",
          "Follow the designated rural housing/Tribal Development process and district approval."
        ],
        "mr": [
          "शिफारस केलेल्या घरकुल यादीबाबत ग्रामपंचायतीशी संपर्क करा.",
          "संबंधित ग्रामीण गृहनिर्माण/आदिवासी विकास प्रक्रिया व जिल्हा मंजुरीचा पाठपुरावा करा."
        ]
      },
      "documentsStatus": "preparation-guide",
      "deadline": {
        "status": "not-verified",
        "date": null,
        "en": "No current closing date verified. Check the scheme or district’s current notice.",
        "mr": "सध्याची अंतिम तारीख पडताळलेली नाही. योजना किंवा जिल्ह्याची चालू सूचना तपासा."
      },
      "application": {
        "url": "https://www.zpkolhapur.gov.in/scheme/शबरी-आवास-योजना/",
        "mode": "guidance",
        "label": {
          "en": "Official process / guidance",
          "mr": "अधिकृत प्रक्रिया / मार्गदर्शन"
        }
      },
      "beneficiaries": {
        "status": "not-linked",
        "url": null,
        "description": {
          "en": "No verified public beneficiary list is linked for this GP. Ask the office about a lawfully published list.",
          "mr": "या ग्रामपंचायतीसाठी पडताळलेली सार्वजनिक लाभार्थी यादी जोडलेली नाही. नियमांनुसार प्रसिद्ध यादीबाबत कार्यालयात चौकशी करा."
        }
      }
    }
  },
  {
    "id": "shravanbal",
    "title": {
      "en": "Senior pension",
      "mr": "श्रावणबाळ निवृत्तीवेतन"
    },
    "short": {
      "en": "Shravan Bal Seva Rajya Nivruttivetan",
      "mr": "श्रावणबाळ सेवा राज्य निवृत्तीवेतन योजना"
    },
    "benefit": {
      "en": "State pension assistance for eligible elderly residents, assessed by the Revenue/Special Assistance branch.",
      "mr": "महसूल/विशेष सहाय्य शाखेकडून पात्रता तपासून ज्येष्ठ रहिवाशांना राज्य निवृत्तीवेतन सहाय्य."
    },
    "who": {
      "en": "Residents aged65+ meeting the applicable BPL/income and residence conditions.",
      "mr": "लागू दारिद्र्यरेषा/उत्पन्न व रहिवास निकष पूर्ण करणारे ६५ वर्षे व त्यावरील रहिवासी."
    },
    "help": {
      "en": "GP can help with records and guidance; submit through the Talathi/Tahsildar Special Assistance process.",
      "mr": "ग्रामपंचायत नोंदी व मार्गदर्शनासाठी मदत करू शकते; अर्ज तलाठी/तहसील विशेष सहाय्य प्रक्रियेत द्यावा."
    },
    "next": {
      "en": "Read the application steps below and contact the responsible office.",
      "mr": "खालील अर्जप्रक्रिया वाचा आणि संबंधित कार्यालयाशी संपर्क करा."
    },
    "url": "https://sjsa.maharashtra.gov.in/en/scheme/shravan-bal-rajya-nivruttivetan-yojana/",
    "sourceIds": [
      "EXP-SHRAVAN",
      "EXP-PENSION-DOCS",
      "EXP-PENSION-CONFLICT"
    ],
    "icon": "users",
    "tone": "rose",
    "category": "pensions",
    "localAvailabilityVerified": false,
    "reviewedAt": "2026-11-08",
    "details": {
      "overview": {
        "en": "State pension assistance for eligible elderly residents, assessed by the Revenue/Special Assistance branch.",
        "mr": "महसूल/विशेष सहाय्य शाखेकडून पात्रता तपासून ज्येष्ठ रहिवाशांना राज्य निवृत्तीवेतन सहाय्य."
      },
      "eligibility": {
        "en": [
          "Residents aged65+ meeting the applicable BPL/income and residence conditions.",
          "Maharashtra residence and BPL/income tests apply. Income ceilings can differ by category; confirm the current rule with the Tahsildar."
        ],
        "mr": [
          "लागू दारिद्र्यरेषा/उत्पन्न व रहिवास निकष पूर्ण करणारे ६५ वर्षे व त्यावरील रहिवासी.",
          "महाराष्ट्र रहिवास व BPL/उत्पन्न निकष लागू. उत्पन्न मर्यादा प्रवर्गानुसार बदलू शकते; सध्याचा नियम तहसील कार्यालयाकडून तपासा."
        ]
      },
      "documents": {
        "en": [
          "Age and residence proof; BPL/income evidence, photo and bank details.",
          "Category-specific disability/medical/widowhood or other proof only where applicable; confirm the final checklist."
        ],
        "mr": [
          "वय व रहिवास पुरावा; BPL/उत्पन्न पुरावा, छायाचित्र व बँक तपशील.",
          "दिव्यांगत्व/वैद्यकीय/वैधव्य किंवा इतर प्रवर्ग पुरावा लागू असेल तेव्हाच; अंतिम यादी तपासा."
        ]
      },
      "steps": {
        "en": [
          "Contact the Talathi/Tahsildar Special Assistance branch.",
          "Complete the prescribed form and applicable documents through the authorized office/Setu channel; retain acknowledgement."
        ],
        "mr": [
          "तलाठी/तहसील विशेष सहाय्य शाखेशी संपर्क करा.",
          "अधिकृत कार्यालय/सेतू मार्गाने विहित अर्ज व लागू कागदपत्रे द्या; पोहोच जतन करा."
        ]
      },
      "documentsStatus": "preparation-guide",
      "deadline": {
        "status": "not-verified",
        "date": null,
        "en": "No current closing date verified. Check the scheme or district’s current notice.",
        "mr": "सध्याची अंतिम तारीख पडताळलेली नाही. योजना किंवा जिल्ह्याची चालू सूचना तपासा."
      },
      "application": {
        "url": "https://sjsa.maharashtra.gov.in/en/scheme/shravan-bal-rajya-nivruttivetan-yojana/",
        "mode": "office",
        "label": {
          "en": "Official process / guidance",
          "mr": "अधिकृत प्रक्रिया / मार्गदर्शन"
        }
      },
      "beneficiaries": {
        "status": "not-linked",
        "url": null,
        "description": {
          "en": "No personal pension/medical beneficiary register is republished here. Ask the office about permitted public information or your own case.",
          "mr": "वैयक्तिक निवृत्तीवेतन/वैद्यकीय लाभार्थी नोंदी येथे पुनर्प्रसिद्ध केलेल्या नाहीत. सार्वजनिक करता येणारी माहिती किंवा स्वतःच्या अर्जाबाबत कार्यालयात विचारा."
        }
      }
    }
  },
  {
    "id": "sanjay",
    "title": {
      "en": "Niradhar assistance",
      "mr": "संजय गांधी निराधार"
    },
    "short": {
      "en": "Sanjay Gandhi Niradhar Anudan",
      "mr": "संजय गांधी निराधार अनुदान योजना"
    },
    "benefit": {
      "en": "Special assistance for eligible destitute and vulnerable residents under category-specific rules.",
      "mr": "प्रवर्गनिहाय नियमांनुसार पात्र निराधार व असुरक्षित व्यक्तींना विशेष सहाय्य."
    },
    "who": {
      "en": "Eligible destitute people below65 and listed categories including orphans, widows, disabled people and specified serious illnesses.",
      "mr": "६५ वर्षांखालील पात्र निराधार आणि अनाथ, विधवा, दिव्यांग व विशिष्ट गंभीर आजार यांसारखे नमूद प्रवर्ग."
    },
    "help": {
      "en": "Ask the Talathi/Tahsildar branch about category, income and supporting records; GP guidance is not sanction.",
      "mr": "प्रवर्ग, उत्पन्न व पुराव्यांसाठी तलाठी/तहसील शाखेकडे चौकशी करा; ग्रामपंचायत मार्गदर्शन म्हणजे मंजुरी नाही."
    },
    "next": {
      "en": "Read the application steps below and contact the responsible office.",
      "mr": "खालील अर्जप्रक्रिया वाचा आणि संबंधित कार्यालयाशी संपर्क करा."
    },
    "url": "https://sjsa.maharashtra.gov.in/en/scheme/sanjay-gandhi-niradhar-anudan-yojana/",
    "sourceIds": [
      "EXP-SANJAY",
      "EXP-PENSION-DOCS",
      "EXP-PENSION-CONFLICT"
    ],
    "icon": "users",
    "tone": "blue",
    "category": "pensions",
    "localAvailabilityVerified": false,
    "reviewedAt": "2026-11-08",
    "details": {
      "overview": {
        "en": "Special assistance for eligible destitute and vulnerable residents under category-specific rules.",
        "mr": "प्रवर्गनिहाय नियमांनुसार पात्र निराधार व असुरक्षित व्यक्तींना विशेष सहाय्य."
      },
      "eligibility": {
        "en": [
          "Eligible destitute people below65 and listed categories including orphans, widows, disabled people and specified serious illnesses.",
          "Maharashtra residence and BPL/income tests apply. Income ceilings can differ by category; confirm the current rule with the Tahsildar."
        ],
        "mr": [
          "६५ वर्षांखालील पात्र निराधार आणि अनाथ, विधवा, दिव्यांग व विशिष्ट गंभीर आजार यांसारखे नमूद प्रवर्ग.",
          "महाराष्ट्र रहिवास व BPL/उत्पन्न निकष लागू. उत्पन्न मर्यादा प्रवर्गानुसार बदलू शकते; सध्याचा नियम तहसील कार्यालयाकडून तपासा."
        ]
      },
      "documents": {
        "en": [
          "Age and residence proof; BPL/income evidence, photo and bank details.",
          "Category-specific disability/medical/widowhood or other proof only where applicable; confirm the final checklist."
        ],
        "mr": [
          "वय व रहिवास पुरावा; BPL/उत्पन्न पुरावा, छायाचित्र व बँक तपशील.",
          "दिव्यांगत्व/वैद्यकीय/वैधव्य किंवा इतर प्रवर्ग पुरावा लागू असेल तेव्हाच; अंतिम यादी तपासा."
        ]
      },
      "steps": {
        "en": [
          "Contact the Talathi/Tahsildar Special Assistance branch.",
          "Complete the prescribed form and applicable documents through the authorized office/Setu channel; retain acknowledgement."
        ],
        "mr": [
          "तलाठी/तहसील विशेष सहाय्य शाखेशी संपर्क करा.",
          "अधिकृत कार्यालय/सेतू मार्गाने विहित अर्ज व लागू कागदपत्रे द्या; पोहोच जतन करा."
        ]
      },
      "documentsStatus": "preparation-guide",
      "deadline": {
        "status": "not-verified",
        "date": null,
        "en": "No current closing date verified. Check the scheme or district’s current notice.",
        "mr": "सध्याची अंतिम तारीख पडताळलेली नाही. योजना किंवा जिल्ह्याची चालू सूचना तपासा."
      },
      "application": {
        "url": "https://sjsa.maharashtra.gov.in/en/scheme/sanjay-gandhi-niradhar-anudan-yojana/",
        "mode": "office",
        "label": {
          "en": "Official process / guidance",
          "mr": "अधिकृत प्रक्रिया / मार्गदर्शन"
        }
      },
      "beneficiaries": {
        "status": "not-linked",
        "url": null,
        "description": {
          "en": "No personal pension/medical beneficiary register is republished here. Ask the office about permitted public information or your own case.",
          "mr": "वैयक्तिक निवृत्तीवेतन/वैद्यकीय लाभार्थी नोंदी येथे पुनर्प्रसिद्ध केलेल्या नाहीत. सार्वजनिक करता येणारी माहिती किंवा स्वतःच्या अर्जाबाबत कार्यालयात विचारा."
        }
      }
    }
  },
  {
    "id": "pmkisan",
    "title": {
      "en": "PM-KISAN",
      "mr": "किसान सन्मान निधी"
    },
    "short": {
      "en": "Pradhan Mantri Kisan Samman Nidhi",
      "mr": "प्रधानमंत्री किसान सन्मान निधी"
    },
    "benefit": {
      "en": "Income-support scheme for eligible landholding farmer families, with state verification and DBT.",
      "mr": "राज्य पडताळणी व थेट लाभ हस्तांतरणाद्वारे पात्र जमीनधारक शेतकरी कुटुंबांसाठी उत्पन्न सहाय्य."
    },
    "who": {
      "en": "Landholding farmer families meeting scheme conditions and exclusions; registration alone does not establish eligibility.",
      "mr": "योजनेच्या अटी व अपात्रता निकषांनुसार पात्र जमीनधारक शेतकरी कुटुंबे; केवळ नोंदणी म्हणजे पात्रता नाही."
    },
    "help": {
      "en": "Use the agriculture/land-record verification channel or CSC; GP may help identify the right office.",
      "mr": "कृषी/जमीन नोंद पडताळणी यंत्रणा किंवा CSC वापरा; ग्रामपंचायत संबंधित कार्यालयाची माहिती देऊ शकते."
    },
    "next": {
      "en": "Read the application steps below and contact the responsible office.",
      "mr": "खालील अर्जप्रक्रिया वाचा आणि संबंधित कार्यालयाशी संपर्क करा."
    },
    "url": "https://pmkisan.gov.in/",
    "sourceIds": [
      "EXP-PMKISAN",
      "EXP-PMKISAN-PORTAL"
    ],
    "icon": "sun",
    "tone": "sage",
    "category": "farming",
    "localAvailabilityVerified": false,
    "reviewedAt": "2026-11-08",
    "details": {
      "overview": {
        "en": "Income-support scheme for eligible landholding farmer families, with state verification and DBT.",
        "mr": "राज्य पडताळणी व थेट लाभ हस्तांतरणाद्वारे पात्र जमीनधारक शेतकरी कुटुंबांसाठी उत्पन्न सहाय्य."
      },
      "eligibility": {
        "en": [
          "Eligible landholding farmer families, subject to scheme exclusions.",
          "State land-record verification and applicable eKYC/payment checks are required."
        ],
        "mr": [
          "योजनेच्या अपात्रता निकषांनुसार पात्र जमीनधारक शेतकरी कुटुंबे.",
          "राज्य जमीन नोंद पडताळणी व लागू eKYC/भरणा तपासणी आवश्यक."
        ]
      },
      "documents": {
        "en": [
          "Aadhaar/identity, landholding and bank information required by the official portal; keep the linked mobile available."
        ],
        "mr": [
          "अधिकृत पोर्टलने मागितलेली आधार/ओळख, जमीन व बँक माहिती; जोडलेला मोबाईल उपलब्ध ठेवा."
        ]
      },
      "steps": {
        "en": [
          "Open Farmers Corner → New Farmer Registration, or use an authorized CSC.",
          "Complete the requested verification; follow Know Your Status and the state verification process."
        ],
        "mr": [
          "Farmers Corner → New Farmer Registration उघडा किंवा अधिकृत CSC वापरा.",
          "मागितलेली पडताळणी पूर्ण करा; Know Your Status व राज्य पडताळणी प्रक्रियेचा पाठपुरावा करा."
        ]
      },
      "documentsStatus": "preparation-guide",
      "deadline": {
        "status": "not-verified",
        "date": null,
        "en": "No current closing date verified. Check the scheme or district’s current notice.",
        "mr": "सध्याची अंतिम तारीख पडताळलेली नाही. योजना किंवा जिल्ह्याची चालू सूचना तपासा."
      },
      "application": {
        "url": "https://pmkisan.gov.in/",
        "mode": "online",
        "label": {
          "en": "Official application portal",
          "mr": "अधिकृत अर्ज पोर्टल"
        }
      },
      "beneficiaries": {
        "status": "official-link",
        "url": "https://pmkisan.gov.in/",
        "description": {
          "en": "Use the official Beneficiary List option; personal status/eKYC remains in the official portal.",
          "mr": "अधिकृत Beneficiary List पर्याय वापरा; वैयक्तिक स्थिती/eKYC अधिकृत पोर्टलवरच राहते."
        }
      }
    }
  },
  {
    "id": "women-child",
    "title": {
      "en": "Women & child welfare",
      "mr": "महिला व बालकल्याण"
    },
    "short": {
      "en": "Anganwadi · Saksham Anganwadi & POSHAN2.0",
      "mr": "अंगणवाडी · सक्षम अंगणवाडी व पोषण २.०"
    },
    "benefit": {
      "en": "Nutrition and Anganwadi services; individual components serve children, adolescent girls, pregnant women and nursing mothers.",
      "mr": "पोषण व अंगणवाडी सेवा; विविध घटकांत बालके, किशोरवयीन मुली, गर्भवती आणि स्तनदा मातांचा समावेश."
    },
    "who": {
      "en": "The relevant age/life-stage and component rules determine eligibility.",
      "mr": "संबंधित वयोगट/जीवनावस्था आणि घटकाचे नियम यानुसार पात्रता ठरते."
    },
    "help": {
      "en": "Start with the Anganwadi worker; the GP can help locate the centre and ICDS/WCD team.",
      "mr": "अंगणवाडी सेविकेशी संपर्क करा; केंद्र व बालविकास/महिला-बालविकास कक्षाची माहिती ग्रामपंचायतीकडे मिळू शकते."
    },
    "next": {
      "en": "Read the application steps below and contact the responsible office.",
      "mr": "खालील अर्जप्रक्रिया वाचा आणि संबंधित कार्यालयाशी संपर्क करा."
    },
    "url": "https://www.womenchild.maharashtra.gov.in/mr/anganwadi-corner",
    "sourceIds": [
      "EXP-WCD"
    ],
    "icon": "heart",
    "tone": "rose",
    "category": "women-child",
    "localAvailabilityVerified": false,
    "reviewedAt": "2026-11-08",
    "details": {
      "overview": {
        "en": "Nutrition and Anganwadi services; individual components serve children, adolescent girls, pregnant women and nursing mothers.",
        "mr": "पोषण व अंगणवाडी सेवा; विविध घटकांत बालके, किशोरवयीन मुली, गर्भवती आणि स्तनदा मातांचा समावेश."
      },
      "eligibility": {
        "en": [
          "Children, adolescent girls, pregnant women and nursing mothers under the relevant POSHAN/Anganwadi component.",
          "The Anganwadi/ICDS team confirms component-specific age and service coverage."
        ],
        "mr": [
          "संबंधित पोषण/अंगणवाडी घटकानुसार बालके, किशोरवयीन मुली, गर्भवती व स्तनदा माता.",
          "घटकनिहाय वय व सेवा व्याप्ती अंगणवाडी/बालविकास कक्ष निश्चित करतो."
        ]
      },
      "documents": {
        "en": [
          "Ask the Anganwadi worker which age, residence and mother/child records apply.",
          "No universal mandatory document list was verified; do not upload health/child records to this demo."
        ],
        "mr": [
          "वय, रहिवास आणि माता/बालकांच्या कोणत्या नोंदी लागतात ते अंगणवाडी सेविकेकडून तपासा.",
          "सर्वत्र लागू अनिवार्य यादी पडताळलेली नाही; आरोग्य/बालक नोंदी या डेमोमध्ये अपलोड करू नका."
        ]
      },
      "steps": {
        "en": [
          "Visit the local Anganwadi centre or ICDS office.",
          "Select the relevant service, confirm its requirements and complete registration with the responsible worker."
        ],
        "mr": [
          "स्थानिक अंगणवाडी केंद्र किंवा बालविकास कार्यालयात भेट द्या.",
          "संबंधित सेवा निवडा, तिच्या अटी तपासा आणि जबाबदार कर्मचाऱ्याकडे नोंदणी पूर्ण करा."
        ]
      },
      "documentsStatus": "preparation-guide",
      "deadline": {
        "status": "not-verified",
        "date": null,
        "en": "No current closing date verified. Check the scheme or district’s current notice.",
        "mr": "सध्याची अंतिम तारीख पडताळलेली नाही. योजना किंवा जिल्ह्याची चालू सूचना तपासा."
      },
      "application": {
        "url": "https://www.womenchild.maharashtra.gov.in/mr/anganwadi-corner",
        "mode": "office",
        "label": {
          "en": "Official process / guidance",
          "mr": "अधिकृत प्रक्रिया / मार्गदर्शन"
        }
      },
      "beneficiaries": {
        "status": "not-linked",
        "url": null,
        "description": {
          "en": "No child, pregnancy or health-beneficiary list is published in this demo. Use the authorized service channel for individual enquiries.",
          "mr": "या डेमोमध्ये बालक, गर्भवती किंवा आरोग्य लाभार्थी यादी प्रसिद्ध केलेली नाही. वैयक्तिक चौकशीसाठी अधिकृत सेवा कक्ष वापरा."
        }
      }
    }
  },
  {
    "id": "agriculture",
    "title": {
      "en": "Farm equipment",
      "mr": "कृषी यांत्रिकीकरण"
    },
    "short": {
      "en": "MahaDBT · Farm Mechanization",
      "mr": "महा-DBT · कृषी यांत्रिकीकरण उप-अभियान"
    },
    "benefit": {
      "en": "Component-based support for farm machinery and equipment through the Agriculture Department.",
      "mr": "कृषी विभागामार्फत यंत्रे व अवजारांसाठी घटकनिहाय सहाय्य."
    },
    "who": {
      "en": "Farmers meeting the selected component, land-record and applicable FarmerID conditions.",
      "mr": "निवडलेल्या घटकाचे, जमीन नोंदींचे आणि लागू FarmerID निकष पूर्ण करणारे शेतकरी."
    },
    "help": {
      "en": "The Agriculture office/CSC supports portal use; GP does not approve the machinery subsidy.",
      "mr": "कृषी कार्यालय/CSC पोर्टलसाठी मदत करते; अवजार अनुदानाची मंजुरी ग्रामपंचायत देत नाही."
    },
    "next": {
      "en": "Read the application steps below and contact the responsible office.",
      "mr": "खालील अर्जप्रक्रिया वाचा आणि संबंधित कार्यालयाशी संपर्क करा."
    },
    "url": "https://mahadbt.maharashtra.gov.in/Farmer/SchemeData/SchemeData?str=E9DDFA703C38E51A23C0254248DAFF28",
    "sourceIds": [
      "EXP-AGRI",
      "EXP-AGRI-LOGIN"
    ],
    "icon": "sun",
    "tone": "sage",
    "category": "farming",
    "localAvailabilityVerified": false,
    "reviewedAt": "2026-11-08",
    "details": {
      "overview": {
        "en": "Component-based support for farm machinery and equipment through the Agriculture Department.",
        "mr": "कृषी विभागामार्फत यंत्रे व अवजारांसाठी घटकनिहाय सहाय्य."
      },
      "eligibility": {
        "en": [
          "Selected machinery-component conditions and repeat-benefit restrictions apply.",
          "MahaDBT publishes FarmerID/AgriStack requirements and specific exceptions; check the current login notice."
        ],
        "mr": [
          "निवडलेल्या अवजार घटकाचे व पुन्हा लाभ घेण्यावरील निकष लागू.",
          "MahaDBT वरील FarmerID/AgriStack अटी आणि विशिष्ट अपवादांसाठी सध्याची लॉगिन सूचना तपासा."
        ]
      },
      "documents": {
        "en": [
          "Aadhaar,7/12,8-A; caste certificate for applicable SC/ST claims.",
          "Equipment quotation/testing certificate, self-declaration and pre-sanction records as required by the component."
        ],
        "mr": [
          "आधार, ७/१२, ८-अ; लागू SC/ST लाभासाठी जातीचा दाखला.",
          "घटकानुसार अवजार कोटेशन/चाचणी अहवाल, स्वयंघोषणा आणि पूर्वसंमती नोंदी."
        ]
      },
      "steps": {
        "en": [
          "Use the official MahaDBT Farmer portal and confirm the current application window.",
          "Select the component, complete profile/documents and follow sanction instructions before proceeding."
        ],
        "mr": [
          "अधिकृत MahaDBT Farmer पोर्टलवर सध्याचा अर्ज कालावधी तपासा.",
          "घटक निवडा, प्रोफाइल/कागदपत्रे पूर्ण करा आणि पुढील कृतीपूर्वी मंजुरीच्या सूचनांचे पालन करा."
        ]
      },
      "documentsStatus": "official-component-page",
      "deadline": {
        "status": "not-verified",
        "date": null,
        "en": "No current closing date verified. Check the scheme or district’s current notice.",
        "mr": "सध्याची अंतिम तारीख पडताळलेली नाही. योजना किंवा जिल्ह्याची चालू सूचना तपासा."
      },
      "application": {
        "url": "https://mahadbt.maharashtra.gov.in/Farmer/AgriLogin/AgriLogin",
        "mode": "online",
        "label": {
          "en": "Official application portal",
          "mr": "अधिकृत अर्ज पोर्टल"
        }
      },
      "beneficiaries": {
        "status": "official-link",
        "url": "https://mahadbt.maharashtra.gov.in/Farmer/SchemeData/SchemeData?str=E9DDFA703C38E51A23C0254248DAFF28",
        "description": {
          "en": "The scheme page links official application-order and funded-beneficiary reports. These are distinct lists; no local names are copied here.",
          "mr": "योजना पृष्ठावर अधिकृत अर्ज क्रमवारी व निधी वितरित लाभार्थी अहवाल आहेत. या वेगळ्या याद्या आहेत; स्थानिक नावे येथे नक्कल केलेली नाहीत."
        }
      }
    }
  },
  {
    "id": "livestock",
    "title": {
      "en": "Livestock support",
      "mr": "पशुसंवर्धन योजना"
    },
    "short": {
      "en": "Rural Livestock Entrepreneurship · scheme directory",
      "mr": "ग्रामीण पशुधन उद्योजकता · योजना मार्गदर्शक"
    },
    "benefit": {
      "en": "State/district livestock programmes have different components, selection conditions and application notices.",
      "mr": "राज्य/जिल्हा पशुधन कार्यक्रमांचे घटक, निवड निकष आणि अर्ज सूचना वेगवेगळ्या आहेत."
    },
    "who": {
      "en": "Select the exact livestock component with the veterinary/Animal Husbandry office before checking eligibility.",
      "mr": "पात्रता तपासण्यापूर्वी पशुवैद्यकीय/पशुसंवर्धन कार्यालयाकडून नेमका घटक निवडा."
    },
    "help": {
      "en": "GP can signpost the veterinary office; the designated Animal Husbandry authority handles the scheme.",
      "mr": "ग्रामपंचायत पशुवैद्यकीय कार्यालयाचा संपर्क देऊ शकते; संबंधित पशुसंवर्धन प्राधिकरण योजना हाताळते."
    },
    "next": {
      "en": "Read the application steps below and contact the responsible office.",
      "mr": "खालील अर्जप्रक्रिया वाचा आणि संबंधित कार्यालयाशी संपर्क करा."
    },
    "url": "https://dahd.maharashtra.gov.in/कागदपत्रे/",
    "sourceIds": [
      "EXP-LIVESTOCK"
    ],
    "icon": "users",
    "tone": "sand",
    "category": "farming",
    "localAvailabilityVerified": false,
    "reviewedAt": "2026-11-08",
    "details": {
      "overview": {
        "en": "State/district livestock programmes have different components, selection conditions and application notices.",
        "mr": "राज्य/जिल्हा पशुधन कार्यक्रमांचे घटक, निवड निकष आणि अर्ज सूचना वेगवेगळ्या आहेत."
      },
      "eligibility": {
        "en": [
          "Conditions depend on the state/district livestock component and target category.",
          "The departmental index confirms programme families, not a universal eligibility decision."
        ],
        "mr": [
          "अटी राज्य/जिल्हा पशुधन घटक व लक्षित प्रवर्गानुसार असतात.",
          "विभागीय निर्देशिकेत कार्यक्रम नमूद आहेत; सर्वांसाठी एकच पात्रता निर्णय त्यातून ठरत नाही."
        ]
      },
      "documents": {
        "en": [
          "Obtain the exact application and document checklist from the veterinary/Animal Husbandry office.",
          "Identity, bank, category and livestock/project records must only be supplied where that component asks for them."
        ],
        "mr": [
          "पशुवैद्यकीय/पशुसंवर्धन कार्यालयाकडून नेमका अर्ज व कागदपत्र यादी घ्या.",
          "ओळख, बँक, प्रवर्ग आणि पशुधन/प्रकल्प नोंदी संबंधित घटकाने मागितल्यासच द्या."
        ]
      },
      "steps": {
        "en": [
          "Choose the relevant state/district livestock component with the designated office.",
          "Use the application route and closing date in its current official notice; no single universal form is verified here."
        ],
        "mr": [
          "संबंधित कार्यालयाकडून लागू राज्य/जिल्हा पशुधन घटक निवडा.",
          "त्याच्या चालू अधिकृत सूचनेतील अर्जमार्ग व अंतिम तारीख वापरा; येथे एकच सार्वत्रिक अर्ज पडताळलेला नाही."
        ]
      },
      "documentsStatus": "preparation-guide",
      "deadline": {
        "status": "not-verified",
        "date": null,
        "en": "No current closing date verified. Check the scheme or district’s current notice.",
        "mr": "सध्याची अंतिम तारीख पडताळलेली नाही. योजना किंवा जिल्ह्याची चालू सूचना तपासा."
      },
      "application": {
        "url": "https://dahd.maharashtra.gov.in/कागदपत्रे/",
        "mode": "office",
        "label": {
          "en": "Official process / guidance",
          "mr": "अधिकृत प्रक्रिया / मार्गदर्शन"
        }
      },
      "beneficiaries": {
        "status": "not-linked",
        "url": null,
        "description": {
          "en": "No verified public beneficiary list is linked for this GP. Ask the office about a lawfully published list.",
          "mr": "या ग्रामपंचायतीसाठी पडताळलेली सार्वजनिक लाभार्थी यादी जोडलेली नाही. नियमांनुसार प्रसिद्ध यादीबाबत कार्यालयात चौकशी करा."
        }
      }
    }
  }
]);
  const notices = freeze([
  {
    "id": "N01",
    "gpCode": "171415",
    "category": "general",
    "title": {
      "en": "GP service desk",
      "mr": "ग्रामपंचायत सेवा कक्ष"
    },
    "body": {
      "en": "Bring your application reference when visiting the service desk. Ask about document requests, follow-up and assisted applications.",
      "mr": "सेवा कक्षात येताना अर्ज क्रमांक सोबत आणा. दाखले, अर्जांचा पाठपुरावा आणि मदतीने अर्ज करण्याबाबत चौकशी करा."
    },
    "date": "2026-11-08",
    "fictional": true,
    "reference": "GP171415/NOTICE/2026/001",
    "issuer": {
      "en": "Gram Panchayat office, Chaklamba",
      "mr": "ग्रामपंचायत कार्यालय, चकलांबा"
    },
    "deadlineAt": null,
    "deadlineLabel": {
      "en": "No deadline stated",
      "mr": "अंतिम मुदत नमूद नाही"
    },
    "priority": "normal",
    "reviewAt": null,
    "attachment": {
      "format": "generated-html",
      "title": {
        "en": "Notice copy",
        "mr": "सूचनेची प्रत"
      }
    },
    "visibility": "public",
    "publicationState": "demo-published",
    "approvalState": "demo-only",
    "smsState": "not-configured",
    "containsBeneficiaryList": false
  },
  {
    "id": "N02",
    "gpCode": "171415",
    "category": "general",
    "title": {
      "en": "Water supply maintenance",
      "mr": "पाणीपुरवठा देखभाल"
    },
    "body": {
      "en": "Water supply is scheduled to pause on 11 November, 10 am–1 pm, for pipeline maintenance. Store essential water in advance and contact the office for updates.",
      "mr": "वाहिनी देखभालीसाठी ११ नोव्हेंबर रोजी सकाळी १० ते दुपारी १ पाणीपुरवठा बंद राहण्याचे नियोजन आहे. आवश्यक पाण्याची साठवण करा आणि अद्ययावत माहितीसाठी कार्यालयाशी संपर्क करा."
    },
    "date": "2026-11-08",
    "fictional": true,
    "reference": "GP171415/NOTICE/2026/002",
    "issuer": {
      "en": "Gram Panchayat office, Chaklamba",
      "mr": "ग्रामपंचायत कार्यालय, चकलांबा"
    },
    "deadlineAt": "2026-11-11T13:00:00+05:30",
    "deadlineLabel": {
      "en": "Event / service time",
      "mr": "कार्यक्रम / सेवेची वेळ"
    },
    "priority": "urgent",
    "reviewAt": "2026-11-11T13:00:00+05:30",
    "attachment": {
      "format": "generated-html",
      "title": {
        "en": "Notice copy",
        "mr": "सूचनेची प्रत"
      }
    },
    "visibility": "public",
    "publicationState": "demo-published",
    "approvalState": "demo-only",
    "smsState": "not-configured",
    "containsBeneficiaryList": false
  },
  {
    "id": "N03",
    "gpCode": "171415",
    "category": "meetings",
    "title": {
      "en": "Gram Sabha · 15 November",
      "mr": "ग्रामसभा · १५ नोव्हेंबर"
    },
    "body": {
      "en": "Gram Sabha is scheduled for 15 November at 11 am at the GP office. Agenda: water supply, sanitation, village works and housing-list discussion. Share agenda suggestions at the office.",
      "mr": "१५ नोव्हेंबर रोजी सकाळी ११ वाजता ग्रामपंचायत कार्यालयात ग्रामसभेचे नियोजन आहे. विषय: पाणीपुरवठा, स्वच्छता, विकासकामे आणि घरकुल यादी चर्चा. विषयांसाठी सूचना कार्यालयात द्या."
    },
    "date": "2026-11-07",
    "fictional": true,
    "reference": "GP171415/NOTICE/2026/003",
    "issuer": {
      "en": "Gram Panchayat office, Chaklamba",
      "mr": "ग्रामपंचायत कार्यालय, चकलांबा"
    },
    "deadlineAt": "2026-11-15T11:00:00+05:30",
    "deadlineLabel": {
      "en": "Event / service time",
      "mr": "कार्यक्रम / सेवेची वेळ"
    },
    "priority": "normal",
    "reviewAt": null,
    "attachment": {
      "format": "generated-html",
      "title": {
        "en": "Notice copy",
        "mr": "सूचनेची प्रत"
      }
    },
    "visibility": "public",
    "publicationState": "demo-published",
    "approvalState": "demo-only",
    "smsState": "not-configured",
    "containsBeneficiaryList": false
  },
  {
    "id": "N04",
    "gpCode": "171415",
    "category": "schemes",
    "title": {
      "en": "Housing-scheme guidance",
      "mr": "घरकुल योजना मार्गदर्शन"
    },
    "body": {
      "en": "Ask the GP about housing survey entries and the beneficiary-list process. The Schemes section links to PMAY-G information and the relevant next steps.",
      "mr": "घरकुल सर्वेक्षणातील नोंदी आणि लाभार्थी यादी प्रक्रियेची ग्रामपंचायतीकडे चौकशी करा. योजना विभागात PMAY-G माहिती आणि पुढील पावले पाहता येतील."
    },
    "date": "2026-11-06",
    "fictional": true,
    "route": "schemes",
    "reference": "GP171415/NOTICE/2026/004",
    "issuer": {
      "en": "Gram Panchayat office, Chaklamba",
      "mr": "ग्रामपंचायत कार्यालय, चकलांबा"
    },
    "deadlineAt": null,
    "deadlineLabel": {
      "en": "No deadline stated",
      "mr": "अंतिम मुदत नमूद नाही"
    },
    "priority": "normal",
    "reviewAt": null,
    "attachment": {
      "format": "generated-html",
      "title": {
        "en": "Notice copy",
        "mr": "सूचनेची प्रत"
      }
    },
    "visibility": "public",
    "publicationState": "demo-published",
    "approvalState": "demo-only",
    "smsState": "not-configured",
    "containsBeneficiaryList": false
  },
  {
    "id": "N05",
    "gpCode": "171415",
    "category": "schemes",
    "title": {
      "en": "Job-card & work-demand camp",
      "mr": "जॉब कार्ड व कामाची मागणी शिबिर"
    },
    "body": {
      "en": "A guidance camp is planned on 12 November at the GP office. Bring an existing job card if available and ask how to register a work demand. No recruitment vacancy or appointment is announced by this notice.",
      "mr": "१२ नोव्हेंबर रोजी ग्रामपंचायत कार्यालयात मार्गदर्शन शिबिराचे नियोजन आहे. विद्यमान जॉब कार्ड असल्यास आणा आणि कामाची मागणी नोंदवण्याची माहिती घ्या. या सूचनेत भरतीची जागा किंवा नियुक्ती जाहीर केलेली नाही."
    },
    "date": "2026-11-05",
    "fictional": true,
    "route": "schemes",
    "reference": "GP171415/NOTICE/2026/005",
    "issuer": {
      "en": "Gram Panchayat office, Chaklamba",
      "mr": "ग्रामपंचायत कार्यालय, चकलांबा"
    },
    "deadlineAt": "2026-11-12T10:00:00+05:30",
    "deadlineLabel": {
      "en": "Event / service time",
      "mr": "कार्यक्रम / सेवेची वेळ"
    },
    "priority": "normal",
    "reviewAt": null,
    "attachment": {
      "format": "generated-html",
      "title": {
        "en": "Notice copy",
        "mr": "सूचनेची प्रत"
      }
    },
    "visibility": "public",
    "publicationState": "demo-published",
    "approvalState": "demo-only",
    "smsState": "not-configured",
    "containsBeneficiaryList": false
  },
  {
    "id": "N06",
    "gpCode": "171415",
    "category": "general",
    "title": {
      "en": "Village cleanliness drive",
      "mr": "गाव स्वच्छता उपक्रम"
    },
    "body": {
      "en": "A community cleanliness drive is planned for 14 November at 8 am. Volunteers can meet near the GP office; contact the office to coordinate participation.",
      "mr": "१४ नोव्हेंबर रोजी सकाळी ८ वाजता सामुदायिक स्वच्छता उपक्रमाचे नियोजन आहे. स्वयंसेवकांनी ग्रामपंचायत कार्यालयाजवळ जमावे; सहभागासाठी कार्यालयाशी संपर्क करा."
    },
    "date": "2026-11-04",
    "fictional": true,
    "reference": "GP171415/NOTICE/2026/006",
    "issuer": {
      "en": "Gram Panchayat office, Chaklamba",
      "mr": "ग्रामपंचायत कार्यालय, चकलांबा"
    },
    "deadlineAt": "2026-11-14T08:00:00+05:30",
    "deadlineLabel": {
      "en": "Event / service time",
      "mr": "कार्यक्रम / सेवेची वेळ"
    },
    "priority": "urgent",
    "reviewAt": "2026-11-07T18:00:00+05:30",
    "attachment": {
      "format": "generated-html",
      "title": {
        "en": "Notice copy",
        "mr": "सूचनेची प्रत"
      }
    },
    "visibility": "public",
    "publicationState": "demo-published",
    "approvalState": "demo-only",
    "smsState": "not-configured",
    "containsBeneficiaryList": false
  },
  {
    "id": "N07",
    "gpCode": "171415",
    "category": "statutory",
    "title": {
      "en": "Government orders & circulars",
      "mr": "शासकीय आदेश व परिपत्रके"
    },
    "body": {
      "en": "Read Rural Development Department circulars on the official government website. Open the published document to check its date, scope and instructions.",
      "mr": "ग्रामविकास विभागाची परिपत्रके अधिकृत शासकीय संकेतस्थळावर पाहा. दिनांक, व्याप्ती आणि सूचना तपासण्यासाठी प्रसिद्ध कागदपत्र उघडा."
    },
    "date": "2026-11-08",
    "fictional": true,
    "url": "https://rdd.maharashtra.gov.in/en/circulars/",
    "kind": "official-resource",
    "reference": "GP171415/NOTICE/2026/007",
    "issuer": {
      "en": "Gram Panchayat office, Chaklamba",
      "mr": "ग्रामपंचायत कार्यालय, चकलांबा"
    },
    "deadlineAt": null,
    "deadlineLabel": {
      "en": "No deadline stated",
      "mr": "अंतिम मुदत नमूद नाही"
    },
    "priority": "normal",
    "reviewAt": null,
    "attachment": {
      "format": "generated-html",
      "title": {
        "en": "Notice copy",
        "mr": "सूचनेची प्रत"
      }
    },
    "visibility": "public",
    "publicationState": "demo-published",
    "approvalState": "demo-only",
    "smsState": "not-configured",
    "containsBeneficiaryList": false
  },
  {
    "id": "N08",
    "gpCode": "171415",
    "category": "accounts",
    "title": {
      "en": "Tax records & public accounts",
      "mr": "कर नोंदी व सार्वजनिक हिशेब"
    },
    "body": {
      "en": "Ask the office for your tax record and the applicable authorized charges. Approved public accounts and budget disclosures can be inspected through the office. No new tax or payment deadline is imposed by this sample.",
      "mr": "कर नोंद व लागू अधिकृत शुल्कासाठी कार्यालयाशी संपर्क करा. मंजूर सार्वजनिक हिशेब व अर्थसंकल्पीय माहिती कार्यालयात पाहता येईल. या नमुन्यात नवीन कर किंवा भरणा मुदत लागू केलेली नाही."
    },
    "date": "2026-11-08",
    "fictional": true,
    "reference": "GP171415/NOTICE/2026/008",
    "issuer": {
      "en": "Gram Panchayat office, Chaklamba",
      "mr": "ग्रामपंचायत कार्यालय, चकलांबा"
    },
    "deadlineAt": null,
    "deadlineLabel": {
      "en": "No deadline stated",
      "mr": "अंतिम मुदत नमूद नाही"
    },
    "priority": "normal",
    "reviewAt": null,
    "attachment": {
      "format": "generated-html",
      "title": {
        "en": "Notice copy",
        "mr": "सूचनेची प्रत"
      }
    },
    "visibility": "public",
    "publicationState": "demo-published",
    "approvalState": "demo-only",
    "smsState": "not-configured",
    "containsBeneficiaryList": false
  },
  {
    "id": "N09",
    "gpCode": "171415",
    "category": "works",
    "title": {
      "en": "Village works update",
      "mr": "गावातील कामांची माहिती"
    },
    "body": {
      "en": "View the Development section for sample work progress. A live tender or quotation must carry its authorized document, approval and submission dates; this sample does not invite bids.",
      "mr": "कामांच्या नमुना प्रगतीसाठी विकासकामे विभाग पाहा. प्रत्यक्ष निविदा किंवा दरपत्रकासाठी अधिकृत कागदपत्र, मंजुरी व सादरीकरणाचे दिनांक आवश्यक आहेत; या नमुन्यात बोली मागवलेल्या नाहीत."
    },
    "date": "2026-11-08",
    "fictional": true,
    "reference": "GP171415/NOTICE/2026/009",
    "issuer": {
      "en": "Gram Panchayat office, Chaklamba",
      "mr": "ग्रामपंचायत कार्यालय, चकलांबा"
    },
    "deadlineAt": null,
    "deadlineLabel": {
      "en": "No deadline stated",
      "mr": "अंतिम मुदत नमूद नाही"
    },
    "priority": "normal",
    "reviewAt": null,
    "attachment": {
      "format": "generated-html",
      "title": {
        "en": "Notice copy",
        "mr": "सूचनेची प्रत"
      }
    },
    "visibility": "public",
    "publicationState": "demo-published",
    "approvalState": "demo-only",
    "smsState": "not-configured",
    "containsBeneficiaryList": false
  }
]);
  const newsCategories = freeze([["meetings", "Gram Sabha & Meetings", "ग्रामसभा व बैठका"], ["general", "Citizen Services & General", "नागरिक सेवा व सर्वसाधारण सूचना"], ["accounts", "Taxes, Fees & Public Accounts", "कर, शुल्क व सार्वजनिक हिशेब"], ["schemes", "Schemes & Benefits", "योजना व लाभ"], ["works", "Development Works & Tenders", "विकासकामे व निविदा"], ["statutory", "Official & Statutory Notices", "शासकीय व वैधानिक सूचना"]]);
  const schemeSourceIndex = freeze({
  "SCHEME-EMPLOYMENT-2026": {
    "title": "MoRD / PIB — Historic Commencement of Viksit Bharat–G RAM G",
    "url": "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2259703&lang=1&reg=1",
    "publication": "2026-05-11",
    "sections": "Commencement and transition paragraphs; existing job-card paragraph",
    "accessedAt": "2026-11-08"
  },
  "SCHEME-EMPLOYMENT-FAQ": {
    "title": "PIB — Viksit Bharat–G RAM G FAQs",
    "url": "https://www.pib.gov.in/PressNoteDetails.aspx?ModuleId=4&NoteId=158511&lang=2&reg=48",
    "publication": "2026-05-11",
    "sections": "Questions2–3,12–15",
    "accessedAt": "2026-11-08"
  },
  "SCHEME-PMAYG": {
    "title": "Ministry of Rural Development — PMAY-G",
    "url": "https://pmayg.dord.gov.in/netiayHome/Home.aspx",
    "publication": "Not stated for whole page",
    "sections": "Guidelines and beneficiary links",
    "accessedAt": "2026-11-08"
  },
  "SCHEME-PMAYG-GUIDELINES": {
    "title": "MoRD — PMAY-G framework",
    "url": "https://www.dord.gov.in/static/uploads/2024/02/PMAYG_Guidelines_English.pdf",
    "publication": "Edition date not established here",
    "sections": "Sections4.4.4–4.5",
    "accessedAt": "2026-11-08"
  },
  "SCHEME-SBMG-FAQ": {
    "title": "DDWS — SBM-G FAQs",
    "url": "https://swachhbharatmission.ddws.gov.in/faq",
    "publication": "Page undated",
    "sections": "PhaseII household-toilet eligibility question",
    "accessedAt": "2026-11-08"
  },
  "SCHEME-SBMG-GUIDELINES": {
    "title": "DDWS — SBM-G PhaseII Operational Guidelines",
    "url": "https://swachhbharatmission.ddws.gov.in/sites/default/files/Guidelines/SBMG%20Phase-II%20Operational%20Guidelines.pdf",
    "publication": "2020",
    "sections": "Chapter5.1, printedp21",
    "accessedAt": "2026-11-08"
  },
  "SCHEME-JJM": {
    "title": "DDWS — In-village water supply infrastructure",
    "url": "https://jaljeevanmission.gov.in/infrastructure/",
    "publication": "Undated",
    "sections": "In-village infrastructure and Village Action Plan paragraphs",
    "accessedAt": "2026-11-08"
  },
  "SCHEME-JJM-CITIZEN": {
    "title": "DDWS — JJM Citizen Corner",
    "url": "https://ejalshakti.gov.in/jjm/citizen_corner/villageinformation.aspx",
    "publication": "Dynamic page",
    "sections": "Village selector and citizen information",
    "accessedAt": "2026-11-08"
  },
  "SCHEME-UMED": {
    "title": "UMED — Maharashtra State Rural Livelihoods Mission",
    "url": "https://umed.in/vision_mission.php",
    "publication": "Undated",
    "sections": "Mission objectives and service links",
    "accessedAt": "2026-11-08"
  },
  "SCHEME-MSRLM": {
    "title": "Maharashtra RDD — MSRLM",
    "url": "https://rdd.maharashtra.gov.in/en/maharashtra-state-rural-livelihood-mission/",
    "publication": "Page last updated2026-01-05",
    "sections": "Mission objectives, management structure, campaign components",
    "accessedAt": "2026-11-08"
  },
  "COMMUNITY-CIRCULARS": {
    "title": "Maharashtra RDD — Circulars",
    "url": "https://rdd.maharashtra.gov.in/en/circulars/",
    "publication": "Page last updated2026-10-23",
    "sections": "Notice table",
    "accessedAt": "2026-11-08"
  },
  "CONTACT-112": {
    "title": "Ministry of Home Affairs — ERSS",
    "url": "https://www.mha.gov.in/emergency-response-support-system-erss",
    "publication": "Undated",
    "sections": "One India One Emergency Number paragraph",
    "accessedAt": "2026-11-08"
  },
  "CONTACT-108": {
    "title": "NHM Maharashtra — Maharashtra Emergency Medical Services",
    "url": "https://nhm.maharashtra.gov.in/en/scheme/maharashtra-emergency-medical-services-mems-emergency-medical-service-on-call/",
    "publication": "2025-04-08",
    "sections": "Introduction and108toll-free paragraphs",
    "accessedAt": "2026-11-08"
  }
});
  const schemeDetailSources = freeze({
  "EXP-RAMAI": {
    "title": "Commissionerate of Social Welfare — Ramai Awas",
    "url": "https://socialwelfare.maharashtra.gov.in/scheme/रमाई-आवास-योजना-ग्रामीण-व/",
    "publication": "2025-06-27",
    "sections": "Purpose, major conditions, application contact",
    "accessedAt": "2026-11-08"
  },
  "EXP-SHABARI": {
    "title": "Zilla Parishad Kolhapur — Shabari Awas",
    "url": "https://www.zpkolhapur.gov.in/scheme/शबरी-आवास-योजना/",
    "publication": "Page range2025-07-18–2029-07-31 is not an application deadline",
    "sections": "Rural ST housing and Gram Sabha/district selection",
    "accessedAt": "2026-11-08"
  },
  "EXP-SHRAVAN": {
    "title": "Social Justice — Shravan Bal Seva Rajya Nivruttivetan",
    "url": "https://sjsa.maharashtra.gov.in/en/scheme/shravan-bal-rajya-nivruttivetan-yojana/",
    "publication": "Page shows2000-01-01; freshness unknown",
    "sections": "Age65+, BPL/income conditions and offices",
    "accessedAt": "2026-11-08"
  },
  "EXP-SANJAY": {
    "title": "Social Justice — Sanjay Gandhi Niradhar",
    "url": "https://sjsa.maharashtra.gov.in/en/scheme/sanjay-gandhi-niradhar-anudan-yojana/",
    "publication": "Page date not a current rules approval",
    "sections": "Eligible categories and application offices",
    "accessedAt": "2026-11-08"
  },
  "EXP-PENSION-DOCS": {
    "title": "Amravati District — Sanjay Gandhi and pension schemes",
    "url": "https://amravati.gov.in/en/scheme/sanjay-gandhi-niradhar-yojana/",
    "publication": "Undated page",
    "sections": "Application steps, age/residence/income and conditional documents",
    "accessedAt": "2026-11-08"
  },
  "EXP-PENSION-CONFLICT": {
    "title": "Ahilyanagar District — Sanjay Gandhi Yojana",
    "url": "https://ahilyanagar.maharashtra.gov.in/en/sanjay-gandhi/",
    "publication": "Undated page",
    "sections": "Category-specific income ceilings; differs from blanket state page",
    "accessedAt": "2026-11-08"
  },
  "EXP-PMKISAN": {
    "title": "NIC — PM-KISAN",
    "url": "https://www.nic.gov.in/project/pm-kisan/",
    "publication": "Undated page",
    "sections": "Farmers Corner, eKYC, exclusions, registration and state verification",
    "accessedAt": "2026-11-08"
  },
  "EXP-PMKISAN-PORTAL": {
    "title": "PM-KISAN portal",
    "url": "https://pmkisan.gov.in/",
    "publication": "Dynamic",
    "sections": "New Farmer Registration, Know Your Status, Beneficiary List; direct open timed out, indexed official page and NIC corroborate functions",
    "accessedAt": "2026-11-08"
  },
  "EXP-WCD": {
    "title": "Maharashtra WCD — Saksham Anganwadi and POSHAN2.0",
    "url": "https://www.womenchild.maharashtra.gov.in/mr/anganwadi-corner",
    "publication": "Undated page",
    "sections": "Information, beneficiary groups and programme links",
    "accessedAt": "2026-11-08"
  },
  "EXP-AGRI": {
    "title": "MahaDBT — Sub-Mission on Farm Mechanization",
    "url": "https://mahadbt.maharashtra.gov.in/Farmer/SchemeData/SchemeData?str=E9DDFA703C38E51A23C0254248DAFF28",
    "publication": "Dynamic; reopening notice has no verified deadline",
    "sections": "About, eligibility, required documents, application and funded-beneficiary reports",
    "accessedAt": "2026-11-08"
  },
  "EXP-AGRI-LOGIN": {
    "title": "MahaDBT Farmer Login",
    "url": "https://mahadbt.maharashtra.gov.in/Farmer/AgriLogin/AgriLogin",
    "publication": "Dynamic",
    "sections": "AgriStack FarmerID requirement and stated exception components",
    "accessedAt": "2026-11-08"
  },
  "EXP-LIVESTOCK": {
    "title": "Maharashtra Animal Husbandry — documents",
    "url": "https://dahd.maharashtra.gov.in/कागदपत्रे/",
    "publication": "Includes2026-03-09 and2026-04-13 scheme listings",
    "sections": "Chief Minister Rural Livestock Entrepreneurship state/district programmes; detailed criteria/checklist not established from index",
    "accessedAt": "2026-11-08"
  }
});
  const placeRecords=freeze([
  {
    "id": "school-zp",
    "gpCode": "171415",
    "category": "school",
    "title": {
      "en": "ZP High School, Chaklamba",
      "mr": "जि.प. माध्यमिक शाळा, चकलांबा"
    },
    "address": {
      "en": "Chaklamba area · Georai · Beed",
      "mr": "चकलांबा परिसर · गेवराई · बीड"
    },
    "summary": {
      "en": "Listed in the2022–23 government school plan; current contacts and campus pin await confirmation.",
      "mr": "२०२२–२३ शासकीय शाळा आराखड्यातील नोंद; सध्याचे संपर्क व अचूक परिसरस्थान पुष्टी व्हायचे आहे."
    },
    "icon": "home",
    "status": "listed",
    "phone": null,
    "email": null,
    "website": null,
    "mapQuery": "ZP High School Chaklamba Georai Beed Maharashtra",
    "coordinates": null,
    "sourceIds": [
      "PLACE-SCHOOL"
    ],
    "contactsPublished": false, "independentlyCurrentContactsVerified": false,
    "reviewedAt": "2026-11-08",
    "sourceReference": "UDISE27270506702",
    "sourceYear": "2022–23"
  },
  {
    "id": "college-arts",
    "gpCode": "171415",
    "category": "college",
    "title": {
      "en": "Arts & Science College, Chaklamba",
      "mr": "कला व विज्ञान महाविद्यालय, चकलांबा"
    },
    "address": {
      "en": "Chaklamba area · Georai · Beed",
      "mr": "चकलांबा परिसर · गेवराई · बीड"
    },
    "summary": {
      "en": "Listed in a2023government programme record; current contact details await confirmation.",
      "mr": "२०२३ शासकीय कार्यक्रम नोंदीत नमूद; सध्याची संपर्क माहिती पुष्टी व्हायची आहे."
    },
    "icon": "home",
    "status": "listed",
    "phone": null,
    "email": null,
    "website": null,
    "mapQuery": "Arts and Science College Chaklamba Georai Beed Maharashtra",
    "coordinates": null,
    "sourceIds": [
      "PLACE-COLLEGE"
    ],
    "contactsPublished": false, "independentlyCurrentContactsVerified": false,
    "reviewedAt": "2026-11-08",
    "sourceReference": "AISHE C-34538",
    "sourceYear": "2023"
  },
  {
    "id": "temple-pending",
    "gpCode": "171415",
    "category": "temple",
    "title": {
      "en": "Temple details",
      "mr": "मंदिरांची माहिती"
    },
    "address": {
      "en": "Chaklamba area · Georai · Beed",
      "mr": "चकलांबा परिसर · गेवराई · बीड"
    },
    "summary": {
      "en": "Local names, exact locations and public contacts are to be added after verification.",
      "mr": "स्थानिक नावे, अचूक ठिकाणे व सार्वजनिक संपर्क पडताळणीनंतर जोडायचे आहेत."
    },
    "icon": "home",
    "status": "pending",
    "phone": null,
    "email": null,
    "website": null,
    "mapQuery": null,
    "coordinates": null,
    "sourceIds": [],
    "contactsPublished": false, "independentlyCurrentContactsVerified": false,
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "police-chaklamba",
    "gpCode": "171415",
    "category": "police",
    "title": {
      "en": "Chaklamba Police Station",
      "mr": "चकलांबा पोलीस ठाणे"
    },
    "address": {
      "en": "Chaklamba · PIN431130 · Georai · Beed",
      "mr": "चकलांबा · पिन ४३११३० · गेवराई · बीड"
    },
    "summary": {
      "en": "Station contact published by the district administration. For emergencies use112.",
      "mr": "जिल्हा प्रशासनाने प्रसिद्ध केलेला ठाण्याचा संपर्क. आपत्कालीन मदतीसाठी ११२ वापरा."
    },
    "icon": "file",
    "status": "listed",
    "phone": "02447-258033",
    "email": "ps.chaklamba.beed@mahapolice.gov.in",
    "website": null,
    "mapQuery": "Chaklamba Police Station Georai Beed Maharashtra 431130",
    "coordinates": null,
    "sourceIds": [
      "PLACE-POLICE"
    ],
    "contactsPublished": true, "independentlyCurrentContactsVerified": false,
    "reviewedAt": "2026-11-08",
    "emailNormalization": "Complete [dot]/[at] obfuscation expanded; no missing/masked characters inferred"
  },
  {
    "id": "phc-chaklamba",
    "gpCode": "171415",
    "category": "hospital",
    "title": {
      "en": "Primary Health Centre, Chaklamba",
      "mr": "प्राथमिक आरोग्य केंद्र, चकलांबा"
    },
    "address": {
      "en": "Chaklamba area · Georai · Beed",
      "mr": "चकलांबा परिसर · गेवराई · बीड"
    },
    "summary": {
      "en": "Named in a2025Health Department record. Local phone, hours and precise entrance pin await confirmation.",
      "mr": "२०२५ आरोग्य विभागाच्या नोंदीत नमूद. स्थानिक दूरध्वनी, वेळा व अचूक प्रवेशस्थान पुष्टी व्हायचे आहे."
    },
    "icon": "heart",
    "status": "listed",
    "phone": null,
    "email": null,
    "website": null,
    "mapQuery": "Primary Health Centre Chaklamba Georai Beed Maharashtra",
    "coordinates": null,
    "sourceIds": [
      "PLACE-PHC"
    ],
    "contactsPublished": false, "independentlyCurrentContactsVerified": false,
    "reviewedAt": "2026-11-08",
    "sourceYear": "2025"
  },
  {
    "id": "fire-enquiry",
    "gpCode": "171415",
    "category": "fire",
    "title": {
      "en": "Fire-service enquiry",
      "mr": "अग्निशमन चौकशी"
    },
    "address": {
      "en": "Georai Municipal Council · Shastri Chowk · Georai431127",
      "mr": "गेवराई नगरपरिषद · शास्त्री चौक · गेवराई ४३११२७"
    },
    "summary": {
      "en": "Municipal enquiry contact, not a verified fire-station number. The nearest responding fire unit is not confirmed; emergency112.",
      "mr": "नगरपरिषद चौकशी संपर्क; पडताळलेला अग्निशमन ठाण्याचा क्रमांक नाही. सर्वात जवळचे प्रतिसाद देणारे ठाणे पुष्टी झालेले नाही; आपत्कालीन ११२."
    },
    "icon": "home",
    "status": "referral",
    "phone": "02447-262015",
    "email": "mcgeorai@gmail.com",
    "website": "https://mahaulb.in/MahaULB/index",
    "mapQuery": "Georai Municipal Council Shastri Chowk Georai Beed Maharashtra",
    "coordinates": null,
    "sourceIds": [
      "PLACE-MUNICIPAL"
    ],
    "contactsPublished": true, "independentlyCurrentContactsVerified": false,
    "reviewedAt": "2026-11-08",
    "nearestVerified": false,
    "locationScope": "outside-GP-referral"
  },
  {
    "id": "ambulance-108",
    "gpCode": "171415",
    "category": "ambulance",
    "title": {
      "en": "108 ambulance service",
      "mr": "१०८ रुग्णवाहिका सेवा"
    },
    "address": {
      "en": "Statewide dispatch · no fixed village base confirmed",
      "mr": "राज्यस्तरीय नियंत्रण कक्ष · गावातील निश्चित तळ पुष्टी नाही"
    },
    "summary": {
      "en": "Call108for Maharashtra emergency ambulance assistance. No local vehicle location is claimed.",
      "mr": "महाराष्ट्रात आपत्कालीन रुग्णवाहिका सहाय्यासाठी १०८ वर संपर्क करा. स्थानिक वाहनाचे ठिकाण दाखवलेले नाही."
    },
    "icon": "heart",
    "status": "helpline",
    "phone": "108",
    "email": null,
    "website": "https://nhm.maharashtra.gov.in/en/scheme/maharashtra-emergency-medical-services-mems-emergency-medical-service-on-call/",
    "mapQuery": null,
    "coordinates": null,
    "sourceIds": [
      "PLACE-AMBULANCE"
    ],
    "contactsPublished": true, "independentlyCurrentContactsVerified": false,
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "ration-pending",
    "gpCode": "171415",
    "category": "ration",
    "title": {
      "en": "Ration-shop details",
      "mr": "रेशन दुकानांची माहिती"
    },
    "address": {
      "en": "Chaklamba area · Georai · Beed",
      "mr": "चकलांबा परिसर · गेवराई · बीड"
    },
    "summary": {
      "en": "Local shop ID, dealer, address and public contact are not verified. Use the official FPS search or ask the Supply office.",
      "mr": "स्थानिक दुकान क्रमांक, विक्रेता, पत्ता व सार्वजनिक संपर्क पडताळलेले नाहीत. अधिकृत FPS शोध वापरा किंवा पुरवठा कार्यालयात चौकशी करा."
    },
    "icon": "file",
    "status": "pending",
    "phone": null,
    "email": null,
    "website": "https://rcms.mahafood.gov.in/indexv1.aspx",
    "mapQuery": null,
    "coordinates": null,
    "sourceIds": [
      "PLACE-RATION"
    ],
    "contactsPublished": false, "independentlyCurrentContactsVerified": false,
    "reviewedAt": "2026-11-08"
  }
]);
  const placeCategories=freeze([["school", "Schools", "शाळा"], ["college", "Colleges", "महाविद्यालये"], ["temple", "Temples", "मंदिरे"], ["police", "Police", "पोलीस"], ["hospital", "Govt health", "शासकीय आरोग्य"], ["fire", "Fire brigade", "अग्निशमन"], ["ambulance", "Ambulance", "रुग्णवाहिका"], ["ration", "Ration shops", "रेशन दुकाने"]]);
  const placeSources=freeze({
  "PLACE-POLICE": {
    "title": "District Beed — Police Stations",
    "url": "https://beed.gov.in/public-utility-category/पोलिस-स्टेशन/",
    "date": "Page updated2026-11-02",
    "sections": "Chaklamba entry:02447-258033; complete obfuscated official mailbox; PIN431130",
    "status": "direct-official-page",
    "accessedAt": "2026-11-08"
  },
  "PLACE-PHC": {
    "title": "Maharashtra Health GR",
    "url": "https://gr.maharashtra.gov.in/Site/Upload/Government%20Resolutions/English/202504111248371217.pdf",
    "date": "2025-04-11",
    "sections": "PHC Chaklamba, Georai, Beed entry; no staff appointment or contact copied",
    "status": "official-indexed-historical",
    "accessedAt": "2026-11-08"
  },
  "PLACE-SCHOOL": {
    "title": "MoE — Maharashtra Samagra Shiksha PAB2022–23",
    "url": "https://dsel.education.gov.in/sites/default/files/2022-07/pab_maharashtra_2223.pdf",
    "date": "2022–23",
    "sections": "AnnexureIX:27270506702, Zphs chaklamba, Bid; current fetch404, indexed government listing only",
    "status": "official-indexed-historical",
    "accessedAt": "2026-11-08"
  },
  "PLACE-COLLEGE": {
    "title": "Unnat Bharat Abhiyan — participating-institution record",
    "url": "https://unnatbharatabhiyan.gov.in/public/uploads/documents/UC_received_under_UBA_till_31_08_2023_.pdf",
    "date": "2023-08-31",
    "sections": "Arts & Science College–Chaklamba, C-34538; government indexed entry; current operations/contacts not confirmed",
    "status": "official-indexed-historical",
    "accessedAt": "2026-11-08"
  },
  "PLACE-MUNICIPAL": {
    "title": "District Beed — Georai Municipal Council",
    "url": "https://beed.gov.in/en/public-utility/gevrai-municipal-council/",
    "date": "Page updated2026-03-12",
    "sections": "ShastriChowk address;02447-262015;mcgeorai@gmail.com. General municipal enquiry, not a fire-station contact or nearest claim",
    "status": "direct-official-page",
    "accessedAt": "2026-11-08"
  },
  "PLACE-RATION": {
    "title": "Maharashtra Food — FEAST",
    "url": "https://rcms.mahafood.gov.in/indexv1.aspx",
    "date": "Dynamic page",
    "sections": "FPS district/shop search; no Chaklamba dealer/shop record retrieved",
    "status": "official-locator-only",
    "accessedAt": "2026-11-08"
  },
  "PLACE-AMBULANCE": {
    "title": "NHM Maharashtra — MEMS",
    "url": "https://nhm.maharashtra.gov.in/en/scheme/maharashtra-emergency-medical-services-mems-emergency-medical-service-on-call/",
    "date": "2025-04-08",
    "sections": "108statewide ambulance dispatch; not a fixed local ambulance base",
    "status": "direct-official-page",
    "accessedAt": "2026-11-08"
  }
});
  global.GP_PUBLIC_SITE_DATA = freeze({
    placeCategories, placeSources,
    placesForGP(code) { return placeRecords.filter(p=>p.gpCode===String(code)); },
    checkedAt, sources, schemes, newsCategories, schemeSourceIndex, schemeDetailSources,
    developmentsForGP(code) { return (global.GP_DEMO_MODULES?.works||[]).filter(r=>r.gpCode===String(code)).map(r=>({id:r.id,gpCode:r.gpCode,title:r.title,summary:r.summary,status:r.status,progress:Math.min(100,Math.max(0,parseInt(r.fields.find(f=>f.label.en==='Progress')?.value.en||'0',10))),fictional:true})); },
    isNoticeUrgent(item, now = Date.now()) { return item.priority === 'urgent' && Number.isFinite(Date.parse(item.reviewAt)) && Date.parse(item.reviewAt) > now && Date.parse(item.date + 'T00:00:00+05:30') <= now; },
    noticesForGP(code) { return notices.filter(item => item.gpCode === String(code) && item.visibility === 'public' && item.publicationState === 'demo-published'); },
    displayName(record, lang) { return String(record?.code) === '171415' && lang === 'mr' ? 'चकलांबा' : lang === 'mr' && /^(Georai|Gevrai)$/i.test(record?.en || '') ? 'गेवराई' : record?.[lang] || record?.en || ''; },
    forGP(code) { return String(code == null ? '' : code).trim() === '171415' ? chaklamba : null; }
  });
})(window);
