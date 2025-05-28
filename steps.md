# Step 1 Install Required Dependencies
bash# UI and styling
npm install lucide-react clsx class-variance-authority
npm install @radix-ui/react-accordion @radix-ui/react-tabs @radix-ui/react-dialog

# Code highlighting and markdown
npm install prismjs react-syntax-highlighter
npm install @types/react-syntax-highlighter

# WebSocket and API integration
npm install ws @types/ws

# Animation and interactions
npm install framer-motion

# Additional utilities
npm install react-copy-to-clipboard @types/react-copy-to-clipboard
1.3 Update package.json scripts
json{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  }
}
Step 2: Core Project Structure
Create the following file structure:
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── shred-api/
│   │   ├── page.tsx
│   │   ├── explainer/page.tsx
│   │   ├── api-docs/page.tsx
│   │   ├── code-examples/page.tsx
│   │   └── data/page.tsx
│   ├── fast-vrf/
│   │   ├── page.tsx
│   │   ├── explainer/page.tsx
│   │   ├── api-docs/page.tsx
│   │   └── code-examples/page.tsx
│   └── time-oracle/
│       ├── page.tsx
│       ├── explainer/page.tsx
│       ├── api-docs/page.tsx
│       └── code-examples/page.tsx
├── components/
│   ├── ui/
│   │   ├── CodeBlock.tsx
│   │   ├── ApiDemo.tsx
│   │   ├── CopyButton.tsx
│   │   └── Tabs.tsx
│   ├── layout/
│   │   ├── TopNavigation.tsx
│   │   ├── SideNavigation.tsx
│   │   └── PageLayout.tsx
│   └── sections/
│       ├── HeroSection.tsx
│       ├── FeatureGrid.tsx
│       └── ApiReference.tsx
├── lib/
│   ├── utils.ts
│   ├── api.ts
│   └── websocket.ts
├── types/
│   └── index.ts
└── data/
    ├── navigation.ts
    └── api-examples.ts
Step 3: Essential Configuration Files
3.1 Update Tailwind Config (tailwind.config.js)
javascript/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'rise-primary': '#6366f1',
        'rise-secondary': '#8b5cf6',
        'rise-accent': '#06b6d4',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
3.2 Global Styles (src/app/globals.css)
css@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --rise-primary: 99 102 241;
    --rise-secondary: 139 92 246;
    --rise-accent: 6 182 212;
  }
}

@layer components {
  .code-block {
    @apply bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto;
  }
  
  .nav-link {
    @apply text-slate-600 hover:text-rise-primary transition-colors duration-200;
  }
  
  .nav-link-active {
    @apply text-rise-primary font-medium;
  }
}
Step 4: Core Component Templates
4.1 Navigation Data (src/data/navigation.ts)
typescriptexport interface NavItem {
  title: string;
  href: string;
  children?: NavItem[];
}

export const topNavigation: NavItem[] = [
  { title: 'Shred API', href: '/shred-api' },
  { title: 'Fast VRF', href: '/fast-vrf' },
  { title: 'Time Oracle', href: '/time-oracle' },
];

