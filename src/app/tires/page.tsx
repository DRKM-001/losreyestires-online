import { Suspense } from 'react';
import { TireCatalog } from '@/components/catalog/TireCatalog';

function CatalogLoading() {
  return (
    <div className="container py-10" role="status">
      <div className="h-28 animate-pulse rounded-xl bg-zinc-100" />
      <p className="sr-only">Loading tire catalog</p>
    </div>
  );
}

export default function TiresPage() {
  return (
    <Suspense fallback={<CatalogLoading />}>
      <TireCatalog />
    </Suspense>
  );
}
