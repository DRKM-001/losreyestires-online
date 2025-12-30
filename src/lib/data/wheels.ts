export interface Wheel {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  size: string;
  finish: 'gloss-black' | 'matte-black' | 'chrome' | 'machined' | 'bronze' | 'gunmetal';
  boltPattern: string;
  offset: string;
  stock: number;
  features: string[];
}

// Sample wheel data - TODO: Replace with API call to ERP backend
export const wheels: Wheel[] = [
  {
    id: 'wheel-1',
    name: 'Method 305 NV',
    brand: 'Method Race Wheels',
    image: '/placeholder-wheel.jpg',
    price: 249.99,
    rating: 4.7,
    reviewCount: 156,
    size: '17x8.5',
    finish: 'matte-black',
    boltPattern: '6x5.5',
    offset: '+18mm',
    stock: 32,
    features: ['Bead grip technology', 'Load rated for trucks', 'Made in USA'],
  },
  {
    id: 'wheel-2',
    name: 'Fuel Maverick D610',
    brand: 'Fuel Off-Road',
    image: '/placeholder-wheel.jpg',
    price: 329.99,
    originalPrice: 399.99,
    rating: 4.8,
    reviewCount: 203,
    size: '20x10',
    finish: 'chrome',
    boltPattern: '8x6.5',
    offset: '-24mm',
    stock: 16,
    features: ['Aggressive styling', 'Deep lip', 'Chrome plated'],
  },
  {
    id: 'wheel-3',
    name: 'XD Series XD820 Grenade',
    brand: 'XD Series',
    image: '/placeholder-wheel.jpg',
    price: 189.99,
    rating: 4.5,
    reviewCount: 98,
    size: '18x9',
    finish: 'matte-black',
    boltPattern: '5x5',
    offset: '0mm',
    stock: 24,
    features: ['Beadlock-style design', 'Aggressive off-road look', 'SAE/JWL certified'],
  },
  {
    id: 'wheel-4',
    name: 'Black Rhino Armory',
    brand: 'Black Rhino',
    image: '/placeholder-wheel.jpg',
    price: 279.99,
    rating: 4.6,
    reviewCount: 145,
    size: '17x9',
    finish: 'gunmetal',
    boltPattern: '5x4.5',
    offset: '-12mm',
    stock: 20,
    features: ['Truck & SUV rated', 'Gunmetal with black bolts', 'Lifetime structural warranty'],
  },
  {
    id: 'wheel-5',
    name: 'Motegi Racing MR116',
    brand: 'Motegi Racing',
    image: '/placeholder-wheel.jpg',
    price: 159.99,
    rating: 4.3,
    reviewCount: 67,
    size: '17x7.5',
    finish: 'machined',
    boltPattern: '5x114.3',
    offset: '+42mm',
    stock: 40,
    features: ['JWL/VIA certified', 'Matte black machined', 'Street performance'],
  },
  {
    id: 'wheel-6',
    name: 'Fuel Assault D546',
    brand: 'Fuel Off-Road',
    image: '/placeholder-wheel.jpg',
    price: 299.99,
    rating: 4.7,
    reviewCount: 234,
    size: '20x9',
    finish: 'gloss-black',
    boltPattern: '6x5.5',
    offset: '+1mm',
    stock: 28,
    features: ['Gloss black milled', 'Aggressive design', 'Load rated'],
  },
  {
    id: 'wheel-7',
    name: 'Vision 390 Empire',
    brand: 'Vision Wheel',
    image: '/placeholder-wheel.jpg',
    price: 139.99,
    rating: 4.2,
    reviewCount: 89,
    size: '18x8',
    finish: 'gloss-black',
    boltPattern: '5x5.5',
    offset: '+35mm',
    stock: 36,
    features: ['Budget-friendly', 'Gloss black', 'Easy to clean'],
  },
  {
    id: 'wheel-8',
    name: 'American Racing VN215 Torq Thrust II',
    brand: 'American Racing',
    image: '/placeholder-wheel.jpg',
    price: 389.99,
    rating: 4.9,
    reviewCount: 412,
    size: '18x8',
    finish: 'chrome',
    boltPattern: '5x4.75',
    offset: '0mm',
    stock: 12,
    features: ['Classic design', 'Show quality chrome', 'Iconic American muscle'],
  },
];

export const wheelBrands = Array.from(new Set(wheels.map(w => w.brand))).sort();
export const wheelSizes = Array.from(new Set(wheels.map(w => w.size))).sort();
export const wheelFinishes = [
  { value: 'gloss-black', label: 'Gloss Black' },
  { value: 'matte-black', label: 'Matte Black' },
  { value: 'chrome', label: 'Chrome' },
  { value: 'machined', label: 'Machined' },
  { value: 'bronze', label: 'Bronze' },
  { value: 'gunmetal', label: 'Gunmetal' },
];
export const wheelBoltPatterns = Array.from(new Set(wheels.map(w => w.boltPattern))).sort();
