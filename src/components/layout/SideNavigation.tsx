'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { sideNavigation, NavItem } from '@/data/navigation';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface SideNavigationProps {
  currentSection?: string;
}

export default function SideNavigation({ currentSection }: SideNavigationProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  // If no current section is provided, try to determine it from the pathname
  const section = currentSection || 
    (pathname && Object.keys(sideNavigation).find(key => pathname.startsWith(`/${key}`))) || 
    '';

  const navItems = section ? sideNavigation[section] || [] : [];

  const isActive = (href: string) => {
    return pathname === href || pathname?.startsWith(href) && href !== '/';
  };

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => ({ ...prev, [title]: !prev[title] }));
  };

  if (!section || navItems.length === 0) {
    return null;
  }

  const renderNavItem = (item: NavItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isItemActive = isActive(item.href);
    const isExpanded = expandedItems[item.title] || isItemActive;

    return (
      <li key={item.href} className={`${depth > 0 ? 'ml-4' : ''}`}>
        <div className="flex items-center">
          {hasChildren ? (
            <button
              onClick={() => toggleExpanded(item.title)}
              className={`group flex w-full items-center text-sm py-2 transition-colors ${
                isItemActive 
                  ? 'text-blue-400 font-medium' 
                  : 'text-zinc-400 hover:text-zinc-100'
              }`}
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 mr-1" />
              ) : (
                <ChevronRight className="w-4 h-4 mr-1" />
              )}
              {item.title}
            </button>
          ) : (
            <Link
              href={item.href}
              className={`group flex w-full items-center text-sm py-2 px-2 rounded-md transition-colors ${
                isItemActive 
                  ? 'text-blue-400 font-medium bg-blue-500/10' 
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800'
              }`}
            >
              {item.title}
            </Link>
          )}
        </div>

        {hasChildren && isExpanded && (
          <ul className="mt-1 space-y-1">
            {item.children?.map((child) => renderNavItem(child, depth + 1))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div className="hidden lg:block fixed top-16 w-64 h-[calc(100vh-4rem)] border-r border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
      <div className="h-14 border-b border-zinc-800 flex items-center px-6">
        <Link 
          href={`/${section}`}
          className="text-sm font-semibold text-zinc-300 uppercase tracking-wider hover:text-blue-400 transition-colors"
        >
          {section.replace('-', ' ')}
        </Link>
      </div>
      <nav className="py-6 px-4">
        <ul className="space-y-1">
          {navItems.map((item) => renderNavItem(item))}
        </ul>
      </nav>
    </div>
  );
}
