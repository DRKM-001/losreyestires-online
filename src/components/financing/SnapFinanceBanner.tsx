import Image from 'next/image';
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
              Get the tires and wheels you need today with affordable payment plans. Apply in minutes!
            </p>
          </div>
          
          <Link
            href="https://bk.snapfinance.com/origination?paramId=3w%2FEWVFzVGcQioSdKn1vuqdr2hNr3A1xiMt4CtG%2BqOWAXpAyz%2Bp5YK2lEkK1hZ0tog9ZSjNG2GyQln5HQrzShOzYiaK%2FnFnEZXfXtyBXVEw%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-105"
          >
            <Image
              src="https://assets.snapfinance.com/app/images/apply_image_17.jpeg"
              alt="Snap Finance - Apply Here"
              width={400}
              height={100}
              className="shadow-[4px_2px_6px_#010101]"
              unoptimized
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
