/*
 * Local demonstration workflow. No DOM, persistence, signing, network or clock.
 * Status words are product choices; they are not prescribed statutory labels.
 * Missing-information notes never pause/reset an RTS clock. A live clock needs
 * the complete-application evidence, dated service rules and working calendar.
 */
(function (global) {
  'use strict';

  const statuses = Object.freeze([
    'submitted', 'review', 'action', 'ready', 'completed',
    'rejected', 'resolved', 'referred'
  ]);
  const deliveryModes = Object.freeze(['counter', 'post', 'download']);
  const decisionAuthority = 'Designated service officer (demo)';

  function text(value) {
    return typeof value === 'string' ? value.trim() : '';
  }

  function hasText(value, minimum) {
    return Array.from(text(value)).length >= minimum;
  }

  // Case records and transition inputs are JSON-friendly plain data.
  function copy(value) {
    if (Array.isArray(value)) return value.map(copy);
    if (value && typeof value === 'object') {
      return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, copy(item)]));
    }
    return value;
  }

  function kindFor(service) {
    return service === 'water' || service === 'grievance' ? 'local' : 'certificate';
  }

  function canPrepareOutput(request) {
    return Boolean(request && kindFor(request.service) === 'certificate' &&
      request.service !== 'niradhar' && request.status === 'review' &&
      request.formatAvailable !== false);
  }

  function canPrintCertificate(request) {
    return Boolean(request && kindFor(request.service) === 'certificate' &&
      request.service !== 'niradhar' && request.formatAvailable !== false &&
      ['ready', 'completed'].includes(request.status) &&
      request.decision?.outcome === 'approved' && request.output?.prepared === true);
  }

  function allowedTransitions(request) {
    if (!request || !statuses.includes(request.status)) return [];
    const kind = kindFor(request.service);
    if (request.status === 'submitted') return ['review'];
    if (request.status === 'review') {
      if (kind === 'local') return ['action', 'resolved', 'referred'];
      return canPrepareOutput(request)
        ? ['action', 'ready', 'rejected', 'referred']
        : ['action', 'rejected', 'referred'];
    }
    if (request.status === 'action') return ['review'];
    if (request.status === 'ready' && kind === 'certificate') return ['completed'];
    if (request.status === 'resolved' && kind === 'local') return ['completed', 'review'];
    return [];
  }

  function validateTransition(request, next, data = {}) {
    if (!request || !hasText(request.id, 1) || !hasText(request.service, 1)) {
      return 'A request reference and service are required.';
    }
    if (!allowedTransitions(request).includes(next)) {
      return 'This update is not available from the current request status.';
    }
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      return 'The update details are required.';
    }

    const isResponse = next === 'review' && ['action', 'resolved'].includes(request.status);
    if (isResponse) {
      return hasText(data.responseNote, 5)
        ? '' : 'Please record a useful response or explain why the issue is still unresolved.';
    }
    if (!hasText(data.note, 5)) return 'Please add a useful note of at least five characters.';

    if (next === 'ready') {
      if (!canPrepareOutput(request) || data.formatAvailable !== true) {
        return 'A supported source-based demo output format is required. No verified Niradhar age format is configured.';
      }
      if (data.recordChecked !== true) return 'Confirm that the sample record was checked.';
      if (!hasText(data.verificationReference, 3)) {
        return 'Please record the sample verification reference.';
      }
    }
    if (next === 'rejected') {
      if (!hasText(data.note, 10)) return 'Please give a reasoned decision of at least ten characters.';
      if (!data.appeal || !hasText(data.appeal.authority, 1) ||
          !hasText(data.appeal.contact, 1) || !hasText(data.appeal.period, 1)) {
        return 'Include the appeal authority, contact information and filing-period guidance.';
      }
    }
    if (next === 'referred' && !hasText(data.referredTo, 3)) {
      return 'Please identify the office or agency receiving the referral.';
    }
    if (request.status === 'ready' && next === 'completed') {
      if (!canPrintCertificate(request)) {
        return 'An approved decision and prepared demo output are required before recording delivery.';
      }
      if (!data.delivery || !deliveryModes.includes(data.delivery.mode) ||
          !hasText(data.delivery.recipient, 2) || !hasText(data.delivery.reference, 3)) {
        return 'Record the delivery method, sample recipient and delivery reference.';
      }
    }
    if (request.status === 'resolved' && next === 'completed') {
      if (!data.confirmation || !['citizen', 'office'].includes(data.confirmation.by) ||
          !hasText(data.confirmation.note, 5)) {
        return 'Record who confirmed the resolution and a useful confirmation note.';
      }
    }
    return '';
  }

  function transition(request, next, data = {}, context = {}) {
    const error = validateTransition(request, next, data);
    if (error) return { ok: false, record: null, error };
    if (!hasText(context.actor, 1) || !hasText(context.at, 1)) {
      return { ok: false, record: null, error: 'An actor and an actual event timestamp are required.' };
    }

    const record = copy(request);
    record.events = Array.isArray(record.events) ? record.events : [];
    const actor = text(context.actor);
    const at = text(context.at);
    const note = text(data.note);
    function append(status, action, eventNote) {
      // Keep the new event immutable; a later transition copies the history.
      record.events.push(Object.freeze({ status, action, at, actor, note: eventNote }));
    }

    if (next === 'ready') {
      record.verification = {
        recordChecked: true, reference: text(data.verificationReference), at, actor
      };
      record.decision = {
        outcome: 'approved', reason: note, authority: decisionAuthority, at,
        verificationReference: text(data.verificationReference)
      };
      // Approval and output preparation are separate events, even in one lean UI action.
      append('review', 'approved', note);
      record.output = {
        prepared: true, reference: 'DEMO-OUTPUT-' + record.id, at,
        formatId: text(data.formatId)
      };
      record.formatAvailable = true;
      append('ready', 'output-prepared', note);
    } else if (next === 'rejected') {
      record.decision = {
        outcome: 'rejected', reason: note, authority: decisionAuthority, at,
        appeal: {
          authority: text(data.appeal.authority), contact: text(data.appeal.contact),
          period: text(data.appeal.period)
        }
      };
      append('rejected', 'rejected', note);
    } else if (next === 'referred') {
      record.referral = { to: text(data.referredTo), reason: note, at, actor };
      append('referred', 'referred', note);
    } else if (request.status === 'ready' && next === 'completed') {
      record.delivery = {
        mode: data.delivery.mode, recipient: text(data.delivery.recipient),
        reference: text(data.delivery.reference), note, at, actor
      };
      append('completed', 'delivered', note);
    } else if (request.status === 'resolved' && next === 'completed') {
      record.confirmation = {
        by: data.confirmation.by, note: text(data.confirmation.note), at, actor
      };
      append('completed', 'resolution-confirmed', text(data.confirmation.note));
    } else if (next === 'review' && request.status === 'action') {
      append('review', 'response-received', text(data.responseNote));
    } else if (next === 'review' && request.status === 'resolved') {
      append('review', 'issue-unresolved', text(data.responseNote));
    } else if (next === 'resolved') {
      record.resolution = { note, at, actor };
      append('resolved', 'resolved', note);
    } else {
      append(next, next === 'action' ? 'information-requested' : 'review-started', note);
    }
    record.status = next;
    return { ok: true, record, error: '' };
  }

  global.GPWorkflow = Object.freeze({
    statuses, kindFor, allowedTransitions, validateTransition, transition,
    canPrepareOutput, canPrintCertificate
  });
}(typeof window !== 'undefined' ? window : globalThis));
