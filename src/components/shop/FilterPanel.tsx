'use client';
import { useState, useSyncExternalStore, type ReactNode } from 'react';

const DESKTOP = '(min-width: 1024px)';
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(DESKTOP);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};

/** The filter list: a collapsible panel on phones, always open as the sidebar on desktop. */
export function FilterPanel({ summary, defaultOpen, children }: { summary: ReactNode; defaultOpen: boolean; children: ReactNode }) {
  const desktop = useSyncExternalStore(subscribe, () => window.matchMedia(DESKTOP).matches, () => false);
  const [userOpen, setUserOpen] = useState(defaultOpen);
  const open = desktop || userOpen;
  return (
    <details open={open} onToggle={(e) => { if (!desktop) setUserOpen((e.currentTarget as HTMLDetailsElement).open); }} className="rounded-xl border border-sand-200 bg-white shadow-card lg:sticky lg:top-24">
      <summary className="flex cursor-pointer list-none items-center gap-2 p-4 font-display text-lg font-bold uppercase text-stone-850 lg:pointer-events-none">{summary}</summary>
      <div className="flex flex-col gap-4 px-4 pb-4">{children}</div>
    </details>
  );
}
