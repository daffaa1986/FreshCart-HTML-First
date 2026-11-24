// FreshCart — Recipe nutrition reference & estimation helpers (Phase 5A.6)
// ---------------------------------------------------------------------------
// All nutrition values shown in the UI are ESTIMATES, not laboratory results.
// Method: sum (ingredient edible grams / 100 * composition per 100 g) for every
// ingredient, then divide by the number of servings. Values are rounded for
// display (kcal/10, macros 1 decimal, sodium/10 mg).
//
// Reference basis (typical composition per 100 g edible portion):
// - TKPI (Tabel Komposisi Pangan Indonesia) for Indonesian staples, vegetables,
//   Indonesian spices/coconut products, tofu/tempeh.
// - USDA FoodData Central (Foundation/Legacy) for international ingredients,
//   meats, dairy, grains, nuts and packaged condiments.
// - Product labels / standard cooking references for condiments (soy sauce,
//   oyster sauce, fish sauce, sauces). Sodium for salted condiments is an
//   average of common brands and can vary widely.
//
// Limitations: cooking loss/gain, oil absorption and evaporation are not
// modelled. Sodium in particular depends on the exact brand used. Treat every
// number as a practical estimate for menu planning, not a clinical value.

export const NUTRITION_METHOD = {
  label: 'Estimasi berdasarkan komposisi bahan',
  references: ['TKPI (Tabel Komposisi Pangan Indonesia)', 'USDA FoodData Central', 'Rata-rata label kemasan bumbu kemasan'],
  formula: 'Σ(gram bahan ÷ 100 × komposisi per 100 g) ÷ jumlah porsi',
  disclaimer: 'Angka adalah perkiraan, bukan hasil uji laboratorium. Natrium sangat bergantung pada merk bumbu. Untuk hidangan goreng, hanya ±10% minyak menggoreng yang dihitung sebagai terserap.'
};

