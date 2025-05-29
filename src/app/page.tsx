'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Zap, Shuffle, Clock, Code2, Layers, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

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
  return (
    <div className="min-h-screen bg-surface-950 overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-surface-950/90 backdrop-blur-md border-b border-surface-600">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2 group">
                <Image 
                  src="/RISE_Light.png" 
                  alt="RISE Logo" 
                  width={32} 
                  height={32}
                  className="object-contain group-hover:scale-110 transition-transform duration-200"
                />
                <span className="text-xl font-display font-bold text-white">
                  Builder Toolkit
                </span>
              </Link>
              <div className="hidden md:flex items-center gap-6">
                {[
                  { href: '/shred-api', label: 'Shred API' },
                  { href: '/fast-vrf', label: 'Fast VRF' },
                  { href: '/time-oracle', label: 'Time Oracle' },
                  { href: '/docs', label: 'Docs' }
                ].map(link => (
                  <Link 
                    key={link.href}
                    href={link.href} 
                    className="text-gray-400 text-sm font-medium hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              href="/docs"
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium text-sm transition-all duration-200 hover:scale-105"
            >
              Get Started
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
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
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 bg-surface-800 border border-surface-600 rounded-full text-sm text-gray-300 mb-8"
              whileHover={{ scale: 1.05 }}
            >
              <Zap size={16} className="text-yellow-400" />
              <span>10ms latency • 100k+ TPS • Instant confirmations</span>
            </motion.div>
            
            <div className="flex flex-col items-center mb-6">
              <Image 
                src="/RISE_Light.png" 
                alt="RISE Logo" 
                width={120} 
                height={120}
                className="object-contain mb-4"
              />
              <h1 className="text-5xl md:text-7xl font-display font-black text-white">
                Builder Toolkit
              </h1>
            </div>
            
            <p className="text-xl text-gray-400 mb-10 leading-relaxed">
              Cutting-edge developer tools for building next-generation applications on RISE&apos;s ultra-fast Layer 2 blockchain. 
              Experience sub-second finality and unmatched performance.
            </p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeInUp}
            >
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold transition-all duration-200 hover:scale-105 group"
              >
                Start Building
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/shred-api"
                className="inline-flex items-center gap-2 px-8 py-4 bg-surface-800 hover:bg-surface-700 text-white rounded-xl font-semibold border border-surface-600 transition-all duration-200 hover:scale-105"
              >
                Explore Features
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6">
        <motion.div 
          className="max-w-7xl mx-auto"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white">
              Developer Superpowers
            </h2>
            <p className="text-xl text-gray-400">
              Everything you need to build blazing-fast blockchain applications
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'Shred API',
                description: 'Stream pre-confirmation transaction data in real-time. Get instant visibility into transactions before block finalization.',
                color: 'text-blue-400',
                bgColor: 'bg-blue-400/10',
                href: '/shred-api'
              },
              {
                icon: <Shuffle className="w-8 h-8" />,
                title: 'Fast VRF',
                description: 'Verifiable random function with 10-100ms response time. Perfect for gaming, NFTs, and fair selection mechanisms.',
                color: 'text-purple-400',
                bgColor: 'bg-purple-400/10',
                href: '/fast-vrf'
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: 'Time Oracle',
                description: 'Millisecond-precision timestamps on-chain. Enable time-sensitive smart contracts and scheduled executions.',
                color: 'text-cyan-400',
                bgColor: 'bg-cyan-400/10',
                href: '/time-oracle'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="group"
              >
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
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { value: '10ms', label: 'Block Latency', icon: <Zap className="w-5 h-5" /> },
              { value: '100k+', label: 'TPS Capacity', icon: <Layers className="w-5 h-5" /> },
              { value: '99.9%', label: 'Uptime SLA', icon: <Shield className="w-5 h-5" /> },
              { value: '<1ms', label: 'Shred Speed', icon: <Code2 className="w-5 h-5" /> }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="bg-surface-800 border border-surface-600 rounded-xl p-6 hover:border-surface-500 transition-colors duration-300">
                  <div className="text-primary mb-2 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-display font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">
                    {stat.label}
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
              Ready to Build on RISE?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join developers building the future of fast, scalable blockchain applications.
            </p>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-gray-100 text-surface-900 rounded-xl font-semibold transition-all duration-200 hover:scale-105 group"
            >
              View Documentation
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
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
            <span className="text-gray-400 text-sm">
              © 2024 RISE Builder Toolkit. All rights reserved.
            </span>
          </div>
          <div className="flex gap-6">
            <Link href="/docs" className="text-gray-400 hover:text-white text-sm transition-colors">
              Documentation
            </Link>
            <Link href="https://github.com" className="text-gray-400 hover:text-white text-sm transition-colors">
              GitHub
            </Link>
            <Link href="https://discord.gg" className="text-gray-400 hover:text-white text-sm transition-colors">
              Discord
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}