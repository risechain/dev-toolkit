'use client';

import { motion } from 'framer-motion';

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

// Animation variants
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.95 },
  show: { 
    y: 0, 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

function HeroContent({ config }: { config: HeroContentConfig }) {
  return (
    <motion.div 
      className="space-y-12"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Stats Grid */}
      <motion.div 
        className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        variants={containerVariants}
      >
        {config.stats.map((stat, index) => (
          <motion.div 
            key={index} 
            className="bg-surface-800 border border-surface-600 rounded-xl p-6 text-center group hover:scale-105 transition-all duration-300 hover:border-surface-500"
            variants={cardVariants}
            whileHover={{ 
              boxShadow: "0 0 20px rgba(255, 255, 255, 0.1)",
              scale: 1.05 
            }}
          >
            <div className={`text-4xl font-display font-black mb-3 glow-text`} style={{ color: stat.color }}>
              {stat.value}
            </div>
            <p className="text-sm tracking-wide uppercase text-gray-400 font-medium">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Use Cases */}
      <motion.div 
        className="bg-surface-800 border border-surface-600 rounded-xl p-8 max-w-4xl mx-auto hover:border-surface-500 transition-colors duration-300"
        variants={cardVariants}
      >
        <h3 className={`text-2xl font-display font-bold mb-6 text-center glow-text`} style={{ color: config.useCases.color }}>
          {config.useCases.title}
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            {config.useCases.items.slice(0, 3).map((item, index) => (
              <motion.div 
                key={index} 
                className="flex items-center space-x-3 group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div 
                  className="w-3 h-3 rounded-full flex-shrink-0 group-hover:scale-125 transition-transform"
                  style={{ backgroundColor: item.color.replace('bg-', '#') }}
                />
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>
          <div className="space-y-3">
            {config.useCases.items.slice(3).map((item, index) => (
              <motion.div 
                key={index} 
                className="flex items-center space-x-3 group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <div 
                  className="w-3 h-3 rounded-full flex-shrink-0 group-hover:scale-125 transition-transform"
                  style={{ backgroundColor: item.color.replace('bg-', '#') }}
                />
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}