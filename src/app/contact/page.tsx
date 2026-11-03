import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ContactForm } from '@/components/contact/ContactForm';
import { generatePageMetadata } from '@/lib/metadata';
import { WhatsAppIcon } from '@/components/brand/WhatsAppIcon';
import { ShopWaLink } from '@/components/brand/ShopWaLink';
import { PageHero, heroBtn } from '@/components/layout/PageHero';

export const metadata = generatePageMetadata({
  title: 'Contact Us - Get in Touch',
  description: 'Contact Los Reyes Tires in El Cajon, CA. Call 619-440-6098, visit us at 1245 N 1st St, or send us a message. Open 7 days a week.',
  path: '/contact',
  keywords: ['contact tire shop', 'Los Reyes Tires location', 'tire shop phone number'],
});

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-zinc-50">
      <PageHero chip="Talk to the local team" title={<>Contact <span className="display-italic text-blaze-500">Los Reyes Tires</span></>}
        lede="Call, WhatsApp, or send a request with questions about tires, wheels, and what's in stock.">
        <a href="tel:+16194406098" className={heroBtn.primary}><Phone className="h-4 w-4" aria-hidden="true" />Call 619-440-6098</a>
        <ShopWaLink className={heroBtn.wa}><WhatsAppIcon className="h-4 w-4" />WhatsApp</ShopWaLink>
        <Link href="/locations" className={heroBtn.ghost}><MapPin className="h-4 w-4 text-blaze-400" aria-hidden="true" />Shop details</Link>
      </PageHero>

      <section className="py-10 sm:py-14">
        <div className="container">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
            <div className="space-y-5">
              <div>
                <h2 className="text-2xl font-black tracking-tight sm:text-3xl">Shop information</h2>
                <p className="mt-3 leading-7 text-zinc-600">
                  Stop by the El Cajon shop during business hours or call ahead to discuss what you need.
                </p>
              </div>

              <Card className="border-zinc-200 shadow-sm">
                <CardContent className="space-y-1 p-4 sm:p-6">
                  <div className="flex min-h-16 items-start gap-4 rounded-lg p-3">
                    <Phone className="mt-0.5 h-5 w-5 text-red-600" aria-hidden="true" />
                    <div>
                      <h3 className="mb-1 font-bold">Phone</h3>
                      <a href="tel:619-440-6098" className="inline-flex min-h-11 items-center font-semibold text-zinc-700 hover:text-red-600">
                        619-440-6098
                      </a>
                    </div>
                  </div>

                  <div className="flex min-h-16 items-start gap-4 rounded-lg p-3">
                    <Mail className="mt-0.5 h-5 w-5 text-red-600" aria-hidden="true" />
                    <div>
                      <h3 className="font-bold mb-1">Email</h3>
                      <a href="mailto:sales@losreyestires.com" className="inline-flex min-h-11 items-center break-all font-semibold text-zinc-700 hover:text-red-600">
                        sales@losreyestires.com
                      </a>
                    </div>
                  </div>

                  <div className="flex min-h-16 items-start gap-4 rounded-lg p-3">
                    <MapPin className="mt-0.5 h-5 w-5 text-red-600" aria-hidden="true" />
                    <div>
                      <h3 className="font-bold mb-1">Address</h3>
                      <p className="text-zinc-600">
                        1245 N 1st St<br />
                        El Cajon, CA 92021
                      </p>
                    </div>
                  </div>

                  <div className="flex min-h-16 items-start gap-4 rounded-lg p-3">
                    <Clock className="mt-0.5 h-5 w-5 text-red-600" aria-hidden="true" />
                    <div>
                      <h3 className="font-bold mb-1">Hours</h3>
                      <div className="text-zinc-600 text-sm space-y-1">
                        <p>Mon-Sat: 7:00 AM - 7:00 PM</p>
                        <p>Sunday: 8:00 AM - 3:00 PM</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-zinc-200 shadow-sm">
              <CardContent className="p-5 sm:p-7 lg:p-8">
                <h2 className="text-2xl font-black tracking-tight">Send a message</h2>
                <p className="mb-6 mt-2 text-sm leading-6 text-zinc-600">Share the vehicle, tire size, or question you have. The shop will respond using the contact details you provide.</p>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
