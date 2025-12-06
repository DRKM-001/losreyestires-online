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
    <section className="py-16 md:py-20 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black uppercase mb-3">Shop by Category</h2>
          <p className="text-zinc-600 text-lg max-w-2xl mx-auto font-medium">
            Everything You Need For Your Vehicle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link key={category.name} href={category.href}>
                <Card className="h-full transition-all hover:shadow-xl hover:-translate-y-1 border-2 hover:border-red-600">
                  <CardContent className="p-8 flex flex-col items-center text-center">
                    <div className="mb-4 p-4 rounded-lg bg-black">
                      <Icon className={`h-10 w-10 text-red-600`} />
                    </div>
                    <h3 className="text-xl font-black uppercase mb-2">{category.name}</h3>
                    <p className="text-sm text-zinc-600 font-medium">{category.description}</p>
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
