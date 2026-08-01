import Image from 'next/image';
import { SNAP_FINANCE_APPLICATION_URL } from '@/lib/financing';
import Link from 'next/link';

export function SnapFinanceBanner() {
  return (
    <section className="w-full bg-zinc-100 py-12">
      <div className="container">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="text-center max-w-2xl">
            <h2 className="text-3xl font-bold text-zinc-900 mb-3">
              Flexible Financing Options Available
            </h2>
            <p className="text-zinc-600 text-lg">
              Review available terms and apply securely on the Snap Finance website.
            </p>
          </div>
          
          <Link
            href={SNAP_FINANCE_APPLICATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-105"
            aria-label="Apply through Snap Finance (opens in a new tab)"
          >
            <Image
              src="https://assets.snapfinance.com/app/images/apply_image_17.jpeg"
              alt="Snap Finance - Apply Here"
              width={800}
              height={200}
              className="shadow-[4px_2px_6px_#010101] w-full max-w-2xl h-auto"
              unoptimized
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
