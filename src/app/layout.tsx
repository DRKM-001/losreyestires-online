import type { Metadata } from "next";
import type { Viewport } from "next";
import "@fontsource/oswald/latin-500.css";
import "@fontsource/oswald/latin-600.css";
import "@fontsource/oswald/latin-700.css";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/inter/latin-700.css";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactDock } from "@/components/layout/ContactDock";
import { MarketingSections } from "@/components/layout/MarketingSections";
import { siteConfig } from "@/lib/metadata";
import { AuthProvider } from "@/contexts/AuthContext";

export const viewport: Viewport = { themeColor: "#0d0b08", width: "device-width", initialScale: 1, viewportFit: "cover" };

export const metadata: Metadata = {
  metadataBase: siteConfig.metadataBase,
  title: {
    default: siteConfig.name + ' - New & Used Tires, Wheels & Tire Hauling | El Cajon, CA',
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
      <body className="antialiased">
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3SGF1FFFST"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3SGF1FFFST');
          `}
        </Script>

        <AuthProvider>
          <Header />
          <main id="main" className="min-h-screen">{children}</main>
          <MarketingSections />
          <Footer />
          <ContactDock />
        </AuthProvider>
      </body>
    </html>
  );
}
