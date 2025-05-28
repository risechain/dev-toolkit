import DocPage from '@/components/templates/DocPage';
import CodeBlock from '@/components/ui/CodeBlock';

export default function FastVRFExplainer() {
  return (
    <DocPage
      title="Fast VRF Explainer"
      description="Understanding RISE's ultra-fast Verifiable Random Functions for gaming and DeFi"
      currentSection="fast-vrf"
    >
      <section className="space-y-12">
        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zinc-100">What is Fast VRF?</h2>
          <p className="text-lg text-zinc-300 mb-6 leading-relaxed">
            Fast VRF (Verifiable Random Function) is a cryptographic primitive that provides provably fair randomness on RISE. 
            It generates unpredictable random numbers that can be verified on-chain, making it perfect for gaming, lotteries, 
            and other applications requiring trustless randomness.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zinc-100">Key Features</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-purple-400 mt-1">•</span>
              <span className="text-zinc-300">Sub-millisecond random number generation</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-400 mt-1">•</span>
              <span className="text-zinc-300">Cryptographic proof of fairness</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-400 mt-1">•</span>
              <span className="text-zinc-300">On-chain verification</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-400 mt-1">•</span>
              <span className="text-zinc-300">Cost-effective pricing model</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-400 mt-1">•</span>
              <span className="text-zinc-300">Simple integration with existing programs</span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zinc-100">Quick Example</h2>
          <CodeBlock
            title="Request Random Number"
            language="javascript"
            code={`const vrfRequest = {
  seed: Date.now(),
  callback: '0xYourContract',
  gas_limit: 100000
};

const response = await fetch('https://rise-api.com/vrf/request', {
  method: 'POST',
  body: JSON.stringify(vrfRequest)
});

const randomData = await response.json();
console.log('Random value:', randomData.randomValue);`}
          />
        </div>
      </section>
    </DocPage>
  );
}