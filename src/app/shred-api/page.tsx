import SectionLandingPage from '@/components/templates/SectionLandingPage';
import { ShredAPIHero } from '@/components/sections/HeroContent';
import ShredsAnimation from '@/components/sections/ShredsAnimation';
import { Book, Code, Database, Zap } from 'lucide-react';

export default function ShredAPIPage() {
  const sectionLinks = [
    {
      title: 'Explainer',
      description: 'Learn how Shred API enables millisecond-fast pre-confirmation data access',
      href: '/shred-api/explainer',
      icon: <Book size={32} />,
      color: '#3b82f6'
    },
    {
      title: 'API Documentation',
      description: 'Complete reference for WebSocket endpoints, RPC methods, and data formats',
      href: '/shred-api/api-docs',
      icon: <Zap size={32} />,
      color: '#3b82f6'
    },
    {
      title: 'Code Examples',
      description: 'Ready-to-use code snippets for JavaScript, Python, and other languages',
      href: '/shred-api/code-examples',
      icon: <Code size={32} />,
      color: '#3b82f6'
    },
    {
      title: 'Data Formats',
      description: 'Understand the structure of transaction and block data returned by the API',
      href: '/shred-api/data',
      icon: <Database size={32} />,
      color: '#3b82f6'
    }
  ];

  return (
    <SectionLandingPage
      title="Shred API"
      description="Get millisecond-fast access to pre-confirmation transaction data via WebSocket streaming. Monitor pending transactions before they're included in blocks."
      currentSection="shred-api"
      heroContent={<ShredAPIHero />}
      links={sectionLinks}
      customContent={<ShredsAnimation />}
    />
  );
}