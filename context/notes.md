Rise Chain Shreds API ⚡
Shreds are a revolutionary feature of Rise Chain that provides developers with access to pre-confirmation transaction data. This allows applications to react to blockchain events in milliseconds, a significant improvement over the seconds or even minutes required when waiting for full block confirmations.

Non-Technical Overview
Imagine you're playing a fast-paced online game on the blockchain. In a traditional blockchain, every action you take (like swinging a sword or casting a spell) has to be included in a "block" before it's considered final. This can cause a noticeable delay, making the game feel sluggish.

Shreds solve this problem by providing a real-time stream of transactions before they are finalized into blocks. This "shredstream" gives developers a sneak peek at what's about to happen on the blockchain, allowing them to update the game state almost instantly. This results in a much smoother and more responsive user experience, which is crucial for applications like gaming, real-time finance, and more.

Technical Deep-Dive
For developers, Shreds offer a powerful new way to build high-performance dApps. The core of the Shreds API is a WebSocket connection that streams transaction data as it enters the mempool.

Key Features & Benefits:
Ultra-Low Latency: The primary benefit of Shreds is the dramatic reduction in latency. By processing transactions pre-confirmation, applications can achieve near-instantaneous response times, a 99% improvement in some cases.
WebSocket Connection: A persistent WebSocket connection to the Shreds API provides a continuous stream of transaction data. The system is designed to be resilient, with automatic reconnection in case of a lost connection.
Pre-Confirmation Processing: This allows your application to begin processing logic as soon as a transaction is detected in the mempool, without waiting for it to be included in a block.
Transaction Monitoring: The API allows for tracking the status of a transaction from its initial submission all the way through to its on-chain confirmation.
How to Integrate with Shreds
The provided VRF prototype system showcases a practical implementation of Shreds integration. Here's a conceptual guide for integrating Shreds into your own application:

Establish a WebSocket Connection: Your backend service needs to connect to the Shreds WebSocket endpoint. The URL for the testnet is wss://shreds.testnet.riselabs.xyz.
Listen for Relevant Transactions: Once connected, your application will receive a stream of all transactions entering the mempool. You'll need to filter these to identify the ones relevant to your dApp (e.g., calls to your smart contract's functions).
Process Pre-Confirmation: When a relevant transaction is detected, your backend can immediately begin its processing logic. For example, in the case of the VRF system, the backend generates a random number and a cryptographic proof.
Submit Fulfillment Transaction: After processing, your backend can submit a corresponding transaction (e.g., fulfilling the random number request) with optimized gas settings.
Here's an example of how to run a Shreds-enabled backend from the provided README.md:

Bash

# Run the Shreds-enabled backend 
make run-shred-staging
This command starts the backend service that connects to the Shreds API, listens for VRF requests, and processes them in near real-time.

Verifiable Random Function (VRF) 🎲
The Verifiable Random Function (VRF) system is a comprehensive solution for generating cryptographically secure random numbers for blockchain applications. This is essential for any on-chain application that requires a fair and unpredictable source of randomness, such as games, lotteries, and NFT mints.

Non-Technical Overview
Many blockchain applications need a source of randomness that is both unpredictable and tamper-proof. For example, if you're playing a dice game on the blockchain, you need to be sure that the outcome of the dice roll is truly random and hasn't been manipulated by the game developer or another player.

The VRF system provides this by using a combination of off-chain computation and on-chain verification. When a random number is needed, a request is sent to a backend service. This service generates the random number and a special cryptographic "proof". This proof is then sent back to the smart contract, which can use it to verify that the random number was generated fairly and without any funny business.

Architecture and Implementation
The provided VRF system utilizes a hybrid on-chain/off-chain architecture to provide low-latency, verifiable randomness. This is in contrast to an "enshrined" VRF, which would be built directly into the blockchain's core protocol. While an enshrined VRF offers a high degree of decentralization, the hybrid model provides flexibility and performance benefits.

Here’s a breakdown of the system's architecture:

Code snippet

sequenceDiagram
  participant UserContract
  participant VRFCoordinator (Solidity)
  participant RustBackend (Fly.io)
  participant EthereumL2

  UserContract->>VRFCoordinator: requestRandomNumbers(numNumbers, clientSeed)
  VRFCoordinator-->>RustBackend: RequestRaised(id, sender,…)
  Note right of RustBackend: 1) Generate random numbers<br>2) Create ECDSA signature over<br>(requestId, clientSeed, randomNumbers)
  RustBackend->>VRFCoordinator: fulfillRequest(id, randomNumbers, ecdsaProof)
  Note right of VRFCoordinator: Verify ECDSA signature<br>ensuring the backend signed<br>the exact data submitted
  VRFCoordinator->>UserContract: callback(id, randomNumbers)
Smart Contracts (Solidity): The core of the on-chain component is the VRFCoordinator.sol contract. This contract is responsible for managing requests for random numbers and, crucially, for verifying the cryptographic proofs that accompany them.
Backend Service (Rust): A high-performance Rust backend listens for events from the VRFCoordinator contract. When a new request is detected, this service generates the random number(s) and an ECDSA signature. This signature serves as the cryptographic proof.
Monitoring System (Rust): A separate service provides real-time metrics and alerting for system health and performance, ensuring reliability.
How to Integrate the VRF into Your dApp
Integrating the VRF system into your smart contracts is straightforward. Here are the basic steps, as outlined in the README.md:

Import the VRF Interface: Your consumer contract needs to import the IVRFConsumer interface from the VRFCoordinator.sol contract.

Solidity

import {IVRFConsumer} from "./VRFCoordinator.sol";
Implement the Callback Function: Your contract must implement the vrfFulfill function. This is the function that the VRFCoordinator will call to deliver the random numbers to your application.

Solidity

contract MyGame is IVRFConsumer {
   // Required callback function
   function vrfFulfill(uint256 requestId, uint256[] calldata randomNumbers) external {
       // Your logic to process the random numbers goes here
   }
}
Request Random Numbers: To get a random number, your contract simply calls the requestRandomNumbers function on the VRFCoordinator contract, specifying how many numbers you need and providing a clientSeed for additional entropy.

Solidity

function requestRandom(uint256 numNumbers, uint256 clientSeed) external {
   vrfCoordinator.requestRandomNumbers(numNumbers, clientSeed);
}
By following this pattern, you can easily integrate a secure and reliable source of randomness into your dApps, unlocking a wide range of new possibilities.