import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Star, 
  ShoppingCart, 
  Check, 
  Shield, 
  Truck, 
  MapPin,
  Phone,
  ChevronLeft,
} from 'lucide-react';
import { Product } from '@/lib/types';
import { ProductGallery } from '@/components/products/ProductGallery';
import { ProductQuantity } from '@/components/products/ProductQuantity';

// Generate static paths for all products
export function generateStaticParams() {
  // TODO: Replace with API call to fetch all product IDs from ERP
  // For now, return the sample products from homepage
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
  ];
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  // TODO: Replace with API call to ERP backend using params.id
  const product: Product = {
    id: params.id,
    name: 'Michelin Defender T+H All-Season Tire',
    brand: 'Michelin',
    price: 189.99,
    salePrice: 159.99,
    images: ['/placeholder-tire.jpg', '/placeholder-tire.jpg', '/placeholder-tire.jpg'],
    category: 'tires',
    inStock: true,
    rating: 4.5,
    reviewCount: 342,
    size: '225/65R17',
    loadIndex: '102',
    speedRating: 'H',
    warranty: '80,000 miles',
    features: [
      'All-Season Traction',
      'Long Tread Life - 80,000 Mile Warranty',
      'Comfortable & Quiet Ride',
      'Excellent Wet & Dry Performance',
      'Fuel Efficient Design'
    ],
  };

  const discount = product.salePrice 
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b bg-zinc-50">
        <div className="container py-4">
          <div className="flex items-center gap-2 text-sm text-zinc-600">
            <Link href="/" className="hover:text-red-600">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-red-600">Products</Link>
            <span>/</span>
            <Link href="/tires" className="hover:text-red-600">Tires</Link>
            <span>/</span>
            <span className="text-zinc-900 font-semibold">{product.brand}</span>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Back button */}
        <Link href="/products" className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-red-600 mb-6">
          <ChevronLeft className="h-4 w-4" />
          Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Image Gallery - Client Component */}
          <ProductGallery images={product.images} productName={product.name} discount={discount} inStock={product.inStock} />

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <p className="text-sm text-zinc-500 font-semibold mb-1">{product.brand}</p>
              <h1 className="text-3xl md:text-4xl font-black text-zinc-900 mb-3">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-zinc-600">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3 mb-2">
                {product.salePrice ? (
                  <>
                    <span className="text-4xl font-bold text-red-600">
                      ${product.salePrice.toFixed(2)}
                    </span>
                    <span className="text-2xl text-zinc-400 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-4xl font-bold text-zinc-900">
                    ${product.price.toFixed(2)}
                  </span>
                )}
                <span className="text-sm text-zinc-600">per tire</span>
              </div>
              {product.salePrice && (
                <p className="text-sm text-red-600 font-semibold">
                  You save ${(product.price - product.salePrice).toFixed(2)} ({discount}% off)
                </p>
              )}
            </div>

            {/* Tire Specs */}
            {product.category === 'tires' && (
              <Card className="mb-6 border-2">
                <CardContent className="p-4">
                  <h3 className="font-bold mb-3">Tire Specifications</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {product.size && (
                      <div>
                        <span className="text-zinc-600">Size:</span>
                        <p className="font-bold">{product.size}</p>
                      </div>
                    )}
                    {product.loadIndex && (
                      <div>
                        <span className="text-zinc-600">Load Index:</span>
                        <p className="font-bold">{product.loadIndex}</p>
                      </div>
                    )}
                    {product.speedRating && (
                      <div>
                        <span className="text-zinc-600">Speed Rating:</span>
                        <p className="font-bold">{product.speedRating}</p>
                      </div>
                    )}
                    {product.warranty && (
                      <div>
                        <span className="text-zinc-600">Warranty:</span>
                        <p className="font-bold">{product.warranty}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quantity & Add to Cart - Client Component */}
            <ProductQuantity inStock={product.inStock} />

            {/* Trust Signals */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="text-center p-3 bg-zinc-50 rounded-lg">
                <Shield className="h-6 w-6 mx-auto mb-1 text-red-600" />
                <p className="text-xs font-semibold">Warranty Included</p>
              </div>
              <div className="text-center p-3 bg-zinc-50 rounded-lg">
                <Truck className="h-6 w-6 mx-auto mb-1 text-red-600" />
                <p className="text-xs font-semibold">Free Shipping</p>
              </div>
              <div className="text-center p-3 bg-zinc-50 rounded-lg">
                <MapPin className="h-6 w-6 mx-auto mb-1 text-red-600" />
                <p className="text-xs font-semibold">Local Install</p>
              </div>
            </div>

            {/* Contact CTA */}
            <Card className="border-2 bg-zinc-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="font-bold mb-1">Questions? We're here to help!</p>
                    <p className="text-sm text-zinc-600 mb-2">
                      Call us for expert advice on fitment and installation.
                    </p>
                    <a
                      href="tel:619-440-6098"
                      className="text-red-600 font-bold text-sm hover:underline"
                    >
                      619-440-6098
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Product Details */}
        <div className="max-w-4xl">
          <h2 className="text-2xl font-black mb-6">Product Details</h2>
          
          {/* Features */}
          {product.features && product.features.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Key Features</h3>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-zinc-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Description</h3>
            <p className="text-zinc-700 leading-relaxed">
              The {product.brand} {product.name} is designed to deliver exceptional performance 
              in all driving conditions. Built with advanced technology and premium materials, 
              this tire offers outstanding tread life, superior handling, and a comfortable ride. 
              Whether you're commuting daily or taking long road trips, you can count on reliable 
              performance and safety.
            </p>
          </div>

          {/* Installation Info */}
          <Card className="border-2 bg-red-50">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-3">Professional Installation Available</h3>
              <p className="text-zinc-700 mb-4">
                Get your tires professionally mounted, balanced, and installed at our El Cajon location. 
                Our expert technicians ensure proper fitment and optimal performance.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/locations">
                  <Button variant="outline" className="border-2 font-bold">
                    Find Our Location
                  </Button>
                </Link>
                <a href="tel:619-440-6098">
                  <Button className="bg-red-600 hover:bg-red-700 font-bold">
                    Call to Schedule
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
