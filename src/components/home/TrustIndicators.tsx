import { CalendarDays, Clock, MapPin, MessageCircle } from 'lucide-react';

export function TrustIndicators() {
  const features = [
    {
      icon: CalendarDays,
      title: 'Family owned',
      description: 'Serving customers since 2005',
    },
    {
      icon: MapPin,
      title: 'One local shop',
      description: '1245 N 1st St, El Cajon',
    },
    {
      icon: MessageCircle,
      title: 'Human help',
      description: 'Call or message the shop directly',
    },
    {
      icon: Clock,
      title: 'Open 7 Days',
      description: 'Mon-Sat 7AM-7PM | Sun 8AM-3PM',
    },
  ];

  return (
    <section className="border-b bg-white py-8 sm:py-10" aria-label="Shop information">
      <div className="container">
        <div className="grid grid-cols-2 gap-x-5 gap-y-7 lg:grid-cols-4 lg:gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <Icon className="mt-0.5 h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="mb-1 text-sm font-bold text-zinc-900">{feature.title}</h2>
                  <p className="text-xs leading-5 text-zinc-600">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
