# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Los Reyes Tires Online Shop - A modern e-commerce platform built with Next.js for selling tires, wheels, and automotive accessories. This is the customer-facing frontend that integrates with the Los Reyes ERP backend system.

**Technology Stack:**
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui components
- React 19

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type check
npx tsc --noEmit
```

## Project Architecture

### Directory Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with Header/Footer
│   ├── page.tsx           # Homepage
│   ├── products/          # Product listing pages
│   ├── cart/              # Shopping cart
│   └── globals.css        # Global styles & Tailwind
├── components/
│   ├── ui/                # shadcn/ui base components
│   ├── layout/            # Header, Footer
│   ├── home/              # Homepage sections
│   ├── products/          # Product cards, filters
│   └── cart/              # Cart components
└── lib/
    ├── types/             # TypeScript interfaces
    ├── constants/         # App-wide constants
    ├── hooks/             # Custom React hooks
    └── utils.ts           # Utility functions
```

### Key Components

**Layout Components:**
- `Header` - Sticky navigation with search, cart icon, mobile menu
- `Footer` - Comprehensive footer with links and contact info

**Homepage Sections:**
- `HeroSection` - Vehicle tire finder (by vehicle or by size)
- `TrustIndicators` - Feature highlights (shipping, warranty, support)
- `FeaturedCategories` - Category navigation cards
- `FeaturedProducts` - Product showcase grid

**Product Components:**
- `ProductCard` - Reusable product display with image, price, rating, add to cart

### Data Types

Core TypeScript interfaces in `src/lib/types/index.ts`:
- `Product` - Product data structure (tires, wheels, accessories)
- `Vehicle` - Vehicle search (year, make, model, trim)
- `Cart` & `CartItem` - Shopping cart state
- `ProductFilters` - Filter/sort options

## Backend Integration

**ERP System:** `/Users/losreyestires/Documents/tires_erp/tires_erp`

The frontend is designed to consume product inventory from the ERP API. Key integration points marked with `// TODO: Replace with API call to ERP backend`:

- Product listings (fetch from inventory module)
- Vehicle fitment data
- Real-time stock availability
- Pricing and promotions

## Design Philosophy

**User Experience Goals:**
- **Fast Discovery** - Multiple search methods (vehicle, size, category)
- **Clear Information** - Prominent pricing, stock status, ratings
- **Responsive Design** - Mobile-first, works on all devices
- **Trust Signals** - Free shipping, warranties, expert installation

**Competitive Positioning:**
Comparable to Discount Tire, Tire Rack, 4WP - professional but accessible, with emphasis on simplicity and speed.

## Styling

- Uses Tailwind CSS v4 with shadcn/ui design system
- Color scheme defined in `src/app/globals.css`
- Primary brand colors: "LOS REYES TIRES" with accent color
- Consistent spacing using Tailwind's scale
- Dark mode support built-in via shadcn/ui

## State Management

Currently using React component state. Future implementation will need:
- Cart state (Context API or Zustand)
- Product filters state
- User session/authentication

## Related Codebases

- **tires_erp** - Backend ERP at `/Users/losreyestires/Documents/tires_erp/tires_erp`
- **tiresware-frontend** - Internal admin frontend at `/Users/losreyestires/Documents/tires_erp/tiresware-frontend`

## Next Steps

1. Implement cart state management (Context API or state library)
2. Create API integration layer for ERP backend
3. Build product detail pages with full specifications
4. Add vehicle fitment validation
5. Implement checkout flow
6. Add user authentication
7. Create admin dashboard integration
