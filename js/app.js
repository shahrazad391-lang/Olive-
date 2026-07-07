import * as i18n from './i18n.js';
import * as vision from './vision.js';
import { identifyPlant } from './plants.js';
import { diagnose, getSeverityLabel } from './diagnosis.js';
import * as db from './db.js';
import * as api from './api.js';

const $ = (s, root = document) => root.querySelector(s);

const state = {
  view: 'home',
  identifyPreview: null,
  diagnosePhotos: { leaves: null, branches: null, location: null },
  complaint: '',
  lastIdentify: null,
  lastDiagnose: null,
  loading: false,
  geminiOnline: false,
  weather: null,
  weatherLoading: false,
};

async function init() {
  i18n.initLocale();
  const health = await api.checkHealth();
  state.geminiOnline = health.gemini === true;
  render();
  bindEvents();
  loadWeather();
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }
}

async function loadWeather(coords) {
  state.weatherLoading = true;
  if (state.view === 'home') render();
  try {
    state.weather = await api.fetchWeather(coords || { city: 'Damascus' });
  } catch {
    state.weather = null;
  }
  state.weatherLoading = false;
  if (state.view === 'home') render();
}

function bindEvents() {
  document.addEventListener('click', handleClick);
  document.addEventListener('change', handleChange);

  const main = $('#main');
  main?.addEventListener('dragover', (e) => { e.preventDefault(); e.currentTarget.classList.add('drag-over'); });
  main?.addEventListener('dragleave', (e) => e.currentTarget.classList.remove('drag-over'));
  main?.addEventListener('drop', handleDrop);
}

function handleClick(e) {
  const viewBtn = e.target.closest('[data-view]');
  if (viewBtn) { state.view = viewBtn.dataset.view; render(); return; }

  const langBtn = e.target.closest('[data-lang]');
  if (langBtn) { i18n.setLocale(langBtn.dataset.lang); render(); return; }

  if (e.target.closest('#upload-zone') && !e.target.closest('button')) {
    $('#identify-file')?.click();
  }
  if (e.target.closest('#btn-camera')) { triggerFile('identify-file', true); }
  if (e.target.closest('#btn-gallery')) { triggerFile('identify-file', false); }
  if (e.target.closest('#btn-identify')) { runIdentify(); }
  if (e.target.closest('#btn-save-identify')) { saveIdentify(); }
  if (e.target.closest('#btn-new-identify')) { resetIdentify(); }
  if (e.target.closest('#btn-diagnose')) { runDiagnose(); }
  if (e.target.closest('#btn-save-diagnose')) { saveDiagnose(); }
  if (e.target.closest('#btn-new-diagnose')) { resetDiagnose(); }
  if (e.target.closest('#btn-export')) { exportHistory(); }
  if (e.target.closest('#btn-refresh-weather')) { loadWeather(); }

  const slot = e.target.closest('.photo-slot');
  if (slot) slot.querySelector('.slot-file')?.click();
}

function handleChange(e) {
  if (e.target.id === 'identify-file') onIdentifyFile(e.target.files[0]);
  if (e.target.classList.contains('slot-file')) onSlotFile(e.target.dataset.slot, e.target.files[0]);
  if (e.target.id === 'complaint-text') state.complaint = e.target.value;
}

function handleDrop(e) {
  e.preventDefault();
  e.currentTarget.classList.remove('drag-over');
  const file = e.dataTransfer?.files?.[0];
  if (file?.type.startsWith('image/')) {
    if (state.view === 'identify') onIdentifyFile(file);
    else if (state.view === 'diagnose') onSlotFile('leaves', file);
  }
}

function triggerFile(id, capture) {
  const input = document.getElementById(id);
  if (!input) return;
  if (capture) input.setAttribute('capture', 'environment');
  else input.removeAttribute('capture');
  input.click();
}

function readFile(file, cb) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => cb(ev.target.result);
  reader.readAsDataURL(file);
}

function onIdentifyFile(file) {
  readFile(file, (src) => {
    state.identifyPreview = src;
    state.lastIdentify = null;
    render();
  });
}

function onSlotFile(slot, file) {
  readFile(file, (src) => {
    state.diagnosePhotos[slot] = src;
    state.lastDiagnose = null;
    render();
  });
}

async function imageFromSrc(src) {
  const blob = await fetch(src).then(r => r.blob());
  return vision.loadImage(blob);
}

