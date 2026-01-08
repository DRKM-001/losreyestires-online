# GA4 E-commerce Tracking Implementation Guide

## Overview
This project implements GA4 e-commerce tracking following Google's recommended events and parameters. All tracking functions are in `src/lib/analytics/ga4.ts`.

## ✅ Implemented Events

### 1. **view_item_list** - Product List Views
Track when users see product listings.

```typescript
import { trackViewItemList } from '@/lib/analytics/ga4';

// Example: Tires listing page
trackViewItemList([
  {
    item_id: 'TIRE-001',
    item_name: 'Goodyear Wrangler 265/70R17',
    item_brand: 'Goodyear',
    item_category: 'Tires',
    item_category2: 'All-Terrain',
    item_variant: 'New',
    price: 199.99,
  },
  // ... more products
], 'All-Terrain Tires');
```

**Where to use:**
- `/tires` page when products load
- `/wheels` page
- Search results pages
- Category pages

---

### 2. **view_item** - Product Detail Page
Track when a user views a product.

```typescript
import { trackViewItem } from '@/lib/analytics/ga4';

// Example: Product detail page
trackViewItem({
  item_id: 'TIRE-001',
  item_name: 'Goodyear Wrangler 265/70R17',
  item_brand: 'Goodyear',
  item_category: 'Tires',
  price: 199.99,
  quantity: 1,
});
```

**Where to use:**
- `/products/[id]` page when it loads

---

### 3. **add_to_cart** - Add to Cart
Track when items are added to cart.

```typescript
import { trackAddToCart } from '@/lib/analytics/ga4';

// Example: Add to cart button click
function handleAddToCart(product) {
  trackAddToCart({
    item_id: product.id,
    item_name: product.name,
    item_brand: product.brand,
    item_category: 'Tires',
    price: product.price,
    quantity: 1,
  });
  
  // ... add to cart logic
}
```

**Where to use:**
- Product cards "Add to Cart" button
- Product detail page "Add to Cart" button

---

### 4. **remove_from_cart** - Remove from Cart
Track when items are removed.

```typescript
import { trackRemoveFromCart } from '@/lib/analytics/ga4';

// Example: Remove button in cart
trackRemoveFromCart({
  item_id: 'TIRE-001',
  item_name: 'Goodyear Wrangler 265/70R17',
  price: 199.99,
  quantity: 1,
});
```

**Where to use:**
- Cart page remove/delete buttons
- Cart dropdown remove buttons

---

### 5. **view_cart** - View Cart
Track when users view their cart.

```typescript
import { trackViewCart } from '@/lib/analytics/ga4';

// Example: Cart page load
useEffect(() => {
  trackViewCart(cartItems);
}, []);
```

**Where to use:**
- `/cart` page on load
- Cart dropdown when opened

---

### 6. **begin_checkout** - Start Checkout
Track when checkout process starts.

```typescript
import { trackBeginCheckout } from '@/lib/analytics/ga4';

// Example: Proceed to checkout button
function handleCheckout() {
  trackBeginCheckout(cartItems, 'USD', couponCode);
  router.push('/checkout');
}
```

**Where to use:**
- Cart page "Proceed to Checkout" button
- Cart dropdown "Checkout" button

---

### 7. **add_payment_info** - Payment Method Selected
Track when user adds payment information.

```typescript
import { trackAddPaymentInfo } from '@/lib/analytics/ga4';

// Example: Payment form submission
trackAddPaymentInfo(cartItems, 'credit_card');
// or
trackAddPaymentInfo(cartItems, 'paypal');
```

**Where to use:**
- Checkout payment step when method selected
- Payment info form submission

---

### 8. **purchase** - Transaction Complete
**MOST IMPORTANT** - This captures actual revenue!

```typescript
import { trackPurchase } from '@/lib/analytics/ga4';

// Example: Order confirmation page
trackPurchase({
  transaction_id: 'ORD-12345',
  value: 239.98,
  currency: 'USD',
  tax: 20.00,
  shipping: 15.00,
  coupon: 'SUMMER20',
  items: [
    {
      item_id: 'TIRE-001',
      item_name: 'Goodyear Wrangler 265/70R17',
      item_brand: 'Goodyear',
      item_category: 'Tires',
      price: 199.99,
      quantity: 4,
    },
  ],
});
```

**Where to use:**
- Order confirmation page (`/order/success/[id]`)
- After successful payment processing

