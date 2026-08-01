import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { TypographyH1, TypographyH2, TypographyP, TypographyLead } from '@/components/ui/typography';
import { SNAP_FINANCE_APPLICATION_URL } from '@/lib/financing';

export const metadata: Metadata = {
  title: 'Flexible Financing Options',
  description: 'Apply for financing through Snap Finance or Acima. Get approved in minutes and drive away with new tires today. No credit needed options available.',
};

export default function FinancingPage() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <TypographyH1>Flexible Financing Options</TypographyH1>
          <TypographyLead className="mt-4">
            Get the tires and wheels you need today with affordable payment plans. 
            Apply online in minutes and get approved quickly!
          </TypographyLead>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="flex flex-col items-center text-center p-6 bg-zinc-50 rounded-lg">
            <CheckCircle2 className="h-12 w-12 text-green-600 mb-4" />
            <h3 className="font-bold text-lg mb-2">Quick Approval</h3>
            <p className="text-zinc-600 text-sm">
              Get approved in minutes with our simple online application
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-zinc-50 rounded-lg">
            <CheckCircle2 className="h-12 w-12 text-green-600 mb-4" />
            <h3 className="font-bold text-lg mb-2">Flexible Terms</h3>
            <p className="text-zinc-600 text-sm">
              Choose payment plans that work with your budget
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-zinc-50 rounded-lg">
            <CheckCircle2 className="h-12 w-12 text-green-600 mb-4" />
            <h3 className="font-bold text-lg mb-2">No Credit Needed</h3>
            <p className="text-zinc-600 text-sm">
              Options available for all credit situations
            </p>
          </div>
        </div>

        {/* Snap Finance Section */}
        <div className="mb-12 p-8 border-2 border-zinc-200 rounded-xl bg-white">
          <div className="flex flex-col items-center text-center mb-6">
            <TypographyH2 className="mb-4">Snap Finance</TypographyH2>
            <TypographyP className="text-zinc-600 max-w-2xl mb-6">
              Get up to $5,000 in financing with flexible payment options. 
              Quick application process with decisions in minutes.
            </TypographyP>
            <Link
              href={SNAP_FINANCE_APPLICATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-105 inline-block"
              aria-label="Apply through Snap Finance (opens in a new tab)"
            >
              <Image
                src="https://assets.snapfinance.com/app/images/apply_image_17.jpeg"
                alt="Snap Finance - Apply Here"
                width={600}
                height={150}
                className="shadow-lg rounded-lg"
                unoptimized
              />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div>
              <h4 className="font-bold mb-3">Benefits:</h4>
              <ul className="space-y-2 text-sm text-zinc-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Up to $5,000 in financing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>100-day payment option available</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>No hard credit check</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Instant decision online</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">How it works:</h4>
              <ol className="space-y-2 text-sm text-zinc-600 list-decimal list-inside">
                <li>Click the banner above to apply</li>
                <li>Complete the simple online application</li>
                <li>Get approved in minutes</li>
                <li>Shop for your tires and wheels</li>
                <li>Complete your purchase and drive away</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Acima Section */}
        <div className="p-8 border-2 border-zinc-200 rounded-xl bg-white">
          <div className="flex flex-col items-center text-center mb-6">
            <TypographyH2 className="mb-4">Acima Leasing</TypographyH2>
            <TypographyP className="text-zinc-600 max-w-2xl mb-6">
              Lease-to-own option that helps you get what you need today and pay over time. 
              No credit needed and instant approvals available.
            </TypographyP>
            <Link
              href="https://apply.acima.com/?app_id=lo&utm_source=web&utm_medium=merchant&location_guid=loca-28643467-8361-4661-bd4c-e843fe023923"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#00A3E0] hover:bg-[#0087BD] text-white font-bold py-4 px-12 rounded-lg transition-all hover:scale-105 text-lg shadow-lg"
            >
              Apply with Acima
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div>
              <h4 className="font-bold mb-3">Benefits:</h4>
              <ul className="space-y-2 text-sm text-zinc-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Lease-to-own payment plans</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>No credit needed options</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Instant approval available</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Flexible payment schedules</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">How it works:</h4>
              <ol className="space-y-2 text-sm text-zinc-600 list-decimal list-inside">
                <li>Click the button above to apply</li>
                <li>Fill out the quick application</li>
                <li>Get an instant decision</li>
                <li>Visit our store to complete your purchase</li>
                <li>Make affordable payments over time</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-12 p-6 bg-red-50 border border-red-200 rounded-lg text-center">
          <h3 className="font-bold text-lg mb-2">Questions About Financing?</h3>
          <p className="text-zinc-600 mb-4">
            Our team is here to help you find the best financing option for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="tel:619-440-6098"
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Call Us: 619-440-6098
            </a>
            <Link
              href="/contact"
              className="inline-block border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Contact Us Online
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
