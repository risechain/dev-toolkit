import DocPage from '@/components/templates/DocPage';
import CodeBlock from '@/components/ui/CodeBlock';

export default function ShredApiDocs() {
  return (
    <DocPage
      title="JSON RPC API"
      description="Complete JSON-RPC API reference for RISE's Shred API"
      currentSection="shred-api"
    >
      <section id="overview" className="space-y-8">
        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zinc-100">JSON RPC API Overview</h2>
          <p className="text-lg text-zinc-300 mb-8 leading-relaxed">
            The Shred API implements the JSON-RPC 2.0 protocol over WebSocket for real-time communication. 
            This low-level interface provides maximum flexibility and can be used from any programming language 
            that supports WebSocket connections.
          </p>
        </div>
      </section>

      <section id="connection-setup" className="space-y-8">
        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zinc-100">Connection Setup</h2>
          <p className="text-zinc-300 mb-4">
            Connect to the RISE WebSocket endpoint to start receiving real-time Shred data. No authentication required.
          </p>
          
          <div className="bg-zinc-900/50 rounded-lg overflow-hidden border border-zinc-800 mb-6">
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

          <CodeBlock
            language="javascript"
            code={`// Basic WebSocket connection
const ws = new WebSocket('wss://testnet.riselabs.xyz/ws');

ws.onopen = () => {
  console.log('Connected to RISE WebSocket');
  
  // Subscribe to logs from a specific contract
  ws.send(JSON.stringify({
    jsonrpc: '2.0',
    id: 1,
    method: 'rise_subscribe',
    params: [
      'logs',
      {
        address: '0x6257c5f110900a8E02A7A480b097D44F96360d16',
        topics: ['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef']
      }
    ]
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Received:', data);
};

ws.onclose = () => {
  console.log('Connection closed');
};

ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};`}
            title="Basic Connection Example"
          />
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4 text-zinc-100">Subscription Channels</h3>
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
            <p className="mb-2">Both channels send notifications through the common <code className="text-blue-400">&quot;rise_subscription&quot;</code> envelope.</p>
            <p>For <code className="text-blue-400">logs</code> the <code className="text-blue-400">blockHash</code> field is <strong>null</strong> until the enclosing block is finalised.</p>
          </div>
        </div>
      </section>

      <section id="rpc-methods" className="space-y-12">
        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zinc-100">RPC Methods</h2>
          
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
                    <code className="text-blue-400">channel</code> <span className="text-zinc-500">(optional)</span> - 
                    <span className="text-zinc-300">Subscription channel: &quot;logs&quot; for events, empty for full shreds</span>
                  </li>
                  <li>
                    <code className="text-blue-400">filter</code> <span className="text-zinc-500">(optional)</span> - 
                    <span className="text-zinc-300">Filter object with address and topics</span>
                  </li>
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
      "topics": ["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"]
    }
  ]
}

// Subscribe to all logs (no filter)
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "rise_subscribe",
  "params": ["logs", {}]
}

// Subscribe to full shreds
{
  "jsonrpc": "2.0",
  "id": 3,
  "method": "rise_subscribe",
  "params": []
}

// Subscribe to multiple contracts
{
  "jsonrpc": "2.0",
  "id": 4,
  "method": "rise_subscribe",
  "params": [
    "logs",
    {
      "address": [
        "0x6257c5f110900a8E02A7A480b097D44F96360d16",
        "0x742d35Cc6634C0532925a3b844Bc9e7595f8c8C5"
      ]
    }
  ]
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
                    <code className="text-blue-400">subscriptionId</code> <span className="text-zinc-500">(required)</span> - 
                    <span className="text-zinc-300">The subscription ID returned by rise_subscribe</span>
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
          </div>
        </div>
      </section>

      <section id="message-types" className="space-y-8">
        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zinc-100">Message Types</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-zinc-200">Log Notification</h3>
              <p className="text-zinc-300 mb-3">
                For log subscriptions, you&apos;ll receive Ethereum-style Log objects. Note that <code className="text-blue-400">blockHash</code> is <strong>null</strong> until the block is finalized.
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
              <h3 className="text-xl font-semibold mb-4 text-zinc-200">Shred Notification</h3>
              <p className="text-zinc-300 mb-3">
                For Shred subscriptions (empty subscription type), you&apos;ll receive full Shred objects with transactions, receipts, and state changes.
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
      </section>

      <section id="error-handling" className="space-y-8">
        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zinc-100">Error Handling</h2>
          <p className="text-zinc-300 mb-4">
            The API uses standard JSON-RPC error codes with additional context in the data field.
          </p>
          
          <div className="bg-zinc-900/50 rounded-lg overflow-hidden border border-zinc-800 mb-6">
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
              </tbody>
            </table>
          </div>

          <CodeBlock
            language="json"
            code={`// Error response example
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "code": -32602,
    "message": "Invalid params",
    "data": {
      "details": "Invalid address format in filter",
      "received": "0xinvalid"
    }
  }
}`}
            title="Error Response Example"
          />
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4 text-zinc-100">Connection Management</h3>
          <p className="text-zinc-300 mb-4">
            Implement robust connection handling for production applications:
          </p>
          
          <CodeBlock
            language="javascript"
            code={`class RobustShredConnection {
  constructor(url) {
    this.url = url;
    this.ws = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 10;
    this.subscriptions = new Map();
    this.pendingRequests = new Map();
    this.connect();
  }

  connect() {
    this.ws = new WebSocket(this.url);
    
    this.ws.onopen = () => {
      console.log('Connected to Shred API');
      this.reconnectAttempts = 0;
      this.resubscribeAll();
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.handleMessage(data);
      } catch (error) {
        console.error('Failed to parse message:', error);
      }
    };

    this.ws.onclose = (event) => {
      console.log('Connection closed:', event.code, event.reason);
      this.scheduleReconnect();
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  handleMessage(data) {
    if (data.method === 'rise_subscription') {
      // Handle subscription notification
      const { subscription, result } = data.params;
      const handler = this.subscriptions.get(subscription);
      if (handler) {
        handler(result);
      }
    } else if (data.id) {
      // Handle response to request
      const pending = this.pendingRequests.get(data.id);
      if (pending) {
        this.pendingRequests.delete(data.id);
        if (data.error) {
          pending.reject(new Error(data.error.message));
        } else {
          pending.resolve(data.result);
        }
      }
    }
  }

  scheduleReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }

    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
    this.reconnectAttempts++;
    
    console.log(\`Reconnecting in \${delay}ms (attempt \${this.reconnectAttempts})\`);
    setTimeout(() => this.connect(), delay);
  }

  async subscribe(channel, filter = {}) {
    return new Promise((resolve, reject) => {
      const id = Date.now();
      const params = channel ? [channel, filter] : [];
      
      this.pendingRequests.set(id, { resolve, reject });
      
      this.ws.send(JSON.stringify({
        jsonrpc: '2.0',
        id,
        method: 'rise_subscribe',
        params
      }));
    });
  }

  async unsubscribe(subscriptionId) {
    return new Promise((resolve, reject) => {
      const id = Date.now();
      
      this.pendingRequests.set(id, { resolve, reject });
      
      this.ws.send(JSON.stringify({
        jsonrpc: '2.0',
        id,
        method: 'rise_unsubscribe',
        params: [subscriptionId]
      }));
    });
  }
}`}
            title="Robust Connection Management"
          />
        </div>
      </section>
    </DocPage>
  );
}
