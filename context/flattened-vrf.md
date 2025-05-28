# Flattened Src Directory Codebase

## src/app/docs/page.tsx

```typescript
import DocsContent from '@/components/DocsContent';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ParallaxEffect from '@/components/ParallaxEffect';
import ClientHeroAnimation from '@/components/ClientHeroAnimation';

export default function DocsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <section className="pt-32 pb-20 bg-rise-gradient text-white relative overflow-hidden" style={{ minHeight: '50vh' }}>
        {/* 3D Particle Animation */}
        <ClientHeroAnimation />
        
        {/* Pattern overlay */}
        <div className="absolute inset-0 hero-pattern z-0"></div>
        
        <div className="container-content relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <ParallaxEffect speed={0.3}>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 glow-text">VRF Documentation</h1>
            </ParallaxEffect>
            <ParallaxEffect speed={0.2}>
              <p className="text-xl text-slate-200 max-w-2xl mx-auto">
                Learn how to integrate Instant VRF into your blockchain applications
              </p>
            </ParallaxEffect>
            <div className="w-32 h-1 bg-purple-600 mx-auto my-8 rounded-full glow-effect"></div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-radial from-slate-900 via-slate-900 to-slate-950">
        <div className="glass-card-container">
          <DocsContent />
        </div>
      </section>
      
      <Footer />
    </main>
  );
}

```

End of src/app/docs/page.tsx

---

## src/app/docs/vrf-documentation.mdx

```markdown
# Fast VRF: Instant Randomness for RISE Chain

## Introduction

Offering sub-block or inter-block transaction confirmations unlocks use-cases and a UX not yet seen in crypto. However, crypto tooling today operates under the constraints of discrete blocks, not the continuous execution we enjoy with RISE. This means the tooling needs an upgrade, and RISE is offering builders the cutting edge.

The first cab off the rank is randomness. Many use-cases demand randomness, however, typical randomness solutions take multiple blocks to receive a verifiable random number.

At RISE, milliseconds matter, and multi-block randomness isn't good enough. We've introduced Fast VRF, which offers inter-block randomness with a response time as low as 10ms, typically within 100ms. This means as a builder, if you request a random number onchain, the VRF transaction will arrive within 100ms, the time it takes to blink an eye.

## What is Fast VRF?

Fast VRF is a prototype for exploring protocol-native instant randomness, a solution delivering cryptographically secure randomness in real time. This is a major step forward for use cases like:

- On-chain gaming
- NFT minting
- Lotteries
- Any dApp needing instant and verifiable entropy

## How It Works: Shreds API

### What Are Shreds?

Shreds are pre-confirmation transaction data available on the RISE Chain network. Unlike traditional blockchain transactions that require block confirmation (usually taking seconds to minutes), shreds give you access to transaction data almost instantly after broadcast - often in milliseconds.

### Why Use Shreds With VRF?

Traditional VRF implementations have a fundamental latency bottleneck: they must wait for block confirmation before processing random numbers. By using shreds, developers can:

1. **Reduce latency by ~99%**: Get randomness in milliseconds instead of seconds
2. **Improve user experience**: Create responsive applications that don't leave users waiting
3. **Enable new use cases**: Build applications that require near-instant randomness, like real-time games

### Technical Architecture

When using Shreds with VRF, the process flow works as follows:

1. Your contract requests random numbers from the VRF Coordinator
2. The VRF Coordinator emits a RequestRaised event
3. The RISE Chain node propagates this event data to the Shreds API within milliseconds
4. The VRF backend fulfills the request with cryptographically secure random numbers
5. The VRF Coordinator calls back to your contract with the random numbers
6. Your application receives notification of the callback via the Shreds API in milliseconds
7. Your frontend can update immediately, before block confirmation

## Integration Guide

### 1. Install the Shreds API SDK

```bash
npm install @risechain/shred-api
```

### 2. Subscribe to VRF Events

```javascript
const { WebSocketClient } = require('@risechain/shred-api');

async function initShredsListener() {
  // Initialize WebSocket connection
  const client = new WebSocketClient('wss://shreds.risechain.com');
  
  // Your contract that implements IVRFConsumer
  const YOUR_CONTRACT_ADDRESS = '0x...'; 
  
  // Subscribe to the VRF callback event in your contract
  client.subscribeToEvents({
    contractAddress: YOUR_CONTRACT_ADDRESS,
    // This would be your event name, e.g., DiceRollCompleted
    eventName: 'YourCallbackEvent', 
    fromBlock: 'latest'
  });
  
  // Listen for events - this will trigger BEFORE block confirmation
  client.on('event', (event) => {
    // Process the event data
    const { requestId, outcome } = event.args;
    console.log(`Fast VRF callback received for request #${requestId}`);
    
    // Update your UI or take action based on the result
    updateUserInterface(requestId, outcome);
  });
}
```

### 3. Contract Implementation

To use Fast VRF, your contract needs to implement the `IVRFConsumer` interface:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IVRFConsumer {
    function rawFulfillRandomNumbers(
        uint256 requestId,
        uint256[] calldata randomNumbers
    ) external;
}

contract MyGame is IVRFConsumer {
    // VRF Coordinator contract
    address public vrfCoordinator;
    
    // Mapping to store request IDs
    mapping(uint256 => bool) public pendingRequests;
    
    // Event emitted when random numbers are received
    event RandomNumbersReceived(uint256 indexed requestId, uint256[] numbers);
    
    constructor(address _vrfCoordinator) {
        vrfCoordinator = _vrfCoordinator;
    }
    
    // Request random numbers from the VRF Coordinator
    function requestRandomNumbers(uint32 numNumbers) external returns (uint256) {
        // Call the VRF Coordinator to request random numbers
        uint256 requestId = IVRFCoordinator(vrfCoordinator).requestRandomNumbers(
            numNumbers, 
            uint256(blockhash(block.number - 1)) // Use a recent blockhash as the client seed
        );
        
        // Store the request ID
        pendingRequests[requestId] = true;
        
        return requestId;
    }
    
    // Callback function that receives random numbers
    function rawFulfillRandomNumbers(
        uint256 requestId,
        uint256[] calldata randomNumbers
    ) external override {
        // Verify caller is the VRF Coordinator
        require(msg.sender == vrfCoordinator, "Only VRF Coordinator can fulfill");
        
        // Verify this is a pending request
        require(pendingRequests[requestId], "Request not found");
        
        // Mark request as fulfilled
        delete pendingRequests[requestId];
        
        // Process the random numbers (game-specific logic)
        processRandomNumbers(requestId, randomNumbers);
        
        // Emit event with the random numbers
        emit RandomNumbersReceived(requestId, randomNumbers);
    }
    
    // Process the random numbers based on your game logic
    function processRandomNumbers(uint256 requestId, uint256[] memory randomNumbers) internal {
        // Your game-specific logic here
        // For example, determine a dice roll outcome
    }
}
```

## Best Practices

When implementing Fast VRF with Shreds:

1. **Treat shred data as preliminary**: Always indicate to users when results are pre-confirmation
2. **Implement fallback mechanisms**: In case the Shreds API connection fails, fall back to traditional event listening
3. **Consider security implications**: Remember that shreds are pre-confirmation data and could theoretically be reordered or dropped
4. **Handle reconnections**: Implement proper reconnection logic for WebSocket connections
5. **Filter events properly**: Only process events relevant to your specific use case/user

## Monitoring Your VRF Usage

Our VRF Monitoring dashboard provides real-time visibility into your VRF usage:

### Features

- **Real-time Updates**: See VRF requests and fulfillments as they occur
- **Statistics**: Track usage patterns and latency metrics
- **Reliability**: Monitor the performance and reliability of the VRF service
- **Historical Data**: View past requests and their outcomes

### Architecture

The monitoring system uses a multi-component architecture:

1. **Backend Monitoring Service**: A dedicated Node.js service that polls the blockchain and subscribes to real-time events
2. **Redis Database**: Used to store event data and statistics for efficient retrieval
3. **Next.js API Routes**: Server endpoints for fetching data from Redis or directly from the blockchain
4. **WebSocket Server**: Provides real-time updates to connected clients
5. **React Frontend**: A responsive UI for visualizing VRF events and statistics

## Limitations and Considerations

