'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, Terminal } from 'lucide-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { motion, AnimatePresence } from 'framer-motion';

interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
  showLineNumbers?: boolean;
}

export default function CodeBlock({ 
  code, 
  language, 
  title, 
  showLineNumbers = false 
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      className="relative group my-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-neon/5 rounded-xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="relative bg-surface-800 rounded-xl overflow-hidden border border-surface-600 group-hover:border-surface-500 transition-colors duration-300">
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 bg-surface-700/50 border-b border-surface-600">
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-gray-500" />
            <span className="text-gray-400 text-sm font-mono">
              {title || language}
            </span>
          </div>
          
          <CopyToClipboard text={code} onCopy={handleCopy}>
            <button className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-surface-800 hover:bg-surface-700 text-gray-400 hover:text-gray-200 transition-all duration-200 text-sm">
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex items-center gap-1.5"
                  >
                    <Check size={14} className="text-green-400" />
                    <span className="text-green-400">Copied!</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex items-center gap-1.5"
                  >
                    <Copy size={14} />
                    <span>Copy</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </CopyToClipboard>
        </div>

        {/* Code content */}
        <div className="relative">
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            showLineNumbers={showLineNumbers}
            customStyle={{
              margin: 0,
              padding: '1.5rem',
              background: 'transparent',
              fontSize: '0.875rem',
              lineHeight: '1.7',
            }}
            codeTagProps={{
              style: {
                fontFamily: '"Inter Tight", "JetBrains Mono", "Menlo", monospace',
                letterSpacing: '-0.02em',
              }
            }}
            lineNumberStyle={{
              minWidth: '2.5em',
              paddingRight: '1em',
              color: '#4a5568',
              userSelect: 'none',
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
    </motion.div>
  );
}