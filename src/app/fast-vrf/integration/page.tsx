'use client';

import DocPage from '@/components/templates/DocPage';
import CodeBlock from '@/components/ui/CodeBlock';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { motion } from 'framer-motion';

export default function FastVRFIntegration() {
  return (
    <DocPage
      title="Fast VRF Integration Guide"
      description="Complete guide to integrating RISE VRF into your smart contracts"
      currentSection="fast-vrf"
    >
      {/* Quick Start */}
      <section className="mb-16">
        <motion.div 
          className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-lg font-semibold mb-2">VRF Coordinator Address</h3>
          <code className="text-purple-400 font-mono text-lg">0x9d57aB4517ba97349551C876a01a7580B1338909</code>
        </motion.div>

        <h2>Quick Start</h2>

        <h3>1. Install Dependencies</h3>
        <CodeBlock
          language="bash"
          code={`# Install RISE Chain SDK (when available)
npm install @risechain/sdk

# Or use standard Web3 libraries
npm install ethers`}
        />

        <h3>2. Implement VRF Consumer Interface</h3>
        <p className="mb-4">Your contract must implement the IVRFConsumer interface to receive random numbers:</p>
        
        <CodeBlock
          language="solidity"
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IVRFConsumer} from "./VRFCoordinator.sol";

interface IVRFCoordinator {
    function requestRandomNumbers(uint32 numNumbers, uint256 clientSeed) 
        external returns (uint256 requestId);
}

contract MyGame is IVRFConsumer {
    IVRFCoordinator public immutable coordinator;
    mapping(uint256 => address) private requestOwner;
    
    // VRF Coordinator address on RISE Chain
    constructor() { 
        coordinator = IVRFCoordinator(0x9d57aB4517ba97349551C876a01a7580B1338909); 
    }

    // Request random numbers
    function rollDice() external returns (uint256 requestId) {
        // Request 1 random number with blockhash as seed
        requestId = coordinator.requestRandomNumbers(1, uint256(blockhash(block.number-1)));
        requestOwner[requestId] = msg.sender;
    }

    // Receive random numbers (callback from VRF Coordinator)
    function rawFulfillRandomNumbers(
        uint256 requestId,
        uint256[] calldata randomNumbers
    ) external override {
        require(msg.sender == address(coordinator), "Only VRF Coordinator");
        require(randomNumbers.length > 0, "No random numbers");
        
        address player = requestOwner[requestId];
        uint256 diceRoll = (randomNumbers[0] % 6) + 1; // 1-6
        
        // Process your random number
        // emit DiceRolled(player, diceRoll);
        
        delete requestOwner[requestId];
    }
}`}
        />

        <h3>3. Request Parameters</h3>
        <div className="bg-surface-800 border border-surface-600 rounded-xl p-6 mb-6">
          <code className="text-lg">requestRandomNumbers(uint32 numNumbers, uint256 clientSeed)</code>
          <ul className="mt-4 space-y-2 text-gray-300">
            <li><strong>numNumbers:</strong> Number of random values to generate (1-255)</li>
            <li><strong>clientSeed:</strong> Your seed value for additional entropy (use blockhash or similar)</li>
            <li><strong>Returns:</strong> requestId for tracking your request</li>
          </ul>
        </div>

        <h3>4. Frontend Integration</h3>
        <CodeBlock
          language="javascript"
          code={`// Connect to RISE Chain
const provider = new ethers.providers.JsonRpcProvider('https://rpc.risechain.net');
const contract = new ethers.Contract(contractAddress, abi, signer);

// Request random numbers
async function requestRandom() {
    const tx = await contract.rollDice();
    const receipt = await tx.wait();
    
    // Get request ID from events
    const event = receipt.events.find(e => e.event === 'DiceRollRequested');
    const requestId = event.args.requestId;
    
    console.log(\`Request ID: \${requestId}\`);
    return requestId;
}

// Listen for results
contract.on('DiceRolled', (player, result) => {
    console.log(\`Player \${player} rolled: \${result}\`);
});`}
        />
      </section>

      {/* How It Works */}
      <section className="mb-16">
        <h2>How It Works</h2>
        
        <div className="bg-surface-800 border border-surface-600 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">VRF Request Flow</h3>
          <ol className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center font-semibold">1</span>
              <div>
                <strong>Request:</strong> Your contract calls requestRandomNumbers() on the VRF Coordinator
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center font-semibold">2</span>
              <div>
                <strong>Event Emission:</strong> VRF Coordinator emits a RequestRaised event with your request details
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center font-semibold">3</span>
              <div>
                <strong>Backend Processing:</strong> RISE VRF backend detects the event and generates cryptographically secure random numbers
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center font-semibold">4</span>
              <div>
                <strong>Proof Generation:</strong> Backend creates an ECDSA signature over (requestId, clientSeed, randomNumbers)
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center font-semibold">5</span>
              <div>
                <strong>Fulfillment:</strong> Backend submits the random numbers + cryptographic proof to the VRF Coordinator
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center font-semibold">6</span>
              <div>
                <strong>Verification:</strong> VRF Coordinator verifies the ECDSA signature on-chain to ensure data integrity
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center font-semibold">7</span>
              <div>
                <strong>Callback:</strong> Your contract receives the verified random numbers via rawFulfillRandomNumbers()
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* Advanced: Shreds API */}
      <section className="mb-16">
        <h2>Advanced: Ultra-Fast Results with Shreds API</h2>
        <p className="mb-6">
          For applications requiring maximum speed, use RISE Chain's Shreds API to receive results before block confirmation:
        </p>
        
        <CodeBlock
          language="javascript"
          code={`// Using Shreds API for instant results
const { WebSocketClient } = require('@risechain/shred-api');

const client = new WebSocketClient('wss://shreds.risechain.com');

// Subscribe to your contract events
client.subscribeToEvents({
    contractAddress: 'YOUR_CONTRACT_ADDRESS',
    eventName: 'DiceRolled',
    fromBlock: 'latest'
});

// Receive results in milliseconds
client.on('event', (event) => {
    const { player, result } = event.args;
    console.log(\`Instant result: Player \${player} rolled \${result}\`);
    // Update UI immediately
});`}
        />
      </section>

      {/* API Reference */}
      <section className="mb-16">
        <h2>API Reference</h2>

        <h3>VRF Coordinator Interface</h3>
        <CodeBlock
          language="solidity"
          code={`interface IVRFCoordinator {
    function requestRandomNumbers(uint32 numNumbers, uint256 clientSeed) 
        external returns (uint256 requestId);
    
    function getClientSeed(uint256 requestId) 
        external view returns (uint256);
    
    function fulfilled(uint256 requestId) 
        external view returns (bool);
}`}
        />

        <h3>VRF Consumer Interface</h3>
        <CodeBlock
          language="solidity"
          code={`interface IVRFConsumer {
    function rawFulfillRandomNumbers(
        uint256 requestId,
        uint256[] calldata randomNumbers
    ) external;
}`}
        />

        <h3>Events</h3>
        <CodeBlock
          language="solidity"
          code={`// Emitted when randomness is requested
event RequestRaised(
    uint256 indexed requestId,
    address indexed requester,
    uint32 numNumbers,
    uint256 clientSeed
);

// Emitted when request is fulfilled
event RequestFulfilled(uint256 indexed requestId);`}
        />
      </section>

      {/* Best Practices */}
      <section className="mb-16">
        <h2>Best Practices</h2>

        <h3>Security Guidelines</h3>
        <div className="space-y-4">
          <div className="bg-surface-800 border border-surface-600 rounded-xl p-6">
            <h4 className="font-semibold mb-2">✅ Always Validate Caller</h4>
            <CodeBlock
              language="solidity"
              code={`require(msg.sender == address(coordinator), "Only VRF Coordinator");`}
            />
          </div>

          <div className="bg-surface-800 border border-surface-600 rounded-xl p-6">
            <h4 className="font-semibold mb-2">✅ Check Request Ownership</h4>
            <CodeBlock
              language="solidity"
              code={`require(requestOwner[requestId] == expectedOwner, "Invalid request owner");`}
            />
          </div>

          <div className="bg-surface-800 border border-surface-600 rounded-xl p-6">
            <h4 className="font-semibold mb-2">✅ Validate Random Numbers</h4>
            <CodeBlock
              language="solidity"
              code={`require(randomNumbers.length > 0, "No random numbers received");`}
            />
          </div>

          <div className="bg-surface-800 border border-surface-600 rounded-xl p-6">
            <h4 className="font-semibold mb-2">✅ Clean Up Request State</h4>
            <CodeBlock
              language="solidity"
              code={`delete requestOwner[requestId]; // Prevent replay attacks`}
            />
          </div>
        </div>

        <h3 className="mt-8">Gas Optimization</h3>
        <ul className="space-y-2 text-gray-300">
          <li>• Use uint256 for request tracking (most gas efficient)</li>
          <li>• Delete mappings after fulfillment to get gas refunds</li>
          <li>• Batch multiple random values in single request when possible</li>
        </ul>

        <h3 className="mt-8">Error Handling</h3>
        <CodeBlock
          language="solidity"
          code={`function rawFulfillRandomNumbers(uint256 requestId, uint256[] calldata randomNumbers) external override {
    // Validate caller
    if (msg.sender != address(coordinator)) {
        emit InvalidCaller(msg.sender);
        return;
    }
    
    // Validate request
    if (requestOwner[requestId] == address(0)) {
        emit UnknownRequest(requestId);
        return;
    }
    
    // Process random numbers...
}`}
        />
      </section>

      {/* Troubleshooting */}
      <section className="mb-16">
        <h2>Troubleshooting</h2>
        
        <div className="space-y-6">
          <div className="bg-surface-800 border border-surface-600 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3">Request Not Fulfilled</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Check that your contract implements IVRFConsumer correctly</li>
              <li>• Ensure rawFulfillRandomNumbers is public/external</li>
              <li>• Verify VRF Coordinator address is correct</li>
            </ul>
          </div>

          <div className="bg-surface-800 border border-surface-600 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3">Gas Estimation Errors</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Make sure your callback function doesn't consume too much gas</li>
              <li>• Avoid complex computations in the callback</li>
              <li>• Consider using events to log results instead of storage</li>
            </ul>
          </div>

          <div className="bg-surface-800 border border-surface-600 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3">Invalid Proof Errors</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• This indicates a problem with the VRF backend - contact support</li>
              <li>• Do not modify the random numbers before verification</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="mb-16">
        <h2>Support</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <a 
            href="https://discord.gg/rise" 
            target="_blank"
            className="bg-surface-800 border border-surface-600 rounded-xl p-6 hover:border-purple-500/50 transition-colors block"
          >
            <h3 className="font-semibold mb-2">Discord</h3>
            <p className="text-gray-400">Join our community for support</p>
          </a>
          
          <a 
            href="https://github.com/rise-l2/vrf" 
            target="_blank"
            className="bg-surface-800 border border-surface-600 rounded-xl p-6 hover:border-purple-500/50 transition-colors block"
          >
            <h3 className="font-semibold mb-2">GitHub</h3>
            <p className="text-gray-400">View the VRF repository</p>
          </a>
          
          <a 
            href="mailto:builders@risechain.com" 
            className="bg-surface-800 border border-surface-600 rounded-xl p-6 hover:border-purple-500/50 transition-colors block"
          >
            <h3 className="font-semibold mb-2">Email</h3>
            <p className="text-gray-400">Contact our team directly</p>
          </a>
        </div>
      </section>
    </DocPage>
  );
}