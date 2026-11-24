import { createRoot } from 'react-dom/client';
import RecipeLibrary from '../components/RecipeLibrary.jsx';
const node = document.getElementById('recipes-root');
if (node) createRoot(node).render(<RecipeLibrary />);
