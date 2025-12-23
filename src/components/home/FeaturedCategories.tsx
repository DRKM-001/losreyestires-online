import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Gauge, Disc3, Package, Wrench } from 'lucide-react';

export function FeaturedCategories() {
  const categories = [
    {
      name: 'Tires',
      description: 'Premium tires for every vehicle',
      icon: Gauge,
      href: '/tires',
      color: 'text-blue-500',
    },
    {
      name: 'Wheels',
      description: 'Custom wheels that make a statement',
      icon: Disc3,
      href: '/wheels',
      color: 'text-purple-500',
    },
    {
      name: 'Packages',
      description: 'Complete tire & wheel packages',
      icon: Package,
      href: '/packages',
      color: 'text-green-500',
    },
    {
      name: 'Services',
      description: 'Professional installation & maintenance',
      icon: Wrench,
      href: '/services',
      color: 'text-orange-500',
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black mb-2 text-zinc-900">Top Categories</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link key={category.name} href={category.href}>
                <Card className="h-full transition-all hover:shadow-lg border hover:border-red-600 group">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="mb-4 p-3 rounded-lg bg-zinc-100 group-hover:bg-red-50 transition-colors">
                      <Icon className="h-8 w-8 text-red-600" />
                    </div>
                    <h3 className="text-lg font-bold mb-1.5 text-zinc-900 group-hover:text-red-600 transition-colors">{category.name}</h3>
                    <p className="text-sm text-zinc-600">{category.description}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
