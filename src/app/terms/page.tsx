import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Los Reyes Tires',
  description: 'Los Reyes Tires terms of service - Review our policies, conditions, and guidelines for using our services.',
};

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      
      <div className="prose prose-lg max-w-none space-y-6">
        <p className="text-muted-foreground">
          <strong>Last Updated:</strong> December 30, 2024
        </p>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mt-8">Agreement to Terms</h2>
          <p>
            Welcome to Los Reyes Tires. By accessing our website at losreyestires.com or purchasing products or 
            services from us, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to 
            these Terms, please do not use our website or services.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mt-8">Use of Website</h2>
          
          <h3 className="text-xl font-semibold mt-6">Eligibility</h3>
          <p>
            You must be at least 18 years old to make purchases from Los Reyes Tires. By using our services, 
            you represent that you are of legal age to form a binding contract.
          </p>

          <h3 className="text-xl font-semibold mt-6">Account Responsibilities</h3>
          <p>If you create an account with us, you are responsible for:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Maintaining the confidentiality of your account credentials</li>
            <li>All activities that occur under your account</li>
            <li>Notifying us immediately of any unauthorized use</li>
            <li>Providing accurate and current information</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6">Prohibited Activities</h3>
          <p>You agree not to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use the website for any unlawful purpose</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Interfere with or disrupt the website's operation</li>
            <li>Submit false or misleading information</li>
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe on intellectual property rights</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mt-8">Products and Services</h2>
          
          <h3 className="text-xl font-semibold mt-6">Product Descriptions</h3>
          <p>
            We strive to provide accurate product descriptions, images, and specifications. However, we do not 
            warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free.
          </p>

          <h3 className="text-xl font-semibold mt-6">Pricing</h3>
          <p>
            All prices are in U.S. dollars and are subject to change without notice. We reserve the right to 
            correct pricing errors. If a product is listed at an incorrect price due to an error, we may cancel 
            orders placed for that product.
          </p>

          <h3 className="text-xl font-semibold mt-6">Availability</h3>
          <p>
            Product availability is subject to change. We will notify you if products you ordered are unavailable 
            and provide you with options for substitution or refund.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mt-8">Orders and Payment</h2>
          
          <h3 className="text-xl font-semibold mt-6">Order Acceptance</h3>
          <p>
            Your receipt of an order confirmation does not signify our acceptance of your order. We reserve the 
            right to accept or decline your order for any reason, including product availability, errors in pricing 
            or product information, or suspected fraudulent activity.
          </p>

          <h3 className="text-xl font-semibold mt-6">Payment Terms</h3>
          <p>
            Payment is due at the time of purchase. We accept major credit cards, debit cards, and other payment 
            methods as indicated on our website. You represent that you have the legal right to use any payment 
            method you provide.
          </p>

          <h3 className="text-xl font-semibold mt-6">Sales Tax</h3>
          <p>
            Applicable sales tax will be added to your order total. Tax rates are determined by your shipping 
            address and local regulations.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mt-8">Shipping and Delivery</h2>
          <p>
            Shipping costs and delivery times vary based on your location and selected shipping method. Risk of 
            loss and title for products pass to you upon delivery to the carrier. For detailed shipping information, 
            please visit our <a href="/shipping" className="text-primary hover:underline">Shipping Policy</a> page.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mt-8">Returns and Refunds</h2>
          <p>
            Our return policy allows returns within 30 days of purchase for most products in original condition. 
            Certain products may not be returnable. Please review our complete{' '}
            <a href="/returns" className="text-primary hover:underline">Return Policy</a> for details.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mt-8">Warranties</h2>
          
          <h3 className="text-xl font-semibold mt-6">Product Warranties</h3>
          <p>
            Products sold by Los Reyes Tires may be covered by manufacturer warranties. We do not provide 
            warranties beyond those provided by manufacturers unless explicitly stated. For warranty details, 
            please visit our <a href="/warranty" className="text-primary hover:underline">Warranty Policy</a> page.
          </p>

          <h3 className="text-xl font-semibold mt-6">Disclaimer</h3>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, OUR WEBSITE AND SERVICES ARE PROVIDED "AS IS" WITHOUT 
            WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF 
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mt-8">Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, LOS REYES TIRES SHALL NOT BE LIABLE FOR ANY INDIRECT, 
            INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, 
            DATA, USE, OR GOODWILL, ARISING OUT OF OR RELATED TO YOUR USE OF OUR WEBSITE OR SERVICES.
          </p>
          <p>
            Our total liability for any claims arising from or related to our services shall not exceed the amount 
            you paid for the product or service giving rise to the claim.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mt-8">Installation Services</h2>
          <p>
            If you purchase installation services from Los Reyes Tires, you acknowledge that:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Installation will be performed by qualified technicians</li>
            <li>You must provide accurate vehicle information</li>
            <li>Additional services may be recommended during installation</li>
            <li>Installation times are estimates and may vary</li>
            <li>You are responsible for inspecting completed work before leaving</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mt-8">Intellectual Property</h2>
          <p>
            All content on this website, including text, graphics, logos, images, and software, is the property 
            of Los Reyes Tires or its content suppliers and is protected by copyright and trademark laws. You may 
            not reproduce, distribute, or create derivative works without our express written permission.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mt-8">User-Generated Content</h2>
          <p>
            If you submit reviews, comments, or other content to our website, you grant us a non-exclusive, 
            royalty-free, perpetual, worldwide license to use, reproduce, modify, and display such content. 
            You represent that you own or have rights to any content you submit.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mt-8">Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible for the content, 
            privacy practices, or terms of service of any third-party sites. Your use of third-party websites 
            is at your own risk.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mt-8">Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless Los Reyes Tires, its officers, directors, employees, 
            and agents from any claims, liabilities, damages, losses, and expenses arising from your use of our 
            services or violation of these Terms.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mt-8">Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the State of California, 
            without regard to its conflict of law provisions. Any disputes arising from these Terms shall be 
            resolved in the courts of San Diego County, California.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mt-8">Dispute Resolution</h2>
          <p>
            In the event of any dispute, claim, or controversy, you agree to first contact us to seek resolution. 
            If we cannot resolve the dispute informally, both parties agree to binding arbitration in accordance 
            with the rules of the American Arbitration Association.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mt-8">Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Changes will be effective immediately upon 
            posting to this page. Your continued use of our services after changes are posted constitutes 
            acceptance of the modified Terms. We encourage you to review these Terms periodically.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mt-8">Severability</h2>
          <p>
            If any provision of these Terms is found to be unenforceable or invalid, that provision shall be 
            limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in 
            full force and effect.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mt-8">Entire Agreement</h2>
          <p>
            These Terms, together with our Privacy Policy and any other legal notices published by us, constitute 
            the entire agreement between you and Los Reyes Tires regarding your use of our services.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mt-8">Contact Information</h2>
          <p>If you have questions about these Terms of Service, please contact us:</p>
          <div className="bg-muted p-6 rounded-lg mt-4">
            <p className="font-semibold">Los Reyes Tires</p>
            <p>1245 N 1st St</p>
            <p>El Cajon, CA 92021</p>
            <p className="mt-2">
              Phone: <a href="tel:619-440-6098" className="text-primary hover:underline">619-440-6098</a>
            </p>
            <p>
              Email: <a href="mailto:sales@losreyestires.com" className="text-primary hover:underline">sales@losreyestires.com</a>
            </p>
            <p className="mt-2">
              Hours: Mon-Sat 7AM-7PM, Sun 8AM-3PM
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
