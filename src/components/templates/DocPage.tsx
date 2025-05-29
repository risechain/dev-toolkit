'use client';

import { ReactNode } from 'react';
import PageLayout from '../layout/PageLayout';
import { motion } from 'framer-motion';

interface DocPageProps {
  title: string;
  description: string;
  children: ReactNode;
  currentSection?: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function DocPage({ 
  title, 
  description, 
  children, 
  currentSection 
}: DocPageProps) {
  return (
    <PageLayout currentSection={currentSection}>
      <motion.div 
        className="max-w-4xl"
        initial="initial"
        animate="animate"
      >
        <motion.header 
          className="mb-12 pb-8 border-b border-surface-600"
          {...fadeInUp}
        >
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-display font-bold gradient-text">
              {title}
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              {description}
            </p>
          </div>
        </motion.header>
        
        <motion.div 
          className="doc-content"
          {...fadeInUp}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className="prose prose-invert prose-gray max-w-none
            prose-headings:font-display
            prose-headings:text-gray-100 
            prose-headings:scroll-mt-20
            prose-h2:text-3xl
            prose-h2:font-bold
            prose-h2:mb-4
            prose-h2:mt-12
            prose-h3:text-xl
            prose-h3:font-semibold
            prose-h3:mb-3
            prose-h3:mt-8
            prose-p:text-gray-300 
            prose-p:leading-relaxed
            prose-a:text-primary
            prose-a:no-underline 
            prose-a:font-medium
            prose-a:hover:text-primary/80
            prose-a:transition-colors
            prose-strong:text-gray-100
            prose-strong:font-semibold
            prose-code:text-blue-400
            prose-code:bg-surface-700
            prose-code:border
            prose-code:border-surface-600
            prose-code:px-1.5
            prose-code:py-0.5
            prose-code:rounded-md
            prose-code:font-mono
            prose-code:text-sm
            prose-code:before:content-none
            prose-code:after:content-none
            prose-pre:bg-transparent
            prose-pre:p-0
            prose-li:text-gray-300
            prose-ul:text-gray-300
            prose-ol:text-gray-300
            prose-blockquote:border-l-primary
            prose-blockquote:bg-surface-800
            prose-blockquote:px-6
            prose-blockquote:py-4
            prose-blockquote:rounded-r-xl
            prose-blockquote:italic
            prose-hr:border-surface-600">
            {children}
          </div>
        </motion.div>
      </motion.div>
    </PageLayout>
  );
}