import ApiRefPage from '@/components/templates/ApiRefPage';
import ApiReference from '@/components/sections/ApiReference';

const shredApiEndpoints = [
  {
    method: 'GET',
    path: '/v1/shreds/latest',
    description: 'Get the latest shred data',
    example: `curl -X GET https://api.rise.com/v1/shreds/latest \\
  -H "Authorization: Bearer YOUR_API_KEY"`
  },
  {
    method: 'POST',
    path: '/v1/shreds/subscribe',
    description: 'Subscribe to real-time shred updates',
    example: `curl -X POST https://api.rise.com/v1/shreds/subscribe \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"address": "0x1234...5678", "events": ["transfer", "approval"]}'`
  },
  {
    method: 'GET',
    path: '/v1/shreds/:shredId',
    description: 'Get specific shred by ID',
    example: `curl -X GET https://api.rise.com/v1/shreds/123456 \\
  -H "Authorization: Bearer YOUR_API_KEY"`
  }
];

export default function ShredApiDocs() {
  return (
    <ApiRefPage
      title="Shred API Documentation"
      description="Complete API reference for RISE's Shred API"
      currentSection="shred-api"
    >
      <ApiReference 
        title="REST API Endpoints"
        baseUrl="https://api.rise.com"
        endpoints={shredApiEndpoints}
      />
    </ApiRefPage>
  );
}