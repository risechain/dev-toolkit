import SectionLandingPage from '@/components/templates/SectionLandingPage';
import { TimeOracleHero } from '@/components/sections/HeroContent';

export default function TimeOraclePage() {
  return (
    <SectionLandingPage
      title="Time Oracle"
      description="Access highly precise blockchain timestamps with millisecond accuracy. Perfect for time-sensitive DeFi protocols and automated contract execution."
      currentSection="time-oracle"
      heroContent={<TimeOracleHero />}
    />
  );
}