'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CheckCircle, Send, Loader2, Phone, Mail, MessageSquare } from 'lucide-react';
import { trackQuoteRequest } from '@/lib/analytics/ga4';
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
  
  const lookingForOptions = [
    { id: 'new-tires', label: 'New Tires' },
    { id: 'used-tires', label: 'Used Tires' },
    { id: 'wheels', label: 'Wheels' },
    { id: 'other', label: 'Other' },
  ];
  
  const handleCheckboxChange = (optionId: string) => {
    setLookingFor(prev => 
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };
  
  const handleGetQuote = () => {
    // Validate at least one checkbox
    if (lookingFor.length === 0) {
      alert('Please select at least one option');
      return;
    }
    // Open contact dialog
    setShowContactDialog(true);
  };
  
  // Handle final submission
  const handleSubmit = async () => {
    // Validate contact fields
    if (!name || !phone || !email) {
      alert('Please fill in all contact fields');
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
      alert('Sorry, there was an error. Please call us at 619-440-6098 or WhatsApp (619) 729-9468');
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
    
    // Also submit to our system
    handleSubmit();
  };

  return (
    <section className="relative bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: 'url(/hero-tires-bg.jpg)',
          backgroundPosition: '60% center',
        }}
      />
      {/* Subtle Vehicle Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: 'url(https://summit4x4company.com/wp-content/uploads/2025/03/Offroad-Rig-showing-Beginners-how-to-navigate-the-trails.jpg)',
        }}
      />
      
      <div className="container relative py-12 md:py-16 lg:py-20">
        <div className="grid lg:grid-cols-5 gap-8 items-center">
          {/* Left side - Content (Golden Ratio ~62%) */}
          <div className="lg:col-span-3 text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">
              Find Your Perfect Tires
            </h1>
            <p className="text-xl md:text-2xl text-zinc-300 mb-8 font-semibold">
              New & Used Tires | Off-Road Wheels | Expert Service in El Cajon
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="flex items-center gap-2 text-zinc-200">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-medium">Family Owned Since 2005</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-200">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-medium">San Diego's Trusted Experts</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-200">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-medium">Free Installation</span>
              </div>
            </div>
          </div>

          {/* Right side - Quote Request Card */}
          <Card className="lg:col-span-2 p-6 bg-white/95 backdrop-blur shadow-2xl border-0">
            {showSuccess ? (
              <div className="space-y-4 text-center py-8">
                <div className="flex justify-center">
                  <div className="rounded-full bg-green-100 p-3">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-green-600 mb-2">Request Received!</h3>
                  <p className="text-muted-foreground mb-4">
                    We'll get back to you within 24 hours with a quote.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Check your email for confirmation.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold tracking-tight text-zinc-900">
                    Request a Quote
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Get pricing in 24 hours • Free consultation
                  </p>
                </div>

                {/* Checkbox Options */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">I'm looking for:</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {lookingForOptions.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={option.id}
                          checked={lookingFor.includes(option.id)}
                          onCheckedChange={() => handleCheckboxChange(option.id)}
                        />
                        <Label 
                          htmlFor={option.id} 
                          className="text-sm font-normal cursor-pointer"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">Tell us what you need:</Label>
                  <Textarea
                    id="description"
                    placeholder="E.g., '4 new tires for 2020 Ford F-150' or 'Looking for used tires, any brand'..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="resize-none h-24"
                  />
                </div>

                {/* Get Quote Button */}
                <Button 
                  onClick={handleGetQuote}
                  size="lg"
                  className="w-full h-12 bg-red-600 hover:bg-red-700 text-base font-semibold"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Get Free Quote
                </Button>

                {/* Trust Signals */}
                <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground pt-2 border-t">
                  <div className="flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    <span>24hr response</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-zinc-300" />
                  <div className="flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    <span>Email confirmation</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-zinc-300" />
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    <span>No obligation</span>
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* Contact Info Dialog */}
          <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Your Contact Information</DialogTitle>
                <DialogDescription>
                  We'll use this to send you a quote within 24 hours.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">Name *</Label>
                  <Input
                    id="contact-name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Phone *</Label>
                  <Input
                    id="contact-phone"
                    type="tel"
                    placeholder="(619) 555-1234"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email *</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-3">
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-red-600 hover:bg-red-700"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Send Quote Request
                    </>
                  )}
                </Button>
                
                <Button
                  onClick={handleWhatsApp}
                  disabled={isSubmitting || !name || !phone}
                  variant="outline"
                  className="w-full border-green-600 text-green-600 hover:bg-green-50"
                  size="lg"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send via WhatsApp
                </Button>
                
                <p className="text-xs text-center text-muted-foreground">
                  By submitting, you agree to receive quote information via email or WhatsApp.
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
}
