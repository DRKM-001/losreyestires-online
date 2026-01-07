import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, MessageCircle, Star } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { GoogleIcon } from '@/components/icons/GoogleIcon';

export function Footer() {
  const footerLinks = {
    shop: [
      { name: 'Tires by Vehicle', href: '/tires/by-vehicle' },
      { name: 'Tires by Size', href: '/tires/by-size' },
      { name: 'Wheels', href: '/wheels' },
      { name: 'Tire & Wheel Packages', href: '/packages' },
      { name: 'Special Offers', href: '/deals' },
    ],
    services: [
      { name: 'Tire Installation', href: '/services/installation' },
      { name: 'Wheel Alignment', href: '/services/alignment' },
      { name: 'Tire Rotation', href: '/services/rotation' },
      { name: 'Balancing', href: '/services/balancing' },
      { name: 'Tire Hauling', href: '/hauling' },
      { name: 'Schedule Appointment', href: '/schedule' },
    ],
    support: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'Find a Store', href: '/locations' },
      { name: 'Financing Options', href: '/financing' },
      { name: 'Tire & Wheel Encyclopedia', href: '/encyclopedia' },
      { name: 'Shipping Info', href: '/shipping' },
      { name: 'Returns', href: '/returns' },
      { name: 'FAQ', href: '/faq' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Warranty Info', href: '/warranty' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Messaging Terms', href: '/messaging-terms' },
    ],
  };

  return (
    <footer className="bg-zinc-900 text-white">
      <div className="container py-12 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & Contact */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="/losreyes_000White.png"
                alt="Los Reyes Tires"
                width={200}
                height={80}
                className="h-16 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-zinc-400 mb-4">
              <span className="text-zinc-300 font-semibold">Family Owned Since 2005.</span> Founded by Polo Reyes, Los Reyes Tires has been San Diego's trusted source for quality tires, wheels, and expert service for over 19 years.
            </p>
            <div className="space-y-2.5 text-sm">
              <a href="tel:619-440-6098" className="flex items-center gap-2 hover:text-red-500 transition-colors text-zinc-300">
                <Phone className="h-4 w-4" />
                619-440-6098
              </a>
              <a href="https://wa.me/16197299468" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-red-500 transition-colors text-zinc-300">
                <MessageCircle className="h-4 w-4" />
                WhatsApp: (619) 729-9468
              </a>
              <a href="mailto:info@losreyestires.com" className="flex items-center gap-2 hover:text-red-500 transition-colors text-zinc-300">
                <Mail className="h-4 w-4" />
                info@losreyestires.com
              </a>
              <div className="flex items-center gap-2 text-zinc-400">
                <MapPin className="h-4 w-4" />
                <span>1245 N 1st St, El Cajon, CA 92021</span>
              </div>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-bold mb-4 text-sm text-white">Shop</h3>
            <ul className="space-y-2.5 text-sm">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-zinc-400 hover:text-red-500 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold mb-4 text-sm text-white">Services</h3>
            <ul className="space-y-2.5 text-sm">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-zinc-400 hover:text-red-500 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold mb-4 text-sm text-white">Support</h3>
            <ul className="space-y-2.5 text-sm">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-zinc-400 hover:text-red-500 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold mb-4 text-sm text-white">Company</h3>
            <ul className="space-y-2.5 text-sm">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-zinc-400 hover:text-red-500 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-zinc-700" />

        {/* Review CTA */}
        <div className="mb-6">
          <a
            href="https://g.page/r/CVxUx3jWbjPzEAE/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-zinc-900 rounded-lg font-semibold hover:bg-zinc-100 transition-colors"
          >
            <GoogleIcon className="h-5 w-5" />
            <span>Review Us on Google</span>
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          </a>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-zinc-400">
            © {new Date().getFullYear()} Los Reyes Tires. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a href="https://www.yelp.com/biz/los-reyes-tire-shop-el-cajon" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" aria-label="Yelp">
              <Image
                src="/yelp_logos/Burst/yelp_burst.svg"
                alt="Yelp"
                width={20}
                height={20}
                className="h-5 w-5"
              />
            </a>
            <a href="https://wa.me/16197299468" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-red-500 transition-colors" aria-label="WhatsApp">
              <MessageCircle className="h-5 w-5" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-red-500 transition-colors" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-red-500 transition-colors" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-red-500 transition-colors" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
