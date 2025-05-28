import { ReactNode } from 'react';
import PageLayout from '../layout/PageLayout';

interface DocPageProps {
  title: string;
  description: string;
  children: ReactNode;
  currentSection?: string;
}

export default function DocPage({ 
  title, 
  description, 
  children, 
  currentSection 
}: DocPageProps) {
  return (
    <PageLayout currentSection={currentSection}>
      <div className="max-w-4xl">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">{title}</h1>
          <p className="text-xl text-zinc-400">{description}</p>
        </header>
        <div className="prose prose-invert prose-zinc max-w-none
          prose-headings:text-zinc-100 
          prose-p:text-zinc-300 
          prose-a:text-blue-400 
          prose-a:no-underline 
          prose-a:hover:text-blue-300
          prose-strong:text-zinc-100
          prose-code:text-blue-400
          prose-code:bg-zinc-800
          prose-code:px-1.5
          prose-code:py-0.5
          prose-code:rounded
          prose-code:before:content-none
          prose-code:after:content-none
          prose-pre:bg-transparent
          prose-pre:p-0
          prose-li:text-zinc-300
          prose-ul:text-zinc-300
          prose-ol:text-zinc-300">
          {children}
        </div>
      </div>
    </PageLayout>
  );
}
