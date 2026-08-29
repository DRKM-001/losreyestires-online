import { Metadata } from 'next';

export const siteConfig = {
  name: 'Los Reyes Tires',
  description: 'Los Reyes Tires in El Cajon, CA offers new and used tires, wheel inquiries, fleet tire service, and tire hauling. Family owned since 2005 and open 7 days a week.',
  url: 'https://losreyestires.com',
  ogImage: '/losreyes_000.png',
  keywords: [
    'tires El Cajon',
    'used tires San Diego',
    'new tires El Cajon',
    'wheels El Cajon',
    'tire shop El Cajon',
    'Los Reyes Tires',
    'cheap tires San Diego',
    'tire installation',
    'wheel alignment El Cajon',
    'tire repair',
    'semi-new tires',
    'second-life tires',
    'custom wheels El Cajon',
    'tire hauling San Diego',
    'fleet tire service El Cajon',
    'commercial fleet tires San Diego',
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
    description: 'New and used tires, wheel inquiries, fleet tire service, and tire hauling in El Cajon. Family owned since 2005. Open Mon-Sat 7AM-7PM, Sun 8AM-3PM. Call 619-440-6098.',
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
    description: 'New and used tires, wheel inquiries, fleet tire service, and tire hauling in El Cajon, CA. Open 7 days. Call 619-440-6098.',
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
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
    },
  } satisfies Metadata['robots'],
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
    // The root layout's title template appends "| Los Reyes Tires".
    title,
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
