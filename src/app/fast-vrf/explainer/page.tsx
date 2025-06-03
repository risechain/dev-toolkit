'use client';

import DocPage from '@/components/templates/DocPage';
import { motion } from 'framer-motion';
import { Zap, Shield, Gamepad, Image, Ticket } from 'lucide-react';
import Link from 'next/link';

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
      title="Fast VRF"
      description="Protocol-native near instant randomness delivering cryptographically secure random numbers in 10-100ms"
      currentSection="fast-vrf"
    >
      {/* MVP Status Notice */}
      <motion.div 
        className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-lg text-gray-300">
          Fast VRF is currently in MVP. See our <Link href="/fast-vrf/integration" className="text-purple-400 hover:text-purple-300 underline">integration guide</Link> to get started. Our MVP is primarily to provide a way for developers to simply integrate Random numbers with low latency into their applications, in future updates we&apos;ll be upgrading our RNG functionality to have more secure Randomness.
        </p>
      </motion.div>

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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12">
          {[
            { value: '10-100ms', label: 'Response Time', color: 'text-purple-400' },
            { value: '99%', label: 'Latency Reduction', color: 'text-purple-400' },
            { value: 'ECDSA', label: 'Cryptographic Proof', color: 'text-purple-400' }
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {[
            {
              icon: <Zap className="w-6 h-6" />,
              title: 'Lightning Fast',
              points: [
                'Response times as low as 10ms',
                '99% faster than traditional blockchain VRF solutions',
                'Powered by RISE Chain\'s instant execution'
              ]
            },
            {
              icon: <Shield className="w-6 h-6" />,
              title: 'Cryptographically Secure',
              points: [
                'ECDSA signature verification on every request',
                'Tamper-proof random number generation',
                'Verifiable proofs for complete transparency'
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {[
            {
              icon: <Gamepad className="w-8 h-8" />,
              title: 'Gaming',
              description: 'Instant loot drops, fair dice rolls, battle outcomes',
              color: 'text-blue-400',
              bgColor: 'bg-blue-400/10'
            },
            {
              icon: <Image className="w-8 h-8" aria-label="NFT" />,
              title: 'NFT Minting',
              description: 'Random trait assignment, fair rarity distribution',
              color: 'text-green-400',
              bgColor: 'bg-green-400/10'
            },
            {
              icon: <Ticket className="w-8 h-8" />,
              title: 'Lotteries',
              description: 'Provably fair winner selection',
              color: 'text-yellow-400',
              bgColor: 'bg-yellow-400/10'
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

    </DocPage>
  );
}