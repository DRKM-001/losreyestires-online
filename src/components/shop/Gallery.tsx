'use client';
import { useState } from 'react';

export function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [i, setI] = useState(0);
  const src = images[i] ?? images[0];
  return (
    <div className="flex flex-col gap-3">
      <div className="aspect-square overflow-hidden rounded-xl border border-sand-200 bg-white">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt} className="h-full w-full object-contain p-6" />
        ) : null}
      </div>
      {images.length > 1 ? (
        <div className="flex gap-2">
          {images.map((u, n) => (
            <button key={u} type="button" onClick={() => setI(n)} aria-label={`Photo ${n + 1}`} aria-pressed={n === i}
              className={`h-20 w-20 overflow-hidden rounded-md border-2 bg-white ${n === i ? 'border-blaze-500' : 'border-sand-200 hover:border-sand-300'}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={u} alt="" className="h-full w-full object-contain p-1" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
