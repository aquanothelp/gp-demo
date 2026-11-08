/* Synthetic cases for one fictional citizen in a local demo. The app binds GP identity. */
window.GP_DEMO_CASES = [
  {
    "key": "birth-copy",
    "suffix": "001",
    "service": "birth",
    "channel": "citizen",
    "status": "review",
    "created": "2026-11-05T04:30:00Z",
    "location": {
      "en": "Ward 2 (sample)",
      "mr": "प्रभाग २ (नमुना)"
    },
    "details": {
      "en": "Sample request for an existing registered birth certificate copy.",
      "mr": "आधी नोंदवलेल्या जन्माच्या प्रमाणपत्राची प्रत मिळण्यासाठी नमुना अर्ज."
    },
    "register": {
      "en": "Sample record / 2020",
      "mr": "नमुना नोंद / २०२०"
    },
    "events": [
      {
        "status": "submitted",
        "at": "2026-11-05T04:30:00Z",
        "actor": "citizen",
        "note": {
          "en": "Sample request recorded.",
          "mr": "नमुना अर्ज नोंदवला."
        }
      },
      {
        "status": "review",
        "at": "2026-11-06T06:00:00Z",
        "actor": "office",
        "note": {
          "en": "Sample office check is in progress.",
          "mr": "कार्यालयाची नमुना पडताळणी सुरू आहे."
        }
      }
    ]
  },
  {
    "key": "streetlight-issue",
    "suffix": "002",
    "service": "grievance",
    "channel": "citizen",
    "status": "submitted",
    "created": "2026-11-06T07:00:00Z",
    "location": {
      "en": "School road (sample)",
      "mr": "शाळेजवळचा रस्ता (नमुना)"
    },
    "details": {
      "en": "Sample issue: a streetlight near the school is not working.",
      "mr": "नमुना समस्या: शाळेजवळचा पथदिवा बंद आहे."
    },
    "register": {
      "en": "",
      "mr": ""
    },
    "events": [
      {
        "status": "submitted",
        "at": "2026-11-06T07:00:00Z",
        "actor": "citizen",
        "note": {
          "en": "Sample issue recorded.",
          "mr": "नमुना समस्येची नोंद केली."
        }
      }
    ]
  },
  {
    "key": "no-dues",
    "suffix": "003",
    "service": "nodues",
    "channel": "assisted",
    "status": "completed",
    "created": "2026-11-04T04:30:00Z",
    "location": {
      "en": "Ward 1 (sample)",
      "mr": "प्रभाग १ (नमुना)"
    },
    "details": {
      "en": "Sample request for a no-dues check.",
      "mr": "थकबाकीची पडताळणी करण्यासाठी नमुना अर्ज."
    },
    "register": {
      "en": "Sample assessment 014",
      "mr": "नमुना आकारणी क्रमांक ०१४"
    },
    "events": [
      {
        "status": "submitted",
        "at": "2026-11-04T04:30:00Z",
        "actor": "citizen",
        "note": {
          "en": "Sample request recorded.",
          "mr": "नमुना अर्ज नोंदवला."
        }
      },
      {
        "status": "completed",
        "at": "2026-11-05T08:00:00Z",
        "actor": "office",
        "note": {
          "en": "Demonstration closed. No certificate has been issued.",
          "mr": "डेमो केस पूर्ण केली. कोणतेही प्रमाणपत्र वितरित केलेले नाही."
        }
      }
    ]
  },
  {
    "key": "assessment-details",
    "suffix": "004",
    "service": "assessment",
    "channel": "assisted",
    "status": "action",
    "created": "2026-11-05T05:00:00Z",
    "location": {
      "en": "Ward 3 (sample)",
      "mr": "प्रभाग ३ (नमुना)"
    },
    "details": {
      "en": "Sample request for an extract from the GP tax assessment register. This is not proof of ownership.",
      "mr": "ग्रामपंचायत कर आकारणी नोंदवहीतील उताऱ्यासाठी नमुना अर्ज. हा मालकीहक्काचा पुरावा नाही."
    },
    "register": {
      "en": "",
      "mr": ""
    },
    "events": [
      {
        "status": "submitted",
        "at": "2026-11-05T05:00:00Z",
        "actor": "citizen",
        "note": {
          "en": "Sample assessment request recorded through the assisted channel.",
          "mr": "कार्यालयाच्या मदतीने आकारणी उताऱ्याचा नमुना अर्ज नोंदवला."
        }
      },
      {
        "status": "review",
        "at": "2026-11-05T09:00:00Z",
        "actor": "office",
        "note": {
          "en": "The demo office is checking the sample reference.",
          "mr": "डेमो कार्यालय नमुना नोंद क्रमांक तपासत आहे."
        }
      },
      {
        "status": "action",
        "at": "2026-11-06T08:00:00Z",
        "actor": "office",
        "note": {
          "en": "Please confirm the fictional GP assessment number. No personal documents are needed for this demo.",
          "mr": "नमुना ग्रामपंचायत आकारणी क्रमांक सांगा. या डेमोसाठी वैयक्तिक कागदपत्रे देऊ नका."
        }
      }
    ]
  },
  {
    "key": "water-supply",
    "suffix": "005",
    "service": "water",
    "channel": "citizen",
    "status": "review",
    "created": "2026-11-06T05:30:00Z",
    "location": {
      "en": "Reading room tap (sample)",
      "mr": "वाचनालयाजवळचा नळ (नमुना)"
    },
    "details": {
      "en": "Sample issue: water is leaking from a tap near the reading room. This demo does not request an actual repair.",
      "mr": "नमुना समस्या: वाचनालयाजवळच्या नळातून पाणी गळत आहे. हा प्रत्यक्ष दुरुस्तीचा अर्ज नाही."
    },
    "register": {
      "en": "",
      "mr": ""
    },
    "events": [
      {
        "status": "submitted",
        "at": "2026-11-06T05:30:00Z",
        "actor": "citizen",
        "note": {
          "en": "Sample water issue recorded with a fictional landmark.",
          "mr": "काल्पनिक ठिकाणासह पाण्याच्या नमुना समस्येची नोंद केली."
        }
      },
      {
        "status": "review",
        "at": "2026-11-06T09:00:00Z",
        "actor": "office",
        "note": {
          "en": "The demo office is reviewing the location and issue. No actual inspection or repair is confirmed.",
          "mr": "डेमो कार्यालय ठिकाण व समस्या पाहत आहे. प्रत्यक्ष पाहणी किंवा दुरुस्ती झालेली नाही."
        }
      }
    ]
  },
  {
    "key": "assisted-bpl",
    "suffix": "006",
    "service": "bpl",
    "channel": "assisted",
    "status": "submitted",
    "created": "2026-11-06T10:00:00Z",
    "location": {
      "en": "Ward 2 (sample)",
      "mr": "प्रभाग २ (नमुना)"
    },
    "details": {
      "en": "Sample request to check the applicable BPL record before any decision. No eligibility or benefit has been approved.",
      "mr": "निर्णय घेण्यापूर्वी लागू दारिद्र्यरेषेची नोंद तपासण्यासाठी नमुना अर्ज. पात्रता किंवा लाभ मंजूर केलेला नाही."
    },
    "register": {
      "en": "",
      "mr": ""
    },
    "events": [
      {
        "status": "submitted",
        "at": "2026-11-06T10:00:00Z",
        "actor": "citizen",
        "note": {
          "en": "Office-assisted sample request recorded. The applicable record and eligibility remain unverified.",
          "mr": "कार्यालयाच्या मदतीने नमुना अर्ज नोंदवला. लागू नोंद व पात्रतेची पडताळणी बाकी आहे."
        }
      }
    ]
  }
];

