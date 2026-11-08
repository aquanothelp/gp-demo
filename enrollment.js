/* GP-specific demo login. Provisioning belongs to the separate portal-IT console. */
'use strict';
(() => {
  const instances = new WeakMap();
  const MAX_ATTEMPTS = 5;
  const COOLDOWN_MS = 30000;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const key = value => String(value ?? '').normalize('NFKC').toLocaleLowerCase('mr');
  const length = value => Array.from(String(value)).length;
  function init(options = {}) {
    const host = typeof options.root === 'string' ? document.querySelector(options.root) : options.root;
    if (!(host instanceof HTMLElement)) throw new Error('GPEnrollment needs the persistent Login host.');
    if (instances.has(host)) return instances.get(host);
    const registry = options.registry || window.GP_DEMO_REGISTRY || {};
    const states = registry.states || [], districts = registry.districts || [], gps = registry.gps || [];
    const stateMap = new Map(states.map(item => [String(item.code), item]));
    const districtMap = new Map(districts.map(item => [String(item.code), item]));
    const gpMap = new Map(gps.map(item => [String(item.code), item]));
    const defaultGP = String(registry.defaultSelection?.gpCode || '171415');
    const state = { lang: options.language === 'en' ? 'en' : 'mr', stateCode: '', districtCode: '', gpCode: '', search: '', username: '', activeUsername: '', activeGP: '', signedIn: false, busy: false, attempts: 0, lockedUntil: 0, error: '', notice: '' };
    const L = (en, mr) => state.lang === 'mr' ? mr : en;
    const name = item => String(window.GP_PUBLIC_SITE_DATA?.displayName(item, state.lang) || item?.[state.lang] || item?.en || '');
    const field = id => host.querySelector('#' + id);
    const districtState = item => String(item?.stateCode || states[0]?.code || '');
    const access = () => window.GPPortalAccess;
    const selectedGP = () => gpMap.get(state.gpCode);
    function clearPassword() {
      const input = field('loginPassword');
      if (input) { input.value = ''; input.type = 'password'; }
      const toggle = field('toggleLoginPassword');
      if (toggle) { toggle.textContent = L('Show', 'दाखवा'); toggle.setAttribute('aria-pressed', 'false'); }
    }
    function captureUsername() { if (field('loginUsername')) state.username = field('loginUsername').value.trim(); }
    function error(message, input) {
      state.error = message;
      const alert = field('enrollmentError');
      if (alert) { alert.textContent = message; alert.hidden = false; }
      if (input) { input.setAttribute('aria-invalid', 'true'); input.focus(); }
    }
    function setGP(code) {
      const gp = gpMap.get(String(code)) || gpMap.get(defaultGP);
      state.gpCode = gp ? String(gp.code) : '';
      state.districtCode = gp ? String(gp.districtCode) : '';
      state.stateCode = gp ? districtState(districtMap.get(state.districtCode)) : '';
      state.search = '';
    }
    function locationChanged() {
      clearPassword(); state.error = '';
      state.notice = '';
      options.onGPChange?.(selectedGP()?.code || null);
    }
    function matchingGPs() {
      const query = key(state.search);
      return gps.filter(item => String(item.districtCode) === state.districtCode && (!query || key(item.en + ' ' + item.mr + ' ' + (window.GP_PUBLIC_SITE_DATA?.displayName(item, 'mr') || '') + ' ' + item.code).includes(query)));
    }
    function gpOptions() {
      const matches = matchingGPs();
      const shown = matches.slice(0, 100);
      const selected = selectedGP();
      if (selected && String(selected.districtCode) === state.districtCode && matches.some(item => String(item.code) === state.gpCode) && !shown.some(item => String(item.code) === state.gpCode)) { if (shown.length === 100) shown.pop(); shown.unshift(selected); }
      return { matches, shown };
    }
    const option = (value, text, selected) => '<option value="' + esc(value) + '"' + (String(value) === selected ? ' selected' : '') + '>' + esc(text) + '</option>';
    function render(focus = true, prefillDemo = false) {
      const gp = selectedGP(), ready = gp && access()?.getGP?.(gp.code)?.status === 'ready';
      const { matches, shown } = gpOptions();
      const demo = prefillDemo && ready ? access()?.getDemoAccess?.(gp.code) : null;
      if (prefillDemo) state.username = demo?.username || '';
      const disabled = state.busy ? ' disabled' : '';
      host.hidden = false; host.lang = state.lang; host.dataset.language = state.lang; host.dataset.loginGp = state.gpCode;
      host.innerHTML =
        '<div class="gp-login-page"><div class="breadcrumb"><button type="button" class="text-button" data-return-public' + disabled + '>' + L('Home', 'मुख्यपृष्ठ') + '</button><span>/</span>' + L('Login', 'लॉगिन') + '</div>' +
        '<section class="gp-login-card" aria-labelledby="enrollmentTitle" aria-busy="' + state.busy + '" data-login-card><header class="gp-login-heading"><p class="public-kicker">' + L('YOUR GRAM PANCHAYAT', 'तुमची ग्रामपंचायत') + '</p><h1 id="enrollmentTitle">' + L('Login', 'लॉगिन') + '</h1><p>' + L('Choose your Panchayat and sign in to apply or view your requests.', 'अर्ज करण्यासाठी किंवा तुमचे अर्ज पाहण्यासाठी ग्रामपंचायत निवडा आणि लॉगिन करा.') + '</p></header>' +
        '<form id="loginForm" novalidate><fieldset class="gp-login-location"><legend>' + L('Select Gram Panchayat', 'ग्रामपंचायत निवडा') + '</legend><div class="field-grid"><div class="form-field"><label for="loginState">' + L('State', 'राज्य') + ' *</label><select id="loginState" name="state" required' + disabled + '><option value="">' + L('Choose a state', 'राज्य निवडा') + '</option>' + states.map(item => option(item.code, name(item), state.stateCode)).join('') + '</select></div><div class="form-field"><label for="loginDistrict">' + L('District', 'जिल्हा') + ' *</label><select id="loginDistrict" name="district" required' + (!state.stateCode || state.busy ? ' disabled' : '') + '><option value="">' + L('Choose a district', 'जिल्हा निवडा') + '</option>' + districts.filter(item => districtState(item) === state.stateCode).map(item => option(item.code, name(item), state.districtCode)).join('') + '</select></div></div>' +
        '<div class="form-field"><label for="loginGpSearch">' + L('Search GP name or LGD code', 'ग्रामपंचायतीचे नाव किंवा LGD क्रमांक शोधा') + '</label><input type="search" id="loginGpSearch" value="' + esc(state.search) + '" autocomplete="off" maxlength="100"' + (!state.districtCode || state.busy ? ' disabled' : '') + '></div>' +
        '<div class="form-field"><label for="loginGp">' + L('Gram Panchayat', 'ग्रामपंचायत') + ' *</label><select id="loginGp" name="gp" required aria-describedby="loginGpResults"' + (!state.districtCode || state.busy ? ' disabled' : '') + '><option value="">' + L('Choose a Gram Panchayat', 'ग्रामपंचायत निवडा') + '</option>' + shown.map(item => option(item.code, name(item) + ' · ' + item.code, state.gpCode)).join('') + '</select><p class="field-hint" id="loginGpResults">' + (state.districtCode ? esc(matches.length) + ' ' + (matches.length > 100 ? L('matching GPs. Search to narrow the first 100 results.', 'जुळणाऱ्या ग्रामपंचायती. पहिल्या १०० नोंदींत शोधाने यादी कमी करा.') : L('matching GPs.', 'जुळणाऱ्या ग्रामपंचायती.')) : L('This demo includes ' + gps.length + ' Gram Panchayats in Beed district.', 'या डेमोमध्ये बीड जिल्ह्यातील ' + gps.length + ' ग्रामपंचायती आहेत.')) + '</p></div></fieldset>' +
        '<div class="gp-login-summary" id="loginGpSummary" data-gp="' + esc(state.gpCode) + '"><svg class="icon" aria-hidden="true"><use href="#i-pin"/></svg><div><strong>' + esc(gp ? name(gp) : L('Select your Panchayat', 'तुमची ग्रामपंचायत निवडा')) + '</strong><span>' + (gp ? 'GP ' + esc(gp.code) + ' · ' + esc(name(districtMap.get(state.districtCode))) : L('Match the name and official code before signing in.', 'लॉगिनपूर्वी नाव व अधिकृत क्रमांक तपासा.')) + '</span></div></div>' +
        (gp && !ready ? '<p class="gp-login-notice" data-login-not-ready>' + L('Login is not enabled for this GP in the local demo. You can still browse its public information and services.', 'स्थानिक डेमोमध्ये या ग्रामपंचायतीसाठी लॉगिन सुरू नाही. तिची सार्वजनिक माहिती व सेवा पाहता येतील.') + '</p>' : '') +
        '<div class="gp-login-credentials"><div class="form-field"><label for="loginUsername">' + L('Username', 'वापरकर्तानाव') + ' *</label><input id="loginUsername" name="username" value="' + esc(state.username) + '" autocomplete="username" autocapitalize="none" spellcheck="false" aria-describedby="loginDemoNote" maxlength="64" required' + (!ready || state.busy ? ' disabled' : '') + '></div><div class="form-field"><label for="loginPassword">' + L('Password', 'पासवर्ड') + ' *</label><div class="gp-login-password"><input type="password" data-password-field id="loginPassword" name="password" autocomplete="current-password" aria-describedby="loginDemoNote" maxlength="256" required' + (!ready || state.busy ? ' disabled' : '') + '><button type="button" id="toggleLoginPassword" aria-controls="loginPassword" aria-pressed="false"' + (!ready || state.busy ? ' disabled' : '') + '>' + L('Show', 'दाखवा') + '</button></div></div></div>' +
        '<p class="gp-login-demo-note" id="loginDemoNote">' + L('For demo only.', 'फक्त डेमोसाठी.') + '</p>' +
        '<div id="enrollmentError" class="inline-error" role="alert"' + (!state.error ? ' hidden' : '') + '>' + esc(state.error) + '</div>' + (state.notice ? '<p class="field-hint gp-login-change-note" role="status">' + esc(state.notice) + '</p>' : '') +
        '<div class="gp-login-actions"><button type="submit" class="button primary" id="enrollmentSignIn"' + (!ready || state.busy ? ' disabled' : '') + '>' + (state.busy ? L('Signing in…', 'लॉगिन सुरू…') : L('Login', 'लॉगिन')) + '</button><button type="button" class="button secondary" data-return-public' + disabled + '>' + L('Back to GP home', 'ग्रामपंचायत मुख्यपृष्ठावर जा') + '</button></div></form></section></div>';
      // Public fictional fixtures are filled only on explicit Login/selection renders.
      // Keep the password out of HTML attributes, saved state and error/busy renders.
      if (demo) field('loginPassword').value = demo.password;
      if (focus) { field('enrollmentTitle').tabIndex = -1; field('enrollmentTitle').focus({ preventScroll: true }); window.scrollTo({ top: 0, behavior: 'instant' }); }
    }
    async function signIn() {
      if (state.busy) return;
      if (performance.now() < state.lockedUntil) { clearPassword(); error(L('Please wait 30 seconds before trying again.', 'पुन्हा प्रयत्न करण्यापूर्वी ३० सेकंद थांबा.')); return; }
      if (state.lockedUntil) { state.attempts = 0; state.lockedUntil = 0; }
      captureUsername();
      const gp = selectedGP();
      if (!gp || String(gp.districtCode) !== state.districtCode || districtState(districtMap.get(state.districtCode)) !== state.stateCode) { clearPassword(); error(L('Choose a matching state, district and Gram Panchayat.', 'जुळणारे राज्य, जिल्हा आणि ग्रामपंचायत निवडा.'), field('loginGp')); return; }
      let password = field('loginPassword').value;
      if (!state.username || !password || length(password.normalize('NFC')) > 128 || length(state.username) > 64) { password = ''; clearPassword(); error(L('The username or password is incorrect for the selected Gram Panchayat. Check your GP selection.', 'निवडलेल्या ग्रामपंचायतीसाठी वापरकर्तानाव किंवा पासवर्ड चुकीचा आहे. ग्रामपंचायतीची निवड तपासा.')); return; }
      if (!access()?.authenticate) { password = ''; clearPassword(); error(L('The demo sign-in module could not load. Keep all prototype files together and reload.', 'डेमो लॉगिन विभाग उघडता आला नाही. सर्व डेमो फाईल एकत्र ठेवून पुन्हा उघडा.')); return; }
      state.busy = true; state.error = ''; state.notice = ''; clearPassword(); render(false);
      try {
        const pending = access().authenticate({ gpCode: gp.code, username: state.username, password, language: state.lang });
        password = '';
        const result = await pending;
        if (!result?.ok) {
          state.attempts++;
          state.error = result?.reason === 'not-ready' ? L('Login is not enabled for this GP in the local demo.', 'स्थानिक डेमोमध्ये या ग्रामपंचायतीसाठी लॉगिन सुरू नाही.') : L('The username or password is incorrect for the selected Gram Panchayat. Check your GP selection.', 'निवडलेल्या ग्रामपंचायतीसाठी वापरकर्तानाव किंवा पासवर्ड चुकीचा आहे. ग्रामपंचायतीची निवड तपासा.');
          if (state.attempts >= MAX_ATTEMPTS) { state.lockedUntil = performance.now() + COOLDOWN_MS; state.error += ' ' + L('Please wait 30 seconds before trying again.', 'पुन्हा प्रयत्न करण्यापूर्वी ३० सेकंद थांबा.'); }
        } else if (String(result.account?.gp?.code) !== state.gpCode || String(options.getExpectedGPCode?.() || state.gpCode) !== state.gpCode) {
          state.error = L('The GP selection changed. Check the selected Panchayat and sign in again.', 'ग्रामपंचायतीची निवड बदलली. निवड तपासा आणि पुन्हा लॉगिन करा.');
        } else {
          const account = result.account;
          state.activeGP = String(account.gp.code); state.activeUsername = account.username; state.lang = ['mr', 'en'].includes(account.lang) ? account.lang : state.lang;
          host.lang = state.lang; host.dataset.language = state.lang;
          await options.onSignIn?.({ ...account, lang: state.lang });
          state.signedIn = true; state.attempts = 0; state.lockedUntil = 0; host.replaceChildren(); host.hidden = true;
        }
      } catch (_) { state.error = L('The demo could not sign in. Please try again.', 'डेमोमध्ये लॉगिन करता आले नाही. पुन्हा प्रयत्न करा.'); state.signedIn = false; state.activeGP = ''; state.activeUsername = ''; options.onSignOut?.(); }
      finally { password = ''; state.busy = false; if (!state.signedIn) render(); }
    }
    host.addEventListener('submit', event => { if (event.target.id === 'loginForm') { event.preventDefault(); void signIn(); } });
    host.addEventListener('click', event => {
      const button = event.target.closest('button');
      if (!button || !host.contains(button) || state.busy) return;
      if (button.id === 'toggleLoginPassword') { const input = field('loginPassword'); const visible = input.type === 'password'; input.type = visible ? 'text' : 'password'; button.setAttribute('aria-pressed', String(visible)); button.textContent = visible ? L('Hide', 'लपवा') : L('Show', 'दाखवा'); }
    });
    host.addEventListener('change', event => {
      if (state.busy) return;
      captureUsername();
      if (event.target.id === 'loginState') { state.stateCode = event.target.value; state.districtCode = ''; state.gpCode = ''; state.search = ''; locationChanged(); render(false, true); field('loginDistrict').focus(); }
      if (event.target.id === 'loginDistrict') { state.districtCode = event.target.value; state.gpCode = ''; state.search = ''; locationChanged(); render(false, true); field('loginGpSearch').focus(); }
      if (event.target.id === 'loginGp') { const previous = state.gpCode; state.gpCode = event.target.value; if (previous !== state.gpCode) locationChanged(); render(false, true); field('loginGp').focus(); }
    });
    host.addEventListener('input', event => {
      event.target.removeAttribute('aria-invalid');
      if (state.busy) return;
      if (event.target.id === 'loginGpSearch') {
        const cursor = event.target.selectionStart;
        captureUsername(); state.search = event.target.value; clearPassword();
        if (state.gpCode && !matchingGPs().some(item => String(item.code) === state.gpCode)) { state.gpCode = ''; locationChanged(); }
        render(false, true); field('loginGpSearch').focus();
        if (cursor != null) field('loginGpSearch').setSelectionRange(cursor, cursor);
      }
    });
    const controller = {
      openLogin() {
        if (state.busy) return false;
        clearPassword(); state.signedIn = false; state.activeGP = ''; state.activeUsername = ''; state.error = ''; state.notice = '';
        setGP(options.getExpectedGPCode?.()); render(true, true); return true;
      },
      signOut() {
        if (state.busy) return;
        clearPassword(); state.signedIn = false; state.activeGP = ''; state.activeUsername = ''; state.error = ''; state.notice = '';
        host.replaceChildren(); host.hidden = true; options.onSignOut?.();
      },
      suspend() { if (state.busy) return false; captureUsername(); clearPassword(); host.replaceChildren(); host.hidden = true; return true; },
      setLanguage(lang) {
        if (state.busy || !['mr', 'en'].includes(lang)) return;
        if (lang !== state.lang) { state.error = ''; state.notice = ''; }
        captureUsername(); clearPassword(); state.lang = lang; host.lang = lang; host.dataset.language = lang;
        if (state.signedIn) access()?.setLanguage?.(state.activeGP, state.activeUsername, lang);
        else if (!host.hidden) render(false, true);
      },
      get isSignedIn() { return state.signedIn; },
      get isBusy() { return state.busy; }
    };
    instances.set(host, controller);
    host.hidden = true;
    return controller;
  }
  window.GPEnrollment = Object.freeze({ init });
})();
