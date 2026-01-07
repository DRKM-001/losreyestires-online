import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Messaging Terms & Conditions',
  description: 'Los Reyes Tires messaging terms and conditions for SMS and email marketing communications.',
};

export default function MessagingTermsPage() {
  return (
    <div className="container py-12 md:py-16 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Messaging Terms & Conditions</h1>
      
      <div className="prose prose-zinc max-w-none space-y-6">
        <div className="bg-zinc-50 p-6 rounded-lg mb-8">
          <p className="font-semibold mb-2">Los Reyes Tires</p>
          <p>1245 N 1st St<br />
          El Cajon, CA 92021-4840</p>
          <p className="mt-3">
            Email: <a href="mailto:sales@losreyestires.com" className="text-red-600 hover:underline">sales@losreyestires.com</a><br />
            Phone: <a href="tel:6199919982" className="text-red-600 hover:underline">(619) 991-9982</a>
          </p>
          <p className="mt-3">
            Privacy Policy: <a href="https://sandiegotires.com/privacy" className="text-red-600 hover:underline" target="_blank" rel="noopener noreferrer">sandiegotires.com/privacy</a>
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-bold mb-3">General</h2>
          <p>
            When you opt-in to the service, we will send you a message to confirm your signup.
          </p>
          <p>
            By opting into messages, you agree to receive recurring automated marketing and informational text messages from Los Reyes Tires. Automated messages may be sent using an automatic telephone dialing system to the mobile telephone number you provided when signing up or any other number that you designate.
          </p>
          <p>
            Message frequency varies, and additional mobile messages may be sent periodically based on your interaction with Los Reyes Tires. Los Reyes Tires reserves the right to alter the frequency of messages sent at any time to increase or decrease the total number of sent messages. Los Reyes Tires also reserves the right to change the short code or phone number or alphanumeric sender where messages are sent.
          </p>
          <p>
            Your usual message and data rates may apply. If you have any questions about your text plan or data plan, it is best to contact your mobile provider. Your mobile provider is not liable for delayed or undelivered messages.
          </p>
          <p>
            Your consent to receive marketing messages is not a condition of purchase.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Carriers</h2>
          <p>
            Carriers are not liable for delayed or undelivered messages.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Cancellation</h2>
          <p>
            Messages will provide instructions to unsubscribe either by texting STOP or through an included link. After you unsubscribe, we will send you a message to confirm that you have been unsubscribed and no more messages will be sent. If you would like to receive messages from Los Reyes Tires again, just sign up as you did the first time and Los Reyes Tires will start sending messages to you again.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Info</h2>
          <p>
            For support regarding our services, email us at <a href="mailto:sales@losreyestires.com" className="text-red-600 hover:underline">sales@losreyestires.com</a> or, if supported, text "HELP" to our messages at any time and we will respond with instructions on how to unsubscribe. If we include a link in messages we send you from Los Reyes Tires, you may also access instructions on how to unsubscribe and our company information by following that link.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Transfer of Number</h2>
          <p>
            You agree that before changing your mobile number or transferring your mobile number to another individual, you will either reply "STOP" from the original number, unsubscribe using the link included in our messages (if one is provided), or notify us of your old number at <a href="mailto:sales@losreyestires.com" className="text-red-600 hover:underline">sales@losreyestires.com</a>. The duty to inform us based on the above events is a condition of using this service to receive messages.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Privacy</h2>
          <p>
            If you have any questions about your data or our privacy practices, please visit our <a href="https://sandiegotires.com/privacy" className="text-red-600 hover:underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Messaging Terms Changes</h2>
          <p>
            We reserve the right to change or terminate our messaging program at any time. We also reserve the right to update these Messaging Terms at any time. Such changes will be effective immediately upon posting. If you do not agree to a change to these Messaging Terms, you should cancel your enrollment with our messaging program. Your continued enrollment following such changes shall constitute your acceptance of such changes.
          </p>
        </section>

        <div className="bg-zinc-50 p-6 rounded-lg mt-8">
          <p className="text-sm text-zinc-600">
            <strong>Last Updated:</strong> January 7, 2026
          </p>
        </div>
      </div>
    </div>
  );
}
