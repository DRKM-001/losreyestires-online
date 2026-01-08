'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Car, CheckCircle, Send, Loader2, Phone, Mail } from 'lucide-react';
import { 
  getAvailableYears, 
  getAvailableMakes, 
  getAvailableModels,
  getTireSizesForVehicle 
} from '@/lib/data/vehicles';
import { getTiresBySize } from '@/lib/api/tireraven';
export function HeroSection() {
  const router = useRouter();
  const [searchType, setSearchType] = useState<'vehicle' | 'size'>('vehicle');
  const [tireCondition, setTireCondition] = useState<'new' | 'used' | 'both'>('new');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Vehicle search state
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedMake, setSelectedMake] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  
  // Size search state
  const [selectedWidth, setSelectedWidth] = useState<string>('');
  const [selectedAspect, setSelectedAspect] = useState<string>('');
  const [selectedDiameter, setSelectedDiameter] = useState<string>('');
  
  // RFI form state
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [additionalInfo, setAdditionalInfo] = useState<string>('');
  
  // Available options (cascading)
  const [availableMakes, setAvailableMakes] = useState<string[]>([]);
  const [availableModels, setAvailableModels] = useState<string[]>([]);
  
  const years = getAvailableYears();
  
  // Update available makes when year changes
  useEffect(() => {
    if (selectedYear) {
      const makes = getAvailableMakes(parseInt(selectedYear));
      setAvailableMakes(makes);
      setSelectedMake(''); // Reset make when year changes
      setSelectedModel(''); // Reset model
      setAvailableModels([]);
    } else {
      setAvailableMakes([]);
      setSelectedMake('');
      setSelectedModel('');
      setAvailableModels([]);
    }
  }, [selectedYear]);
  
  // Update available models when make changes
  useEffect(() => {
    if (selectedYear && selectedMake) {
      const models = getAvailableModels(parseInt(selectedYear), selectedMake);
      setAvailableModels(models);
      setSelectedModel(''); // Reset model when make changes
    } else {
      setAvailableModels([]);
      setSelectedModel('');
    }
  }, [selectedYear, selectedMake]);
  
  // Handle RFI submission
  const handleRFISubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!name || !phone || !email) {
      alert('Please fill in your name, phone, and email');
      return;
    }
    
    setIsSubmitting(true);
    
    // Build request data
    const requestData = {
      name,
      phone,
      email,
      tireCondition,
      searchType,
      vehicleInfo: searchType === 'vehicle' ? { year: selectedYear, make: selectedMake, model: selectedModel } : null,
      sizeInfo: searchType === 'size' ? { width: selectedWidth, aspect: selectedAspect, diameter: selectedDiameter } : null,
      additionalInfo,
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
      
      // Show success state
      setShowSuccess(true);
      
      // Reset form after delay
      setTimeout(() => {
        setName('');
        setPhone('');
        setEmail('');
        setAdditionalInfo('');
        setSelectedYear('');
        setSelectedMake('');
        setSelectedModel('');
        setSelectedWidth('');
        setSelectedAspect('');
        setSelectedDiameter('');
        setShowSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error('RFI submission error:', error);
      alert('Sorry, there was an error submitting your request. Please try calling us at 619-440-6098 or emailing info@losreyestires.com');
    } finally {
      setIsSubmitting(false);
    }
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
              <form onSubmit={handleRFISubmit} className="space-y-5">
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold tracking-tight text-zinc-900">
                    Request a Quote
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Get pricing in 24 hours • Free consultation
                  </p>
                </div>
                {/* Tire Condition Selection */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">I'm looking for</Label>
                  <RadioGroup 
                    value={tireCondition} 
                    onValueChange={(val) => setTireCondition(val as 'new' | 'used' | 'both')} 
                    className="flex gap-3"
                  >
                    <div className="flex items-center space-x-2 flex-1">
                      <RadioGroupItem value="new" id="new" />
                      <Label htmlFor="new" className="font-normal cursor-pointer text-sm">New Tires</Label>
                    </div>
                    <div className="flex items-center space-x-2 flex-1">
                      <RadioGroupItem value="used" id="used" />
                      <Label htmlFor="used" className="font-normal cursor-pointer text-sm">Used Tires</Label>
                    </div>
                    <div className="flex items-center space-x-2 flex-1">
                      <RadioGroupItem value="both" id="both" />
                      <Label htmlFor="both" className="font-normal cursor-pointer text-sm">Both</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Vehicle/Size Selection */}
                <Tabs value={searchType} onValueChange={(val) => setSearchType(val as 'vehicle' | 'size')} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="vehicle" className="gap-2">
                      <Car className="h-4 w-4" />
                      By Vehicle
                    </TabsTrigger>
                    <TabsTrigger value="size" className="gap-2">
                      <Search className="h-4 w-4" />
                      By Size
                    </TabsTrigger>
                  </TabsList>
                
                <TabsContent value="vehicle" className="space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    <Select value={selectedYear} onValueChange={setSelectedYear}>
                      <SelectTrigger>
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select 
                      value={selectedMake} 
                      onValueChange={setSelectedMake}
                      disabled={!selectedYear}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Make" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableMakes.map((make) => (
                          <SelectItem key={make} value={make}>
                            {make}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select 
                      value={selectedModel} 
                      onValueChange={setSelectedModel}
                      disabled={!selectedMake}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Model" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableModels.map((model) => (
                          <SelectItem key={model} value={model}>
                            {model}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>
                
                <TabsContent value="size" className="space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    <Select value={selectedWidth} onValueChange={setSelectedWidth}>
                      <SelectTrigger>
                        <SelectValue placeholder="Width" />
                      </SelectTrigger>
                      <SelectContent>
                        {['195', '205', '215', '225', '235', '245', '255', '265', '275', '285'].map((width) => (
                          <SelectItem key={width} value={width}>
                            {width}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={selectedAspect} onValueChange={setSelectedAspect}>
                      <SelectTrigger>
                        <SelectValue placeholder="Ratio" />
                      </SelectTrigger>
                      <SelectContent>
                        {['40', '45', '50', '55', '60', '65', '70', '75'].map((aspect) => (
                          <SelectItem key={aspect} value={aspect}>
                            {aspect}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={selectedDiameter} onValueChange={setSelectedDiameter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Diameter" />
                      </SelectTrigger>
                      <SelectContent>
                        {['15', '16', '17', '18', '19', '20', '21', '22'].map((diameter) => (
                          <SelectItem key={diameter} value={diameter}>
                            {diameter}&quot;
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Additional Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-sm font-medium">Additional Details (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Budget, brand preferences, quantity, special requirements..."
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  className="resize-none h-20"
                />
              </div>

              {/* Contact Information */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Your Contact Information</Label>
                <div className="space-y-3">
                  <Input
                    type="text"
                    placeholder="Full Name *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="h-11"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      type="tel"
                      placeholder="Phone *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="h-11"
                    />
                    <Input
                      type="email"
                      placeholder="Email *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit"
                size="lg"
                className="w-full h-12 bg-red-600 hover:bg-red-700 text-base font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Sending Request...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Get Free Quote
                  </>
                )}
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
            </form>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}
