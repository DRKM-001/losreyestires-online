'use client';

import { FormEvent, useState } from 'react';
import { Loader2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');

    const form = event.currentTarget;
    const formData = new FormData(form);
    const subject = String(formData.get('subject') || '').trim();
    const message = String(formData.get('message') || '').trim();

    try {
      const response = await fetch('/api/rfi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(formData.get('name') || '').trim(),
          email: String(formData.get('email') || '').trim(),
          phone: String(formData.get('phone') || '').trim(),
          tireCondition: 'contact request',
          searchType: 'custom',
          vehicleInfo: null,
          sizeInfo: null,
          additionalInfo: [subject && `Subject: ${subject}`, message].filter(Boolean).join('\n\n'),
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Contact request failed');
      }

      form.reset();
      setStatus('success');
    } catch (error) {
      console.error('Contact form submission failed:', error);
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="contact-form-name">Name *</Label>
        <Input id="contact-form-name" name="name" autoComplete="name" required placeholder="Your name" className="h-11 bg-white" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-form-email">Email *</Label>
        <Input id="contact-form-email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" className="h-11 bg-white" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-form-phone">Phone *</Label>
        <Input id="contact-form-phone" name="phone" type="tel" autoComplete="tel" required placeholder="(619) 555-1234" className="h-11 bg-white" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-form-subject">Subject</Label>
        <Input id="contact-form-subject" name="subject" placeholder="What can we help you with?" className="h-11 bg-white" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-form-message">Message *</Label>
        <Textarea
          id="contact-form-message"
          name="message"
          required
          rows={5}
          placeholder="Tell us how we can help..."
          className="min-h-32 resize-y bg-white"
        />
      </div>

      <Button
        type="submit"
        className="h-12 w-full bg-red-600 font-bold hover:bg-red-700"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <Send className="h-4 w-4" aria-hidden="true" />
        )}
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
      </Button>

      <div aria-live="polite" className="min-h-6 text-center text-sm">
        {status === 'success' && (
          <p className="font-medium text-green-700">Your message was sent. The shop will follow up as soon as possible.</p>
        )}
        {status === 'error' && (
          <p className="font-medium text-red-700">
            We could not send your message. Please call <a className="underline" href="tel:619-440-6098">619-440-6098</a>.
          </p>
        )}
      </div>
    </form>
  );
}
