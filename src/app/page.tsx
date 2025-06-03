'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Zap, Shuffle, Clock, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import TopNavigation from '@/components/layout/TopNavigation';
import { useStatistics } from '@/hooks/useStatistics';

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

export default function HomePage() {
  const statistics = useStatistics();
  
  return (
    <div className="min-h-screen bg-surface-950 overflow-hidden">
      {/* Navigation */}
      <TopNavigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        
        <motion.div 
          className="max-w-7xl mx-auto"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            variants={fadeInUp}
          >
            
            <div className="flex flex-col items-center mb-6">
              <Image 
                src="/RISE_Light.png" 
                alt="RISE Logo" 
                width={160} 
                height={160}
                className="object-contain mb-6"
              />
              <h1 className="text-5xl md:text-7xl font-display font-black text-white">
                Builder Toolkit
              </h1>
            </div>
            
            <p className="text-xl text-gray-400 mb-16 leading-relaxed">
              Tools for building next-generation applications on RISE
              <br />
              Experience infinite speed on the fastest blockchain, secured by Ethereum.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="features" className="pt-8 pb-20 px-6">
        <motion.div 
          className="max-w-7xl mx-auto"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
        >
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'Shred API',
                description: 'Stream pre-confirmation transaction data in real-time. Get instant visibility into transactions before block finalization.',
                color: 'text-blue-400',
                bgColor: 'bg-blue-400/10',
                href: '/shred-api',
                comingSoon: true
              },
              {
                icon: <Shuffle className="w-8 h-8" />,
                title: 'Fast VRF',
                description: 'Verifiable random function with 10-100ms response time. Perfect for gaming, NFTs, and fair selection mechanisms.',
                color: 'text-purple-400',
                bgColor: 'bg-purple-400/10',
                href: '/fast-vrf',
                comingSoon: false
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: 'Time Oracle',
                description: '200ms-precision timestamps on-chain. Enable time-sensitive smart contracts and scheduled executions.',
                color: 'text-cyan-400',
                bgColor: 'bg-cyan-400/10',
                href: '/time-oracle',
                comingSoon: true
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: feature.comingSoon ? 0 : -5 }}
                className={feature.comingSoon ? '' : 'group'}
              >
                {feature.comingSoon ? (
                  <div className="bg-surface-800 border border-surface-600 rounded-xl p-8 h-full opacity-75">
                    <div className={`${feature.bgColor} ${feature.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-display font-bold mb-4 text-white">
                      {feature.title}
                      <span className="text-lg font-normal text-gray-400 ml-2">(Coming Soon)</span>
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ) : (
                  <Link href={feature.href} className="block h-full">
                    <div className="bg-surface-800 border border-surface-600 rounded-xl p-8 h-full hover:border-surface-500 transition-all duration-300 group-hover:shadow-lg">
                      <div className={`${feature.bgColor} ${feature.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        {feature.icon}
                      </div>
                      <h3 className="text-2xl font-display font-bold mb-4 text-white group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed mb-4">
                        {feature.description}
                      </p>
                      <div className={`inline-flex items-center gap-1 ${feature.color} font-medium text-sm group-hover:gap-2 transition-all`}>
                        Learn more
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-surface-800/20 to-transparent">
        <motion.div 
          className="max-w-7xl mx-auto"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div 
            className="text-center mb-12"
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-2 text-white">
              Live Network Stats
            </h2>
            <p className="text-lg text-gray-400">
              Real-time performance metrics from the RISE testnet
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { 
                value: statistics.isLoading ? 'Loading' : statistics.tps, 
                label: 'TPS', 
                unit: statistics.isLoading ? '' : 'TPS',
                icon: <Activity className="w-5 h-5" /> 
              },
              { 
                value: statistics.isLoading ? 'Loading' : statistics.gasPerSecond, 
                label: 'Gas per second', 
                unit: statistics.isLoading ? '' : 'MGas/s',
                icon: <Zap className="w-5 h-5" /> 
              },
              { 
                value: statistics.isLoading ? 'Loading' : statistics.shredInterval, 
                label: 'Shred Interval', 
                unit: statistics.isLoading ? '' : 'ms',
                icon: <Clock className="w-5 h-5" /> 
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="bg-surface-800 border border-surface-600 rounded-xl p-6 hover:border-surface-500 transition-colors duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-gray-400 uppercase tracking-wider">
                      {stat.label}
                    </div>
                    <div className="text-primary opacity-50">
                      {stat.icon}
                    </div>
                  </div>
                  <div className={`text-3xl font-display font-bold text-white mb-1 ${statistics.isLoading ? 'animate-pulse' : ''}`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">
                    {stat.unit}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-primary/10 via-neon/10 to-cyan-400/10 rounded-2xl p-12 border border-primary/20">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Have questions or want to learn more about building on RISE? 
              <br />
              We&apos;d love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://discord.gg/qhKnePXdSM"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-gray-100 text-surface-900 rounded-xl font-semibold transition-all duration-200 hover:scale-105 group"
              >
                Join Builder Discord
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>

            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-surface-600">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Image 
              src="/RISE_Light.png" 
              alt="RISE Logo" 
              width={24} 
              height={24}
              className="object-contain"
            />
          </div>
          <div className="flex gap-6">
            <Link href="https://docs.risechain.com/" className="text-gray-400 hover:text-white text-sm transition-colors">
              Documentation
            </Link>
            <Link href="https://github.com/risechain" className="text-gray-400 hover:text-white text-sm transition-colors">
              GitHub
            </Link>
            <Link href="https://discord.gg/qhKnePXdSM" className="text-gray-400 hover:text-white text-sm transition-colors">
              Discord
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}