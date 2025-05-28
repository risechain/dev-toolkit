import ApiDocsTemplate from '@/components/templates/ApiDocsTemplate';

const endpoints = [
  {
    method: 'POST',
    path: '/api/v1/vrf/request',
    description: 'Request a new random value',
    parameters: [
      {
        name: 'seed',
        type: 'string',
        required: true,
        description: 'Unique seed value for randomness generation'
      },
      {
        name: 'callback',
        type: 'string',
        required: false,
        description: 'Webhook URL for async response'
      }
    ],
    response: {
      requestId: 'string',
      commitment: 'string',
      status: 'pending'
    }
  },
  {
    method: 'GET',
    path: '/api/v1/vrf/result/:requestId',
    description: 'Get the result of a VRF request',
    parameters: [
      {
        name: 'requestId',
        type: 'string',
        required: true,
        description: 'The ID of the VRF request'
      }
    ],
    response: {
      requestId: 'string',
      randomValue: 'string',
      proof: 'string',
      status: 'completed'
    }
  },
  {
    method: 'POST',
    path: '/api/v1/vrf/verify',
    description: 'Verify a VRF proof',
    parameters: [
      {
        name: 'randomValue',
        type: 'string',
        required: true,
        description: 'The random value to verify'
      },
      {
        name: 'proof',
        type: 'string',
        required: true,
        description: 'The cryptographic proof'
      },
      {
        name: 'seed',
        type: 'string',
        required: true,
        description: 'The original seed value'
      }
    ],
    response: {
      valid: 'boolean',
      message: 'string'
    }
  }
];

const authentication = {
  type: 'API Key',
  description: 'Include your API key in the Authorization header',
  example: 'Authorization: Bearer YOUR_API_KEY'
};

const rateLimits = {
  requests: '100 requests per minute',
  burst: '500 requests per hour'
};

export default function FastVRFApiDocsPage() {
  return (
    <ApiDocsTemplate
      title="Fast VRF API Documentation"
      subtitle="Complete API reference for Fast VRF service"
      endpoints={endpoints}
      authentication={authentication}
      rateLimits={rateLimits}
    />
  );
}