// grams of edible portion; kcal; protein g; carbs g; fat g; fiber g; sodium mg
// per 100 g (or per 100 ml for liquids).
export const COMPOSITION = {
  // proteins
  'dada ayam': [120, 22.5, 0, 2.6, 0, 45],
  'paha ayam': [130, 19, 0, 6, 0, 80],
  'ayam utuh': [140, 18, 0, 7, 0, 70],
  'ayam kampung': [140, 18, 0, 7, 0, 70],
  // USDA FoodData Central: Spanish mackerel, raw (proxy for tenggiri).
  'ikan tenggiri': [205, 19, 0, 14, 0, 90],
  // USDA FoodData Central: salted dried fish (sodium varies widely by brand).
  'ikan asin': [200, 30, 0, 7, 0, 3700],
  'sayap ayam': [130, 18, 0, 6, 0, 80],
  'tenderloin sapi': [135, 21, 0, 5, 0, 55],
  'sirloin sapi': [150, 20, 0, 7.5, 0, 55],
  'daging sapi giling': [170, 18, 0, 11, 0, 60],
  'daging sapi': [160, 20, 0, 8, 0, 60],
  'iga sapi': [190, 17, 0, 14, 0, 60],
  'salmon': [145, 20, 0, 6, 0, 55],
  'tuna': [130, 22, 0, 4, 0, 45],
  'udang': [85, 18, 0.2, 0.6, 0, 110],
  'cumi': [90, 16, 3, 1, 0, 140],
  'ikan merah': [110, 20, 0, 3, 0, 55],
  'kakap': [110, 20, 0, 3, 0, 55],
  'bandeng': [130, 18, 0, 6, 0, 60],
  'nila': [96, 20, 0, 1.7, 0, 52],
  'kerang': [90, 12, 4, 1, 0, 200],
  'telur': [140, 12.5, 0.7, 10, 0, 140],
  'tofu': [80, 8, 2, 5, 0.3, 8],
  'tempe': [160, 18, 8, 9, 1.5, 15],
  'kacang hijau': [105, 7, 19, 0.4, 4.3, 5],
  'kacang tanah': [567, 26, 16, 49, 8.5, 18],
  'kacang mete': [553, 18, 30, 44, 3.3, 12],
  'almond': [579, 21, 22, 50, 12.5, 1],
  'chickpea': [164, 8.9, 27, 2.6, 7.6, 7],
  // staples & grains
  'nasi putih': [130, 2.7, 28, 0.3, 0.4, 1],
  // TKPI: ketupat / compressed rice cake (same base composition as cooked rice).
  'ketupat': [130, 2.7, 28, 0.3, 0.4, 1],
  'beras': [360, 7, 80, 0.6, 1.3, 5],
  'nasi merah': [125, 2.8, 26, 0.8, 1.8, 2],
  'mi gandum': [140, 4.5, 25, 2, 1.2, 5],
  'mi beras': [110, 1, 25, 0.2, 0.5, 20],
  'terigu': [365, 10, 76, 1, 2.7, 2],
  'tepung beras': [355, 7, 80, 0.5, 1, 2],
  'tepung sagu': [355, 0.5, 86, 0.5, 0.5, 10],
  'kulit pangsit': [290, 8, 55, 4, 2, 500],
  // USDA FoodData Central: spring roll wrapper (proxy for kulit lumpia).
  'kulit lumpia': [300, 8, 55, 5, 2, 600],
  'roti': [265, 9, 49, 3.2, 2.7, 480],
  'pasta': [158, 5.8, 31, 0.9, 1.8, 1],
  'lasagna': [288, 10.5, 57, 1.5, 3, 10],
  'tortilla': [312, 8, 52, 8, 3.5, 530],
  'kentang': [77, 2, 17, 0.1, 2.2, 6],
  'oat': [389, 16.9, 66, 6.9, 10.6, 2],
  // vegetables
  'wortel': [41, 0.9, 10, 0.2, 2.8, 69],
  'tomat': [18, 0.9, 3.9, 0.2, 1.2, 5],
  'tomat ceri': [20, 1, 4, 0.2, 1.2, 5],
  'bayam': [23, 2.9, 3.6, 0.4, 2.2, 79],
  'brokoli': [34, 2.8, 7, 0.4, 2.6, 33],
  'selada': [15, 1.4, 2.9, 0.2, 1.3, 28],
  'timun': [15, 0.7, 3.6, 0.1, 0.5, 2],
  'kubis': [25, 1.3, 5.8, 0.1, 2.5, 18],
  'kol': [25, 1.3, 5.8, 0.1, 2.5, 18],
  // USDA FoodData Central: bamboo shoots, raw.
  'rebung': [27, 2.6, 5.2, 0.3, 3.8, 4],
  // TKPI: nangka muda (young jackfruit), boiled.
  'nangka muda': [30, 1.2, 6, 0.2, 1.5, 5],
  'tauge': [30, 3, 5, 0.2, 1.5, 10],
  'buncis': [31, 1.8, 7, 0.2, 2.7, 6],
  'kangkung': [29, 2.2, 4.7, 0.2, 1.5, 40],
  'jagung': [86, 3.3, 19, 1.4, 2.7, 15],
  'zucchini': [17, 1.2, 3.1, 0.3, 1, 8],
  'soun': [350, 0.5, 86, 0.2, 0.5, 20],
  'terong': [25, 1, 6, 0.2, 3, 2],
  'jamur': [22, 3.1, 3.3, 0.3, 1, 5],
  'bawang merah': [72, 2.5, 17, 0.1, 2.4, 9],
  'bawang bombai': [40, 1.1, 9.3, 0.1, 1.7, 4],
  'bawang putih': [149, 6.4, 33, 0.5, 2.1, 17],
  'bawang goreng': [500, 10, 20, 40, 2, 300],
  'cabai': [40, 1.9, 9, 0.4, 1.5, 7],
  'cabai rawit': [40, 2, 9, 0.4, 1.5, 7],
  'paprika': [31, 1, 6, 0.3, 2.1, 4],
  'jahe': [80, 1.8, 18, 0.8, 2, 13],
  'kunyit': [81, 1.5, 19, 0.6, 3, 12],
  'lengkuas': [70, 1, 17, 0.3, 2, 10],
  'serai': [50, 0.5, 13, 0.2, 2, 5],
  'daun jeruk': [50, 1, 10, 0.5, 2, 5],
  'daun salam': [50, 1, 10, 0.5, 2, 5],
  'daun bawang': [35, 2, 7, 0.2, 2, 15],
  'seledri': [20, 1, 3, 0.2, 1.3, 30],
  'kemangi': [23, 3, 3, 0.4, 1.5, 10],
  'rosemary': [131, 3, 25, 6, 11, 7],
  'kencur': [96, 2, 21, 0.8, 3, 20],
  'kluwek': [200, 5, 20, 10, 5, 20],
  'terasi': [350, 25, 5, 25, 0, 3000],
  'cengkeh': [274, 6, 66, 13, 34, 77],
  'pala': [525, 7, 49, 36, 20, 16],
  'asam jawa': [90, 1, 20, 0.1, 3, 10],
  'jeruk nipis': [30, 0.7, 11, 0.2, 2.8, 2],
  'lemon': [29, 1.1, 9, 0.3, 2.8, 2],
  'limau kaffir': [30, 0.7, 11, 0.2, 2.8, 2],
  'lada': [251, 10, 64, 3.3, 25, 20],
  'ketumbar': [298, 12, 55, 11, 12, 35],
  'jintan': [375, 18, 44, 22, 11, 168],
  'kayu manis': [247, 4, 81, 1.2, 53, 10],
  'kapulaga': [311, 11, 68, 7, 20, 9],
  'paprika bubuk': [282, 14, 54, 13, 35, 53],
  'garam masala': [341, 13, 54, 15, 10, 20],
  // fruit
  'alpukat': [160, 2, 8.5, 14.7, 6.7, 7],
  'pisang': [89, 1.1, 23, 0.3, 2.6, 1],
  'apel': [52, 0.3, 14, 0.2, 2.4, 1],
  'jeruk': [47, 0.9, 12, 0.1, 2.4, 0],
  'mangga': [60, 0.8, 15, 0.4, 1.6, 1],
  'stroberi': [32, 0.7, 7.7, 0.3, 2, 1],
  'pepaya': [43, 0.5, 11, 0.3, 1.7, 8],
  'anggur': [69, 0.7, 18, 0.2, 0.9, 2],
  'kismis': [299, 3, 79, 0.5, 3.7, 11],
  'olive': [115, 0.8, 6, 11, 1.6, 735],
  // dairy & fats
  'susu uht': [61, 3.2, 4.8, 3.3, 0, 45],
  'susu segar': [64, 3.3, 4.8, 3.6, 0, 43],
  'susu rendah lemak': [42, 3.4, 5, 1, 0, 50],
  'yogurt': [59, 10, 3.6, 0.4, 0, 36],
  'keju cheddar': [403, 25, 1.3, 33, 0, 620],
  'keju mozzarella': [300, 22, 2, 22, 0, 600],
  'keju parmesan': [431, 38, 4, 29, 0, 1600],
  'keju feta': [264, 14, 4, 21, 0, 1116],
  'tahini': [595, 17, 21, 54, 9, 115],
  'nori': [35, 6, 5, 0.3, 0.3, 48],
  'wasabi': [66, 5, 10, 4, 4, 20],
  'teriyaki': [150, 2, 30, 0, 0, 3000],
  'saus barbecue': [150, 1, 35, 0.5, 1, 900],
  'susu kedelai': [33, 2.6, 2.9, 1.6, 0.6, 30],
  'mentega': [717, 0.9, 0.1, 81, 0, 650],
  'santan': [200, 2, 4, 20, 0.5, 15],
  'kelapa parut': [350, 3.3, 15, 33, 9, 20],
  'minyak goreng': [884, 0, 0, 100, 0, 0],
  'minyak zaitun': [884, 0, 0, 100, 0, 2],
  'minyak wijen': [884, 0, 0, 100, 0, 0],
  'krim': [340, 2.8, 2.8, 36, 0, 27],
  // condiments & others
  'gula pasir': [387, 0, 100, 0, 0, 1],
  'gula merah': [380, 0, 98, 0, 0, 20],
  'madu': [304, 0.3, 82, 0, 0.2, 4],
  'garam': [0, 0, 0, 0, 0, 38758],
  'kecap asin': [60, 8, 5, 0.5, 0.8, 5500],
  'saus tiram': [80, 2, 17, 0.2, 0, 4000],
  'saus ikan': [35, 4, 1, 0, 0, 30000],
  'saus tomat': [82, 1.4, 19, 0.2, 0.6, 900],
  'saus sambal': [110, 1, 25, 0.5, 1, 2000],
  'mayones': [680, 1, 2, 75, 0, 500],
  'mustard': [66, 4, 5, 3.5, 1.3, 1100],
  'tahu': [80, 8, 2, 5, 0.3, 8],
  'cuka': [20, 0, 0.5, 0, 0, 5],
  'cuka beras': [18, 0, 0.5, 0, 0, 5],
  'mirin': [258, 0.2, 64, 0, 0, 20],
  'sake': [134, 0.5, 5, 0, 0, 2],
  'miso': [199, 12, 26, 6, 5.4, 3728],
  'kimchi': [23, 1.4, 4.9, 0.4, 1.3, 499],
  'gochujang': [201, 5, 43, 1, 3, 2000],
  'kecap manis': [265, 1, 68, 0, 0, 800],
  'tapai': [150, 2, 34, 0.5, 1, 10],
  'air': [0, 0, 0, 0, 0, 0],
  'kopi': [2, 0.3, 0, 0, 0, 2],
  'teh': [1, 0, 0.2, 0, 0, 1],
  'chia': [486, 17, 42, 31, 34, 16],
  'wijen': [573, 18, 23, 50, 11.8, 11],
  'selai kacang': [588, 25, 20, 50, 6, 400],
  'ragi': [325, 10, 60, 1, 5, 10],
  'bubuk baking': [53, 0, 28, 0, 0, 10600],
  'vanili': [288, 0.1, 13, 0.1, 0, 9],
  'kakao': [228, 20, 57, 14, 33, 3],
  'kulit ayam': [440, 15, 0, 42, 0, 80],
  'remah roti': [395, 13, 72, 5, 4, 600],
  'ham': [145, 18, 1, 7, 0, 1000],
  'air kelapa': [19, 0.4, 3.4, 0.3, 0, 20]
};

