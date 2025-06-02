'use client';

import PageLayout from '@/components/layout/PageLayout';
import { motion } from 'framer-motion';
import { ExternalLink, Globe, Book, Droplets, Activity } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function ResourcesPage() {
  return (
    <PageLayout currentSection="">
      <div className="max-w-7xl mx-auto px-6">
        <section className="py-16 lg:py-24">
          <motion.div 
            className="space-y-8 max-w-4xl mx-auto"
            initial="initial"
            animate="animate"
            variants={stagger}
          >
            <motion.div className="text-center mb-12" variants={fadeInUp}>
              <h1 className="text-5xl lg:text-6xl font-display font-black bg-gradient-to-br from-primary to-neon bg-clip-text text-transparent mb-4">
                Resources
              </h1>
              <p className="text-xl text-gray-300">
                Everything you need to build on RISE
              </p>
            </motion.div>

            {/* Documentation */}
            <motion.div variants={fadeInUp} className="mb-12">
              <h2 className="text-3xl font-display font-bold text-white mb-6">Documentation</h2>
              <div className="bg-surface-800 border border-surface-600 rounded-xl p-6 hover:border-primary/50 transition-colors">
                <a 
                  href="https://docs.risechain.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Book className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors">
                        Official Documentation
                      </h3>
                      <p className="text-gray-400">Complete guides, API references, and tutorials</p>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                </a>
              </div>
            </motion.div>

            {/* Network Configuration */}
            <motion.div variants={fadeInUp} className="mb-12">
              <h2 className="text-3xl font-display font-bold text-white mb-6">Network Configuration</h2>
              <div className="bg-surface-800 border border-surface-600 rounded-xl p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <tbody className="divide-y divide-surface-600">
                      <tr>
                        <td className="py-3 text-gray-400 font-medium">Network Name</td>
                        <td className="py-3 text-white font-mono">RISE Testnet</td>
                      </tr>
                      <tr>
                        <td className="py-3 text-gray-400 font-medium">Chain ID</td>
                        <td className="py-3 text-white font-mono">11155931</td>
                      </tr>
                      <tr>
                        <td className="py-3 text-gray-400 font-medium">Currency Symbol</td>
                        <td className="py-3 text-white font-mono">ETH</td>
                      </tr>
                      <tr>
                        <td className="py-3 text-gray-400 font-medium">Block Explorer URL</td>
                        <td className="py-3">
                          <a 
                            href="https://explorer.testnet.riselabs.xyz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80 font-mono text-sm break-all"
                          >
                            https://explorer.testnet.riselabs.xyz
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>

            {/* RPC Endpoints */}
            <motion.div variants={fadeInUp} className="mb-12">
              <h2 className="text-3xl font-display font-bold text-white mb-6">RPC Endpoints</h2>
              <div className="bg-surface-800 border border-surface-600 rounded-xl p-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">HTTPS RPC URL</p>
                    <code className="text-primary font-mono">https://testnet.riselabs.xyz</code>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">WebSocket URL</p>
                    <code className="text-primary font-mono">wss://testnet.riselabs.xyz/ws</code>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Useful Links */}
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl font-display font-bold text-white mb-6">Useful Links</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <a 
                  href="https://explorer.testnet.riselabs.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-surface-800 border border-surface-600 rounded-xl p-6 hover:border-primary/50 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-cyan-400/10 rounded-lg flex items-center justify-center">
                      <Globe className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors">
                        Explorer
                      </h3>
                      <p className="text-gray-400 text-sm">View transactions and blocks</p>
                    </div>
                  </div>
                </a>

                <a 
                  href="https://status.testnet.risechain.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-surface-800 border border-surface-600 rounded-xl p-6 hover:border-primary/50 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-400/10 rounded-lg flex items-center justify-center">
                      <Activity className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors">
                        Network Status
                      </h3>
                      <p className="text-gray-400 text-sm">Monitor network health</p>
                    </div>
                  </div>
                </a>

                <a 
                  href="https://faucet.risechain.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-surface-800 border border-surface-600 rounded-xl p-6 hover:border-primary/50 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-400/10 rounded-lg flex items-center justify-center">
                      <Droplets className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors">
                        Faucet
                      </h3>
                      <p className="text-gray-400 text-sm">Get testnet ETH</p>
                    </div>
                  </div>
                </a>

                <a 
                  href="https://portal.testnet.risechain.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-surface-800 border border-surface-600 rounded-xl p-6 hover:border-primary/50 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-400/10 rounded-lg flex items-center justify-center">
                      <ExternalLink className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors">
                        Testnet Portal
                      </h3>
                      <p className="text-gray-400 text-sm">Access testnet tools</p>
                    </div>
                  </div>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </PageLayout>
  );
}