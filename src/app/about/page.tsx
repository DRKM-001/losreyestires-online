import Image from 'next/image';
import { Award, Users, Wrench, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'About Us - Family Owned Since 2005',
  description: 'Learn about Los Reyes Tires, founded by Polo Reyes in 2005. Family owned for over 19 years, we've grown from a small El Cajon shop to San Diego's trusted tire experts.',
  path: '/about',
  keywords: ['Polo Reyes', 'family owned since 2005', 'El Cajon tire shop', 'San Diego tires'],
});

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Unmatched customer service is at the heart of everything we do.',
    },
    {
      icon: Wrench,
      title: 'Expert Service',
      description: 'Professional tire and wheel services with years of experience.',
    },
    {
      icon: Award,
      title: 'Quality Products',
      description: 'From new premium tires to quality used options for every budget.',
    },
    {
      icon: Users,
      title: 'Community Focused',
      description: 'Serving the El Cajon and San Diego communities with pride.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-zinc-900 to-black text-white py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
              Family Owned Since 2005
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-6">Our Story</h1>
            <p className="text-xl text-zinc-300">
              Over 19 years of serving San Diego with hard work, integrity, and exceptional service.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="relative h-96 md:h-full min-h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/losreyes_000.png"
                alt="Los Reyes Tires Logo"
                fill
                className="object-contain p-8"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-black mb-6">
                Founded by Polo Reyes in 2005
              </h2>
              <div className="space-y-4 text-zinc-700">
                <p className="text-lg">
                  In 2005, Polo Reyes had a vision: to create a family-owned tire shop that would serve the El Cajon 
                  and San Diego communities with honest service, quality products, and unbeatable customer care.
                </p>
                <p className="text-lg">
                  What started as a small family shop has grown into a community staple over 19 years, built on the 
                  foundation of hard-working ethics and a genuine commitment to helping every customer find the 
                  perfect solution for their vehicle.
                </p>
                <p className="text-lg">
                  Today, Los Reyes Tires continues that family legacy, specializing in everything from premium new 
                  tires to quality used options, with a particular expertise in off-road wheels and San Diego's lift culture.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-zinc-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-4">What We Stand For</h2>
            <p className="text-lg text-zinc-600">
              The values that have guided us since day one
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <Card key={value.title} className="border-2">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex p-3 rounded-lg bg-red-50 mb-4">
                      <Icon className="h-8 w-8 text-red-600" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                    <p className="text-sm text-zinc-600">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black mb-8 text-center">What We Offer</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">Complete Tire Services</h3>
                  <ul className="space-y-2 text-zinc-700">
                    <li>• Professional tire installation</li>
                    <li>• Wheel balancing & alignment</li>
                    <li>• Tire rotation & repair</li>
                    <li>• Flat tire fixes</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">Tire Selection</h3>
                  <ul className="space-y-2 text-zinc-700">
                    <li>• New tires - all major brands</li>
                    <li>• Quality used tires</li>
                    <li>• Second-life tires</li>
                    <li>• Semi-new tire options</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">Wheel Specialists</h3>
                  <ul className="space-y-2 text-zinc-700">
                    <li>• Custom off-road wheels</li>
                    <li>• Lift kits & accessories</li>
                    <li>• Wheel customization</li>
                    <li>• Off-road culture experts</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">Convenient Hours</h3>
                  <ul className="space-y-2 text-zinc-700">
                    <li>• Monday - Saturday: 7AM - 7PM</li>
                    <li>• Sunday: 8AM - 3PM</li>
                    <li>• Open 7 days a week</li>
                    <li>• No appointment needed</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Location CTA */}
      <section className="py-16 bg-red-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Visit Us Today</h2>
          <p className="text-xl mb-2">1245 N 1st St, El Cajon, CA 92021</p>
          <p className="text-lg mb-6">Serving El Cajon and the greater San Diego area</p>
          <a
            href="tel:619-440-6098"
            className="inline-block bg-white text-red-600 font-bold px-8 py-3 rounded-md hover:bg-zinc-100 transition-colors"
          >
            Call Us: 619-440-6098
          </a>
        </div>
      </section>
    </div>
  );
}
