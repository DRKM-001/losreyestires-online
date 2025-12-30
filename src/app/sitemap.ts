import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://losreyestires.com';
  
  // Static pages
  const routes = [
    '',
    '/about',
    '/contact',
    '/locations',
    '/financing',
    '/products',
    '/faq',
    '/careers',
    '/privacy',
    '/terms',
    '/warranty',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  return routes;
}
