export const shredApiExamples = {
  getShredData: `
// Get real-time shred data
const ws = new WebSocket('wss://rise-api.com/shreds');
ws.onmessage = (event) => {
  const shredData = JSON.parse(event.data);
  console.log('New shred:', shredData);
};
  `,
  
  subscribeToAddress: `
// Subscribe to address updates
const subscription = {
  type: 'subscribe',
  address: '0x1234...5678',
  events: ['transfer', 'approval']
};
ws.send(JSON.stringify(subscription));
  `
};

export const vrfExamples = {
  requestRandomness: `
// Request verifiable randomness
const vrfRequest = {
  seed: Date.now(),
  callback: '0xYourContract',
  gas_limit: 100000
};

const response = await fetch('/api/vrf/request', {
  method: 'POST',
  body: JSON.stringify(vrfRequest)
});
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
