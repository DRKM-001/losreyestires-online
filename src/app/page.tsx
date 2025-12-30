import { HeroSection } from '@/components/home/HeroSection';
import { TrustIndicators } from '@/components/home/TrustIndicators';
import { FeaturedCategories } from '@/components/home/FeaturedCategories';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { GoogleReviews } from '@/components/reviews/GoogleReviews';

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustIndicators />
      <FeaturedCategories />
      <FeaturedProducts />
      <GoogleReviews />
    </>
  );
}
