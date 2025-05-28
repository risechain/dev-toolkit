export interface ShredData {
  slot: number;
  index: number;
  version: number;
  data: {
    transactions: number;
    gasUsed: string;
    timestamp: number;
  };
}

export interface VRFResponse {
  seed: string;
  randomValue: string;
  proof: string;
  blockNumber: number;
}

export interface TimeOracleResponse {
  timestamp: number;
  blockNumber: number;
  accuracy: string;
  source: string;
}

export interface ApiExample {
  title: string;
  description: string;
  code: string;
  language: string;
}