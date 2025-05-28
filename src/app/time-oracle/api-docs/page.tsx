import ApiRefPage from '@/components/templates/ApiRefPage';
import ApiReference from '@/components/sections/ApiReference';

const timeOracleEndpoints = [
  {
    method: 'GET',
    path: '/v1/time-oracle/current',
    description: 'Get current oracle timestamp with proof',
    example: `curl -X GET https://api.rise.com/v1/time-oracle/current \\
  -H "Authorization: Bearer YOUR_API_KEY"`
  },
  {
    method: 'POST',
    path: '/v1/time-oracle/schedule',
    description: 'Schedule a future event with callback',
    example: `curl -X POST https://api.rise.com/v1/time-oracle/schedule \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "timestamp": 1740000000000,
    "callbackUrl": "https://your-app.com/callback",
    "payload": {"eventId": "12345"}
  }'`
  },
  {
    method: 'GET',
    path: '/v1/time-oracle/events/:eventId',
    description: 'Get scheduled event details',
    example: `curl -X GET https://api.rise.com/v1/time-oracle/events/evt_123abc \\
  -H "Authorization: Bearer YOUR_API_KEY"`
  },
  {
    method: 'DELETE',
    path: '/v1/time-oracle/events/:eventId',
    description: 'Cancel a scheduled event',
    example: `curl -X DELETE https://api.rise.com/v1/time-oracle/events/evt_123abc \\
  -H "Authorization: Bearer YOUR_API_KEY"`
  },
  {
    method: 'GET',
    path: '/v1/time-oracle/history',
    description: 'Get historical timestamp proofs',
    example: `curl -X GET https://api.rise.com/v1/time-oracle/history?from=1700000000&to=1700003600 \\
  -H "Authorization: Bearer YOUR_API_KEY"`
  }
];

export default function TimeOracleApiDocs() {
  return (
    <ApiRefPage
      title="Time Oracle API Documentation"
      description="Complete API reference for RISE's Time Oracle service"
      currentSection="time-oracle"
    >
      <ApiReference 
        title="REST API Endpoints"
        baseUrl="https://api.rise.com"
        endpoints={timeOracleEndpoints}
      />
    </ApiRefPage>
  );
}