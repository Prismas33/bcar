import HeroSection from '@/components/sections/HeroSection';
import FeaturedVehicles from '@/components/sections/FeaturedVehicles';
import StatsSection from '@/components/sections/StatsSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedVehicles />
      <StatsSection />
    </>
  );
}
