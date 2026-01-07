import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Wrench, Phone, Mail, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tire & Wheel Packages - Coming Soon',
  description: 'Complete tire and wheel packages are coming soon to Los Reyes Tires. Contact us for custom package pricing and availability.',
};

export default function PackagesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
      <div className="container py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Content */}
          <div className="mb-12">
            <div className="inline-block bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 animate-pulse">
              Coming Soon
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Tire & Wheel Packages
            </h1>
            <p className="text-xl md:text-2xl text-zinc-300 mb-8">
              We're working on something special! Complete tire and wheel packages will be available soon.
            </p>
            <div className="inline-flex items-center gap-2 text-zinc-400 mb-12">
              <Wrench className="h-5 w-5" />
              <span>Under Construction</span>
            </div>
          </div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="border-2 border-zinc-700 bg-zinc-800/50 backdrop-blur">
              <CardContent className="p-6 text-center">
                <div className="inline-flex p-3 rounded-lg bg-red-600/10 mb-4">
                  <Phone className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Call Us</h3>
                <p className="text-sm text-zinc-400 mb-4">
                  Get custom package pricing over the phone
                </p>
                <a
                  href="tel:619-440-6098"
                  className="text-red-500 hover:text-red-400 font-semibold transition-colors"
                >
                  619-440-6098
                </a>
              </CardContent>
            </Card>

            <Card className="border-2 border-zinc-700 bg-zinc-800/50 backdrop-blur">
              <CardContent className="p-6 text-center">
                <div className="inline-flex p-3 rounded-lg bg-red-600/10 mb-4">
                  <Mail className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Email Us</h3>
                <p className="text-sm text-zinc-400 mb-4">
                  Request a quote for your perfect package
                </p>
                <a
                  href="mailto:info@losreyestires.com"
                  className="text-red-500 hover:text-red-400 font-semibold transition-colors"
                >
                  info@losreyestires.com
                </a>
              </CardContent>
            </Card>

            <Card className="border-2 border-zinc-700 bg-zinc-800/50 backdrop-blur">
              <CardContent className="p-6 text-center">
                <div className="inline-flex p-3 rounded-lg bg-red-600/10 mb-4">
                  <ArrowRight className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Visit Us</h3>
                <p className="text-sm text-zinc-400 mb-4">
                  Come see our tire and wheel options in person
                </p>
                <Link
                  href="/locations"
                  className="text-red-500 hover:text-red-400 font-semibold transition-colors"
                >
                  Find Location
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white font-bold"
            >
              <Link href="/tires">
                Browse Tires
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-zinc-900 font-bold"
            >
              <Link href="/wheels">
                Browse Wheels
              </Link>
            </Button>
          </div>

          {/* Footer Note */}
          <p className="text-sm text-zinc-500 mt-12">
            In the meantime, contact us for custom tire and wheel package quotes tailored to your vehicle.
          </p>
        </div>
      </div>
    </div>
  );
}
