import DocPage from '@/components/templates/DocPage';
import CodeBlock from '@/components/ui/CodeBlock';

export default function TypeScriptClientDocs() {
  return (
    <DocPage
      title="TypeScript Client Library"
      description="High-level TypeScript client for RISE's Shred API built on Viem"
      currentSection="shred-api"
    >
      <section id="overview" className="space-y-8">
        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zinc-100">TypeScript Client Overview</h2>
          <p className="text-lg text-zinc-300 mb-8 leading-relaxed">
            The official TypeScript client library provides a high-level, type-safe interface to the Shred API. 
            Built on top of Viem, it offers seamless integration with existing Ethereum development workflows 
            while adding powerful real-time capabilities.
          </p>
        </div>
      </section>

      <section id="installation" className="space-y-8">
        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zinc-100">Installation</h2>
          <p className="text-zinc-300 mb-4">
            Install the Shred API client library using your preferred package manager:
          </p>
          
          <CodeBlock
            language="bash"
            code={`# npm
npm install shred-api viem

# yarn
yarn add shred-api viem

# pnpm
pnpm add shred-api viem

# bun
bun add shred-api viem`}
            title="Package Installation"
          />

          <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20 mt-4">
            <p className="text-blue-200">
              <strong>Note:</strong> The client library requires Viem v2.31.0 or higher as a peer dependency.
            </p>
          </div>
        </div>
      </section>

      <section id="quick-start" className="space-y-8">
        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zinc-100">Quick Start</h2>
          <p className="text-zinc-300 mb-4">
            Get started with the TypeScript client in just a few lines of code:
          </p>
          
          <CodeBlock
            language="typescript"
            code={`import { createPublicShredClient, shredsWebSocket } from 'shred-api/viem'

// Create a Shred client
const client = createPublicShredClient({
  transport: shredsWebSocket('wss://testnet.riselabs.xyz/ws')
})

// Watch for new shreds
const unsubscribe = client.watchShreds({
  onShred: (shred) => {
    console.log('New shred received:', shred)
    // Handle the shred data
    processShred(shred)
  },
  onError: (error) => {
    console.error('Shred subscription error:', error)
  }
})

// Unsubscribe when done
// unsubscribe()`}
            title="Basic Usage"
          />

          <div>
            <h3 className="text-xl font-semibold mb-4 text-zinc-200">React Integration</h3>
            <p className="text-zinc-300 mb-4">
              Perfect integration with React applications using hooks:
            </p>
            
            <CodeBlock
              language="typescript"
              code={`import { useEffect, useState } from 'react'
import { createPublicShredClient, shredsWebSocket } from 'shred-api/viem'

function useShredClient() {
  const [client] = useState(() => 
    createPublicShredClient({
      transport: shredsWebSocket('wss://testnet.riselabs.xyz/ws')
    })
  )
  
  return client
}

function ShredMonitor() {
  const [shreds, setShreds] = useState([])
  const client = useShredClient()

  useEffect(() => {
    const unsubscribe = client.watchShreds({
      onShred: (shred) => {
        setShreds(prev => [shred, ...prev.slice(0, 9)]) // Keep last 10
      },
      onError: (error) => {
        console.error('Subscription error:', error)
      }
    })

    return unsubscribe
  }, [client])

  return (
    <div>
      <h2>Recent Shreds</h2>
      {shreds.map((shred, index) => (
        <div key={index} className="shred-item">
          Block: {shred.block_number}, Transactions: {shred.transactions.length}
        </div>
      ))}
    </div>
  )
}`}
              title="React Hook Example"
            />
          </div>
        </div>
      </section>

      <section id="contract-events" className="space-y-8">
        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zinc-100">Watching Contract Events</h2>
          <p className="text-zinc-300 mb-4">
            Monitor specific contract events with type-safe event handling:
          </p>
          
          <CodeBlock
            language="typescript"
            code={`import { createPublicShredClient, shredsWebSocket } from 'shred-api/viem'
import { parseAbiItem } from 'viem'

const client = createPublicShredClient({
  transport: shredsWebSocket('wss://testnet.riselabs.xyz/ws')
})

// Watch for Transfer events on an ERC20 token
const unsubscribe = client.watchContractShredEvent({
  address: '0x6257c5f110900a8E02A7A480b097D44F96360d16',
  event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
  onLogs: (logs) => {
    logs.forEach((log) => {
      console.log('Transfer detected:', {
        from: log.args.from,
        to: log.args.to,
        value: log.args.value,
        txHash: log.transactionHash
      })
      
      // Update UI immediately
      updateTransferUI(log.args)
    })
  },
  onError: (error) => {
    console.error('Event subscription error:', error)
  }
})`}
            title="Contract Event Monitoring"
          />

          <div>
            <h3 className="text-xl font-semibold mb-4 text-zinc-200">Advanced Event Filtering</h3>
            <p className="text-zinc-300 mb-4">
              Use advanced filtering to monitor multiple events and contracts:
            </p>
            
            <CodeBlock
              language="typescript"
              code={`import { createPublicShredClient, shredsWebSocket } from 'shred-api/viem'
import { parseAbiItem } from 'viem'

const client = createPublicShredClient({
  transport: shredsWebSocket('wss://testnet.riselabs.xyz/ws')
})

// Watch multiple event types across different contracts
const unsubscribe = client.watchShredEvent({
  address: [
    '0x6257c5f110900a8E02A7A480b097D44F96360d16', // Token contract
    '0x742d35Cc6634C0532925a3b844Bc9e7595f8c8C5'  // NFT contract
  ],
  events: [
    parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
    parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)'),
    parseAbiItem('event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)')
  ],
  onLogs: (logs) => {
    logs.forEach((log) => {
      switch (log.eventName) {
        case 'Transfer':
          if ('tokenId' in log.args) {
            // NFT Transfer
            console.log('NFT Transfer:', {
              from: log.args.from,
              to: log.args.to,
              tokenId: log.args.tokenId
            })
          } else {
            // ERC20 Transfer
            console.log('Token Transfer:', {
              from: log.args.from,
              to: log.args.to,
              value: log.args.value
            })
          }
          break
        case 'Approval':
          console.log('NFT Approval:', log.args)
          break
      }
    })
  },
  onError: (error) => {
    console.error('Multi-contract subscription error:', error)
  }
})`}
              title="Multi-Contract Event Monitoring"
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-zinc-200">Integration with Existing Viem Code</h3>
            <p className="text-zinc-300 mb-4">
              The Shred client extends standard Viem functionality, so you can use it alongside your existing Ethereum code:
            </p>
            
            <CodeBlock
              language="typescript"
              code={`import { createPublicShredClient, shredsWebSocket } from 'shred-api/viem'
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

// Regular Viem client for confirmed data
const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
})

// Shred client for real-time data
const shredClient = createPublicShredClient({
  transport: shredsWebSocket('wss://testnet.riselabs.xyz/ws')
})

// Use both clients together for optimistic + confirmed updates
async function handleTransaction(txHash: string) {
  // Set up real-time monitoring
  const unsubscribe = shredClient.watchShredEvent({
    onLogs: (logs) => {
      const relevantLog = logs.find(log => log.transactionHash === txHash)
      if (relevantLog) {
        console.log('Transaction detected in shred:', relevantLog)
        // Update UI optimistically
        updateUIOptimistically(relevantLog)
        unsubscribe() // Stop watching once we see our transaction
      }
    },
    onError: (error) => {
      console.error('Shred monitoring error:', error)
    }
  })

  // Also wait for confirmation using standard Viem
  try {
    const receipt = await publicClient.waitForTransactionReceipt({ 
      hash: txHash,
      timeout: 60_000 
    })
    console.log('Transaction confirmed:', receipt)
    // Update UI with confirmed data
    updateUIConfirmed(receipt)
  } catch (error) {
    console.error('Transaction confirmation failed:', error)
  }
}

// Example: Send transaction and monitor in real-time
async function sendTokenTransfer() {
  // Send transaction (using wallet client)
  const hash = await walletClient.writeContract({
    address: '0x6257c5f110900a8E02A7A480b097D44F96360d16',
    abi: erc20Abi,
    functionName: 'transfer',
    args: [recipientAddress, amount]
  })

  // Monitor the transaction
  await handleTransaction(hash)
}`}
              title="Hybrid Real-time and Confirmed Data"
            />
          </div>
        </div>
      </section>

      <section id="api-reference" className="space-y-8">
        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zinc-100">API Reference</h2>
          <p className="text-zinc-300 mb-4">
            Complete reference for all TypeScript client methods:
          </p>
          
          <div className="bg-zinc-900/50 rounded-lg overflow-hidden border border-zinc-800 mb-8">
            <table className="w-full">
              <thead className="bg-zinc-800/50">
                <tr>
                  <th className="text-left px-6 py-3 text-zinc-300">Method</th>
                  <th className="text-left px-6 py-3 text-zinc-300">Description</th>
                  <th className="text-left px-6 py-3 text-zinc-300">Returns</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                <tr>
                  <td className="px-6 py-4 font-mono text-blue-400">createPublicShredClient</td>
                  <td className="px-6 py-4 text-zinc-300">Create a new Shred client instance</td>
                  <td className="px-6 py-4 text-zinc-400">PublicShredClient</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-blue-400">watchShreds</td>
                  <td className="px-6 py-4 text-zinc-300">Watch for new shreds (full objects)</td>
                  <td className="px-6 py-4 text-zinc-400">Unsubscribe function</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-blue-400">watchContractShredEvent</td>
                  <td className="px-6 py-4 text-zinc-300">Watch for specific contract events</td>
                  <td className="px-6 py-4 text-zinc-400">Unsubscribe function</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-blue-400">watchShredEvent</td>
                  <td className="px-6 py-4 text-zinc-300">Watch for events with advanced filtering</td>
                  <td className="px-6 py-4 text-zinc-400">Unsubscribe function</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-blue-400">shredsWebSocket</td>
                  <td className="px-6 py-4 text-zinc-300">Create WebSocket transport for Shred API</td>
                  <td className="px-6 py-4 text-zinc-400">Transport instance</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-zinc-200">Method Details</h3>
            
            <div className="space-y-6">
              <div className="border-l-4 border-green-500 pl-6">
                <h4 className="text-lg font-semibold mb-2 text-zinc-100">createPublicShredClient</h4>
                <p className="text-zinc-300 mb-3">
                  Creates a new Shred client instance with the specified transport configuration.
                </p>
                
                <CodeBlock
                  language="typescript"
                  code={`import { createPublicShredClient, shredsWebSocket } from 'shred-api/viem'

const client = createPublicShredClient({
  transport: shredsWebSocket('wss://testnet.riselabs.xyz/ws', {
    // Optional configuration
    reconnect: {
      attempts: 5,
      delay: 1000
    },
    keepAlive: {
      interval: 30000
    }
  })
})`}
                  title="createPublicShredClient Usage"
                />
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h4 className="text-lg font-semibold mb-2 text-zinc-100">watchShreds</h4>
                <p className="text-zinc-300 mb-3">
                  Subscribe to receive full shred objects containing all transactions and state changes.
                </p>
                
                <CodeBlock
                  language="typescript"
                  code={`const unsubscribe = client.watchShreds({
  onShred: (shred) => {
    // Process full shred object
    console.log('Block:', shred.block_number)
    console.log('Transactions:', shred.transactions.length)
    console.log('State changes:', Object.keys(shred.state_changes).length)
  },
  onError: (error) => {
    console.error('Shred subscription error:', error)
  }
})`}
                  title="watchShreds Usage"
                />
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h4 className="text-lg font-semibold mb-2 text-zinc-100">watchContractShredEvent</h4>
                <p className="text-zinc-300 mb-3">
                  Watch for specific events from a single contract with full type safety.
                </p>
                
                <CodeBlock
                  language="typescript"
                  code={`const unsubscribe = client.watchContractShredEvent({
  address: '0x6257c5f110900a8E02A7A480b097D44F96360d16',
  event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
  onLogs: (logs) => {
    logs.forEach((log) => {
      // Fully typed log.args
      const { from, to, value } = log.args
      console.log(\`Transfer: \${from} -> \${to}, amount: \${value}\`)
    })
  },
  onError: (error) => {
    console.error('Event subscription error:', error)
  }
})`}
                  title="watchContractShredEvent Usage"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="best-practices" className="space-y-8">
        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zinc-100">Best Practices</h2>
          <div className="space-y-4">
            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
              <h3 className="text-lg font-semibold mb-2 text-blue-300">Performance</h3>
              <ul className="space-y-2 text-zinc-300">
                <li>• Use specific event filters to reduce unnecessary data</li>
                <li>• Unsubscribe from events when components unmount</li>
                <li>• Batch UI updates when processing multiple events</li>
                <li>• Consider using React.useMemo for expensive computations</li>
                <li>• Implement debouncing for high-frequency events</li>
              </ul>
            </div>
            
            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
              <h3 className="text-lg font-semibold mb-2 text-green-300">Type Safety</h3>
              <ul className="space-y-2 text-zinc-300">
                <li>• Use parseAbiItem for type-safe event definitions</li>
                <li>• Leverage TypeScript&apos;s strict mode for better error catching</li>
                <li>• Define custom types for your application&apos;s event data</li>
                <li>• Use Viem&apos;s built-in type utilities for address and hash validation</li>
                <li>• Create typed wrappers for commonly used contract interactions</li>
              </ul>
            </div>
            
            <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/20">
              <h3 className="text-lg font-semibold mb-2 text-yellow-300">Error Handling</h3>
              <ul className="space-y-2 text-zinc-300">
                <li>• Always implement onError callbacks for subscriptions</li>
                <li>• Handle network disconnections gracefully</li>
                <li>• Implement exponential backoff for failed reconnections</li>
                <li>• Log errors for debugging but don&apos;t expose sensitive data</li>
                <li>• Provide fallback UI states during connection issues</li>
              </ul>
            </div>

            <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
              <h3 className="text-lg font-semibold mb-2 text-purple-300">Production Deployment</h3>
              <ul className="space-y-2 text-zinc-300">
                <li>• Use environment variables for WebSocket URLs</li>
                <li>• Implement proper connection pooling for multiple clients</li>
                <li>• Monitor subscription health and connection status</li>
                <li>• Set up alerts for connection failures or high error rates</li>
                <li>• Test reconnection behavior under various network conditions</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4 text-zinc-100">Error Handling Example</h3>
          <p className="text-zinc-300 mb-4">
            Comprehensive error handling and reconnection logic:
          </p>
          
          <CodeBlock
            language="typescript"
            code={`import { createPublicShredClient, shredsWebSocket } from 'shred-api/viem'

const client = createPublicShredClient({
  transport: shredsWebSocket('wss://testnet.riselabs.xyz/ws', {
    // Automatic reconnection settings
    reconnect: {
      attempts: 5,
      delay: 1000
    },
    // Keep connection alive
    keepAlive: {
      interval: 30000
    }
  })
})

// Robust event watching with comprehensive error handling
const unsubscribe = client.watchContractShredEvent({
  address: '0x6257c5f110900a8E02A7A480b097D44F96360d16',
  event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
  onLogs: (logs) => {
    try {
      logs.forEach((log) => {
        // Process each log with error handling
        try {
          processTransferLog(log)
        } catch (logError) {
          console.error('Error processing individual log:', logError, log)
          // Continue processing other logs
        }
      })
    } catch (error) {
      console.error('Error processing logs batch:', error)
      // Handle batch processing errors gracefully
    }
  },
  onError: (error) => {
    console.error('Subscription error:', error)
    
    // Implement custom error handling based on error type
    if (error.message.includes('connection')) {
      // Connection lost - client will automatically reconnect
      showConnectionStatus('reconnecting')
      // Optionally notify user of temporary disconnection
    } else if (error.message.includes('rate limit')) {
      // Rate limited - back off and retry
      console.warn('Rate limited, backing off...')
      setTimeout(() => {
        // Retry subscription after delay
        console.log('Retrying subscription...')
      }, 5000)
    } else if (error.message.includes('invalid')) {
      // Invalid parameters - this won't resolve automatically
      console.error('Invalid subscription parameters:', error)
      showError('Configuration error - please check your settings')
    } else {
      // Unknown error
      console.error('Unknown subscription error:', error)
      showError('Connection error - please try again')
    }
  }
})

// Helper functions for UI updates
function showConnectionStatus(status: 'connected' | 'reconnecting' | 'disconnected') {
  // Update UI to show connection status
  document.getElementById('connection-status')?.setAttribute('data-status', status)
}

function showError(message: string) {
  // Show error message to user
  console.error(message)
  // Could trigger toast notification, modal, etc.
}

function processTransferLog(log: any) {
  // Your log processing logic here
  console.log('Processing transfer:', log.args)
}`}
            title="Comprehensive Error Handling"
          />
        </div>
      </section>
    </DocPage>
  );
}
