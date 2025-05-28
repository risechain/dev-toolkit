'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

interface CopyButtonProps {
  text: string;
  className?: string;
}

export default function CopyButton({ text, className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <CopyToClipboard text={text} onCopy={handleCopy}>
      <button 
        className={`flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors ${className}`}
        aria-label={copied ? 'Copied' : 'Copy to clipboard'}
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
        <span className="text-xs">{copied ? 'Copied!' : 'Copy'}</span>
      </button>
    </CopyToClipboard>
  );
}
