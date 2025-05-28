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
            Fast VRF is a prototype for exploring protocol-native instant randomness, delivering cryptographically secure 
            randomness in real time. With response times as low as 10ms and typically within 100ms, Fast VRF enables 
            use cases that were previously impossible with traditional multi-block randomness solutions.
          </p>
          <p className="text-lg text-zinc-300 mb-6 leading-relaxed">
            At RISE, milliseconds matter. Multi-block randomness isn't good enough when you need instant, verifiable 
            entropy for gaming, NFT minting, lotteries, or any dApp requiring immediate randomness responses.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zinc-100">How It Works: Shreds Integration</h2>
          <p className="text-lg text-zinc-300 mb-6 leading-relaxed">
            Fast VRF leverages the Shreds API to achieve unprecedented speed. Traditional VRF implementations must wait 
            for block confirmation, but by using shreds, we can process randomness requests in milliseconds:
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-3">
              <span className="text-purple-400 mt-1">1.</span>
              <span className="text-zinc-300">Your contract requests random numbers from the VRF Coordinator</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-400 mt-1">2.</span>
              <span className="text-zinc-300">The VRF Coordinator emits a RequestRaised event</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-400 mt-1">3.</span>
              <span className="text-zinc-300">RISE node propagates event data to Shreds API within milliseconds</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-400 mt-1">4.</span>
              <span className="text-zinc-300">VRF backend fulfills request with cryptographically secure random numbers</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-400 mt-1">5.</span>
              <span className="text-zinc-300">VRF Coordinator calls back to your contract with the random numbers</span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zinc-100">Key Benefits</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-purple-400 mt-1">•</span>
              <span className="text-zinc-300"><strong>Lightning Fast:</strong> 10ms to 100ms response time vs. seconds for traditional VRF</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-400 mt-1">•</span>
              <span className="text-zinc-300"><strong>Cryptographically Secure:</strong> ECDSA signatures ensure verifiable randomness</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-400 mt-1">•</span>
              <span className="text-zinc-300"><strong>On-Chain Gaming:</strong> Enable real-time games without blockchain delays</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-400 mt-1">•</span>
              <span className="text-zinc-300"><strong>NFT Minting:</strong> Instant trait randomization during mint</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-400 mt-1">•</span>
              <span className="text-zinc-300"><strong>Hybrid Architecture:</strong> Flexible off-chain computation with on-chain verification</span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zinc-100">Smart Contract Integration</h2>
          <CodeBlock
            title="Implement VRF Consumer"
            language="solidity"
            code={`import {IVRFConsumer} from "./VRFCoordinator.sol";

contract MyGame is IVRFConsumer {
    mapping(uint256 => address) public requestIdToPlayer;
    
    // Required callback function
    function vrfFulfill(uint256 requestId, uint256[] calldata randomNumbers) external {
        address player = requestIdToPlayer[requestId];
        uint256 diceRoll = (randomNumbers[0] % 6) + 1;
        
        // Process the dice roll result
        processDiceRoll(player, diceRoll);
    }
    
    function rollDice(uint256 clientSeed) external {
        uint256 requestId = vrfCoordinator.requestRandomNumbers(1, clientSeed);
        requestIdToPlayer[requestId] = msg.sender;
    }
}`}
          />
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zinc-100">Backend Service</h2>
          <p className="text-lg text-zinc-300 mb-6 leading-relaxed">
            Run the Shreds-enabled VRF backend to process requests in real-time:
          </p>
          <CodeBlock
            title="Start VRF Backend"
            language="bash"
            code={`# Run the Shreds-enabled backend
make run-shred-staging

# The backend will:
# 1. Connect to Shreds WebSocket endpoint
# 2. Listen for VRF RequestRaised events
# 3. Generate cryptographically secure random numbers
# 4. Create ECDSA proofs
# 5. Submit fulfillment transactions with optimized gas`}
          />
        </div>
      </section>
    </DocPage>
  );
}