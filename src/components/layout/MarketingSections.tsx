'use client';

import { usePathname } from 'next/navigation';
import { SnapFinanceBanner } from '@/components/financing/SnapFinanceBanner';

/** Routes that should stay formal — no financing band. */
const HIDDEN_PREFIXES = ['/fleet/request', '/hauling/request', '/financing'];

export function MarketingSections() {
  const pathname = usePathname();
  if (HIDDEN_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return null;
  return <SnapFinanceBanner />;
}
