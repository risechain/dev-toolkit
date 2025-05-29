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
              <span>A RISE testnet API key (get one at <a href="https://portal.riselabs.xyz" className="text-blue-400 hover:text-blue-300 underline">portal.riselabs.xyz</a>)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>WebSocket client library for your language</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>Basic understanding of JSON-RPC protocol</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4 text-zinc-100">Authentication</h3>
          <p className="text-zinc-300 mb-4">
            All API requests require authentication. You can provide your API key in two ways:
          </p>
          
          <CodeBlock
            language="javascript"
            code={`// Method 1: Query parameter
const ws = new WebSocket('wss://shreds.testnet.riselabs.xyz?apikey=YOUR_API_KEY');

// Method 2: First message after connection
ws.onopen = () => {
  ws.send(JSON.stringify({
    jsonrpc: '2.0',
    id: 0,
    method: 'auth',
    params: {
      apiKey: 'YOUR_API_KEY'
    }
  }));
};`}
            title="Authentication Methods"
          />

          <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/20 mt-4">
            <p className="text-yellow-200">
              <strong>Security Note:</strong> Never expose your API key in client-side code. Use environment variables 
              or proxy through your backend.
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
                  <td className="px-6 py-4"><code className="text-blue-400">wss://shreds.testnet.riselabs.xyz</code></td>
                  <td className="px-6 py-4 text-green-400">✓ Live</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-zinc-300">Mainnet</td>
                  <td className="px-6 py-4"><code className="text-blue-400">wss://shreds.mainnet.riselabs.xyz</code></td>
                  <td className="px-6 py-4 text-yellow-400">Coming Soon</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4 text-zinc-100">Rate Limits</h3>
          <div className="bg-zinc-900/50 rounded-lg p-6 border border-zinc-800">
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span className="text-zinc-300">Max connections per API key:</span>
                <span className="text-zinc-100 font-mono">5</span>
              </li>
              <li className="flex justify-between">
                <span className="text-zinc-300">Max subscriptions per connection:</span>
                <span className="text-zinc-100 font-mono">100</span>
              </li>
              <li className="flex justify-between">
                <span className="text-zinc-300">Max messages per second:</span>
                <span className="text-zinc-100 font-mono">1000</span>
              </li>
              <li className="flex justify-between">
                <span className="text-zinc-300">Connection timeout (idle):</span>
                <span className="text-zinc-100 font-mono">5 minutes</span>
              </li>
            </ul>
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
            <h3 className="text-2xl font-semibold mb-4 text-zinc-100">shred_subscribe</h3>
            <p className="text-zinc-300 mb-4">
              Create a subscription to receive real-time shred notifications based on filters. Returns a subscription ID 
              that will be included with all notifications.
            </p>
            
            <h4 className="text-lg font-semibold mb-2 text-zinc-200">Parameters</h4>
            <div className="bg-zinc-900/50 rounded-lg p-4 mb-4 border border-zinc-800">
              <ul className="space-y-2 text-sm">
                <li>
                  <code className="text-blue-400">address</code> <span className="text-zinc-500">(optional)</span> - 
                  <span className="text-zinc-300">Contract address to filter by</span>
                </li>
                <li>
                  <code className="text-blue-400">from</code> <span className="text-zinc-500">(optional)</span> - 
                  <span className="text-zinc-300">Filter by sender address</span>
                </li>
                <li>
                  <code className="text-blue-400">to</code> <span className="text-zinc-500">(optional)</span> - 
                  <span className="text-zinc-300">Filter by recipient address</span>
                </li>
                <li>
                  <code className="text-blue-400">topics</code> <span className="text-zinc-500">(optional)</span> - 
                  <span className="text-zinc-300">Array of event topics to filter</span>
                </li>
                <li>
                  <code className="text-blue-400">includeReceipts</code> <span className="text-zinc-500">(optional)</span> - 
                  <span className="text-zinc-300">Include transaction receipts (default: false)</span>
                </li>
              </ul>
            </div>
            
            <CodeBlock
              language="json"
              code={`// Subscribe to all transactions for a specific address
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "shred_subscribe",
  "params": {
    "address": "0x742d35Cc69C7968C73Cf74B0E73d6a51b3e0a5B8",
    "includeReceipts": true
  }
}

// Subscribe to specific events
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "shred_subscribe",
  "params": {
    "topics": [
      "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef" // Transfer event
    ]
  }
}

// Subscribe to all shreds (no filter)
{
  "jsonrpc": "2.0",
  "id": 3,
  "method": "shred_subscribe",
  "params": {}
}`}
              title="Subscribe Examples"
            />

            <CodeBlock
              language="json"
              code={`{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "subscriptionId": "0x9ce59a13059e417087c02d3236a0b1cc",
    "status": "active"
  }
}`}
              title="Success Response"
            />
          </div>

          <div className="border-l-4 border-blue-500 pl-6">
            <h3 className="text-2xl font-semibold mb-4 text-zinc-100">shred_unsubscribe</h3>
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
  "id": 4,
  "method": "shred_unsubscribe",
  "params": {
    "subscriptionId": "0x9ce59a13059e417087c02d3236a0b1cc"
  }
}`}
              title="Unsubscribe Request"
            />

            <CodeBlock
              language="json"
              code={`{
  "jsonrpc": "2.0",
  "id": 4,
  "result": true
}`}
              title="Success Response"
            />
          </div>

          <div className="border-l-4 border-blue-500 pl-6">
            <h3 className="text-2xl font-semibold mb-4 text-zinc-100">shred_getStatus</h3>
            <p className="text-zinc-300 mb-4">
              Get current connection status and subscription information.
            </p>
            
            <CodeBlock
              language="json"
              code={`{
  "jsonrpc": "2.0",
  "id": 5,
  "method": "shred_getStatus",
  "params": {}
}`}
              title="Status Request"
            />

            <CodeBlock
              language="json"
              code={`{
  "jsonrpc": "2.0",
  "id": 5,
  "result": {
    "connected": true,
    "subscriptions": 3,
    "messagesReceived": 15234,
    "uptime": 3600,
    "latestBlock": 1234567,
    "version": "1.0.0"
  }
}`}
              title="Status Response"
            />
          </div>

          <div className="border-l-4 border-blue-500 pl-6">
            <h3 className="text-2xl font-semibold mb-4 text-zinc-100">shred_getFilters</h3>
            <p className="text-zinc-300 mb-4">
              Retrieve the current filters for an active subscription.
            </p>
            
            <h4 className="text-lg font-semibold mb-2 text-zinc-200">Parameters</h4>
            <div className="bg-zinc-900/50 rounded-lg p-4 mb-4 border border-zinc-800">
              <ul className="space-y-2 text-sm">
                <li>
                  <code className="text-blue-400">subscriptionId</code> <span className="text-red-400">(required)</span> - 
                  <span className="text-zinc-300">The subscription ID to query</span>
                </li>
              </ul>
            </div>
            
            <CodeBlock
              language="json"
              code={`{
  "jsonrpc": "2.0",
  "id": 6,
  "method": "shred_getFilters",
  "params": {
    "subscriptionId": "0x9ce59a13059e417087c02d3236a0b1cc"
  }
}`}
              title="Get Filters Request"
            />

            <CodeBlock
              language="json"
              code={`{
  "jsonrpc": "2.0",
  "id": 6,
  "result": {
    "subscriptionId": "0x9ce59a13059e417087c02d3236a0b1cc",
    "filters": {
      "address": "0x742d35Cc69C7968C73Cf74B0E73d6a51b3e0a5B8",
      "includeReceipts": true
    },
    "created": "2024-01-15T10:30:00Z",
    "messagesDelivered": 523
  }
}`}
              title="Filters Response"
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
          <h3 className="text-2xl font-semibold mb-4 text-zinc-100">Connection Lifecycle</h3>
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
      this.ws = new WebSocket('wss://shreds.testnet.riselabs.xyz');
      
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
              <h4 className="text-lg font-semibold mb-2 text-zinc-200">Shred Notification</h4>
              <p className="text-zinc-300 mb-3">
                Primary notification sent when a transaction matching your filters is detected.
              </p>
              <CodeBlock
                language="json"
                code={`{
  "jsonrpc": "2.0",
  "method": "shred_notification",
  "params": {
    "subscriptionId": "0x9ce59a13059e417087c02d3236a0b1cc",
    "shred": {
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
        "input": "0xa9059cbb000000000000000000000000abc...",
        "type": "0x2",
        "chainId": "0x1"
      },
      "status": "pending",
      "pool": "mempool",
      "priority": "high"
    }
  }
}`}
                title="Shred Notification"
              />
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2 text-zinc-200">Status Update</h4>
              <p className="text-zinc-300 mb-3">
                Sent when transaction status changes (e.g., from pending to confirmed).
              </p>
              <CodeBlock
                language="json"
                code={`{
  "jsonrpc": "2.0",
  "method": "shred_statusUpdate",
  "params": {
    "subscriptionId": "0x9ce59a13059e417087c02d3236a0b1cc",
    "shredId": "0xf47ac10b58cc4372",
    "transactionHash": "0x88df016429689c079f3b2f6ad39fa052532c56795b733da5e5d1b2e4db8f4a25",
    "status": "confirmed",
    "blockNumber": 1234567,
    "blockHash": "0x1234567890abcdef...",
    "confirmations": 1,
    "gasUsed": "21000",
    "effectiveGasPrice": "20000000000"
  }
}`}
                title="Status Update"
              />
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2 text-zinc-200">Reorganization Alert</h4>
              <p className="text-zinc-300 mb-3">
                Sent when a blockchain reorganization affects transactions you're monitoring.
              </p>
              <CodeBlock
                language="json"
                code={`{
  "jsonrpc": "2.0",
  "method": "shred_reorgAlert",
  "params": {
    "subscriptionId": "0x9ce59a13059e417087c02d3236a0b1cc",
    "affectedTransactions": [
      "0x88df016429689c079f3b2f6ad39fa052532c56795b733da5e5d1b2e4db8f4a25"
    ],
    "fromBlock": 1234567,
    "toBlock": 1234565,
    "depth": 2
  }
}`}
                title="Reorg Alert"
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
                  <td className="px-6 py-4 text-zinc-400">Authentication failed</td>
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
                <li>• Never expose API keys in client-side code</li>
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