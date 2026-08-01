import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { ArrowRight, CircleDot, Recycle, Route, Settings } from 'lucide-react';

export function FeaturedCategories() {
  const categories = [
    {
      name: 'Tires',
      description: 'Browse current listings or ask us to check a size.',
      href: '/tires',
      icon: CircleDot,
    },
    {
      name: 'Used Tires',
      description: 'Tell us the size and quantity you are looking for.',
      href: '/#quote',
      icon: Recycle,
    },
    {
      name: 'Wheels',
      description: 'Ask about wheel options for your vehicle.',
      href: '/wheels',
      icon: Settings,
    },
    {
      name: 'Tire Hauling',
      description: 'Learn about the shop’s tire hauling service.',
      href: '/hauling',
      icon: Route,
    },
  ];

  return (
    <section className="bg-zinc-50 py-12 sm:py-16">
      <div className="container">
        <div className="mb-8 max-w-2xl sm:mb-10">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-red-600">How we can help</p>
          <h2 className="text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl">Start with what you need</h2>
          <p className="mt-3 text-base leading-7 text-zinc-600">Browse online when listings are available, or send the local team a quick request.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link key={category.name} href={category.href} className="group rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2">
                <Card className="flex h-full min-h-52 flex-col border-zinc-200 bg-white p-6 shadow-sm transition duration-200 group-hover:-translate-y-0.5 group-hover:border-red-200 group-hover:shadow-md">
                  <div className="flex size-11 items-center justify-center rounded-lg bg-red-50 text-red-600">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-xl font-black text-zinc-900">{category.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-zinc-600">{category.description}</p>
                  <span className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-red-600">
                    Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
