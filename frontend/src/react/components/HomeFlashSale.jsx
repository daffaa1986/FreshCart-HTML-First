import ProductCard from './ProductCard.jsx';
import { flashSaleProducts } from '../../js/data/products.js';
export default function HomeFlashSale() {
  return <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2 lg:grid-cols-4">{flashSaleProducts.map((product) => <ProductCard key={product.id} product={product} variant="flash" />)}</div>;
}
