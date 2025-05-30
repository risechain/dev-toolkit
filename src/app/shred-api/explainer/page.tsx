import DocPage from '@/components/templates/DocPage';
import CodeBlock from '@/components/ui/CodeBlock';

export default function ShredApiExplainer() {
  return (
    <DocPage
      title="Shred API Explainer"
      description="Understanding RISE's revolutionary Shred API for real-time blockchain data"
      currentSection="shred-api"
    >
      <section className="space-y-12">
        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zinc-100">What are Shreds?</h2>
          <p className="text-lg text-zinc-300 mb-6 leading-relaxed">
            Shreds are RISE Chain's breakthrough in blockchain data delivery. By streaming pre-confirmation transaction 
            data directly to your application, shreds eliminate the traditional waiting period between transaction 
            submission and block confirmation. This transforms blockchain interactions from seconds-long waits into 
            millisecond-fast responses.
          </p>
          <p className="text-lg text-zinc-300 mb-6 leading-relaxed">
            Traditional blockchains force applications to wait for block confirmations before reacting to transactions. 
            RISE's Shred API provides a direct feed from the mempool, enabling your application to process transactions 
            the moment they're submitted. This 99% reduction in latency enables entirely new categories of real-time 
            blockchain applications.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zinc-100">Why Shreds Matter</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-zinc-900/50 rounded-lg p-6 border border-zinc-800">
              <h3 className="text-xl font-semibold mb-3 text-blue-400">Traditional Approach</h3>
              <ul className="space-y-2 text-zinc-400">
                <li>• Wait 2-15 seconds for block confirmation</li>
                <li>• Poll RPC endpoints repeatedly</li>
                <li>• High latency kills UX</li>
                <li>• Complex state management</li>
              </ul>
            </div>
            <div className="bg-zinc-900/50 rounded-lg p-6 border border-zinc-800">
              <h3 className="text-xl font-semibold mb-3 text-green-400">Shred API Approach</h3>
              <ul className="space-y-2 text-zinc-300">
                <li>• Millisecond-fast streaming</li>
                <li>• WebSocket push notifications</li>
                <li>• Real-time UX</li>
                <li>• Simple event-driven code</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zinc-100">Core Features</h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="text-blue-400 mt-1">⚡</span>
              <div>
                <strong className="text-zinc-100">Ultra-Low Latency:</strong>
                <span className="text-zinc-300 block mt-1">Sub-10ms updates from mempool to your application. Perfect for gaming, trading, and real-time applications.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 mt-1">🔌</span>
              <div>
                <strong className="text-zinc-100">WebSocket Streaming:</strong>
                <span className="text-zinc-300 block mt-1">Persistent bi-directional connection eliminates polling overhead and provides instant updates.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 mt-1">📡</span>
              <div>
                <strong className="text-zinc-100">Pre-Confirmation Data:</strong>
                <span className="text-zinc-300 block mt-1">Access transaction details before they're included in blocks, enabling optimistic UI updates.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 mt-1">🎯</span>
              <div>
                <strong className="text-zinc-100">Selective Filtering:</strong>
                <span className="text-zinc-300 block mt-1">Subscribe only to relevant transactions using address, topic, and method filters.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 mt-1">🔄</span>
              <div>
                <strong className="text-zinc-100">Automatic Reconnection:</strong>
                <span className="text-zinc-300 block mt-1">Built-in connection management with exponential backoff and state recovery.</span>
              </div>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zinc-100">How It Works</h2>
          <div className="bg-zinc-900/50 rounded-lg p-6 border border-zinc-800 mb-6">
            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="text-blue-400 font-bold">1.</span>
                <div>
                  <strong className="text-zinc-100">Transaction Submitted:</strong>
                  <span className="text-zinc-300 block">User sends transaction to RISE network</span>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="text-blue-400 font-bold">2.</span>
                <div>
                  <strong className="text-zinc-100">Shred Created:</strong>
                  <span className="text-zinc-300 block">Transaction enters mempool and generates a shred</span>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="text-blue-400 font-bold">3.</span>
                <div>
                  <strong className="text-zinc-100">Instant Broadcast:</strong>
                  <span className="text-zinc-300 block">Shred streams to all subscribed WebSocket connections</span>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="text-blue-400 font-bold">4.</span>
                <div>
                  <strong className="text-zinc-100">Application Reacts:</strong>
                  <span className="text-zinc-300 block">Your app processes the shred in milliseconds</span>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="text-blue-400 font-bold">5.</span>
                <div>
                  <strong className="text-zinc-100">Confirmation Updates:</strong>
                  <span className="text-zinc-300 block">Follow-up notifications when transaction is confirmed</span>
                </div>
              </li>
            </ol>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zinc-100">Basic Connection Example</h2>
          <CodeBlock
            title="Connect to Shreds API"
            language="javascript"
            code={`// Create WebSocket connection with automatic reconnection
class ShredConnection {
  constructor(url = 'wss://testnet.riselabs.xyz') {
    this.url = url;
    this.ws = null;
    this.reconnectAttempts = 0;
    this.subscriptions = new Map();
    this.connect();
  }

  connect() {
    this.ws = new WebSocket(this.url);
    
    this.ws.onopen = () => {
      console.log('Connected to Shred API');
      this.reconnectAttempts = 0;
      this.resubscribe();
    };

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.handleMessage(data);
    };

    this.ws.onclose = () => {
      console.log('Disconnected from Shred API');
      this.scheduleReconnect();
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  handleMessage(data) {
    if (data.method === 'shred_notification') {
      const { subscriptionId, shred } = data.params;
      const handler = this.subscriptions.get(subscriptionId);
      if (handler) {
        handler(shred);
      }
    }
  }

  subscribe(params, handler) {
    const id = Date.now();
    this.ws.send(JSON.stringify({
      jsonrpc: '2.0',
      id,
      method: 'shred_subscribe',
      params
    }));
    
    // Store handler for when subscription is confirmed
    this.pendingSubscriptions.set(id, { params, handler });
  }

  scheduleReconnect() {
    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
    this.reconnectAttempts++;
    setTimeout(() => this.connect(), delay);
  }
}

// Usage
const shreds = new ShredConnection();

// Subscribe to specific contract
shreds.subscribe({
  address: '0xYourContractAddress',
  events: ['Transfer', 'Approval']
}, (shred) => {
  console.log('New shred:', shred);
  updateUI(shred);
});`}
          />
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zinc-100">Use Cases</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-zinc-900/50 rounded-lg p-6 border border-zinc-800">
              <h3 className="text-xl font-semibold mb-3 text-blue-400">🎮 Gaming</h3>
              <p className="text-zinc-300">
                Instant item transfers, real-time battles, and immediate reward distribution without 
                waiting for block confirmations.
              </p>
            </div>
            <div className="bg-zinc-900/50 rounded-lg p-6 border border-zinc-800">
              <h3 className="text-xl font-semibold mb-3 text-blue-400">💱 DeFi Trading</h3>
              <p className="text-zinc-300">
                React to market movements in milliseconds. Execute arbitrage opportunities before 
                they disappear.
              </p>
            </div>
            <div className="bg-zinc-900/50 rounded-lg p-6 border border-zinc-800">
              <h3 className="text-xl font-semibold mb-3 text-blue-400">🎨 NFT Drops</h3>
              <p className="text-zinc-300">
                Show real-time mint progress and instant ownership updates. No more refreshing to 
                see if you got the NFT.
              </p>
            </div>
            <div className="bg-zinc-900/50 rounded-lg p-6 border border-zinc-800">
              <h3 className="text-xl font-semibold mb-3 text-blue-400">💬 Social Apps</h3>
              <p className="text-zinc-300">
                Instant message delivery, real-time reactions, and live collaborative experiences 
                on the blockchain.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zinc-100">Next Steps</h2>
          <div className="bg-blue-500/10 rounded-lg p-6 border border-blue-500/20">
            <p className="text-zinc-300 mb-4">
              Ready to build real-time blockchain applications? Explore our comprehensive documentation:
            </p>
            <ul className="space-y-2">
              <li>
                <a href="/shred-api/api-docs" className="text-blue-400 hover:text-blue-300 underline">
                  API Documentation →
                </a>
                <span className="text-zinc-400 ml-2">Complete reference for all RPC methods</span>
              </li>
              <li>
                <a href="/shred-api/code-examples" className="text-blue-400 hover:text-blue-300 underline">
                  Code Examples →
                </a>
                <span className="text-zinc-400 ml-2">Ready-to-use integration patterns</span>
              </li>
              <li>
                <a href="/shred-api/data" className="text-blue-400 hover:text-blue-300 underline">
                  Data Formats →
                </a>
                <span className="text-zinc-400 ml-2">Understand shred structure and fields</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </DocPage>
  );
}