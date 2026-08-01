import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Tire Inventory in El Cajon',
  description: 'Browse available tire inventory from Los Reyes Tires in El Cajon, CA, or contact the shop to check current options and pricing.',
  path: '/tires',
  keywords: ['tires El Cajon', 'new tires El Cajon', 'used tires El Cajon'],
});

export default function TiresLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
