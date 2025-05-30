import SectionLandingPage from '@/components/templates/SectionLandingPage';
import { FastVRFHero } from '@/components/sections/HeroContent';

export default function FastVRFPage() {
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
      customContent={customContent}
    />
  );
}