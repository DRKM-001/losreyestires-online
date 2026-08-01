import { Card, CardContent } from '@/components/ui/card';
import { RotateCcw, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Returns & Exchanges Policy',
  description: 'Learn about our return and exchange policy for tires, wheels, and accessories at Los Reyes Tires.',
  path: '/returns',
});

export default function ReturnsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-zinc-900 text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Returns & Exchanges</h1>
          <p className="text-xl text-zinc-300">
            Your satisfaction is our priority. Learn about our return policy.
          </p>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="py-16 bg-zinc-50">
        <div className="container max-w-6xl">
          <h2 className="text-3xl font-black mb-8 text-center">Return Policy Overview</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2">
              <CardContent className="p-6 text-center">
                <div className="inline-flex p-3 rounded-lg bg-green-50 mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">30-Day Returns</h3>
                <p className="text-sm text-zinc-600">
                  Return unused tires within 30 days of purchase for a full refund.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6 text-center">
                <div className="inline-flex p-3 rounded-lg bg-blue-50 mb-4">
                  <RotateCcw className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">Easy Exchanges</h3>
                <p className="text-sm text-zinc-600">
                  Wrong size or changed your mind? We’ll help you find the right fit.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6 text-center">
                <div className="inline-flex p-3 rounded-lg bg-red-50 mb-4">
                  <AlertCircle className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">Conditions Apply</h3>
                <p className="text-sm text-zinc-600">
                  Tires must be unmounted and in original condition for returns.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Detailed Policy */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-black mb-8">Return Policy Details</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-3">Eligible Items</h3>
              <p className="text-zinc-700 mb-3">
                The following items are eligible for return within 30 days of purchase:
              </p>
              <ul className="space-y-2 text-zinc-700">
                <li>• <strong>New tires</strong> - Unmounted, unused, and in original condition</li>
                <li>• <strong>Wheels</strong> - Unused and in original packaging</li>
                <li>• <strong>Accessories</strong> - Unopened and in original packaging</li>
                <li>• <strong>Wheel orders</strong> - Unmounted and unused</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Return Conditions</h3>
              <p className="text-zinc-700 mb-3">
                To be eligible for a return, items must meet these requirements:
              </p>
              <ul className="space-y-2 text-zinc-700">
                <li>• Return within 30 days of purchase date</li>
                <li>• Original receipt or proof of purchase required</li>
                <li>• Tires must be unmounted and unused</li>
                <li>• No road wear or damage</li>
                <li>• Include all original packaging and labels</li>
                <li>• Items must be clean and in resalable condition</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <XCircle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold mb-2">Non-Returnable Items</h3>
                  <ul className="space-y-1 text-sm text-zinc-700">
                    <li>• Mounted or installed tires</li>
                    <li>• Used tires (any road wear)</li>
                    <li>• Clearance or special order items</li>
                    <li>• Damaged or defaced items</li>
                    <li>• Items without proof of purchase</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">How to Return</h3>
              <ol className="space-y-3 text-zinc-700">
                <li>
                  <strong>1. Contact Us</strong>
                  <p className="ml-4 mt-1">Call us at 619-440-6098 to initiate your return. Have your order number and receipt ready.</p>
                </li>
                <li>
                  <strong>2. Get Authorization</strong>
                  <p className="ml-4 mt-1">We’ll provide you with a Return Authorization (RA) number and instructions.</p>
                </li>
                <li>
                  <strong>3. Ship or Drop Off</strong>
                  <p className="ml-4 mt-1">Return items to our El Cajon location or ship them back with the provided instructions.</p>
                </li>
                <li>
                  <strong>4. Receive Refund</strong>
                  <p className="ml-4 mt-1">Once we receive and inspect the items, your refund will be processed within 5-7 business days.</p>
                </li>
              </ol>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Exchanges</h3>
              <p className="text-zinc-700 mb-3">
                Need a different size or changed your mind? We make exchanges easy:
              </p>
              <ul className="space-y-2 text-zinc-700">
                <li>• Exchange for different size, brand, or model</li>
                <li>• Same conditions apply as returns</li>
                <li>• Price difference will be charged or refunded</li>
                <li>• Faster processing for in-store exchanges</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Refund Method</h3>
              <p className="text-zinc-700">
                Refunds will be issued to the original payment method. Credit card refunds typically appear 
                within 5-7 business days after processing. Cash purchases will receive a cash refund.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Return Shipping Costs</h3>
              <ul className="space-y-2 text-zinc-700">
                <li>• <strong>Our error:</strong> We cover all return shipping costs</li>
                <li>• <strong>Changed your mind:</strong> Customer responsible for return shipping</li>
                <li>• <strong>Defective items:</strong> We cover shipping and provide replacement</li>
                <li>• <strong>Local customers:</strong> Free returns - drop off at our El Cajon location</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Warranty Claims</h3>
              <p className="text-zinc-700 mb-3">
                Tire warranties are handled separately from returns. If you have a warranty claim:
              </p>
              <ul className="space-y-2 text-zinc-700">
                <li>• Contact us to start a warranty claim</li>
                <li>• Bring the tire to our shop for inspection</li>
                <li>• Manufacturer warranties vary by brand</li>
                <li>• Road hazard protection available at purchase</li>
              </ul>
              <p className="text-zinc-700 mt-3">
                Learn more on our <a href="/warranty" className="text-red-600 hover:underline font-semibold">Warranty Information</a> page.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Damaged or Defective Items</h3>
              <p className="text-zinc-700">
                If you receive damaged or defective items, contact us immediately at 619-440-6098. 
                We’ll arrange for a replacement or refund at no cost to you. Please inspect your
                order upon delivery and report any issues within 48 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 bg-zinc-50">
        <div className="container max-w-4xl">
          <Card className="border-2">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-black mb-3">Need Help with a Return?</h3>
              <p className="text-zinc-600 mb-6">
                Our team is ready to assist you with returns, exchanges, or any questions about our policy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:619-440-6098"
                  className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-md transition-colors"
                >
                  Call 619-440-6098
                </a>
                <a
                  href="/contact"
                  className="inline-block bg-white hover:bg-zinc-100 text-zinc-900 font-bold px-8 py-3 rounded-md border-2 transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-black mb-8">Common Questions</h2>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Can I return tires if I already mounted them?</h3>
                <p className="text-sm text-zinc-600">
                  No, once tires are mounted they cannot be returned. Make sure you have the correct size 
                  before installation. We’re happy to verify fitment before mounting.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">What if I ordered the wrong size?</h3>
                <p className="text-sm text-zinc-600">
                  No problem! As long as the tires are unmounted and unused, you can exchange them for the 
                  correct size. Contact us right away to arrange the exchange.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Do you accept returns on used tires?</h3>
                <p className="text-sm text-zinc-600">
                  We do not accept returns on used tires. All returned tires must be in new, unmounted condition 
                  with no road wear or damage.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">How long do refunds take?</h3>
                <p className="text-sm text-zinc-600">
                  Once we receive and inspect your return, refunds are processed within 5-7 business days to 
                  your original payment method.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
