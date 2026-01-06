import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Truck, 
  Shield, 
  CheckCircle, 
  Leaf, 
  Phone, 
  Calendar,
  FileCheck,
  Recycle,
  Clock,
  MapPin
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tire Hauling & Waste Management Services | Los Reyes Tires San Diego',
  description: 'Professional tire scrap hauling and waste management in San Diego. Licensed, insured, and eco-friendly tire disposal services. Free pickup estimates for businesses and tire shops.',
  keywords: 'tire hauling San Diego, tire waste disposal, scrap tire removal, tire recycling service, commercial tire hauling, tire disposal El Cajon, California tire waste management',
  openGraph: {
    title: 'Licensed Tire Hauling Services - Los Reyes Tires',
    description: 'Professional tire scrap hauling and waste management in San Diego County. Fully licensed, insured, and eco-friendly.',
    type: 'website',
  },
};

export default function HaulingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-green-600 hover:bg-green-600 mb-4 text-sm font-bold">
              Licensed & Insured
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
              Professional Tire Hauling & Waste Management
            </h1>
            <p className="text-xl md:text-2xl text-zinc-300 mb-8 leading-relaxed">
              San Diego County's trusted tire scrap hauling service. Fully licensed, insured, and committed to eco-friendly tire disposal and recycling.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-lg font-bold h-14 px-8">
                <Phone className="mr-2 h-5 w-5" />
                Call for Free Estimate
              </Button>
              <Button size="lg" variant="outline" className="bg-white hover:bg-zinc-100 text-zinc-900 text-lg font-bold h-14 px-8 border-2">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Pickup
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-white border-y">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <Shield className="h-12 w-12 text-red-600 mx-auto mb-3" />
              <p className="font-bold text-zinc-900">Fully Licensed</p>
              <p className="text-sm text-zinc-600">State Certified</p>
            </div>
            <div className="text-center">
              <FileCheck className="h-12 w-12 text-red-600 mx-auto mb-3" />
              <p className="font-bold text-zinc-900">Fully Insured</p>
              <p className="text-sm text-zinc-600">Liability Coverage</p>
            </div>
            <div className="text-center">
              <Leaf className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <p className="font-bold text-zinc-900">Eco-Friendly</p>
              <p className="text-sm text-zinc-600">100% Recycling</p>
            </div>
            <div className="text-center">
              <Truck className="h-12 w-12 text-red-600 mx-auto mb-3" />
              <p className="font-bold text-zinc-900">Fast Service</p>
              <p className="text-sm text-zinc-600">Same-Day Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-20 bg-zinc-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mb-4">
              Our Tire Hauling Services
            </h2>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
              Comprehensive tire waste management solutions for businesses, tire shops, and commercial operations throughout San Diego County.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Truck className="h-10 w-10 text-red-600 mb-3" />
                <CardTitle>Commercial Tire Pickup</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-600 mb-4">
                  Scheduled and on-demand tire scrap pickup for tire shops, auto repair centers, and dealerships.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Flexible scheduling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">High-volume capacity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Competitive pricing</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Recycle className="h-10 w-10 text-green-600 mb-3" />
                <CardTitle>Tire Recycling & Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-600 mb-4">
                  Environmentally responsible tire disposal and recycling through certified processing facilities.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">100% recycling rate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">EPA compliant</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Documentation provided</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-10 w-10 text-red-600 mb-3" />
                <CardTitle>Waste Management Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-600 mb-4">
                  Help your business meet California tire waste regulations with our certified hauling service.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">State licensed operation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Proper manifests</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Audit trail records</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mb-6">
                Why Choose Los Reyes Tire Hauling?
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Clock className="h-8 w-8 text-red-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Reliable & Punctual</h3>
                    <p className="text-zinc-600">
                      We show up on time, every time. Same-day and emergency pickup available for urgent needs.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <MapPin className="h-8 w-8 text-red-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Local San Diego Service</h3>
                    <p className="text-zinc-600">
                      Based in El Cajon, serving all of San Diego County with fast response times and local expertise.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Shield className="h-8 w-8 text-red-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Fully Licensed & Insured</h3>
                    <p className="text-zinc-600">
                      Registered California tire hauler with full liability insurance. Your business is protected.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Leaf className="h-8 w-8 text-green-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Environmental Commitment</h3>
                    <p className="text-zinc-600">
                      Every tire is recycled responsibly. We partner with certified processors to ensure zero landfill waste.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-zinc-100 to-zinc-50 p-8 rounded-lg">
              <h3 className="text-2xl font-black text-zinc-900 mb-6">Service Areas</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>El Cajon</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>San Diego</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>La Mesa</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Santee</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Spring Valley</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Lemon Grove</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Chula Vista</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>National City</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Poway</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Escondido</span>
                </div>
              </div>
              <p className="text-sm text-zinc-600 mt-4">
                And surrounding San Diego County areas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-red-600 to-red-700 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Ready to Schedule Your Tire Pickup?
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Get a free estimate today. No obligation, competitive pricing, and fast service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white hover:bg-zinc-100 text-red-600 text-lg font-bold h-14 px-8">
              <Phone className="mr-2 h-5 w-5" />
              Call (619) XXX-XXXX
            </Button>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="bg-transparent border-2 border-white hover:bg-white hover:text-red-600 text-white text-lg font-bold h-14 px-8">
                Contact Us Online
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-zinc-50">
        <div className="container max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you service residential customers?</CardTitle>
              </CardHeader>
              <CardContent className="text-zinc-600">
                Our hauling service is primarily designed for commercial operations, tire shops, and businesses. For residential tire disposal, please visit our retail location in El Cajon.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What types of tires do you accept?</CardTitle>
              </CardHeader>
              <CardContent className="text-zinc-600">
                We accept all passenger vehicle tires, light truck tires, SUV tires, and commercial vehicle tires. Special arrangements can be made for larger tires and specialty equipment.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How quickly can you schedule a pickup?</CardTitle>
              </CardHeader>
              <CardContent className="text-zinc-600">
                We offer same-day pickup for urgent needs and can schedule regular pickups on a weekly, bi-weekly, or monthly basis depending on your volume.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Are you licensed and insured?</CardTitle>
              </CardHeader>
              <CardContent className="text-zinc-600">
                Yes! Los Reyes Tire Hauling is a fully licensed California tire hauler and carries comprehensive liability insurance. We provide all required documentation and manifests.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How is pricing determined?</CardTitle>
              </CardHeader>
              <CardContent className="text-zinc-600">
                Pricing is based on volume, pickup frequency, and location. Contact us for a free, no-obligation quote tailored to your business needs.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
