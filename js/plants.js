/**
 * Curated plant database — Mediterranean & Syrian agriculture focus.
 * Each plant has visual profile for image-matching.
 */

export const PLANTS = [
  {
    id: 'olive', scientific: 'Olea europaea', nameAr: 'زيتون', nameEn: 'Olive',
    family: { ar: 'الزيتونية', en: 'Oleaceae' },
    origin: { ar: 'البحر الأبيض المتوسط', en: 'Mediterranean' },
    climate: { ar: 'متوسطي دافئ وجاف', en: 'Warm Mediterranean, dry summers' },
    watering: { ar: 'معتدل — كل 2-3 أسابيع', en: 'Moderate — every 2-3 weeks' },
    sunlight: { ar: 'شمس كاملة', en: 'Full sun' },
    soil: { ar: 'طينية جيرية جيدة الصرف', en: 'Calcareous clay, well-drained' },
    uses: { ar: 'زيت زيتون، زيتون مائدة، خشب', en: 'Olive oil, table olives, timber' },
    season: { ar: 'الحصاد: أكتوبر-ديسمبر', en: 'Harvest: October–December' },
    syria: { ar: 'من أهم المحاصيل في الساحل السوري وحلب ودرعا', en: 'Major crop in Syrian coast, Aleppo & Daraa' },
    profile: { greenRatio: [0.3, 0.7], silverUndertone: true, leafShape: 'narrow', aspectRatio: [0.5, 2], brightness: [60, 140] },
  },
  {
    id: 'wheat', scientific: 'Triticum aestivum', nameAr: 'قمح', nameEn: 'Wheat',
    family: { ar: 'النجيلية', en: 'Poaceae' },
    origin: { ar: 'الشرق الأوسط (موطن القمح)', en: 'Middle East (origin of wheat)' },
    climate: { ar: 'معتدل، شتاء ممطر', en: 'Temperate, rainy winter' },
    watering: { ar: 'مائي — يعتمد على الأمطار', en: 'Rain-fed or irrigated' },
    sunlight: { ar: 'شمس كاملة', en: 'Full sun' },
    soil: { ar: 'طمية خصبة', en: 'Fertile loam' },
    uses: { ar: 'دقيق، خبز، علف', en: 'Flour, bread, fodder' },
    season: { ar: 'الزراعة: نوفمبر — الحصاد: يونيو', en: 'Sow: November — Harvest: June' },
    syria: { ar: 'المحصول الاستراتيجي الأول في الجزيرة السورية', en: 'Primary strategic crop in Al-Jazira' },
    profile: { greenRatio: [0.5, 0.85], yellowRatio: [0, 0.3], aspectRatio: [0.8, 3], brightness: [80, 180] },
  },
  {
    id: 'tomato', scientific: 'Solanum lycopersicum', nameAr: 'بندورة (طماطم)', nameEn: 'Tomato',
    family: { ar: 'الباذنجانية', en: 'Solanaceae' },
    origin: { ar: 'أمريكا الجنوبية', en: 'South America' },
    climate: { ar: 'دافئ معتدل', en: 'Warm temperate' },
    watering: { ar: 'منتظم — تربة رطبة', en: 'Regular — keep soil moist' },
    sunlight: { ar: '6-8 ساعات شمس', en: '6-8 hours sun' },
    soil: { ar: 'غنية عضوية جيدة الصرف', en: 'Rich organic, well-drained' },
    uses: { ar: 'غذاء، صلصة، معلبات', en: 'Food, sauce, canning' },
    season: { ar: 'الربيع والصيف', en: 'Spring & summer' },
    syria: { ar: 'محصول صيفي رئيسي في الغوطة وحماه', en: 'Major summer crop in Ghouta & Hama' },
    profile: { greenRatio: [0.2, 0.6], redRatio: [0.05, 0.4], isFruit: true, aspectRatio: [0.6, 1.5] },
  },
  {
    id: 'citrus', scientific: 'Citrus sinensis', nameAr: 'حمضيات (برتقال/ليمون)', nameEn: 'Citrus (Orange/Lemon)',
    family: { ar: 'السذابية', en: 'Rutaceae' },
    origin: { ar: 'جنوب شرق آسيا', en: 'Southeast Asia' },
    climate: { ar: 'متوسطي دافئ', en: 'Warm subtropical' },
    watering: { ar: 'منتظم — تجنب الغمر', en: 'Regular — avoid waterlogging' },
    sunlight: { ar: 'شمس كاملة', en: 'Full sun' },
    soil: { ar: 'رملية طمية خفيفة', en: 'Sandy loam' },
    uses: { ar: 'فواكه، عصير، زيت عطري', en: 'Fruit, juice, essential oil' },
    season: { ar: 'الحصاد: شتاء-ربيع', en: 'Harvest: winter–spring' },
    syria: { ar: 'مشهورة في الساحل السوري (اللاذقية وطرطوس)', en: 'Famous on Syrian coast (Latakia & Tartus)' },
    profile: { greenRatio: [0.35, 0.7], yellowRatio: [0.05, 0.25], redRatio: [0, 0.15], brightness: [90, 170] },
  },
  {
    id: 'grape', scientific: 'Vitis vinifera', nameAr: 'عنب', nameEn: 'Grape',
    family: { ar: 'الكرمية', en: 'Vitaceae' },
    origin: { ar: 'البحر الأبيض المتوسط', en: 'Mediterranean' },
    climate: { ar: 'دافئ جاف', en: 'Warm & dry' },
    watering: { ar: 'قليل إلى معتدل', en: 'Low to moderate' },
    sunlight: { ar: 'شمس كاملة', en: 'Full sun' },
    soil: { ar: 'صخرية جيرية', en: 'Rocky calcareous' },
    uses: { ar: 'فواكه، زبيب، دبس', en: 'Fresh fruit, raisins, molasses' },
    season: { ar: 'الحصاد: أغسطس-سبتمبر', en: 'Harvest: August–September' },
    syria: { ar: 'شهير في دمشق وحمص وحماة', en: 'Renowned in Damascus, Homs & Hama' },
    profile: { greenRatio: [0.25, 0.6], purpleRatio: [0, 0.2], redRatio: [0, 0.2], aspectRatio: [0.5, 2] },
  },
  {
    id: 'pomegranate', scientific: 'Punica granatum', nameAr: 'رمان', nameEn: 'Pomegranate',
    family: { ar: 'البطمية', en: 'Lythraceae' },
    origin: { ar: 'إيران وشرق البحر المتوسط', en: 'Iran & Eastern Mediterranean' },
    climate: { ar: 'قاري جاف حار', en: 'Hot dry continental' },
    watering: { ar: 'قليل — مقاوم للجفاف', en: 'Low — drought tolerant' },
    sunlight: { ar: 'شمس كاملة', en: 'Full sun' },
    soil: { ar: 'أي تربة جيدة الصرف', en: 'Any well-drained soil' },
    uses: { ar: 'فاكهة، عصير، دبس رمان', en: 'Fruit, juice, molasses' },
    season: { ar: 'الحصاد: أكتوبر', en: 'Harvest: October' },
    syria: { ar: 'مشهور في دمشق وريفها (رمان دمشقي)', en: 'Famous Damascus pomegranate' },
    profile: { greenRatio: [0.2, 0.55], redRatio: [0.1, 0.45], isFruit: true },
  },
  {
    id: 'fig', scientific: 'Ficus carica', nameAr: 'تين', nameEn: 'Fig',
    family: { ar: 'التينية', en: 'Moraceae' },
    origin: { ar: 'شرق البحر المتوسط', en: 'Eastern Mediterranean' },
    climate: { ar: 'دافئ جاف', en: 'Warm dry' },
    watering: { ar: 'قليل', en: 'Low' },
    sunlight: { ar: 'شمس كاملة', en: 'Full sun' },
    soil: { ar: 'جيرية خفيفة', en: 'Light calcareous' },
    uses: { ar: 'فاكهة طازجة ومجففة', en: 'Fresh & dried fruit' },
    season: { ar: 'تينة صيفية وخريفية', en: 'Summer & autumn crops' },
    syria: { ar: 'منتشر في كل المناطق السورية', en: 'Found throughout Syria' },
    profile: { greenRatio: [0.3, 0.65], brightness: [70, 150], aspectRatio: [0.6, 1.8] },
  },
  {
    id: 'almond', scientific: 'Prunus dulcis', nameAr: 'لوز', nameEn: 'Almond',
    family: { ar: 'الوردية', en: 'Rosaceae' },
    origin: { ar: 'وسط وجنوب غرب آسيا', en: 'Central & Southwest Asia' },
    climate: { ar: 'متوسطي بارد شتاءً', en: 'Mediterranean, cool winter' },
    watering: { ar: 'معتدل', en: 'Moderate' },
    sunlight: { ar: 'شمس كاملة', en: 'Full sun' },
    soil: { ar: 'جيدة الصرف', en: 'Well-drained' },
    uses: { ar: 'مكسرات، زيت، حلويات', en: 'Nuts, oil, confectionery' },
    season: { ar: 'الإزهار: فبراير — الحصاد: أغسطس', en: 'Bloom: February — Harvest: August' },
    syria: { ar: 'مهم في حلب وإدلب', en: 'Important in Aleppo & Idlib' },
    profile: { greenRatio: [0.15, 0.5], isFlower: true, whiteRatio: [0.05, 0.3], aspectRatio: [0.5, 2] },
  },
  {
    id: 'cotton', scientific: 'Gossypium hirsutum', nameAr: 'قطن', nameEn: 'Cotton',
    family: { ar: 'الخبازية', en: 'Malvaceae' },
    origin: { ar: 'الهند والمكسيك', en: 'India & Mexico' },
    climate: { ar: 'حار طويل الأيام', en: 'Hot, long days' },
    watering: { ar: 'مائي غزير', en: 'Heavy irrigation' },
    sunlight: { ar: 'شمس كاملة', en: 'Full sun' },
    soil: { ar: 'طمية عميقة خصبة', en: 'Deep fertile loam' },
    uses: { ar: 'ألياف نسيجية', en: 'Textile fiber' },
    season: { ar: 'الزراعة: أبريل — الحصاد: سبتمبر', en: 'Sow: April — Harvest: September' },
    syria: { ar: 'محصول تاريخي في الجزيرة السورية', en: 'Historic crop in Al-Jazira' },
    profile: { greenRatio: [0.4, 0.75], whiteRatio: [0.05, 0.25], aspectRatio: [0.8, 2.5] },
  },
  {
    id: 'chickpea', scientific: 'Cicer arietinum', nameAr: 'حمص (حب)', nameEn: 'Chickpea',
    family: { ar: 'القرثية', en: 'Fabaceae' },
    origin: { ar: 'الشرق الأوسط', en: 'Middle East' },
    climate: { ar: 'معتدل بارد', en: 'Cool temperate' },
    watering: { ar: 'قليل — مقاوم للجفاف', en: 'Low — drought tolerant' },
    sunlight: { ar: 'شمس كاملة', en: 'Full sun' },
    soil: { ar: 'طمية خفيفة', en: 'Light loam' },
    uses: { ar: 'بروتين، حمص، فلافل', en: 'Protein, hummus, falafel' },
    season: { ar: 'الزراعة: نوفمبر', en: 'Sow: November' },
    syria: { ar: 'محصول شتوي رئيسي', en: 'Major winter legume crop' },
    profile: { greenRatio: [0.35, 0.7], yellowRatio: [0, 0.15], brightness: [70, 140] },
  },
  {
    id: 'lentil', scientific: 'Lens culinaris', nameAr: 'عدس', nameEn: 'Lentil',
    family: { ar: 'القرثية', en: 'Fabaceae' },
    origin: { ar: 'شرق البحر المتوسط', en: 'Eastern Mediterranean' },
    climate: { ar: 'بارد جاف', en: 'Cool & dry' },
    watering: { ar: 'قليل', en: 'Low' },
    sunlight: { ar: 'شمس كاملة', en: 'Full sun' },
    soil: { ar: 'أي تربة', en: 'Any soil' },
    uses: { ar: 'بقوليات، شوربة عدس', en: 'Pulses, lentil soup' },
    season: { ar: 'شتاء', en: 'Winter crop' },
    syria: { ar: 'من أقدم المحاصيل السورية', en: 'Ancient Syrian staple crop' },
    profile: { greenRatio: [0.4, 0.75], brightness: [60, 130] },
  },
  {
    id: 'eggplant', scientific: 'Solanum melongena', nameAr: 'باذنجان', nameEn: 'Eggplant',
    family: { ar: 'الباذنجانية', en: 'Solanaceae' },
    origin: { ar: 'الهند', en: 'India' },
    climate: { ar: 'حار', en: 'Hot' },
    watering: { ar: 'منتظم', en: 'Regular' },
    sunlight: { ar: 'شمس كاملة', en: 'Full sun' },
    soil: { ar: 'غنية عضوية', en: 'Rich organic' },
    uses: { ar: 'طبخ، محاشي', en: 'Cooking, stuffed dishes' },
    season: { ar: 'صيف', en: 'Summer' },
    syria: { ar: 'محصول صيفي في كل المناطق', en: 'Summer crop everywhere' },
    profile: { greenRatio: [0.2, 0.55], purpleRatio: [0.1, 0.45], darkRatio: [0.05, 0.3] },
  },
  {
    id: 'pepper', scientific: 'Capsicum annuum', nameAr: 'فلفل', nameEn: 'Pepper',
    family: { ar: 'الباذنجانية', en: 'Solanaceae' },
    origin: { ar: 'أمريكا الوسطى', en: 'Central America' },
    climate: { ar: 'دافئ', en: 'Warm' },
    watering: { ar: 'منتظم', en: 'Regular' },
    sunlight: { ar: 'شمس كاملة', en: 'Full sun' },
    soil: { ar: 'خصبة جيدة الصرف', en: 'Fertile, well-drained' },
    uses: { ar: 'توابل، خضار', en: 'Spice, vegetable' },
    season: { ar: 'صيف', en: 'Summer' },
    syria: { ar: 'محصول مهم في الساحل والداخل', en: 'Important coast & inland crop' },
    profile: { greenRatio: [0.25, 0.6], redRatio: [0.05, 0.35], yellowRatio: [0, 0.2] },
  },
  {
    id: 'cucumber', scientific: 'Cucumis sativus', nameAr: 'خيار', nameEn: 'Cucumber',
    family: { ar: 'القرعية', en: 'Cucurbitaceae' },
    origin: { ar: 'الهند', en: 'India' },
    climate: { ar: 'دافئ', en: 'Warm' },
    watering: { ar: 'كثيف', en: 'Heavy' },
    sunlight: { ar: 'شمس كاملة', en: 'Full sun' },
    soil: { ar: 'غنية رطبة', en: 'Rich & moist' },
    uses: { ar: 'سلطات، مخلل', en: 'Salads, pickles' },
    season: { ar: 'ربيع-صيف', en: 'Spring–summer' },
    syria: { ar: 'محصول صيفي في البيوت البلاستيكية', en: 'Summer greenhouse crop' },
    profile: { greenRatio: [0.45, 0.8], brightness: [90, 180] },
  },
  {
    id: 'mint', scientific: 'Mentha spicata', nameAr: 'نعناع', nameEn: 'Mint',
    family: { ar: 'الشفوية', en: 'Lamiaceae' },
    origin: { ar: 'أوروبا وآسيا', en: 'Europe & Asia' },
    climate: { ar: 'معتدل رطب', en: 'Cool & moist' },
    watering: { ar: 'كثيف', en: 'Heavy' },
    sunlight: { ar: 'جزئي إلى كامل', en: 'Partial to full sun' },
    soil: { ar: 'رطبة غنية', en: 'Moist & rich' },
    uses: { ar: 'شاي، طبخ، طب', en: 'Tea, cooking, medicine' },
    season: { ar: 'ربيع-خريف', en: 'Spring–autumn' },
    syria: { ar: 'منتشر في كل بيوت سوريا', en: 'In every Syrian home garden' },
    profile: { greenRatio: [0.5, 0.85], brightness: [70, 150], aspectRatio: [0.5, 2] },
  },
  {
    id: 'rose', scientific: 'Rosa damascena', nameAr: 'ورد دمشقي', nameEn: 'Damascus Rose',
    family: { ar: 'الوردية', en: 'Rosaceae' },
    origin: { ar: 'دمشق — سوريا', en: 'Damascus — Syria' },
    climate: { ar: 'معتدل', en: 'Temperate' },
    watering: { ar: 'معتدل', en: 'Moderate' },
    sunlight: { ar: 'شمس كاملة', en: 'Full sun' },
    soil: { ar: 'طمية غنية', en: 'Rich loam' },
    uses: { ar: 'عطور، ماء ورد، زيت ورد', en: 'Perfume, rose water, rose oil' },
    season: { ar: 'الإزهار: أيار-حزيران', en: 'Bloom: May–June' },
    syria: { ar: 'تراث دمشقي عالمي — مهرجان الورد', en: 'World heritage — Rose Festival' },
    profile: { isFlower: true, redRatio: [0.1, 0.5], pink: true, greenRatio: [0.1, 0.4] },
  },
  {
    id: 'apricot', scientific: 'Prunus armeniaca', nameAr: 'مشمش', nameEn: 'Apricot',
    family: { ar: 'الوردية', en: 'Rosaceae' },
    origin: { ar: 'آسيا الوسطى', en: 'Central Asia' },
    climate: { ar: 'قاري جاف', en: 'Dry continental' },
    watering: { ar: 'معتدل', en: 'Moderate' },
    sunlight: { ar: 'شمس كاملة', en: 'Full sun' },
    soil: { ar: 'جيدة الصرف', en: 'Well-drained' },
    uses: { ar: 'فاكهة، مجفف، قمر الدين', en: 'Fresh, dried, apricot leather' },
    season: { ar: 'الحصاد: حزيران-تموز', en: 'Harvest: June–July' },
    syria: { ar: 'مشهور في الغوطة وريف دمشق', en: 'Famous in Ghouta & Damascus countryside' },
    profile: { greenRatio: [0.2, 0.55], yellowRatio: [0.1, 0.4], redRatio: [0.05, 0.25], isFruit: true },
  },
  {
    id: 'cherry', scientific: 'Prunus avium', nameAr: 'كرز', nameEn: 'Cherry',
    family: { ar: 'الوردية', en: 'Rosaceae' },
    origin: { ar: 'أوروبا وآسيا الصغرى', en: 'Europe & Asia Minor' },
    climate: { ar: 'بارد شتاءً', en: 'Cool winter needed' },
    watering: { ar: 'معتدل', en: 'Moderate' },
    sunlight: { ar: 'شمس كاملة', en: 'Full sun' },
    soil: { ar: 'عميقة خصبة', en: 'Deep fertile' },
    uses: { ar: 'فاكهة طازجة', en: 'Fresh fruit' },
    season: { ar: 'الحصاد: أيار-حزيران', en: 'Harvest: May–June' },
    syria: { ar: 'مهم في جبال السويداء ودرعا', en: 'Important in Sweida & Daraa mountains' },
    profile: { redRatio: [0.15, 0.5], greenRatio: [0.15, 0.5], isFruit: true },
  },
  {
    id: 'tobacco', scientific: 'Nicotiana tabacum', nameAr: 'تبغ', nameEn: 'Tobacco',
    family: { ar: 'الباذنجانية', en: 'Solanaceae' },
    origin: { ar: 'أمريكا', en: 'Americas' },
    climate: { ar: 'دافئ رطب', en: 'Warm & humid' },
    watering: { ar: 'منتظم', en: 'Regular' },
    sunlight: { ar: 'شمس كاملة', en: 'Full sun' },
    soil: { ar: 'رملية خفيفة', en: 'Light sandy' },
    uses: { ar: 'صناعة تبغ', en: 'Tobacco industry' },
    season: { ar: 'صيف', en: 'Summer' },
    syria: { ar: 'محصول تاريخي في الساحل', en: 'Historic coastal crop' },
    profile: { greenRatio: [0.45, 0.8], aspectRatio: [0.6, 2], brightness: [70, 140] },
  },
  {
    id: 'sugar_beet', scientific: 'Beta vulgaris', nameAr: 'بنجر سكري', nameEn: 'Sugar Beet',
    family: { ar: 'العائقية', en: 'Amaranthaceae' },
    origin: { ar: 'أوروبا', en: 'Europe' },
    climate: { ar: 'معتدل', en: 'Temperate' },
    watering: { ar: 'مائي', en: 'Irrigated' },
    sunlight: { ar: 'شمس كاملة', en: 'Full sun' },
    soil: { ar: 'طمية عميقة', en: 'Deep loam' },
    uses: { ar: 'إنتاج سكر', en: 'Sugar production' },
    season: { ar: 'الحصاد: أيلول-تشرين', en: 'Harvest: September–October' },
    syria: { ar: 'محصول مهم في حمص وحماة', en: 'Important in Homs & Hama' },
    profile: { greenRatio: [0.4, 0.75], brightness: [80, 160] },
  },
];