async function runIdentify() {
  if (!state.identifyPreview || state.loading) return;
  state.loading = true;
  render();
  const loc = i18n.getLocale();
  try {
    if (state.geminiOnline) {
      const { result } = await api.identifyPlantAI(state.identifyPreview, loc);
      state.lastIdentify = api.normalizeAIPlant(result);
    } else {
      throw new Error('no ai');
    }
  } catch {
    try {
      const img = await imageFromSrc(state.identifyPreview);
      const features = vision.extractFeatures(img);
      state.lastIdentify = { ...identifyPlant(features), source: 'local' };
      toast(i18n.t('ai_fallback'));
    } catch (err) {
      toast(loc === 'ar' ? 'خطأ في تحليل الصورة' : 'Image analysis error');
      console.error(err);
    }
  }
  state.loading = false;
  render();
}

async function runDiagnose() {
  if (state.loading) return;
  const hasPhoto = Object.values(state.diagnosePhotos).some(Boolean);
  if (!hasPhoto) return toast(i18n.t('required_photo'));
  if (!state.complaint.trim()) return toast(i18n.t('required_complaint'));

  state.loading = true;
  render();
  const loc = i18n.getLocale();
  const plantName = state.lastIdentify
    ? (loc === 'ar' ? state.lastIdentify.plant.nameAr : state.lastIdentify.plant.nameEn)
    : '';

  try {
    if (state.geminiOnline) {
      const { result } = await api.diagnoseAI(state.diagnosePhotos, state.complaint, loc, plantName);
      const normalized = api.normalizeAIDiagnosis(result);
      normalized.visualReport = (result.visualFindings?.[loc] || result.visualFindings?.en || []);
      state.lastDiagnose = normalized;
    } else {
      throw new Error('no ai');
    }
  } catch {
    try {
      const features = [];
      for (const src of Object.values(state.diagnosePhotos)) {
        if (!src) continue;
        const img = await imageFromSrc(src);
        features.push(vision.extractFeatures(img));
      }
      const merged = vision.mergeFeatures(features);
      const plantId = state.lastIdentify?.plant?.id || null;
      const result = diagnose(merged, state.complaint, plantId);
      result.visualReport = vision.featuresToVisualReport(merged, loc);
      result.source = 'local';
      state.lastDiagnose = result;
      toast(i18n.t('ai_fallback'));
    } catch (err) {
      toast(loc === 'ar' ? 'خطأ في التشخيص' : 'Diagnosis error');
      console.error(err);
    }
  }
  state.loading = false;
  render();
}

async function saveIdentify() {
  if (!state.lastIdentify) return;
  const loc = i18n.getLocale();
  await db.saveHistory({
    id: db.genId(), type: 'identify',
    title: loc === 'ar' ? state.lastIdentify.plant.nameAr : state.lastIdentify.plant.nameEn,
    confidence: state.lastIdentify.confidence,
    date: new Date().toISOString(),
  });
  toast(i18n.t('saved'));
}

async function saveDiagnose() {
  if (!state.lastDiagnose) return;
  const loc = i18n.getLocale();
  await db.saveHistory({
    id: db.genId(), type: 'diagnose',
    title: state.lastDiagnose.disease.name[loc],
    confidence: state.lastDiagnose.confidence,
    date: new Date().toISOString(),
  });
  toast(i18n.t('saved'));
}

function resetIdentify() {
  state.identifyPreview = null;
  state.lastIdentify = null;
  render();
}

function resetDiagnose() {
  state.diagnosePhotos = { leaves: null, branches: null, location: null };
  state.complaint = '';
  state.lastDiagnose = null;
  render();
}

