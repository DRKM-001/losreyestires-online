'use client';

import { useEffect, useState } from 'react';
import { promoEndsIn, promoPhase, type PromoPhase } from '@/lib/promo';

/** The promo's phase, decided in the browser (pages are static), re-checked each minute. */
export function usePromo(): { phase: PromoPhase; endsIn: string } {
  const [state, setState] = useState<{ phase: PromoPhase; endsIn: string }>({ phase: 'off', endsIn: '' });
  useEffect(() => {
    const tick = () => setState({ phase: promoPhase(), endsIn: promoEndsIn() });
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, []);
  return state;
}
