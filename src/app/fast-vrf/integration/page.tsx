import DocPage from '@/components/templates/DocPage';
import CodeBlock from '@/components/ui/CodeBlock';

export default function FastVRFIntegration() {
  return (
    <DocPage
      title="Fast VRF Integration Guide"
      description="Step-by-step guide to implement Fast VRF in your smart contracts and backend"
      currentSection="fast-vrf"
    >
      <section className="space-y-12">
        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zinc-100">Step 1: Smart Contract Setup</h2>
          <p className="text-lg text-zinc-300 mb-6 leading-relaxed">
            First, import the VRF interface and implement the required callback function in your contract:
          </p>
          <CodeBlock
            title="MyGame.sol"
            language="solidity"
            code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {IVRFConsumer} from "./VRFCoordinator.sol";

contract MyGame is IVRFConsumer {
    address public vrfCoordinator;
    mapping(uint256 => address) public requestIdToPlayer;
    mapping(address => uint256) public playerDiceRoll;
    
    event DiceRolled(address player, uint256 result);
    
    constructor(address _vrfCoordinator) {
        vrfCoordinator = _vrfCoordinator;
    }
    
    // Required callback function - called by VRF Coordinator
    function vrfFulfill(uint256 requestId, uint256[] calldata randomNumbers) external {
        require(msg.sender == vrfCoordinator, "Only VRF Coordinator");
        
        address player = requestIdToPlayer[requestId];
        require(player != address(0), "Invalid request");
        
        // Convert random number to dice roll (1-6)
        uint256 diceRoll = (randomNumbers[0] % 6) + 1;
        playerDiceRoll[player] = diceRoll;
        
        emit DiceRolled(player, diceRoll);
        
        // Clean up
        delete requestIdToPlayer[requestId];
    }
    
    function rollDice(uint256 clientSeed) external {
        require(playerDiceRoll[msg.sender] == 0, "Previous roll not claimed");
        
        // Request 1 random number from VRF Coordinator
        uint256 requestId = IVRFCoordinator(vrfCoordinator)
            .requestRandomNumbers(1, clientSeed);
        
        requestIdToPlayer[requestId] = msg.sender;
    }
    
    function claimRoll() external {
        uint256 roll = playerDiceRoll[msg.sender];
        require(roll > 0, "No roll to claim");
        
        // Process the dice roll result
        if (roll == 6) {
            // Winner logic
            // payable(msg.sender).transfer(prize);
        }
        
        delete playerDiceRoll[msg.sender];
    }
}`}
          />
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zinc-100">Step 2: Backend Service Setup</h2>
          <p className="text-lg text-zinc-300 mb-6 leading-relaxed">
            Set up the Shreds-enabled backend service to process VRF requests in real-time:
          </p>
          <CodeBlock
            title="Backend Setup"
            language="bash"
            code={`# Clone the VRF backend repository
git clone https://github.com/rise-labs/vrf-backend
cd vrf-backend

# Install dependencies
cargo build --release

# Set environment variables
export RISE_RPC_URL="https://rpc.testnet.riselabs.xyz"
export SHREDS_WS_URL="wss://shreds.testnet.riselabs.xyz"
export VRF_PRIVATE_KEY="your-private-key"
export VRF_COORDINATOR_ADDRESS="0x..."

# Run the Shreds-enabled backend
make run-shred-staging

# Backend will automatically:
# 1. Connect to Shreds WebSocket
# 2. Listen for RequestRaised events
# 3. Generate cryptographically secure random numbers
# 4. Create ECDSA proofs
# 5. Submit fulfillment transactions`}
          />
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zinc-100">Step 3: Frontend Integration</h2>
          <p className="text-lg text-zinc-300 mb-6 leading-relaxed">
            Connect your frontend to listen for VRF responses using the Shreds API:
          </p>
          <CodeBlock
            title="Frontend Integration"
            language="javascript"
            code={`import { ethers } from 'ethers';

class VRFGameClient {
    constructor(contractAddress, provider) {
        this.contract = new ethers.Contract(contractAddress, ABI, provider);
        this.ws = null;
        this.pendingRequests = new Map();
    }
    
    async connectToShreds() {
        this.ws = new WebSocket('wss://shreds.testnet.riselabs.xyz');
        
        this.ws.onopen = () => {
            console.log('Connected to Shreds API');
            
            // Subscribe to VRF events
            this.ws.send(JSON.stringify({
                "jsonrpc": "2.0",
                "id": 1,
                "method": "rise_subscribe",
                "params": [
                    "logs",
                    {
                        "address": this.contract.address,
                        "topics": [
                            ethers.utils.id("DiceRolled(address,uint256)")
                        ]
                    }
                ]
            }));
        };
        
        this.ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.params && data.params.result) {
                this.handleVRFResult(data.params.result);
            }
        };
    }
    
    async rollDice(clientSeed = Date.now()) {
        const tx = await this.contract.rollDice(clientSeed);
        const receipt = await tx.wait();
        
        console.log('Dice roll requested, waiting for result...');
        return receipt.transactionHash;
    }
    
    handleVRFResult(logData) {
        // Decode the DiceRolled event
        const decoded = ethers.utils.defaultAbiCoder.decode(
            ['address', 'uint256'],
            logData.data
        );
        
        const [player, diceRoll] = decoded;
        console.log(\`Player \${player} rolled: \${diceRoll}\`);
        
        // Update UI with instant result
        this.updateUI(player, diceRoll);
    }
    
    updateUI(player, result) {
        // Update your game UI instantly
        document.getElementById('dice-result').textContent = result;
        document.getElementById('roll-button').disabled = false;
    }
}

// Usage
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const gameClient = new VRFGameClient(CONTRACT_ADDRESS, signer);

await gameClient.connectToShreds();`}
          />
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zinc-100">Step 4: Testing & Deployment</h2>
          <p className="text-lg text-zinc-300 mb-6 leading-relaxed">
            Test your integration and deploy to RISE testnet:
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-3">
              <span className="text-purple-400 mt-1">1.</span>
              <span className="text-zinc-300">Deploy your contract to RISE testnet</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-400 mt-1">2.</span>
              <span className="text-zinc-300">Start the VRF backend service</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-400 mt-1">3.</span>
              <span className="text-zinc-300">Test randomness requests from your frontend</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-400 mt-1">4.</span>
              <span className="text-zinc-300">Verify instant responses via Shreds API</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-400 mt-1">5.</span>
              <span className="text-zinc-300">Monitor performance and gas optimization</span>
            </li>
          </ul>
          
          <CodeBlock
            title="Deployment Script"
            language="bash"
            code={`# Deploy contract
npx hardhat deploy --network rise-testnet

# Verify contract
npx hardhat verify --network rise-testnet DEPLOYED_ADDRESS

# Start monitoring
make monitor-vrf-requests

# Test integration
npm run test:vrf-integration`}
          />
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-6 text-zinc-100">Performance Monitoring</h2>
          <p className="text-lg text-zinc-300 mb-6 leading-relaxed">
            Monitor your VRF integration performance to ensure optimal user experience:
          </p>
          <CodeBlock
            title="Monitoring Dashboard"
            language="javascript"
            code={`// Track VRF performance metrics
class VRFMonitor {
    constructor() {
        this.requestTimes = new Map();
        this.fulfillmentTimes = [];
    }
    
    trackRequest(requestId) {
        this.requestTimes.set(requestId, Date.now());
    }
    
    trackFulfillment(requestId) {
        const requestTime = this.requestTimes.get(requestId);
        if (requestTime) {
            const latency = Date.now() - requestTime;
            this.fulfillmentTimes.push(latency);
            
            console.log(\`VRF Request fulfilled in \${latency}ms\`);
            
            // Alert if latency exceeds threshold
            if (latency > 200) {
                console.warn('VRF latency exceeding 200ms threshold');
            }
        }
    }
    
    getAverageLatency() {
        if (this.fulfillmentTimes.length === 0) return 0;
        
        const sum = this.fulfillmentTimes.reduce((a, b) => a + b, 0);
        return sum / this.fulfillmentTimes.length;
    }
}

const monitor = new VRFMonitor();
// Use monitor.trackRequest() and monitor.trackFulfillment() in your app`}
          />
        </div>
      </section>
    </DocPage>
  );
}