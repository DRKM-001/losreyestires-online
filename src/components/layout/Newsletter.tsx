'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, CheckCircle2 } from 'lucide-react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create a hidden form to submit to Mailchimp
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://doncellacerveza.us17.list-manage.com/subscribe/post?u=aaca3a3dc08d8e41246d6dd59&id=c2367c609b&f_id=00c1c4e3f0';
      form.target = '_blank'; // Open in new tab to avoid navigation
      
      // Add email field
      const emailInput = document.createElement('input');
      emailInput.type = 'hidden';
      emailInput.name = 'EMAIL';
      emailInput.value = email;
      form.appendChild(emailInput);
      
      // Add honeypot field (bot prevention)
      const honeypot = document.createElement('input');
      honeypot.type = 'text';
      honeypot.name = 'b_aaca3a3dc08d8e41246d6dd59_c2367c609b';
      honeypot.tabIndex = -1;
      honeypot.value = '';
      honeypot.style.position = 'absolute';
      honeypot.style.left = '-5000px';
      form.appendChild(honeypot);
      
      // Append to body, submit, and remove
      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
      
      // Show success message
      setIsSubscribed(true);
      setEmail('');
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      alert('There was an error subscribing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubscribed) {
    return (
      <section className="bg-gradient-to-br from-red-600 to-red-700 text-white">
        <div className="container py-6">
          <div className="flex items-center justify-center gap-3 text-center">
            <CheckCircle2 className="h-5 w-5" />
            <p className="font-medium">
              Thanks for subscribing! Watch for exclusive deals in your inbox.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-red-600 to-red-700 text-white">
      <div className="container py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <Mail className="h-5 w-5" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-lg">
                  Get Exclusive Deals
                </h3>
                <p className="text-sm text-red-100">
                  Subscribe for special offers and tire tips
                </p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="flex gap-2 w-full md:w-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 md:w-64 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
                required
                disabled={isSubmitting}
              />
              <Button 
                type="submit"
                className="bg-white text-red-600 hover:bg-red-50 font-bold whitespace-nowrap"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