/* Fictional administrative records; never copied into another GP. */
window.GP_DEMO_MODULES = {
  "meetings": [
    {
      "id": "MT01",
      "gpCode": "171415",
      "fictional": true,
      "title": {
        "en": "November Gram Sabha",
        "mr": "नोव्हेंबर ग्रामसभा"
      },
      "type": {
        "en": "Meeting notice",
        "mr": "सभा सूचना"
      },
      "status": "planned",
      "summary": {
        "en": "Agenda preparation and resident suggestions.",
        "mr": "अजेंडा तयारी आणि नागरिकांच्या सूचना."
      },
      "fields": [
        {
          "label": {
            "en": "Date & venue",
            "mr": "दिनांक व ठिकाण"
          },
          "value": {
            "en": "15 Nov 2026 · 11 am · GP office",
            "mr": "१५ नोव्हेंबर २०२६ · सकाळी ११ · ग्रामपंचायत कार्यालय"
          }
        },
        {
          "label": {
            "en": "Agenda",
            "mr": "विषय"
          },
          "value": {
            "en": "Water, sanitation, housing lists and works",
            "mr": "पाणी, स्वच्छता, घरकुल याद्या आणि विकासकामे"
          }
        },
        {
          "label": {
            "en": "Next action",
            "mr": "पुढील कृती"
          },
          "value": {
            "en": "Circulate notice and collect suggestions",
            "mr": "सूचना प्रसिद्ध करणे आणि विषयसूचना घेणे"
          }
        }
      ]
    },
    {
      "id": "MT02",
      "gpCode": "171415",
      "fictional": true,
      "title": {
        "en": "October meeting minutes",
        "mr": "ऑक्टोबर सभेचे इतिवृत्त"
      },
      "type": {
        "en": "Minutes",
        "mr": "इतिवृत्त"
      },
      "status": "complete",
      "summary": {
        "en": "Recorded discussion and action points.",
        "mr": "चर्चा आणि कृतींची नोंद."
      },
      "fields": [
        {
          "label": {
            "en": "Meeting date",
            "mr": "सभेचा दिनांक"
          },
          "value": {
            "en": "20 Oct 2026",
            "mr": "२० ऑक्टोबर २०२६"
          }
        },
        {
          "label": {
            "en": "Discussion",
            "mr": "चर्चा"
          },
          "value": {
            "en": "Water repairs and streetlight maintenance",
            "mr": "पाणी दुरुस्ती आणि पथदिवे देखभाल"
          }
        },
        {
          "label": {
            "en": "Record",
            "mr": "नोंद"
          },
          "value": {
            "en": "Attendance and minutes kept in the meeting file",
            "mr": "हजेरी आणि इतिवृत्त सभेच्या फाईलमध्ये"
          }
        }
      ]
    },
    {
      "id": "RS01",
      "gpCode": "171415",
      "fictional": true,
      "title": {
        "en": "Water-repair resolution",
        "mr": "पाणी दुरुस्ती ठराव"
      },
      "type": {
        "en": "Resolution",
        "mr": "ठराव"
      },
      "status": "active",
      "summary": {
        "en": "Follow-up on the drinking-water pipeline repair proposal.",
        "mr": "पिण्याच्या पाण्याच्या वाहिनी दुरुस्ती प्रस्तावाचा पाठपुरावा."
      },
      "fields": [
        {
          "label": {
            "en": "Resolution reference",
            "mr": "ठराव संदर्भ"
          },
          "value": {
            "en": "DEMO-RS-01",
            "mr": "DEMO-RS-01"
          }
        },
        {
          "label": {
            "en": "Next action",
            "mr": "पुढील कृती"
          },
          "value": {
            "en": "Obtain an estimate and place it before the office",
            "mr": "अंदाजपत्रक मिळवून कार्यालयासमोर सादर करणे"
          }
        }
      ]
    }
  ],
  "works": [
    {
      "id": "WK01",
      "gpCode": "171415",
      "fictional": true,
      "title": {
        "en": "Pipeline repairs",
        "mr": "पाणीवाहिनी दुरुस्ती"
      },
      "type": {
        "en": "Water supply",
        "mr": "पाणीपुरवठा"
      },
      "status": "active",
      "summary": {
        "en": "Pipeline repair and pressure testing.",
        "mr": "पाणीवाहिनी दुरुस्ती आणि दाब चाचणी."
      },
      "fields": [
        {
          "label": {
            "en": "Progress",
            "mr": "प्रगती"
          },
          "value": {
            "en": "45%",
            "mr": "४५%"
          }
        },
        {
          "label": {
            "en": "Stage",
            "mr": "टप्पा"
          },
          "value": {
            "en": "Repair in progress; testing next",
            "mr": "दुरुस्ती सुरू; त्यानंतर चाचणी"
          }
        },
        {
          "label": {
            "en": "Target",
            "mr": "उद्दिष्ट"
          },
          "value": {
            "en": "18 Nov 2026",
            "mr": "१८ नोव्हेंबर २०२६"
          }
        }
      ]
    },
    {
      "id": "WK02",
      "gpCode": "171415",
      "fictional": true,
      "title": {
        "en": "Streetlight repairs",
        "mr": "पथदिवे दुरुस्ती"
      },
      "type": {
        "en": "Public lighting",
        "mr": "सार्वजनिक प्रकाश"
      },
      "status": "complete",
      "summary": {
        "en": "Faulty lamps replaced and checked.",
        "mr": "बिघडलेले दिवे बदलून तपासले."
      },
      "fields": [
        {
          "label": {
            "en": "Progress",
            "mr": "प्रगती"
          },
          "value": {
            "en": "100%",
            "mr": "१००%"
          }
        },
        {
          "label": {
            "en": "Completion record",
            "mr": "पूर्णत्व नोंद"
          },
          "value": {
            "en": "Inspection note attached to works file",
            "mr": "पाहणी नोंद कामाच्या फाईलला जोडली"
          }
        }
      ]
    },
    {
      "id": "WK03",
      "gpCode": "171415",
      "fictional": true,
      "title": {
        "en": "Drain cleaning",
        "mr": "नाली स्वच्छता"
      },
      "type": {
        "en": "Sanitation",
        "mr": "स्वच्छता"
      },
      "status": "planned",
      "summary": {
        "en": "Prepare a cleaning schedule and work estimate.",
        "mr": "स्वच्छतेचे वेळापत्रक व अंदाजपत्रक तयार करणे."
      },
      "fields": [
        {
          "label": {
            "en": "Progress",
            "mr": "प्रगती"
          },
          "value": {
            "en": "0%",
            "mr": "०%"
          }
        },
        {
          "label": {
            "en": "Next action",
            "mr": "पुढील कृती"
          },
          "value": {
            "en": "Confirm locations and estimate",
            "mr": "ठिकाणे व अंदाजपत्रक निश्चित करणे"
          }
        }
      ]
    }
  ],
  "finance": [
    {
      "id": "TX01",
      "gpCode": "171415",
      "fictional": true,
      "title": {
        "en": "Property-tax demand",
        "mr": "मालमत्ता कर मागणी"
      },
      "type": {
        "en": "Tax demand",
        "mr": "कर मागणी"
      },
      "status": "active",
      "summary": {
        "en": "Demand, collections and outstanding amount for a fictional property.",
        "mr": "काल्पनिक मिळकतीची मागणी, वसुली आणि बाकी."
      },
      "fields": [
        {
          "label": {
            "en": "Property",
            "mr": "मिळकत"
          },
          "value": {
            "en": "SAMPLE-H-08",
            "mr": "SAMPLE-H-08"
          }
        },
        {
          "label": {
            "en": "Financial year",
            "mr": "आर्थिक वर्ष"
          },
          "value": {
            "en": "2026–27",
            "mr": "२०२६–२७"
          }
        },
        {
          "label": {
            "en": "Demand / collected / balance",
            "mr": "मागणी / वसुली / बाकी"
          },
          "value": {
            "en": "₹4,500 / ₹3,000 / ₹1,500",
            "mr": "₹४,५०० / ₹३,००० / ₹१,५००"
          }
        }
      ]
    },
    {
      "id": "RC01",
      "gpCode": "171415",
      "fictional": true,
      "title": {
        "en": "Collection record",
        "mr": "वसुली नोंद"
      },
      "type": {
        "en": "Receipt register",
        "mr": "पावती नोंदवही"
      },
      "status": "complete",
      "summary": {
        "en": "A fictional collection entry linked to the sample demand.",
        "mr": "नमुना मागणीशी जोडलेली काल्पनिक वसुली नोंद."
      },
      "fields": [
        {
          "label": {
            "en": "Reference",
            "mr": "संदर्भ"
          },
          "value": {
            "en": "DEMO-COL-01",
            "mr": "DEMO-COL-01"
          }
        },
        {
          "label": {
            "en": "Amount",
            "mr": "रक्कम"
          },
          "value": {
            "en": "₹3,000",
            "mr": "₹३,०००"
          }
        },
        {
          "label": {
            "en": "Record type",
            "mr": "नोंदीचा प्रकार"
          },
          "value": {
            "en": "Collection ledger summary; not a prescribed Form 10 receipt",
            "mr": "वसुली नोंद सारांश; निर्धारित नमुना १० पावती नाही"
          }
        }
      ]
    },
    {
      "id": "BG01",
      "gpCode": "171415",
      "fictional": true,
      "title": {
        "en": "Maintenance budget",
        "mr": "देखभाल अंदाजपत्रक"
      },
      "type": {
        "en": "Budget",
        "mr": "अंदाजपत्रक"
      },
      "status": "planned",
      "summary": {
        "en": "Illustrative provision for local maintenance.",
        "mr": "स्थानिक देखभालीसाठी उदाहरणार्थ तरतूद."
      },
      "fields": [
        {
          "label": {
            "en": "Proposed provision",
            "mr": "प्रस्तावित तरतूद"
          },
          "value": {
            "en": "₹25,000",
            "mr": "₹२५,०००"
          }
        },
        {
          "label": {
            "en": "Purpose",
            "mr": "प्रयोजन"
          },
          "value": {
            "en": "Water and public-light maintenance",
            "mr": "पाणी व सार्वजनिक दिव्यांची देखभाल"
          }
        }
      ]
    }
  ]
};
