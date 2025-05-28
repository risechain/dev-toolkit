'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

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
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative bg-zinc-900/80 backdrop-blur-sm rounded-xl overflow-hidden border border-zinc-800">
        {title && (
          <div className="flex justify-between items-center px-4 py-3 bg-zinc-900/50 border-b border-zinc-800">
            <span className="text-zinc-400 text-sm font-mono">{title}</span>
            <CopyToClipboard text={code} onCopy={handleCopy}>
              <button className="flex items-center gap-1 text-zinc-400 hover:text-zinc-100 transition-colors">
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span className="text-xs">{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </CopyToClipboard>
          </div>
        )}
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
              fontFamily: '"JetBrains Mono", "Menlo", "Monaco", monospace',
            }
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
