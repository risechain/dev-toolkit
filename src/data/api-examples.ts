export const shredApiExamples = {
  getShredData: `
// Connect to Shreds WebSocket endpoint
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
  `,
  
  subscribeToAddress: `
// Subscribe to logs matching filter criteria
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
}));
  `
};

export const vrfExamples = {
  requestRandomness: `
// Smart Contract Integration
import {IVRFConsumer} from "./VRFCoordinator.sol";

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
}
  `,
  
  backendSetup: `
// Run the Shreds-enabled VRF backend
make run-shred-staging

// The backend will:
// 1. Connect to Shreds WebSocket endpoint
// 2. Listen for VRF RequestRaised events
// 3. Generate cryptographically secure random numbers
// 4. Create ECDSA proofs
// 5. Submit fulfillment transactions with optimized gas
  `
};

export const timeOracleExamples = {
  getCurrentTime: `
// Get precise time data
const response = await fetch('https://rise-api.com/time-oracle/current', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});

const timeData = await response.json();
console.log('Current oracle time:', timeData.timestamp);
  `,
  
  scheduleEvent: `
// Schedule a future event
const eventData = {
  timestamp: Date.now() + 3600000, // 1 hour from now
  callbackUrl: 'https://your-app.com/callback',
  payload: { eventType: 'reminder', userId: '123' }
};

const response = await fetch('https://rise-api.com/time-oracle/schedule', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(eventData)
});
  `
};
