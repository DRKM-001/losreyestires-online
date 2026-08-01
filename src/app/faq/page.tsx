import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'FAQ - Frequently Asked Questions',
  description: 'Common questions about tire services, installation, pricing, and more at Los Reyes Tires in El Cajon, CA.',
  path: '/faq',
});

const faqs = [
  {
    question: 'Do you sell used tires?',
    answer: 'Yes! We specialize in quality used tires, semi-new tires, and second-life tires in addition to brand new tires from all major brands.',
  },
  {
    question: 'Do I need an appointment?',
    answer: 'No appointment necessary! We welcome walk-ins during our business hours: Mon-Sat 7AM-7PM, Sun 8AM-3PM.',
  },
  {
    question: 'How long does tire installation take?',
    answer: 'Most tire installations take 45-60 minutes depending on the vehicle and service needed.',
  },
  {
    question: 'Do you offer wheel alignment?',
    answer: 'Yes, we offer complete wheel alignment services to ensure your tires wear evenly and your vehicle drives straight.',
  },
  {
    question: 'What brands of tires do you carry?',
    answer: 'We carry all major tire brands including Michelin, Goodyear, Bridgestone, Continental, BFGoodrich, and many more.',
  },
  {
    question: 'Can I ask about wheel options?',
    answer: 'Yes. Share your vehicle details and the shop can discuss current wheel options and availability with you.',
  },
  {
    question: 'Can you repair a flat tire?',
    answer: 'Yes, we offer tire repair services. Bring your flat tire in and we will assess if it can be safely repaired.',
  },
  {
    question: 'Do you offer financing?',
    answer: 'Contact us at 619-440-6098 to discuss payment options and financing availability.',
  },
  {
    question: 'Where are you located?',
    answer: '1245 N 1st St, El Cajon, CA 92021. We serve El Cajon and the greater San Diego area.',
  },
  {
    question: 'Do you offer tire warranties?',
    answer: 'Yes, warranties vary by tire brand and type. Ask our team about warranty options for your specific tires.',
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-zinc-900 text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-zinc-300">
            Find answers to common questions about our tires, services, and shop.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-4xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Card className="mt-8 bg-zinc-50 border-2">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-black mb-3">Still Have Questions?</h3>
              <p className="text-zinc-600 mb-4">
                Give us a call or stop by our El Cajon location.
              </p>
              <a
                href="tel:619-440-6098"
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-md transition-colors"
              >
                Call 619-440-6098
              </a>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
