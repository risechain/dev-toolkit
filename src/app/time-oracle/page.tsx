'use client';

import PageLayout from '@/components/layout/PageLayout';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

export default function TimeOraclePage() {
  return (
    <PageLayout currentSection="">
      <div className="max-w-7xl mx-auto px-6">
        <section className="py-16 lg:py-24">
          <motion.div 
            className="space-y-8 max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-neon/10 to-transparent blur-xl opacity-70" />
              
              <div className="relative">
                <h1 className="text-6xl lg:text-7xl font-display font-black bg-gradient-to-br from-primary to-neon bg-clip-text text-transparent leading-tight">
                  Time Oracle
                </h1>
                <p className="text-xl lg:text-2xl text-gray-300 mt-6 leading-relaxed">
                  Access highly precise blockchain timestamps with 200ms accuracy. Perfect for time-sensitive DeFi protocols and automated contract execution.
                </p>
              </div>
            </div>
            
            <div className="mt-16 p-12 bg-surface-800 border border-surface-600 rounded-2xl">
              <div className="flex flex-col items-center space-y-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-display font-bold text-white">Coming Soon</h2>
                <p className="text-lg text-gray-400 max-w-md text-center">
                  We&apos;re building the most accurate time oracle for blockchain applications. Stay tuned for updates!
                </p>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </PageLayout>
  );
}