export const sideNavigation: Record<string, NavItem[]> = {
  'shred-api': [
    { title: 'Explainer', href: '/shred-api/explainer' },
    { 
      title: 'API Docs', 
      href: '/shred-api/api-docs',
      children: [
        { title: 'Getting Started', href: '/shred-api/api-docs#getting-started' },
        { title: 'Endpoints', href: '/shred-api/api-docs#endpoints' },
        { title: 'Authentication', href: '/shred-api/api-docs#authentication' },
      ]
    },
    { title: 'Code Examples', href: '/shred-api/code-examples' },
    { title: 'Data', href: '/shred-api/data' },
  ],
  'fast-vrf': [
    { title: 'Explainer', href: '/fast-vrf/explainer' },
    { title: 'API Docs', href: '/fast-vrf/api-docs' },
    { title: 'Code Examples', href: '/fast-vrf/code-examples' },
  ],
  'time-oracle': [
    { title: 'Explainer', href: '/time-oracle/explainer' },
    { title: 'API Docs', href: '/time-oracle/api-docs' },
    { title: 'Code Examples', href: '/time-oracle/code-examples' },
  ],
};
4.2 Reusable CodeBlock Component (src/components/ui/CodeBlock.tsx)
typescript'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
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
    <div className="relative bg-slate-900 rounded-lg overflow-hidden">
      {title && (
        <div className="flex justify-between items-center px-4 py-2 bg-slate-800 border-b border-slate-700">
          <span className="text-slate-300 text-sm font-medium">{title}</span>
          <CopyToClipboard text={code} onCopy={handleCopy}>
            <button className="flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors">
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span className="text-xs">{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </CopyToClipboard>
        </div>
      )}
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        showLineNumbers={showLineNumbers}
        customStyle={{
          margin: 0,
          padding: '1rem',
          background: 'transparent',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
4.3 Interactive API Demo Component (src/components/ui/ApiDemo.tsx)
typescript'use client';

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
4.4 Main Layout Component (src/components/layout/PageLayout.tsx)
typescript'use client';

import { ReactNode } from 'react';
import TopNavigation from './TopNavigation';
import SideNavigation from './SideNavigation';

interface PageLayoutProps {
  children: ReactNode;
  currentSection?: string;
}

export default function PageLayout({ children, currentSection }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <TopNavigation />
      <div className="flex">
        <SideNavigation currentSection={currentSection} />
        <main className="flex-1 ml-64 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
Step 5: Page Templates
5.1 Documentation Page Template (src/components/templates/DocPage.tsx)
typescriptimport { ReactNode } from 'react';
import PageLayout from '../layout/PageLayout';

interface DocPageProps {
  title: string;
  description: string;
  children: ReactNode;
  currentSection?: string;
}

export default function DocPage({ 
  title, 
  description, 
  children, 
  currentSection 
}: DocPageProps) {
  return (
    <PageLayout currentSection={currentSection}>
      <div className="max-w-4xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">{title}</h1>
          <p className="text-xl text-slate-600">{description}</p>
        </header>
        <div className="prose prose-slate max-w-none">
          {children}
        </div>
      </div>
    </PageLayout>
  );
}
5.2 API Reference Template (src/components/templates/ApiRefPage.tsx)
typescriptimport { ReactNode } from 'react';
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
            <TabsList className="grid w-full grid-cols-3">
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
Step 6: Utility Functions
6.1 WebSocket Utility (src/lib/websocket.ts)
typescriptexport class WebSocketDemo {
  private ws: WebSocket | null = null;
  private timeout: NodeJS.Timeout | null = null;

  async connect(address: string): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket('wss://your-rise-api-endpoint');
        
        this.ws.onopen = () => {
          this.ws?.send(JSON.stringify({ address }));
        };

        this.ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          resolve(data);
          this.disconnect();
        };

        this.ws.onerror = (error) => {
          reject(new Error('WebSocket connection failed'));
        };

        // Auto-disconnect after 10 seconds
        this.timeout = setTimeout(() => {
          this.disconnect();
          reject(new Error('Connection timeout'));
        }, 10000);

      } catch (error) {
        reject(error);
      }
    });
  }

  private disconnect() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}
6.2 API Examples Data (src/data/api-examples.ts)
typescriptexport const shredApiExamples = {
  getShredData: `
// Get real-time shred data
const ws = new WebSocket('wss://rise-api.com/shreds');
ws.onmessage = (event) => {
  const shredData = JSON.parse(event.data);
  console.log('New shred:', shredData);
};
  `,
  
  subscribeToAddress: `
// Subscribe to address updates
const subscription = {
  type: 'subscribe',
  address: '0x1234...5678',
  events: ['transfer', 'approval']
};
ws.send(JSON.stringify(subscription));
  `
};

export const vrfExamples = {
  requestRandomness: `
// Request verifiable randomness
const vrfRequest = {
  seed: Date.now(),
  callback: '0xYourContract',
  gas_limit: 100000
};

const response = await fetch('/api/vrf/request', {
  method: 'POST',
  body: JSON.stringify(vrfRequest)
});
  `
};
Step 7: Initial Pages
7.1 Home Page (src/app/page.tsx)
typescriptimport Link from 'next/link';
import PageLayout from '@/components/layout/PageLayout';

