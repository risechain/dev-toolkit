'use client';

import { useState, useCallback } from 'react';
import { useWebSocket } from './useWebSocket';

interface Stats {
  tps: number;
  gasPerSecond: number;
  shredInterval: number;
  windowSize?: number;
}

interface Statistics {
  tps: string;
  gasPerSecond: string;
  shredInterval: string;
  isLoading: boolean;
}

export function useStatistics(): Statistics {
  const [stats, setStats] = useState<Stats | null>(null);

  // We don't need to fetch initial data since we only care about WebSocket stats
  // This will make the initial load much faster

  // WebSocket message handler
  const handleWebSocketMessage = useCallback((message: { type: string; status: string; data: Stats }) => {
    if (message.type === 'statsUpdate' && message.status === 'success') {
      setStats(message.data);
    }
  }, []);

  // Connect to WebSocket
  useWebSocket({
    url: process.env.NEXT_PUBLIC_WS_URL || 'wss://block-indexer-api.fly.dev:3002',
    onMessage: handleWebSocketMessage,
    onOpen: () => console.log('Stats WebSocket connected'),
    onError: (error) => console.error('Stats WebSocket error:', error),
  });

  // Format the statistics for display
  const formatStatistics = (): Statistics => {
    // Return loading state if no stats yet
    if (!stats) {
      return {
        tps: 'Loading',
        gasPerSecond: 'Loading',
        shredInterval: 'Loading',
        isLoading: true,
      };
    }

    return {
      tps: stats.tps.toFixed(2),
      gasPerSecond: (stats.gasPerSecond / 1000000).toFixed(2),
      shredInterval: (stats.shredInterval * 1000).toFixed(1),
      isLoading: false,
    };
  };

  return formatStatistics();
}