'use client';

import { useEffect } from 'react';
import { QuoteCard, setDraft, type QuoteMode } from '@/modules/tire-quote';
import { site, track } from '@/lib/site';

/** The WhatsApp quote card with this shop's settings. Pass a mode or size to prefill it. */
export function QuoteBox({ mode, size }: { mode?: QuoteMode; size?: string }) {
  useEffect(() => {
    if (mode || size) setDraft({ ...(mode ? { mode } : {}), ...(size ? { size } : {}) });
  }, [mode, size]);
  return (
    <QuoteCard lang="en" config={{
      whatsapp: site.whatsapp,
      whatsappDisplay: site.whatsappDisplay,
      sizeHelpHref: '/encyclopedia',
      onEvent: (name, data) => track(name, data),
      directEndpoint: '/api/quote',
    }} />
  );
}
