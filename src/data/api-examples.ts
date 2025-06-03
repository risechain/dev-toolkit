export const shredApiExamples = {
  getShredData: `
// Basic WebSocket connection to Shreds API
const ws = new WebSocket('wss://testnet.riselabs.xyz');

ws.onopen = () => {
  console.log('Connected to Shreds API');
  
  // Subscribe to all transactions for your contract
  ws.send(JSON.stringify({
    jsonrpc: '2.0',
    id: 1,
    method: 'shred_subscribe',
    params: {
      address: '0x742d35Cc6634C0532925a3b844Bc9e7595f8c8C5',
      includeReceipts: true
    }
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  
  if (data.method === 'shred_notification') {
    const { shred } = data.params;
    console.log('New transaction detected:', shred.transaction.hash);
    
    // React immediately to pending transactions
    if (shred.status === 'pending') {
      updateUIOptimistically(shred);
    }
  }
};

ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};
  `,
  
  subscribeToAddress: `
// Advanced subscription with event filtering
class ShredSubscriber {
  constructor(apiKey, contractAddress) {
    this.apiKey = apiKey;
    this.contractAddress = contractAddress;
    this.ws = null;
    this.subscriptions = new Map();
  }

  connect() {
    this.ws = new WebSocket(\`wss://testnet.riselabs.xyz\`);
    
    this.ws.onopen = () => {
      // Subscribe to Transfer events
      this.subscribe({
        address: this.contractAddress,
        topics: [
          '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef' // Transfer
        ]
      }, this.handleTransfer.bind(this));
      
      // Subscribe to all transactions from specific sender
      this.subscribe({
        from: '0x742d35Cc6634C0532925a3b844Bc9e7595f8c8C5'
      }, this.handleUserTransaction.bind(this));
    };
    
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.result && data.result.subscriptionId) {
        // Store subscription confirmation
        const pendingHandler = this.pendingHandlers.get(data.id);
        if (pendingHandler) {
          this.subscriptions.set(data.result.subscriptionId, pendingHandler);
        }
      }
      
      if (data.method === 'shred_notification') {
        const handler = this.subscriptions.get(data.params.subscriptionId);
        if (handler) {
          handler(data.params.shred);
        }
      }
    };
  }
  
  subscribe(filter, handler) {
    const id = Date.now();
    this.pendingHandlers.set(id, handler);
    
    this.ws.send(JSON.stringify({
      jsonrpc: '2.0',
      id,
      method: 'shred_subscribe',
      params: filter
    }));
  }
  
  handleTransfer(shred) {
    console.log('Transfer detected:', {
      from: shred.transaction.from,
      to: shred.transaction.to,
      value: shred.transaction.value
    });
  }
  
  handleUserTransaction(shred) {
    console.log('User transaction:', shred.transaction.hash);
  }
}

// Usage
const subscriber = new ShredSubscriber('YOUR_API_KEY', '0xYourContractAddress');
subscriber.connect();
  `
};

export const vrfExamples = {
  requestRandomness: `
// Smart Contract Integration
interface IVRFConsumer {
    function rawFulfillRandomNumbers(
        uint256 requestId,
        uint256[] memory randomNumbers
    ) external;
}

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
