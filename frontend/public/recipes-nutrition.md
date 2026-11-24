# FreshCart — Recipe Nutrition Estimates (Phase 5A.6 / QA 5A.6.1)

All recipe nutrition values shown on `/pages/recipes.html` are **estimates**, not laboratory measurements.

## Method

`frontend/src/js/data/recipe-composition.js` stores a per-100 g (or per-100 ml) composition table for ingredients, then:

```
per-serving value = Σ(ingredient edible grams ÷ 100 × composition per 100 g) ÷ servings
```

Display rounding: kcal and sodium to the nearest 10; protein, carbohydrate, fat and fiber to 1 decimal.

## References

- **TKPI** (Tabel Komposisi Pangan Indonesia) — Indonesian staples, vegetables, coconut, tofu/tempeh, young jackfruit, ketupat.
- **USDA FoodData Central** — meats, fish, dairy, grains, nuts, international ingredients (e.g. Spanish mackerel, bamboo shoots, spring-roll wrappers).
- Typical packaged-condiment labels — soy sauce, oyster sauce, fish sauce, gochujang, miso. Sodium figures are brand averages.

## Limitations

- Cooking loss, evaporation and oil absorption are not modelled. For deep-fried dishes, only ±10% of the frying oil is counted as absorbed; the full amount remains visible in the ingredient list.
- Sodium varies widely by condiment brand and by salted fish products (`ikan asin` uses a USDA salted-fish proxy).
- Recipes with any ingredient missing from the composition table expose the name through `recipe.nutritionUnavailable`, and the detail view displays an explicit “data belum tersedia” note instead of silently under-counting. In the current 60-recipe library there are **zero** unmapped ingredient lines.
- Values are suitable for general menu planning only, not for clinical or regulatory use.
