import SectionLandingPage from '@/components/templates/SectionLandingPage';
import { TimeOracleHero } from '@/components/sections/HeroContent';
import { Book, Code, Clock } from 'lucide-react';

export default function TimeOraclePage() {
  const sectionLinks = [
    {
      title: 'Explainer',
      description: 'Discover how Time Oracle provides millisecond-precise blockchain timestamps',
      href: '/time-oracle/explainer',
      icon: <Book size={32} />,
      color: '#06b6d4'
    },
    {
      title: 'API Documentation',
      description: 'Complete guide to timestamp queries, proof verification, and integration',
      href: '/time-oracle/api-docs',
      icon: <Clock size={32} />,
      color: '#06b6d4'
    },
    {
      title: 'Code Examples',
      description: 'Implementation examples for Solidity contracts and client libraries',
      href: '/time-oracle/code-examples',
      icon: <Code size={32} />,
      color: '#06b6d4'
    }
  ];

  return (
    <SectionLandingPage
      title="Time Oracle"
      description="Access highly precise blockchain timestamps with millisecond accuracy. Perfect for time-sensitive DeFi protocols and automated contract execution."
      currentSection="time-oracle"
      heroContent={<TimeOracleHero />}
      links={sectionLinks}
    />
  );
}