import DocPage from '@/components/templates/DocPage';
import CodeBlock from '@/components/ui/CodeBlock';

export default function TimeOracleExplainer() {
  return (
    <DocPage
      title="Time Oracle Explainer"
      description="Understanding RISE's decentralized Time Oracle for precise blockchain timestamps"
      currentSection="time-oracle"
    >
      <section className="space-y-12">
        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zinc-100">What is Time Oracle?</h2>
          <p className="text-lg text-zinc-300 mb-6 leading-relaxed">
            RISE&apos;s Time Oracle provides cryptographically secure, millisecond-accurate timestamps 
            for blockchain applications. Unlike traditional block timestamps, our Time Oracle delivers 
            real-time precision essential for DeFi, gaming, and time-sensitive smart contracts.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zinc-100">Key Benefits</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 mt-1">•</span>
              <span className="text-zinc-300">±1ms accuracy across all nodes</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 mt-1">•</span>
              <span className="text-zinc-300">Cryptographic timestamp proofs</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 mt-1">•</span>
              <span className="text-zinc-300">Decentralized time consensus</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 mt-1">•</span>
              <span className="text-zinc-300">Event scheduling capabilities</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 mt-1">•</span>
              <span className="text-zinc-300">Zero clock drift guarantee</span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zinc-100">Quick Example</h2>
          <CodeBlock
            title="Get Current Oracle Time"
            language="javascript"
            code={`const response = await fetch('https://rise-api.com/time-oracle/current');
const timeData = await response.json();

console.log('Oracle timestamp:', timeData.timestamp);
console.log('Accuracy:', timeData.accuracy);`}
          />
        </div>
      </section>
    </DocPage>
  );
}