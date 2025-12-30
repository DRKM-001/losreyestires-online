import { Card, CardContent } from '@/components/ui/card';
import { Package, Truck, MapPin, Clock } from 'lucide-react';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Shipping Information',
  description: 'Learn about our shipping options, delivery times, and policies for tires, wheels, and accessories at Los Reyes Tires.',
  path: '/shipping',
});

export default function ShippingPage() {
  const shippingOptions = [
    {
      icon: Truck,
      title: 'Standard Shipping',
      time: '5-7 Business Days',
      description: 'Free shipping on orders over $500. Perfect for most orders.',
    },
    {
      icon: Package,
      title: 'Express Shipping',
      time: '2-3 Business Days',
      description: 'Get your tires and wheels faster with expedited delivery.',
    },
    {
      icon: MapPin,
      title: 'Local Pickup',
      time: 'Same Day',
      description: 'Skip shipping! Pick up your order at our El Cajon location.',
    },
    {
      icon: Clock,
      title: 'Installation Available',
      time: 'Scheduled Appointment',
      description: 'Order online, install in-store. We\'ll mount and balance for you.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-zinc-900 text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Shipping Information</h1>
          <p className="text-xl text-zinc-300">
            Fast, reliable delivery for all your tire and wheel needs.
          </p>
        </div>
      </section>

      {/* Shipping Options */}
      <section className="py-16">
        <div className="container max-w-6xl">
          <h2 className="text-3xl font-black mb-8 text-center">Shipping Options</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {shippingOptions.map((option) => {
              const Icon = option.icon;
              return (
                <Card key={option.title} className="border-2">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-red-50">
                        <Icon className="h-6 w-6 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold mb-1">{option.title}</h3>
                        <p className="text-sm text-red-600 font-semibold mb-2">{option.time}</p>
                        <p className="text-sm text-zinc-600">{option.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Free Shipping Banner */}
      <section className="py-12 bg-red-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-black mb-3">Free Shipping on Orders Over $500</h2>
          <p className="text-lg">
            Get your tires and wheels delivered right to your door at no extra cost.
          </p>
        </div>
      </section>

      {/* Shipping Details */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-black mb-8">Shipping Details</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-3">Processing Time</h3>
              <p className="text-zinc-700">
                Orders are typically processed within 1-2 business days. You will receive a tracking number 
                via email once your order ships. In-stock items ship faster, while special orders may take longer.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Service Area</h3>
              <p className="text-zinc-700 mb-3">
                We ship tires, wheels, and accessories throughout the continental United States. 
                Local customers in San Diego County can take advantage of:
              </p>
              <ul className="space-y-2 text-zinc-700">
                <li>• Free local pickup at our El Cajon location</li>
                <li>• Same-day pickup for in-stock items</li>
                <li>• Installation services available by appointment</li>
                <li>• Local delivery options (contact us for details)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Shipping Rates</h3>
              <ul className="space-y-2 text-zinc-700">
                <li>• <strong>Orders over $500:</strong> FREE standard shipping</li>
                <li>• <strong>Orders under $500:</strong> Starting at $49.99 per set of 4 tires</li>
                <li>• <strong>Express shipping:</strong> Additional $99.99</li>
                <li>• <strong>Single tire shipping:</strong> Starting at $19.99</li>
                <li>• <strong>Wheel & tire packages:</strong> Custom quote based on size and weight</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">What's Included</h3>
              <p className="text-zinc-700 mb-3">
                All shipments include:
              </p>
              <ul className="space-y-2 text-zinc-700">
                <li>• Fully insured shipping</li>
                <li>• Tracking number provided</li>
                <li>• Signature required for delivery (high-value orders)</li>
                <li>• Secure packaging to prevent damage</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Tracking Your Order</h3>
              <p className="text-zinc-700">
                Once your order ships, you'll receive an email with a tracking number. You can track your 
                shipment directly through the carrier's website. For questions about your order status, 
                contact us at 619-440-6098.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Installation Services</h3>
              <p className="text-zinc-700">
                Order online and have your tires installed at our shop! We offer professional mounting, 
                balancing, and installation services. Schedule an appointment when you place your order 
                or call us to coordinate timing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 bg-zinc-50">
        <div className="container max-w-4xl">
          <Card className="border-2">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-black mb-3">Questions About Shipping?</h3>
              <p className="text-zinc-600 mb-6">
                Our team is here to help with shipping questions, special delivery requests, or installation scheduling.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:619-440-6098"
                  className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-md transition-colors"
                >
                  Call 619-440-6098
                </a>
                <a
                  href="/contact"
                  className="inline-block bg-white hover:bg-zinc-100 text-zinc-900 font-bold px-8 py-3 rounded-md border-2 transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
