'use client';

import { ReactNode } from 'react';
import PageLayout from '../layout/PageLayout';
import { motion } from 'framer-motion';

interface SectionLandingPageProps {
  title: string;
  description: string;
  currentSection: string;
  heroContent?: ReactNode;
  customContent?: ReactNode;
}

// Animation variants
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

const heroVariants = {
  hidden: { y: 30, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

export default function SectionLandingPage({ 
  title, 
  description, 
  currentSection, 
  heroContent,
  customContent 
}: SectionLandingPageProps) {
  return (
    <PageLayout currentSection={currentSection}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section - Full Width */}
        <motion.section 
          className="py-16 lg:py-24"
          initial="hidden"
          animate="show"
          variants={containerVariants}
        >
          {/* Main Content */}
          <motion.div className="space-y-8 max-w-4xl mx-auto text-center" variants={heroVariants}>
            <div className="relative">
              {/* Background glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-neon/10 to-transparent blur-xl opacity-70" />
              
              <div className="relative">
                <h1 className="text-6xl lg:text-7xl font-display font-black bg-gradient-to-br from-primary to-neon bg-clip-text text-transparent leading-tight">
                  {title}
                </h1>
                <p className="text-xl lg:text-2xl text-gray-300 mt-6 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
            
            {heroContent && (
              <motion.div 
                className="relative z-10"
                variants={itemVariants}
              >
                {heroContent}
              </motion.div>
            )}
          </motion.div>
        </motion.section>

        {/* Custom Content Section */}
        {customContent && (
          <motion.section 
            className="py-16 border-t border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {customContent}
          </motion.section>
        )}
      </div>
    </PageLayout>
  );
}