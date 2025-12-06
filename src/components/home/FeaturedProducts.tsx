import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/ProductCard';
import { Product } from '@/lib/types';
import { ArrowRight } from 'lucide-react';

export function FeaturedProducts() {
  // TODO: Replace with API call to ERP backend
  const featuredProducts: Product[] = [
    {
      id: '1',
      name: 'Michelin Defender T+H All-Season Tire',
      brand: 'Michelin',
      price: 189.99,
      salePrice: 159.99,
      images: ['/placeholder-tire.jpg'],
      category: 'tires',
      inStock: true,
      rating: 4.5,
      reviewCount: 342,
      size: '225/65R17',
      loadIndex: '102',
      speedRating: 'H',
      warranty: '80,000 miles',
      features: ['All-Season Traction', 'Long Tread Life', 'Comfortable Ride'],
    },
    {
      id: '2',
      name: 'Bridgestone Turanza QuietTrack',
      brand: 'Bridgestone',
      price: 179.99,
      images: ['/placeholder-tire.jpg'],
      category: 'tires',
      inStock: true,
      rating: 4.7,
      reviewCount: 218,
      size: '235/55R18',
      loadIndex: '100',
      speedRating: 'V',
      warranty: '70,000 miles',
    },
    {
      id: '3',
      name: 'Goodyear Wrangler All-Terrain Adventure',
      brand: 'Goodyear',
      price: 199.99,
      salePrice: 174.99,
      images: ['/placeholder-tire.jpg'],
      category: 'tires',
      inStock: true,
      rating: 4.6,
      reviewCount: 156,
      size: 'LT265/70R17',
      loadIndex: '121',
      speedRating: 'S',
      warranty: '60,000 miles',
    },
    {
      id: '4',
      name: 'Continental CrossContact LX25',
      brand: 'Continental',
      price: 169.99,
      images: ['/placeholder-tire.jpg'],
      category: 'tires',
      inStock: false,
      rating: 4.4,
      reviewCount: 89,
      size: '225/60R18',
      loadIndex: '100',
      speedRating: 'H',
      warranty: '70,000 miles',
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-zinc-50">
      <div className="container">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-3">Featured Products</h2>
            <p className="text-zinc-600 text-lg font-medium">
              Top-Rated Tires At Unbeatable Prices
            </p>
          </div>
          <Link href="/products">
            <Button className="hidden sm:flex bg-black hover:bg-zinc-800 font-bold uppercase">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/products">
            <Button className="bg-black hover:bg-zinc-800 font-bold uppercase">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
