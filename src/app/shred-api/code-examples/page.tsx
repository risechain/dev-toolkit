'use client';

import ApiRefPage from '@/components/templates/ApiRefPage';
import CodeBlock from '@/components/ui/CodeBlock';
import ApiDemo from '@/components/ui/ApiDemo';
import { shredApiExamples } from '@/data/api-examples';
import { demoShredAPI } from '@/lib/api';

export default function ShredApiCodeExamples() {
  const tabs = [
    {
      id: 'javascript',
      label: 'JavaScript',
      content: (
        <div className="space-y-6">
          <CodeBlock
            title="WebSocket Connection"
            language="javascript"
            code={shredApiExamples.getShredData}
          />
          <CodeBlock
            title="Subscribe to Address Updates"
            language="javascript"
            code={shredApiExamples.subscribeToAddress}
          />
        </div>
      )
    },
    {
      id: 'python',
      label: 'Python',
      content: (
        <CodeBlock
          title="Python WebSocket Example"
          language="python"
          code={`import websocket
import json

def on_message(ws, message):
    shred = json.loads(message)
    print(f"New shred: {shred}")

ws = websocket.WebSocketApp("wss://rise-api.com/shreds",
                            on_message=on_message)
ws.run_forever()`}
        />
      )
    },
    {
      id: 'demo',
      label: 'Live Demo',
      content: (
        <ApiDemo
          title="Try Shred API"
          description="Enter an Ethereum address to get shred data"
          inputPlaceholder="0x742d35Cc6634C0532925a3b844Bc9e7595f..."
          exampleCode={shredApiExamples.getShredData}
          onExecute={demoShredAPI}
        />
      )
    }
  ];

  return (
    <ApiRefPage
      title="Shred API Code Examples"
      description="Ready-to-use code examples for integrating with the Shred API"
      currentSection="shred-api"
      tabs={tabs}
    />
  );
}