const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.rise.com';

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  status: number;
}

export async function fetchAPI<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    return {
      data,
      status: response.status,
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'An error occurred',
      status: 500,
    };
  }
}

// Demo functions for the API examples
export async function demoShredAPI(address: string): Promise<any> {
  // This is a demo function that simulates an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        address,
        shredData: {
          slot: 123456789,
          index: 42,
          version: 1,
          data: {
            transactions: 15,
            gasUsed: '0x5208',
            timestamp: Date.now(),
          }
        }
      });
    }, 1000);
  });
}

export async function demoVRFRequest(seed: string): Promise<any> {
  // This is a demo function that simulates a VRF request
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        seed,
        randomValue: '0x' + Math.random().toString(16).substr(2, 64),
        proof: '0x' + Math.random().toString(16).substr(2, 128),
        blockNumber: Math.floor(Math.random() * 1000000),
      });
    }, 1500);
  });
}

export async function demoTimeOracle(): Promise<any> {
  // This is a demo function that simulates a time oracle request
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        timestamp: Date.now(),
        blockNumber: Math.floor(Math.random() * 1000000),
        accuracy: '±1ms',
        source: 'RISE Time Oracle v1.0',
      });
    }, 500);
  });
}