import { createRoot } from 'react-dom/client';
import HomeFlashSale from '../components/HomeFlashSale.jsx';
const node = document.getElementById('home-flash-sale-root');
if (node) createRoot(node).render(<HomeFlashSale />);