export function identifyPlant(features) {
  const scores = PLANTS.map(plant => {
    let score = 0;
    const p = plant.profile;

    if (p.greenRatio) {
      const [lo, hi] = p.greenRatio;
      if (features.greenRatio >= lo && features.greenRatio <= hi) score += 25;
      else score += Math.max(0, 15 - Math.abs(features.greenRatio - (lo + hi) / 2) * 40);
    }

    if (p.yellowRatio) {
      const [lo, hi] = p.yellowRatio;
      if (features.yellowRatio >= lo && features.yellowRatio <= hi) score += 10;
    }

    if (p.redRatio) {
      const [lo, hi] = p.redRatio;
      if (features.redRatio >= lo && features.redRatio <= hi) score += 15;
    }

    if (p.purpleRatio) {
      const [lo, hi] = p.purpleRatio;
      if (features.purpleRatio >= lo && features.purpleRatio <= hi) score += 15;
    }

    if (p.whiteRatio) {
      const [lo, hi] = p.whiteRatio;
      if (features.whiteRatio >= lo && features.whiteRatio <= hi) score += 10;
    }

    if (p.isFruit && features.isFruit) score += 20;
    if (p.isFlower && features.isFlower) score += 20;
    if (p.isLeaf && features.isLeaf) score += 10;

    if (p.brightness) {
      const [lo, hi] = p.brightness;
      if (features.brightness >= lo && features.brightness <= hi) score += 10;
    }

    if (p.aspectRatio) {
      const [lo, hi] = p.aspectRatio;
      if (features.aspectRatio >= lo && features.aspectRatio <= hi) score += 8;
    }

    if (p.darkRatio) {
      const [lo, hi] = p.darkRatio;
      if (features.darkRatio >= lo && features.darkRatio <= hi) score += 12;
    }

    return { plant, score: Math.min(score, 100) };
  });

  scores.sort((a, b) => b.score - a.score);
  const top = scores[0];
  const confidence = Math.min(95, Math.max(40, top.score));

  return {
    plant: top.plant,
    confidence: Math.round(confidence),
    alternatives: scores.slice(1, 4)
      .filter(s => s.score > 20)
      .map(s => ({
        plant: s.plant,
        confidence: Math.round(Math.min(80, s.score)),
      })),
  };
}

export function getPlantById(id) {
  return PLANTS.find(p => p.id === id);
}