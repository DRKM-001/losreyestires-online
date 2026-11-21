import { Suspense } from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { BrandMarquee } from '@/components/home/BrandMarquee';
import { ShopPanels } from '@/components/home/ShopPanels';
import { ServicesGrid } from '@/components/home/ServicesGrid';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { Visit } from '@/components/home/Visit';
import { HomeFaq } from '@/components/home/HomeFaq';
import { GoogleReviews } from '@/components/reviews/GoogleReviews';

export default function Home() {
  return (
    <>
      <HeroSection />
      <BrandMarquee />
      <ShopPanels />
      <ServicesGrid />
      <Suspense fallback={null}>
        <GoogleReviews />
      </Suspense>
      <FeaturedProducts />
      <Visit />
      <HomeFaq />
    </>
  );
}
