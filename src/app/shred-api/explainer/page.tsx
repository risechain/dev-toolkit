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
            Shreds are a revolutionary feature of RISE Chain that provides developers with access to pre-confirmation 
            transaction data. This allows applications to react to blockchain events in milliseconds, a significant 
            improvement over the seconds or even minutes required when waiting for full block confirmations.
          </p>
          <p className="text-lg text-zinc-300 mb-6 leading-relaxed">
            Think of shreds as a "sneak peek" at what's about to happen on the blockchain. By processing transactions 
            pre-confirmation, applications can achieve near-instantaneous response times - a 99% improvement in latency 
            for many use cases.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zinc-100">Key Benefits</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-blue-400 mt-1">•</span>
              <span className="text-zinc-300"><strong>Ultra-Low Latency:</strong> Millisecond response times vs. seconds for traditional confirmations</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 mt-1">•</span>
              <span className="text-zinc-300"><strong>WebSocket Streaming:</strong> Persistent connection for continuous transaction data</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 mt-1">•</span>
              <span className="text-zinc-300"><strong>Pre-Confirmation Processing:</strong> Start processing logic immediately when transaction enters mempool</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 mt-1">•</span>
              <span className="text-zinc-300"><strong>Transaction Monitoring:</strong> Track transaction status from submission to confirmation</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 mt-1">•</span>
              <span className="text-zinc-300"><strong>Perfect for Gaming:</strong> Real-time interactions without blockchain delays</span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zinc-100">WebSocket Connection</h2>
          <CodeBlock
            title="Connect to Shreds API"
            language="javascript"
            code={`// Connect to the Shreds WebSocket endpoint
const ws = new WebSocket('wss://shreds.testnet.riselabs.xyz');

ws.onopen = () => {
  console.log('Connected to Shreds API');
};

ws.onmessage = (event) => {
  const shredData = JSON.parse(event.data);
  console.log('New transaction in mempool:', shredData);
  
  // Filter for transactions relevant to your dApp
  if (shredData.to === YOUR_CONTRACT_ADDRESS) {
    processPreConfirmation(shredData);
  }
};

ws.onclose = () => {
  console.log('Connection closed, attempting reconnect...');
  // Implement reconnection logic
};`}
          />
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zinc-100">RPC Methods</h2>
          <p className="text-lg text-zinc-300 mb-6 leading-relaxed">
            The Shreds API supports WebSocket subscriptions for real-time notifications:
          </p>
          <CodeBlock
            title="rise_subscribe Method"
            language="javascript"
            code={`// Subscribe to logs matching filter criteria
ws.send(JSON.stringify({
  "jsonrpc": "2.0",
  "id": 1,
  "method": "rise_subscribe",
  "params": [
    "logs",
    {
      "address": "0x1234...5678",
      "topics": [
        "0xabcd..." // Event signature hash
      ]
    }
  ]
}));

// Subscribe to all newly created Shreds
ws.send(JSON.stringify({
  "jsonrpc": "2.0",
  "id": 2,
  "method": "rise_subscribe",
  "params": ["shreds"]
}));`}
          />
        </div>
      </section>
    </DocPage>
  );
}