/** Ingredient shorthand. grams = edible weight used for nutrition estimation. */
export const ing = (name, qty, unit, grams, productId = null) => ({ name, qty, unit, grams, productId });

function matchKey(name) {
  const n = name.toLowerCase();
  if (COMPOSITION[n]) return n;
  const keys = Object.keys(COMPOSITION);
  // Prefer the longest matching key to avoid "ayam" matching every chicken cut.
  const found = keys.filter((k) => n.includes(k)).sort((a, b) => b.length - a.length)[0];
  return found || null;
}

/**
 * Names of ingredients that have no composition entry. Returned explicitly so
 * the UI can show "data belum tersedia" instead of silently under-counting.
 */
export function unmappedIngredients(ingredients) {
  return [...new Set(ingredients.filter((item) => !matchKey(item.name)).map((item) => item.name))];
}

/** Estimate nutrition per serving from ingredient quantities. */
export function estimateNutrition(ingredients, servings) {
  const total = { kcal: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sodium: 0 };
  for (const item of ingredients) {
    const key = matchKey(item.name);
    if (!key || !item.grams) continue;
    const [kcal, protein, carbs, fat, fiber, sodium] = COMPOSITION[key];
    const factor = item.grams / 100;
    total.kcal += kcal * factor;
    total.protein += protein * factor;
    total.carbs += carbs * factor;
    total.fat += fat * factor;
    total.fiber += fiber * factor;
    total.sodium += sodium * factor;
  }
  const s = Math.max(1, servings || 1);
  const round1 = (v) => Math.round(v * 10) / 10;
  return {
    calories: Math.round(total.kcal / s / 10) * 10,
    protein: round1(total.protein / s),
    carbs: round1(total.carbs / s),
    fat: round1(total.fat / s),
    fiber: round1(total.fiber / s),
    sodium: Math.round(total.sodium / s / 10) * 10
  };
}

/** Finalise a recipe: derive time + nutrition, keep all content fields. */
export const recipe = (data) => ({
  ...data,
  totalTime: data.prepTime + data.cookTime,
  nutrition: estimateNutrition(data.ingredients, data.servings),
  nutritionUnavailable: unmappedIngredients(data.ingredients),
  image: data.image || null,
  featured: Boolean(data.featured),
  substitutions: data.substitutions || [],
  allergens: data.allergens || [],
  storage: data.storage || 'Simpan dalam wadah tertutup di kulkas maksimal 2 hari; panaskan kembali hingga matang.'
});
