import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

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
      { name: 'Schedule Appointment', href: '/schedule' },
    ],
    support: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'Find a Store', href: '/locations' },
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
    ],
  };

  return (
    <footer className="bg-black text-white border-t border-zinc-800">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & Contact */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <span className="text-xl font-black">LOS REYES</span>
              <span className="text-xl font-black text-red-600">TIRES</span>
            </Link>
            <p className="text-sm text-zinc-400 mb-4 font-medium">
              Your trusted source for quality tires and wheels since 1995.
            </p>
            <div className="space-y-2 text-sm font-medium">
              <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-red-500 transition-colors">
                <Phone className="h-4 w-4" />
                (123) 456-7890
              </a>
              <a href="mailto:info@losreyestires.com" className="flex items-center gap-2 hover:text-red-500 transition-colors">
                <Mail className="h-4 w-4" />
                info@losreyestires.com
              </a>
              <div className="flex items-center gap-2 text-zinc-400">
                <MapPin className="h-4 w-4" />
                <span>Multiple Locations</span>
              </div>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-black uppercase mb-4 text-sm">Shop</h3>
            <ul className="space-y-2 text-sm font-medium">
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
            <h3 className="font-black uppercase mb-4 text-sm">Services</h3>
            <ul className="space-y-2 text-sm font-medium">
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
            <h3 className="font-black uppercase mb-4 text-sm">Support</h3>
            <ul className="space-y-2 text-sm font-medium">
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
            <h3 className="font-black uppercase mb-4 text-sm">Company</h3>
            <ul className="space-y-2 text-sm font-medium">
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

        <Separator className="my-8 bg-zinc-800" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-zinc-400 font-medium">
            © {new Date().getFullYear()} Los Reyes Tires. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
