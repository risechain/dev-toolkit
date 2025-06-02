'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { topNavigation } from '@/data/navigation';
import { Menu, X } from 'lucide-react';

export default function TopNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-surface-950/90 backdrop-blur-lg border-b border-surface-600">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-3 group">
            <Image 
              src="/RISE_Light.png" 
              alt="RISE Logo" 
              width={56} 
              height={56}
              className="object-contain group-hover:scale-105 transition-transform duration-200"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-400 leading-tight">
                Builder Toolkit
              </span>
            </div>
          </Link>
          
          {/* Center navigation - API links */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {topNavigation.slice(0, 3).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex items-center px-1 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-primary'
                    : 'text-surface-400 hover:text-white'
                }`}
              >
                {item.title}
              </Link>
            ))}
          </nav>
          
          {/* Right side - Resources and GitHub */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/resources"
              className={`text-sm font-medium transition-colors ${
                isActive('/resources')
                  ? 'text-primary'
                  : 'text-surface-400 hover:text-white'
              }`}
            >
              Resources
            </Link>
            <a
              href="https://github.com/risechain"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-surface-500 hover:text-slate-200 transition-colors"
            >
              <svg 
                className="w-5 h-5"
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-surface-500 hover:text-slate-200 hover:bg-surface-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-surface-900 border-t border-surface-600">
          <div className="pt-2 pb-3 space-y-1">
            {topNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-primary/10 border-primary text-primary'
                    : 'border-transparent text-surface-500 hover:bg-surface-800 hover:border-surface-600 hover:text-slate-200'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}
            <a
              href="https://github.com/risechain"
              target="_blank"
              rel="noopener noreferrer"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-surface-500 hover:bg-surface-800 hover:border-surface-600 hover:text-slate-200"
              onClick={() => setIsMenuOpen(false)}
            >
              GitHub
            </a>
          </div>
        </div>
      )}
    </header>
  );
}