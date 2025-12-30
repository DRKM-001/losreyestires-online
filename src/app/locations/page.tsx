import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Store Locations | Los Reyes Tires',
  description: 'Find Los Reyes Tires locations throughout San Diego County. Visit us in El Cajon, San Diego, and surrounding areas.',
};

const locations = [
  {
    name: 'Los Reyes Tires - El Cajon (Main Location)',
    address: '1245 N 1st St',
    city: 'El Cajon',
    state: 'CA',
    zip: '92021',
    phone: '619-440-6098',
    hours: {
      weekday: 'Mon-Sat: 7:00 AM - 7:00 PM',
      weekend: 'Sunday: 8:00 AM - 3:00 PM',
    },
    googleMapsUrl: 'https://maps.google.com/?q=1245+N+1st+St+El+Cajon+CA+92021',
    features: ['New Tires', 'Used Tires', 'Off-Road Specialists', 'Wheel Alignment', 'Installation'],
    isMain: true,
  },
  {
    name: 'Los Reyes Tire Shop - Downtown San Diego',
    address: '405 16th St',
    city: 'San Diego',
    state: 'CA',
    zip: '92101',
    phone: '619-231-6201',
    hours: {
      weekday: 'Mon-Fri: 7:00 AM - 6:00 PM',
      weekend: 'Sat-Sun: 8:00 AM - 6:00 PM',
    },
    googleMapsUrl: 'https://maps.google.com/?q=405+16th+St+San+Diego+CA+92101',
    features: ['New & Used Tires', 'Road Service', 'Tire Repair', 'Fast Service'],
  },
  {
    name: 'Los Reyes Tire Shop - El Cajon Blvd',
    address: '7267-B El Cajon Blvd',
    city: 'San Diego',
    state: 'CA',
    zip: '92115',
    phone: '619-697-0360',
    hours: {
      weekday: 'Mon-Sat: 8:00 AM - 6:00 PM',
      weekend: 'Sunday: 8:00 AM - 3:00 PM',
    },
    googleMapsUrl: 'https://maps.google.com/?q=7267+El+Cajon+Blvd+San+Diego+CA+92115',
    features: ['New & Used Tires', 'Sunday Service', 'Same Day Service'],
  },
  {
    name: 'Los Reyes Tire Shop - Market St',
    address: '2702 Market St',
    city: 'San Diego',
    state: 'CA',
    zip: '92102',
    phone: '619-288-3846',
    hours: {
      weekday: 'Mon-Sat: 8:00 AM - 6:30 PM',
      weekend: 'Sunday: 8:00 AM - 6:30 PM',
    },
    googleMapsUrl: 'https://maps.google.com/?q=2702+Market+St+San+Diego+CA+92102',
    features: ['New & Used Tires', 'Michelin Tires', 'Brake Service', '7 Days Open'],
  },
  {
    name: 'Los Reyes Tire Shop - Ocean View',
    address: '3658 Ocean View Blvd',
    city: 'San Diego',
    state: 'CA',
    zip: '92113',
    phone: '619-231-6201',
    hours: {
      weekday: 'Mon-Fri: 8:00 AM - 6:00 PM',
      weekend: 'Sat-Sun: 8:00 AM - 5:00 PM',
    },
    googleMapsUrl: 'https://maps.google.com/?q=3658+Ocean+View+Blvd+San+Diego+CA+92113',
    features: ['Tire Sales', 'Installation', 'Repairs'],
  },
  {
    name: 'Los Reyes Tire Shop - Lakeside',
    address: '8828 Winter Gardens Blvd',
    city: 'Lakeside',
    state: 'CA',
    zip: '92040',
    phone: '619-328-2099',
    hours: {
      weekday: 'Mon-Sat: 8:00 AM - 6:00 PM',
      weekend: 'Sunday: 8:00 AM - 5:00 PM',
    },
    googleMapsUrl: 'https://maps.google.com/?q=8828+Winter+Gardens+Blvd+Lakeside+CA+92040',
    features: ['New & Used Tires', 'Best Prices', 'Fast Service', 'Discounted Prices'],
  },
  {
    name: 'Los Reyes Tire Shop - Spring Valley',
    address: '8740 Troy St',
    city: 'Spring Valley',
    state: 'CA',
    zip: '91977',
    phone: '619-467-7490',
    hours: {
      weekday: 'Mon-Fri: 8:00 AM - 6:00 PM',
      weekend: 'Saturday: 8:00 AM - 5:00 PM',
    },
    googleMapsUrl: 'https://maps.google.com/?q=8740+Troy+St+Spring+Valley+CA+91977',
    features: ['New & Used Tires', 'Wheels', 'Brakes', 'Auto Service'],
  },
  {
    name: 'Reyes Tires Pro - Escondido',
    address: '260 N Juniper St',
    city: 'Escondido',
    state: 'CA',
    zip: '92025',
    phone: '442-999-5014',
    hours: {
      weekday: 'Mon-Sat: 8:00 AM - 5:30 PM',
      weekend: 'Sunday: 8:00 AM - 3:00 PM',
    },
    googleMapsUrl: 'https://maps.google.com/?q=260+N+Juniper+St+Escondido+CA+92025',
    features: ['Customer Experience', 'Low Prices', 'Fast Service', 'Alignment'],
  },
];

