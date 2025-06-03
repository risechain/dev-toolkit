'use client';

import { useState, useEffect } from 'react';
import PageLayout from '../layout/PageLayout';
import CodeBlock from '../ui/CodeBlock';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/Tabs';

interface CodeExample {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
}

interface CodeExamplesTemplateProps {
  title: string;
  description: string;
  currentSection: string;
  examples: CodeExample[];
}

export default function CodeExamplesTemplate({ 
  title, 
  description, 
  currentSection, 
  examples 
}: CodeExamplesTemplateProps) {
  const [selectedExample, setSelectedExample] = useState(0);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        const index = examples.findIndex(ex => ex.id === hash);
        if (index !== -1) {
          setSelectedExample(index);
        }
      }
    };

    // Check initial hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [examples]);

  return (
    <PageLayout currentSection={currentSection}>
      <div className="max-w-5xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 gradient-text">{title}</h1>
          <p className="text-xl text-gray-400">{description}</p>
        </div>

        <div className="space-y-8">
          <Tabs 
            value={selectedExample.toString()} 
            onValueChange={(value) => {
              const index = parseInt(value);
              setSelectedExample(index);
              // Update URL hash
              window.history.pushState(null, '', `#${examples[index].id}`);
            }}
          >
            <TabsList className="bg-gray-800 border border-gray-700">
              {examples.map((example, index) => (
                <TabsTrigger 
                  key={index} 
                  value={index.toString()}
                  className="data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-400"
                >
                  {example.title}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {examples.map((example, index) => (
              <TabsContent key={index} value={index.toString()} className="space-y-4">
                <div id={example.id}>
                  <h3 className="text-2xl font-semibold mb-2">{example.title}</h3>
                  <p className="text-gray-400">{example.description}</p>
                </div>
                
                <CodeBlock
                  language={example.language}
                  code={example.code}
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
}