/**
 * Expert-system diagnosis engine.
 * Combines visual features, symptom text (AR/EN), and plant context.
 */

import { DISEASES } from './diseases.js';

function tokenize(text) {
  return text.toLowerCase()
    .replace(/[^\w\u0600-\u06FF\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 1);
}

function textMatchScore(complaint, disease) {
  const tokens = tokenize(complaint);
  const allSymptoms = [...disease.symptoms.ar, ...disease.symptoms.en].map(s => s.toLowerCase());
  let score = 0;

  for (const symptom of allSymptoms) {
    if (complaint.toLowerCase().includes(symptom)) {
      score += 30;
    }
    for (const token of tokens) {
      if (symptom.includes(token) || token.includes(symptom.split(' ')[0])) {
        score += 8;
      }
    }
  }

  const arComplaint = /[\u0600-\u06FF]/.test(complaint);
  const symptomList = arComplaint ? disease.symptoms.ar : disease.symptoms.en;
  for (const s of symptomList) {
    const words = s.split(' ');
    if (words.some(w => tokens.includes(w))) score += 12;
  }

  return Math.min(score, 100);
}

function visualMatchScore(features, disease) {
  let score = 0;
  for (const flag of disease.visual) {
    if (typeof features[flag] === 'boolean' && features[flag]) score += 25;
    else if (typeof features[flag] === 'number' && features[flag] > 0.08) score += 15;
  }
  return Math.min(score, 100);
}

export function diagnose(features, complaint, plantId = null) {
  const results = DISEASES.map(disease => {
    let score = 0;

    const textScore = textMatchScore(complaint, disease);
    const visScore = visualMatchScore(features, disease);

    score = textScore * 0.55 + visScore * 0.45;

    if (plantId && disease.plants.includes(plantId)) score += 15;

    if (textScore < 5 && visScore < 10) score *= 0.3;

    return { disease, score: Math.min(score, 100), textScore, visScore };
  });

  results.sort((a, b) => b.score - a.score);

  const top = results[0];
  const confidence = Math.round(Math.min(95, Math.max(30, top.score)));

  return {
    disease: top.disease,
    confidence,
    textScore: top.textScore,
    visScore: top.visScore,
    alternatives: results.slice(1, 3)
      .filter(r => r.score > 15)
      .map(r => ({ disease: r.disease, confidence: Math.round(r.score) })),
  };
}

export function getSeverityLabel(severity, locale) {
  const map = {
    low: { ar: 'منخفضة', en: 'Low' },
    medium: { ar: 'متوسطة', en: 'Medium' },
    high: { ar: 'عالية', en: 'High' },
    critical: { ar: 'حرجة', en: 'Critical' },
  };
  return map[severity]?.[locale] || severity;
}