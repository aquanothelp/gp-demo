/* Separate pre-go-live IT preview. Intentionally loads no case/workflow/approval code. */
'use strict';
(() => {
  const access = window.GPPortalAccess;
  const root = document.getElementById('itMain');
  const registry = window.GP_DEMO_REGISTRY || {};
  const districts = registry.districts || [];
  const gps = new Map((registry.gps || []).map(item => [String(item.code), item]));
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const labels = { birth: 'Birth certificate copy', death: 'Death certificate copy', marriage: 'Marriage certificate copy', assessment: 'Property assessment extract', nodues: 'No-dues certificate', water: 'Water service', grievance: 'Village issues', bpl: 'BPL request', niradhar: 'Niradhar age request' };
  let session = null;
  let stage = 'setup';
  let draft = { district: '470', gpCode: '', search: '', officeName: '', services: [...access.serviceIds] };
  let attempts = 0;
  let lockedUntil = 0;
  let busy = false;
  const signOut = document.getElementById('itSignOut');
  const heading = (title, copy) => `<div class="it-heading"><span class="it-kicker">Pre-go-live · Portal IT</span><h1>${title}</h1><p>${copy}</p></div>`;
  function error(message) { const target = document.getElementById('itError'); target.textContent = message; target.hidden = false; }
  function gate() {
    signOut.hidden = true;
    root.innerHTML = `<section class="it-card it-login" aria-labelledby="itTitle"><span class="it-kicker">Portal operations</span><h1 id="itTitle">IT sign in</h1><p class="it-hint">Prepare Gram Panchayats before citizen and office access begins.</p><form id="itLoginForm"><div class="it-field"><label for="itUsername">IT username</label><input id="itUsername" autocomplete="username" maxlength="64" required></div><div class="it-field"><label for="itPassword">Password</label><input id="itPassword" type="password" autocomplete="current-password" maxlength="128" required></div><button type="submit" id="itSignIn" class="button primary">Sign in to IT preview</button><p id="itError" class="it-error" role="alert" hidden></p></form><details class="it-help"><summary>Fictional IT demonstration access</summary><p class="it-hint">Use the preconfigured sample IT account. No GP account or real IT authority is inherited here.</p><button type="button" id="itUseDemo" class="button secondary">Use sample IT details</button></details></section>`;
  }
  function options() {
    const target = document.getElementById('itGp');
    const q = draft.search.normalize('NFKC').toLowerCase();
    const matches = [...gps.values()].filter(item => String(item.districtCode) === draft.district && `${item.en} ${item.mr} ${item.code}`.normalize('NFKC').toLowerCase().includes(q));
    target.innerHTML = `<option value="">Select Gram Panchayat</option>${matches.slice(0, 100).map(item => `<option value="${esc(item.code)}" ${String(item.code) === draft.gpCode ? 'selected' : ''}>${esc(item.en)} · ${esc(item.code)}</option>`).join('')}`;
    document.getElementById('itGpMatches').textContent = `${matches.length} matches · showing up to 100; refine the name or code.`;
  }
  function list() {
    return `<section class="it-records"><h2>Setup register</h2><div class="table-wrap"><table><thead><tr><th>Gram Panchayat</th><th>GP code</th><th>Status</th><th>Services</th></tr></thead><tbody>${session.list().map(item => `<tr><td>${esc(gps.get(item.gpCode)?.en || '')}</td><td>${esc(item.gpCode)}</td><td>${item.status === 'ready' ? 'Ready for preview' : 'Draft · login disabled'}</td><td>${item.services.length}</td></tr>`).join('')}</tbody></table></div></section>`;
  }
  function steps() { return `<ol class="it-steps">${[['setup', '1 · GP & services'], ['review', '2 · Pre-go-live review'], ['done', '3 · Ready']].map(([id, text]) => `<li ${stage === id ? 'aria-current="step"' : ''}>${text}</li>`).join('')}</ol>`; }
  function render() {
    if (!session) { gate(); return; }
    signOut.hidden = false;
    if (stage === 'setup') {
      root.innerHTML = heading('Prepare a Gram Panchayat', 'Set up its identity and services, then complete the pre-go-live review. Public users cannot enroll a GP.') + steps() + `<section id="itConsole" class="it-card"><form id="itSetupForm"><h2>GP identity</h2><div class="it-grid"><div class="it-field"><label for="itState">State</label><input id="itState" value="Maharashtra · 27" readonly></div><div class="it-field"><label for="itDistrict">District</label><select id="itDistrict">${districts.map(item => `<option value="${esc(item.code)}" ${String(item.code) === draft.district ? 'selected' : ''}>${esc(item.en)}</option>`).join('')}</select></div><div class="it-field"><label for="itSearch">GP name or official code</label><input id="itSearch" type="search" value="${esc(draft.search)}" autocomplete="off"></div><div class="it-field"><label for="itGp">Gram Panchayat</label><select id="itGp" required></select><p id="itGpMatches" class="it-hint" aria-live="polite"></p></div></div><div class="it-field"><label for="itOfficeName">Office name · sample</label><input id="itOfficeName" value="${esc(draft.officeName)}" minlength="2" maxlength="120" required></div><h2>Citizen service configuration</h2><div class="it-service-list">${access.serviceIds.map(id => `<label class="it-check"><input type="checkbox" name="itService" value="${id}" ${draft.services.includes(id) ? 'checked' : ''}><span>${labels[id]}</span></label>`).join('')}</div><p class="it-hint">Service examples do not establish statutory availability, appointments, fees or signing powers. Real user provisioning remains a production integration.</p><p id="itError" class="it-error" role="alert" hidden></p><div class="it-actions"><button type="submit" id="itReview" class="button primary">Review setup</button></div></form></section>${list()}`;
      options();
    } else if (stage === 'review') {
      root.innerHTML = heading('Review before go-live', 'This is a sample readiness review. A checkbox is not independent proof of official authority.') + steps() + `<section id="itConsole" class="it-card"><dl class="it-summary"><div><dt>Gram Panchayat</dt><dd>${esc(gps.get(draft.gpCode)?.en)} · ${esc(draft.gpCode)}</dd></div><div><dt>Office</dt><dd>${esc(draft.officeName)}</dd></div><div><dt>Configured services</dt><dd>${draft.services.map(id => labels[id]).join(', ')}</dd></div><div><dt>Access</dt><dd>Fictional account preview only</dd></div></dl><form id="itReviewForm"><div class="it-review-list">${[['identity', 'I reviewed the sample GP identity and code.'], ['office', 'I reviewed the sample office details.'], ['services', 'I reviewed the selected service examples and routing limits.'], ['access', 'I understand that real user provisioning, MFA and official authority are not implemented.']].map(([id, text]) => `<label class="it-check"><input type="checkbox" data-it-review="${id}" required><span>${text}</span></label>`).join('')}</div><p id="itError" class="it-error" role="alert" hidden></p><div class="it-actions"><button id="itActivate" type="submit" class="button primary">Activate GP preview</button><button id="itBack" type="button" class="button secondary">Back</button></div></form></section>`;
    } else {
      const ready = access.getGP(draft.gpCode);
      root.innerHTML = heading('GP preview is ready', 'The nonsecret setup record is now ready. Citizen requests and approvals remain outside this IT console.') + steps() + `<section id="itConsole" class="it-card"><span id="itStatus" class="it-ready">Ready for preview</span><h2>${esc(gps.get(draft.gpCode)?.en)} · GP ${esc(draft.gpCode)}</h2><p>${esc(ready.officeName)}</p><p class="it-hint">${access.storageAvailable ? 'Setup metadata has been recorded in this browser.' : 'Browser storage is unavailable; setup remains in this page only.'}</p><div class="it-actions"><a class="button primary" href="index.html?gp=${encodeURIComponent(draft.gpCode)}" id="itPreviewGP">Preview GP website</a><button type="button" id="itAnother" class="button secondary">Prepare another GP</button></div><details class="it-help"><summary>Sample account for this preview</summary><p>Username: <strong>${esc(ready.username)}</strong></p><p class="it-hint">The GP Login page provides the explicitly fictional sample details. Real accounts must be provisioned through the production identity service.</p></details></section>${list()}`;
    }
    root.focus({ preventScroll: true }); window.scrollTo({ top: 0, behavior: 'instant' });
  }
  document.addEventListener('click', event => {
    const target = event.target.closest('button'); if (!target) return;
    if (target.id === 'itUseDemo') { const sample = access.getITDemoAccess(); document.getElementById('itUsername').value = sample.username; document.getElementById('itPassword').value = sample.password; }
    if (target.id === 'itSignOut') { session?.signOut(); session = null; busy = false; draft = { district: '470', gpCode: '', search: '', officeName: '', services: [...access.serviceIds] }; stage = 'setup'; render(); }
    if (target.id === 'itBack') { stage = 'setup'; render(); }
    if (target.id === 'itAnother') { draft = { district: '470', gpCode: '', search: '', officeName: '', services: [...access.serviceIds] }; stage = 'setup'; render(); }
  });
  document.addEventListener('change', event => {
    if (!session) return;
    if (event.target.id === 'itDistrict') { draft.district = event.target.value; draft.gpCode = ''; draft.search = ''; draft.officeName = ''; document.getElementById('itSearch').value = ''; document.getElementById('itOfficeName').value = ''; options(); }
    if (event.target.id === 'itGp') { draft.gpCode = event.target.value; draft.officeName = draft.gpCode ? `${gps.get(draft.gpCode).en} GP office (demo)` : ''; document.getElementById('itOfficeName').value = draft.officeName; }
  });
  document.addEventListener('input', event => { if (event.target.id === 'itSearch') { draft.search = event.target.value; options(); } });
  document.addEventListener('submit', async event => {
    if (!['itLoginForm', 'itSetupForm', 'itReviewForm'].includes(event.target.id)) return;
    event.preventDefault();
    if (event.target.id === 'itLoginForm') {
      if (busy) return;
      if (performance.now() < lockedUntil) { error('Wait 30 seconds before trying again.'); return; }
      busy = true; const button = document.getElementById('itSignIn'); button.disabled = true;
      const username = document.getElementById('itUsername').value;
      let password = document.getElementById('itPassword').value;
      document.getElementById('itPassword').value = '';
      try {
        const pending = access.openITSession({ username, password }); password = '';
        session = await pending;
        if (session) { attempts = 0; stage = 'setup'; render(); }
        else { attempts++; if (attempts >= 5) lockedUntil = performance.now() + 30000; error('The IT username or password is incorrect.'); }
      } catch (_) { error('The local IT preview could not sign in. Use a current browser.'); }
      finally { password = ''; busy = false; if (button.isConnected) button.disabled = false; }
      return;
    }
    if (!session) return;
    try {
      if (event.target.id === 'itSetupForm') {
        draft.gpCode = document.getElementById('itGp').value;
        draft.officeName = document.getElementById('itOfficeName').value.trim();
        draft.services = [...document.querySelectorAll('[name="itService"]:checked')].map(input => input.value);
        if (String(gps.get(draft.gpCode)?.districtCode) !== draft.district) throw new Error('Select a GP that matches this district.');
        session.stage(draft); stage = 'review'; render();
      } else {
        const checklist = Object.fromEntries([...document.querySelectorAll('[data-it-review]')].map(input => [input.dataset.itReview, input.checked]));
        session.activate(draft.gpCode, checklist); stage = 'done'; render();
      }
    } catch (failure) { error(failure.message); }
  });
  render();
})();
