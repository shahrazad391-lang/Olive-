/**
 * Zarrai API client — all AI/weather calls go through secure local proxy.
 * API keys never touch the browser.
 */

const API_BASE = '';

export async function checkHealth() {
  try {
    const r = await fetch(`${API_BASE}/api/health`);
    return r.ok ? await r.json() : { ok: false, gemini: false };
  } catch {
    return { ok: false, gemini: false };
  }
}

export async function identifyPlantAI(image, locale) {
  const r = await fetch(`${API_BASE}/api/identify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image, locale }),
  });
  const data = await r.json();
  if (!r.ok) throw new Error(data.error || 'Identify failed');
  return data;
}

export async function diagnoseAI(images, complaint, locale, plantName = '') {
  const r = await fetch(`${API_BASE}/api/diagnose`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ images, complaint, locale, plantName }),
  });
  const data = await r.json();
  if (!r.ok) throw new Error(data.error || 'Diagnose failed');
  return data;
}

export async function fetchWeather({ lat, lon, city } = {}) {
  const params = new URLSearchParams();
  if (lat != null) params.set('lat', lat);
  if (lon != null) params.set('lon', lon);
  if (city) params.set('city', city);
  const r = await fetch(`${API_BASE}/api/weather?${params}`);
  const data = await r.json();
  if (!r.ok) throw new Error(data.error || 'Weather failed');
  return data;
}

/** Normalize Gemini plant response to app format */
export function normalizeAIPlant(geminiResult) {
  const r = geminiResult;
  return {
    plant: {
      id: 'ai',
      scientific: r.scientific,
      nameAr: r.nameAr,
      nameEn: r.nameEn,
      family: r.family,
      origin: r.origin,
      climate: r.climate,
      watering: r.watering,
      sunlight: r.sunlight,
      soil: r.soil,
      uses: r.uses,
      season: r.season,
      syria: r.syria,
    },
    confidence: Math.round(r.confidence || 85),
    alternatives: (r.alternatives || []).map(a => ({
      plant: { nameAr: a.nameAr, nameEn: a.nameEn, scientific: '' },
      confidence: Math.round(a.confidence || 50),
    })),
    source: 'gemini',
  };
}

/** Normalize Gemini diagnosis to app format */
export function normalizeAIDiagnosis(geminiResult) {
  const r = geminiResult;
  return {
    disease: {
      id: 'ai',
      name: r.disease,
      severity: r.severity || 'medium',
      cause: r.cause,
      symptoms: r.symptoms,
      solution: r.solution,
      prevention: r.prevention,
    },
    confidence: Math.round(r.confidence || 80),
    textScore: 90,
    visScore: 85,
    visualReport: (r.visualFindings?.ar || []).map((item, i) => ({
      ar: item,
      en: r.visualFindings?.en?.[i] || item,
    })),
    alternatives: (r.alternatives || []).map(a => ({
      disease: { name: a.name },
      confidence: Math.round(a.confidence || 40),
    })),
    source: 'gemini',
  };
}