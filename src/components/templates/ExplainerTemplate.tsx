'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface Section {
  title: string;
  content: string;
}

interface ExplainerTemplateProps {
  title: string;
  subtitle: string;
  sections: Section[];
}

export default function ExplainerTemplate({ title, subtitle, sections }: ExplainerTemplateProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Back button */}
        <Link 
          href=".."
          className="inline-flex items-center text-sm text-zinc-400 hover:text-zinc-100 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>
        
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl font-bold mb-4 gradient-text">{title}</h1>
          <p className="text-xl text-zinc-400">{subtitle}</p>
        </div>
        
        {/* Content sections */}
        <div className="space-y-12">
          {sections.map((section, index) => (
            <div key={index} className="gradient-border">
              <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
              <p className="text-zinc-300 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
