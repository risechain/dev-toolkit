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
      <section id="quick-start" className="mb-16">
        <motion.div 
          className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-lg font-semibold mb-2">VRF Coordinator Address</h3>
          <code className="text-purple-400 font-mono text-lg">0x9d57aB4517ba97349551C876a01a7580B1338909</code>
        </motion.div>

        <h2>Quick Start</h2>

        <h3>1. Implement VRF Consumer Interface</h3>
        <p className="mb-4">Your contract must implement the IVRFConsumer interface to receive random numbers:</p>
        
        <CodeBlock
          language="solidity"
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IVRFConsumer {
    function rawFulfillRandomNumbers(
        uint256 requestId,
        uint256[] memory randomNumbers
    ) external;
}
    
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

        <h3>2. Request Parameters</h3>
        <div className="bg-surface-800 border border-surface-600 rounded-xl p-6 mb-6">
          <code className="text-lg">requestRandomNumbers(uint32 numNumbers, uint256 clientSeed)</code>
          <ul className="mt-4 space-y-2 text-gray-300">
            <li><strong>numNumbers:</strong> Number of random values to generate (1-255)</li>
            <li><strong>clientSeed:</strong> Your seed value for additional entropy (use blockhash or similar)</li>
            <li><strong>Returns:</strong> requestId for tracking your request</li>
          </ul>
        </div>

        <h3>3. Frontend Integration</h3>
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
      <section id="how-it-works" className="mb-16">
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
      <section id="shreds-api" className="mb-16">
        <h2>Advanced: Ultra-Fast Results with Shreds API</h2>
        <p className="mb-6">
          For applications requiring maximum speed, use RISE Chain's rise_subscribe to receive VRF results in real-time through Shreds (sub-blocks):
        </p>

        <div className="space-y-6">
          <div className="bg-surface-800 border border-surface-600 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3">Why use rise_subscribe?</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• <strong>Shreds ≈ sub-blocks</strong> – each Shred is emitted before the final block and contains transactions, receipts, and state changes</li>
              <li>• <strong>Millisecond latency</strong> – ideal for latency-sensitive dApps, games, and bots</li>
              <li>• <strong>Real-time events</strong> – monitor contract events as soon as they're emitted</li>
            </ul>
          </div>

          <h3>1. Computing Event Signatures</h3>
          <p className="mb-4">First, compute the event signature (topic[0]) for the VRF events you want to monitor:</p>
          <CodeBlock
            language="javascript"
            code={`import { ethers } from "ethers";

// Compute event signatures for VRF events
const REQUEST_RAISED_SIG = ethers.id("RequestRaised(uint256,address,uint32,uint256)");
const REQUEST_FULFILLED_SIG = ethers.id("RequestFulfilled(uint256)");

// For your custom events (e.g., DiceRolled)
const DICE_ROLLED_SIG = ethers.id("DiceRolled(address,uint256)");`}
          />

          <h3 className="mt-8">2. WebSocket Subscription</h3>
          <p className="mb-4">Subscribe to the VRF Coordinator and your contract events:</p>
          <CodeBlock
            language="typescript"
            code={`import WebSocket from "ws";
import { ethers } from "ethers";

const WS_URL = "wss://testnet.riselabs.xyz/ws";
const VRF_COORDINATOR = "0x9d57aB4517ba97349551C876a01a7580B1338909";
const YOUR_CONTRACT = "YOUR_CONTRACT_ADDRESS";

const ws = new WebSocket(WS_URL);

ws.on("open", () => {
    // Subscribe to VRF request fulfillment events
    ws.send(JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "rise_subscribe",
        params: [
            "logs",
            {
                address: VRF_COORDINATOR,
                topics: [REQUEST_FULFILLED_SIG]
            }
        ]
    }));

    // Subscribe to your contract's events (e.g., DiceRolled)
    ws.send(JSON.stringify({
        jsonrpc: "2.0",
        id: 2,
        method: "rise_subscribe",
        params: [
            "logs",
            {
                address: YOUR_CONTRACT,
                topics: [DICE_ROLLED_SIG]
            }
        ]
    }));
});`}
          />

          <h3 className="mt-8">3. Processing Real-time Events</h3>
          <p className="mb-4">Handle incoming events and trigger actions immediately:</p>
          <CodeBlock
            language="javascript"
            code={`ws.on("message", (raw) => {
    const msg = JSON.parse(raw.toString());

    // Handle subscription confirmations
    if (msg.id && msg.result) {
        console.log("Subscribed with ID:", msg.result);
        return;
    }

    // Handle real-time event notifications
    if (msg.method === "rise_subscription") {
        const log = msg.params.result;
        
        // Check which event was emitted
        if (log.topics[0] === REQUEST_FULFILLED_SIG) {
            // VRF request was fulfilled
            const requestId = log.topics[1];
            console.log("⚡ VRF Request fulfilled:", requestId);
            
            // Note: blockHash is null until block is finalized
            // But the event data is already available!
        }
        
        if (log.topics[0] === DICE_ROLLED_SIG) {
            // Your contract event (e.g., DiceRolled)
            const player = "0x" + log.topics[1].slice(26);
            const result = BigInt(log.data).toString();
            
            console.log("🎲 Instant result:", {
                player,
                result,
                tx: log.transactionHash
            });
            
            // Update UI immediately - no need to wait for block confirmation!
            updateGameUI(player, result);
        }
    }
});

// Example: Update game UI in real-time
function updateGameUI(player, result) {
    // Show result animation
    // Update player stats
    // Trigger next game action
    console.log(\`Player \${player} rolled \${result} - updating UI now!\`);
}`}
          />

          <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6 mt-8">
            <h4 className="font-semibold mb-2">💡 Key Benefits</h4>
            <ul className="space-y-2 text-gray-300">
              <li>• <strong>Sub-second latency:</strong> Get results in milliseconds, not seconds</li>
              <li>• <strong>No polling required:</strong> Events pushed to you automatically</li>
              <li>• <strong>Build responsive dApps:</strong> Update UI instantly for better UX</li>
              <li>• <strong>Perfect for games:</strong> Real-time dice rolls, loot drops, battle outcomes</li>
            </ul>
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section id="api-reference" className="mb-16">
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
      <section id="best-practices" className="mb-16">
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

      </section>

      {/* Support */}
      <section id="support" className="mb-16">
        <h2>Support</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <a 
            href="https://discord.gg/qhKnePXdSM" 
            target="_blank"
            className="bg-surface-800 border border-surface-600 rounded-xl p-6 hover:border-purple-500/50 transition-colors block"
          >
            <h3 className="font-semibold mb-2">Discord</h3>
            <p className="text-gray-400">Join our community for support</p>
          </a>
          
          <a 
            href="https://github.com/risechain/support" 
            target="_blank"
            className="bg-surface-800 border border-surface-600 rounded-xl p-6 hover:border-purple-500/50 transition-colors block"
          >
            <h3 className="font-semibold mb-2">Report An Issue</h3>
            <p className="text-gray-400">Report issues on GitHub</p>
          </a>
          
          <a 
            href="https://twitter.com/rise_chain" 
            target="_blank"
            className="bg-surface-800 border border-surface-600 rounded-xl p-6 hover:border-purple-500/50 transition-colors block"
          >
            <h3 className="font-semibold mb-2">Latest Updates</h3>
            <p className="text-gray-400">Follow us on Twitter</p>
          </a>
        </div>
      </section>
    </DocPage>
  );
}