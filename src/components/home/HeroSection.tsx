'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Check, CheckCircle, ExternalLink, Send, Loader2, Phone, MessageCircle } from 'lucide-react';
import { trackQuoteRequest } from '@/lib/analytics/ga4';
import { SNAP_FINANCE_APPLICATION_URL } from '@/lib/financing';
export function HeroSection() {
  // Step 1: What they're looking for
  const [lookingFor, setLookingFor] = useState<string[]>([]);
  const [description, setDescription] = useState<string>('');
  
  // Step 2: Contact info (in dialog)
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  
  // State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formError, setFormError] = useState('');
  
  const lookingForOptions = [
    { id: 'new-tires', label: 'New Tires' },
    { id: 'used-tires', label: 'Used Tires' },
    { id: 'wheels', label: 'Wheels' },
    { id: 'other', label: 'Other' },
  ];
  
  const handleCheckboxChange = (optionId: string) => {
    setFormError('');
    setLookingFor(prev => 
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };
  
  const handleGetQuote = () => {
    if (lookingFor.length === 0) {
      setFormError('Select at least one option so we know what to check.');
      return;
    }
    setFormError('');
    setShowContactDialog(true);
  };
  
  // Handle final submission
  const handleSubmit = async () => {
    // Validate contact fields
    if (!name || !phone || !email) {
      setFormError('Enter your name, phone number, and email to send the request.');
      return;
    }
    
    setIsSubmitting(true);
    
    const selectedLabels = lookingFor.map(id => 
      lookingForOptions.find(opt => opt.id === id)?.label
    ).join(', ');
    
    // Build request data
    const requestData = {
      name,
      phone,
      email,
      tireCondition: 'custom',
      searchType: 'custom',
      vehicleInfo: null,
      sizeInfo: null,
      additionalInfo: `Looking for: ${selectedLabels}\n\n${description}`,
      timestamp: new Date().toISOString(),
    };
    
    try {
      // Submit to API
      const response = await fetch('/api/rfi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit request');
      }
      
      // Track quote request in GA4
      trackQuoteRequest({
        condition: selectedLabels,
      });
      
      // Close dialog and show success
      setShowContactDialog(false);
      setShowSuccess(true);
      setFormError('');
      
      // Reset form after delay
      setTimeout(() => {
        setName('');
        setPhone('');
        setEmail('');
        setDescription('');
        setLookingFor([]);
        setShowSuccess(false);
      }, 4000);
      
    } catch (error) {
      console.error('RFI submission error:', error);
      setFormError('We could not send the request. Please call 619-440-6098 or use WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Send to WhatsApp
  const handleWhatsApp = () => {
    const selectedLabels = lookingFor.map(id => 
      lookingForOptions.find(opt => opt.id === id)?.label
    ).join(', ');
    
    const message = `Hi! I'd like a quote for:\n\nLooking for: ${selectedLabels}\n\n${description}\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}`;
    
    const whatsappUrl = `https://wa.me/16197299468?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="quote" className="relative scroll-mt-24 overflow-hidden bg-zinc-950 text-white">
      <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.18),transparent_65%)] lg:block" aria-hidden="true" />

      <div className="container relative pb-10 pt-24 sm:pb-14 sm:pt-40 lg:pb-20 lg:pt-44">
        <div className="grid items-center gap-8 lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-3">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-red-400">Local tire help in El Cajon</p>
            <h1 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Tires, wheels, and a real person to help.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-300 sm:text-xl">
              Tell the Los Reyes team what you drive and what you need. We’ll check current options and follow up with availability and pricing.
            </p>
            <div className="mt-7 grid gap-3 sm:flex sm:flex-wrap">
              <Button asChild size="lg" className="h-12 bg-red-600 px-6 font-bold hover:bg-red-700">
                <a href="tel:619-440-6098"><Phone aria-hidden="true" />Call 619-440-6098</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 border-zinc-600 bg-transparent px-6 font-bold text-white hover:bg-zinc-800 hover:text-white">
                <a href="https://wa.me/16197299468" target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden="true" />WhatsApp the shop</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 border-zinc-600 bg-transparent px-6 font-bold text-white hover:bg-white hover:text-zinc-950">
                <a href={SNAP_FINANCE_APPLICATION_URL} target="_blank" rel="noopener noreferrer">
                  Apply for Financing
                  <ExternalLink aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </Button>
            </div>
            <p className="mt-5 text-sm font-medium text-zinc-400">Family owned since 2005 · Open 7 days · 1245 N 1st St</p>
          </div>

          {/* Right side - Quote Request Card */}
          <Card className="border-0 bg-white p-5 shadow-2xl shadow-black/20 sm:p-7 lg:col-span-2">
            {showSuccess ? (
              <div className="space-y-4 py-8 text-center" role="status">
                <div className="flex justify-center">
                  <div className="rounded-full bg-green-100 p-3">
                    <CheckCircle className="h-12 w-12 text-green-600" aria-hidden="true" />
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 text-2xl font-bold text-green-700">Availability request received</h3>
                  <p className="mb-4 text-muted-foreground">
                    The shop will use your request to check current options and pricing.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    We’ll use the contact details you provided to follow up.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold tracking-tight text-zinc-900">
                    Check availability
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    A quick note is enough to get started.
                  </p>
                </div>

                <fieldset className="space-y-3" aria-describedby="availability-options-help">
                  <legend className="text-sm font-bold text-zinc-900">What are you looking for?</legend>
                  <p id="availability-options-help" className="text-xs leading-5 text-zinc-600">Select one or more options.</p>
                  <div className="grid grid-cols-1 gap-2 min-[380px]:grid-cols-2">
                    {lookingForOptions.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        aria-pressed={lookingFor.includes(option.id)}
                        onClick={() => handleCheckboxChange(option.id)}
                        className={`flex min-h-12 w-full items-center gap-3 rounded-lg border-2 px-3 py-2.5 text-left text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 ${
                          lookingFor.includes(option.id)
                            ? 'border-red-600 bg-red-600 text-white'
                            : 'border-zinc-300 bg-white text-zinc-900 hover:border-red-400 hover:bg-red-50'
                        }`}
                      >
                        <span
                          className={`flex size-6 shrink-0 items-center justify-center rounded-md border-2 ${
                            lookingFor.includes(option.id)
                              ? 'border-white bg-white text-red-600'
                              : 'border-zinc-500 bg-white text-transparent'
                          }`}
                          aria-hidden="true"
                        >
                          <Check className="h-4 w-4" strokeWidth={3} />
                        </span>
                        <span>{option.label}</span>
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-bold text-zinc-900">Vehicle or tire details <span className="font-normal text-zinc-500">(optional)</span></Label>
                  <Textarea
                    id="description"
                    placeholder="Example: 2020 Ford F-150, tire size 275/65R18, quantity 4"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-24 resize-none border-zinc-400 bg-white text-zinc-950 caret-red-600 placeholder:text-zinc-500 placeholder:opacity-100 focus-visible:border-red-600 focus-visible:ring-2 focus-visible:ring-red-600/30 focus-visible:ring-offset-0"
                  />
                </div>

                {formError && <p role="alert" className="text-sm font-medium text-red-700">{formError}</p>}

                {/* Get Quote Button */}
                <Button 
                  onClick={handleGetQuote}
                  size="lg"
                  className="h-12 w-full bg-red-600 text-base font-bold text-white hover:bg-red-700 focus-visible:ring-red-600/40"
                >
                  Check Availability
                </Button>
                <p className="border-t pt-4 text-center text-xs leading-5 text-zinc-500">Prefer to talk now? Call or WhatsApp the shop using the buttons above.</p>
              </div>
            )}
          </Card>

          {/* Contact Info Dialog */}
          <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Send Availability Request</DialogTitle>
                <DialogDescription>
                  We’ll use these details to check current options.
                </DialogDescription>
              </DialogHeader>
              
              {/* Request Preview */}
              <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-4 space-y-3">
                <div>
                  <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1">Looking For</div>
                  <div className="text-sm font-medium text-zinc-900">
                    {lookingFor.map(id => 
                      lookingForOptions.find(opt => opt.id === id)?.label
                    ).join(', ')}
                  </div>
                </div>
                {description && (
                  <div>
                    <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1">Details</div>
                    <div className="text-sm text-zinc-700 whitespace-pre-wrap">{description}</div>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <div className="text-sm font-medium text-zinc-900 mb-2">Your Contact Information</div>
                <div className="space-y-2">
                  <Label htmlFor="contact-name" className="text-xs">Name *</Label>
                  <Input
                    id="contact-name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    className="h-11"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact-phone" className="text-xs">Phone *</Label>
                  <Input
                    id="contact-phone"
                    type="tel"
                    placeholder="(619) 555-1234"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoComplete="tel"
                    className="h-11"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact-email" className="text-xs">Email *</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    className="h-11"
                  />
                </div>
              </div>

              {formError && <p role="alert" className="text-sm font-medium text-red-700">{formError}</p>}
              
              <div className="flex flex-col gap-3">
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="h-12 w-full bg-red-600 hover:bg-red-700"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Availability Request
                    </>
                  )}
                </Button>
                
                <Button
                  onClick={handleWhatsApp}
                  disabled={isSubmitting || !name || !phone}
                  variant="outline"
                  className="h-12 w-full border-green-600 text-green-700 hover:bg-green-50"
                  size="lg"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Send via WhatsApp
                </Button>
                
                <p className="text-xs text-center text-muted-foreground">
                  We’ll use these details only to respond to this request.
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
}
