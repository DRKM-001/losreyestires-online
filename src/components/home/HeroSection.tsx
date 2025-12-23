'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Car } from 'lucide-react';

export function HeroSection() {
  const [searchType, setSearchType] = useState<'vehicle' | 'size'>('vehicle');

  return (
    <section className="relative bg-gradient-to-br from-zinc-100 to-white">
      
      <div className="container relative py-12 md:py-16">
        <div className="mx-auto max-w-5xl text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-3 text-zinc-900">
            Shop Parts for Your Vehicle
          </h1>
          <p className="text-base md:text-lg text-zinc-600 font-semibold">
            Find the Perfect Tires - Free Shipping Sitewide!
          </p>
        </div>

        <Card className="mx-auto max-w-5xl p-6 md:p-8 bg-white shadow-lg border-0">
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
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                  <SelectItem value="2020">2020</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Make" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="toyota">Toyota</SelectItem>
                  <SelectItem value="ford">Ford</SelectItem>
                  <SelectItem value="honda">Honda</SelectItem>
                  <SelectItem value="chevrolet">Chevrolet</SelectItem>
                  <SelectItem value="nissan">Nissan</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="camry">Camry</SelectItem>
                  <SelectItem value="f150">F-150</SelectItem>
                  <SelectItem value="civic">Civic</SelectItem>
                  <SelectItem value="silverado">Silverado</SelectItem>
                </SelectContent>
              </Select>

              <Button size="lg" className="w-full h-12 bg-red-600 hover:bg-red-700 font-bold">
                Go
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Width" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="205">205</SelectItem>
                  <SelectItem value="215">215</SelectItem>
                  <SelectItem value="225">225</SelectItem>
                  <SelectItem value="235">235</SelectItem>
                  <SelectItem value="245">245</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Aspect Ratio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="45">45</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="55">55</SelectItem>
                  <SelectItem value="60">60</SelectItem>
                  <SelectItem value="65">65</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Diameter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15&quot;</SelectItem>
                  <SelectItem value="16">16&quot;</SelectItem>
                  <SelectItem value="17">17&quot;</SelectItem>
                  <SelectItem value="18">18&quot;</SelectItem>
                  <SelectItem value="19">19&quot;</SelectItem>
                  <SelectItem value="20">20&quot;</SelectItem>
                </SelectContent>
              </Select>

              <Button size="lg" className="w-full h-12 bg-red-600 hover:bg-red-700 font-bold">
                Go
              </Button>
            </div>
          )}
        </Card>

      </div>
    </section>
  );
}
