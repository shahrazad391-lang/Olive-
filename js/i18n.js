export const LOCALES = { ar: { dir: 'rtl' }, en: { dir: 'ltr' } };

const S = {
  appName: { ar: 'زراعي', en: 'Zarrai' },
  appTagline: { ar: 'تعرّف على نباتاتك وشخّص أمراضها', en: 'Identify plants & diagnose diseases' },
  nav_home: { ar: 'الرئيسية', en: 'Home' },
  nav_identify: { ar: 'تعرّف على النبات', en: 'Identify Plant' },
  nav_diagnose: { ar: 'تشخيص الأمراض', en: 'Disease Diagnosis' },
  nav_history: { ar: 'السجل', en: 'History' },
  credits: { ar: 'تطوير: عبدالله الزعبي وحسن الزعبي', en: 'Developed by AbdAllah Alzoubi & Hassn Alzoubi' },
  upload_photo: { ar: 'ارفع صورة النبات', en: 'Upload Plant Photo' },
  upload_hint: { ar: 'صورة واضحة للأوراق أو الزهرة أو الثمرة', en: 'Clear photo of leaves, flower, or fruit' },
  take_photo: { ar: 'التقط صورة', en: 'Take Photo' },
  choose_file: { ar: 'اختر من المعرض', en: 'Choose from Gallery' },
  analyzing: { ar: 'جاري التحليل...', en: 'Analyzing...' },
  identify_btn: { ar: 'تعرّف على النبات', en: 'Identify Plant' },
  confidence: { ar: 'نسبة الثقة', en: 'Confidence' },
  plant_info: { ar: 'معلومات النبات', en: 'Plant Information' },
  scientific_name: { ar: 'الاسم العلمي', en: 'Scientific Name' },
  common_name_ar: { ar: 'الاسم العربي', en: 'Arabic Name' },
  family: { ar: 'العائلة النباتية', en: 'Plant Family' },
  origin: { ar: 'الأصل', en: 'Origin' },
  climate: { ar: 'المناخ المناسب', en: 'Suitable Climate' },
  watering: { ar: 'الري', en: 'Watering' },
  sunlight: { ar: 'الإضاءة', en: 'Sunlight' },
  soil: { ar: 'التربة', en: 'Soil' },
  uses: { ar: 'الاستخدامات', en: 'Uses' },
  season: { ar: 'الموسم', en: 'Season' },
  syria_note: { ar: 'في سوريا', en: 'In Syria' },
  diagnose_title: { ar: 'تشخيص أمراض النبات', en: 'Plant Disease Diagnosis' },
  diagnose_sub: { ar: 'ارفع صور الأوراق والأغصان وموقع الزراعة مع وصف المشكلة', en: 'Upload photos of leaves, branches, planting location & describe the problem' },
  photo_leaves: { ar: 'صورة الأوراق', en: 'Leaves Photo' },
  photo_branches: { ar: 'صورة الأغصان', en: 'Branches Photo' },
  photo_location: { ar: 'موقع الزراعة', en: 'Planting Location' },
  complaint: { ar: 'صف المشكلة', en: 'Describe the Problem' },
  complaint_hint: { ar: 'مثال: الأوراق تصفر وتسقط، بقع بنية على الأوراق...', en: 'e.g. Leaves turning yellow and falling, brown spots on leaves...' },
  diagnose_btn: { ar: 'تشخيص المشكلة', en: 'Diagnose Problem' },
  diagnosis_result: { ar: 'نتيجة التشخيص', en: 'Diagnosis Result' },
  disease_name: { ar: 'المرض', en: 'Disease' },
  cause: { ar: 'السبب', en: 'Cause' },
  symptoms: { ar: 'الأعراض', en: 'Symptoms' },
  solution: { ar: 'الحل المقترح', en: 'Suggested Solution' },
  prevention: { ar: 'الوقاية', en: 'Prevention' },
  severity: { ar: 'الخطورة', en: 'Severity' },
  organic_treatment: { ar: 'علاج عضوي', en: 'Organic Treatment' },
  chemical_treatment: { ar: 'علاج كيميائي', en: 'Chemical Treatment' },
  no_history: { ar: 'لا يوجد سجل بعد', en: 'No history yet' },
  hero_title: { ar: 'مساعدك الزراعي الذكي', en: 'Your Smart Agricultural Assistant' },
  hero_sub: { ar: 'تعرّف على النباتات وشخّص الأمراض بالصور — عربي وإنجليزي', en: 'Identify plants & diagnose diseases from photos — Arabic & English' },
  offline: { ar: 'يعمل بدون إنترنت', en: 'Works Offline' },
  severity_low: { ar: 'منخفضة', en: 'Low' },
  severity_medium: { ar: 'متوسطة', en: 'Medium' },
  severity_high: { ar: 'عالية', en: 'High' },
  severity_critical: { ar: 'حرجة', en: 'Critical' },
  match_alternatives: { ar: 'احتمالات أخرى', en: 'Other Possibilities' },
  save_result: { ar: 'حفظ في السجل', en: 'Save to History' },
  saved: { ar: 'تم الحفظ', en: 'Saved' },
  new_scan: { ar: 'فحص جديد', en: 'New Scan' },
  required_photo: { ar: 'يرجى رفع صورة واحدة على الأقل', en: 'Please upload at least one photo' },
  required_complaint: { ar: 'يرجى وصف المشكلة', en: 'Please describe the problem' },
  visual_analysis: { ar: 'التحليل البصري', en: 'Visual Analysis' },
  text_analysis: { ar: 'تحليل الوصف', en: 'Text Analysis' },
  weather: { ar: 'الطقس الحي', en: 'Live Weather' },
  weather_for: { ar: 'طقس مناسب للزراعة', en: 'Farming Weather' },
  temperature: { ar: 'الحرارة', en: 'Temperature' },
  humidity: { ar: 'الرطوبة', en: 'Humidity' },
  wind: { ar: 'الرياح', en: 'Wind' },
  forecast: { ar: 'التوقعات', en: 'Forecast' },
  ai_powered: { ar: 'مدعوم بالذكاء الاصطناعي', en: 'AI Powered' },
  ai_fallback: { ar: 'تحليل محلي (بدون AI)', en: 'Local analysis (no AI)' },
  gemini_ready: { ar: 'Gemini AI متصل', en: 'Gemini AI connected' },
  gemini_offline: { ar: 'AI غير متصل — تحليل محلي', en: 'AI offline — local fallback' },
  farming_tip: { ar: 'نصيحة زراعية', en: 'Farming Tip' },
  tip_hot: { ar: 'حرارة عالية — زِد الري صباحاً ومساءً', en: 'High heat — increase morning/evening irrigation' },
  tip_rain: { ar: 'أمطار متوقعة — أجّل الرش الكيميائي', en: 'Rain expected — delay chemical spraying' },
  tip_good: { ar: 'طقس مناسب للأعمال الزراعية', en: 'Good conditions for farm work' },
  refresh_weather: { ar: 'تحديث الطقس', en: 'Refresh Weather' },
  kmh: { ar: 'كم/س', en: 'km/h' },
  mm: { ar: 'مم', en: 'mm' },
};

let locale = 'ar';

export function setLocale(l) {
  locale = LOCALES[l] ? l : 'ar';
  document.documentElement.lang = locale;
  document.documentElement.dir = LOCALES[locale].dir;
  localStorage.setItem('zarrai_locale', locale);
}

export function getLocale() { return locale; }

export function t(key) {
  const e = S[key];
  return e ? (e[locale] || e.en) : key;
}

export function tf(key, field) {
  const obj = S[key];
  if (!obj) return '';
  return obj[field]?.[locale] || obj[field]?.en || '';
}

export function initLocale() {
  const saved = localStorage.getItem('zarrai_locale');
  setLocale(saved && LOCALES[saved] ? saved : 'ar');
}