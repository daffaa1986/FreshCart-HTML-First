// FreshCart — International recipes (Phase 5A.6). 30 entries: 4 preserved
// sample recipes + 26 new recipes across Asia, Europe, Americas & Mediterranean.
import { ing, recipe } from './recipe-composition.js';

export const internationalRecipes = [
  // ============ PRESERVED SAMPLE RECIPES (4) ============
  recipe({
    id: 201, slug: 'avocado-toast',
    name: 'Avocado Toast', country: 'Amerika Serikat', region: 'Modern café / Australia-US', cuisine: 'international',
    meal: ['breakfast', 'healthy'], featured: true,
    description: 'Roti gandum panggang dengan alpukat mentega, telur rebus dan taburan cabai bubuk.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQ570ux6O7QZxYIpPjooFICrH3_uFOu-LyTEy1aIBKhFyjWYEjYaLrgB-ceQZkm4EQIXQWhKg3KkNFiyiHycEIks2RAkM-UfrRRknxFmUoLBXXjvX7Cgy6w-kqsEC1gT5bMPb7G0a4JpsqoQAP7-u-6brXOPmWKUk0FI2miLo0xOCypHymGNFJ0SOm2sECOR7JTDhOBOYxlSD81ZKhh1aBNQk6RrGaAPIsgtR7rsBNAWNKxK-6NQHtVg',
    servings: 2, servingSize: '1 potong roti (± 150 g)', prepTime: 8, cookTime: 4, difficulty: 'Mudah',
    equipment: ['Pemanggang roti / wajan', 'Garpu', 'Pisau', 'Mangkuk kecil'],
    ingredients: [
      ing('Roti gandum', 2, 'lembar', 120), // roti tidak tersedia di katalog (tepung bukan pengganti)
      ing('Alpukat', 1, 'buah', 150, 204),
      ing('Telur', 2, 'butir', 100, 223),
      ing('Minyak zaitun', 1, 'sdt', 5),
      ing('Cabai bubuk', 0.25, 'sdt', 1),
      ing('Garam', 0.25, 'sdt', 1, 237),
      ing('Lemon', 0.5, 'buah', 15)
    ],
    steps: [
      'Panggang roti sampai keemasan. Rebus telur 7 menit lalu kupas dan belah dua.',
      'Lumatkan alpukat dengan garam, minyak zaitun dan air lemon.',
      'Oleskan alpukat di atas roti hangat.',
      'Tata telur rebus di atasnya, taburi cabai bubuk dan sedikit lada.'
    ],
    plating: 'Sajikan segera dengan daun selada atau tomat ceri di samping.',
    substitutions: ['Roti gandum diganti roti sourdough', 'Telur rebus diganti telur mata sapi'],
    allergens: ['Gandum', 'Telur'],
    storage: 'Alpukat yang sudah dilumat sebaiknya segera dimakan; beri air lemon untuk mencegah kecoklatan.'
  }),
  recipe({
    id: 202, slug: 'steak-sapi-tenderloin',
    name: 'Steak Sapi Tenderloin', country: 'Prancis', region: 'Eropa Barat (klasik steakhouse)', cuisine: 'international',
    meal: ['dinner'],
    description: 'Tenderloin segar dimarinasi sederhana, dipanggang medium rare.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7qPrZzLpFBWoYvEC23EHm17agy78fFHeU861kLjJzbthKZk-bdCNZ8ABVAMkWxTpKCHG9j0pYzO_qZlHNLyX5G-Dw2EAs2Q8ZAh_-iKoBWpxRMgzZC0RrajPG61t-TMyI9AjLFNIy-R25VfxGFunvl7Z32wyIytL2UNsH8PwLAiIQVARVQoymhyrDwpgv7WBFOpdxnZ1ozoWC5LEXANJ3SiT2bPY6H8ifWEX4ESxZW5gTeJmI6r3K5g',
    servings: 2, servingSize: '1 steak (± 200 g)', prepTime: 35, cookTime: 12, difficulty: 'Sedang',
    equipment: ['Wajan anti lengket / grill pan', 'Tongs', 'Termometer daging (opsional)', 'Pisau Tajam'],
    ingredients: [
      ing('Tenderloin sapi', 400, 'g', 400, 211),
      ing('Bawang putih', 2, 'siung', 10),
      ing('Rosemary', 2, 'ranting', 4),
      ing('Minyak zaitun', 2, 'sdm', 20),
      ing('Mentega', 20, 'g', 20, 227),
      ing('Garam', 1, 'sdt', 4, 237),
      ing('Lada hitam', 0.75, 'sdt', 3)
    ],
    steps: [
      'Keluarkan daging dari kulkas 30 menit sebelum dimasak. Keringkan dengan kertas tisu.',
      'Lumuri minyak zaitun, bawang putih cincang, rosemary, garam dan lada; diamkan 20 menit.',
      'Panaskan wajan sampai sangat panas. Panggang steak 3–4 menit per sisi untuk medium rare.',
      'Tambahkan mentega di akhir, siram ke atas steak (basting) selama 1 menit.',
      'Diamkan 5 menit sebelum diiris agar cairan daging tidak keluar.'
    ],
    plating: 'Iris melawan serat, tata di piring hangat dengan sayur panggang atau salad.',
    substitutions: ['Tenderloin diganti sirloin (id 212)', 'Rosemary diganti thyme'],
    allergens: ['Susu (mentega)'],
    storage: 'Steak matang sebaiknya dikonsumsi segera. Sisa daging tahan 2 hari di kulkas.'
  }),
  recipe({
    id: 203, slug: 'smoothie-bowl-alpukat-susu',
    name: 'Smoothie Bowl Alpukat & Susu Segar', country: 'Australia', region: 'Modern healthy café', cuisine: 'international',
    meal: ['breakfast', 'healthy'], featured: true,
    description: 'Sarapan padat nutrisi kaya lemak baik dan antioksidan.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlfAGVC8bRNHtgtP1lTHKwyLiakU5BhI-ni3mwE1MpHRwZLcQhPdlgwzqLFA3Iemp3xzAlTLz4EEHhZNoDb6qSJLWOL_XkHuKWaQpyaTAlW8Ehe5o6GRZxp-v8pZSRL6zgT1Oa8DCk4DD4hZOgrh24DifXkrRdQxjGXCbSWBkK381c1ktGz-uFbuaeZHhTVdnsF947ohhGjutGLE9etbZ8bVHK7URdZx3z3BA_e5WMdkZr_IM3349Raw',
    servings: 2, servingSize: '1 mangkuk (± 300 ml)', prepTime: 10, cookTime: 0, difficulty: 'Mudah',
    equipment: ['Blender', 'Mangkuk saji', 'Sendok'],
    ingredients: [
      ing('Alpukat', 1, 'buah', 150, 204),
      ing('Susu segar', 250, 'ml', 250, 222),
      ing('Pisang', 1, 'buah', 120, 203),
      ing('Chia seeds', 1, 'sdm', 12),
      ing('Madu', 1, 'sdt', 7),
      ing('Stroberi', 50, 'g', 50, 207)
    ],
    steps: [
      'Kupas alpukat dan pisang, potong kecil.',
      'Masukkan blender bersama susu segar dan madu, haluskan sampai lembut.',
      'Tuang ke mangkuk, taburi chia seeds dan stroberi potong.',
      'Sajikan segera agar warna tetap segar.'
    ],
    plating: 'Tata buah di atas bowl membentuk pola warna, beri chia dan madu ekstra sesuai selera.',
    substitutions: ['Susu segar diganti susu kedelai (id 246)', 'Pisang diganti mangga (id 205)'],
    allergens: ['Susu'],
    storage: 'Smoothie sebaiknya segera dikonsumsi; simpan maksimal 1 hari di kulkas dalam wadah tertutup.'
  }),
  recipe({
    id: 204, slug: 'salad-sayuran-segar',
    name: 'Salad Sayuran Segar', country: 'Yunani', region: 'Mediterania', cuisine: 'international',
    meal: ['lunch', 'healthy'],
    description: 'Brokoli, selada dan tomat ceri dengan dressing minyak zaitun.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_LJ8goYQA0FYg6xSc5ZgXK60PxE06K8axoShychGOPK0Yq7mlD2rtyOfNgz8bW3Kte7JIsn7PAMYAR3aLqAHczGhUl_XViFeXxb0qE_QcU37ZF4JbBF7YjeAlkD3BD8medmCDgWmHXyyyr3tCWfCZoGf_Px8JuCVsO--ZrCRSfCz-hrUHWWOo3rjmBLkLkX_hxAoEabqVCNv0nLYWsE3eOnLvrRYbjcpUJeeuNK1g5NtGlzS9-p7-nQ',
    servings: 2, servingSize: '1 mangkuk (± 200 g)', prepTime: 12, cookTime: 3, difficulty: 'Mudah',
    equipment: ['Panci rebus', 'Mangkuk besar', 'Saringan'],
    ingredients: [
      ing('Brokoli', 150, 'g', 150, 107),
      ing('Selada romaine', 100, 'g', 100, 104),
      ing('Tomat ceri', 100, 'g', 100, 103),
      ing('Minyak zaitun', 2, 'sdm', 20),
      ing('Lemon', 0.5, 'buah', 15),
      ing('Garam', 0.25, 'sdt', 1, 237),
      ing('Lada hitam', 0.25, 'sdt', 1)
    ],
    steps: [
      'Rebus brokoli 2–3 menit sampai renyah, angkat dan dinginkan dengan air es.',
      'Cuci selada dan tomat ceri, potong sesuai selera.',
      'Campur minyak zaitun, air lemon, garam dan lada sebagai dressing.',
      'Aduk semua sayur dengan dressing, sajikan segera.'
    ],
    plating: 'Tata di mangkuk lebar, beri irisan lemon dan lada hitam di atas.',
    substitutions: ['Brokoli diganti kembang kol', 'Lemon diganti cuka balsamic'],
    allergens: ['Tidak ada alergen utama'],
    storage: 'Salad sebaiknya segera dikonsumsi. Dressing bisa disimpan 3 hari di kulkas.'
  }),

  // ============ JAPAN (3) ============
  recipe({
    id: 205, slug: 'chicken-teriyaki',
    name: 'Chicken Teriyaki', country: 'Jepang', region: 'Jepang (masakan rumahan)', cuisine: 'international',
    meal: ['lunch', 'dinner'],
    description: 'Ayam glasir manis-asam khas Jepang dengan kecap asin, mirin dan sake.',
    image: null,
    servings: 3, servingSize: '1 porsi (± 180 g)', prepTime: 15, cookTime: 20, difficulty: 'Mudah',
    equipment: ['Wajan anti lengket', 'Spatula', 'Mangkuk adonan'],
    ingredients: [
      ing('Dada ayam', 450, 'g', 450, 213),
      ing('Kecap asin', 3, 'sdm', 45),
      ing('Mirin', 3, 'sdm', 45),
      ing('Sake', 2, 'sdm', 30),
      ing('Gula pasir', 1, 'sdm', 12, 234),
      ing('Minyak goreng', 1, 'sdm', 10, 233),
      ing('Wijen', 1, 'sdt', 4),
      ing('Daun bawang', 1, 'batang', 15)
    ],
    steps: [
      'Potong dada ayam menjadi potongan tipis. Keringkan dengan tisu.',
      'Campur kecap asin, mirin, sake dan gula sampai gula larut.',
      'Panaskan minyak, masak ayam sampai matang keemasan (sekitar 8 menit).',
      'Tuang saus teriyaki, masak sambil diaduk sampai saus mengental dan melumuri ayam.',
      'Taburi wijen dan daun bawang sebelum disajikan.'
    ],
    plating: 'Sajikan dengan nasi putih dan sayur rebus; siram sisa saus di atasnya.',
    substitutions: ['Sake diganti air + sedikit cuka beras', 'Ayam diganti paha ayam (id 214)'],
    allergens: ['Kedelai', 'Gandum (kecap asin)', 'Wijen', 'Sulfit (mirin/sake)'],
    storage: 'Simpan sisa di kulkas maksimal 2 hari; panaskan sampai benar-benar panas.'
  }),
  recipe({
    id: 206, slug: 'beef-yakiniku',
    name: 'Beef Yakiniku', country: 'Jepang', region: 'Jepang (grill meja)', cuisine: 'international',
    meal: ['dinner'],
    description: 'Irisan daging sapi tipis yang dipanggang cepat dengan saus yakiniku manis-gurih.',
    image: null,
    servings: 3, servingSize: '1 porsi (± 180 g)', prepTime: 20, cookTime: 12, difficulty: 'Mudah',
    equipment: ['Grill pan / panggangan meja', 'Tongs', 'Mangkuk marinade'],
    ingredients: [
      ing('Sirloin sapi', 500, 'g', 500, 212),
      ing('Kecap asin', 4, 'sdm', 60),
      ing('Gula pasir', 1.5, 'sdm', 18, 234),
      ing('Mirin', 2, 'sdm', 30),
      ing('Sake', 1, 'sdm', 15),
      ing('Bawang putih', 3, 'siung', 15),
      ing('Minyak wijen', 1, 'sdm', 10),
      ing('Wijen', 1, 'sdt', 4)
    ],
    steps: [
      'Iris sirloin sangat tipis (2 mm) melawan serat.',
      'Campur kecap asin, gula, mirin, sake, bawang putih parut dan minyak wijen.',
      'Marinasi daging 15 menit di kulkas.',
      'Panggang di grill pan panas 1–2 menit per sisi.',
      'Olesi sisa marinade yang sudah direbus sebentar, taburi wijen.'
    ],
    plating: 'Sajikan dengan nasi, kimchi dan irisan daun bawang.',
    substitutions: ['Sirloin diganti tenderloin (id 211)', 'Grill pan diganti wajan anti lengket'],
    allergens: ['Kedelai', 'Gandum', 'Wijen', 'Sulfit'],
    storage: 'Daging marinasi tahan 1 hari di kulkas. Daging panggang sebaiknya segera dikonsumsi.'
  }),
  recipe({
    id: 207, slug: 'sushi',
    name: 'Sushi', country: 'Jepang', region: 'Jepang (nigiri & maki)', cuisine: 'international',
    meal: ['lunch', 'dinner'],
    description: 'Nasi sushi berbumbu vinega dengan ikan salmon segar, dibentuk nigiri atau digulung dengan nori.',
    image: null,
    servings: 3, servingSize: '6 potong sushi', prepTime: 40, cookTime: 20, difficulty: 'Sulit',
    equipment: ['Makisu / tikar bambu', 'Pisau tajam', 'Mangkuk nasi', 'Tangan / sendok'],
    ingredients: [
      ing('Beras sushi', 300, 'g', 300, 231),
      ing('Air', 350, 'ml', 350),
      ing('Cuka beras', 45, 'ml', 45),
      ing('Gula pasir', 1.5, 'sdm', 18, 234),
      ing('Garam', 0.75, 'sdt', 3, 237),
      ing('Salmon segar', 250, 'g', 250, 251),
      ing('Nori', 4, 'lembar', 12),
      ing('Timun', 80, 'g', 80, 108),
      ing('Wasabi', 1, 'sdt', 5),
      ing('Kecap asin', 2, 'sdm', 30)
    ],
    steps: [
      'Cuci beras sampai air jernih, masak dengan 350 ml air sampai matang.',
      'Campur cuka beras, gula dan garam, hangatkan sampai larut. Adukan ke nasi hangat perlahan.',
      'Iris salmon tipis. Potong timun memanjang.',
      'Untuk nigiri: bentuk nasi menjadi bantalan kecil, taruh ikan di atasnya.',
      'Untuk maki: letakkan nori di makisu, ratakan nasi, isi salmon dan timun, gulung rapat lalu potong 6 bagian.',
      'Sajikan dengan wasabi, kecap asin dan jahe acar.'
    ],
    plating: 'Tata sushi di piring datar atau talenan kayu, beri wasabi dan kecap di samping.',
    substitutions: ['Salmon diganti tuna (id 252)', 'Nori diganti selada untuk versi без nori'],
    allergens: ['Ikan', 'Kedelai', 'Gandum (kecap asin)', 'Sulfit (cuka beras)'],
    storage: 'Sushi sebaiknya dimakan segera; ikan mentah tidak boleh disimpan lebih dari 2 jam pada suhu ruang.'
  }),

  // ============ KOREA (3) ============
  recipe({
    id: 208, slug: 'bibimbap',
    name: 'Bibimbap', country: 'Korea Selatan', region: 'Korea (masakan nasi campur)', cuisine: 'international',
    meal: ['lunch', 'dinner', 'healthy'],
    description: 'Nasi hangat dengan aneka sayur, daging dan telur, dicampur dengan gochujang sebelum dimakan.',
    image: null,
    servings: 2, servingSize: '1 mangkuk (± 350 g)', prepTime: 25, cookTime: 25, difficulty: 'Sedang',
    equipment: ['Wajan', 'Panci nasi', 'Mangkuk saji / stone bowl', 'Spatula'],
    ingredients: [
      ing('Nasi putih', 400, 'g', 400),
      ing('Daging sapi', 150, 'g', 150, 212),
      ing('Telur', 2, 'butir', 100, 223),
      ing('Bayam', 80, 'g', 80, 101),
      ing('Wortel', 80, 'g', 80, 102),
      ing('Tauge', 80, 'g', 80),
      ing('Jamur', 80, 'g', 80),
      ing('Gochujang', 2, 'sdm', 30),
      ing('Minyak wijen', 2, 'sdt', 10),
      ing('Kecap asin', 1, 'sdm', 15),
      ing('Wijen', 1, 'sdt', 4)
    ],
    steps: [
      'Masak nasi. Rebus atau tumis tiap sayur terpisah dengan sedikit minyak wijen dan garam.',
      'Iris daging tipis, tumis dengan kecap asin dan sedikit gula sampai matang.',
      'Goreng telur mata sapi sesuai selera.',
      'Tata nasi di mangkuk, susun sayur, daging dan telur di atasnya.',
      'Tambahkan gochujang dan wijen; aduk semua sampai merata sebelum dimakan.'
    ],
    plating: 'Sajikan dalam mangkuk batu panas jika ada agar nasi bagian bawah sedikit renyah.',
    substitutions: ['Daging sapi diganti ayam (id 213) atau tofu', 'Gochujang diganti sambal bawang'],
    allergens: ['Kedelai', 'Wijen', 'Telur', 'Gandum (kecap)'],
    storage: 'Sayur dan daging bisa disiapkan 1 hari sebelumnya; nasi sebaiknya hangat saat disajikan.'
  }),
  recipe({
    id: 209, slug: 'bulgogi',
    name: 'Bulgogi', country: 'Korea Selatan', region: 'Korea (daging marinasi)', cuisine: 'international',
    meal: ['lunch', 'dinner'],
    description: 'Daging sapi tipis yang dimarinasi kecap, gula dan buah, lalu dipanggang manis.',
    image: null,
    servings: 3, servingSize: '1 porsi (± 180 g)', prepTime: 30, cookTime: 15, difficulty: 'Sedang',
    equipment: ['Wajan / grill pan', 'Mangkuk marinade', 'Tongs'],
    ingredients: [
      ing('Sirloin sapi', 500, 'g', 500, 212),
      ing('Kecap asin', 4, 'sdm', 60),
      ing('Gula pasir', 2, 'sdm', 24, 234),
      ing('Bawang putih', 4, 'siung', 20),
      ing('Apel', 100, 'g', 100, 201),
      ing('Minyak wijen', 2, 'sdt', 10),
      ing('Bawang bombai', 150, 'g', 150),
      ing('Wijen', 1, 'sdt', 4),
      ing('Daun bawang', 2, 'batang', 30)
    ],
    steps: [
      'Iris daging tipis. Parut apel dan bawang putih.',
      'Campur kecap asin, gula, apel parut, bawang putih dan minyak wijen; marinasi daging 30 menit.',
      'Iris bawang bombai. Panaskan wajan, tumis bawang sebentar.',
      'Masukkan daging marinasi, panggang dengan api besar sambil diaduk sampai matang dan sedikit karamel.',
      'Taburi wijen dan daun bawang.'
    ],
    plating: 'Sajikan dengan nasi putih, kimchi dan daun selada untuk dibungkus.',
    substitutions: ['Apel diganti pir atau 1 sdm madu', 'Sirloin diganti dada ayam (id 213)'],
    allergens: ['Kedelai', 'Gandum', 'Wijen'],
    storage: 'Daging marinasi tahan 1 hari di kulkas; masak sampai matang sebelum dikonsumsi.'
  }),
  recipe({
    id: 210, slug: 'kimchi-jjigae',
    name: 'Kimchi Jjigae', country: 'Korea Selatan', region: 'Korea (sup pedas)', cuisine: 'international',
    meal: ['lunch', 'dinner'],
    description: 'Sup kimchi pedas dengan daging, tofu dan bawang bombai yang disajikan mendidih dalam panci kecil.',
    image: null,
    servings: 3, servingSize: '1 mangkuk (± 350 ml)', prepTime: 15, cookTime: 30, difficulty: 'Mudah',
    equipment: ['Panci kecil / ttukbaegi', 'Spatula', 'Sendok sup'],
    ingredients: [
      ing('Kimchi', 300, 'g', 300),
      ing('Daging sapi', 200, 'g', 200, 212),
      ing('Tofu', 200, 'g', 200),
      ing('Bawang bombai', 120, 'g', 120),
      ing('Gochujang', 1, 'sdm', 15),
      ing('Bawang putih', 3, 'siung', 15),
      ing('Saus ikan', 1, 'sdt', 5),
      ing('Air', 500, 'ml', 500),
      ing('Daun bawang', 2, 'batang', 30),
      ing('Minyak wijen', 1, 'sdt', 5)
    ],
    steps: [
      'Potong kimchi dan bawang bombai. Tumis kimchi dengan minyak wijen 5 menit.',
      'Masukkan daging potong tipis, aduk sampai berubah warna.',
      'Tambahkan air, gochujang, bawang putih dan saus ikan; didihkan.',
      'Masukkan tofu potong dadu, masak 10 menit dengan api kecil.',
      'Taburi daun bawang, sajikan mendidih dengan nasi putih.'
    ],
    plating: 'Sajikan dalam panci kecil dengan nasi di samping; beri telur mentah di atas jika suka.',
    substitutions: ['Daging sapi diganti babi atau tuna kaleng', 'Tofu diganti telur rebus'],
    allergens: ['Kedelai', 'Ikan (saus ikan)', 'Wijen', 'Gandum (gochujang)'],
    storage: 'Kimchi jjigae tahan 2 hari di kulkas; panaskan sampai mendidih.'
  }),

  // ============ CHINA (3) ============
  recipe({
    id: 211, slug: 'kung-pao-chicken',
    name: 'Kung Pao Chicken', country: 'Tiongkok', region: 'Sichuan', cuisine: 'international',
    meal: ['lunch', 'dinner'],
    description: 'Ayam pedas Sichuan dengan kacang tanah, cabai kering dan saus manis-asam.',
    image: null,
    servings: 3, servingSize: '1 porsi (± 200 g)', prepTime: 20, cookTime: 15, difficulty: 'Sedang',
    equipment: ['Wajan (wok)', 'Spatula', 'Mangkuk saus'],
    ingredients: [
      ing('Dada ayam', 450, 'g', 450, 213),
      ing('Kacang tanah goreng', 100, 'g', 100),
      ing('Cabai kering', 8, 'butir', 12),
      ing('Bawang bombai', 100, 'g', 100),
      ing('Bawang putih', 3, 'siung', 15),
      ing('Jahe', 10, 'g', 10),
      ing('Kecap asin', 2, 'sdm', 30),
      ing('Cuka beras', 1, 'sdm', 15),
      ing('Gula pasir', 1, 'sdm', 12, 234),
      ing('Minyak wijen', 1, 'sdt', 5),
      ing('Minyak goreng', 2, 'sdm', 20, 233)
    ],
    steps: [
      'Potong ayam dadu 2 cm, marinasi dengan kecap asin dan sedikit minyak wijen 15 menit.',
      'Campur kecap asin, cuka beras, gula dan minyak wijen sebagai saus.',
      'Panaskan wajan, tumis cabai kering, bawang putih dan jahe sampai harum.',
      'Masukkan ayam, aduk dengan api besar sampai matang.',
      'Tambahkan bawang bombai dan saus, aduk cepat, terakhir masukkan kacang tanah.'
    ],
    plating: 'Sajikan dengan nasi putih, taburi daun bawang dan kacang tanah ekstra.',
    substitutions: ['Kacang tanah diganti kacang mete', 'Ayam diganti udang (id 256)'],
    allergens: ['Kacang tanah', 'Kedelai', 'Gandum', 'Wijen'],
    storage: 'Hidangan ini sebaiknya dimakan segera agar kacang tetap renyah.'
  }),
  recipe({
    id: 212, slug: 'mapo-tofu',
    name: 'Mapo Tofu', country: 'Tiongkok', region: 'Sichuan', cuisine: 'international',
    meal: ['lunch', 'dinner'],
    description: 'Tofu lembut dalam saus pedas-minyak Sichuan dengan daging cincang dan lada.',
    image: null,
    servings: 3, servingSize: '1 mangkuk (± 250 g)', prepTime: 15, cookTime: 20, difficulty: 'Sedang',
    equipment: ['Wajan', 'Spatula', 'Sendok sayur'],
    ingredients: [
      ing('Tofu', 400, 'g', 400),
      ing('Daging sapi giling', 150, 'g', 150, 216),
      ing('Gochujang', 1.5, 'sdm', 22),
      ing('Saus sambal', 1, 'sdm', 15),
      ing('Bawang putih', 3, 'siung', 15),
      ing('Jahe', 10, 'g', 10),
      ing('Kecap asin', 1, 'sdm', 15),
      ing('Air', 250, 'ml', 250),
      ing('Tepung terigu', 1, 'sdt', 3, 235),
      ing('Minyak wijen', 1, 'sdt', 5),
      ing('Daun bawang', 2, 'batang', 30)
    ],
    steps: [
      'Potong tofu dadu 2 cm, rendam air hangat sebentar lalu tiriskan.',
      'Tumis daging giling dengan bawang putih dan jahe sampai harum.',
      'Tambahkan gochujang, saus sambal dan kecap asin, aduk rata.',
      'Tuang air, didihkan, lalu masukkan tofu. Masak 8 menit dengan api kecil.',
      'Larutkan tepung terigu dengan sedikit air, tuang untuk mengentalkan saus.',
      'Taburi daun bawang dan minyak wijen, sajikan dengan nasi.'
    ],
    plating: 'Sajikan dalam mangkuk dangkal dengan nasi putih, beri lada Sichuan jika suka.',
    substitutions: ['Daging sapi giling diganti daging ayam cincang', 'Gochujang diganti sambal bawang'],
    allergens: ['Kedelai (tofu & kecap)', 'Gandum', 'Wijen'],
    storage: 'Simpan sisa di kulkas maksimal 2 hari; panaskan pelan agar tofu tidak pecah.'
  }),
  recipe({
    id: 213, slug: 'dumpling',
    name: 'Dumpling', country: 'Tiongkok', region: 'Tiongkok Utara', cuisine: 'international',
    meal: ['lunch', 'dinner'],
    description: 'Pangsit kukus atau rebus dengan isian daging dan kubis, disajikan dengan saus cuka kecap.',
    image: null,
    servings: 4, servingSize: '5 buah dumpling', prepTime: 40, cookTime: 15, difficulty: 'Sedang',
    equipment: ['Panci kukus / panci rebus', 'Mangkuk adonan', ' Sendok'],
    ingredients: [
      ing('Kulit pangsit', 20, 'lembar', 300),
      ing('Daging sapi giling', 300, 'g', 300, 216),
      ing('Kubis', 200, 'g', 200),
      ing('Bawang putih', 3, 'siung', 15),
      ing('Jahe', 10, 'g', 10),
      ing('Kecap asin', 1, 'sdm', 15),
      ing('Minyak wijen', 1, 'sdm', 10),
      ing('Cuka beras', 2, 'sdm', 30),
      ing('Daun bawang', 2, 'batang', 30),
      ing('Garam', 0.5, 'sdt', 2, 237)
    ],
    steps: [
      'Cincang kubis halus, peras airnya. Campur dengan daging giling, bawang putih, jahe, kecap asin, minyak wijen dan garam.',
      'Ambil satu kulit pangsit, beri 1 sdt isian, lipat dan cubit pinggirannya sampai rapat.',
      'Kukus 12 menit atau rebus sampai kulit matang dan isian tidak berdarah.',
      'Buat saus dari cuka beras, kecap asin dan jahe cincang.',
      'Sajikan hangat dengan saus dan daun bawang.'
    ],
    plating: 'Tata dumpling di piring, beri saus di mangkuk kecil di samping.',
    substitutions: ['Daging sapi diganti ayam cincang atau udang', 'Kulit pangsit instan tersedia di pasaran'],
    allergens: ['Gandum', 'Kedelai', 'Wijen'],
    storage: 'Dumpling mentah bisa disimpan di freezer 2 minggu; kukus langsung dari beku dengan tambahan 3 menit.'
  }),

  // ============ THAILAND (3) ============
  recipe({
    id: 214, slug: 'tom-yum-seafood',
    name: 'Tom Yum Seafood', country: 'Thailand', region: 'Thailand (sup asam pedas)', cuisine: 'international',
    meal: ['lunch', 'dinner'],
    description: 'Sup Thailand asam pedas dengan udang, jamur, serai dan daun jeruk purut.',
    image: null,
    servings: 3, servingSize: '1 mangkuk (± 350 ml)', prepTime: 20, cookTime: 20, difficulty: 'Sedang',
    equipment: ['Panci', 'Spatula', 'Sendok sup'],
    ingredients: [
      ing('Udang', 400, 'g', 400, 256),
      ing('Jamur', 150, 'g', 150),
      ing('Air', 700, 'ml', 700),
      ing('Serai', 2, 'batang', 30),
      ing('Daun jeruk', 8, 'lembar', 16),
      ing('Jahe', 15, 'g', 15),
      ing('Cabai rawit', 8, 'butir', 24),
      ing('Saus ikan', 2, 'sdm', 30),
      ing('Air jeruk nipis', 3, 'sdm', 45),
      ing('Gula pasir', 1, 'sdt', 4, 234),
      ing('Santan kental', 100, 'ml', 100),
      ing('Daun bawang', 2, 'batang', 30)
    ],
    steps: [
      'Didihkan air dengan serai geprek, daun jeruk, jahe dan cabai rawit.',
      'Masukkan jamur, masak 5 menit.',
      'Tambahkan udang, masak 3–4 menit sampai berubah warna.',
      'Bumbui saus ikan, gula dan air jeruk nipis. Tuang santan, aduk rata.',
      'Angkat, taburi daun bawang dan sajikan hangat.'
    ],
    plating: 'Sajikan dalam mangkuk dengan udang di tengah dan daun jeruk di atas.',
    substitutions: ['Udang diganti cumi (id 257) atau ikan', 'Santan bisa dilewati untuk tom yum nam sai'],
    allergens: ['Udang', 'Ikan (saus ikan)', 'Sulfit'],
    storage: 'Sup sebaiknya segera dikonsumsi; sisa bisa disimpan 1 hari di kulkas.'
  }),
  recipe({
    id: 215, slug: 'pad-thai',
    name: 'Pad Thai', country: 'Thailand', region: 'Thailand (mi goreng)', cuisine: 'international',
    meal: ['lunch', 'dinner'],
    description: 'Mi beras goreng Thailand dengan udang, telur, tauge dan kacang tanah, manis-asam.',
    image: null,
    servings: 2, servingSize: '1 piring (± 300 g)', prepTime: 20, cookTime: 12, difficulty: 'Sedang',
    equipment: ['Wajan besar', 'Spatula', 'Saringan'],
    ingredients: [
      ing('Mi beras', 200, 'g', 200),
      ing('Udang', 200, 'g', 200, 256),
      ing('Telur', 2, 'butir', 100, 223),
      ing('Tofu', 100, 'g', 100),
      ing('Tauge', 100, 'g', 100),
      ing('Kacang tanah goreng', 60, 'g', 60),
      ing('Saus ikan', 2, 'sdm', 30),
      ing('Gula merah', 1.5, 'sdm', 20),
      ing('Asam jawa', 2, 'sdm', 30),
      ing('Minyak goreng', 2, 'sdm', 20, 233),
      ing('Daun bawang', 2, 'batang', 30)
    ],
    steps: [
      'Rendam mi beras dalam air hangat 15 menit sampai lunak, tiriskan.',
      'Campur saus ikan, gula merah dan asam jawa sebagai saus.',
      'Panaskan wajan, tumis udang dan tofu sampai matang, sisihkan.',
      'Masukkan telur, buat orak-arik, lalu tambahkan mi dan saus; aduk cepat.',
      'Masukkan udang, tofu, tauge dan daun bawang; aduk sampai tercampur.',
      'Taburi kacang tanah cincang, sajikan dengan jeruk nipis.'
    ],
    plating: 'Tata mi di piring, beri kacang tanah, tauge segar dan irisan jeruk nipis.',
    substitutions: ['Udang diganti ayam (id 213)', 'Mi beras diganti mi kuning'],
    allergens: ['Udang', 'Ikan (saus ikan)', 'Kacang tanah', 'Kedelai (tofu)'],
    storage: 'Pad Thai paling enak segera dimakan; mi yang sudah dingin cenderung menggumpal.'
  }),
  recipe({
    id: 216, slug: 'green-curry',
    name: 'Green Curry', country: 'Thailand', region: 'Thailand (kari hijau)', cuisine: 'international',
    meal: ['lunch', 'dinner'],
    description: 'Kari hijau Thailand dengan santan, ayam, terong dan kemangi dalam kuah wangi.',
    image: null,
    servings: 4, servingSize: '1 mangkuk (± 300 ml)', prepTime: 20, cookTime: 25, difficulty: 'Sedang',
    equipment: ['Wajan / panci', 'Cobek / blender', 'Spatula'],
    ingredients: [
      ing('Dada ayam', 500, 'g', 500, 213),
      ing('Santan kental', 500, 'ml', 500),
      ing('Cabai hijau', 100, 'g', 100),
      ing('Bawang merah', 60, 'g', 60, 106),
      ing('Bawang putih', 30, 'g', 30),
      ing('Serai', 2, 'batang', 30),
      ing('Jahe', 15, 'g', 15),
      ing('Daun jeruk', 6, 'lembar', 12),
      ing('Terong', 200, 'g', 200),
      ing('Saus ikan', 2, 'sdm', 30),
      ing('Gula merah', 1, 'sdm', 15),
      ing('Kemangi', 20, 'g', 20),
      ing('Minyak goreng', 2, 'sdm', 20, 233)
    ],
    steps: [
      'Haluskan cabai hijau, bawang merah, bawang putih, serai dan jahe.',
      'Tumis bumbu halus dengan minyak sampai harum, sekitar 5 menit.',
      'Tuang santan, didihkan dengan api kecil sambil diaduk.',
      'Masukkan ayam potong dan terong, masak 12–15 menit sampai matang.',
      'Bumbui saus ikan dan gula merah. Matikan api, taburi kemangi dan daun jeruk.'
    ],
    plating: 'Sajikan dengan nasi melati atau roti naan; beri irisan cabai hijau di atas.',
    substitutions: ['Ayam diganti udang (id 256) atau tofu', 'Santan instan bisa dipakai'],
    allergens: ['Ikan (saus ikan)', 'Sulfit (santan kaleng)'],
    storage: 'Kari tahan 2 hari di kulkas; panaskan pelan agar santan tidak pecah.'
  }),

  // ============ INDIA (3) ============
  recipe({
    id: 217, slug: 'butter-chicken',
    name: 'Butter Chicken', country: 'India', region: 'India Utara (Delhi)', cuisine: 'international',
    meal: ['lunch', 'dinner'],
    description: 'Ayam dalam saus tomat krim yang kaya dengan mentega dan rempah garam masala.',
    image: null,
    servings: 4, servingSize: '1 porsi (± 200 g)', prepTime: 25, cookTime: 35, difficulty: 'Sedang',
    equipment: ['Wajan', 'Blender', 'Tongs'],
    ingredients: [
      ing('Dada ayam', 600, 'g', 600, 213),
      ing('Yogurt', 150, 'g', 150, 226),
      ing('Saus tomat', 300, 'g', 300),
      ing('Krim', 150, 'ml', 150),
      ing('Mentega', 50, 'g', 50, 227),
      ing('Bawang bombai', 120, 'g', 120),
      ing('Bawang putih', 4, 'siung', 20),
      ing('Jahe', 20, 'g', 20),
      ing('Garam masala', 2, 'sdt', 6),
      ing('Cabai bubuk', 1, 'sdt', 3),
      ing('Garam', 1, 'sdt', 4, 237)
    ],
    steps: [
      'Marinasi ayam potong dengan yogurt, jahe, bawang putih, cabai dan setengah garam masala, 20 menit.',
      'Panggang atau tumis ayam sampai matang, sisihkan.',
      'Tumis bawang bombai cincang dengan mentega sampai lunak, tambahkan sisa rempah.',
      'Masukkan saus tomat dan krim, masak 10 menit sampai saus mengental.',
      'Masukkan ayam, aduk sampai terlumuri saus. Koreksi rasa.'
    ],
    plating: 'Sajikan dengan nasi basmati atau naan, taburi daun ketumbar dan sedikit krim.',
    substitutions: ['Krim diganti yogurt kental', 'Ayam diganti paneer / tofu'],
    allergens: ['Susu', 'Yogurt'],
    storage: 'Simpan kulkas 2 hari; panaskan pelan jangan sampai mendidih agar krim tidak pecah.'
  }),
  recipe({
    id: 218, slug: 'chicken-biryani',
    name: 'Chicken Biryani', country: 'India', region: 'India Selatan / Hyderabad', cuisine: 'international',
    meal: ['lunch', 'dinner'],
    description: 'Nasi basmati berlapis ayam berempah dengan safron, kismis dan kacang mete.',
    image: null,
    servings: 5, servingSize: '1 porsi (± 300 g)', prepTime: 30, cookTime: 60, difficulty: 'Sedang',
    equipment: ['Panci berdasar tebal / pot', 'Spatula', 'Mangkuk adonan'],
    ingredients: [
      ing('Beras basmati', 500, 'g', 500, 231),
      ing('Dada ayam', 500, 'g', 500, 213),
      ing('Yogurt', 150, 'g', 150, 226),
      ing('Bawang bombai', 200, 'g', 200),
      ing('Garam masala', 2, 'sdt', 6),
      ing('Kunyit', 10, 'g', 10),
      ing('Mentega', 50, 'g', 50, 227),
      ing('Kismis', 50, 'g', 50),
      ing('Kacang mete', 60, 'g', 60),
      ing('Susu segar', 100, 'ml', 100, 222),
      ing('Air', 700, 'ml', 700),
      ing('Garam', 1.5, 'sdt', 6, 237)
    ],
    steps: [
      'Cuci beras basmati sampai jernih, rendam 20 menit. Rebus setengah matang, tiriskan.',
      'Marinasi ayam dengan yogurt, garam masala, kunyit dan garam 20 menit.',
      'Goreng bawang bombaiiris sampai keemasan, sisihkan.',
      'Lapisi dasar panci dengan mentega, susun ayam, nasi setengah matang, bawang goreng, kismis dan mete.',
      'Tuang susu dan air, tutup rapat, masak dengan api kecil 30 menit sampai nasi matang dan uap merata.',
      'Diamkan 10 menit sebelum dibuka, aduk perlahan.'
    ],
    plating: 'Sajikan di piring hangat, beri kacang mete dan kismis di atas, temani yogurt.',
    substitutions: ['Beras biasa bisa dipakai, kurangi air', 'Ayam diganti kentang untuk versi vegetarian'],
    allergens: ['Susu', 'Kacang mete', 'Yogurt'],
    storage: 'Biryani tahan 2 hari di kulkas; panaskan dengan sedikit air agar nasi tidak kering.'
  }),
  recipe({
    id: 219, slug: 'chicken-tikka-masala',
    name: 'Chicken Tikka Masala', country: 'India', region: 'India Utara / British-Indian', cuisine: 'international',
    meal: ['lunch', 'dinner'],
    description: 'Potongan ayam panggang dengan marinasi yogurt, disajikan dalam saus tomat-krim berempah.',
    image: null,
    servings: 4, servingSize: '1 porsi (± 220 g)', prepTime: 30, cookTime: 35, difficulty: 'Sedang',
    equipment: ['Oven / grill pan', 'Wajan', 'Blender'],
    ingredients: [
      ing('Dada ayam', 600, 'g', 600, 213),
      ing('Yogurt', 200, 'g', 200, 226),
      ing('Garam masala', 2, 'sdt', 6),
      ing('Paprika bubuk', 1, 'sdt', 3),
      ing('Saus tomat', 300, 'g', 300),
      ing('Krim', 150, 'ml', 150),
      ing('Mentega', 40, 'g', 40, 227),
      ing('Bawang bombai', 120, 'g', 120),
      ing('Bawang putih', 4, 'siung', 20),
      ing('Jahe', 15, 'g', 15),
      ing('Garam', 1, 'sdt', 4, 237)
    ],
    steps: [
      'Potong ayam kubus, marinasi dengan yogurt, garam masala, paprika, jahe, bawang putih dan garam 30 menit.',
      'Tusuk dan panggang ayam di oven 200°C 15 menit atau sampai berwarna keemasan.',
      'Tumis bawang bombai dengan mentega sampai lunak, tambahkan sisa rempah.',
      'Masukkan saus tomat dan krim, masak 10 menit.',
      'Tambahkan ayam panggang, aduk 5 menit sampai saus merata.'
    ],
    plating: 'Sajikan dengan naan atau nasi, taburi daun ketumbar dan krim.',
    substitutions: ['Ayam diganti paneer', 'Krim diganti yogurt tanpa gula'],
    allergens: ['Susu', 'Yogurt'],
    storage: 'Simpan kulkas 2 hari; panaskan pelan.'
  }),

  // ============ ITALY (3) ============
  recipe({
    id: 220, slug: 'spaghetti-bolognese',
    name: 'Spaghetti Bolognese', country: 'Italia', region: 'Emilia-Romagna (Bologna)', cuisine: 'international',
    meal: ['lunch', 'dinner'],
    description: 'Pasta spaghetti dengan saus daging sapi, tomat dan sayur yang dimasak lambat.',
    image: null,
    servings: 4, servingSize: '1 piring (± 300 g)', prepTime: 15, cookTime: 60, difficulty: 'Sedang',
    equipment: ['Panci besar', 'Wajan', 'Saringan pasta'],
    ingredients: [
      ing('Pasta spaghetti', 400, 'g', 400),
      ing('Daging sapi giling', 400, 'g', 400, 216),
      ing('Saus tomat', 400, 'g', 400),
      ing('Bawang bombai', 150, 'g', 150),
      ing('Wortel', 100, 'g', 100, 102),
      ing('Seledri', 80, 'g', 80),
      ing('Bawang putih', 3, 'siung', 15),
      ing('Minyak zaitun', 3, 'sdm', 30),
      ing('Keju parmesan', 60, 'g', 60),
      ing('Garam', 1, 'sdt', 4, 237),
      ing('Lada hitam', 0.5, 'sdt', 2)
    ],
    steps: [
      'Cincang bawang bombai, wortel dan seledri. Tumis dengan minyak zaitun sampai lunak.',
      'Masukkan daging giling, masak sampai kecoklatan dan tidak berdarah.',
      'Tambahkan bawang putih, saus tomat, garam dan lada. Masak dengan api kecil 40 menit.',
      'Rebus spaghetti sesuai petunjuk kemasan sampai al dente, tiriskan.',
      'Campur pasta dengan saus, sajikan dengan keju parmesan parut.'
    ],
    plating: 'Gulung spaghetti di piring, siram saus, taburi parmesan dan daun basil.',
    substitutions: ['Daging sapi diganti daging ayam cincang', 'Pasta diganti fusilli atau lasagna'],
    allergens: ['Gandum', 'Susu (parmesan)'],
    storage: 'Saus tahan 3 hari di kulkas atau 1 bulan di freezer. Pasta sebaiknya dimasak saat akan dimakan.'
  }),
  recipe({
    id: 221, slug: 'lasagna',
    name: 'Lasagna', country: 'Italia', region: 'Emilia-Romagna', cuisine: 'international',
    meal: ['dinner'],
    description: 'Lembaran pasta berlapis ragù daging, saus tomat dan besciamella keju yang dipanggang.',
    image: null,
    servings: 6, servingSize: '1 potong (± 250 g)', prepTime: 40, cookTime: 60, difficulty: 'Sedang',
    equipment: ['Loyang panggang', 'Panci saus', 'Panci besciamella', 'Oven'],
    ingredients: [
      ing('Lembar lasagna', 300, 'g', 300),
      ing('Daging sapi giling', 500, 'g', 500, 216),
      ing('Saus tomat', 500, 'g', 500),
      ing('Susu segar', 500, 'ml', 500, 222),
      ing('Mentega', 60, 'g', 60, 227),
      ing('Tepung terigu', 50, 'g', 50, 235),
      ing('Keju cheddar', 200, 'g', 200, 225),
      ing('Bawang bombai', 150, 'g', 150),
      ing('Bawang putih', 3, 'siung', 15),
      ing('Minyak zaitun', 2, 'sdm', 20),
      ing('Garam', 1.25, 'sdt', 5, 237),
      ing('Lada hitam', 0.5, 'sdt', 2)
    ],
    steps: [
      'Tumis bawang bombai dan bawang putih, masukkan daging giling sampai matang. Tambahkan saus tomat, garam dan lada; masak 20 menit.',
      'Buat besciamella: lelehkan mentega, tambahkan terigu, aduk, tuang susu sedikit demi sedikit sampai kental.',
      'Rebus lembar lasagna 2 menit, tiriskan.',
      'Susun dalam loyang: saus daging, pasta, besciamella, keju; ulangi 3–4 lapis.',
      'Panggang pada suhu 190°C selama 35–40 menit sampai keemasan.'
    ],
    plating: 'Diamkan 10 menit sebelum dipotong agar lapisan tidak berantakan.',
    substitutions: ['Keju cheddar diganti mozzarella', 'Daging diganti jamur untuk versi vegetarian'],
    allergens: ['Gandum', 'Susu', 'Telur (jika besciamella ditambah kuning telur)'],
    storage: 'Lasagna tahan 3 hari di kulkas; panaskan di oven sampai hangat merata.'
  }),
  recipe({
    id: 222, slug: 'margherita-pizza',
    name: 'Margherita Pizza', country: 'Italia', region: 'Kampania (Napoli)', cuisine: 'international',
    meal: ['lunch', 'dinner'],
    description: 'Pizza klasik Naples dengan saus tomat, keju mozzarella dan daun basil segar.',
    image: null,
    servings: 3, servingSize: '1/2 pizza (± 250 g)', prepTime: 25, cookTime: 15, difficulty: 'Sedang',
    equipment: ['Oven / pizza oven', 'Loyang', 'Mangkuk adonan'],
    ingredients: [
      ing('Tepung terigu', 300, 'g', 300, 235),
      ing('Air hangat', 180, 'ml', 180),
      ing('Ragi instan', 5, 'g', 5),
      ing('Garam', 0.75, 'sdt', 3, 237),
      ing('Minyak zaitun', 2, 'sdm', 20),
      ing('Saus tomat', 150, 'g', 150),
      ing('Keju mozzarella', 200, 'g', 200),
      ing('Kemangi / basil', 15, 'g', 15),
      ing('Gula pasir', 0.5, 'sdt', 2, 234)
    ],
    steps: [
      'Campur tepung, ragi, gula, garam, air hangat dan minyak; uleni sampai kalis. Diamkan 30 menit sampai mengembang.',
      'Panaskan oven dengan suhu setinggi mungkin (230–250°C).',
      'Giling adonan tipis, oles saus tomat, taburi mozzarella.',
      'Panggang 8–12 menit sampai pinggir keemasan.',
      'Taburi daun basil segar dan sedikit minyak zaitun sebelum disajikan.'
    ],
    plating: 'Potong menjadi 6–8 irisan, sajikan segera selagi hangat.',
    substitutions: ['Mozzarella diganti keju cheddar (id 225)', 'Adonan instan bisa dipakai'],
    allergens: ['Gandum', 'Susu', 'Ragi'],
    storage: 'Adonan bisa disimpan di kulkas 1 hari. Pizza matang sebaiknya dimakan segera.'
  }),

  // ============ FRANCE (2) ============
  recipe({
    id: 223, slug: 'ratatouille',
    name: 'Ratatouille', country: 'Prancis', region: 'Provence', cuisine: 'international',
    meal: ['lunch', 'dinner', 'healthy'],
    description: 'Sayuran Provence yang dimasak lambat dengan minyak zaitun, tomat dan herba.',
    image: null,
    servings: 4, servingSize: '1 porsi (± 200 g)', prepTime: 20, cookTime: 50, difficulty: 'Mudah',
    equipment: ['Panci berdasar tebal', 'Pisau', 'Spatula'],
    ingredients: [
      ing('Terong', 250, 'g', 250),
      ing('Zucchini', 250, 'g', 250),
      ing('Paprika', 200, 'g', 200),
      ing('Tomat', 300, 'g', 300),
      ing('Bawang bombai', 150, 'g', 150),
      ing('Bawang putih', 3, 'siung', 15),
      ing('Minyak zaitun', 4, 'sdm', 40),
      ing('Garam', 1, 'sdt', 4, 237),
      ing('Lada hitam', 0.5, 'sdt', 2),
      ing('Rosemary', 2, 'ranting', 4)
    ],
    steps: [
      'Potong semua sayuran kubis atau iris kasar ukuran sama.',
      'Tumis bawang bombai dan bawang putih dengan minyak zaitun sampai harum.',
      'Masukkan terong dan paprika, masak 10 menit.',
      'Tambahkan zucchini, tomat, rosemary, garam dan lada.',
      'Masak dengan api kecil 30 menit sampai sayur lunak tetapi tidak lembek. Koreksi rasa.'
    ],
    plating: 'Sajikan hangat atau suhu ruang dengan roti perancis atau sebagai lauk.',
    substitutions: ['Zucchini diganti labu siam', 'Tambah kacang hijau untuk tekstur'],
    allergens: ['Tidak ada alergen utama'],
    storage: 'Ratatouille lebih enak sehari setelah dimasak; simpan kulkas 3 hari.'
  }),
  recipe({
    id: 224, slug: 'chicken-cordon-bleu',
    name: 'Chicken Cordon Bleu', country: 'Prancis', region: 'Eropa (klasik Prancis-Swiss)', cuisine: 'international',
    meal: ['dinner'],
    description: 'Dada ayam berisi ham dan keju, dilapisi tepung roti lalu digoreng sampai keemasan.',
    image: null,
    servings: 3, servingSize: '1 potong (± 220 g)', prepTime: 25, cookTime: 20, difficulty: 'Sedang',
    equipment: ['Pisau tajam', '3 mangkuk pelapis', 'Wajan penggorengan', 'Tusuk gigi'],
    ingredients: [
      ing('Dada ayam', 450, 'g', 450, 213),
      ing('Ham', 120, 'g', 120),
      ing('Keju cheddar', 120, 'g', 120, 225),
      ing('Tepung terigu', 80, 'g', 80, 235),
      ing('Telur', 2, 'butir', 100, 223),
      ing('Remah roti', 120, 'g', 120),
      ing('Mentega', 30, 'g', 30, 227),
      ing('Garam', 0.75, 'sdt', 3, 237),
      ing('Lada hitam', 0.5, 'sdt', 2)
    ],
    steps: [
      'Belah dada ayam menjadi dua secara horizontal, pipihkan dengan ulekan.',
      'Letakkan irisan ham dan keju di tengah, gulung dan kunci dengan tusuk gigi.',
      'Siapkan tiga mangkuk: terigu, telur kocok, remah roti. Lumuri ayam berurutan.',
      'Goreng dalam minyak bersama mentega sampai keemasan dan matang (sekitar 8–10 menit).',
      'Tiriskan, buang tusuk gigi sebelum disajikan.'
    ],
    plating: 'Iris diagonal, sajikan dengan salad atau kentang tumbuk.',
    substitutions: ['Ham diganti smoked turkey', 'Keju cheddar diganti gruyère / mozzarella'],
    allergens: ['Gandum', 'Telur', 'Susu', 'Daging olahan'],
    storage: 'Simpan sisa di kulkas 2 hari; panaskan di oven agar lapisan tetap renyah.'
  }),

  // ============ MEXICO (2) ============
  recipe({
    id: 225, slug: 'chicken-tacos',
    name: 'Chicken Tacos', country: 'Meksiko', region: 'Meksiko (taco rumahan)', cuisine: 'international',
    meal: ['lunch', 'dinner'],
    description: 'Tortilla hangat berisi ayam berbumbu, selada, tomat dan saus yogurt.',
    image: null,
    servings: 3, servingSize: '3 tacos', prepTime: 20, cookTime: 15, difficulty: 'Mudah',
    equipment: ['Wajan', 'Spatula', 'Mangkuk saji'],
    ingredients: [
      ing('Tortilla', 6, 'lembar', 180),
      ing('Dada ayam', 400, 'g', 400, 213),
      ing('Paprika', 120, 'g', 120),
      ing('Bawang bombai', 100, 'g', 100),
      ing('Selada', 80, 'g', 80, 104),
      ing('Tomat', 100, 'g', 100),
      ing('Yogurt', 100, 'g', 100, 226),
      ing('Keju cheddar', 80, 'g', 80, 225),
      ing('Minyak goreng', 2, 'sdm', 20, 233),
      ing('Garam', 0.75, 'sdt', 3, 237),
      ing('Jeruk nipis', 1, 'buah', 30)
    ],
    steps: [
      'Iris ayam tipis, tumis dengan bawang bombai dan paprika sampai matang. Bumbui garam.',
      'Hangatkan tortilla di wajan kering 30 detik per sisi.',
      'Campur yogurt dengan sedikit air jeruk nipis dan garam sebagai saus.',
      'Isi tortilla dengan ayam, selada, tomat dan keju.',
      'Siram saus yogurt, beri sambal atau cabai sesuai selera.'
    ],
    plating: 'Sajikan tacos berdiri di piring, beri irisan jeruk nipis di samping.',
    substitutions: ['Dada ayam diganti daging giling (id 216)', 'Tortilla diganti roti pipih'],
    allergens: ['Gandum (tortilla)', 'Susu (yogurt & keju)'],
    storage: 'Isian tahan 2 hari di kulkas; tortilla sebaiknya dihangatkan saat akan disajikan.'
  }),
  recipe({
    id: 226, slug: 'beef-burrito',
    name: 'Beef Burrito', country: 'Meksiko', region: 'Meksiko Utara / Tex-Mex', cuisine: 'international',
    meal: ['lunch', 'dinner'],
    description: 'Tortilla besar berisi daging sapi, nasi, kacang, keju dan salsa yang digulung rapat.',
    image: null,
    servings: 2, servingSize: '1 burrito (± 350 g)', prepTime: 20, cookTime: 25, difficulty: 'Sedang',
    equipment: ['Wajan', 'Panci nasi', 'Talenan'],
    ingredients: [
      ing('Tortilla besar', 2, 'lembar', 200),
      ing('Daging sapi giling', 300, 'g', 300, 216),
      ing('Nasi putih', 200, 'g', 200),
      ing('Kacang hijau', 100, 'g', 100, 238),
      ing('Keju cheddar', 100, 'g', 100, 225),
      ing('Saus tomat', 100, 'g', 100),
      ing('Selada', 60, 'g', 60, 104),
      ing('Bawang bombai', 80, 'g', 80),
      ing('Minyak goreng', 2, 'sdm', 20, 233),
      ing('Garam', 0.75, 'sdt', 3, 237),
      ing('Lada bubuk', 0.5, 'sdt', 2)
    ],
    steps: [
      'Tumis bawang bombai, masukkan daging giling, garam dan lada; masak sampai matang.',
      'Rebus kacang hijau sampai lunak, tiriskan.',
      'Hangatkan tortilla besar di wajan.',
      'Letakkan nasi, daging, kacang, keju, saus tomat dan selada di tengah tortilla.',
      'Lipat sisi kiri-kanan, gulung dari bawah ke atas sampai rapat. Panggang sebentar di wajan agar bagian lipatan menyegel.'
    ],
    plating: 'Sajikan dengan salsa ekstra dan irisan jeruk nipis.',
    substitutions: ['Daging diganti ayam cincang', 'Kacang hijau diganti kacang hitam kaleng'],
    allergens: ['Gandum', 'Susu'],
    storage: 'Burrito sebaiknya dimakan segera; isian bisa disimpan 2 hari di kulkas.'
  }),

  // ============ USA (1) ============
  recipe({
    id: 227, slug: 'beef-burger',
    name: 'Beef Burger', country: 'Amerika Serikat', region: 'Amerika (klasik burger)', cuisine: 'international',
    meal: ['lunch', 'dinner'],
    description: 'Burger daging sapi dengan keju, selada, tomat dan saus di antara roti panggang.',
    image: null,
    servings: 2, servingSize: '1 burger (± 250 g)', prepTime: 15, cookTime: 15, difficulty: 'Mudah',
    equipment: ['Wajan / grill pan', 'Spatula', 'Pemanggang roti'],
    ingredients: [
      ing('Daging sapi giling', 300, 'g', 300, 216),
      ing('Roti burger', 2, 'biji', 160),
      ing('Keju cheddar', 60, 'g', 60, 225),
      ing('Selada', 50, 'g', 50, 104),
      ing('Tomat', 80, 'g', 80),
      ing('Bawang bombai', 60, 'g', 60),
      ing('Mayones', 2, 'sdm', 30),
      ing('Saus tomat', 2, 'sdm', 30),
      ing('Garam', 0.75, 'sdt', 3, 237),
      ing('Lada hitam', 0.5, 'sdt', 2)
    ],
    steps: [
      'Bentuk daging giling menjadi 2 bulatan pipih, tekan bagian tengah sedikit.',
      'Bumbui garam dan lada. Panggang di wajan panas 4 menit per sisi.',
      'Letakkan keju di atas patty pada menit terakhir, tutup wajan sebentar sampai meleleh.',
      'Panggang roti bagian dalam sampai keemasan.',
      'Susun roti, mayones, selada, tomat, bawang, patty dan saus tomat.'
    ],
    plating: 'Sajikan dengan kentang goreng atau salad, beri tusuk sate agar tidak berantakan.',
    substitutions: ['Daging diganti ayam giling', 'Keju diganti keju biru untuk rasa kuat'],
    allergens: ['Gandum', 'Telur (mayones)', 'Susu'],
    storage: 'Patty mentah bisa disimpan di freezer 1 bulan. Burger matang sebaiknya segera dimakan.'
  }),

  // ============ MIDDLE EAST & MEDITERRANEAN (3) ============
  recipe({
    id: 228, slug: 'chicken-shawarma',
    name: 'Chicken Shawarma', country: 'Lebanon', region: 'Timur Tengah (Levant)', cuisine: 'international',
    meal: ['lunch', 'dinner'],
    description: 'Ayam marinasi rempah Timur Tengah yang dipanggang, dibungkus roti dengan saus tahini.',
    image: null,
    servings: 3, servingSize: '1 bungkus (± 250 g)', prepTime: 30, cookTime: 25, difficulty: 'Sedang',
    equipment: ['Oven / grill pan', 'Mangkuk marinade', 'Tongs'],
    ingredients: [
      ing('Dada ayam', 500, 'g', 500, 213),
      ing('Yogurt', 120, 'g', 120, 226),
      ing('Paprika bubuk', 1.5, 'sdt', 5),
      ing('Garam masala', 1, 'sdt', 3),
      ing('Bawang putih', 4, 'siung', 20),
      ing('Tortilla', 3, 'lembar', 180),
      ing('Selada', 80, 'g', 80, 104),
      ing('Tomat', 100, 'g', 100),
      ing('Timun', 80, 'g', 80, 108),
      ing('Tahini', 3, 'sdm', 45),
      ing('Lemon', 1, 'buah', 30),
      ing('Minyak zaitun', 2, 'sdm', 20),
      ing('Garam', 0.75, 'sdt', 3, 237)
    ],
    steps: [
      'Iris ayam tipis. Campur yogurt, paprika, garam masala, bawang putih, minyak zaitun, air lemon dan garam.',
      'Marinasi ayam minimal 30 menit (lebih baik semalaman).',
      'Panggang ayam di oven 200°C atau grill pan sampai matang dan pinggir sedikit hangus.',
      'Campur tahini dengan air lemon dan sedikit air sampai bisa disiram.',
      'Hangatkan tortilla, isi dengan ayam, selada, tomat dan timun, siram saus tahini.'
    ],
    plating: 'Gulung tortilla, potong diagonal, sajikan dengan salad tambahan.',
    substitutions: ['Tortilla diganti pita / roti naan', 'Ayam diganti daging sapi'],
    allergens: ['Gandum', 'Susu (yogurt)', 'Wijen (tahini)'],
    storage: 'Ayam marinasi tahan 1 hari di kulkas. Shawarma sebaiknya segera disajikan.'
  }),
  recipe({
    id: 229, slug: 'hummus',
    name: 'Hummus', country: 'Israel / Lebanon', region: 'Timur Tengah (Levant)', cuisine: 'international',
    meal: ['breakfast', 'healthy'],
    description: 'Pure kacang chickpea lembut dengan tahini, lemon dan minyak zaitun, dimakan dengan roti pita.',
    image: null,
    servings: 4, servingSize: '3 sdm (± 60 g)', prepTime: 15, cookTime: 0, difficulty: 'Mudah',
    equipment: ['Food processor / blender', 'Spatula', 'Mangkuk saji'],
    ingredients: [
      ing('Chickpea rebus', 400, 'g', 400),
      ing('Tahini', 120, 'g', 120),
      ing('Lemon', 1, 'buah', 30),
      ing('Bawang putih', 2, 'siung', 10),
      ing('Minyak zaitun', 3, 'sdm', 30),
      ing('Garam', 0.75, 'sdt', 3, 237),
      ing('Air dingin', 80, 'ml', 80),
      ing('Pita / roti', 4, 'lembar', 200)
    ],
    steps: [
      'Tiriskan dan bilas chickpea. Haluskan dengan food processor.',
      'Tambahkan tahini, air lemon, bawang putih dan garam; proses sampai lembut.',
      'Tuang air dingin sedikit demi sedikit sampai tekstur creamy.',
      'Sajikan dalam mangkuk, buat cekungan di tengah, siram minyak zaitun.',
      'Sajikan dengan roti pita hangat, irisan timun atau wortel.'
    ],
    plating: 'Tata hummus di piring dangkal, beri minyak zaitun, paprika bubuk dan daun peterseli.',
    substitutions: ['Tahini diganti selai kacang encer (rasa berbeda)', 'Chickpea kaleng bisa langsung dipakai'],
    allergens: ['Wijen (tahini)', 'Gandum (pita)'],
    storage: 'Hummus tahan 4 hari di kulkas dalam wadah kedap udara.'
  }),
  recipe({
    id: 230, slug: 'greek-salad',
    name: 'Greek Salad', country: 'Yunani', region: 'Mediterania', cuisine: 'international',
    meal: ['lunch', 'healthy'],
    description: 'Salad Yunani dengan tomat, timun, bawang, zaitun dan keju feta dengan dressing minyak zaitun.',
    image: null,
    servings: 3, servingSize: '1 mangkuk (± 200 g)', prepTime: 15, cookTime: 0, difficulty: 'Mudah',
    equipment: ['Pisau', 'Mangkuk besar', 'Sendok'],
    ingredients: [
      ing('Tomat', 250, 'g', 250),
      ing('Timun', 200, 'g', 200, 108),
      ing('Bawang bombai', 80, 'g', 80),
      ing('Paprika', 100, 'g', 100),
      ing('Selada', 100, 'g', 100, 104),
      ing('Keju feta', 120, 'g', 120),
      ing('Olive', 60, 'g', 60),
      ing('Minyak zaitun', 3, 'sdm', 30),
      ing('Lemon', 0.5, 'buah', 15),
      ing('Garam', 0.5, 'sdt', 2, 237),
      ing('Lada hitam', 0.25, 'sdt', 1)
    ],
    steps: [
      'Potong tomat, timun, paprika dan bawang bombai ukuran sama.',
      'Cuci selada, keringkan, suwir kasar.',
      'Campur minyak zaitun, air lemon, garam dan lada sebagai dressing.',
      'Aduk semua bahan, tambahkan keju feta potong dan zaitun.',
      'Sajikan segera dengan roti perancis atau pita.'
    ],
    plating: 'Tata di mangkuk lebar, letakkan feta utuh di tengah dengan daun oregano.',
    substitutions: ['Keju feta diganti keju kotta / mozzarella', 'Zaitun bisa dilewati'],
    allergens: ['Susu', 'Sulfit (zaitun kaleng)'],
    storage: 'Salad sebaiknya segera dikonsumsi; simpan dressing terpisah jika akan disimpan.'
  })
];