---

### 9. **select_item** - Click Product from List
Track when user clicks a product.

```typescript
import { trackSelectItem } from '@/lib/analytics/ga4';

// Example: Product card click
function handleProductClick(product, index) {
  trackSelectItem(
    {
      item_id: product.id,
      item_name: product.name,
      item_brand: product.brand,
      item_category: 'Tires',
      price: product.price,
    },
    'All-Terrain Tires',
    index
  );
  
  router.push(`/products/${product.id}`);
}
```

**Where to use:**
- Product card links
- Product list item clicks

---

### 10. **search** - Search Performed
Track when users search.

```typescript
import { trackSearch } from '@/lib/analytics/ga4';

// Example: Search form submission
function handleSearch(searchTerm) {
  trackSearch(searchTerm);
  // ... perform search
}
```

**Where to use:**
- Header search bar
- Product search pages

---

### 11. **quote_request** - Custom Event (Already Implemented ✅)
Track quote/RFI submissions.

```typescript
import { trackQuoteRequest } from '@/lib/analytics/ga4';

// Already implemented in HeroSection.tsx
trackQuoteRequest({
  vehicle: '2024 Ford F-150',
  tire_size: '265/70R17',
  condition: 'new',
  value: 800, // Optional estimated value
});
```

---

## Implementation Checklist

### High Priority (Revenue Tracking)
- [ ] **purchase** - Order confirmation page
- [ ] **add_to_cart** - Product cards & detail pages
- [ ] **begin_checkout** - Cart checkout button
- [x] **quote_request** - Hero form (DONE)

### Medium Priority (Funnel Analysis)
- [ ] **view_item_list** - Product listing pages
- [ ] **view_item** - Product detail pages
- [ ] **view_cart** - Cart page
- [ ] **add_payment_info** - Checkout payment step

### Low Priority (Enhanced Insights)
- [ ] **remove_from_cart** - Cart item removal
- [ ] **select_item** - Product clicks
- [ ] **search** - Search functionality
- [ ] **add_shipping_info** - Checkout shipping step

---

## Example: Complete Product Card Implementation

```typescript
'use client';

import { trackSelectItem, trackAddToCart } from '@/lib/analytics/ga4';
import { useRouter } from 'next/navigation';

export function ProductCard({ product, index, listName }) {
  const router = useRouter();
  
  const handleProductClick = () => {
    // Track click
    trackSelectItem(
      {
        item_id: product.id,
        item_name: product.name,
        item_brand: product.brand,
        item_category: 'Tires',
        price: product.price,
      },
      listName,
      index
    );
    
    // Navigate
    router.push(`/products/${product.id}`);
  };
  
  const handleAddToCart = (e) => {
    e.stopPropagation(); // Don't trigger product click
    
    // Track add to cart
    trackAddToCart({
      item_id: product.id,
      item_name: product.name,
      item_brand: product.brand,
      item_category: 'Tires',
      price: product.price,
      quantity: 1,
    });
    
    // Add to cart logic...
  };
  
  return (
    <div onClick={handleProductClick}>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}
```

---

## Testing

1. **Check Console Logs**
   - All GA4 events log to console in development
   - Look for `[GA4]` prefix in browser console

2. **Google Tag Assistant**
   - Install Chrome extension
   - View events in real-time as you interact

3. **GA4 DebugView**
   - Enable debug mode in GA4
   - See events appear in real-time dashboard

4. **Production Verification**
   - Check GA4 "Realtime" report after deployment
   - Verify events appear in "Events" report (24-48 hours)

---

## Monetization Reports in GA4

Once implemented, these events will populate:

- **Monetization Overview** - Total revenue, transactions
- **E-commerce Purchases** - Purchase details, products sold
- **Item Promotion** - Product performance
- **Shopping Behavior** - Funnel analysis (view → cart → checkout → purchase)

---

## Next Steps

1. **Implement cart functionality** (Context API or Zustand)
2. **Add tracking to cart operations** (add/remove)
3. **Create checkout flow** with payment/shipping tracking
4. **Implement purchase tracking** on order confirmation
5. **Add product listing tracking** on tire/wheel pages

---

## Resources

- [GA4 E-commerce Events Reference](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce)
- [GA4 Parameters Reference](https://developers.google.com/analytics/devguides/collection/ga4/reference/events)
- [Google Tag Assistant](https://tagassistant.google.com/)
