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
            Shreds are RISE's innovation for instant blockchain confirmations. Instead of waiting 
            for full block confirmations, transactions are processed and confirmed in microseconds 
            through our parallel processing architecture.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zinc-100">Key Benefits</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-blue-400 mt-1">•</span>
              <span className="text-zinc-300">10ms average confirmation time</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 mt-1">•</span>
              <span className="text-zinc-300">Real-time data streaming</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 mt-1">•</span>
              <span className="text-zinc-300">100,000+ TPS capacity</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 mt-1">•</span>
              <span className="text-zinc-300">Ethereum-compatible</span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zinc-100">Quick Example</h2>
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