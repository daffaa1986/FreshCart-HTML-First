// FreshCart — Recipe library entry (Phase 5A.6)
import { indonesianRecipes } from './recipes-indonesia.js';
import { internationalRecipes } from './recipes-international.js';
import { NUTRITION_METHOD, COMPOSITION, estimateNutrition } from './recipe-composition.js';
import recipeImageMap from './recipe-images.js';

export const FALLBACK_RECIPE_IMAGE = '/images/recipes/recipe-fallback.svg';

/**
 * Attach the best available local image to each recipe.
 * `recipe-images.json` maps slug -> { path, source, creator, license, attribution }.
 * Slugs without a verified local asset keep `image: null` and the UI renders
 * a designed fallback (no hotlinking, no invented paths).
 */
function withImage(recipe) {
  const meta = recipeImageMap[recipe.slug];
  return {
    ...recipe,
    image: recipe.image || meta?.path || null,
    imageCredit: recipe.image ? null : (meta || null)
  };
}

export const recipes = [...indonesianRecipes, ...internationalRecipes].map(withImage);

export const indonesianCount = indonesianRecipes.length;
export const internationalCount = internationalRecipes.length;

export const featuredRecipes = recipes.filter((r) => r.featured);

export const cuisineHighlights = {
  indonesian: recipes.filter((r) => r.cuisine === 'indonesian').slice(0, 8),
  international: recipes.filter((r) => r.cuisine === 'international').slice(0, 8)
};

export const MEAL_LABELS = {
  breakfast: 'Sarapan',
  lunch: 'Makan Siang',
  dinner: 'Makan Malam',
  healthy: 'Menu Sehat'
};

export const DIFFICULTIES = ['Mudah', 'Sedang', 'Sulit'];

export const TIME_FILTERS = [
  { id: 'cepat', label: '< 30 menit', test: (r) => r.totalTime < 30 },
  { id: 'sedang', label: '30–60 menit', test: (r) => r.totalTime >= 30 && r.totalTime <= 60 },
  { id: 'lama', label: '> 60 menit', test: (r) => r.totalTime > 60 }
];

const uniqueRegions = [...new Set(recipes.map((r) => `${r.cuisine === 'indonesian' ? 'ID' : 'INT'}|${r.region}`))]
  .sort((a, b) => a.localeCompare(b));

export const REGION_OPTIONS = uniqueRegions.map((value) => {
  const [cuisine, region] = value.split('|');
  return { value, label: region, cuisine };
});

/** Find linked catalog products for a recipe (ids must exist in products.js). */
export function linkedProductIds(recipe) {
  return [...new Set(recipe.ingredients.map((i) => i.productId).filter(Boolean))];
}

export function getRecipeBySlug(slug) {
  return recipes.find((r) => r.slug === slug) || null;
}

export function searchRecipes(query, list = recipes) {
  const q = String(query || '').trim().toLowerCase();
  if (!q) return list;
  return list.filter((r) => {
    const haystack = [
      r.name, r.description, r.country, r.region,
      ...r.meal.map((m) => MEAL_LABELS[m] || m),
      ...r.ingredients.map((i) => i.name)
    ].join(' ').toLowerCase();
    return haystack.includes(q);
  });
}

export { NUTRITION_METHOD, COMPOSITION, estimateNutrition };
