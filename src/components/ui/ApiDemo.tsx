'use client';

import { useState, useCallback } from 'react';
import CodeBlock from './CodeBlock';
import { Play, Square } from 'lucide-react';

interface ApiDemoProps {
  title: string;
  description: string;
  inputPlaceholder?: string;
  exampleCode: string;
  onExecute: (input: string) => Promise<any>;
}

export default function ApiDemo({ 
  title, 
  description, 
  inputPlaceholder = "Enter your address...",
  exampleCode,
  onExecute 
}: ApiDemoProps) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState('');

  const handleExecute = useCallback(async () => {
    if (!input.trim()) return;
    
    setIsRunning(true);
    setError('');
    setOutput('');
    
    try {
      const result = await onExecute(input);
      setOutput(JSON.stringify(result, null, 2));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsRunning(false);
    }
  }, [input, onExecute]);

  return (
    <div className="border border-slate-200 rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-slate-600 mb-4">{description}</p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Input
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={inputPlaceholder}
              className="flex-1 px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-rise-primary focus:border-transparent"
            />
            <button
              onClick={handleExecute}
              disabled={isRunning || !input.trim()}
              className="px-4 py-2 bg-rise-primary text-white rounded-md hover:bg-rise-primary/90 disabled:opacity-50 flex items-center gap-2"
            >
              {isRunning ? <Square size={16} /> : <Play size={16} />}
              {isRunning ? 'Running...' : 'Run'}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Example Code
          </label>
          <CodeBlock code={exampleCode} language="javascript" />
        </div>

        {output && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Output
            </label>
            <CodeBlock code={output} language="json" />
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
