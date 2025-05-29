import DocPage from '@/components/templates/DocPage';
import CodeBlock from '@/components/ui/CodeBlock';

export default function ShredApiDocs() {
  return (
    <DocPage
      title="Shred API Documentation"
      description="Complete API reference for RISE's Shred API"
      currentSection="shred-api"
    >
      <section id="getting-started">
        <h2>Getting Started</h2>
        
        <p>
          The Shred API provides millisecond-fast access to pre-confirmation transaction data via WebSocket streaming. 
          Monitor pending transactions before they're included in blocks.
        </p>

        <h3>Authentication</h3>
        <p>All API requests require an API key. Include it in the Authorization header:</p>
        
        <CodeBlock
          language="bash"
          code={`curl -H "Authorization: Bearer YOUR_API_KEY" \\
  https://shreds.testnet.riselabs.xyz/v1/status`}
          title="Authentication Example"
        />

        <h3>Base URLs</h3>
        <ul>
          <li><strong>Testnet:</strong> <code>wss://shreds.testnet.riselabs.xyz</code></li>
          <li><strong>Mainnet:</strong> <code>wss://shreds.mainnet.riselabs.xyz</code> (Coming Soon)</li>
        </ul>
      </section>

      <section id="rpc-methods">
        <h2>RPC Methods</h2>

        <h3>shred_subscribe</h3>
        <p>Subscribe to real-time shred updates for specific addresses or all transactions.</p>
        
        <CodeBlock
          language="json"
          code={`{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "shred_subscribe",
  "params": {
    "address": "0x742d35Cc69C7968C73Cf74B0E73d6a51b3e0a5B8",
    "events": ["transfer", "approval"]
  }
}`}
          title="Subscribe Request"
        />

        <CodeBlock
          language="json"
          code={`{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "subscriptionId": "sub_123456",
    "status": "subscribed"
  }
}`}
          title="Subscribe Response"
        />

        <h3>shred_unsubscribe</h3>
        <p>Unsubscribe from a shred subscription.</p>
        
        <CodeBlock
          language="json"
          code={`{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "shred_unsubscribe",
  "params": {
    "subscriptionId": "sub_123456"
  }
}`}
          title="Unsubscribe Request"
        />

        <h3>shred_getLatest</h3>
        <p>Get the latest shred data without subscribing to a stream.</p>
        
        <CodeBlock
          language="json"
          code={`{
  "jsonrpc": "2.0",
  "id": 3,
  "method": "shred_getLatest",
  "params": {
    "limit": 10,
    "address": "0x742d35Cc69C7968C73Cf74B0E73d6a51b3e0a5B8"
  }
}`}
          title="Get Latest Request"
        />
      </section>

      <section id="websocket">
        <h2>WebSocket Connection</h2>

        <p>
          Connect to the Shred API using WebSocket for real-time streaming of pre-confirmation data.
        </p>

        <h3>Connection Example</h3>
        <CodeBlock
          language="javascript"
          code={`const ws = new WebSocket('wss://shreds.testnet.riselabs.xyz');

ws.onopen = () => {
  console.log('Connected to Shred API');
  
  // Subscribe to all transactions
  ws.send(JSON.stringify({
    jsonrpc: '2.0',
    id: 1,
    method: 'shred_subscribe',
    params: {
      events: ['transaction']
    }
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  
  if (data.method === 'shred_notification') {
    console.log('New shred:', data.params);
  }
};

ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};`}
          title="WebSocket Connection"
        />

        <h3>Shred Notification Format</h3>
        <CodeBlock
          language="json"
          code={`{
  "jsonrpc": "2.0",
  "method": "shred_notification",
  "params": {
    "subscriptionId": "sub_123456",
    "shred": {
      "id": "shred_789",
      "timestamp": 1704067200000,
      "blockNumber": 12345,
      "transactionHash": "0xabc123...",
      "from": "0x742d35Cc69C7968C73Cf74B0E73d6a51b3e0a5B8",
      "to": "0x9876543210fedcba9876543210fedcba98765432",
      "value": "1000000000000000000",
      "gasPrice": "20000000000",
      "gasLimit": "21000",
      "nonce": 42,
      "data": "0x",
      "status": "pending"
    }
  }
}`}
          title="Shred Notification"
        />

        <h3>Error Handling</h3>
        <p>The API returns standard JSON-RPC error responses:</p>
        
        <CodeBlock
          language="json"
          code={`{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "code": -32602,
    "message": "Invalid params",
    "data": "Address format is invalid"
  }
}`}
          title="Error Response"
        />

        <h4>Common Error Codes</h4>
        <ul>
          <li><code>-32600</code>: Invalid Request</li>
          <li><code>-32601</code>: Method not found</li>
          <li><code>-32602</code>: Invalid params</li>
          <li><code>-32603</code>: Internal error</li>
          <li><code>-32000</code>: Server error (rate limit, auth, etc.)</li>
        </ul>
      </section>
    </DocPage>
  );
}