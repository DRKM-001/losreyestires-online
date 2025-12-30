import { Metadata } from 'next';

export const siteConfig = {
  name: 'Los Reyes Tires',
  description: 'Los Reyes Tires in El Cajon, CA - Your trusted source for new and used tires, off-road wheels, and expert tire services. Founded by Polo Reyes. Open 7 days a week.',
  url: 'https://losreyestires.com',
  ogImage: '/losreyes_000.png',
  keywords: [
    'tires El Cajon',
    'used tires San Diego',
    'new tires El Cajon',
    'off-road wheels',
    'tire shop El Cajon',
    'Los Reyes Tires',
    'cheap tires San Diego',
    'tire installation',
    'wheel alignment El Cajon',
    'tire repair',
    'semi-new tires',
    'second-life tires',
    'off-road specialists',
    'lift kits San Diego',
    'custom wheels El Cajon',
  ],
  authors: [{ name: 'Los Reyes Tires' }],
  creator: 'Los Reyes Tires',
  publisher: 'Los Reyes Tires',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://losreyestires.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://losreyestires.com',
    title: 'Los Reyes Tires - Quality Tires & Expert Service in El Cajon, CA',
    description: 'New & used tires, off-road wheels, and professional tire services in El Cajon. Founded by Polo Reyes. Open Mon-Sat 7AM-7PM, Sun 8AM-3PM. Call 619-440-6098',
    siteName: 'Los Reyes Tires',
    images: [
      {
        url: '/losreyes_000.png',
        width: 1200,
        height: 630,
        alt: 'Los Reyes Tires - El Cajon, CA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Los Reyes Tires - Quality Tires & Expert Service',
    description: 'New & used tires, off-road wheels in El Cajon, CA. Open 7 days. Call 619-440-6098',
    images: ['/losreyes_000.png'],
    creator: '@losreyestires',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

export function generatePageMetadata({
  title,
  description,
  path = '',
  keywords = [],
  images,
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  images?: { url: string; alt: string }[];
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const allKeywords = [...siteConfig.keywords, ...keywords];

  return {
    title: `${title} | Los Reyes Tires`,
    description,
    keywords: allKeywords,
    authors: siteConfig.authors,
    creator: siteConfig.creator,
    publisher: siteConfig.publisher,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: images || siteConfig.openGraph.images,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: images?.map(img => img.url) || siteConfig.twitter.images,
      creator: siteConfig.twitter.creator,
    },
  };
}
