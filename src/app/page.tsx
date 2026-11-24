import { Suspense } from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { BrandMarquee } from '@/components/home/BrandMarquee';
import { SaleFeature } from '@/components/promo/SaleFeature';
import { ShopPanels } from '@/components/home/ShopPanels';
import { ServicesGrid } from '@/components/home/ServicesGrid';
import { Visit } from '@/components/home/Visit';
import { HomeFaq } from '@/components/home/HomeFaq';
import { GoogleReviews } from '@/components/reviews/GoogleReviews';

export default function Home() {
  return (
    <>
      <HeroSection />
      <SaleFeature />
      <BrandMarquee />
      <ShopPanels />
      <ServicesGrid />
      <Suspense fallback={null}>
        <GoogleReviews />
      </Suspense>
      <Visit />
      <HomeFaq />
    </>
  );
}
