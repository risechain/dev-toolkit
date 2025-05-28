'use client';

interface StatCard {
  value: string;
  label: string;
  color: string;
}

interface UseCase {
  text: string;
  color: string;
}

interface HeroContentConfig {
  stats: StatCard[];
  useCases: {
    title: string;
    items: UseCase[];
    color: string;
  };
}

export function ShredAPIHero() {
  const config: HeroContentConfig = {
    stats: [
      { value: '~100ms', label: 'Pre-confirmation Speed', color: 'text-blue-400' },
      { value: '99.9%', label: 'Uptime Guarantee', color: 'text-blue-400' },
      { value: 'WebSocket', label: 'Real-time Streaming', color: 'text-blue-400' }
    ],
    useCases: {
      title: 'Perfect For',
      color: 'text-blue-400',
      items: [
        { text: 'High-frequency trading applications', color: 'bg-blue-400' },
        { text: 'MEV protection strategies', color: 'bg-blue-400' },
        { text: 'Transaction monitoring dashboards', color: 'bg-blue-400' },
        { text: 'Arbitrage bots', color: 'bg-blue-400' },
        { text: 'Real-time analytics', color: 'bg-blue-400' },
        { text: 'Chain state pre-confirmation', color: 'bg-blue-400' }
      ]
    }
  };

  return (
    <div className="space-y-12">
      <HeroContent config={config} />
    </div>
  );
}

export function FastVRFHero() {
  const config: HeroContentConfig = {
    stats: [
      { value: '10-100ms', label: 'Response Time', color: 'text-purple-400' },
      { value: '99%', label: 'Latency Reduction', color: 'text-purple-400' },
      { value: 'ECDSA', label: 'Cryptographic Proof', color: 'text-purple-400' }
    ],
    useCases: {
      title: 'Perfect For',
      color: 'text-purple-400',
      items: [
        { text: 'Gaming & NFT minting', color: 'bg-purple-400' },
        { text: 'DeFi lottery systems', color: 'bg-purple-400' },
        { text: 'Random selection mechanisms', color: 'bg-purple-400' },
        { text: 'Fair distribution algorithms', color: 'bg-purple-400' },
        { text: 'Provably random outcomes', color: 'bg-purple-400' },
        { text: 'Real-time randomness', color: 'bg-purple-400' }
      ]
    }
  };

  return <HeroContent config={config} />;
}

export function TimeOracleHero() {
  const config: HeroContentConfig = {
    stats: [
      { value: '±1ms', label: 'Timestamp Precision', color: 'text-cyan-400' },
      { value: 'Millisecond', label: 'Block Resolution', color: 'text-cyan-400' },
      { value: '100%', label: 'Verifiable Proofs', color: 'text-cyan-400' }
    ],
    useCases: {
      title: 'Ideal For',
      color: 'text-cyan-400',
      items: [
        { text: 'Time-sensitive smart contracts', color: 'bg-cyan-400' },
        { text: 'Financial derivatives & options', color: 'bg-cyan-400' },
        { text: 'DeFi protocol automation', color: 'bg-cyan-400' },
        { text: 'Scheduled transaction execution', color: 'bg-cyan-400' },
        { text: 'Time-locked escrow systems', color: 'bg-cyan-400' },
        { text: 'Cross-chain synchronization', color: 'bg-cyan-400' }
      ]
    }
  };

  return <HeroContent config={config} />;
}

function HeroContent({ config }: { config: HeroContentConfig }) {
  return (
    <div className="text-center space-y-8">
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {config.stats.map((stat, index) => (
          <div key={index} className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
            <div className="text-gray-300">{stat.label}</div>
          </div>
        ))}
      </div>
      
      <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6 max-w-4xl mx-auto">
        <h3 className={`text-xl font-semibold ${config.useCases.color} mb-4`}>{config.useCases.title}</h3>
        <div className="grid md:grid-cols-2 gap-4 text-left">
          <div className="space-y-2">
            {config.useCases.items.slice(0, 3).map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className={`w-2 h-2 ${item.color} rounded-full`}></div>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {config.useCases.items.slice(3).map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className={`w-2 h-2 ${item.color} rounded-full`}></div>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}