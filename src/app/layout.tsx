import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Newsletter } from "@/components/layout/Newsletter";
import { SnapFinanceBanner } from "@/components/financing/SnapFinanceBanner";
import { siteConfig } from "@/lib/metadata";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: siteConfig.metadataBase,
  title: {
    default: siteConfig.name + ' - New & Used Tires, Off-Road Wheels | El Cajon, CA',
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  publisher: siteConfig.publisher,
  formatDetection: siteConfig.formatDetection,
  alternates: siteConfig.alternates,
  openGraph: siteConfig.openGraph,
  twitter: siteConfig.twitter,
  robots: siteConfig.robots,
  verification: siteConfig.verification,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TireShop',
    name: 'Los Reyes Tires',
    image: 'https://losreyestires.com/losreyes_000.png',
    '@id': 'https://losreyestires.com',
    url: 'https://losreyestires.com',
    telephone: '619-440-6098',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1245 N 1st St',
      addressLocality: 'El Cajon',
      addressRegion: 'CA',
      postalCode: '92021',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 32.8128,
      longitude: -116.9625,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '07:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '08:00',
        closes: '15:00',
      },
    ],
    founder: {
      '@type': 'Person',
      name: 'Polo Reyes',
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 32.8128,
        longitude: -116.9625,
      },
      geoRadius: '50000',
    },
    sameAs: [
      'https://www.facebook.com/losreyestires',
      'https://www.instagram.com/losreyestires',
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <SnapFinanceBanner />
          <Newsletter />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
