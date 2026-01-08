/**
 * GA4 E-commerce Event Tracking
 * Implements Google Analytics 4 recommended e-commerce events
 * https://developers.google.com/analytics/devguides/collection/ga4/ecommerce
 */

// Extend Window type for gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

export interface GA4Product {
  item_id: string;          // Product ID (e.g., "TIRE-12345")
  item_name: string;        // Product name (e.g., "Goodyear Wrangler 265/70R17")
  item_brand?: string;      // Brand (e.g., "Goodyear")
  item_category?: string;   // Category (e.g., "Tires")
  item_category2?: string;  // Sub-category (e.g., "All-Terrain")
  item_variant?: string;    // Variant (e.g., "New" or "Used")
  price: number;            // Price per item
  quantity?: number;        // Quantity (default: 1)
}

export interface GA4EcommerceEvent {
  currency?: string;        // Currency code (default: "USD")
  value?: number;          // Total value of the event
  items: GA4Product[];     // Array of products
}

export interface GA4PurchaseEvent extends GA4EcommerceEvent {
  transaction_id: string;  // Unique transaction ID
  tax?: number;            // Tax amount
  shipping?: number;       // Shipping cost
  coupon?: string;         // Coupon code used
}

/**
 * Helper to safely call gtag
 */
function gtag(command: string, targetId: string, config?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(command, targetId, config);
  } else {
    console.warn('GA4 gtag not loaded');
  }
}

/**
 * View Item List - When users see a list of products
 * @example Product listing pages, search results, category pages
 */
export function trackViewItemList(
  items: GA4Product[],
  listName: string = 'Product List'
) {
  gtag('event', 'view_item_list', {
    item_list_id: listName.toLowerCase().replace(/\s+/g, '_'),
    item_list_name: listName,
    items: items.map((item, index) => ({
      ...item,
      quantity: item.quantity || 1,
      index: index,
    })),
  });
  
  console.log('[GA4] view_item_list:', listName, items.length, 'items');
}

/**
 * View Item - When a user views a product detail page
 */
export function trackViewItem(product: GA4Product, currency: string = 'USD') {
  gtag('event', 'view_item', {
    currency: currency,
    value: product.price * (product.quantity || 1),
    items: [{
      ...product,
      quantity: product.quantity || 1,
    }],
  });
  
  console.log('[GA4] view_item:', product.item_name);
}

/**
 * Add to Cart - When a user adds items to cart
 */
export function trackAddToCart(
  product: GA4Product,
  currency: string = 'USD'
) {
  const quantity = product.quantity || 1;
  gtag('event', 'add_to_cart', {
    currency: currency,
    value: product.price * quantity,
    items: [{
      ...product,
      quantity: quantity,
    }],
  });
  
  console.log('[GA4] add_to_cart:', product.item_name, 'x', quantity);
}

/**
 * Remove from Cart - When a user removes items from cart
 */
export function trackRemoveFromCart(
  product: GA4Product,
  currency: string = 'USD'
) {
  const quantity = product.quantity || 1;
  gtag('event', 'remove_from_cart', {
    currency: currency,
    value: product.price * quantity,
    items: [{
      ...product,
      quantity: quantity,
    }],
  });
  
  console.log('[GA4] remove_from_cart:', product.item_name);
}

/**
 * View Cart - When a user views their cart
 */
export function trackViewCart(
  items: GA4Product[],
  currency: string = 'USD'
) {
  const value = items.reduce((sum, item) => 
    sum + (item.price * (item.quantity || 1)), 0
  );
  
  gtag('event', 'view_cart', {
    currency: currency,
    value: value,
    items: items.map(item => ({
      ...item,
      quantity: item.quantity || 1,
    })),
  });
  
  console.log('[GA4] view_cart:', items.length, 'items, $', value);
}

/**
 * Begin Checkout - When a user starts the checkout process
 */
export function trackBeginCheckout(
  items: GA4Product[],
  currency: string = 'USD',
  coupon?: string
) {
  const value = items.reduce((sum, item) => 
    sum + (item.price * (item.quantity || 1)), 0
  );
  
  gtag('event', 'begin_checkout', {
    currency: currency,
    value: value,
    coupon: coupon,
    items: items.map(item => ({
      ...item,
      quantity: item.quantity || 1,
    })),
  });
  
  console.log('[GA4] begin_checkout:', items.length, 'items');
}

/**
 * Add Payment Info - When a user submits payment information
 */
export function trackAddPaymentInfo(
  items: GA4Product[],
  paymentType: string,
  currency: string = 'USD'
) {
  const value = items.reduce((sum, item) => 
    sum + (item.price * (item.quantity || 1)), 0
  );
  
  gtag('event', 'add_payment_info', {
    currency: currency,
    value: value,
    payment_type: paymentType,
    items: items.map(item => ({
      ...item,
      quantity: item.quantity || 1,
    })),
  });
  
  console.log('[GA4] add_payment_info:', paymentType);
}

/**
 * Add Shipping Info - When a user submits shipping information
 */
export function trackAddShippingInfo(
  items: GA4Product[],
  shippingTier: string,
  currency: string = 'USD'
) {
  const value = items.reduce((sum, item) => 
    sum + (item.price * (item.quantity || 1)), 0
  );
  
  gtag('event', 'add_shipping_info', {
    currency: currency,
    value: value,
    shipping_tier: shippingTier,
    items: items.map(item => ({
      ...item,
      quantity: item.quantity || 1,
    })),
  });
  
  console.log('[GA4] add_shipping_info:', shippingTier);
}

/**
 * Purchase - When a transaction is completed
 * THIS IS THE MOST IMPORTANT EVENT - captures revenue
 */
export function trackPurchase(purchaseData: GA4PurchaseEvent) {
  const value = purchaseData.value || 
    purchaseData.items.reduce((sum, item) => 
      sum + (item.price * (item.quantity || 1)), 0
    );
  
  gtag('event', 'purchase', {
    transaction_id: purchaseData.transaction_id,
    value: value,
    currency: purchaseData.currency || 'USD',
    tax: purchaseData.tax || 0,
    shipping: purchaseData.shipping || 0,
    coupon: purchaseData.coupon,
    items: purchaseData.items.map(item => ({
      ...item,
      quantity: item.quantity || 1,
    })),
  });
  
  console.log('[GA4] purchase:', purchaseData.transaction_id, '$', value);
}

/**
 * Search - When a user performs a search
 */
export function trackSearch(searchTerm: string) {
  gtag('event', 'search', {
    search_term: searchTerm,
  });
  
  console.log('[GA4] search:', searchTerm);
}

/**
 * Select Item - When a user clicks on a product from a list
 */
export function trackSelectItem(
  product: GA4Product,
  listName: string = 'Product List',
  index?: number
) {
  gtag('event', 'select_item', {
    item_list_id: listName.toLowerCase().replace(/\s+/g, '_'),
    item_list_name: listName,
    items: [{
      ...product,
      quantity: product.quantity || 1,
      index: index,
    }],
  });
  
  console.log('[GA4] select_item:', product.item_name, 'from', listName);
}

/**
 * Quote Request - Custom event for RFI submissions
 */
export function trackQuoteRequest(data: {
  vehicle?: string;
  tire_size?: string;
  condition: string;
  value?: number;
}) {
  gtag('event', 'quote_request', {
    event_category: 'engagement',
    event_label: data.vehicle || data.tire_size,
    tire_condition: data.condition,
    value: data.value || 0,
  });
  
  console.log('[GA4] quote_request:', data);
}
