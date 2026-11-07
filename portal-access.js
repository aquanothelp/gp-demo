/* Fictional pre-go-live fixtures and local preview access. No production authorization. */
'use strict';
(() => {
  const KEY = 'gp-portal-it-demo:v1';
  const ITERATIONS = 600000;
  // These public demonstration phrases are synthetic fixtures, never real credentials.
  const samplePhrase = code => `Village ${code} demonstration access only`;
  const IT_PHRASE = 'Portal operations demonstration only';
  const SERVICE_IDS = Object.freeze(['birth', 'assessment', 'marriage', 'nodues', 'water', 'grievance', 'death', 'bpl', 'niradhar']);
  const registry = new Map((window.GP_DEMO_REGISTRY?.gps || []).map(gp => [String(gp.code), gp]));
  const preferences = new Map();
  const verifiers = new Map();
  let memoryRecords = [];
  let storageAvailable = true;
  const clean = value => String(value ?? '').trim();
  const usernameFor = code => `gp${code}.demo`;
  const seeds = ['171415', '171410', '171411'].filter(code => registry.has(code)).map(code => ({
    gpCode: code, status: 'ready', officeName: `${registry.get(code).en} GP office (demo)`,
    services: code === '171411' ? ['water', 'grievance', 'assessment'] : [...SERVICE_IDS],
    username: usernameFor(code), fixture: true
  }));
  function validRecord(item) {
    return item && registry.has(String(item.gpCode)) && ['draft', 'ready'].includes(item.status)
      && typeof item.officeName === 'string' && item.officeName.length >= 2 && item.officeName.length <= 120
      && Array.isArray(item.services) && item.services.length > 0 && item.services.every(id => SERVICE_IDS.includes(id));
  }
  function records() {
    let saved = memoryRecords;
    if (storageAvailable) {
      try {
        const raw = localStorage.getItem(KEY);
        if (raw) { const parsed = JSON.parse(raw); if (Array.isArray(parsed?.gps)) saved = parsed.gps; }
        memoryRecords = saved.filter(validRecord);
      } catch (_) { storageAvailable = false; }
    }
    const result = new Map(seeds.map(item => [item.gpCode, item]));
    for (const item of saved.filter(validRecord)) {
      // Built-in ready fixtures cannot be silently overwritten by a staged duplicate.
      if (seeds.some(seed => seed.gpCode === String(item.gpCode))) continue;
      result.set(String(item.gpCode), {
        gpCode: String(item.gpCode), status: item.status, officeName: item.officeName,
        services: [...new Set(item.services)], username: usernameFor(String(item.gpCode)),
        fixture: true, reviewedAt: clean(item.reviewedAt)
      });
    }
    return result;
  }
  function save(items) {
    memoryRecords = items.filter(validRecord).map(item => ({ ...item, services: [...item.services] }));
    try { localStorage.setItem(KEY, JSON.stringify({ version: 1, gps: memoryRecords })); }
    catch (_) { storageAvailable = false; }
  }
  function getGP(code) {
    const item = records().get(String(code));
    return item?.status === 'ready' ? Object.freeze({ ...item, services: Object.freeze([...item.services]) }) : null;
  }
  function getDemoAccess(code) {
    const item = getGP(code);
    return item ? Object.freeze({ username: item.username, password: samplePhrase(item.gpCode) }) : null;
  }
  async function derive(phrase, salt) {
    if (!crypto.subtle || !crypto.getRandomValues) throw new Error('Use a current browser or local HTTP launch.');
    const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(phrase.normalize('NFC')), 'PBKDF2', false, ['deriveBits']);
    return new Uint8Array(await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations: ITERATIONS }, key, 256));
  }
  async function matches(key, supplied, expected) {
    if (!verifiers.has(key)) {
      const salt = crypto.getRandomValues(new Uint8Array(32));
      const promise = derive(expected, salt).then(verifier => ({ salt, verifier }));
      verifiers.set(key, promise);
    }
    const stored = await verifiers.get(key);
    const candidate = await derive(supplied, stored.salt);
    let difference = candidate.length ^ stored.verifier.length;
    for (let i = 0; i < stored.verifier.length; i++) difference |= (candidate[i] || 0) ^ stored.verifier[i];
    candidate.fill(0);
    return difference === 0;
  }
  async function authenticate({ gpCode, username, password, language } = {}) {
    const gp = getGP(gpCode);
    if (!gp) return { ok: false, reason: 'not-ready' };
    if (typeof password !== 'string' || password.length > 256 || clean(username).length > 64) return { ok: false, reason: 'credentials' };
    const correctPhrase = await matches(`gp:${gp.gpCode}`, password, samplePhrase(gp.gpCode));
    if (clean(username).toLowerCase() !== gp.username.toLowerCase() || !correctPhrase) return { ok: false, reason: 'credentials' };
    const lang = preferences.get(gp.gpCode) || (language === 'en' ? 'en' : 'mr');
    return { ok: true, account: { gp: { ...registry.get(gp.gpCode) }, username: gp.username, officeName: gp.officeName, services: [...gp.services], lang } };
  }
  function setLanguage(code, username, lang) {
    const gp = getGP(code);
    if (gp && clean(username).toLowerCase() === gp.username.toLowerCase() && ['en', 'mr'].includes(lang)) preferences.set(gp.gpCode, lang);
  }
  async function openITSession({ username, password } = {}) {
    if (typeof password !== 'string' || password.length > 256) return null;
    const validPhrase = await matches('portal-it', password, IT_PHRASE);
    if (clean(username).toLowerCase() !== 'portal.it.demo' || !validPhrase) return null;
    let active = true;
    const requireIT = () => { if (!active) throw new Error('Sign in to the IT preview again.'); };
    const stage = data => {
      requireIT();
      const code = clean(data?.gpCode);
      if (!registry.has(code)) throw new Error('Select an official GP identity.');
      if (getGP(code)) throw new Error('This Gram Panchayat is already ready. Existing setup was preserved.');
      const item = { gpCode: code, status: 'draft', officeName: clean(data.officeName), services: [...new Set(data.services || [])], username: usernameFor(code), fixture: true };
      if (!validRecord(item)) throw new Error('Add an office name and at least one supported service.');
      const items = [...records().values()].filter(record => record.gpCode !== code);
      save([...items, item]);
      return { ...item, services: [...item.services] };
    };
    return Object.freeze({
      stage,
      activate(code, checklist) {
        requireIT();
        const required = ['identity', 'office', 'services', 'access'];
        if (!required.every(id => checklist?.[id] === true)) throw new Error('Complete every pre-go-live review acknowledgement.');
        const item = records().get(String(code));
        if (!item || item.status !== 'draft') throw new Error('Stage and review this GP before activating the preview.');
        const ready = { ...item, status: 'ready', reviewedAt: new Date().toISOString() };
        save([...records().values()].map(record => record.gpCode === item.gpCode ? ready : record));
        return getGP(code);
      },
      list() { requireIT(); return [...records().values()].map(item => ({ ...item, services: [...item.services] })); },
      signOut() { active = false; }
    });
  }
  const api = {
    getGP, getDemoAccess, authenticate, setLanguage,
    listGPs: () => [...records().values()].filter(item => item.status === 'ready').map(item => getGP(item.gpCode)),
    serviceIds: SERVICE_IDS,
    get storageAvailable() { return storageAvailable; }
  };
  // Ordinary GP pages publish no IT session/provisioning entry point. This is
  // prototype separation; a hosted system must enforce the boundary on its server.
  if (document.documentElement.dataset.portalContext === 'it') {
    Object.assign(api, { openITSession, getITDemoAccess: () => Object.freeze({ username: 'portal.it.demo', password: IT_PHRASE }) });
  }
  window.GPPortalAccess = Object.freeze(api);
})();
