'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/ProductCard';
import { Product } from '@/lib/types';
import { ArrowRight } from 'lucide-react';
import { fetchTires, isValidTire, mapTireRavenItemToTire, type Tire } from '@/lib/api/tireraven';

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLatestProducts() {
      try {
        setLoading(true);
        const response = await fetchTires({ page: 1, per_page: 4 });
        const tires = response.success
          ? response.data.filter(isValidTire).map(mapTireRavenItemToTire)
          : [];
        
        if (tires.length > 0) {
          // Take the first 4 products (or however many are available)
          const latestTires = tires.slice(0, 4);
          
          // Map Tire to Product format
          const mappedProducts: Product[] = latestTires.map((tire: Tire) => ({
            id: tire.id,
            name: tire.name,
            brand: tire.brand,
            price: tire.price,
            images: [tire.image],
            category: 'tires',
            inStock: tire.stock > 0,
            rating: 0,
            reviewCount: 0,
            size: tire.size,
            loadIndex: tire.loadIndex,
            speedRating: tire.speedRating,
            features: [],
          }));
          
          setProducts(mappedProducts);
        }
      } catch (error) {
        console.error('Error loading featured products:', error);
      } finally {
        setLoading(false);
      }
    }

    loadLatestProducts();
  }, []);

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="container">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-red-600">Browse online</p>
            <h2 className="text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl">Current tire listings</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Confirm availability with our local team
            </p>
          </div>
          <Button asChild className="hidden h-11 bg-red-600 font-bold hover:bg-red-700 sm:inline-flex">
            <Link href="/tires">
              View Inventory
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
                <div className="bg-zinc-200 h-48 rounded mb-4"></div>
                <div className="bg-zinc-200 h-4 rounded mb-2"></div>
                <div className="bg-zinc-200 h-4 rounded w-2/3"></div>
              </div>
            ))
          ) : products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full rounded-xl border border-zinc-200 bg-zinc-50 p-8 text-center">
              <p className="text-zinc-600">Online inventory is unavailable right now. Contact the shop to check current options.</p>
              <Button asChild className="mt-4 bg-red-600 font-bold hover:bg-red-700">
                <Link href="/#quote">Check Availability</Link>
              </Button>
            </div>
          )}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Button asChild className="h-12 w-full bg-red-600 font-bold hover:bg-red-700">
            <Link href="/tires">
              View Inventory
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
