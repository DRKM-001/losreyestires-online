'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Car, CheckCircle } from 'lucide-react';
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
  
  // Vehicle search state
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedMake, setSelectedMake] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  
  // Size search state
  const [selectedWidth, setSelectedWidth] = useState<string>('');
  const [selectedAspect, setSelectedAspect] = useState<string>('');
  const [selectedDiameter, setSelectedDiameter] = useState<string>('');
  
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
  
  // Handle vehicle search
  const handleVehicleSearch = () => {
    if (!selectedYear || !selectedMake || !selectedModel) {
      alert('Please select year, make, and model');
      return;
    }
    
    // Get tire sizes for this vehicle
    const tireSizes = getTireSizesForVehicle(
      parseInt(selectedYear),
      selectedMake,
      selectedModel
    );
    
    if (tireSizes.length > 0) {
      // Navigate to tires page filtered by the primary tire size
      const primarySize = tireSizes[0];
      router.push(`/tires?size=${encodeURIComponent(primarySize)}&vehicle=${selectedYear}-${selectedMake}-${selectedModel}`);
    } else {
      router.push('/tires');
    }
  };
  
  // Handle size search
  const handleSizeSearch = () => {
    if (!selectedWidth || !selectedAspect || !selectedDiameter) {
      alert('Please select width, aspect ratio, and diameter');
      return;
    }
    
    const tireSize = `${selectedWidth}/${selectedAspect}R${selectedDiameter}`;
    router.push(`/tires?size=${encodeURIComponent(tireSize)}`);
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
      
      <div className="container relative py-16 md:py-24 lg:py-32">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
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

          {/* Right side - Tire Finder Card (Golden Ratio ~38%) */}
          <Card className="lg:col-span-2 p-6 md:p-8 bg-white shadow-2xl border-0 backdrop-blur-sm">
            <h3 className="text-2xl font-black text-zinc-900 mb-6 text-center">
              Find Your Tires
            </h3>
            <div className="flex gap-3 mb-6">
            <Button
              variant={searchType === 'vehicle' ? 'default' : 'outline'}
              onClick={() => setSearchType('vehicle')}
              className={`flex-1 h-12 font-bold text-sm ${
                searchType === 'vehicle' 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'border-2 border-zinc-300 hover:border-red-600 hover:text-red-600 bg-white text-zinc-700'
              }`}
            >
              <Car className="mr-2 h-5 w-5" />
              Shop By Vehicle
            </Button>
            <Button
              variant={searchType === 'size' ? 'default' : 'outline'}
              onClick={() => setSearchType('size')}
              className={`flex-1 h-12 font-bold text-sm ${
                searchType === 'size' 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'border-2 border-zinc-300 hover:border-red-600 hover:text-red-600 bg-white text-zinc-700'
              }`}
            >
              <Search className="mr-2 h-5 w-5" />
              Shop By Size
            </Button>
          </div>

          {searchType === 'vehicle' ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

              <Button 
                size="lg" 
                className="w-full h-12 bg-red-600 hover:bg-red-700 font-bold"
                onClick={handleVehicleSearch}
                disabled={!selectedYear || !selectedMake || !selectedModel}
              >
                Go
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                  <SelectValue placeholder="Aspect Ratio" />
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

              <Button 
                size="lg" 
                className="w-full h-12 bg-red-600 hover:bg-red-700 font-bold"
                onClick={handleSizeSearch}
                disabled={!selectedWidth || !selectedAspect || !selectedDiameter}
              >
                Go
              </Button>
            </div>
          )}
          </Card>
        </div>
      </div>
    </section>
  );
}
