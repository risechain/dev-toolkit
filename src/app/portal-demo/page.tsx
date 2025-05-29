'use client';

import PageLayout from '@/components/layout/PageLayout';
import PortalInput from '@/components/ui/PortalInput';
import PortalButton from '@/components/ui/PortalButton';
import { Wallet, Search, Download, Check } from 'lucide-react';

export default function PortalDemoPage() {
  return (
    <PageLayout currentSection="demo">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-display font-bold gradient-text">
            Portal-Style Components
          </h1>
          <p className="text-xl text-slate-400">
            Inspired by the RISE Testnet Portal design
          </p>
        </div>

        {/* Input Examples */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-200">Input Components</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <PortalInput
              label="Wallet Address"
              placeholder="Enter wallet address"
              icon={<Wallet className="w-4 h-4" />}
            />
            
            <PortalInput
              label="Search"
              placeholder="Search transactions..."
              icon={<Search className="w-4 h-4" />}
            />
            
            <PortalInput
              label="With Success State"
              placeholder="0x1234..."
              value="0x1234567890abcdef..."
              success="Valid address format"
              icon={<Wallet className="w-4 h-4" />}
            />
            
            <PortalInput
              label="With Error State"
              placeholder="Enter amount"
              value="invalid"
              error="Please enter a valid amount"
            />
          </div>
        </section>

        {/* Button Examples */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-200">Button Components</h2>
          
          <div className="flex flex-wrap gap-4">
            <PortalButton>
              Default Button
            </PortalButton>
            
            <PortalButton variant="primary">
              Primary Button
            </PortalButton>
            
            <PortalButton variant="success" icon={<Check />}>
              Success
            </PortalButton>
            
            <PortalButton variant="primary" icon={<Download />}>
              Download
            </PortalButton>
            
            <PortalButton size="sm">
              Small
            </PortalButton>
            
            <PortalButton size="lg" variant="primary">
              Large Button
            </PortalButton>
          </div>
        </section>

        {/* Card Examples */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-200">Card Components</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card-glass rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-semibold text-slate-200">Get Tokens</h3>
              <PortalInput
                label="Enter Wallet Address"
                placeholder="0x..."
                icon={<Wallet className="w-4 h-4" />}
              />
              <PortalButton variant="success" className="w-full">
                Request Tokens
              </PortalButton>
            </div>
            
            <div className="card-glass rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-semibold text-slate-200">Search Transactions</h3>
              <PortalInput
                label="Transaction Hash"
                placeholder="Enter transaction hash..."
                icon={<Search className="w-4 h-4" />}
              />
              <PortalButton variant="primary" className="w-full">
                Search
              </PortalButton>
            </div>
          </div>
        </section>

        {/* Color Palette */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-200">Color Palette</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="w-full h-16 bg-surface-950 rounded-lg border border-surface-600"></div>
              <p className="text-xs text-slate-400">Surface 950</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-16 bg-surface-900 rounded-lg border border-surface-600"></div>
              <p className="text-xs text-slate-400">Surface 900</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-16 bg-surface-800 rounded-lg border border-surface-600"></div>
              <p className="text-xs text-slate-400">Surface 800</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-16 bg-surface-700 rounded-lg border border-surface-600"></div>
              <p className="text-xs text-slate-400">Surface 700</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-16 bg-primary rounded-lg"></div>
              <p className="text-xs text-slate-400">Primary Blue</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-16 bg-success rounded-lg"></div>
              <p className="text-xs text-slate-400">Success Green</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-16 bg-neon rounded-lg"></div>
              <p className="text-xs text-slate-400">Neon Cyan</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-16 bg-red-500 rounded-lg"></div>
              <p className="text-xs text-slate-400">Error Red</p>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}