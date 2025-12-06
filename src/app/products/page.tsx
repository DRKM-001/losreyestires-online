import { ProductCard } from '@/components/products/ProductCard';
import { Product } from '@/lib/types';

export default function ProductsPage() {
  // TODO: Fetch from ERP API
  const products: Product[] = [];

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">All Products</h1>
      {products.length === 0 ? (
        <p className="text-muted-foreground">
          Products will be populated from the ERP inventory API.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
