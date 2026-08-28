import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Los Reyes Tires',
  description: 'Los Reyes Tires privacy policy - Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose prose-lg max-w-none space-y-6">
        <p className="text-muted-foreground">
          <strong>Last Updated:</strong> December 30, 2024
        </p>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mt-8">Introduction</h2>
          <p>
            Los Reyes Tires ("we," "our," or "us") respects your privacy and is committed to protecting your personal information. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website 
            or make a purchase from us.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mt-8">Information We Collect</h2>
          
          <h3 className="text-xl font-semibold mt-6">Personal Information</h3>
          <p>When you use our website or services, we may collect:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Name and contact information (email address, phone number, mailing address)</li>
            <li>Vehicle information (year, make, model, trim)</li>
            <li>Payment information (processed securely through third-party payment processors)</li>
            <li>Purchase history and preferences</li>
            <li>Account credentials (if you create an account)</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6">Automatically Collected Information</h3>
          <p>We automatically collect certain information when you visit our website:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>IP address and browser type</li>
            <li>Device information and operating system</li>
            <li>Pages visited and links clicked</li>
            <li>Date and time of your visit</li>
            <li>Referring website or source</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mt-8">How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Process and fulfill your orders</li>
            <li>Communicate with you about your purchases, appointments, and services</li>
            <li>Provide customer support and respond to inquiries</li>
            <li>Send promotional materials and special offers (with your consent)</li>
            <li>Improve our website, products, and services</li>
            <li>Prevent fraud and enhance security</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mt-8">Information Sharing</h2>
          <p>We do not sell your personal information. We may share your information with:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Service Providers:</strong> Third-party vendors who help us operate our business (payment processors, shipping companies, email services)</li>
            <li><strong>Business Partners:</strong> Tire manufacturers and suppliers for warranty and product information</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
            <li><strong>Business Transfers:</strong> In connection with a merger, sale, or acquisition</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mt-8">Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar technologies to enhance your browsing experience, analyze website traffic, 
            and personalize content. You can control cookies through your browser settings, but disabling them may 
            affect website functionality.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mt-8">Data Security</h2>
          <p>
            We implement reasonable security measures to protect your personal information from unauthorized access, 
            alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, 
            and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mt-8">Your Rights</h2>
          <p>Depending on your location, you may have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of marketing communications</li>
            <li>Object to or restrict certain data processing</li>
          </ul>
          <p className="mt-4">
            To exercise these rights, please contact us at{' '}
            <a href="mailto:privacy@losreyestires.com" className="text-primary hover:underline">
              privacy@losreyestires.com
            </a>
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mt-8">California Privacy Rights</h2>
          <p>
            California residents have specific rights under the California Consumer Privacy Act (CCPA), including 
            the right to know what personal information we collect, the right to delete personal information, and 
            the right to opt-out of the sale of personal information. We do not sell personal information.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mt-8">Children's Privacy</h2>
          <p>
            Our services are not directed to children under 13 years of age. We do not knowingly collect personal 
            information from children. If you believe we have collected information from a child, please contact us 
            immediately.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mt-8">Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible for the privacy practices 
            of these sites. We encourage you to review their privacy policies.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mt-8">Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the 
            new Privacy Policy on this page and updating the "Last Updated" date. Your continued use of our services 
            after changes are posted constitutes acceptance of the updated policy.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mt-8">Contact Us</h2>
          <p>If you have questions about this Privacy Policy, please contact us:</p>
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
          </div>
        </section>
      </div>
    </div>
  );
}
