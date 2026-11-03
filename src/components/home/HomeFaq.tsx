import Link from 'next/link';

const faqs = [
  { q: 'Do you sell used tires?', a: 'Yes. We carry inspected used tires with real tread left, plus new tires from the major brands. Send us your size and we check what is in stock today.' },
  { q: 'Do I need an appointment?', a: 'No. Walk-ins are welcome Monday to Saturday 7AM–7PM and Sunday 8AM–3PM. Most installs take 45–60 minutes.' },
  { q: 'How do I get a price fast?', a: 'Type your tire size into the quote card at the top of this page and send it on WhatsApp, or call 619-440-6098. A real person at the shop answers.' },
  { q: 'Where do I find my tire size?', a: 'It is printed on the sidewall of your tire and looks like 225/45R17. You can type it any way, like 2254517, or send us a photo of the sidewall instead.' },
  { q: 'Do you offer financing?', a: 'Yes. Financing is available through Snap Finance or Acima, including no-credit-needed options. You can apply online before you come in.' },
  { q: 'Do you work with fleets and businesses?', a: 'Yes. We set up fleet accounts for work trucks and vans, and run commercial waste-tire hauling for dealers and shops.' },
];

/** Native <details> so the answers stay in the HTML for search engines and work without JavaScript. */
export function HomeFaq() {
  return (
    <section id="faq" className="scroll-mt-24 bg-sand-50 py-20 sm:py-24">
      <div className="container-x grid gap-8 lg:grid-cols-[4fr_8fr]">
        <div>
          <p className="font-display text-sm font-bold uppercase tracking-widest text-blaze-600">Questions</p>
          <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-stone-850">Good to know</h2>
          <Link href="/faq" className="mt-4 inline-block text-sm font-semibold text-blaze-600 hover:underline">See all questions →</Link>
        </div>
        <div className="space-y-2.5">
          {faqs.map((f) => (
            <details key={f.q} className="group overflow-hidden rounded-lg border border-sand-200 bg-white shadow-card">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-display text-lg font-semibold uppercase tracking-wide text-stone-850 transition-colors hover:text-blaze-600 [&::-webkit-details-marker]:hidden">
                {f.q}<span className="text-2xl leading-none text-blaze-500 transition-transform group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="px-5 pb-5 text-[15px] leading-relaxed text-stone-750">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
