import ApiRefPage from '@/components/templates/ApiRefPage';
import ApiReference from '@/components/sections/ApiReference';

const fastVRFEndpoints = [
  {
    method: 'POST',
    path: '/v1/vrf/request',
    description: 'Request a new random value with cryptographic proof',
    example: `curl -X POST https://api.rise.com/v1/vrf/request \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "seed": "unique-seed-value-123",
    "callback": "https://your-app.com/webhook"
  }'`
  },
  {
    method: 'GET',
    path: '/v1/vrf/result/:requestId',
    description: 'Get the result of a VRF request',
    example: `curl -X GET https://api.rise.com/v1/vrf/result/req_abc123 \\
  -H "Authorization: Bearer YOUR_API_KEY"`
  },
  {
    method: 'POST',
    path: '/v1/vrf/verify',
    description: 'Verify a VRF proof independently',
    example: `curl -X POST https://api.rise.com/v1/vrf/verify \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "randomValue": "0x...",
    "proof": "0x...",
    "seed": "unique-seed-value-123"
  }'`
  },
  {
    method: 'GET',
    path: '/v1/vrf/status',
    description: 'Check the VRF service status and latency',
    example: `curl -X GET https://api.rise.com/v1/vrf/status \\
  -H "Authorization: Bearer YOUR_API_KEY"`
  },
  {
    method: 'POST',
    path: '/v1/vrf/batch',
    description: 'Request multiple random values in a single call',
    example: `curl -X POST https://api.rise.com/v1/vrf/batch \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "requests": [
      {"seed": "seed1"},
      {"seed": "seed2"},
      {"seed": "seed3"}
    ]
  }'`
  }
];

export default function FastVRFApiDocs() {
  return (
    <ApiRefPage
      title="Fast VRF API Documentation"
      description="Complete API reference for RISE's Fast VRF service"
      currentSection="fast-vrf"
    >
      <ApiReference 
        title="REST API Endpoints"
        baseUrl="https://api.rise.com"
        endpoints={fastVRFEndpoints}
      />
    </ApiRefPage>
  );
}