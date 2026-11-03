'use client';

import type { ReactNode } from 'react';
import { WaLink } from '@/modules/tire-quote';
import { site, track } from '@/lib/site';

/** The shop's WhatsApp button. Carries the customer's quote draft wherever it appears. */
export function ShopWaLink({ className, children, label }: { className?: string; children?: ReactNode; label?: 'short' }) {
  return (
    <WaLink number={site.whatsapp} lang="en" className={className}
      onSend={(size) => track(size ? 'whatsapp_quote' : 'whatsapp', size ? { size } : {})}>
      {({ size, hasSize }) => (label === 'short'
        ? <>{children}<span className="max-w-full truncate">{hasSize ? `Send ${size}` : 'WhatsApp'}</span></>
        : children)}
    </WaLink>
  );
}
