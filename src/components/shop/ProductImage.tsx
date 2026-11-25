'use client';
import { useState } from 'react';
import { NoPhoto } from '@/components/shop/NoPhoto';

/** A product photo that falls back to the placeholder when the vendor's link is dead (many older Wheel Pros links are). */
export function ProductImage({ src, alt, kind, className, large = false, eager = false }: { src: string | null | undefined; alt: string; kind: string; className?: string; large?: boolean; eager?: boolean }) {
  const [failed, setFailed] = useState<string | null>(null);
  if (!src || failed === src) return <NoPhoto kind={kind} large={large} />;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} onError={() => setFailed(src)} className={className} />;
}
