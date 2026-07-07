/**
 * Plant disease knowledge base — Mediterranean/Syrian crops.
 * Used by expert-system diagnosis engine.
 */

export const DISEASES = [
  {
    id: 'powdery_mildew',
    name: { ar: 'البياض الدقيقي', en: 'Powdery Mildew' },
    plants: ['grape', 'cucumber', 'wheat', 'rose', 'tomato'],
    symptoms: {
      ar: ['بياض على الأوراق', 'مسحوق أبيض', 'أوراق بيضاء', 'بياض دقيقي', 'طبقة بيضاء'],
      en: ['white on leaves', 'white powder', 'white leaves', 'powdery', 'white coating', 'white patches'],
    },
    visual: ['hasMildew', 'whiteRatio'],
    cause: { ar: 'فطر Erysiphales — رطوبة عالية وتهوية ضعيفة', en: 'Fungus Erysiphales — high humidity & poor ventilation' },
    solution: {
      organic: { ar: 'رذاذ محلول بيكربونات الصوديوم (ملعقة في لتر ماء) + صابون. رذاذ الحليب المخفف 1:10', en: 'Spray baking soda solution (1 tbsp/L water) + soap. Diluted milk spray 1:10' },
      chemical: { ar: 'كبريت قابل للعبور أو زيت نيم كل 7-10 أيام', en: 'Penetrating sulfur or neem oil every 7-10 days' },
    },
    prevention: { ar: 'تهوية جيدة، تجنب الري على الأوراق، إزالة الأوراق المصابة', en: 'Good ventilation, avoid overhead watering, remove infected leaves' },
    severity: 'medium',
  },
  {
    id: 'leaf_spot',
    name: { ar: 'تبقع الأوراق', en: 'Leaf Spot' },
    plants: ['tomato', 'pepper', 'olive', 'citrus'],
    symptoms: {
      ar: ['بقع بنية', 'بقع سوداء', 'بقع على الأوراق', 'دوائر بنية', 'نقاط بنية'],
      en: ['brown spots', 'black spots', 'spots on leaves', 'brown circles', 'dark spots', 'spots'],
    },
    visual: ['hasSpots', 'brownRatio'],
    cause: { ar: 'فطريات Alternaria أو Septoria — رطوبة ورش أوراق', en: 'Fungi Alternaria or Septoria — moisture & leaf wetness' },
    solution: {
      organic: { ar: 'إزالة الأوراق المصابة وحرقها. رذاذ خل التفاح المخفف', en: 'Remove & burn infected leaves. Diluted apple cider vinegar spray' },
      chemical: { ar: 'مبيد فطري نحاسي (أوكسي كلوريد النحاس)', en: 'Copper-based fungicide (copper oxychloride)' },
    },
    prevention: { ar: 'الري عند قاعدة النبات، تباعد الزراعة، تناوب المحاصيل', en: 'Water at base, proper spacing, crop rotation' },
    severity: 'medium',
  },
  {
    id: 'chlorosis',
    name: { ar: 'الكلوروز (اصفرار الأوراق)', en: 'Chlorosis (Leaf Yellowing)' },
    plants: ['citrus', 'olive', 'grape', 'tomato', 'apricot'],
    symptoms: {
      ar: ['اصفرار', 'أوراق صفراء', 'تصفير', 'اصفرار الأوراق', 'سقوط أوراق', 'أوراق شاحبة'],
      en: ['yellowing', 'yellow leaves', 'pale leaves', 'leaves turning yellow', 'leaf drop', 'pale', 'chlorosis'],
    },
    visual: ['hasChlorosis', 'yellowRatio', 'isWilted'],
    cause: { ar: 'نقص حديد أو نيتروجين — تربة قلوية أو ري زائد', en: 'Iron or nitrogen deficiency — alkaline soil or overwatering' },
    solution: {
      organic: { ar: 'رش حديد مخلبي على الأوراق. إضافة كومبوست وسماد عضوي', en: 'Foliar spray chelated iron. Add compost & organic fertilizer' },
      chemical: { ar: 'سماد NPK متوازن مع مكمل حديد Fe-EDDHA', en: 'Balanced NPK fertilizer with Fe-EDDHA iron supplement' },
    },
    prevention: { ar: 'فحص pH التربة، ري منتظم بدون غمر، تسميد دوري', en: 'Check soil pH, regular watering without waterlogging, periodic fertilizing' },
    severity: 'low',
  },
  {
    id: 'root_rot',
    name: { ar: 'تعفن الجذور', en: 'Root Rot' },
    plants: ['tomato', 'pepper', 'cucumber', 'citrus', 'olive'],
    symptoms: {
      ar: ['ذبول', 'نبات ذابل', 'جذور سوداء', 'ري زائد', 'تعفن', 'ذبول رغم الري'],
      en: ['wilting', 'plant wilting', 'black roots', 'overwatering', 'rot', 'wilting despite water', 'wilt', 'droop'],
    },
    visual: ['isWilted', 'brownRatio', 'darkRatio'],
    cause: { ar: 'فطريات Phytophthora أو Fusarium — تصريف سيء وري مفرط', en: 'Phytophthora or Fusarium fungi — poor drainage & overwatering' },
    solution: {
      organic: { ar: 'تقليل الري فوراً. إضافة Trichoderma للتربة. تحسين التصريف', en: 'Reduce watering immediately. Add Trichoderma to soil. Improve drainage' },
      chemical: { ar: 'مبيد فطري سسيستمي (فوسيتيل ألومنيوم)', en: 'Systemic fungicide (fosetyl-aluminium)' },
    },
    prevention: { ar: 'تصريف ممتاز، تجنب الغمر، تعقيم التربة', en: 'Excellent drainage, avoid waterlogging, soil sterilization' },
    severity: 'high',
  },
  {
    id: 'rust',
    name: { ar: 'صدأ الأوراق', en: 'Leaf Rust' },
    plants: ['wheat', 'olive', 'rose'],
    symptoms: {
      ar: ['بقع صدئية', 'برتقالي', 'بقع برتقالية', 'صدأ', 'بقع حمراء برتقالية'],
      en: ['rust spots', 'orange spots', 'orange pustules', 'rust', 'reddish orange', 'orange'],
    },
    visual: ['hasRust', 'redRatio'],
    cause: { ar: 'فطريات Puccinia — رطوبة ليلية وحرارة معتدلة', en: 'Puccinia fungi — night humidity & moderate temperature' },
    solution: {
      organic: { ar: 'إزالة الأوراق المصابة. رذاذ كبريت أو بورdeaux mixture', en: 'Remove infected leaves. Sulfur or Bordeaux mixture spray' },
      chemical: { ar: 'مبيدات صدأ تجارية (تيبوكونازول)', en: 'Commercial rust fungicides (tebuconazole)' },
    },
    prevention: { ar: 'أصناف مقاومة، تجنب الري المسائي، تباعد الزراعة', en: 'Resistant varieties, avoid evening irrigation, proper spacing' },
    severity: 'medium',
  },
  {
    id: 'aphids',
    name: { ar: 'حشرة المن', en: 'Aphids' },
    plants: ['tomato', 'pepper', 'cucumber', 'citrus', 'rose', 'apricot'],
    symptoms: {
      ar: ['حشرات صغيرة', 'أوراق ملتفة', 'إفرازات لزجة', 'من', 'حشرات خضراء', 'حشرات سوداء'],
      en: ['small insects', 'curled leaves', 'sticky secretion', 'aphids', 'green insects', 'bugs', 'insects', 'pests'],
    },
    visual: ['greenRatio'],
    cause: { ar: 'حشرة المن Aphididae — انتشار سريع في الربيع', en: 'Aphididae insects — rapid spread in spring' },
    solution: {
      organic: { ar: 'رذاذ ماء بقوة لإزالتها. زيت نيم. جذب دعسوقة (Ladybugs)', en: 'Strong water spray to dislodge. Neem oil. Attract ladybugs' },
      chemical: { ar: 'مبيد حشري (إيميداكلوبرايد) بحذر', en: 'Insecticide (imidacloprid) with caution' },
    },
    prevention: { ar: 'فحص دوري، نباتات طاردة طبيعية (نبات البابونج)', en: 'Regular inspection, companion plants (marigold)' },
    severity: 'low',
  },
  {
    id: 'blight',
    name: { ar: 'اللفحة المتأخرة', en: 'Late Blight' },
    plants: ['tomato', 'eggplant', 'pepper'],
    symptoms: {
      ar: ['بقع مائية', 'ذبول سريع', 'بقع داكنة', 'عفن', 'لفحة', 'بقع سوداء كبيرة'],
      en: ['water soaked spots', 'rapid wilting', 'dark patches', 'mold', 'blight', 'large dark spots', 'dying'],
    },
    visual: ['hasBlight', 'brownRatio', 'darkRatio'],
    cause: { ar: 'فطر Phytophthora infestans — برد ورطوبة عالية', en: 'Phytophthora infestans — cool & high humidity' },
    solution: {
      organic: { ar: 'إزالة النباتات المصابة فوراً. رذاذ بورdeaux. لا ت compost المصاب', en: 'Remove infected plants immediately. Bordeaux spray. Do not compost infected material' },
      chemical: { ar: 'مبيد فطري نحاسي وقائي قبل ظهور الأعراض', en: 'Preventive copper fungicide before symptoms appear' },
    },
    prevention: { ar: 'أصناف مقاومة، تجنب الري على الأوراق مساءً', en: 'Resistant varieties, avoid evening leaf wetness' },
    severity: 'critical',
  },
  {
    id: 'olive_knot',
    name: { ar: 'تورم الزيتون', en: 'Olive Knot Disease' },
    plants: ['olive'],
    symptoms: {
      ar: ['تورمات على الأغصان', 'عقد', 'تورم', 'جروح على الخشب', 'أغصان منتفخة'],
      en: ['swellings on branches', 'knots', 'galls', 'wounds on wood', 'swollen branches', 'tumor'],
    },
    visual: ['isWoody', 'brownRatio'],
    cause: { ar: 'بكتيريا Pseudomonas savastanoi — دخول عبر جروح', en: 'Pseudomonas savastanoi bacteria — enters through wounds' },
    solution: {
      organic: { ar: 'تقليم الأغصان المصابة في الشتاء وتعقيم الجروح بالنحاس', en: 'Prune infected branches in winter, disinfect wounds with copper' },
      chemical: { ar: 'رش وقائي بالنحاس بعد التقليم', en: 'Preventive copper spray after pruning' },
    },
    prevention: { ar: 'تعقيم أدوات التقليم، التقليم في الجفاف', en: 'Sterilize pruning tools, prune during dry weather' },
    severity: 'medium',
  },
  {
    id: 'citrus_greening',
    name: { ar: 'الأخضر الزيتي (الحشرة)', en: 'Citrus Greening (HLB)' },
    plants: ['citrus'],
    symptoms: {
      ar: ['أوراق أصفر غير متساو', 'ثمار صغيرة ملونة', 'طعم مر', 'حموضة', 'شجرة ضعيفة'],
      en: ['uneven yellow leaves', 'small misshapen fruit', 'bitter taste', 'acidic', 'weak tree', 'mottled'],
    },
    visual: ['hasChlorosis', 'yellowRatio'],
    cause: { ar: 'بكتيريا Candidatus Liberibacter — ينتقل عبر حشرة الحلمان', en: 'Candidatus Liberibacter — transmitted by psyllid insect' },
    solution: {
      organic: { ar: 'إتلاف الأشجار المصابة. مكافحة حشرة الحلمان بزيت نيم', en: 'Destroy infected trees. Control psyllid with neem oil' },
      chemical: { ar: 'مبيدات حشرية لحشرة الحلمان (أسيتاميبريد)', en: 'Insecticides for psyllid (acetamiprid)' },
    },
    prevention: { ar: 'أشجار معتمدة خالية من الأمراض، مصائد حشرية', en: 'Certified disease-free trees, insect traps' },
    severity: 'critical',
  },
  {
    id: 'drought_stress',
    name: { ar: 'إجهاد الجفاف', en: 'Drought Stress' },
    plants: ['wheat', 'olive', 'grape', 'almond', 'chickpea'],
    symptoms: {
      ar: ['ذبول', 'أوراق جافة', 'تجعد', 'جفاف', 'سقوط أوراق', 'نبات هزيل', 'قلة ماء'],
      en: ['wilting', 'dry leaves', 'curling', 'drought', 'leaf drop', 'thin plant', 'lack of water', 'dry', 'shrivel'],
    },
    visual: ['isWilted', 'brownRatio', 'yellowRatio'],
    cause: { ar: 'نقص المياه — ري غير كافٍ أو جفاف شديد', en: 'Water deficit — insufficient irrigation or severe drought' },
    solution: {
      organic: { ar: 'ري عميق وبطيء في الصباح الباكر. تغطية التربة (mulch) للحفاظ على الرطوبة', en: 'Deep slow morning irrigation. Mulch soil to retain moisture' },
      chemical: { ar: 'مادة حافظة للرطوبة (hydrogel) في التربة', en: 'Soil moisture-retaining hydrogel' },
    },
    prevention: { ar: 'جدول ري منتظم، تغطية التربة، اختيار أصناف مقاومة للجفاف', en: 'Regular irrigation schedule, mulching, drought-resistant varieties' },
    severity: 'medium',
  },
  {
    id: 'nitrogen_deficiency',
    name: { ar: 'نقص النيتروجين', en: 'Nitrogen Deficiency' },
    plants: ['wheat', 'tomato', 'cotton', 'corn', 'cucumber'],
    symptoms: {
      ar: ['اصفرار قديم الأوراق', 'نمو بطيء', 'أوراق صغيرة', 'شحوب عام', 'ضعف النمو'],
      en: ['old leaves yellowing', 'slow growth', 'small leaves', 'general paleness', 'stunted growth', 'pale', 'weak growth'],
    },
    visual: ['hasChlorosis', 'yellowRatio'],
    cause: { ar: 'نقص النيتروجين في التربة — تسميد غير كافٍ', en: 'Nitrogen deficiency in soil — insufficient fertilization' },
    solution: {
      organic: { ar: 'سماد عضوي (كومبوست، سماد دجاج). زراعة بقوليات للتثبيت', en: 'Organic fertilizer (compost, chicken manure). Plant legumes for fixation' },
      chemical: { ar: 'يوريا أو نترات الأمونيوم (50-100 كغ/هكتار)', en: 'Urea or ammonium nitrate (50-100 kg/hectare)' },
    },
    prevention: { ar: 'تحليل تربة سنوي، تسميد منتظم حسب المرحلة', en: 'Annual soil analysis, regular stage-appropriate fertilizing' },
    severity: 'low',
  },
  {
    id: 'sunburn',
    name: { ar: 'حرق الشمس', en: 'Sunburn / Heat Stress' },
    plants: ['tomato', 'pepper', 'cucumber', 'citrus'],
    symptoms: {
      ar: ['بقع بيضاء على الثمار', 'أوراق محترقة', 'تشقق ثمار', 'حرارة', 'شمس قوية'],
      en: ['white patches on fruit', 'scorched leaves', 'fruit cracking', 'heat', 'strong sun', 'sunburn', 'scorched'],
    },
    visual: ['whiteRatio', 'yellowRatio'],
    cause: { ar: 'تعرض مباشر لأشعة شمس حادة — نقص تظليل', en: 'Direct intense sunlight — lack of shading' },
    solution: {
      organic: { ar: 'شبكة تظليل 30-50%. ري في الصباح والمساء', en: '30-50% shade net. Morning & evening irrigation' },
      chemical: { ar: 'رش كاولين (طين أبيض) وقائي على الأوراق', en: 'Preventive kaolin clay spray on leaves' },
    },
    prevention: { ar: 'تظليل في الصيف، ري كافٍ، تغطية التربة', en: 'Summer shading, adequate irrigation, soil mulching' },
    severity: 'low',
  },
];