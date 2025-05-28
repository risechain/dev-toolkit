'use client';

import { ReactNode } from 'react';
import TopNavigation from './TopNavigation';
import SideNavigation from './SideNavigation';

interface PageLayoutProps {
  children: ReactNode;
  currentSection?: string;
}

export default function PageLayout({ children, currentSection }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-black">
      <TopNavigation />
      <div className="flex">
        {currentSection && <SideNavigation currentSection={currentSection} />}
        <main className={`flex-1 ${currentSection ? 'ml-64' : ''} pt-16 min-h-screen`}>
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