export default function HomePage() {
  return (
    <PageLayout>
      <div className="max-w-4xl">
        <div className="text-center py-16">
          <h1 className="text-6xl font-bold text-slate-900 mb-6">
            RISE <span className="text-rise-primary">Dev Toolkit</span>
          </h1>
          <p className="text-2xl text-slate-600 mb-12">
            Build the next generation of blockchain applications on RISE - 
            the fastest Layer 2 with 10ms latency and 100k+ TPS.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <Link href="/shred-api" className="group p-8 border border-slate-200 rounded-lg hover:border-rise-primary transition-colors">
              <h2 className="text-2xl font-semibold mb-4 group-hover:text-rise-primary">Shred API</h2>
              <p className="text-slate-600">Real-time blockchain data streaming with microsecond latency</p>
            </Link>
            
            <Link href="/fast-vrf" className="group p-8 border border-slate-200 rounded-lg hover:border-rise-primary transition-colors">
              <h2 className="text-2xl font-semibold mb-4 group-hover:text-rise-primary">Fast VRF</h2>
              <p className="text-slate-600">Ultra-fast verifiable random functions for gaming and DeFi</p>
            </Link>
            
            <Link href="/time-oracle" className="group p-8 border border-slate-200 rounded-lg hover:border-rise-primary transition-colors">
              <h2 className="text-2xl font-semibold mb-4 group-hover:text-rise-primary">Time Oracle</h2>
              <p className="text-slate-600">Precise timestamping for time-sensitive applications</p>
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
7.2 Example Section Page (src/app/shred-api/explainer/page.tsx)
typescriptimport DocPage from '@/components/templates/DocPage';
import CodeBlock from '@/components/ui/CodeBlock';

export default function ShredApiExplainer() {
  return (
    <DocPage
      title="Shred API Explainer"
      description="Understanding RISE's revolutionary Shred API for real-time blockchain data"
      currentSection="shred-api"
    >
      <section className="space-y-8">
        <div>
          <h2 className="text-3xl font-semibold mb-4">What are Shreds?</h2>
          <p className="text-lg text-slate-700 mb-6">
            Shreds are RISE's innovation for instant blockchain confirmations. Instead of waiting 
            for full block confirmations, transactions are processed and confirmed in microseconds 
            through our parallel processing architecture.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-4">Key Benefits</h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li>10ms average confirmation time</li>
            <li>Real-time data streaming</li>
            <li>100,000+ TPS capacity</li>
            <li>Ethereum-compatible</li>
          </ul>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-4">Quick Example</h2>
          <CodeBlock
            title="Connect to Shred Stream"
            language="javascript"
            code={`const ws = new WebSocket('wss://shred-api.rise.com');
ws.onmessage = (event) => {
  const shred = JSON.parse(event.data);
  console.log('New transaction confirmed:', shred);
};`}
          />
        </div>
      </section>
    </DocPage>
  );
}
Step 8: Getting Started Commands

Initialize the project:
bashnpx create-next-app@latest rise-dev-toolkit --typescript --tailwind --eslint --app --src-dir
cd rise-dev-toolkit

Install all dependencies:
bashnpm install lucide-react clsx class-variance-authority @radix-ui/react-accordion @radix-ui/react-tabs @radix-ui/react-dialog prismjs react-syntax-highlighter @types/react-syntax-highlighter ws @types/ws framer-motion react-copy-to-clipboard @types/react-copy-to-clipboard

Create the file structure as outlined in Step 2
Run the development server:
bashnpm run dev

Start building your content using the templates and components provided

This setup gives you a solid foundation with reusable components, proper TypeScript types, and a structure that scales well as you add more documentation sections and API examples.

## Implementation Progress Notes (May 28, 2025)

### Completed Tasks:

1. **Set up core dependencies**
   - Installed UI and styling packages (lucide-react, clsx, class-variance-authority)
   - Installed Radix UI components (accordion, tabs, dialog)
   - Installed code highlighting tools (prismjs, react-syntax-highlighter)
   - Installed utility packages (tailwind-merge)

2. **Created core UI components**
   - Updated globals.css with Rise Dev Toolkit styling and Tailwind classes
   - Implemented CodeBlock.tsx component for syntax highlighting
   - Implemented CopyButton.tsx for clipboard functionality
   - Implemented Tabs.tsx component with Radix UI

3. **Created data structure**
   - Set up navigation.ts with top and side navigation structure
   - Created api-examples.ts with code examples for each API

4. **Set up utilities**
   - Implemented utils.ts with cn() utility for class merging

### Next Steps:

1. Create layout components (TopNavigation, SideNavigation, PageLayout)
2. Implement page templates (DocPage, ApiRefPage)
3. Create core API demo components
4. Set up page routing structure
5. Implement individual product pages (Shred API, Fast VRF, Time Oracle)