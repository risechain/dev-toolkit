import SectionLandingPage from '@/components/templates/SectionLandingPage';
import { FastVRFHero } from '@/components/sections/HeroContent';
import { BookOpen, Cog, Code2 } from 'lucide-react';

export default function FastVRFPage() {
  const links = [
    {
      title: 'Explainer',
      description: 'Learn how Fast VRF delivers instant, verifiable randomness in 10-100ms',
      href: '/fast-vrf/explainer',
      icon: <BookOpen size={32} />,
      color: '#a855f7'
    },
    {
      title: 'Integration Guide',
      description: 'Step-by-step guide to implement Fast VRF in your smart contracts',
      href: '/fast-vrf/integration',
      icon: <Cog size={32} />,
      color: '#c084fc'
    },
    {
      title: 'Code Examples',
      description: 'Ready-to-use Solidity contracts and backend implementation examples',
      href: '/fast-vrf/code-examples',
      icon: <Code2 size={32} />,
      color: '#e879f9'
    }
  ];


  const customContent = (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: 'bold', 
        marginBottom: '24px',
        color: '#ffffff'
      }}>
        Revolutionary Gaming Experience
      </h2>
      <p style={{ 
        fontSize: '1.125rem',
        color: '#a1a1aa',
        marginBottom: '32px',
        maxWidth: '600px',
        margin: '0 auto 32px',
        lineHeight: '1.6'
      }}>
        Fast VRF enables real-time blockchain gaming with dice rolls, card shuffling, and NFT minting 
        that respond faster than you can blink. No more waiting for block confirmations.
      </p>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '24px',
        marginTop: '32px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.25rem', fontWeight: '600', color: '#a855f7', marginBottom: '8px' }}>
            🎲 Gaming
          </div>
          <p style={{ color: '#a1a1aa', fontSize: '14px' }}>Instant dice rolls and card shuffling</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.25rem', fontWeight: '600', color: '#c084fc', marginBottom: '8px' }}>
            🎨 NFTs
          </div>
          <p style={{ color: '#a1a1aa', fontSize: '14px' }}>Real-time trait randomization</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.25rem', fontWeight: '600', color: '#e879f9', marginBottom: '8px' }}>
            🎰 Lotteries
          </div>
          <p style={{ color: '#a1a1aa', fontSize: '14px' }}>Provably fair lottery systems</p>
        </div>
      </div>
    </div>
  );

  return (
    <SectionLandingPage
      title="Fast VRF"
      description="Protocol-native instant randomness delivering cryptographically secure random numbers in 10-100ms. Perfect for gaming, NFT minting, and any dApp requiring immediate verifiable entropy."
      currentSection="fast-vrf"
      heroContent={<FastVRFHero />}
      links={links}
      customContent={customContent}
    />
  );
}