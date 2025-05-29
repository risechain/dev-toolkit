import SectionLandingPage from '@/components/templates/SectionLandingPage';
import { ShredAPIHero } from '@/components/sections/HeroContent';
import ShredsAnimation from '@/components/sections/ShredsAnimation';
import { Book, Code, Database, Zap } from 'lucide-react';

export default function ShredAPIPage() {
  const sectionLinks = [
    {
      title: 'Explainer',
      description: 'Discover how Shred API transforms blockchain UX with sub-10ms transaction streaming',
      href: '/shred-api/explainer',
      icon: <Book size={32} />,
      color: '#3b82f6'
    },
    {
      title: 'API Documentation',
      description: 'Complete reference for WebSocket connections, RPC methods, and real-time subscriptions',
      href: '/shred-api/api-docs',
      icon: <Zap size={32} />,
      color: '#3b82f6'
    },
    {
      title: 'Code Examples',
      description: 'Production-ready integration patterns with automatic reconnection and error handling',
      href: '/shred-api/code-examples',
      icon: <Code size={32} />,
      color: '#3b82f6'
    },
    {
      title: 'Data Formats',
      description: 'Detailed schemas for shred objects, event logs, and transaction notifications',
      href: '/shred-api/data',
      icon: <Database size={32} />,
      color: '#3b82f6'
    }
  ];

  return (
    <SectionLandingPage
      title="Shred API"
      description="Stream pre-confirmation transaction data in real-time. Build responsive dApps that react to blockchain events in milliseconds, not seconds. Perfect for gaming, DeFi, and any application requiring instant feedback."
      currentSection="shred-api"
      heroContent={<ShredAPIHero />}
      links={sectionLinks}
      customContent={<ShredsAnimation />}
    />
  );
}