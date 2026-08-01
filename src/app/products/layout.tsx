import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Available Tires in El Cajon',
  description: 'View available tire products from Los Reyes Tires in El Cajon, CA, and contact the local shop to confirm current stock, fitment, and pricing.',
  path: '/products',
  keywords: ['available tires El Cajon', 'tire inventory El Cajon', 'Los Reyes Tires products'],
});

export default function ProductsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
