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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Car, CheckCircle, Send, MessageSquare, Sparkles } from 'lucide-react';
import { 
  getAvailableYears, 
  getAvailableMakes, 
  getAvailableModels,
  getTireSizesForVehicle 
} from '@/lib/data/vehicles';
import { getTiresBySize } from '@/lib/api/tireraven';
export function HeroSection() {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchType, setSearchType] = useState<'vehicle' | 'size'>('vehicle');
  const [tireCondition, setTireCondition] = useState<'new' | 'used' | 'both'>('new');
  
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
  const handleRFISubmit = async () => {
    // Validate required fields
    if (!name || !phone || !email) {
      alert('Please fill in your name, phone, and email');
      return;
    }
    
    // Build inquiry details
    let inquiry = `Tire Condition: ${tireCondition}\n`;
    
    if (searchType === 'vehicle') {
      if (selectedYear && selectedMake && selectedModel) {
        inquiry += `Vehicle: ${selectedYear} ${selectedMake} ${selectedModel}\n`;
      }
    } else {
      if (selectedWidth && selectedAspect && selectedDiameter) {
        inquiry += `Tire Size: ${selectedWidth}/${selectedAspect}R${selectedDiameter}\n`;
      }
    }
    
    if (additionalInfo) {
      inquiry += `Additional Info: ${additionalInfo}\n`;
    }
    
    // TODO: Send to backend/email service
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
    
    console.log('RFI Submission:', requestData);
    
    // For now, just show success message
    alert('Thank you! We\'ll get back to you shortly with a quote.');
    
    // Close dialog
    setIsDialogOpen(false);
    
    // Reset form
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
                <span className="font-medium">Free Installation</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-200">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-medium">Lifetime Balance & Rotation</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-200">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-medium">Financing Available</span>
              </div>
            </div>
          </div>

          {/* Right side - Elegant Tire Finder Card */}
          <Card className="lg:col-span-2 p-6 bg-white/95 backdrop-blur shadow-2xl border-0">
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-2xl font-bold tracking-tight">
                  Find Your Tires
                </h3>
                <p className="text-sm text-muted-foreground">
                  Search by vehicle or tire size
                </p>
              </div>
            
              <Tabs value={searchType} onValueChange={(val) => setSearchType(val as 'vehicle' | 'size')} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="vehicle" className="gap-2">
                    <Car className="h-4 w-4" />
                    Vehicle
                  </TabsTrigger>
                  <TabsTrigger value="size" className="gap-2">
                    <Search className="h-4 w-4" />
                    Size
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
              
              <div className="flex gap-2 pt-2">
                <Button 
                  size="lg"
                  className="flex-1 bg-red-600 hover:bg-red-700"
                  onClick={() => router.push('/tires')}
                >
                  <Search className="mr-2 h-4 w-4" />
                  Browse
                </Button>
                
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        size="lg"
                        variant="outline"
                        className="flex-1 border-2 border-red-600 text-red-600 hover:bg-red-50 hover:text-red-700"
                      >
                        <Sparkles className="mr-2 h-4 w-4" />
                        Quote
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Request a Quote</DialogTitle>
                        <DialogDescription>
                          Tell us what you need and we'll get back to you with pricing
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-6 py-4">
                        {/* Tire Condition */}
                        <div className="space-y-2">
                          <Label>I'm interested in</Label>
                          <RadioGroup value={tireCondition} onValueChange={(val) => setTireCondition(val as 'new' | 'used' | 'both')} className="flex gap-4">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="new" id="dialog-new" />
                              <Label htmlFor="dialog-new" className="font-normal cursor-pointer">New</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="used" id="dialog-used" />
                              <Label htmlFor="dialog-used" className="font-normal cursor-pointer">Used</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="both" id="dialog-both" />
                              <Label htmlFor="dialog-both" className="font-normal cursor-pointer">Both</Label>
                            </div>
                          </RadioGroup>
                        </div>
                        
                        {/* Vehicle/Size Info Display */}
                        <div className="rounded-lg border bg-muted/50 p-3">
                          <p className="text-xs font-medium text-muted-foreground mb-1">Your Selection</p>
                          {searchType === 'vehicle' ? (
                            <p className="text-sm font-medium">
                              {selectedYear && selectedMake && selectedModel 
                                ? `${selectedYear} ${selectedMake} ${selectedModel}` 
                                : 'No vehicle selected'}
                            </p>
                          ) : (
                            <p className="text-sm font-medium">
                              {selectedWidth && selectedAspect && selectedDiameter
                                ? `${selectedWidth}/${selectedAspect}R${selectedDiameter}`
                                : 'No size selected'}
                            </p>
                          )}
                        </div>
                        
                        {/* Additional Info */}
                        <div className="space-y-2">
                          <Label htmlFor="additional">Additional Details</Label>
                          <Textarea
                            id="additional"
                            placeholder="Budget, brand preference, quantity, special requirements..."
                            value={additionalInfo}
                            onChange={(e) => setAdditionalInfo(e.target.value)}
                            className="resize-none"
                            rows={3}
                          />
                        </div>
                        
                        {/* Contact Info */}
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Name *</Label>
                            <Input
                              id="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone *</Label>
                              <Input
                                id="phone"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email">Email *</Label>
                              <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                        </div>
                        
                        {/* Submit */}
                        <Button 
                          size="lg"
                          className="w-full bg-red-600 hover:bg-red-700"
                          onClick={handleRFISubmit}
                        >
                          <Send className="mr-2 h-4 w-4" />
                          Submit Request
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </Card>
        </div>
      </div>
    </section>
  );
}
