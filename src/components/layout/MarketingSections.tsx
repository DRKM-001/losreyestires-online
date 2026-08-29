'use client';

import { usePathname } from 'next/navigation';
import { SnapFinanceBanner } from '@/components/financing/SnapFinanceBanner';
import { Newsletter } from '@/components/layout/Newsletter';

/** Routes that should stay formal — no financing banner or promo band. */
const HIDDEN_PREFIXES = ['/fleet/request'];

export function MarketingSections() {
  const pathname = usePathname();

  if (HIDDEN_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return null;
  }

  return (
    <>
      <SnapFinanceBanner />
      <Newsletter />
    </>
  );
}
