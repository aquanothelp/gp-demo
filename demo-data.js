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
