import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export function FeaturedCategories() {
  const categories = [
    {
      name: 'New Tires',
      description: 'Premium brand-name tires with warranty',
      href: '/tires',
      image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80',
    },
    {
      name: 'Used Tires',
      description: 'Quality inspected pre-owned tires',
      href: '/tires?condition=used',
      image: '/usedtireimage.png',
    },
    {
      name: 'Wheels',
      description: 'Custom wheels & rims',
      href: '/wheels',
      image: 'https://budstyres.com.au/cdn/shop/collections/Method_Race_Wheels_Collection_Banner_1200x1200.jpg?v=1747982210',
    },
    {
      name: 'Packages',
      description: 'Complete tire & wheel sets',
      href: '/packages',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80',
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-zinc-50">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black mb-2 text-zinc-900">Shop by Category</h2>
          <p className="text-zinc-600">Find exactly what you need for your vehicle</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            return (
              <Link key={category.name} href={category.href} className="group">
                <Card className="h-full overflow-hidden border-2 border-transparent hover:border-red-600 transition-all hover:shadow-2xl rounded-lg">
                  {/* Image Section */}
                  <div className="relative aspect-[5/4] overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    {/* Category Name Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-xl font-black text-white mb-1">
                        {category.name}
                      </h3>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="px-4 py-2.5 bg-white">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-zinc-600 font-medium">{category.description}</p>
                      <ArrowRight className="h-4 w-4 text-red-600 group-hover:translate-x-1 transition-transform flex-shrink-0 ml-2" />
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
