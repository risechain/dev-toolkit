import DocPage from '@/components/templates/DocPage';
import CodeBlock from '@/components/ui/CodeBlock';

export default function ShredApiData() {
  return (
    <DocPage
      title="Shred API Data Formats"
      description="Understanding data structures and formats in the Shred API"
      currentSection="shred-api"
    >
      <section className="space-y-12">
        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zinc-100">Overview</h2>
          <p className="text-lg text-zinc-300 mb-6 leading-relaxed">
            The Shred API delivers transaction data in a structured format optimized for real-time processing. This guide 
            covers all data types, field definitions, and encoding standards used throughout the API.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zinc-100">Shred Object</h2>
          <p className="text-zinc-300 mb-4">
            The core data structure containing pre-confirmation transaction information.
          </p>
          
          <div className="bg-zinc-900/50 rounded-lg overflow-hidden border border-zinc-800">
            <table className="w-full">
              <thead className="bg-zinc-800/50">
                <tr>
                  <th className="text-left px-6 py-3 text-zinc-300">Field</th>
                  <th className="text-left px-6 py-3 text-zinc-300">Type</th>
                  <th className="text-left px-6 py-3 text-zinc-300">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                <tr>
                  <td className="px-6 py-4 font-mono text-blue-400">shredId</td>
                  <td className="px-6 py-4 text-zinc-400">string</td>
                  <td className="px-6 py-4 text-zinc-300">Unique identifier for this shred</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-blue-400">timestamp</td>
                  <td className="px-6 py-4 text-zinc-400">number</td>
                  <td className="px-6 py-4 text-zinc-300">Unix timestamp (milliseconds) when shred was created</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-blue-400">transaction</td>
                  <td className="px-6 py-4 text-zinc-400">object</td>
                  <td className="px-6 py-4 text-zinc-300">Transaction data (see Transaction Object below)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-blue-400">status</td>
                  <td className="px-6 py-4 text-zinc-400">string</td>
                  <td className="px-6 py-4 text-zinc-300">Current status: pending | included | confirmed | failed</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-blue-400">pool</td>
                  <td className="px-6 py-4 text-zinc-400">string</td>
                  <td className="px-6 py-4 text-zinc-300">Transaction pool: mempool | private | flashbots</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-blue-400">priority</td>
                  <td className="px-6 py-4 text-zinc-400">string</td>
                  <td className="px-6 py-4 text-zinc-300">Priority level: low | medium | high | urgent</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-blue-400">metadata</td>
                  <td className="px-6 py-4 text-zinc-400">object</td>
                  <td className="px-6 py-4 text-zinc-300">Additional metadata (optional)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <CodeBlock
              language="json"
              code={`{
  "shredId": "0xf47ac10b58cc4372",
  "timestamp": 1704067200000,
  "transaction": {
    "hash": "0x88df016429689c079f3b2f6ad39fa052532c56795b733da5e5d1b2e4db8f4a25",
    "from": "0x742d35Cc6634C0532925a3b844Bc9e7595f8c8C5",
    "to": "0x9876543210fedcba9876543210fedcba98765432",
    "value": "1000000000000000000",
    "gas": "21000",
    "gasPrice": "20000000000",
    "nonce": 42,
    "input": "0x",
    "type": "0x2",
    "chainId": "0x1"
  },
  "status": "pending",
  "pool": "mempool",
  "priority": "medium",
  "metadata": {
    "firstSeen": 1704067199500,
    "propagationTime": 500,
    "mempoolRank": 15
  }
}`}
              title="Example Shred Object"
            />
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zinc-100">Transaction Object</h2>
          <p className="text-zinc-300 mb-4">
            Detailed transaction data included in each shred notification.
          </p>
          
          <div className="bg-zinc-900/50 rounded-lg overflow-hidden border border-zinc-800">
            <table className="w-full">
              <thead className="bg-zinc-800/50">
                <tr>
                  <th className="text-left px-6 py-3 text-zinc-300">Field</th>
                  <th className="text-left px-6 py-3 text-zinc-300">Type</th>
                  <th className="text-left px-6 py-3 text-zinc-300">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                <tr>
                  <td className="px-6 py-4 font-mono text-blue-400">hash</td>
                  <td className="px-6 py-4 text-zinc-400">string</td>
                  <td className="px-6 py-4 text-zinc-300">Transaction hash (0x-prefixed hex)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-blue-400">from</td>
                  <td className="px-6 py-4 text-zinc-400">string</td>
                  <td className="px-6 py-4 text-zinc-300">Sender address</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-blue-400">to</td>
                  <td className="px-6 py-4 text-zinc-400">string | null</td>
                  <td className="px-6 py-4 text-zinc-300">Recipient address (null for contract creation)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-blue-400">value</td>
                  <td className="px-6 py-4 text-zinc-400">string</td>
                  <td className="px-6 py-4 text-zinc-300">Transfer value in wei</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-blue-400">gas</td>
                  <td className="px-6 py-4 text-zinc-400">string</td>
                  <td className="px-6 py-4 text-zinc-300">Gas limit</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-blue-400">gasPrice</td>
                  <td className="px-6 py-4 text-zinc-400">string</td>
                  <td className="px-6 py-4 text-zinc-300">Gas price in wei (legacy transactions)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-blue-400">maxFeePerGas</td>
                  <td className="px-6 py-4 text-zinc-400">string</td>
                  <td className="px-6 py-4 text-zinc-300">Max fee per gas (EIP-1559)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-blue-400">maxPriorityFeePerGas</td>
                  <td className="px-6 py-4 text-zinc-400">string</td>
                  <td className="px-6 py-4 text-zinc-300">Max priority fee per gas (EIP-1559)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-blue-400">nonce</td>
                  <td className="px-6 py-4 text-zinc-400">number</td>
                  <td className="px-6 py-4 text-zinc-300">Transaction nonce</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-blue-400">input</td>
                  <td className="px-6 py-4 text-zinc-400">string</td>
                  <td className="px-6 py-4 text-zinc-300">Input data (0x-prefixed hex)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-blue-400">type</td>
                  <td className="px-6 py-4 text-zinc-400">string</td>
                  <td className="px-6 py-4 text-zinc-300">Transaction type: 0x0 (legacy) | 0x1 (access list) | 0x2 (EIP-1559)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-blue-400">chainId</td>
                  <td className="px-6 py-4 text-zinc-400">string</td>
                  <td className="px-6 py-4 text-zinc-300">Chain ID</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-blue-400">accessList</td>
                  <td className="px-6 py-4 text-zinc-400">array</td>
                  <td className="px-6 py-4 text-zinc-300">EIP-2930 access list (optional)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zinc-100">Event Log Object</h2>
          <p className="text-zinc-300 mb-4">
            When subscribed with <code className="text-blue-400">includeReceipts: true</code>, you'll receive decoded event logs.
          </p>
          
          <CodeBlock
            language="json"
            code={`{
  "address": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  "topics": [
    "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
    "0x000000000000000000000000742d35cc6634c0532925a3b844bc9e7595f8c8c5",
    "0x0000000000000000000000009876543210fedcba9876543210fedcba98765432"
  ],
  "data": "0x00000000000000000000000000000000000000000000000000000000000f4240",
  "blockNumber": null,
  "transactionHash": "0x88df016429689c079f3b2f6ad39fa052532c56795b733da5e5d1b2e4db8f4a25",
  "transactionIndex": null,
  "blockHash": null,
  "logIndex": null,
  "removed": false,
  "decoded": {
    "name": "Transfer",
    "signature": "Transfer(address,address,uint256)",
    "args": {
      "from": "0x742d35Cc6634C0532925a3b844Bc9e7595f8c8C5",
      "to": "0x9876543210fedcba9876543210fedcba98765432",
      "value": "1000000"
    }
  }
}`}
            title="Event Log with Decoded Data"
          />
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zinc-100">Common Event Signatures</h2>
          <p className="text-zinc-300 mb-4">
            Topic[0] values for common events you might want to filter:
          </p>
          
          <div className="space-y-4">
            <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800">
              <h4 className="text-lg font-semibold mb-2 text-blue-400">ERC-20 Events</h4>
              <div className="space-y-2 font-mono text-sm">
                <div>
                  <span className="text-zinc-400">Transfer:</span>
                  <span className="text-zinc-300 ml-2">0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef</span>
                </div>
                <div>
                  <span className="text-zinc-400">Approval:</span>
                  <span className="text-zinc-300 ml-2">0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925</span>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800">
              <h4 className="text-lg font-semibold mb-2 text-blue-400">ERC-721 Events</h4>
              <div className="space-y-2 font-mono text-sm">
                <div>
                  <span className="text-zinc-400">Transfer:</span>
                  <span className="text-zinc-300 ml-2">0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef</span>
                </div>
                <div>
                  <span className="text-zinc-400">Approval:</span>
                  <span className="text-zinc-300 ml-2">0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925</span>
                </div>
                <div>
                  <span className="text-zinc-400">ApprovalForAll:</span>
                  <span className="text-zinc-300 ml-2">0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31</span>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800">
              <h4 className="text-lg font-semibold mb-2 text-blue-400">Uniswap V2 Events</h4>
              <div className="space-y-2 font-mono text-sm">
                <div>
                  <span className="text-zinc-400">Swap:</span>
                  <span className="text-zinc-300 ml-2">0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822</span>
                </div>
                <div>
                  <span className="text-zinc-400">Sync:</span>
                  <span className="text-zinc-300 ml-2">0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1</span>
                </div>
                <div>
                  <span className="text-zinc-400">Mint:</span>
                  <span className="text-zinc-300 ml-2">0x4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zinc-100">Status Values</h2>
          <p className="text-zinc-300 mb-4">
            Transaction status progression through the RISE network:
          </p>
          
          <div className="bg-zinc-900/50 rounded-lg p-6 border border-zinc-800">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-24 text-yellow-400 font-mono">pending</div>
                <div className="flex-1 text-zinc-300">Transaction is in mempool, not yet included in a block</div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-24 text-blue-400 font-mono">included</div>
                <div className="flex-1 text-zinc-300">Transaction included in a block, awaiting confirmation</div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-24 text-green-400 font-mono">confirmed</div>
                <div className="flex-1 text-zinc-300">Transaction confirmed (1+ confirmations)</div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-24 text-red-400 font-mono">failed</div>
                <div className="flex-1 text-zinc-300">Transaction reverted or failed</div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-24 text-gray-400 font-mono">dropped</div>
                <div className="flex-1 text-zinc-300">Transaction dropped from mempool (replaced or expired)</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zinc-100">Data Type Encoding</h2>
          <div className="space-y-4">
            <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800">
              <h4 className="text-lg font-semibold mb-2 text-zinc-200">Numbers</h4>
              <ul className="space-y-2 text-zinc-300">
                <li>• All numeric values (wei amounts, gas) are encoded as decimal strings</li>
                <li>• Block numbers and nonces are decimal numbers</li>
                <li>• Timestamps are Unix milliseconds</li>
              </ul>
            </div>
            
            <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800">
              <h4 className="text-lg font-semibold mb-2 text-zinc-200">Hex Data</h4>
              <ul className="space-y-2 text-zinc-300">
                <li>• All hex data is 0x-prefixed</li>
                <li>• Addresses are checksummed according to EIP-55</li>
                <li>• Transaction hashes are always 32 bytes (64 hex chars)</li>
              </ul>
            </div>
            
            <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800">
              <h4 className="text-lg font-semibold mb-2 text-zinc-200">Arrays and Objects</h4>
              <ul className="space-y-2 text-zinc-300">
                <li>• Empty arrays are represented as <code className="text-blue-400">[]</code></li>
                <li>• Null values are explicit (never undefined)</li>
                <li>• Optional fields are omitted when not present</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zinc-100">Example: DeFi Swap Shred</h2>
          <p className="text-zinc-300 mb-4">
            A complete example of a Uniswap V2 swap transaction shred:
          </p>
          
          <CodeBlock
            language="json"
            code={`{
  "shredId": "0x7f9fade1c0d57a7f",
  "timestamp": 1704067200000,
  "transaction": {
    "hash": "0x5c504ed432cb51138bcf09aa5e8a410dd4a1e204ef84bfed1be16dfba1b22060",
    "from": "0x742d35Cc6634C0532925a3b844Bc9e7595f8c8C5",
    "to": "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    "value": "0",
    "gas": "250000",
    "maxFeePerGas": "30000000000",
    "maxPriorityFeePerGas": "1500000000",
    "nonce": 156,
    "input": "0x38ed1739000000000000000000000000000000000000000000000000000000003b9aca00...",
    "type": "0x2",
    "chainId": "0x1"
  },
  "status": "pending",
  "pool": "mempool",
  "priority": "high",
  "metadata": {
    "protocol": "uniswap_v2",
    "action": "swapExactTokensForTokens",
    "inputToken": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    "outputToken": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    "inputAmount": "1000000000",
    "minOutputAmount": "999000000",
    "deadline": 1704067800,
    "estimatedGasUsed": "175000"
  }
}`}
            title="Uniswap Swap Shred"
          />
        </div>
      </section>
    </DocPage>
  );
}