'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Get all headings
    const elements = document.querySelectorAll('.doc-content h2, .doc-content h3');
    const items: TOCItem[] = Array.from(elements).map((elem) => ({
      id: elem.id || elem.textContent?.toLowerCase().replace(/\s+/g, '-') || '',
      text: elem.textContent || '',
      level: parseInt(elem.tagName[1])
    }));
    setHeadings(items);

    // Set IDs if they don't exist
    elements.forEach((elem, index) => {
      if (!elem.id) {
        elem.id = items[index].id;
      }
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -70% 0px' }
    );

    const elements = document.querySelectorAll('.doc-content h2, .doc-content h3');
    elements.forEach((elem) => observer.observe(elem));

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="sticky top-24 hidden xl:block w-64 ml-8"
    >
      <div className="bg-surface-800 border border-surface-600 rounded-xl p-6">
        <h4 className="text-sm font-semibold text-gray-200 mb-4 uppercase tracking-wider">
          On this page
        </h4>
        <ul className="space-y-2">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(heading.id)?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
                className={cn(
                  'block text-sm transition-colors duration-200',
                  heading.level === 3 && 'ml-4',
                  activeId === heading.id
                    ? 'text-primary font-medium'
                    : 'text-gray-400 hover:text-gray-200'
                )}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
}