export default function LocationsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-zinc-900 to-zinc-800 text-white py-16 md:py-20">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Locations</h1>
            <p className="text-xl text-zinc-300">
              Visit any of our Los Reyes Tire locations throughout San Diego County. 
              We're here to serve you with quality tires and expert service.
            </p>
          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="py-16 bg-zinc-50">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Find Your Nearest Location</h2>
            <div className="rounded-lg overflow-hidden shadow-lg border-2 border-zinc-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107023.89291304535!2d-117.08143175!3d32.81531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d95a14c3fb8d85%3A0x2204cb4d3e90fca0!2sLos%20Reyes%20Tires!5e0!3m2!1sen!2sus!4v1704000000000!5m2!1sen!2sus"
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Los Reyes Tires Locations Map"
              />
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4">
              <a 
                href="https://www.google.com/maps/search/Los+Reyes+Tires+San+Diego/@32.8153,-117.1611,11z"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                Open in Google Maps for directions →
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">All Locations</h2>
          <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {locations.map((location, index) => (
              <Card 
                key={index} 
                className={`border-2 ${location.isMain ? 'border-red-600 shadow-lg' : 'hover:border-primary'} transition-colors`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">
                        {location.name}
                        {location.isMain && (
                          <span className="ml-2 text-sm font-normal bg-red-600 text-white px-2 py-1 rounded">
                            Main Location
                          </span>
                        )}
                      </CardTitle>
                      <div className="flex items-start gap-2 text-muted-foreground mb-4">
                        <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                        <div className="text-sm">
                          <p>{location.address}</p>
                          <p>{location.city}, {location.state} {location.zip}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Phone */}
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-red-600" />
                    <a 
                      href={`tel:${location.phone}`} 
                      className="font-semibold text-primary hover:underline"
                    >
                      {location.phone}
                    </a>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-red-600 mt-1" />
                    <div className="text-sm">
                      <p className="font-medium">{location.hours.weekday}</p>
                      <p className="text-muted-foreground">{location.hours.weekend}</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="pt-2">
                    <div className="flex flex-wrap gap-2">
                      {location.features.map((feature, idx) => (
                        <span 
                          key={idx}
                          className="text-xs bg-zinc-100 text-zinc-700 px-2 py-1 rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button asChild className="flex-1">
                      <a 
                        href={location.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Navigation className="h-4 w-4 mr-2" />
                        Get Directions
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="flex-1">
                      <a href={`tel:${location.phone}`}>
                        <Phone className="h-4 w-4 mr-2" />
                        Call Now
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-16 bg-zinc-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Serving All of San Diego County</h2>
            <p className="text-lg text-muted-foreground mb-8">
              With multiple locations throughout San Diego County, Los Reyes Tires is your 
              trusted local tire shop. We proudly serve:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              {[
                'El Cajon',
                'San Diego',
                'La Mesa',
                'Spring Valley',
                'Lakeside',
                'Escondido',
                'La Jolla',
                'Temecula',
                'Lemon Grove',
                'National City',
                'Chula Vista',
                'Coronado',
                'Imperial Beach',
                'Bonita',
                'Santee',
                'East County',
              ].map((area, index) => (
                <div key={index} className="bg-white p-3 rounded-lg shadow-sm">
                  {area}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-red-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Visit Us Today</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            No appointment necessary! Walk-ins welcome at all locations. 
            Our expert team is ready to help you find the perfect tires.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <a href="/contact">Contact Us</a>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-red-600" asChild>
              <a href="/products">Shop Tires</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
