'use client';

import ApiRefPage from '@/components/templates/ApiRefPage';
import CodeBlock from '@/components/ui/CodeBlock';
import ApiDemo from '@/components/ui/ApiDemo';
import { timeOracleExamples } from '@/data/api-examples';
import { demoTimeOracle } from '@/lib/api';

export default function TimeOracleCodeExamples() {
  const tabs = [
    {
      id: 'javascript',
      label: 'JavaScript',
      content: (
        <div className="space-y-6">
          <CodeBlock
            title="Get Current Time"
            language="javascript"
            code={timeOracleExamples.getCurrentTime}
          />
          <CodeBlock
            title="Schedule Future Event"
            language="javascript"
            code={timeOracleExamples.scheduleEvent}
          />
        </div>
      )
    },
    {
      id: 'python',
      label: 'Python',
      content: (
        <CodeBlock
          title="Python Time Oracle Example"
          language="python"
          code={`import requests
import json

# Get current oracle time
response = requests.get(
    'https://api.rise.com/v1/time-oracle/current',
    headers={'Authorization': 'Bearer YOUR_API_KEY'}
)
time_data = response.json()
print(f"Oracle timestamp: {time_data['timestamp']}")
print(f"Accuracy: {time_data['accuracy']}")

# Schedule an event
event_data = {
    'timestamp': int(time.time() * 1000) + 3600000,  # 1 hour from now
    'callbackUrl': 'https://your-app.com/callback',
    'payload': {'eventType': 'reminder'}
}
schedule_response = requests.post(
    'https://api.rise.com/v1/time-oracle/schedule',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    },
    data=json.dumps(event_data)
)`}
        />
      )
    },
    {
      id: 'demo',
      label: 'Live Demo',
      content: (
        <ApiDemo
          title="Try Time Oracle"
          description="Click to get current oracle timestamp"
          inputPlaceholder="No input needed - click Execute"
          exampleCode={timeOracleExamples.getCurrentTime}
          onExecute={demoTimeOracle}
          hideInput={true}
        />
      )
    }
  ];

  return (
    <ApiRefPage
      title="Time Oracle Code Examples"
      description="Ready-to-use code examples for integrating with the Time Oracle"
      currentSection="time-oracle"
      tabs={tabs}
    />
  );
}