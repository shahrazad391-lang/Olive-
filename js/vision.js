/**
 * Client-side image feature extraction for plant ID & disease visual analysis.
 * Analyzes color histograms, green index, spot detection, wilting indicators.
 */

export function loadImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function extractFeatures(img, maxSize = 256) {
  const canvas = document.createElement('canvas');
  const scale = Math.min(maxSize / img.width, maxSize / img.height, 1);
  canvas.width = Math.round(img.width * scale);
  canvas.height = Math.round(img.height * scale);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  const { data, width, height } = ctx.getImageData(0, 0, canvas.width, canvas.height);

  let rSum = 0, gSum = 0, bSum = 0, count = 0;
  let greenPixels = 0, yellowPixels = 0, brownPixels = 0, darkPixels = 0, whitePixels = 0;
  let redDominant = 0, purplePixels = 0;
  const bins = new Array(8).fill(0);

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
    if (a < 128) continue;
    count++;
    rSum += r; gSum += g; bSum += b;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const sat = max === 0 ? 0 : (max - min) / max;

    if (g > r * 1.2 && g > b * 1.1 && g > 60) greenPixels++;
    if (r > 150 && g > 120 && b < 80) yellowPixels++;
    if (r > 80 && g > 40 && g < r * 0.8 && b < 60 && sat > 0.2) brownPixels++;
    if (max < 50) darkPixels++;
    if (min > 200 && sat < 0.15) whitePixels++;
    if (r > 150 && g < 80 && b < 80) redDominant++;
    if (r > 80 && b > 80 && g < Math.min(r, b) * 0.7) purplePixels++;

    const hue = rgbToHue(r, g, b);
    bins[Math.floor(hue / 45) % 8]++;
  }

  const total = count || 1;
  const avgR = rSum / total, avgG = gSum / total, avgB = bSum / total;

  return {
    avgColor: { r: avgR, g: avgG, b: avgB },
    greenRatio: greenPixels / total,
    yellowRatio: yellowPixels / total,
    brownRatio: brownPixels / total,
    darkRatio: darkPixels / total,
    whiteRatio: whitePixels / total,
    redRatio: redDominant / total,
    purpleRatio: purplePixels / total,
    hueBins: bins.map(b => b / total),
    aspectRatio: width / height,
    brightness: (avgR + avgG + avgB) / 3,
    saturation: computeSaturation(avgR, avgG, avgB),
    isWilted: yellowRatio > 0.15 && greenRatio < 0.35,
    hasSpots: brownRatio > 0.08 || (darkRatio > 0.1 && greenRatio > 0.2),
    hasMildew: whiteRatio > 0.12 && greenRatio > 0.15,
    hasBlight: brownRatio > 0.12 && darkRatio > 0.08,
    hasChlorosis: yellowRatio > 0.2 && greenRatio > 0.1,
    hasRust: redDominant / total > 0.05 && yellowRatio > 0.03,
    isFruit: redRatio > 0.15 || (avgR > 140 && avgG < 100),
    isFlower: (redRatio > 0.1 || purplePixels / total > 0.08) && greenRatio < 0.5,
    isLeaf: greenRatio > 0.35,
    isWoody: brownRatio > 0.2 && greenRatio < 0.25,
  };
}

function rgbToHue(r, g, b) {
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  if (max === min) return 0;
  let h = 0;
  const d = max - min;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
  else if (max === g) h = ((b - r) / d + 2) * 60;
  else h = ((r - g) / d + 4) * 60;
  return h;
}

function computeSaturation(r, g, b) {
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  return max === 0 ? 0 : (max - min) / max;
}

export function mergeFeatures(featureList) {
  if (featureList.length === 1) return featureList[0];
  const merged = { ...featureList[0] };
  const ratioKeys = ['greenRatio','yellowRatio','brownRatio','darkRatio','whiteRatio','redRatio','purpleRatio'];
  for (const key of ratioKeys) {
    merged[key] = featureList.reduce((s, f) => s + f[key], 0) / featureList.length;
  }
  merged.isWilted = featureList.some(f => f.isWilted);
  merged.hasSpots = featureList.some(f => f.hasSpots);
  merged.hasMildew = featureList.some(f => f.hasMildew);
  merged.hasBlight = featureList.some(f => f.hasBlight);
  merged.hasChlorosis = featureList.some(f => f.hasChlorosis);
  merged.hasRust = featureList.some(f => f.hasRust);
  return merged;
}

export function featuresToVisualReport(features, locale) {
  const items = [];
  const ar = locale === 'ar';
  if (features.isLeaf) items.push(ar ? '✓ أوراق خضراء مكتشفة' : '✓ Green foliage detected');
  if (features.isFlower) items.push(ar ? '✓ زهور ملوّنة مكتشفة' : '✓ Colored flowers detected');
  if (features.isFruit) items.push(ar ? '✓ ثمار/ألوان حمراء مكتشفة' : '✓ Fruit/red tones detected');
  if (features.isWoody) items.push(ar ? '✓ أنسجة خشبية/بنية' : '✓ Woody/brown tissue detected');
  if (features.hasChlorosis) items.push(ar ? '⚠ اصفرار (كلوروز) في الأوراق' : '⚠ Yellowing (chlorosis) in leaves');
  if (features.hasSpots) items.push(ar ? '⚠ بقع بنية/سوداء على السطح' : '⚠ Brown/black spots detected');
  if (features.hasMildew) items.push(ar ? '⚠ علامات بيضاء (قد تكون بياض دقيقي)' : '⚠ White patches (possible mildew)');
  if (features.hasBlight) items.push(ar ? '⚠ علامات ذبول/لفحة' : '⚠ Wilting/blight indicators');
  if (features.hasRust) items.push(ar ? '⚠ بقع صدئية برتقالية/حمراء' : '⚠ Rust-colored spots');
  if (features.isWilted) items.push(ar ? '⚠ ذبول عام في النبات' : '⚠ General wilting detected');
  if (items.length === 0) items.push(ar ? 'تحليل عام للصورة مكتمل' : 'General image analysis complete');
  return items;
}