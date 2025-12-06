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
    <section className="py-12 border-y-2 border-zinc-200 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Icon className="h-10 w-10 text-red-600" />
                </div>
                <div>
                  <h3 className="font-black uppercase text-sm mb-1">{feature.title}</h3>
                  <p className="text-sm text-zinc-600 font-medium">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
