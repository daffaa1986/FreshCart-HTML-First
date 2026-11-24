import { createRoot } from 'react-dom/client';
import ProductCatalog from '../components/ProductCatalog.jsx';
const node = document.getElementById('product-catalog-root');
if (node) createRoot(node).render(<ProductCatalog />);
