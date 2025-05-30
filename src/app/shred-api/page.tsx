import SectionLandingPage from '@/components/templates/SectionLandingPage';
import { ShredAPIHero } from '@/components/sections/HeroContent';
import ShredsAnimation from '@/components/sections/ShredsAnimation';

export default function ShredAPIPage() {
  return (
    <SectionLandingPage
      title="Shred API"
      description="Stream pre-confirmation transaction data in real-time. Build responsive dApps that react to blockchain events in milliseconds, not seconds. Perfect for gaming, DeFi, and any application requiring instant feedback."
      currentSection="shred-api"
      heroContent={<ShredAPIHero />}
      customContent={<ShredsAnimation />}
    />
  );
}