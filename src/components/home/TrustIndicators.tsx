import { Shield, Truck, Award, HeadphonesIcon } from 'lucide-react';

export function TrustIndicators() {
  const features = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'On orders over $150',
    },
    {
      icon: Shield,
      title: 'Price Match Guarantee',
      description: 'We beat competitor prices',
    },
    {
      icon: Award,
      title: 'Certified Experts',
      description: 'Professional installation',
    },
    {
      icon: HeadphonesIcon,
      title: '24/7 Support',
      description: 'Always here to help',
    },
  ];

  return (
    <section className="py-10 border-y bg-zinc-50">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <Icon className="h-8 w-8 text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-0.5 text-zinc-900">{feature.title}</h3>
                  <p className="text-xs text-zinc-600">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
