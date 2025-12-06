// Product Types
export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  salePrice?: number;
  images: string[];
  category: 'tires' | 'wheels' | 'accessories';
  inStock: boolean;
  rating: number;
  reviewCount: number;
  
  // Tire-specific
  size?: string;
  loadIndex?: string;
  speedRating?: string;
  warranty?: string;
  features?: string[];
  
  // Wheel-specific
  diameter?: string;
  width?: string;
  boltPattern?: string;
  offset?: string;
}

// Vehicle Search
export interface Vehicle {
  year: string;
  make: string;
  model: string;
  trim?: string;
}

export interface VehicleOption {
  value: string;
  label: string;
}

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

// Filter Types
export interface ProductFilters {
  category?: string;
  brand?: string[];
  priceRange?: [number, number];
  size?: string;
  inStock?: boolean;
  sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'popular';
}
