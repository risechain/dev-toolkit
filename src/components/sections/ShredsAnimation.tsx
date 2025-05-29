'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

interface ShredParticle {
  id: string;
  type: 'outgoing' | 'incoming';
  progress: number;
  startX: number;
  targetX: number;
}

interface Block {
  id: string;
  number: number;
  position: number;
  status: 'active' | 'completed' | 'upcoming';
}

export default function ShredsAnimation() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [shreds, setShreds] = useState<ShredParticle[]>([]);
  const [blocks, setBlocks] = useState<Block[]>([
    { id: 'block-0', number: 1002, position: 150, status: 'upcoming' },
    { id: 'block-1', number: 1001, position: 350, status: 'active' }, // Center position
    { id: 'block-2', number: 1000, position: 550, status: 'completed' }
  ]);

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      // Add new shreds continuously
      if (Math.random() > 0.3) {
        const isOutgoing = Math.random() > 0.5;
        const activeBlock = blocks.find(b => b.status === 'active');
        if (!activeBlock) return;
        
        const senderBoxCenter = 128; // Left sender box center (16px + 224px/2)
        const receiverBoxCenter = 572; // Right receiver box center (700px - 16px - 224px/2)
        const processingBlockCenter = 350; // Center of animation area
        
        const newShred: ShredParticle = {
          id: `shred-${Date.now()}-${Math.random()}`,
          type: isOutgoing ? 'outgoing' : 'incoming',
          progress: 0,
          startX: isOutgoing ? senderBoxCenter : processingBlockCenter,
          targetX: isOutgoing ? processingBlockCenter : receiverBoxCenter
        };
        setShreds(prev => [...prev, newShred]);
      }

      // Update shreds
      setShreds(prev => prev.map(shred => ({
        ...shred,
        progress: shred.progress + 0.03
      })).filter(shred => shred.progress < 1));

      // Update blocks
      setBlocks(prev => {
        const newBlocks = prev.map(block => ({
          ...block,
          position: block.position + 1.5 // Move blocks right (faster - 1 second per block)
        }));

        // Check if active block moves past center - keep processing block centered at 350px
        const activeBlock = newBlocks.find(b => b.status === 'active');
        if (activeBlock && activeBlock.position > 450) {
          // Mark current active as completed, next as active
          return newBlocks.map(block => {
            if (block.status === 'active') return { ...block, status: 'completed' as const };
            if (block.status === 'upcoming' && block.position > 250) return { ...block, status: 'active' as const };
            return block;
          });
        }

        // Add new block if needed
        if (newBlocks.every(b => b.position > 0)) {
          const highestNumber = Math.max(...newBlocks.map(b => b.number));
          newBlocks.unshift({
            id: `block-${Date.now()}`,
            number: highestNumber + 1,
            position: -180, // Start further left to prevent overlap
            status: 'upcoming' as const
          });
        }

        // Remove blocks that are off screen
        return newBlocks.filter(b => b.position < 700);
      });

    }, 30); // Faster interval for smoother animation

    return () => clearInterval(interval);
  }, [isPlaying, blocks]);

  return (
    <div className="bg-surface-800 border border-surface-600 rounded-xl p-8 max-w-6xl mx-auto overflow-hidden hover:border-surface-500 transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-neon p-2">
            <Image 
              src="/RISE_Light.png" 
              alt="RISE Logo" 
              width={24} 
              height={24}
              className="w-full h-full object-contain"
            />
          </div>
          <h3 className="text-2xl font-display font-bold gradient-text">
            How Shreds Work
          </h3>
        </div>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="bg-surface-700 border border-surface-600 px-4 py-2 rounded-lg text-neon hover:bg-surface-600 hover:border-surface-500 transition-all duration-200"
        >
          {isPlaying ? '⏸️ Pause' : '▶️ Play'}
        </button>
      </div>

      {/* Animation Container */}
      <div className="relative h-96 bg-surface-900/50 rounded-xl overflow-hidden">
        {/* Layer 1: Sender & Receiver Boxes */}
        {/* Sender Box (Top Left) */}
        <div className="absolute top-8 left-16">
          <motion.div 
            className="bg-surface-700 border border-surface-600 rounded-xl px-6 py-4 w-56"
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="font-semibold text-white">Users & Apps</span>
              </div>
              <div className="text-xs text-gray-400">Sending Transaction</div>
            </div>
          </motion.div>
        </div>

        {/* Receiver Box (Top Right) */}
        <div className="absolute top-8 right-16">
          <motion.div 
            className="bg-surface-700 border border-surface-600 rounded-xl px-6 py-4 w-56"
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="font-semibold text-white">Users & Apps</span>
              </div>
              <div className="text-xs text-gray-400">Receive Fast Confirmation</div>
            </div>
          </motion.div>
        </div>

        {/* Layer 2: Shreds Flow (Middle) */}
        <div className="absolute top-32 left-0 right-0 h-32">

          {/* Animated shreds */}
          {shreds.map((shred) => {
            const x = shred.startX + (shred.targetX - shred.startX) * shred.progress;
            // Direct diagonal movement: outgoing goes down, incoming goes up
            const y = shred.type === 'outgoing' 
              ? 10 + shred.progress * 50  // Straight down diagonal
              : 60 - shred.progress * 50; // Straight up diagonal
            
            return (
              <motion.div
                key={shred.id}
                className={`absolute w-3 h-3 rounded-full ${
                  shred.type === 'outgoing' ? 'bg-neon' : 'bg-cyan-400'
                }`}
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  boxShadow: `0 0 12px ${shred.type === 'outgoing' ? '#00e4ff' : '#00bcd4'}`
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
              />
            );
          })}

          {/* Dotted lines showing flow paths */}
          <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
            <path
              d="M 128 10 L 350 60"
              stroke="#00e4ff"
              strokeWidth="1"
              fill="none"
              strokeDasharray="4 4"
              opacity="0.4"
            />
            <path
              d="M 350 60 L 572 10"
              stroke="#00bcd4"
              strokeWidth="1"
              fill="none"
              strokeDasharray="4 4"
              opacity="0.4"
            />
          </svg>
        </div>

        {/* Layer 3: Blocks Chain (Bottom) */}
        <div className="absolute bottom-8 left-0 right-0 h-24">
          {/* Blocks */}
          {blocks.map((block) => (
            <motion.div
              key={block.id}
              className="absolute"
              style={{ 
                left: `${block.position}px`,
                transition: 'left 0.05s linear'
              }}
            >
              <div className={`
                w-40 h-20 rounded-lg border-2 relative overflow-hidden
                ${block.status === 'active' 
                  ? 'border-primary bg-primary/10' 
                  : block.status === 'completed'
                  ? 'border-green-500/50 bg-green-500/5'
                  : 'border-surface-600 bg-surface-800/50 border-dashed'
                }
              `}>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-sm font-mono font-semibold ${
                    block.status === 'active' ? 'text-primary' : 'text-gray-400'
                  }`}>
                    Block {block.number}
                  </span>
                  {block.status === 'active' && (
                    <div className="text-xs text-gray-400 mt-1">Processing</div>
                  )}
                </div>
                
                {/* Seal indicator for completed blocks */}
                {block.status === 'completed' && (
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                    <div className="w-16 h-6 bg-surface-700 border border-surface-600 rounded text-[10px] flex items-center justify-center text-green-400">
                      Seal {block.number}
                    </div>
                  </div>
                )}
              </div>

              {/* Shred time indicator for active block */}
              {block.status === 'active' && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-gray-400">
                  ShredTime: ~1ms
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Key Message */}
      <div className="text-center mt-6 p-4 bg-primary/10 rounded-xl border border-primary/20">
        <p className="text-sm text-gray-300">
          <span className="text-neon font-semibold">Shreds provide 1-5ms pre-confirmations</span> while blocks are still being processed, enabling instant transaction feedback.
        </p>
      </div>
    </div>
  );
}