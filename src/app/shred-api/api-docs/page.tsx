import DocPage from '@/components/templates/DocPage';
import CodeBlock from '@/components/ui/CodeBlock';

export default function ShredApiDocs() {
  return (
    <DocPage
      title="Shred API Documentation"
      description="Complete API reference for RISE's Shred API"
      currentSection="shred-api"
    >
      <section id="getting-started" className="space-y-8">
        <div>
          <h2 className="text-3xl font-semibold mb-4 text-zinc-100">Getting Started</h2>
          
          <p className="text-lg text-zinc-300 mb-6 leading-relaxed">
            The Shred API provides millisecond-fast access to pre-confirmation transaction data via WebSocket streaming. 
            This guide covers everything you need to integrate real-time blockchain data into your application.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4 text-zinc-100">Prerequisites</h3>
          <ul className="space-y-2 text-zinc-300">
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>WebSocket client library for your language</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>Basic understanding of JSON-RPC protocol</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>Access to RISE testnet (no API key required)</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4 text-zinc-100">Connection Setup</h3>
          <p className="text-zinc-300 mb-4">
            Connect to the RISE WebSocket endpoint to start receiving real-time Shred data. No authentication required.
          </p>
          
          <CodeBlock
            language="javascript"
            code={`// Connect to RISE testnet WebSocket
const ws = new WebSocket('wss://testnet.riselabs.xyz/ws');

ws.on('open', () => {
  console.log('Connected to RISE WebSocket');
  
  // Start subscribing to events
  ws.send(JSON.stringify({
    jsonrpc: '2.0',
    id: 1,
    method: 'rise_subscribe',
    params: [
      'logs',
      {
        // Optional filters
        address: '0x...', // Contract address to monitor
        topics: ['0x...'] // Event signatures to filter
      }
    ]
  }));
});`}
            title="WebSocket Connection"
          />

          <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20 mt-4">
            <p className="text-blue-200">
              <strong>Note:</strong> The Shred API provides instant access to pre-confirmation data without requiring API keys. 
              Simply connect and subscribe to start receiving real-time updates.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4 text-zinc-100">Connection URLs</h3>
          <div className="bg-zinc-900/50 rounded-lg overflow-hidden border border-zinc-800">
            <table className="w-full">
              <thead className="bg-zinc-800/50">
                <tr>
                  <th className="text-left px-6 py-3 text-zinc-300">Environment</th>
                  <th className="text-left px-6 py-3 text-zinc-300">WebSocket URL</th>
                  <th className="text-left px-6 py-3 text-zinc-300">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                <tr>
                  <td className="px-6 py-4 text-zinc-300">Testnet</td>
                  <td className="px-6 py-4"><code className="text-blue-400">wss://testnet.riselabs.xyz/ws</code></td>
                  <td className="px-6 py-4 text-green-400">✓ Live</td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4 text-zinc-100">Supported Subscription Channels</h3>
          <div className="bg-zinc-900/50 rounded-lg overflow-hidden border border-zinc-800">
            <table className="w-full">
              <thead className="bg-zinc-800/50">
                <tr>
                  <th className="text-left px-6 py-3 text-zinc-300">Channel</th>
                  <th className="text-left px-6 py-3 text-zinc-300">Purpose</th>
                  <th className="text-left px-6 py-3 text-zinc-300">When to use</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                <tr>
                  <td className="px-6 py-4 font-mono text-blue-400">logs</td>
                  <td className="px-6 py-4 text-zinc-300">Push every matching contract event as soon as it is emitted inside a Shred</td>
                  <td className="px-6 py-4 text-zinc-300">Monitor specific contracts or topics (e.g. in-game events, NFT mints)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-zinc-400">(empty)</td>
                  <td className="px-6 py-4 text-zinc-300">Push each Shred object with full txs, receipts & state diff</td>
                  <td className="px-6 py-4 text-zinc-300">Build mem-pool style explorers, risk engines, or latency-critical bots</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-zinc-300">
            <p className="mb-2">Both channels send notifications through the common <code className="text-blue-400">"rise_subscription"</code> envelope.</p>
            <p>For <code className="text-blue-400">logs</code> the <code className="text-blue-400">blockHash</code> field is <strong>null</strong> until the enclosing block is finalised.</p>
          </div>
        </div>
      </section>

      <section id="rpc-methods" className="space-y-12">
        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zinc-100">RPC Methods</h2>
          <p className="text-lg text-zinc-300 mb-8 leading-relaxed">
            The Shred API implements the JSON-RPC 2.0 protocol with the following methods for managing subscriptions 
            and retrieving real-time data.
          </p>
        </div>

        <div className="space-y-8">
          <div className="border-l-4 border-blue-500 pl-6">
            <h3 className="text-2xl font-semibold mb-4 text-zinc-100">rise_subscribe</h3>
            <p className="text-zinc-300 mb-4">
              Create a subscription to receive real-time shred/log notifications based on filters. Returns a subscription ID 
              that will be included with all notifications.
            </p>
            
            <h4 className="text-lg font-semibold mb-2 text-zinc-200">Parameters</h4>
            <div className="bg-zinc-900/50 rounded-lg p-4 mb-4 border border-zinc-800">
              <ul className="space-y-2 text-sm">
                <li>
                  <code className="text-blue-400">address</code> <span className="text-zinc-500">(optional)</span> - 
                  <span className="text-zinc-300">Contract address(es) to match (string or string[])</span>
                </li>
                <li>
                  <code className="text-blue-400">topics</code> <span className="text-zinc-500">(optional)</span> - 
                  <span className="text-zinc-300">Topic filters, up to 4 indexed event topics (same semantics as Ethereum)</span>
                </li>
              </ul>
            </div>
            
            <CodeBlock
              language="json"
              code={`// Subscribe to logs from a specific contract
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "rise_subscribe",
  "params": [
    "logs",
    {
      "address": "0x6257c5f110900a8E02A7A480b097D44F96360d16",
      "topics": ["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"] // Transfer event
    }
  ]
}

// Subscribe to multiple addresses
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "rise_subscribe",
  "params": [
    "logs",
    {
      "address": ["0x...", "0x..."],
      "topics": []
    }
  ]
}

// Subscribe to all logs (no filter)
{
  "jsonrpc": "2.0",
  "id": 3,
  "method": "rise_subscribe",
  "params": ["logs", {}]
}`}
              title="Subscribe Examples"
            />

            <CodeBlock
              language="json"
              code={`{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x9ce59a13059e417087c02d3236a0b1cc"
}`}
              title="Success Response"
            />
          </div>

          <div className="border-l-4 border-blue-500 pl-6">
            <h3 className="text-2xl font-semibold mb-4 text-zinc-100">rise_unsubscribe</h3>
            <p className="text-zinc-300 mb-4">
              Cancel an active subscription. The subscription will stop sending notifications immediately.
            </p>
            
            <h4 className="text-lg font-semibold mb-2 text-zinc-200">Parameters</h4>
            <div className="bg-zinc-900/50 rounded-lg p-4 mb-4 border border-zinc-800">
              <ul className="space-y-2 text-sm">
                <li>
                  <code className="text-blue-400">subscriptionId</code> <span className="text-red-400">(required)</span> - 
                  <span className="text-zinc-300">The subscription ID to cancel</span>
                </li>
              </ul>
            </div>
            
            <CodeBlock
              language="json"
              code={`{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "rise_unsubscribe",
  "params": ["0x9ce59a13059e417087c02d3236a0b1cc"]
}`}
              title="Unsubscribe Request"
            />

            <CodeBlock
              language="json"
              code={`{
  "jsonrpc": "2.0",
  "id": 2,
  "result": true
}`}
              title="Success Response"
            />
          </div>

          <div className="border-l-4 border-blue-500 pl-6">
            <h3 className="text-2xl font-semibold mb-4 text-zinc-100">Computing Event Signatures</h3>
            <p className="text-zinc-300 mb-4">
              To filter for specific events, you need to compute the event signature hash. This is the keccak256 hash of the event declaration.
            </p>
            
            <CodeBlock
              language="typescript"
              code={`import { ethers } from "ethers";

// Calculate event signatures
const TRANSFER_SIG = ethers.id("Transfer(address,address,uint256)");
// Result: 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef

const APPROVAL_SIG = ethers.id("Approval(address,address,uint256)");
// Result: 0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925

// Use in subscription
ws.send(JSON.stringify({
  jsonrpc: "2.0",
  id: 1,
  method: "rise_subscribe",
  params: [
    "logs",
    {
      address: "0x...",
      topics: [TRANSFER_SIG] // Filter for Transfer events only
    }
  ]
}));`}
              title="Computing Topic Signatures"
            />
          </div>
        </div>
      </section>

      <section id="websocket" className="space-y-12">
        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zinc-100">WebSocket Implementation</h2>
          <p className="text-lg text-zinc-300 mb-8 leading-relaxed">
            The Shred API uses WebSocket for bi-directional real-time communication. This section covers connection 
            management, message handling, and best practices for production deployments.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4 text-zinc-100">Quick Start Example</h3>
          <CodeBlock
            language="typescript"
            code={`import WebSocket from "ws";
import { ethers } from "ethers";

const WS_URL = "wss://testnet.riselabs.xyz/ws";
const TOKEN_ADDRESS = "0x6257c5f110900a8E02A7A480b097D44F96360d16";
const TRANSFER_SIG = ethers.id("Transfer(address,address,uint256)");

const ws = new WebSocket(WS_URL);

ws.on("open", () => {
  const id = 1;
  
  ws.send(JSON.stringify({
    jsonrpc: "2.0",
    id,
    method: "rise_subscribe",
    params: [
      "logs",
      {
        address: TOKEN_ADDRESS,
        topics: [TRANSFER_SIG]
      }
    ]
  }));
});

ws.on("message", raw => {
  const msg = JSON.parse(raw.toString());
  
  // First response contains subscription id
  if (msg.id && msg.result) {
    console.log("Subscribed – id =", msg.result);
    return;
  }
  
  // Subsequent notifications
  if (msg.method === "rise_subscription") {
    const log = msg.params.result;
    console.log("🟢 New Transfer", {
      from: "0x" + log.topics[1].slice(26),
      to: "0x" + log.topics[2].slice(26),
      value: BigInt(log.data).toString(),
      tx: log.transactionHash
    });
  }
});`}
            title="Quick Start - Monitoring ERC20 Transfers"
          />
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4 text-zinc-100">Production WebSocket Client</h3>
          <CodeBlock
            language="javascript"
            code={`class ShredClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.ws = null;
    this.subscriptions = new Map();
    this.messageQueue = [];
    this.reconnectDelay = 1000;
    this.maxReconnectDelay = 30000;
    this.pingInterval = null;
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket('wss://testnet.riselabs.xyz');
      
      this.ws.onopen = () => {
        console.log('Connected to Shred API');
        this.reconnectDelay = 1000;
        
        // Authenticate
        this.send({
          jsonrpc: '2.0',
          id: 0,
          method: 'auth',
          params: { apiKey: this.apiKey }
        });
        
        // Start ping/pong to keep connection alive
        this.startPing();
        
        // Process queued messages
        this.processMessageQueue();
        
        resolve();
      };

      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.handleMessage(data);
      };

      this.ws.onclose = (event) => {
        console.log('Disconnected:', event.code, event.reason);
        this.stopPing();
        this.scheduleReconnect();
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        reject(error);
      };
    });
  }

  handleMessage(data) {
    // Handle authentication response
    if (data.id === 0 && data.result) {
      console.log('Authenticated successfully');
      this.resubscribeAll();
      return;
    }

    // Handle subscription confirmations
    if (data.result && data.result.subscriptionId) {
      const pending = this.pendingSubscriptions.get(data.id);
      if (pending) {
        this.subscriptions.set(data.result.subscriptionId, pending.handler);
        this.pendingSubscriptions.delete(data.id);
      }
      return;
    }

    // Handle notifications
    if (data.method === 'shred_notification') {
      const { subscriptionId, shred } = data.params;
      const handler = this.subscriptions.get(subscriptionId);
      if (handler) {
        handler(shred);
      }
      return;
    }

    // Handle pong
    if (data.method === 'pong') {
      this.lastPong = Date.now();
      return;
    }
  }

  subscribe(filter, handler) {
    const id = this.generateId();
    const message = {
      jsonrpc: '2.0',
      id,
      method: 'shred_subscribe',
      params: filter
    };

    if (this.isConnected()) {
      this.send(message);
      this.pendingSubscriptions.set(id, { filter, handler });
    } else {
      // Queue subscription for when we reconnect
      this.messageQueue.push({ message, handler });
    }

    return id;
  }

  startPing() {
    this.pingInterval = setInterval(() => {
      if (this.isConnected()) {
        this.send({ method: 'ping' });
        
        // Check if we've received a pong recently
        if (this.lastPong && Date.now() - this.lastPong > 60000) {
          console.warn('No pong received in 60s, reconnecting...');
          this.ws.close();
        }
      }
    }, 30000);
  }

  scheduleReconnect() {
    setTimeout(() => {
      console.log('Attempting to reconnect...');
      this.connect();
    }, this.reconnectDelay);
    
    // Exponential backoff
    this.reconnectDelay = Math.min(
      this.reconnectDelay * 2, 
      this.maxReconnectDelay
    );
  }
}

// Usage
const client = new ShredClient('YOUR_API_KEY');
await client.connect();

client.subscribe({
  address: '0x742d35Cc6634C0532925a3b844Bc9e7595f...',
  includeReceipts: true
}, (shred) => {
  console.log('New shred:', shred);
  updateUI(shred);
});`}
            title="Production-Ready WebSocket Client"
          />
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4 text-zinc-100">Message Types</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold mb-2 text-zinc-200">Initial Response</h4>
              <p className="text-zinc-300 mb-3">
                After subscribing, you'll receive a confirmation with your subscription ID.
              </p>
              <CodeBlock
                language="json"
                code={`{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x9ce59a13059e417087c02d3236a0b1cc"
}`}
                title="Subscription Confirmation"
              />
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2 text-zinc-200">Log Notification</h4>
              <p className="text-zinc-300 mb-3">
                For log subscriptions, you'll receive Ethereum-style Log objects. Note that <code className="text-blue-400">blockHash</code> is <strong>null</strong> until the block is finalized.
              </p>
              <CodeBlock
                language="json"
                code={`{
  "jsonrpc": "2.0",
  "method": "rise_subscription",
  "params": {
    "subscription": "0x9ce59a13059e417087c02d3236a0b1cc",
    "result": {
      "address": "0x6257c5f110900a8E02A7A480b097D44F96360d16",
      "topics": [
        "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
        "0x000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266",
        "0x00000000000000000000000070997970c51812dc3a010c7d01b50e0d17dc79c8"
      ],
      "data": "0x0000000000000000000000000000000000000000000000000de0b6b3a7640000",
      "blockNumber": "0x12d687",
      "blockHash": null,
      "transactionHash": "0x88df016429689c079f3b2f6ad39fa052532c56795b733da5e5d1b2e4db8f4a25",
      "transactionIndex": "0x0",
      "logIndex": "0x0",
      "removed": false
    }
  }
}`}
                title="Log Event Notification"
              />
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2 text-zinc-200">Shred Notification</h4>
              <p className="text-zinc-300 mb-3">
                For Shred subscriptions (empty subscription type), you'll receive full Shred objects with transactions, receipts, and state changes.
              </p>
              <CodeBlock
                language="json"
                code={`{
  "jsonrpc": "2.0",
  "method": "rise_subscription",
  "params": {
    "subscription": "0x9ce59a13059e417087c02d3236a0b1cc",
    "result": {
      "block_number": 1234567,
      "shred_idx": 0,
      "transactions": [
        {
          "transaction": {
            "hash": "0x88df016429689c079f3b2f6ad39fa052532c56795b733da5e5d1b2e4db8f4a25",
            "from": "0x742d35Cc6634C0532925a3b844Bc9e7595f8c8C5",
            "to": "0x9876543210fedcba9876543210fedcba98765432",
            "value": "1000000000000000000",
            "gas": "21000",
            "gasPrice": "20000000000",
            "nonce": 42,
            "input": "0x"
          },
          "receipt": {
            "status": "0x1",
            "cumulativeGasUsed": "21000",
            "logs": [],
            "logsBloom": "0x..."
          }
        }
      ],
      "state_changes": {
        "0x742d35Cc6634C0532925a3b844Bc9e7595f8c8C5": {
          "nonce": 43,
          "balance": "999000000000000000",
          "storage": {},
          "new_code": null
        }
      }
    }
  }
}`}
                title="Shred Notification"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4 text-zinc-100">Error Handling</h3>
          <p className="text-zinc-300 mb-4">
            The API uses standard JSON-RPC error codes with additional context in the data field.
          </p>
          
          <div className="bg-zinc-900/50 rounded-lg overflow-hidden border border-zinc-800">
            <table className="w-full">
              <thead className="bg-zinc-800/50">
                <tr>
                  <th className="text-left px-6 py-3 text-zinc-300">Code</th>
                  <th className="text-left px-6 py-3 text-zinc-300">Message</th>
                  <th className="text-left px-6 py-3 text-zinc-300">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                <tr>
                  <td className="px-6 py-4 font-mono text-red-400">-32700</td>
                  <td className="px-6 py-4 text-zinc-300">Parse error</td>
                  <td className="px-6 py-4 text-zinc-400">Invalid JSON</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-red-400">-32600</td>
                  <td className="px-6 py-4 text-zinc-300">Invalid Request</td>
                  <td className="px-6 py-4 text-zinc-400">JSON-RPC structure invalid</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-red-400">-32601</td>
                  <td className="px-6 py-4 text-zinc-300">Method not found</td>
                  <td className="px-6 py-4 text-zinc-400">Unknown method name</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-red-400">-32602</td>
                  <td className="px-6 py-4 text-zinc-300">Invalid params</td>
                  <td className="px-6 py-4 text-zinc-400">Invalid method parameters</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-red-400">-32000</td>
                  <td className="px-6 py-4 text-zinc-300">Server error</td>
                  <td className="px-6 py-4 text-zinc-400">Internal server error</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-red-400">-32001</td>
                  <td className="px-6 py-4 text-zinc-300">Rate limited</td>
                  <td className="px-6 py-4 text-zinc-400">Too many requests</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-red-400">-32002</td>
                  <td className="px-6 py-4 text-zinc-300">Subscription limit</td>
                  <td className="px-6 py-4 text-zinc-400">Max subscriptions reached</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <CodeBlock
              language="json"
              code={`{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "code": -32602,
    "message": "Invalid params",
    "data": {
      "field": "address",
      "reason": "Invalid address format, expected 0x-prefixed hex string",
      "received": "not-an-address"
    }
  }
}`}
              title="Detailed Error Response"
            />
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4 text-zinc-100">Best Practices</h3>
          <div className="space-y-4">
            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
              <h4 className="text-lg font-semibold mb-2 text-blue-300">Connection Management</h4>
              <ul className="space-y-2 text-zinc-300">
                <li>• Implement exponential backoff for reconnections</li>
                <li>• Use ping/pong to detect stale connections</li>
                <li>• Queue messages during disconnection</li>
                <li>• Resubscribe automatically after reconnection</li>
              </ul>
            </div>
            
            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
              <h4 className="text-lg font-semibold mb-2 text-green-300">Performance</h4>
              <ul className="space-y-2 text-zinc-300">
                <li>• Use filters to reduce unnecessary messages</li>
                <li>• Process notifications asynchronously</li>
                <li>• Batch UI updates when possible</li>
                <li>• Monitor memory usage with many subscriptions</li>
              </ul>
            </div>
            
            <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/20">
              <h4 className="text-lg font-semibold mb-2 text-yellow-300">Security</h4>
              <ul className="space-y-2 text-zinc-300">
                <li>• Connection is open - no API keys needed</li>
                <li>• Validate all incoming data</li>
                <li>• Use TLS for all connections</li>
                <li>• Implement request signing for sensitive operations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </DocPage>
  );
}