- **Finality**: Shred data represents unconfirmed transactions that could theoretically be reordered
- **Reliability**: While rare, some shreds might not make it into blocks if network conditions change
- **Connectivity**: Shreds require maintaining a WebSocket connection, which may be interrupted

## Roadmap

This is phase 1 to explore the demand from builders for this feature. If the demand is there, the next step will be truly instant randomness. Instant randomness is a step beyond fast VRF, introducing the ability to request randomness synchronously with protocol-native randomness.

## Getting Access

Fast VRF is currently in a private beta. We welcome builders interested in leveraging it to reach out to the RISE team to get access. We're excited to see what this unlocks!

## Resources

- [Blog: Instant Blockchains Need Instant Randomness](https://blog.risechain.com/instant-blockchains-need-instant-randomness/)
- [Shreds API Documentation](https://developers.risechain.com/docs/shreds-api)
- [VRF Contract References](https://github.com/risechain/vrf-prototype/blob/main/contracts/src/VRFCoordinator.sol)

```

End of src/app/docs/vrf-documentation.mdx

---

## src/app/globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Primary colors - dark theme */
  --color-primary: #111111;
  --color-primary-dark: #000000;
  
  /* RISE purple theme */
  --color-purple-light: #9061f9;  /* Light purple */
  --color-purple-primary: #6d28d9; /* Main purple */
  --color-purple-dark: #5b21b6;   /* Dark purple */
  --color-purple-deep: #4c1d95;   /* Deeper purple */
  
  /* Accent colors */
  --color-accent: #10b981;        /* Teal accent */
  --color-accent-dark: #059669;   /* Dark teal */
  
  /* Gradients */
  --color-gradient-start: #1a0a2e; /* Dark purple - matches our deep purple theme */
  --color-gradient-mid: #2e1065;   /* Mid-tone purple for gradients */
  --color-gradient-end: #4c1d95;   /* Deep purple - matches our palette */
  
  /* Background gradients */
  --color-bg-dark: #0f172a;        /* Dark slate blue for backgrounds */
  --color-bg-darker: #020617;      /* Darker slate blue */
}

html {
  font-family: var(--font-inter), system-ui, sans-serif;
  scroll-behavior: smooth;
}

code, pre {
  font-family: var(--font-jetbrains-mono), monospace;
}

body {
  background-color: white;
  color: #171717;
  overflow-x: hidden; /* Prevent horizontal scroll during animations */
}

@media (prefers-color-scheme: dark) {
  body {
    background-color: var(--color-bg-dark);
    color: white;
  }
}

.container-content {
  width: 100%;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 640px) {
  .container-content {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .container-content {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

/* Modern gradient backgrounds */
.bg-rise-gradient {
  background: linear-gradient(135deg, var(--color-gradient-start), var(--color-gradient-mid), var(--color-gradient-end));
}

/* 3D floating animation for cards and elements */
@keyframes float {
  0% {
    transform: translateY(0px);
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.3);
  }
  50% {
    transform: translateY(-10px);
    box-shadow: 0 25px 25px 0px rgba(0, 0, 0, 0.1);
  }
  100% {
    transform: translateY(0px);
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.3);
  }
}

.float-animation {
  animation: float 6s ease-in-out infinite;
}

.float-animation-slow {
  animation: float 8s ease-in-out infinite;
}

.float-animation-fast {
  animation: float 4s ease-in-out infinite;
}

/* Glow effect for highlighted elements */
.glow {
  transition: all 0.3s ease;
}

.glow:hover {
  box-shadow: 0 0 15px var(--color-secondary);
}

/* Fancy 3D button */
.btn-3d {
  position: relative;
  transition: all 0.3s ease;
  transform-style: preserve-3d;
  transform: perspective(1000px);
}

.btn-3d:hover {
  transform: perspective(1000px) translateZ(10px);
}

.btn-3d:active {
  transform: perspective(1000px) translateZ(-5px);
}

/* Pulse animation for attention-grabbing elements */
@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.pulse-animation {
  animation: pulse 2s infinite;
}

/* Random number animation for VRF effect */
@keyframes randomize {
  0%, 100% {
    content: "3859";
  }
  10% {
    content: "9248";
  }
  20% {
    content: "4731";
  }
  30% {
    content: "8057";
  }
  40% {
    content: "2946";
  }
  50% {
    content: "7362";
  }
  60% {
    content: "1504";
  }
  70% {
    content: "6235";
  }
  80% {
    content: "9173";
  }
  90% {
    content: "5824";
  }
}

.random-number::after {
  content: "3859";
  animation: randomize 3s steps(1) infinite;
}

/* Glass morphism effect */
.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.dark .glass-effect {
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Glass card container for docs and monitoring */
.glass-card-container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 12px;
  border: 1px solid rgba(109, 40, 217, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2), 0 0 10px rgba(144, 97, 249, 0.1);
  transform-style: preserve-3d;
  perspective: 1000px;
  overflow: hidden;
}

/* Glow text effect for headings */
.glow-text {
  text-shadow: 0 0 10px rgba(var(--color-purple-primary), 0.4),
               0 0 20px rgba(var(--color-purple-primary), 0.2),
               0 0 30px rgba(var(--color-purple-primary), 0.1);
  transition: text-shadow 0.3s ease;
}

.glow-text:hover {
  text-shadow: 0 0 15px rgba(144, 97, 249, 0.6),
               0 0 30px rgba(144, 97, 249, 0.3),
               0 0 45px rgba(144, 97, 249, 0.15);
}

/* Glowing divider */
.glow-effect {
  box-shadow: 0 0 8px rgba(144, 97, 249, 0.6),
            0 0 16px rgba(144, 97, 249, 0.3);
  transition: box-shadow 0.3s ease;
}

/* Radial gradient background */
.bg-gradient-radial {
  background: radial-gradient(circle at center, var(--color-gradient-start) 0%, var(--color-gradient-mid) 50%, var(--color-bg-darker) 100%);
}

/* Hero section pattern overlay */
.hero-pattern {
  position: relative;
  overflow: hidden;
}

.hero-pattern::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%239C92AC' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
  opacity: 0.5;
}

```

End of src/app/globals.css

---

## src/app/monitor/page.tsx

```typescript
import Monitoring from '@/components/Monitoring';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ParallaxEffect from '@/components/ParallaxEffect';
import ClientHeroAnimation from '@/components/ClientHeroAnimation';

export default function MonitorPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <section className="pt-32 pb-20 bg-rise-gradient text-white relative overflow-hidden" style={{ minHeight: '40vh' }}>
        {/* 3D Particle Animation */}
        <ClientHeroAnimation />
        
        {/* Pattern overlay */}
        <div className="absolute inset-0 hero-pattern z-0"></div>
        
        <div className="container-content relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <ParallaxEffect speed={0.3}>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 glow-text">Live VRF Monitor</h1>
            </ParallaxEffect>
            <ParallaxEffect speed={0.2}>
              <p className="text-xl text-slate-200 max-w-2xl mx-auto">
                Watch real-time VRF requests and fulfillments on the RISE network
              </p>
            </ParallaxEffect>
            <div className="w-32 h-1 bg-purple-600 mx-auto my-8 rounded-full glow-effect"></div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-gradient-radial from-slate-900 via-slate-900 to-slate-950">
        <div className="glass-card-container">
          <Monitoring />
        </div>
      </section>
      
      <Footer />
    </main>
  );
}

```

End of src/app/monitor/page.tsx

---

## src/app/page.tsx

```typescript
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import ParallaxEffect from '@/components/ParallaxEffect';
import ClientHeroAnimation from '@/components/ClientHeroAnimation';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section with advanced 3D animation and RISE logo */}
      <section className="pt-32 pb-20 bg-rise-gradient text-white relative overflow-hidden" style={{ minHeight: '90vh' }}>
        {/* 3D Particle Animation */}
        <ClientHeroAnimation />
        
        {/* Pattern overlay */}
        <div className="absolute inset-0 hero-pattern z-0"></div>
        
        <div className="container-content relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="max-w-2xl mb-10 md:mb-0">
              <ParallaxEffect speed={0.3} className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-purple-600 rounded-full blur-md opacity-50 animate-pulse"></div>
                    <Image 
                      src="/RISE_WHITE.png" 
                      alt="RISE Logo" 
                      width={100} 
                      height={100}
                      className="relative z-10 mr-4" 
                    />
                  </div>
                </div>
              </ParallaxEffect>
              
              <ParallaxEffect speed={0.2}>
                <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
                  <span className="text-purple-300 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-300 animate-gradient">Ultra-Fast</span><br />
                  Verifiable Random Function
                </h1>
              </ParallaxEffect>
              
              <ParallaxEffect speed={0.4}>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <div className="px-3 py-1 bg-green-500 bg-opacity-20 text-green-300 rounded-full text-sm font-medium backdrop-blur-sm border border-green-500 border-opacity-10 shadow-lg">
                    10ms Latency
                  </div>
                  <div className="px-3 py-1 bg-blue-500 bg-opacity-20 text-blue-300 rounded-full text-sm font-medium backdrop-blur-sm border border-blue-500 border-opacity-10 shadow-lg">
                    Zero Gas
                  </div>
                  <div className="px-3 py-1 bg-purple-600 bg-opacity-20 text-purple-300 rounded-full text-sm font-medium backdrop-blur-sm border border-purple-600 border-opacity-10 shadow-lg">
                    Cryptographically Secure
                  </div>
                </div>
              </ParallaxEffect>
              
              <ParallaxEffect speed={0.25}>
                <p className="text-xl mb-8 text-slate-200 max-w-2xl">
                  Generate secure, verifiable randomness with response times less than 
                  <span className="font-bold text-green-400"> 10ms</span> - faster than the blink of an eye.
                </p>
              </ParallaxEffect>
              
              <ParallaxEffect speed={0.15}>
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Link 
                    href="/docs" 
                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-lg text-center transition-all btn-3d glow"
                  >
                    Read Documentation
                  </Link>
                  <Link 
                    href="/monitor" 
                    className="px-8 py-4 glass-effect text-white font-medium rounded-lg text-center border border-slate-500 border-opacity-30 transition-all hover:bg-slate-700 hover:bg-opacity-20"
                  >
                    View Live Monitor
                  </Link>
                </div>
              </ParallaxEffect>
            </div>
            
            {/* Enhanced 3D floating VRF number display */}
            <ParallaxEffect speed={-0.1} className="perspective-1000">
              <div className="relative transform hover:scale-105 transition-transform duration-500 hover:rotate-1">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl blur-xl opacity-30 animate-pulse"></div>
                <div className="p-8 glass-effect rounded-2xl relative z-10 transform rotate-3 max-w-xs backdrop-blur-lg border border-white border-opacity-10 shadow-2xl">
                  <div className="text-sm text-purple-300 mb-2 font-medium">Random Number Generation</div>
                  <div className="text-4xl font-mono font-bold mb-4 flex items-center">
                    <span className="mr-2">#</span>
                    <span className="random-number"></span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-300 mb-3">
                    <div>Request ID: 0x84f2...a3b9</div>
                    <div>Block: 42196</div>
                  </div>
                  <div className="mt-4 h-1 w-full bg-purple-800 bg-opacity-30 rounded-full overflow-hidden">
                    <div className="h-1 bg-gradient-to-r from-green-400 to-blue-500 w-2/3 rounded-full pulse-animation"></div>
                  </div>
                  
                  {/* Added 3D cube elements for decoration */}
                  <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-indigo-500 bg-opacity-20 rounded-lg transform rotate-12 animate-float-slow"></div>
                  <div className="absolute -left-2 -top-2 w-8 h-8 bg-purple-500 bg-opacity-20 rounded-lg transform -rotate-12 animate-float"></div>
                </div>
              </div>
            </ParallaxEffect>
          </div>
        </div>
      </section>

      {/* Features Section with 3D effects */}
      <section className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
        {/* Enhanced background decoration with parallax */}
        <ParallaxEffect speed={0.2}>
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900 dark:to-indigo-900 rounded-full opacity-40 blur-3xl"></div>
        </ParallaxEffect>
        <ParallaxEffect speed={0.1}>
          <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-gradient-to-tr from-indigo-100 to-blue-100 dark:from-indigo-900 dark:to-blue-900 rounded-full opacity-40 blur-3xl"></div>
        </ParallaxEffect>
        
        {/* 3D decorative elements */}
        <div className="absolute right-20 top-40 w-16 h-16 border-4 border-purple-200 dark:border-purple-800 border-opacity-30 rounded-lg transform rotate-12 perspective-1000" style={{ transformStyle: 'preserve-3d', animation: 'rotateSlow 15s infinite linear' }}></div>
        <div className="absolute left-32 bottom-32 w-10 h-10 border-2 border-indigo-200 dark:border-indigo-800 border-opacity-20 rounded transform -rotate-12 perspective-1000" style={{ transformStyle: 'preserve-3d', animation: 'rotateReverse 12s infinite linear' }}></div>
        
        <div className="container-content relative z-10">
          <ParallaxEffect speed={0.15} className="text-center mb-16">
            <div className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900 dark:bg-opacity-30 text-purple-600 dark:text-purple-300 rounded-full text-sm font-medium mb-4 shadow-lg backdrop-blur-sm">
              POWERFUL FEATURES
            </div>
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-indigo-700 dark:from-purple-400 dark:to-indigo-500 perspective-1000">
              What Makes Our VRF Special
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
              Designed from the ground up for performance, security, and seamless integration.
            </p>
          </ParallaxEffect>
          
          <div className="grid md:grid-cols-3 gap-10">
            <ParallaxEffect speed={0.2}>
              <div className="p-8 rounded-xl bg-gradient-to-br from-gray-50 to-white dark:from-slate-800 dark:to-slate-900 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-102 glow relative overflow-hidden group perspective-1000">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-2xl flex items-center justify-center mb-6 shadow-inner transform group-hover:rotate-3 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-semibold mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
                  Ultra-Low Latency
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300">
                  Get random numbers in <span className="font-bold text-green-600 dark:text-green-400">10-100ms</span>, dramatically faster than other blockchain VRF solutions that can take minutes or even hours.
                </p>
                
                <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-green-200 dark:bg-green-800 rounded opacity-20 transform rotate-12 group-hover:scale-150 group-hover:opacity-10 transition-all duration-700"></div>
              </div>
            </ParallaxEffect>
            
            <ParallaxEffect speed={0.3}>
              <div className="p-8 rounded-xl bg-gradient-to-br from-gray-50 to-white dark:from-slate-800 dark:to-slate-900 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-102 glow relative overflow-hidden group perspective-1000">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-2xl flex items-center justify-center mb-6 shadow-inner transform group-hover:rotate-3 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-semibold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  Cryptographic Verification
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300">
                  All random numbers include cryptographic proofs that can be verified on-chain for complete transparency and security.
                </p>
                
                <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-blue-200 dark:bg-blue-800 rounded opacity-20 transform rotate-12 group-hover:scale-150 group-hover:opacity-10 transition-all duration-700"></div>
              </div>
            </ParallaxEffect>
            
            <ParallaxEffect speed={0.25}>
              <div className="p-8 rounded-xl bg-gradient-to-br from-gray-50 to-white dark:from-slate-800 dark:to-slate-900 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-102 glow relative overflow-hidden group perspective-1000">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-2xl flex items-center justify-center mb-6 shadow-inner transform group-hover:rotate-3 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-semibold mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                  Simple Integration
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300">
                  Easy to implement in your smart contracts with minimal gas costs and straightforward SDK that works across multiple blockchains.
                </p>
                
                <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-purple-200 dark:bg-purple-800 rounded opacity-20 transform rotate-12 group-hover:scale-150 group-hover:opacity-10 transition-all duration-700"></div>
              </div>
            </ParallaxEffect>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-slate-800 dark:to-slate-900 relative">
        {/* Enhanced 3D background elements */}
        <div className="absolute left-0 top-0 w-full h-full overflow-hidden pointer-events-none">
          <ParallaxEffect speed={0.3}>
            <div className="absolute left-1/4 top-20 w-3 h-3 bg-purple-400 rounded-full pulse-animation blur-sm"></div>
          </ParallaxEffect>
          <ParallaxEffect speed={0.2}>
            <div className="absolute left-1/2 top-40 w-4 h-4 bg-indigo-400 rounded-full pulse-animation blur-sm"></div>
          </ParallaxEffect>
          <ParallaxEffect speed={0.4}>
            <div className="absolute right-1/3 top-60 w-3 h-3 bg-blue-400 rounded-full pulse-animation blur-sm"></div>
          </ParallaxEffect>
          <ParallaxEffect speed={0.15}>
            <div className="absolute right-1/4 top-96 w-4 h-4 bg-purple-400 rounded-full pulse-animation blur-sm"></div>
          </ParallaxEffect>
          
          {/* 3D cuboid decorations */}
          <div className="absolute right-10 top-32 perspective-1000">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-200 to-purple-200 dark:from-indigo-900 dark:to-purple-900 opacity-30 rounded transform rotate-45 hover:rotate-90 transition-transform duration-1000" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(45deg) rotateY(45deg)' }}></div>
          </div>
          <div className="absolute left-20 bottom-40 perspective-1000">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-200 to-indigo-200 dark:from-blue-900 dark:to-indigo-900 opacity-30 rounded transform -rotate-12 hover:rotate-12 transition-transform duration-1000" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(-35deg) rotateY(35deg)' }}></div>
          </div>
        </div>
        
        <div className="container-content relative z-10">
          <ParallaxEffect speed={0.1} className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-indigo-100 dark:bg-indigo-900 dark:bg-opacity-30 text-indigo-600 dark:text-indigo-300 rounded-full text-sm font-medium mb-4 shadow-lg backdrop-blur-sm border border-indigo-200 dark:border-indigo-800 border-opacity-40">
              APPLICATIONS
            </div>
            <h2 className="text-4xl font-bold mb-4 relative inline-block">
              <span className="relative z-10">Use Cases</span>
              <span className="absolute -bottom-2 left-0 w-full h-3 bg-indigo-200 dark:bg-indigo-800 bg-opacity-40 dark:bg-opacity-40 rounded-full -z-10 transform -skew-x-6"></span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
              RISE VRF powers a wide range of applications requiring fast, secure randomness.
            </p>
          </ParallaxEffect>
          
          <div className="grid md:grid-cols-2 gap-10">
            <div className="p-8 bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-700 relative overflow-hidden">
              <div className="absolute right-0 top-0 w-20 h-20 bg-green-400 dark:bg-green-600 opacity-10 rounded-bl-full"></div>
              <div className="flex items-start">
                <div className="mr-5">
                  <div className="p-3 bg-green-100 dark:bg-green-900 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Gaming</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Generate fair loot drops, random encounters, and gameplay outcomes with minimal latency.</p>
                  <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                    <li className="flex items-center"><span className="mr-2 text-green-500">✓</span> Loot boxes &amp; rewards</li>
                    <li className="flex items-center"><span className="mr-2 text-green-500">✓</span> Procedural generation</li>
                    <li className="flex items-center"><span className="mr-2 text-green-500">✓</span> Fair matchmaking</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="p-8 bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-700 relative overflow-hidden">
              <div className="absolute right-0 top-0 w-20 h-20 bg-purple-400 dark:bg-purple-600 opacity-10 rounded-bl-full"></div>
              <div className="flex items-start">
                <div className="mr-5">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">NFTs</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Assign truly random traits during minting for fair and verifiable collection distribution.</p>
                  <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                    <li className="flex items-center"><span className="mr-2 text-purple-500">✓</span> Random trait assignment</li>
                    <li className="flex items-center"><span className="mr-2 text-purple-500">✓</span> Fair rarity distribution</li>
                    <li className="flex items-center"><span className="mr-2 text-purple-500">✓</span> Verifiable randomness</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="p-8 bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-700 relative overflow-hidden">
              <div className="absolute right-0 top-0 w-20 h-20 bg-blue-400 dark:bg-blue-600 opacity-10 rounded-bl-full"></div>
              <div className="flex items-start">
                <div className="mr-5">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">DeFi</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Randomly select validators, liquidity providers, or lottery winners in a provably fair manner.</p>
                  <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                    <li className="flex items-center"><span className="mr-2 text-blue-500">✓</span> Fair lottery systems</li>
                    <li className="flex items-center"><span className="mr-2 text-blue-500">✓</span> Validator selection</li>
                    <li className="flex items-center"><span className="mr-2 text-blue-500">✓</span> Random reward distribution</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="p-8 bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-700 relative overflow-hidden">
              <div className="absolute right-0 top-0 w-20 h-20 bg-red-400 dark:bg-red-600 opacity-10 rounded-bl-full"></div>
              <div className="flex items-start">
                <div className="mr-5">
                  <div className="p-3 bg-red-100 dark:bg-red-900 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Security</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Generate random challenges and proofs for authentication systems with speed and security.</p>
                  <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                    <li className="flex items-center"><span className="mr-2 text-red-500">✓</span> Secure authentication</li>
                    <li className="flex items-center"><span className="mr-2 text-red-500">✓</span> Random security challenges</li>
                    <li className="flex items-center"><span className="mr-2 text-red-500">✓</span> Unpredictable key generation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Link 
              href="/docs" 
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg inline-block shadow-lg hover:shadow-xl transition-all btn-3d"
            >
              Explore the Documentation
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

```

End of src/app/page.tsx

---

## src/components/ClientHeroAnimation.tsx

```typescript
'use client';

import dynamic from 'next/dynamic';

// Dynamic import for the HeroAnimation component to avoid SSR issues
const HeroAnimation = dynamic(() => import('@/components/HeroAnimation'), {
  ssr: false
});

export default function ClientHeroAnimation() {
  return <HeroAnimation />;
}

```

End of src/components/ClientHeroAnimation.tsx

---

## src/components/CodeBlock.tsx

```typescript
"use client";

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface CodeBlockProps {
  code: string;
  language: string;
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative group rounded-lg overflow-hidden my-4 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
          {language}
        </span>
        <button
          onClick={copyToClipboard}
          className="text-xs bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 px-2 py-1 rounded border border-gray-300 dark:border-gray-600 transition-colors"
        >
          {copied ? (
            <span className="flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied
            </span>
          ) : (
            <span className="flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </span>
          )}
        </button>
      </div>
      <div className="dark:hidden">
        <SyntaxHighlighter
          language={language}
          style={vs}
          customStyle={{ margin: 0, padding: "1rem", background: "transparent" }}
          codeTagProps={{
            style: {
              fontSize: "0.9rem",
              fontFamily: "'JetBrains Mono', monospace"
            }
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
      <div className="hidden dark:block">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{ margin: 0, padding: "1rem", background: "transparent" }}
          codeTagProps={{
            style: {
              fontSize: "0.9rem",
              fontFamily: "'JetBrains Mono', monospace"
            }
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

```

End of src/components/CodeBlock.tsx

---

## src/components/DocsContent.tsx

```typescript
"use client";

import CodeBlock from './CodeBlock';

export default function DocsContent() {

  const basicExample = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IVRFConsumer} from './VRFCoordinator.sol';

interface IVRFCoordinator {
    function requestRandomNumbers(uint32, uint256) external returns (uint256);
}

contract BasicVRFConsumer is IVRFConsumer {
    IVRFCoordinator public immutable coordinator;
    uint256 public latestRandomNumber;
    mapping(uint256 => bool) private pending;

    constructor(address _coordinator) {
        coordinator = IVRFCoordinator(_coordinator);
    }

    function getRandomNumber() external returns (uint256 id) {
        id = coordinator.requestRandomNumbers(1, block.timestamp);
        pending[id] = true;
    }

    function rawFulfillRandomNumbers(uint256 id, uint256[] calldata nums) external override {
        require(msg.sender == address(coordinator), 'Only coord');
        require(pending[id]);
        if (nums.length > 0) {
            latestRandomNumber = nums[0];
        }
        delete pending[id];
    }
}`;

  const consumerContractExample = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IVRFConsumer {
    function rawFulfillRandomNumbers(
        uint256 requestId,
        uint256[] calldata randomNumbers
    ) external;
}

contract MyGame is IVRFConsumer {
    // VRF Coordinator contract
    address public vrfCoordinator;
    
    // Mapping to store request IDs
    mapping(uint256 => bool) public pendingRequests;
    
    // Event emitted when random numbers are received
    event RandomNumbersReceived(uint256 indexed requestId, uint256[] numbers);
    
    constructor(address _vrfCoordinator) {
        vrfCoordinator = _vrfCoordinator;
    }
    
    // Request random numbers from the VRF Coordinator
    function requestRandomNumbers(uint32 numNumbers) external returns (uint256) {
        // Call the VRF Coordinator to request random numbers
        uint256 requestId = IVRFCoordinator(vrfCoordinator).requestRandomNumbers(
            numNumbers, 
            uint256(blockhash(block.number - 1)) // Use a recent blockhash as the client seed
        );
        
        // Store the request ID
        pendingRequests[requestId] = true;
        
        return requestId;
    }
    
    // Callback function that receives random numbers
    function rawFulfillRandomNumbers(
        uint256 requestId,
        uint256[] calldata randomNumbers
    ) external override {
        // Verify caller is the VRF Coordinator
        require(msg.sender == vrfCoordinator, "Only VRF Coordinator can fulfill");
        
        // Verify this is a pending request
        require(pendingRequests[requestId], "Request not found");
        
        // Mark request as fulfilled
        delete pendingRequests[requestId];
        
        // Process the random numbers (game-specific logic)
        processRandomNumbers(requestId, randomNumbers);
        
        // Emit event with the random numbers
        emit RandomNumbersReceived(requestId, randomNumbers);
    }
    
    // Process the random numbers based on your game logic
    function processRandomNumbers(uint256 requestId, uint256[] memory randomNumbers) internal {
        // Your game-specific logic here
        // For example, determine a dice roll outcome
    }
}`;

  const shredsApiExample = `// JavaScript example using Shreds API
const { WebSocketClient } = require('@risechain/shred-api');

async function initShredsListener() {
  // Initialize WebSocket connection
  const client = new WebSocketClient('wss://shreds.risechain.com');
  
  // Your contract that implements IVRFConsumer
  const YOUR_CONTRACT_ADDRESS = '0x...'; 
  
  // Subscribe to the VRF callback event in your contract
  client.subscribeToEvents({
    contractAddress: YOUR_CONTRACT_ADDRESS,
    // This would be your event name, e.g., RandomNumbersReceived
    eventName: 'RandomNumbersReceived', 
    fromBlock: 'latest'
  });
  
  // Listen for events - this will trigger BEFORE block confirmation
  client.on('event', (event) => {
    // Process the event data
    const { requestId, numbers } = event.args;    
    // Update your UI or take action based on the result
    // Example: update UI with the random numbers
    console.log('Updating UI with random numbers:', numbers);
  });
}`;

  return (
    <section className="py-16 bg-white dark:bg-slate-900">
      <div className="container-content md:flex md:space-x-12">
        <nav className="md:w-48 mb-8 md:mb-0 sticky top-32 self-start max-h-[calc(100vh-8rem)] overflow-y-auto space-y-4 text-sm">
          <a href="#overview" className="block hover:underline">Overview</a>
          <a href="#fast-vrf" className="block hover:underline">Fast VRF</a>
          <a href="#shreds" className="block hover:underline">Shreds API</a>
          <a href="#integration" className="block hover:underline">Integration Guide</a>
          <a href="#contract-example" className="block hover:underline">Contract Example</a>
          <a href="#client-example" className="block hover:underline">Client Example</a>
          <a href="#how-it-works" className="block hover:underline">How VRF Works</a>
          <a href="#best-practices" className="block hover:underline">Best Practices</a>
          <a href="#roadmap" className="block hover:underline">Roadmap</a>
          <a href="#resources" className="block hover:underline">Resources</a>
        </nav>

        <div className="flex-1 space-y-16">
          <div id="overview" className="space-y-6">
            <h2 className="text-3xl font-bold">Overview</h2>
            <p>Offering sub-block or inter-block transaction confirmations unlocks use-cases and a UX not yet seen in crypto. However, crypto tooling today operates under the constraints of discrete blocks, not the continuous execution we enjoy with RISE.</p>
            <p>The first cab off the rank is randomness. Many use-cases demand randomness, however, typical randomness solutions take multiple blocks to receive a verifiable random number.</p>
            <p>At RISE, milliseconds matter, and multi-block randomness isn't good enough.</p>
            <ul className="list-disc pl-5 space-y-2 mt-4">
              <li>Ultra-low latency (as low as 10ms, typically within 100ms)</li>
              <li>Cryptographically provable random numbers</li>
              <li>Secure, tamper-proof generation</li>
              <li>Simple integration for developers</li>
              <li>Perfect for on-chain gaming, NFT minting, lotteries, and more</li>
            </ul>
          </div>

          <div id="fast-vrf" className="space-y-6">
            <h2 className="text-3xl font-bold">What is Fast VRF?</h2>
            <p>Fast VRF is a prototype for exploring protocol-native instant randomness, a solution delivering cryptographically secure randomness in real time. This is a major step forward for blockchain applications requiring verifiable entropy with minimal latency.</p>
            <p>If you request a random number onchain, the VRF transaction will arrive within 100ms, the time it takes to blink an eye.</p>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 mt-4 border border-purple-100 dark:border-purple-800">
              <h3 className="font-bold text-lg mb-2">Perfect For:</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <li className="flex items-center">
                  <span className="mr-2 text-purple-600 dark:text-purple-400">🎮</span> On-chain gaming
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-purple-600 dark:text-purple-400">🖼️</span> NFT minting
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-purple-600 dark:text-purple-400">🎫</span> Lotteries & raffles
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-purple-600 dark:text-purple-400">🔀</span> Random distributions
                </li>
              </ul>
            </div>
          </div>

          <div id="shreds" className="space-y-6">
            <h2 className="text-3xl font-bold">How It Works: Shreds API</h2>
            <p>Shreds are pre-confirmation transaction data available on the RISE Chain network. Unlike traditional blockchain transactions that require block confirmation (usually taking seconds to minutes), shreds give you access to transaction data almost instantly after broadcast - often in milliseconds.</p>
            
            <h3 className="text-xl font-bold mt-6">Why Use Shreds With VRF?</h3>
            <p>Traditional VRF implementations have a fundamental latency bottleneck: they must wait for block confirmation before processing random numbers. By using shreds, developers can:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li><strong>Reduce latency by ~99%</strong>: Get randomness in milliseconds instead of seconds</li>
              <li><strong>Improve user experience</strong>: Create responsive applications that don't leave users waiting</li>
              <li><strong>Enable new use cases</strong>: Build applications that require near-instant randomness, like real-time games</li>
            </ul>
            
            <h3 className="text-xl font-bold mt-6">Technical Architecture</h3>
            <p>When using Shreds with VRF, the process flow works as follows:</p>
            <ol className="list-decimal pl-5 space-y-2 mt-2">
              <li>Your contract requests random numbers from the VRF Coordinator</li>
              <li>The VRF Coordinator emits a RequestRaised event</li>
              <li>The RISE Chain node propagates this event data to the Shreds API within milliseconds</li>
              <li>The VRF backend fulfills the request with cryptographically secure random numbers</li>
              <li>The VRF Coordinator calls back to your contract with the random numbers</li>
              <li>Your application receives notification of the callback via the Shreds API in milliseconds</li>
              <li>Your frontend can update immediately, before block confirmation</li>
            </ol>
            
            <p className="font-medium mt-4">Try the <a href="https://www.npmjs.com/package/@risechain/shred-api" className="text-purple-600 dark:text-purple-400 underline">@risechain/shred-api</a> NPM package for working with Shreds.</p>
          </div>

          <div id="integration" className="space-y-6">
            <h2 className="text-3xl font-bold">Integration Guide</h2>
            <p>To use Fast VRF in your application, you'll need to integrate at two levels:</p>
            
            <h3 className="text-xl font-bold mt-6">1. Smart Contract Integration</h3>
            <p>Implement the <code>IVRFConsumer</code> interface in your contract and request random numbers from the coordinator:</p>
            <CodeBlock code={`// Request a random number
uint256 requestId = coordinator.requestRandomNumbers(1, uint256(blockhash(block.number - 1)));

// Store the requestId to validate the callback later
pendingRequests[requestId] = true;`} language="solidity" />
            
            <h3 className="text-xl font-bold mt-6">2. Frontend Integration with Shreds</h3>
            <p>Install the Shreds API SDK:</p>
            <CodeBlock code={`npm install @risechain/shred-api`} language="bash" />
          </div>

          <div id="contract-example" className="space-y-6">
            <h2 className="text-3xl font-bold">Contract Example</h2>
            <p>Complete example of a contract that implements the VRF Consumer interface:</p>
            <CodeBlock code={consumerContractExample} language="solidity" />
          </div>
          
          <div id="client-example" className="space-y-6">
            <h2 className="text-3xl font-bold">Client-Side Integration Example</h2>
            <p>Example of subscribing to VRF events using the Shreds API:</p>
            <CodeBlock code={shredsApiExample} language="javascript" />
          </div>

          <div id="how-it-works" className="space-y-6">
            <h2 className="text-3xl font-bold">How VRF Works</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Your contract requests random numbers from the VRF Coordinator.</li>
              <li>The Coordinator emits a RequestRaised event with requestId, requester, numNumbers, and clientSeed.</li>
              <li>The backend generates randomness using a secure algorithm and signs it.</li>
              <li>The backend submits the randomness with a cryptographic proof in a transaction.</li>
              <li>The Coordinator verifies the signature on-chain to ensure the randomness wasn't tampered with.</li>
              <li>Your contract's rawFulfillRandomNumbers function receives the verified random numbers.</li>
              <li>The Coordinator emits a RequestFulfilled event with the requestId.</li>
            </ol>
            <div className="bg-gray-50 dark:bg-slate-800/50 rounded-lg p-4 mt-4">
              <p className="font-medium">Note: The RequestFulfilled event emits only the requestId parameter, not the sender or random numbers. The event signature is:</p>
              <CodeBlock code={`event RequestFulfilled(uint256 indexed requestId);`} language="solidity" />
            </div>
          </div>
          
          <div id="best-practices" className="space-y-6">
            <h2 className="text-3xl font-bold">Best Practices</h2>
            <p>When implementing Fast VRF with Shreds:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Treat shred data as preliminary</strong>: Always indicate to users when results are pre-confirmation</li>
              <li><strong>Implement fallback mechanisms</strong>: In case the Shreds API connection fails, fall back to traditional event listening</li>
              <li><strong>Consider security implications</strong>: Remember that shreds are pre-confirmation data and could theoretically be reordered or dropped</li>
              <li><strong>Handle reconnections</strong>: Implement proper reconnection logic for WebSocket connections</li>
              <li><strong>Filter events properly</strong>: Only process events relevant to your specific use case/user</li>
            </ul>
          </div>
          
          <div id="roadmap" className="space-y-6">
            <h2 className="text-3xl font-bold">Roadmap</h2>
            <p>This is phase 1 to explore the demand from builders for this feature. If the demand is there, the next step will be truly instant randomness. Instant randomness is a step beyond fast VRF, introducing the ability to request randomness synchronously with protocol-native randomness.</p>
            <p>Our Fast VRF prototype is live today in a private beta. We welcome builders interested in leveraging it to reach out to the RISE team to get access. We're excited to see what this unlocks!</p>
          </div>

          <div id="resources" className="space-y-6">
            <h2 className="text-3xl font-bold">Resources</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><a href="https://blog.risechain.com/instant-blockchains-need-instant-randomness/" className="text-purple-600 dark:text-purple-400 hover:underline">Blog: Instant Blockchains Need Instant Randomness</a></li>
              <li><a href="https://github.com/SmoothBot/shred-api" className="text-purple-600 dark:text-purple-400 hover:underline">Shreds API Repository</a></li>
              <li><a href="https://docs.risechain.com" className="text-purple-600 dark:text-purple-400 hover:underline">RISE Documentation</a></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

```

End of src/components/DocsContent.tsx

---

## src/components/Footer.tsx

```typescript
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800">
      <div className="container-content py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5">
            <Link href="/" className="inline-block text-xl font-bold mb-4 flex items-center">
              <img src="/rise-logo.svg" alt="RISE logo" className="w-6 h-6 mr-2" />
              <span>Instant VRF</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Ultra-fast, secure randomness for your dApps</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Our Verifiable Random Function provides cryptographically secure randomness with response times as low as 10ms.</p>
          </div>
          
          <div className="md:col-span-3 md:ml-auto">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100 mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/docs" 
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link 
                  href="/monitor" 
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Live Monitor
                </Link>
              </li>
              <li>
                <a 
                  href="https://github.com/risechain/vrf-prototype" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100 mb-4">Connect</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://discord.gg/risechain" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Discord
                </a>
              </li>
              <li>
                <a 
                  href="https://twitter.com/risechain" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a 
                  href="mailto:info@risechain.io"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-slate-800 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">&copy; {new Date().getFullYear()} Rise Labs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

```

End of src/components/Footer.tsx

---

## src/components/Header.tsx

```typescript
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const isActive = (path: string) => {
    return pathname === path ? 'text-purple-500 dark:text-purple-400 font-medium' : 'text-gray-700 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400';
  };

  useEffect(() => {
    // Close mobile menu when path changes
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className={`sticky w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container-content flex justify-between items-center">
        <Link href="/" className="relative z-20 text-xl font-bold flex items-center">
          <img src="/rise-logo.svg" alt="RISE logo" className="w-6 h-6 mr-2" />
          <span>Instant VRF</span>
        </Link>
        
        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden relative z-20 p-1"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 flex flex-col justify-center items-center">
            <span 
              className={`block h-0.5 w-6 bg-gray-800 dark:bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`}
            />
            <span 
              className={`block h-0.5 bg-gray-800 dark:bg-white transition-all duration-300 my-1 ${mobileMenuOpen ? 'opacity-0 w-0' : 'opacity-100 w-6'}`}
            />
            <span 
              className={`block h-0.5 w-6 bg-gray-800 dark:bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}
            />
          </div>
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
          <ul className="flex space-x-8 font-medium">
            <li><Link href="/" className={`${isActive('/')} transition-colors duration-200`}>Home</Link></li>
            <li><Link href="/docs" className={`${isActive('/docs')} transition-colors duration-200`}>Documentation</Link></li>
            <li><Link href="/monitor" className={`${isActive('/monitor')} transition-colors duration-200`}>Live Monitor</Link></li>
            <li>
              <a 
                href="https://github.com/risechain/vrf-prototype" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm"
              >
                GitHub
              </a>
            </li>
          </ul>
        </nav>

        {/* Mobile Navigation Overlay */}
        <div 
          className={`fixed inset-0 bg-white/95 dark:bg-slate-900/98 z-10 lg:hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <nav className="h-full flex flex-col justify-center items-center">
            <ul className="space-y-8 text-center">
              <li><Link href="/" className={`text-2xl ${isActive('/')}`}>Home</Link></li>
              <li><Link href="/docs" className={`text-2xl ${isActive('/docs')}`}>Documentation</Link></li>
              <li><Link href="/monitor" className={`text-2xl ${isActive('/monitor')}`}>Live Monitor</Link></li>
              <li className="pt-4">
                <a 
                  href="https://github.com/risechain/vrf-prototype" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors inline-block"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

```

End of src/components/Header.tsx

---

## src/components/Hero.tsx

```typescript
export default function Hero() {
  return (
    <section id="intro" className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-5xl font-bold mb-6">Ultra-Fast Verifiable Random Function</h1>
        <p className="text-xl mb-8">
          Generate secure, verifiable randomness with response times as low as 10ms - faster than the blink of an eye.
        </p>
        <div className="bg-black/30 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">What is VRF?</h2>
          <p className="mb-4">
            A Verifiable Random Function (VRF) is a cryptographic primitive that generates random numbers with 
            mathematical proofs that anyone can verify. RISE's VRF prototype delivers:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Ultra-low latency:</strong> Get random numbers in 10-100ms</li>
            <li><strong>Cryptographic verification:</strong> All random numbers include proofs that can be verified on-chain</li>
            <li><strong>Secure implementation:</strong> Tamper-proof and bias-resistant</li>
            <li><strong>Simple integration:</strong> Easy to implement in your smart contracts</li>
          </ul>
        </div>
        <div className="flex space-x-4">
          <a
            href="#docs"
            className="bg-white text-purple-900 px-6 py-3 rounded-lg font-semibold hover:bg-purple-100 transition"
          >
            Read the Docs
          </a>
          <a 
            href="#monitor" 
            className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
          >
            View Live Monitor
          </a>
        </div>
      </div>
    </section>
  );
}

```

End of src/components/Hero.tsx

---

## src/components/HeroAnimation.tsx

```typescript
'use client';

import { useEffect, useRef } from 'react';

const HeroAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    // Initialize
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Create particles
    class Particle {
      x: number;
      y: number;
      z: number;
      size: number;
      color: string;
      speed: number;
      vx: number;
      vy: number;
      vz: number;
      canvasWidth: number;
      canvasHeight: number;

      constructor() {
        // Store canvas dimensions to avoid null references later
        this.canvasWidth = canvas?.width || window.innerWidth;
        this.canvasHeight = canvas?.height || window.innerHeight;
        
        this.x = Math.random() * this.canvasWidth;
        this.y = Math.random() * this.canvasHeight;
        this.z = Math.random() * 1000;
        this.size = Math.random() * 5 + 0.5;
        
        // Create colors in purple/blue spectrum
        const hue = Math.floor(Math.random() * 60) + 240; // 240-300 is purple/blue range
        const saturation = Math.floor(Math.random() * 30) + 70; // 70-100%
        const lightness = Math.floor(Math.random() * 20) + 70; // 70-90%
        this.color = `hsla(${hue}, ${saturation}%, ${lightness}%, ${Math.random() * 0.5 + 0.2})`;
        
        this.speed = Math.random() * 0.5 + 0.2;
        this.vx = Math.random() * 0.5 - 0.25;
        this.vy = Math.random() * 0.5 - 0.25;
        this.vz = this.speed;
      }

      update() {
        // Update position
        this.x += this.vx;
        this.y += this.vy;
        this.z -= this.vz;
        
        // Reset if too far or too close
        if (this.z <= 0) {
          this.z = 1000;
          this.x = Math.random() * this.canvasWidth;
          this.y = Math.random() * this.canvasHeight;
        }
      }

      draw() {
        if (!canvas || !ctx) return;
        
        const scale = 100 / this.z;
        const x = this.x * scale + this.canvasWidth / 2;
        const y = this.y * scale + this.canvasHeight / 2;
        const size = this.size * scale;
        
        // Only draw if within canvas bounds
        if (x >= 0 && x <= this.canvasWidth && y >= 0 && y <= this.canvasHeight) {
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.fill();
        }
      }
    }

    // Create particle array
    const particleCount = 150;
    const particles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation
    let requestId: number;
    
    const animate = () => {
      if (!canvas || !ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      requestId = requestAnimationFrame(animate);
    };
    
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(requestId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full opacity-40" 
      style={{ zIndex: 1 }}
    />
  );
};

export default HeroAnimation;

```

End of src/components/HeroAnimation.tsx

---

## src/components/Monitoring.tsx

```typescript
"use client";

import { useEffect, useState } from 'react';
import { getRecentEvents, subscribeToEvents } from '@/lib/vrf-contract';
import { DEFAULT_CHAIN_ID, chains } from '@/lib/constants';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import moment from 'moment';

interface VRFEvent {
  requestId: string;
  sender?: string;
  blockNumber: number;
  transactionHash: string;
  timestamp: number | null;
  type?: string;
  numNumbers?: number;
  clientSeed?: string;
  randomNumbers?: string[];
}

interface ChartDataPoint {
  time: string;
  requests: number;
  fulfillments: number;
}

interface LatencyStats {
  avg: number;
  min: number;
  max: number;
  count: number;
}

export default function Monitoring() {
  const [events, setEvents] = useState<VRFEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [latencyStats, setLatencyStats] = useState<LatencyStats>({
    avg: 0,
    min: 0,
    max: 0,
    count: 0
  });
  const [selectedChainId, setSelectedChainId] = useState(DEFAULT_CHAIN_ID);
  const [dataSource, setDataSource] = useState<string | null>(null);
  
  // Fetch historical events
  const fetchEvents = async (background: boolean = false) => {
    try {
      if (!background) {
        setLoading(true);
        // Clear any previous errors when starting a new fetch
        setError(null);
        setErrorDetails(null);
      }
      
      const response = await getRecentEvents(selectedChainId);
      const { requests, fulfillments, source, error, debug } = response;
      
      // Set the data source (blockchain, error)
      setDataSource(source || null);
      
      // Handle API-reported errors
      if (error && !background) {
        setError(error);
        if (debug?.error) {
          setErrorDetails(debug.error);
          console.error('API reported error details:', debug.error);
        }
      }
      
      // If both arrays are empty, it might indicate an issue with the API
      if (requests.length === 0 && fulfillments.length === 0 && !background) {
        // Don't set error in background mode to avoid disrupting the UI
        console.warn('No data received from API');
        if (!error) {
          setError('No event data available. The blockchain RPC endpoint may be unreachable.');
        }
      }

      const requestMap: Record<string, any> = {};
      requests.forEach((r: any) => {
        requestMap[r.requestId] = r;
      });

      // Combine and sort events
      const allEvents = [
        ...requests.map((r: any) => ({ ...r, type: r.type || 'request' })),
        ...fulfillments.map((f: any) => ({
          ...f,
          sender: requestMap[f.requestId]?.sender,
          type: f.type || 'fulfillment'
        }))
      ].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
      
      setEvents(allEvents);
      
      // Calculate latency stats
      calculateLatencyStats(requests, fulfillments);
      
      if (!background) {
        setLoading(false);
      }
    } catch (err: any) {
      console.error('Error fetching events:', err);
      if (!background) {
        setError('Failed to load VRF events. Please try again later.');
        setErrorDetails(err?.message || 'Unknown error');
        setLoading(false);
      }
      // Don't update state if this was a background update - keep previous data visible
    }
  };
  
  useEffect(() => {
    // Initial data fetch
    fetchEvents();

    // Configure websocket subscription with error handling
    let unsubscribe: () => void;
    try {
      unsubscribe = subscribeToEvents((newEvent: any) => {
        setEvents(prev => {
          if (newEvent.type === 'fulfillment' && !newEvent.sender) {
            const req = prev.find(e => e.type === 'request' && e.requestId === newEvent.requestId);
            if (req) {
              newEvent.sender = req.sender;
            }
          }
          return [newEvent, ...prev];
        });
      }, selectedChainId);
    } catch (error) {
      console.error('WebSocket subscription failed:', error);
      // Don't show error to user, it will still work with polling
      unsubscribe = () => {}; // Empty function as fallback
    }

    // Set up polling as backup for real-time updates
    const interval = setInterval(() => {
      fetchEvents(true);
    }, 10000); // Increased to 10 seconds to reduce load

    return () => {
      // Clean up subscriptions
      try {
        unsubscribe();
      } catch (error) {
        console.error('Error unsubscribing:', error);
      }
      clearInterval(interval);
    };
  }, [selectedChainId]);
  
  // Calculate latency between request and fulfillment
  const calculateLatencyStats = (requests: any[], fulfillments: any[]) => {
    const latencies: number[] = [];
    const requestMap: Record<string, any> = {};
    
    // Map requests by ID
    requests.forEach((req: any) => {
      requestMap[req.requestId] = req;
    });
    
    // Calculate latencies
    fulfillments.forEach((fulfill: any) => {
      const request = requestMap[fulfill.requestId];
      if (request && fulfill.timestamp && request.timestamp) {
        const latencySeconds = fulfill.timestamp - request.timestamp;
        latencies.push(latencySeconds);
      }
    });
    
    if (latencies.length > 0) {
      const sum = latencies.reduce((a, b) => a + b, 0);
      setLatencyStats({
        avg: sum / latencies.length,
        min: Math.min(...latencies),
        max: Math.max(...latencies),
        count: latencies.length
      });
    }
  };
  
  const formatTimestamp = (timestamp: number): string => {
    return moment.unix(timestamp).format('MMM D, YYYY HH:mm:ss');
  };
  
  // Prepare data for chart with improved error handling
  const prepareChartData = (): ChartDataPoint[] => {
    // Create a map to store data points by hour
    const timeMap: Record<string, ChartDataPoint> = {};
    
    // Calculate timestamps for the last 24 hours
    const now = Math.floor(Date.now() / 1000);
    const oneDayAgo = now - 24 * 60 * 60;
    
    // First, create a complete set of hourly data points for the last 24 hours
    // This ensures we have all hours represented even if there's no data
    for (let hour = 0; hour < 24; hour++) {
      const hourTimestamp = oneDayAgo + hour * 60 * 60;
      const timeKey = moment.unix(hourTimestamp).format('YYYY-MM-DD-HH');
      const displayTime = moment.unix(hourTimestamp).format('MMM D, HH:mm');
      timeMap[timeKey] = { time: displayTime, requests: 0, fulfillments: 0 };
    }
    
    // Then populate with actual data if we have events
    if (events && events.length > 0) {
      events.forEach(event => {
        if (!event || !event.timestamp) return;
        
        try {
          // Use both date and specific hour:minute for better x-axis display
          const timeKey = moment.unix(event.timestamp).format('YYYY-MM-DD-HH');
          
          // If we already have this hour in our timeMap (from the 24-hour initialization)
          if (timeMap[timeKey]) {
            if (event.type === 'request') {
              timeMap[timeKey].requests += 1;
            } else if (event.type === 'fulfillment') {
              timeMap[timeKey].fulfillments += 1;
            }
          } else {
            // If we somehow have events outside our 24-hour window, add them too
            const displayTime = moment.unix(event.timestamp).format('MMM D, HH:mm');
            timeMap[timeKey] = { 
              time: displayTime, 
              requests: event.type === 'request' ? 1 : 0, 
              fulfillments: event.type === 'fulfillment' ? 1 : 0 
            };
          }
        } catch (error) {
          console.error('Error processing event for chart:', error);
        }
      });
    }
    
    // Convert to array and sort chronologically
    const dataArray = Object.values(timeMap);
    
    // For debugging
    console.log('Chart data points:', dataArray.length, dataArray);
    
    // Sort by timestamp for proper order
    return dataArray.sort((a, b) => {
      const dateA = moment(a.time, 'MMM D, HH:mm');
      const dateB = moment(b.time, 'MMM D, HH:mm');
      return dateA.valueOf() - dateB.valueOf();
    });
  };
  
  return (
    <section className="py-12 bg-white dark:bg-slate-900 text-gray-800 dark:text-white">
      <div className="container-content">
        {/* Network Selector and Data Source Indicator */}
        <div className="mb-8 flex justify-between items-center">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold">LiveMonitor - {chains[selectedChainId].name}</h2>
            {dataSource === 'mock' && (
              <span className="ml-3 px-2 py-1 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 text-xs font-medium rounded-full">
                Mock Data
              </span>
            )}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedChainId(11155008)}
              className={`px-4 py-2 rounded ${selectedChainId === 11155008 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              {chains[11155008].name}
            </button>
            {/* Second button commented out as we're only using staging for now */}
            {/* <button
              onClick={() => setSelectedChainId(11155931)}
              className={`px-4 py-2 rounded ${selectedChainId === 11155931 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              {chains[11155931].name}
            </button> */}
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-purple-500 border-r-2 border-purple-500 border-b-0 border-l-0"></div>
          </div>
        ) : error ? (
          <div className="p-6 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-center">
            <p className="text-red-700 dark:text-red-300 font-semibold mb-2">{error}</p>
            {errorDetails && (
              <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/50 rounded text-left overflow-auto max-h-40 text-xs font-mono">
                <p className="text-red-800 dark:text-red-200 whitespace-pre-wrap break-all">{errorDetails}</p>
              </div>
            )}
            <p className="text-sm mt-4 text-gray-600 dark:text-gray-400">
              The blockchain RPC endpoint may be unavailable. Try switching networks or try again later.
            </p>
            <div className="mt-4 flex space-x-3 justify-center">
              <button 
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all"
                onClick={() => {
                  setLoading(true);
                  setError(null);
                  setErrorDetails(null);
                  fetchEvents();
                }}
              >
                Try Again
              </button>
              {selectedChainId === 11155008 ? (
                <button
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-all"
                  onClick={() => {
                    setSelectedChainId(11155931);
                    setLoading(true);
                    setError(null);
                    setErrorDetails(null);
                  }}
                >
                  Try Mainnet
                </button>
              ) : (
                <button
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-all"
                  onClick={() => {
                    setSelectedChainId(11155008);
                    setLoading(true);
                    setError(null);
                    setErrorDetails(null);
                  }}
                >
                  Try Staging
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 dark:bg-slate-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-1">Total Requests</h3>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {events.filter(e => e.type === 'request').length}
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-slate-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-1">Total Fulfillments</h3>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {events.filter(e => e.type === 'fulfillment').length}
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-slate-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-1">Avg. Response Time</h3>
                <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                  {latencyStats.avg > 0 ? `${latencyStats.avg.toFixed(2)}s` : 'N/A'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Min: {latencyStats.min > 0 ? `${latencyStats.min.toFixed(2)}s` : 'N/A'} • 
                  Max: {latencyStats.max > 0 ? `${latencyStats.max.toFixed(2)}s` : 'N/A'}
                </p>
              </div>
            </div>
            
            {/* Activity Chart */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-xl font-semibold mb-6">24 Hour Activity</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={prepareChartData()}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
                    <XAxis dataKey="time" stroke="#6b7280" className="dark:stroke-gray-400" />
                    <YAxis stroke="#6b7280" className="dark:stroke-gray-400" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255,255,255,0.95)', 
                        color: '#111827',
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.5rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      }}
                      itemStyle={{ color: '#111827' }}
                      labelStyle={{ fontWeight: 'bold', marginBottom: '0.5rem' }}
                      cursor={{ stroke: '#6b7280', strokeWidth: 1 }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="requests" 
                      name="Requests"
                      stroke="#8b5cf6"
                      fill="#8b5cf620"
                      activeDot={{ stroke: '#1e40af', strokeWidth: 2, r: 6 }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="fulfillments" 
                      name="Fulfillments"
                      stroke="#10b981" 
                      fill="#10b98120" 
                      activeDot={{ stroke: '#047857', strokeWidth: 2, r: 6 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Recent Events Table */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-6">Recent Events</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Request ID</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Sender</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Timestamp</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {events.slice(0, 10).map((event, index) => (
                      <tr key={`${event.type}-${event.requestId}-${index}`}>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            event.type === 'request'
                              ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                              : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          }`}>
                            {event.type === 'request' ? 'Request' : 'Fulfillment'}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap font-mono text-sm">
                          {event.requestId.substring(0, 10)}...
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap font-mono text-sm">
                          {event.sender ? `${event.sender.substring(0, 6)}...${event.sender.substring(38)}` : 'N/A'}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          {event.timestamp ? formatTimestamp(event.timestamp) : 'N/A'}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          {event.type === 'request' ? (
                            <span>Requested {event.numNumbers} numbers</span>
                          ) : (
                            <span>Fulfilled</span>
                          )}
                        </td>
                      </tr>
                    ))}
                    {events.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
                          No events found on {selectedChainId}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
      {dataSource && dataSource !== 'blockchain' && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Data source: {dataSource}. Blockchain data may be unavailable.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

```

End of src/components/Monitoring.tsx

---

## src/components/ParallaxEffect.tsx

```typescript
'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

const ParallaxEffect = ({ children, speed = 0.5, className = '' }: ParallaxProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    let startScrollPosition = window.scrollY;
    let ticking = false;
    let animationFrameId: number;
    
    const updatePosition = () => {
      if (!element) return;
      
      const scrollPosition = window.scrollY;
      const elementTop = element.offsetTop;
      const elementHeight = element.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Check if element is in viewport
      if (
        scrollPosition + windowHeight > elementTop && 
        scrollPosition < elementTop + elementHeight
      ) {
        // Calculate how far the element is from the top of the viewport
        const scrollDistance = scrollPosition - startScrollPosition;
        const translateY = scrollDistance * speed;
        
        // Apply the transform
        element.style.transform = `translate3d(0, ${translateY}px, 0)`;
      }
      
      ticking = false;
    };
    
    const onScroll = () => {
      if (!ticking) {
        animationFrameId = window.requestAnimationFrame(updatePosition);
        ticking = true;
      }
    };
    
    startScrollPosition = window.scrollY;
    window.addEventListener('scroll', onScroll);
    
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [speed]);
  
  return (
    <div ref={elementRef} className={`transition-transform duration-200 ${className}`}>
      {children}
    </div>
  );
};

export default ParallaxEffect;

```

End of src/components/ParallaxEffect.tsx

---

## src/types/react-syntax-highlighter.d.ts

```typescript
declare module 'react-syntax-highlighter';
declare module 'react-syntax-highlighter/dist/cjs/styles/prism';

```

End of src/types/react-syntax-highlighter.d.ts

---

