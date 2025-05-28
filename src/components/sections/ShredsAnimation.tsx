'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ShredParticle {
  id: string;
  type: 'outgoing' | 'incoming';
  progress: number;
  userIndex: number;
}

export default function ShredsAnimation() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [shreds, setShreds] = useState<ShredParticle[]>([]);
  const [blockFillLevel, setBlockFillLevel] = useState(0);
  const [animationTick, setAnimationTick] = useState(0);

  const users = [
    { emoji: '👤', color: 'bg-blue-500' },
    { emoji: '🧑', color: 'bg-green-500' },
    { emoji: '👩', color: 'bg-purple-500' },
    { emoji: '🧑‍💻', color: 'bg-orange-500' }
  ];

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setAnimationTick(prev => prev + 1);
      
      // Add new shreds randomly
      if (Math.random() > 0.3) {
        const userIndex = Math.floor(Math.random() * users.length);
        const newShred: ShredParticle = {
          id: `shred-${Date.now()}-${Math.random()}`,
          type: 'outgoing',
          progress: 0,
          userIndex
        };
        
        setShreds(prev => [...prev, newShred]);
      }

      // Update existing shreds
      setShreds(prev => prev.map(shred => {
        if (shred.type === 'outgoing') {
          const newProgress = shred.progress + 0.05;
          if (newProgress >= 1) {
            // Convert to incoming shred
            return { ...shred, type: 'incoming', progress: 0 };
          }
          return { ...shred, progress: newProgress };
        } else {
          // Incoming shred
          const newProgress = shred.progress + 0.08;
          return { ...shred, progress: newProgress };
        }
      }).filter(shred => shred.progress < 1 || shred.type === 'incoming'));

      // Update block fill level
      setBlockFillLevel(prev => {
        const increment = Math.random() * 0.02;
        const newLevel = prev + increment;
        return newLevel > 1 ? 0 : newLevel; // Reset when full
      });

    }, 100); // Faster updates

    return () => clearInterval(interval);
  }, [isPlaying, users.length]);

  return (
    <div className="relative bg-gray-900/30 border border-gray-800 rounded-lg p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Image 
            src="/RISE_Light.png" 
            alt="RISE Logo" 
            width={32} 
            height={32}
            className="rounded"
          />
          <h3 className="text-xl font-semibold text-blue-400">Real-time Shreds Network</h3>
        </div>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors"
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>
      </div>

      {/* Animation Area */}
      <div className="relative h-48 mb-6 bg-gray-800/30 rounded-lg overflow-hidden">
        {/* Multiple Users (Left Side) */}
        {users.map((user, index) => (
          <div 
            key={index}
            className="absolute left-4"
            style={{ top: `${20 + index * 25}%` }}
          >
            <div className={`w-6 h-6 rounded-full ${user.color} flex items-center justify-center text-xs`}>
              {user.emoji}
            </div>
            <div className="text-xs text-gray-400 mt-1 text-center">User</div>
          </div>
        ))}

        {/* RISE Chain (Center) */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-16 h-16 rounded-lg border-2 border-blue-400 bg-gray-900 flex items-center justify-center">
            <Image 
              src="/RISE_Light.png" 
              alt="RISE" 
              width={24} 
              height={24}
            />
          </div>
          <div className="text-xs text-gray-400 mt-1 text-center">RISE Chain</div>
        </div>

        {/* Block (Bottom Center) - Shows Fill Level */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="relative w-20 h-8 border-2 border-green-400 rounded bg-gray-900 overflow-hidden">
            {/* Fill indicator */}
            <div 
              className="absolute bottom-0 left-0 bg-green-400/40 transition-all duration-200"
              style={{ 
                width: '100%', 
                height: `${blockFillLevel * 100}%` 
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-xs text-green-400 font-mono">
              Block
            </div>
          </div>
          <div className="text-xs text-gray-400 mt-1 text-center">
            {Math.round(blockFillLevel * 100)}% Full
          </div>
        </div>

        {/* Dynamic Shreds */}
        {shreds.map((shred) => {
          const userTop = 20 + shred.userIndex * 25;
          
          if (shred.type === 'outgoing') {
            // Shred going from user to RISE
            const left = 8 + (shred.progress * 42); // 8% to 50%
            const top = userTop + (shred.progress * (50 - userTop)); // Curve toward center
            
            return (
              <div
                key={shred.id}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-pulse"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  transition: 'all 100ms linear'
                }}
              />
            );
          } else {
            // Shred returning from RISE to user
            const left = 50 - (shred.progress * 42); // 50% back to 8%
            const top = 50 - (shred.progress * (50 - userTop)); // Curve back to user
            
            return (
              <div
                key={shred.id}
                className="absolute w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  transition: 'all 100ms linear'
                }}
              />
            );
          }
        })}

        {/* Speed Labels */}
        <div className="absolute top-2 left-1/4 text-xs text-yellow-400 font-mono">
          Shreds Out: ~50ms
        </div>
        <div className="absolute top-2 right-1/4 text-xs text-cyan-400 font-mono">
          Response: ~100ms
        </div>
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-xs text-green-400 font-mono">
          Block: ~10ms
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-lg font-bold text-yellow-400">{shreds.filter(s => s.type === 'outgoing').length}</div>
          <div className="text-xs text-gray-400">Outgoing Shreds</div>
        </div>
        <div>
          <div className="text-lg font-bold text-cyan-400">{shreds.filter(s => s.type === 'incoming').length}</div>
          <div className="text-xs text-gray-400">Incoming Responses</div>
        </div>
        <div>
          <div className="text-lg font-bold text-green-400">{Math.round(blockFillLevel * 100)}%</div>
          <div className="text-xs text-gray-400">Block Capacity</div>
        </div>
      </div>

      <div className="text-center mt-4">
        <p className="text-xs text-gray-400">
          Multiple users send transactions → Get instant shred responses → Block formation happens in parallel
        </p>
      </div>
    </div>
  );
}