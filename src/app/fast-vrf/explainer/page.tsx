'use client';

import DocPage from '@/components/templates/DocPage';
import { motion } from 'framer-motion';
import { Zap, Shield, Coins, Code, Gamepad, Image, Ticket, TrendingUp, Shuffle } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function FastVRFExplainer() {
  return (
    <DocPage
      title="RISE VRF - Instant Randomness for Blockchain Applications"
      description="Protocol-native instant randomness delivering cryptographically secure random numbers in 10-100ms"
      currentSection="fast-vrf"
    >
      {/* Hero Section */}
      <motion.section 
        className="mb-16"
        initial="initial"
        animate="animate"
        variants={stagger}
      >
        <motion.div 
          className="bg-gradient-to-r from-purple-500/10 via-purple-400/5 to-transparent rounded-2xl p-8 mb-8"
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-display font-bold mb-4">Ultra-Fast Verifiable Random Function</h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Perfect for gaming, NFT minting, and any dApp requiring immediate verifiable entropy.
          </p>
        </motion.div>

        {/* Metrics Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            { value: '10-100ms', label: 'Response Time', color: 'text-purple-400' },
            { value: '99%', label: 'Latency Reduction', color: 'text-purple-400' },
            { value: 'ECDSA', label: 'Cryptographic Proof', color: 'text-purple-400' },
            { value: 'Zero Gas', label: 'Random Generation', color: 'text-purple-400' }
          ].map((metric, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-surface-800 border border-surface-600 rounded-xl p-6 text-center hover:border-purple-500/50 transition-colors"
            >
              <div className={`text-3xl font-display font-bold mb-2 ${metric.color}`}>
                {metric.value}
              </div>
              <div className="text-sm text-gray-400">{metric.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Why Choose RISE VRF */}
      <section className="mb-16">
        <h2>Why Choose RISE VRF?</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              icon: <Zap className="w-6 h-6" />,
              title: '🚀 Lightning Fast',
              points: [
                'Response times as low as 10ms',
                '99% faster than traditional blockchain VRF solutions',
                'Powered by RISE Chain\'s instant execution'
              ]
            },
            {
              icon: <Shield className="w-6 h-6" />,
              title: '🔒 Cryptographically Secure',
              points: [
                'ECDSA signature verification on every request',
                'Tamper-proof random number generation',
                'Verifiable proofs for complete transparency'
              ]
            },
            {
              icon: <Coins className="w-6 h-6" />,
              title: '⚡ Zero Gas Costs',
              points: [
                'No gas fees for random number requests',
                'Cost-effective for high-frequency applications',
                'Perfect for gaming and real-time applications'
              ]
            },
            {
              icon: <Code className="w-6 h-6" />,
              title: '🛠️ Developer Friendly',
              points: [
                'Simple smart contract integration',
                'Comprehensive documentation and examples',
                'Full TypeScript/JavaScript SDK support'
              ]
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-surface-800 border border-surface-600 rounded-xl p-6 hover:border-purple-500/50 transition-colors"
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                  {feature.icon}
                </div>
                {feature.title}
              </h3>
              <ul className="space-y-2">
                {feature.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span className="text-gray-300">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section className="mb-16">
        <h2>Perfect For</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: <Gamepad className="w-8 h-8" />,
              title: '🎮 Gaming',
              description: 'Instant loot drops, fair dice rolls, battle outcomes',
              color: 'text-blue-400',
              bgColor: 'bg-blue-400/10'
            },
            {
              icon: <Image className="w-8 h-8" />,
              title: '🖼️ NFT Minting',
              description: 'Random trait assignment, fair rarity distribution',
              color: 'text-green-400',
              bgColor: 'bg-green-400/10'
            },
            {
              icon: <Ticket className="w-8 h-8" />,
              title: '🎫 Lotteries',
              description: 'Provably fair winner selection',
              color: 'text-yellow-400',
              bgColor: 'bg-yellow-400/10'
            },
            {
              icon: <TrendingUp className="w-8 h-8" />,
              title: '💰 DeFi',
              description: 'Random validator selection, fair distributions',
              color: 'text-red-400',
              bgColor: 'bg-red-400/10'
            },
            {
              icon: <Shuffle className="w-8 h-8" />,
              title: '🔀 Any Application',
              description: 'Requiring instant, verifiable randomness',
              color: 'text-purple-400',
              bgColor: 'bg-purple-400/10'
            }
          ].map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-surface-800 border border-surface-600 rounded-xl p-6 hover:border-surface-500 transition-all group hover:scale-105"
            >
              <div className={`${useCase.bgColor} ${useCase.color} w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                {useCase.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">{useCase.title}</h3>
              <p className="text-gray-400">{useCase.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Security Features */}
      <section className="mb-16">
        <h2>Security Features</h2>
        
        <div className="space-y-6">
          <div className="bg-surface-800 border border-surface-600 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              🔐 Cryptographic Verification
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Every response includes an ECDSA signature from the authorized backend</li>
              <li>• On-chain verification ensures no tampering has occurred</li>
              <li>• Request-specific proofs prevent replay attacks</li>
            </ul>
          </div>

          <div className="bg-surface-800 border border-surface-600 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              🎯 Unpredictable Generation
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>• ChaCha20 CSPRNG with entropy from request parameters</li>
              <li>• Client-provided seeds enhance unpredictability</li>
              <li>• Backend cannot predict or manipulate outcomes</li>
            </ul>
          </div>

          <div className="bg-surface-800 border border-surface-600 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              ⚡ Instant Confirmation
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Unlike traditional VRF solutions that require multiple block confirmations</li>
              <li>• RISE VRF delivers verified randomness in milliseconds</li>
              <li>• Perfect for real-time applications and gaming</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="mb-16">
        <h2>Roadmap</h2>
        
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-500/10 to-transparent border-l-4 border-purple-500 pl-6 py-4">
            <h3 className="text-xl font-semibold mb-2">🚀 Q1 2024</h3>
            <ul className="space-y-1 text-gray-300">
              <li>• Subscription-based gas payment model</li>
              <li>• Batch request optimization</li>
              <li>• Enhanced monitoring dashboard</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-purple-500/10 to-transparent border-l-4 border-purple-500 pl-6 py-4">
            <h3 className="text-xl font-semibold mb-2">⚡ Q2 2024</h3>
            <ul className="space-y-1 text-gray-300">
              <li>• Native protocol randomness integration</li>
              <li>• Sub-10ms response times</li>
              <li>• Multi-chain support</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-purple-500/10 to-transparent border-l-4 border-purple-500 pl-6 py-4">
            <h3 className="text-xl font-semibold mb-2">🛠️ Q3 2024</h3>
            <ul className="space-y-1 text-gray-300">
              <li>• Advanced entropy sources</li>
              <li>• Custom proof verification</li>
              <li>• Enterprise SLA options</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-purple-500/10 border border-purple-500/30 rounded-xl p-6 text-center">
          <p className="text-lg text-gray-300 mb-4">
            RISE VRF is currently in private beta. Contact us to get early access and help shape the future of instant randomness.
          </p>
          <a 
            href="mailto:builders@risechain.com" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-colors"
          >
            Get Early Access
          </a>
        </div>
      </section>
    </DocPage>
  );
}