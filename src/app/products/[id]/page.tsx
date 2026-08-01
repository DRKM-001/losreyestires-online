import { notFound } from 'next/navigation';

export default function ProductDetailPage() {
  // Product detail data is not yet connected to verified inventory.
  // Returning the shared recovery page is more accurate than showing mock product information.
  notFound();
}
