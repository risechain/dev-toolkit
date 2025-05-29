'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Book, Code, Database, Zap, Shuffle, Clock } from 'lucide-react';
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

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-surface-950">
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
            className="text-center max-w-4xl mx-auto mb-16"
            variants={fadeInUp}
          >
            <h1 className="text-5xl md:text-6xl font-display font-black mb-6">
              <span className="bg-gradient-to-r from-primary via-neon to-cyan-400 bg-clip-text text-transparent">
                Documentation
              </span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Everything you need to build on RISE's ultra-fast Layer 2 blockchain
            </p>
          </motion.div>
          
          {/* Quick Start Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'Shred API',
                description: 'Get millisecond-fast access to pre-confirmation transaction data via WebSocket streaming.',
                href: '/shred-api',
                color: 'text-blue-400',
                bgColor: 'bg-blue-400/10'
              },
              {
                icon: <Shuffle className="w-8 h-8" />,
                title: 'Fast VRF',
                description: 'Verifiable random function with 10-100ms response time for gaming and fair selection.',
                href: '/fast-vrf',
                color: 'text-purple-400',
                bgColor: 'bg-purple-400/10'
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: 'Time Oracle',
                description: 'Millisecond-precision timestamps on-chain for time-sensitive smart contracts.',
                href: '/time-oracle',
                color: 'text-cyan-400',
                bgColor: 'bg-cyan-400/10'
              }
            ].map((product, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Link href={product.href} className="block h-full">
                  <div className="bg-surface-800 border border-surface-600 rounded-xl p-8 h-full hover:border-surface-500 transition-all duration-300 group-hover:shadow-lg">
                    <div className={`${product.bgColor} ${product.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      {product.icon}
                    </div>
                    <h3 className="text-2xl font-display font-bold mb-4 text-white group-hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed mb-4">
                      {product.description}
                    </p>
                    <div className={`inline-flex items-center gap-1 ${product.color} font-medium text-sm group-hover:gap-2 transition-all`}>
                      Get Started
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Resources Section */}
          <motion.div 
            className="mt-20"
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-display font-bold text-white mb-8 text-center">
              Additional Resources
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Link 
                href="https://github.com/rise-l2" 
                target="_blank"
                className="bg-surface-800 border border-surface-600 rounded-xl p-6 hover:border-surface-500 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-gray-500/10 p-3 rounded-xl">
                    <Code className="w-6 h-6 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors">
                      GitHub Repository
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Explore our open-source code and contribute
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors ml-auto" />
                </div>
              </Link>
              
              <Link 
                href="https://discord.gg/rise" 
                target="_blank"
                className="bg-surface-800 border border-surface-600 rounded-xl p-6 hover:border-surface-500 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-purple-500/10 p-3 rounded-xl">
                    <Book className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors">
                      Community Support
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Join our Discord for help and discussions
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors ml-auto" />
                </div>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}