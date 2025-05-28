import { ReactNode } from 'react';
import PageLayout from '../layout/PageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs';

interface ApiRefPageProps {
  title: string;
  description: string;
  children: ReactNode;
  currentSection?: string;
  tabs?: Array<{ id: string; label: string; content: ReactNode }>;
}

export default function ApiRefPage({ 
  title, 
  description, 
  children, 
  currentSection,
  tabs 
}: ApiRefPageProps) {
  return (
    <PageLayout currentSection={currentSection}>
      <div className="max-w-6xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">{title}</h1>
          <p className="text-xl text-slate-600">{description}</p>
        </header>
        
        {tabs ? (
          <Tabs defaultValue={tabs[0]?.id} className="w-full">
            <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}>
              {tabs.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {tabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id} className="mt-6">
                {tab.content}
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <div className="prose prose-slate max-w-none">
            {children}
          </div>
        )}
      </div>
    </PageLayout>
  );
}
