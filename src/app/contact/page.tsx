import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Contact Us - Get in Touch',
  description: 'Contact Los Reyes Tires in El Cajon, CA. Call 619-440-6098, visit us at 1245 N 1st St, or send us a message. Open 7 days a week.',
  path: '/contact',
  keywords: ['contact tire shop', 'Los Reyes Tires location', 'tire shop phone number'],
});

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-zinc-900 text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Contact Us</h1>
          <p className="text-xl text-zinc-300">
            We're here to help. Reach out with any questions about tires, wheels, or services.
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-black mb-6">Get In Touch</h2>
                <p className="text-zinc-600 mb-8">
                  Have questions about our tires, wheels, or services? Give us a call or stop by our El Cajon location.
                </p>
              </div>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-red-600 mt-1" />
                    <div>
                      <h3 className="font-bold mb-1">Phone</h3>
                      <a href="tel:619-440-6098" className="text-zinc-600 hover:text-red-600">
                        619-440-6098
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-red-600 mt-1" />
                    <div>
                      <h3 className="font-bold mb-1">Email</h3>
                      <a href="mailto:info@losreyestires.com" className="text-zinc-600 hover:text-red-600">
                        info@losreyestires.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-red-600 mt-1" />
                    <div>
                      <h3 className="font-bold mb-1">Address</h3>
                      <p className="text-zinc-600">
                        1245 N 1st St<br />
                        El Cajon, CA 92021
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="h-6 w-6 text-red-600 mt-1" />
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

            {/* Contact Form */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input id="name" required placeholder="Your name" />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" required placeholder="your@email.com" />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" placeholder="(123) 456-7890" />
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="What can we help you with?" />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Tell us how we can help..."
                    />
                  </div>

                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 font-bold">
                    Send Message
                  </Button>

                  <p className="text-xs text-zinc-500 text-center">
                    We typically respond within 24 hours during business days.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