async function exportHistory() {
  const history = await db.getHistory();
  const blob = new Blob([JSON.stringify(history, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'zarrai-history.json';
  a.click();
}

function render() {
  renderHeader();
  renderNav();
  const main = $('#main');
  const views = { home: renderHome, identify: renderIdentify, diagnose: renderDiagnose, history: renderHistory };
  main.innerHTML = views[state.view]?.(main) ?? renderHome(main);
  if (state.loading) showLoader();
}

function showLoader() {
  if ($('#loader')) return;
  const el = document.createElement('div');
  el.id = 'loader';
  el.className = 'loader-overlay';
  el.innerHTML = `<div class="loader-box"><div class="spinner"></div><p>${i18n.t('analyzing')}</p></div>`;
  document.body.appendChild(el);
}

function hideLoader() {
  $('#loader')?.remove();
}

function renderHeader() {
  $('#lang-toggle').innerHTML = `
    <span class="ai-status ${state.geminiOnline ? 'online' : 'offline'}" title="${state.geminiOnline ? i18n.t('gemini_ready') : i18n.t('gemini_offline')}">
      ${state.geminiOnline ? '🤖 AI' : '📴'}
    </span>
    <button class="lang-btn ${i18n.getLocale() === 'ar' ? 'active' : ''}" data-lang="ar">عربي</button>
    <button class="lang-btn ${i18n.getLocale() === 'en' ? 'active' : ''}" data-lang="en">EN</button>
  `;
  hideLoader();
}

function renderNav() {
  const items = [
    { id: 'home', icon: '🏠', label: i18n.t('nav_home') },
    { id: 'identify', icon: '🌿', label: i18n.t('nav_identify') },
    { id: 'diagnose', icon: '🔬', label: i18n.t('nav_diagnose') },
    { id: 'history', icon: '📋', label: i18n.t('nav_history') },
  ];
  $('#bottom-nav').innerHTML = items.map(it => `
    <button class="nav-item ${state.view === it.id ? 'active' : ''}" data-view="${it.id}">
      <span class="nav-icon">${it.icon}</span>
      <span class="nav-label">${it.label}</span>
    </button>
  `).join('');
}

function creditsFooter() {
  return `<footer class="credits">
    <div class="credits-names">AbdAllah Alzoubi · Hassn Alzoubi</div>
    <div class="credits-ar">${i18n.t('credits')}</div>
  </footer>`;
}

function renderHome() {
  return `
    <section class="hero">
      <div class="hero-badge">${state.geminiOnline ? '🤖 ' + i18n.t('ai_powered') : '🌱 ' + i18n.t('offline')}</div>
      <h1>${i18n.t('hero_title')}</h1>
      <p>${i18n.t('hero_sub')}</p>
      <div class="hero-credits">AbdAllah Alzoubi &amp; Hassn Alzoubi</div>
    </section>
    ${renderWeatherWidget()}
    <div class="action-cards">
      <button class="action-card" data-view="identify">
        <div class="action-icon">🌿</div>
        <h3>${i18n.t('nav_identify')}</h3>
        <p>${i18n.t('upload_hint')}</p>
      </button>
      <button class="action-card diagnose-card" data-view="diagnose">
        <div class="action-icon">🔬</div>
        <h3>${i18n.t('nav_diagnose')}</h3>
        <p>${i18n.t('diagnose_sub')}</p>
      </button>
    </div>
    ${creditsFooter()}
  `;
}

function renderIdentify() {
  const r = state.lastIdentify;
  const loc = i18n.getLocale();
  return `
    <div class="page-title"><h2>${i18n.t('nav_identify')}</h2></div>
    <div class="upload-zone" id="upload-zone">
      ${state.identifyPreview
        ? `<img src="${state.identifyPreview}" class="preview-img" alt="plant">`
        : `<div class="upload-placeholder">
            <div class="upload-icon">📷</div>
            <p>${i18n.t('upload_photo')}</p>
            <span class="muted">${i18n.t('upload_hint')}</span>
          </div>`}
      <input type="file" id="identify-file" accept="image/*" capture="environment" hidden>
    </div>
    <div class="upload-actions">
      <button class="btn btn-secondary" id="btn-camera" type="button">📷 ${i18n.t('take_photo')}</button>
      <button class="btn btn-secondary" id="btn-gallery" type="button">🖼 ${i18n.t('choose_file')}</button>
    </div>
    <button class="btn btn-primary btn-block" id="btn-identify" type="button" ${!state.identifyPreview || state.loading ? 'disabled' : ''}>
      🔍 ${i18n.t('identify_btn')}
    </button>
    ${r ? renderPlantCard(r, loc) : ''}
    ${creditsFooter()}
  `;
}

function renderWeatherWidget() {
  const loc = i18n.getLocale();
  if (state.weatherLoading) {
    return `<section class="weather-card loading"><div class="spinner"></div><p>${i18n.t('analyzing')}</p></section>`;
  }
  if (!state.weather) return '';
  const w = state.weather;
  const c = w.current;
  const desc = c.description?.[loc] || c.description?.en || '';
  const tip = farmingTip(c);
  return `
    <section class="weather-card">
      <div class="weather-header">
        <h3>🌤 ${i18n.t('weather')}</h3>
        <button class="btn-icon" id="btn-refresh-weather" type="button">🔄</button>
      </div>
      <div class="weather-city">${w.city}${w.country ? ', ' + w.country : ''}</div>
      <div class="weather-now">
        <span class="weather-icon">${c.description?.icon || '🌡️'}</span>
        <span class="weather-temp">${Math.round(c.temp)}°C</span>
        <span class="weather-desc">${desc}</span>
      </div>
      <div class="weather-stats">
        <div class="wstat"><span>💧</span>${c.humidity}% ${i18n.t('humidity')}</div>
        <div class="wstat"><span>💨</span>${c.wind} ${i18n.t('kmh')}</div>
        <div class="wstat"><span>🌧</span>${c.precipitation || 0} ${i18n.t('mm')}</div>
      </div>
      <div class="weather-forecast">
        ${(w.forecast || []).map(f => `
          <div class="fc-day">
            <div>${f.date?.slice(5) || ''}</div>
            <div>${f.description?.icon || ''}</div>
            <div>${Math.round(f.max)}°/${Math.round(f.min)}°</div>
          </div>
        `).join('')}
      </div>
      <div class="farming-tip">💡 ${i18n.t('farming_tip')}: ${tip}</div>
    </section>
  `;
}

function farmingTip(current) {
  if (current.temp > 35) return i18n.t('tip_hot');
  if ((current.precipitation || 0) > 0 || current.code >= 61) return i18n.t('tip_rain');
  return i18n.t('tip_good');
}

function sourceBadge(source) {
  if (source === 'gemini') return `<span class="source-badge ai">🤖 ${i18n.t('ai_powered')}</span>`;
  if (source === 'local') return `<span class="source-badge local">📴 ${i18n.t('ai_fallback')}</span>`;
  return '';
}

function renderPlantCard(r, loc) {
  const p = r.plant;
  return `
    <div class="result-card animate-in">
      <div class="result-header">
        <div class="result-icon">🌿</div>
        <div>
          <h3>${loc === 'ar' ? p.nameAr : p.nameEn}</h3>
          <p class="scientific">${p.scientific}</p>
          ${sourceBadge(r.source)}
        </div>
        <div class="confidence-badge">${r.confidence}%</div>
      </div>
      <p class="confidence-label">${i18n.t('confidence')}</p>
      <div class="info-grid">
        ${infoRow(i18n.t('scientific_name'), p.scientific)}
        ${infoRow(i18n.t('common_name_ar'), p.nameAr)}
        ${infoRow(i18n.t('family'), p.family[loc])}
        ${infoRow(i18n.t('origin'), p.origin[loc])}
        ${infoRow(i18n.t('climate'), p.climate[loc])}
        ${infoRow(i18n.t('watering'), p.watering[loc])}
        ${infoRow(i18n.t('sunlight'), p.sunlight[loc])}
        ${infoRow(i18n.t('soil'), p.soil[loc])}
        ${infoRow(i18n.t('uses'), p.uses[loc])}
        ${infoRow(i18n.t('season'), p.season[loc])}
        ${infoRow(i18n.t('syria_note'), p.syria[loc], true)}
      </div>
      ${r.alternatives?.length ? `
        <div class="alt-section">
          <h4>${i18n.t('match_alternatives')}</h4>
          ${r.alternatives.map(a => `
            <div class="alt-chip">${loc === 'ar' ? a.plant.nameAr : a.plant.nameEn} <span>${a.confidence}%</span></div>
          `).join('')}
        </div>` : ''}
      <div class="result-actions">
        <button class="btn btn-secondary" id="btn-save-identify" type="button">💾 ${i18n.t('save_result')}</button>
        <button class="btn btn-primary" id="btn-new-identify" type="button">🔄 ${i18n.t('new_scan')}</button>
      </div>
    </div>
  `;
}

function renderDiagnose() {
  const r = state.lastDiagnose;
  const loc = i18n.getLocale();
  return `
    <div class="page-title">
      <h2>${i18n.t('diagnose_title')}</h2>
      <p class="page-sub">${i18n.t('diagnose_sub')}</p>
    </div>
    <div class="diagnose-photos">
      ${photoSlot('leaves', i18n.t('photo_leaves'), state.diagnosePhotos.leaves)}
      ${photoSlot('branches', i18n.t('photo_branches'), state.diagnosePhotos.branches)}
      ${photoSlot('location', i18n.t('photo_location'), state.diagnosePhotos.location)}
    </div>
    <div class="form-group">
      <label>${i18n.t('complaint')}</label>
      <textarea id="complaint-text" class="input textarea" rows="4" placeholder="${i18n.t('complaint_hint')}">${state.complaint}</textarea>
    </div>
    <button class="btn btn-primary btn-block" id="btn-diagnose" type="button" ${state.loading ? 'disabled' : ''}>
      🔬 ${i18n.t('diagnose_btn')}
    </button>
    ${r ? renderDiagnoseCard(r, loc) : ''}
    ${creditsFooter()}
  `;
}

function photoSlot(key, label, src) {
  return `
    <div class="photo-slot" data-slot="${key}">
      ${src ? `<img src="${src}" alt="${label}">` : `<span class="slot-icon">📷</span>`}
      <span class="slot-label">${label}</span>
      <input type="file" class="slot-file" data-slot="${key}" accept="image/*" capture="environment" hidden>
    </div>
  `;
}

function renderDiagnoseCard(r, loc) {
  const d = r.disease;
  return `
    <div class="result-card diagnose-result animate-in">
      <div class="result-header">
        <div class="result-icon">🔬</div>
        <div>
          <h3>${d.name[loc]}</h3>
          <p class="scientific">${i18n.t('diagnosis_result')}</p>
          ${sourceBadge(r.source)}
        </div>
        <div class="confidence-badge ${d.severity}">${r.confidence}%</div>
      </div>
      <div class="severity-bar severity-${d.severity}">
        ${i18n.t('severity')}: <strong>${getSeverityLabel(d.severity, loc)}</strong>
      </div>
      <div class="analysis-badges">
        <span class="badge-pill">📷 ${i18n.t('visual_analysis')}: ${Math.round(r.visScore)}%</span>
        <span class="badge-pill">📝 ${i18n.t('text_analysis')}: ${Math.round(r.textScore)}%</span>
      </div>
      ${r.visualReport?.length ? `
        <div class="visual-report">${r.visualReport.map(i => `<div class="vr-item">${i}</div>`).join('')}</div>` : ''}
      <div class="info-grid">
        ${infoRow(i18n.t('cause'), d.cause[loc])}
        ${infoRow(i18n.t('symptoms'), (Array.isArray(d.symptoms[loc]) ? d.symptoms[loc] : [d.symptoms[loc]]).slice(0, 4).join(loc === 'ar' ? '، ' : ', '))}
        ${infoRow(i18n.t('organic_treatment'), d.solution.organic[loc], true)}
        ${infoRow(i18n.t('chemical_treatment'), d.solution.chemical[loc])}
        ${infoRow(i18n.t('prevention'), d.prevention[loc], true)}
      </div>
      ${r.alternatives?.length ? `
        <div class="alt-section">
          <h4>${i18n.t('match_alternatives')}</h4>
          ${r.alternatives.map(a => `
            <div class="alt-chip">${a.disease.name[loc]} <span>${a.confidence}%</span></div>
          `).join('')}
        </div>` : ''}
      <div class="result-actions">
        <button class="btn btn-secondary" id="btn-save-diagnose" type="button">💾 ${i18n.t('save_result')}</button>
        <button class="btn btn-primary" id="btn-new-diagnose" type="button">🔄 ${i18n.t('new_scan')}</button>
      </div>
    </div>
  `;
}

function renderHistory() {
  db.getHistory().then(history => {
    if (state.view !== 'history') return;
    $('#main').innerHTML = `
      <div class="page-title"><h2>${i18n.t('nav_history')}</h2></div>
      ${history.length === 0
        ? `<div class="empty"><div class="empty-icon">📋</div><p>${i18n.t('no_history')}</p></div>`
        : `<div class="history-list">${history.map(h => `
            <div class="history-item">
              <span class="hi-icon">${h.type === 'identify' ? '🌿' : '🔬'}</span>
              <div class="hi-info">
                <div class="hi-title">${h.title}</div>
                <div class="hi-date">${new Date(h.date).toLocaleDateString(i18n.getLocale() === 'ar' ? 'ar-SY' : 'en-US')}</div>
              </div>
              <span class="hi-conf">${h.confidence}%</span>
            </div>`).join('')}</div>`}
      <button class="btn btn-secondary btn-block" id="btn-export" type="button" style="margin-top:12px">📤 Export</button>
      ${creditsFooter()}
    `;
  });
  return `<div class="empty"><div class="spinner"></div><p>${i18n.t('analyzing')}</p></div>`;
}

function infoRow(label, value, highlight = false) {
  return `<div class="info-row ${highlight ? 'highlight' : ''}"><span class="info-label">${label}</span><span class="info-value">${value}</span></div>`;
}

function toast(msg) {
  document.querySelectorAll('.toast').forEach(t => t.remove());
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 2500);
}

init();