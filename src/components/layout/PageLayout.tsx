'use client';

import { ReactNode, useState } from 'react';
import TopNavigation from './TopNavigation';
import SideNavigation from './SideNavigation';
import { Menu, X } from 'lucide-react';
import { sideNavigation } from '@/data/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface PageLayoutProps {
  children: ReactNode;
  currentSection?: string;
}

export default function PageLayout({ children, currentSection }: PageLayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const pathname = usePathname();
  const navItems = currentSection ? sideNavigation[currentSection] || [] : [];

  const isActive = (href: string) => {
    return pathname === href || pathname?.startsWith(href + '/');
  };

  return (
    <div className="min-h-screen bg-black">
      <TopNavigation />
      <div className="flex">
        {currentSection && <SideNavigation currentSection={currentSection} />}
        <main className={`flex-1 ${currentSection ? 'lg:ml-64' : ''} pt-16 min-h-screen`}>
          {/* Mobile navigation toggle */}
          {currentSection && navItems.length > 0 && (
            <div className="lg:hidden sticky top-16 z-40 bg-surface-950 border-b border-surface-600 px-4 py-3">
              <button
                onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
                className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                <Menu className="w-5 h-5" />
                <span>{currentSection.replace('-', ' ')} Navigation</span>
              </button>
            </div>
          )}

          {/* Mobile sidebar overlay */}
          {isMobileSidebarOpen && (
            <div className="lg:hidden fixed inset-0 z-50 flex">
              <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileSidebarOpen(false)} />
              <div className="relative flex w-full max-w-xs flex-col bg-surface-900 border-r border-surface-600">
                <div className="flex items-center justify-between px-4 py-4 border-b border-surface-600">
                  <h2 className="text-lg font-semibold text-white">
                    {currentSection?.replace('-', ' ')}
                  </h2>
                  <button
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className="p-1 rounded hover:bg-surface-800 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
                <nav className="flex-1 overflow-y-auto px-4 py-4">
                  <ul className="space-y-2">
                    {navItems.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                            isActive(item.href)
                              ? 'bg-primary/10 text-primary'
                              : 'text-gray-300 hover:bg-surface-800 hover:text-white'
                          }`}
                          onClick={() => setIsMobileSidebarOpen(false)}
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          )}

          <div className="p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
