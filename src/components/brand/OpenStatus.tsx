'use client';

import { useEffect, useState } from 'react';
import { fmtHour, openState, type OpenState } from '@/lib/site';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/** Live "open now / closed" line in shop time. Renders after hydration so it never shows a stale state. */
export function OpenStatus({ className = '' }: { className?: string }) {
  const [s, setS] = useState<OpenState | null>(null);
  useEffect(() => {
    const tick = () => setS(openState());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 60_000);
    return () => { clearTimeout(first); clearInterval(id); };
  }, []);

  let text = 'Open 7 days · WhatsApp answered anytime';
  if (s) {
    if (s.open) text = `Open now until ${fmtHour(s.closesAt!)} · WhatsApp answered anytime`;
    else {
      const when = s.opensDay === s.day ? 'today' : s.opensDay === (s.day + 1) % 7 ? 'tomorrow' : DAYS[s.opensDay!];
      text = `Closed, opens ${when} at ${fmtHour(s.opensAt!)} · WhatsApp answered anytime`;
    }
  }
  return (
    <p className={`inline-flex items-center gap-2 text-sm font-semibold ${className}`} aria-live="polite">
      <span className="relative flex h-2.5 w-2.5">
        {s?.open && <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 motion-safe:animate-ping" />}
        <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${s ? (s.open ? 'bg-emerald-400' : 'bg-blaze-500') : 'bg-sand-300'}`} />
      </span>
      {text}
    </p>
  );
}
