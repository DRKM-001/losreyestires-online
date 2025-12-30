import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Warranty Information | Los Reyes Tires',
  description: 'Los Reyes Tires warranty policy - Learn about tire warranties, coverage, and how to make warranty claims.',
};

export default function WarrantyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Warranty Information</h1>
      
      <div className="prose prose-lg max-w-none space-y-6">
        <p className="text-muted-foreground">
          <strong>Last Updated:</strong> December 30, 2024
        </p>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mt-8">Overview</h2>
          <p>
            At Los Reyes Tires, we stand behind the quality of our products and services. This page explains 
            the warranty coverage available for tires, wheels, and services purchased from us. Most products 
            are covered by manufacturer warranties, and we're here to help you through the warranty process.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mt-8">Tire Warranties</h2>
          
          <h3 className="text-xl font-semibold mt-6">Manufacturer Warranties</h3>
          <p>
            All new tires purchased from Los Reyes Tires are covered by the manufacturer's warranty. Coverage 
            typically includes:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Tread Life Warranty:</strong> Protection against premature tread wear (mileage varies by tire model)</li>
            <li><strong>Workmanship & Materials:</strong> Coverage for manufacturing defects</li>
            <li><strong>Road Hazard Protection:</strong> Available on select tire brands</li>
            <li><strong>Uniformity Warranty:</strong> Coverage for ride quality issues within the first year/2% of tread wear</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6">Warranty Period</h3>
          <p>
            Warranty coverage begins on the date of purchase and varies by manufacturer and tire model. 
            Most premium tire brands offer:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>40,000 to 80,000+ mile tread warranties</li>
            <li>5-6 year materials and workmanship coverage</li>
            <li>First year/2% tread depth uniformity warranty</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6">Used & Semi-New Tires</h3>
          <p>
            Used and semi-new tires (second-life tires) are sold as-is and are not covered by manufacturer 
            warranties. However, we thoroughly inspect all used tires and only sell those meeting our quality 
            standards. We offer a 30-day satisfaction guarantee on used tires purchased from us.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mt-8">What's Covered</h2>
          <p>Tire warranties typically cover:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Manufacturing Defects:</strong> Defects in materials or workmanship that affect tire performance</li>
            <li><strong>Premature Wear:</strong> If tread wears out before the warranted mileage (pro-rated)</li>
            <li><strong>Tire Uniformity Issues:</strong> Vibration, ride harshness, or noise caused by manufacturing defects</li>
            <li><strong>Road Hazard (if purchased):</strong> Damage from nails, glass, potholes, and other road debris</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mt-8">What's NOT Covered</h2>
          <p>Warranties generally do NOT cover:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Damage from improper mounting, balancing, or installation</li>
            <li>Damage from improper inflation, overloading, or vehicle misalignment</li>
            <li>Irregular wear from lack of rotation or improper maintenance</li>
            <li>Damage from accidents, vandalism, or intentional abuse</li>
            <li>Cosmetic damage that doesn't affect tire performance</li>
            <li>Off-road use or racing (unless specified by manufacturer)</li>
            <li>Normal wear and tear</li>
            <li>Tires with less than 2/32" of remaining tread depth</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mt-8">Road Hazard Protection</h2>
          <p>
            We offer optional Road Hazard Protection for new tire purchases. This coverage protects against:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Punctures from nails, screws, and glass</li>
            <li>Impact breaks from potholes and curbs</li>
            <li>Cuts from sharp objects</li>
            <li>Blowouts from road debris</li>
          </ul>
          <p className="mt-4">
            <strong>Coverage Details:</strong> Road Hazard Protection provides free replacement or pro-rated 
            credit for the first 25% of tread wear, then pro-rated thereafter. Ask about pricing when purchasing 
            your tires.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mt-8">Wheel Warranties</h2>
          <p>
            Wheels purchased from Los Reyes Tires are covered by manufacturer warranties against defects in 
            materials and workmanship. Coverage typically includes:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>1-2 year structural warranty on alloy wheels</li>
            <li>Finish warranty against peeling, flaking, or corrosion (varies by brand)</li>
            <li>Protection against manufacturing defects</li>
          </ul>
          <p className="mt-4">
            <strong>Note:</strong> Cosmetic damage from curb rash, scratches, or road debris is not covered 
            unless Road Hazard Protection was purchased.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mt-8">Installation & Service Warranty</h2>
          <p>
            Los Reyes Tires warrants all installation and service work performed at our facility:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Workmanship Guarantee:</strong> 90 days on all mounting, balancing, and installation services</li>
            <li><strong>Free Rebalancing:</strong> If you experience vibration within 30 days of installation</li>
            <li><strong>Valve Stems:</strong> Covered for 90 days after installation</li>
            <li><strong>Alignment Services:</strong> 90-day/3,000-mile warranty on alignment work</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mt-8">Making a Warranty Claim</h2>
          <p>To file a warranty claim, follow these steps:</p>
          
          <div className="bg-muted p-6 rounded-lg mt-4">
            <ol className="list-decimal pl-6 space-y-3">
              <li>
                <strong>Visit Our Location:</strong> Bring your vehicle to Los Reyes Tires at 1050 N Magnolia Ave, 
                El Cajon, CA 92020
              </li>
              <li>
                <strong>Bring Documentation:</strong> Original purchase receipt and vehicle information
              </li>
              <li>
                <strong>Inspection:</strong> Our technicians will inspect the tire/wheel to determine if the issue 
                is covered under warranty
              </li>
              <li>
                <strong>Approval:</strong> If approved, we'll process the claim with the manufacturer
              </li>
              <li>
                <strong>Resolution:</strong> Depending on the warranty terms, you'll receive a replacement, 
                pro-rated credit, or repair
              </li>
            </ol>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mt-8">Warranty Requirements</h2>
          <p>To maintain warranty coverage, you must:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Maintain proper tire inflation (check monthly)</li>
            <li>Rotate tires every 5,000-7,500 miles</li>
            <li>Maintain proper wheel alignment</li>
            <li>Balance wheels when needed</li>
            <li>Keep records of tire maintenance and rotations</li>
            <li>Use tires only on the vehicle type they're designed for</li>
            <li>Discontinue use if tires are damaged or worn below 2/32" tread depth</li>
          </ul>
          <p className="mt-4">
            <strong>Important:</strong> Failure to properly maintain your tires may void warranty coverage.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mt-8">Pro-Rated Adjustments</h2>
          <p>
            Many tire warranties are pro-rated based on tread wear. Here's how it works:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>The amount of usable tread remaining is measured</li>
            <li>You receive a credit based on the percentage of unused tread</li>
            <li>For example: If your tire is 50% worn, you get 50% credit toward a replacement</li>
            <li>You pay the difference plus any applicable fees (mounting, balancing, disposal)</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mt-8">Transferability</h2>
          <p>
            Most manufacturer tire warranties are transferable to subsequent owners if the vehicle is sold. 
            However, some benefits (like free replacements) may be limited to the original purchaser. 
            Check your specific tire brand's warranty policy for details.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mt-8">Tire Manufacturer Contact Information</h2>
          <p>
            For specific warranty details for your tire brand, you can contact manufacturers directly or 
            visit their websites. Common brands we carry include:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Michelin, BFGoodrich, Uniroyal</li>
            <li>Goodyear, Dunlop, Kelly</li>
            <li>Bridgestone, Firestone</li>
            <li>Continental, General Tire</li>
            <li>Yokohama, Toyo, Nitto</li>
            <li>Cooper, Mastercraft</li>
            <li>Falken, Hankook, Kumho</li>
          </ul>
          <p className="mt-4">
            We're happy to help you navigate manufacturer warranty claims. Stop by or call us for assistance.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mt-8">Additional Questions</h2>
          <p>
            If you have questions about warranty coverage for your specific tires or wheels, please contact us. 
            Our experienced team can explain your warranty options and help you understand what's covered.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mt-8">Contact Us</h2>
          <p>For warranty claims or questions, visit us or contact:</p>
          <div className="bg-muted p-6 rounded-lg mt-4">
            <p className="font-semibold">Los Reyes Tires</p>
            <p>1050 N Magnolia Ave</p>
            <p>El Cajon, CA 92020</p>
            <p className="mt-2">
              Phone: <a href="tel:619-440-6098" className="text-primary hover:underline">619-440-6098</a>
            </p>
            <p>
              Email: <a href="mailto:info@losreyestires.com" className="text-primary hover:underline">info@losreyestires.com</a>
            </p>
            <p className="mt-2">
              <strong>Hours:</strong><br />
              Monday - Saturday: 7:00 AM - 7:00 PM<br />
              Sunday: 8:00 AM - 3:00 PM
            </p>
          </div>
        </section>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-6 rounded-lg mt-8">
          <p className="font-semibold mb-2">Important Notice:</p>
          <p className="text-sm">
            This page provides general warranty information. Specific warranty coverage varies by manufacturer, 
            tire model, and purchase date. Always refer to the manufacturer's warranty documentation included 
            with your tires for complete terms and conditions. Los Reyes Tires acts as a facilitator for 
            manufacturer warranty claims but is not responsible for manufacturer warranty decisions.
          </p>
        </div>
      </div>
    </div>
  );
}
