'use client';

import DocPage from '@/components/templates/DocPage';
import CodeBlock from '@/components/ui/CodeBlock';
import { motion } from 'framer-motion';

export default function FastVRFCodeExamples() {
  return (
    <DocPage
      title="Fast VRF Code Examples"
      description="Learn how to integrate Fast VRF into your application"
      currentSection="fast-vrf"
    >
      {/* Basic Integration */}
      <section id="basic-integration" className="mb-16">
        <h2>Basic Integration</h2>
        <p className="mb-6">Simple example of integrating VRF into your smart contract</p>
        
        <CodeBlock
          language="solidity"
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// VRF Interfaces
interface IVRFCoordinator {
    function requestRandomNumbers(uint32 numNumbers, uint256 seed) external returns (uint256);
}

interface IVRFConsumer {
    function rawFulfillRandomNumbers(
        uint256 requestId,
        uint256[] memory randomNumbers
    ) external;
}

contract MyRandomContract is IVRFConsumer {
    IVRFCoordinator public immutable coordinator;
    
    mapping(uint256 => bool) public pendingRequests;
    mapping(uint256 => uint256[]) public randomResults;
    
    event RandomNumbersRequested(uint256 requestId);
    event RandomNumbersReceived(uint256 requestId, uint256[] randomNumbers);
    
    constructor(address _coordinator) {
        coordinator = IVRFCoordinator(_coordinator);
    }
    
    function requestRandom() external returns (uint256 requestId) {
        // Request 3 random numbers with a seed
        uint256 seed = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender)));
        requestId = coordinator.requestRandomNumbers(3, seed);
        pendingRequests[requestId] = true;
        emit RandomNumbersRequested(requestId);
    }
    
    function rawFulfillRandomNumbers(
        uint256 requestId,
        uint256[] memory randomNumbers
    ) external override {
        require(msg.sender == address(coordinator), "Only VRF coordinator");
        require(pendingRequests[requestId], "Request not found");
        
        randomResults[requestId] = randomNumbers;
        pendingRequests[requestId] = false;
        
        emit RandomNumbersReceived(requestId, randomNumbers);
    }
}`}
        />
      </section>

      {/* Simple Dice Game */}
      <section id="dice-game" className="mb-16">
        <h2>Simple Dice Game</h2>
        <p className="mb-6">On-chain dice game using VRF for fair randomness</p>
        
        <CodeBlock
          language="solidity"
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// VRF Interfaces
interface IVRFCoordinator {
    function requestRandomNumbers(uint32 numNumbers, uint256 seed) external returns (uint256);
}

interface IVRFConsumer {
    function rawFulfillRandomNumbers(
        uint256 requestId,
        uint256[] memory randomNumbers
    ) external;
}

contract DiceGame is IVRFConsumer {
    IVRFCoordinator public immutable coordinator;
    mapping(uint256 => address) private requestOwner;
    
    event DiceRollRequested(uint256 indexed requestId, address indexed player);
    event DiceRollCompleted(uint256 indexed requestId, address indexed player, uint256 outcome);

    constructor() { 
        coordinator = IVRFCoordinator(0x9d57aB4517ba97349551C876a01a7580B1338909); 
    }

    function rollDice() external returns (uint256 requestId) {
        // Generate seed for randomness request
        uint256 seed = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, block.number)));
        requestId = coordinator.requestRandomNumbers(1, seed);
        requestOwner[requestId] = msg.sender;
        emit DiceRollRequested(requestId, msg.sender);
    }

    function rawFulfillRandomNumbers(
        uint256 requestId,
        uint256[] memory randomNumbers
    ) external override {
        require(msg.sender == address(coordinator), "Only coordinator");
        require(randomNumbers.length > 0, "No random numbers");
        
        address player = requestOwner[requestId];
        require(player != address(0), "Unknown request");
        
        uint256 outcome = (randomNumbers[0] % 6) + 1;
        emit DiceRollCompleted(requestId, player, outcome);
        
        delete requestOwner[requestId];
    }
}`}
        />
      </section>

      {/* NFT with Random Traits */}
      <section id="random-nft" className="mb-16">
        <h2>NFT with Random Traits</h2>
        <p className="mb-6">Mint NFTs with verifiably random attributes</p>
        
        <CodeBlock
          language="solidity"
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// VRF Interfaces
interface IVRFCoordinator {
    function requestRandomNumbers(uint32 numNumbers, uint256 seed) external returns (uint256);
}

interface IVRFConsumer {
    function rawFulfillRandomNumbers(
        uint256 requestId,
        uint256[] memory randomNumbers
    ) external;
}

contract RandomNFT is ERC721, IVRFConsumer {
    IVRFCoordinator public immutable coordinator;
    
    struct NFTTraits {
        uint8 rarity;    // 1-100
        uint8 strength;  // 1-100  
        uint8 magic;     // 1-100
    }
    
    mapping(uint256 => NFTTraits) public tokenTraits;
    mapping(uint256 => address) private pendingMints;
    uint256 private nextTokenId = 1;
    
    constructor() ERC721("RandomNFT", "RNFT") {
        coordinator = IVRFCoordinator(0x9d57aB4517ba97349551C876a01a7580B1338909);
    }
    
    function mintRandom() external returns (uint256 requestId) {
        // Generate seed for 3 random numbers (for traits)
        uint256 seed = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, nextTokenId)));
        requestId = coordinator.requestRandomNumbers(3, seed);
        pendingMints[requestId] = msg.sender;
    }
    
    function rawFulfillRandomNumbers(
        uint256 requestId,
        uint256[] memory randomNumbers
    ) external override {
        require(msg.sender == address(coordinator), "Only coordinator");
        require(randomNumbers.length >= 3, "Need 3 random numbers");
        
        address recipient = pendingMints[requestId];
        require(recipient != address(0), "Unknown request");
        
        uint256 tokenId = nextTokenId++;
        
        // Generate random traits
        tokenTraits[tokenId] = NFTTraits({
            rarity: uint8((randomNumbers[0] % 100) + 1),
            strength: uint8((randomNumbers[1] % 100) + 1),
            magic: uint8((randomNumbers[2] % 100) + 1)
        });
        
        _mint(recipient, tokenId);
        delete pendingMints[requestId];
    }
}`}
        />
      </section>

      {/* Lottery System */}
      <section id="lottery-system" className="mb-16">
        <h2>Lottery System</h2>
        <p className="mb-6">Fair lottery contract using VRF for winner selection</p>
        
        <CodeBlock
          language="solidity"
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// VRF Interfaces
interface IVRFCoordinator {
    function requestRandomNumbers(uint32 numNumbers, uint256 seed) external returns (uint256);
}

interface IVRFConsumer {
    function rawFulfillRandomNumbers(
        uint256 requestId,
        uint256[] memory randomNumbers
    ) external;
}

contract Lottery is IVRFConsumer {
    IVRFCoordinator public immutable coordinator;
    
    address[] public participants;
    address public winner;
    uint256 public drawRequestId;
    bool public drawInProgress;
    
    event WinnerSelected(address winner, uint256 prize);
    
    constructor() {
        coordinator = IVRFCoordinator(0x9d57aB4517ba97349551C876a01a7580B1338909);
    }
    
    function enter() external payable {
        require(msg.value >= 0.01 ether, "Minimum 0.01 ETH");
        participants.push(msg.sender);
    }
    
    function drawWinner() external {
        require(participants.length > 0, "No participants");
        require(!drawInProgress, "Draw in progress");
        
        drawInProgress = true;
        uint256 seed = uint256(keccak256(abi.encodePacked(block.timestamp, participants.length)));
        drawRequestId = coordinator.requestRandomNumbers(1, seed);
    }
    
    function rawFulfillRandomNumbers(
        uint256 requestId,
        uint256[] memory randomNumbers
    ) external override {
        require(msg.sender == address(coordinator), "Only coordinator");
        require(requestId == drawRequestId, "Wrong request");
        require(drawInProgress, "No draw in progress");
        
        uint256 winnerIndex = randomNumbers[0] % participants.length;
        winner = participants[winnerIndex];
        
        uint256 prize = address(this).balance;
        payable(winner).transfer(prize);
        
        emit WinnerSelected(winner, prize);
        
        // Reset
        delete participants;
        drawInProgress = false;
    }
}`}
        />
      </section>

      {/* Shreds API Integration */}
      <section id="shreds-integration" className="mb-16">
        <h2>Shreds API Integration</h2>
        <p className="mb-6">JavaScript example using Shreds API for instant randomness</p>
        
        <CodeBlock
          language="typescript"
          code={`import Web3 from 'web3';

const SHREDS_API_URL = 'wss://testnet.riselabs.xyz/ws';
const VRF_COORDINATOR = '0x9d57aB4517ba97349551C876a01a7580B1338909';

class VRFClient {
  private ws: WebSocket;
  private web3: Web3;
  
  constructor(rpcUrl: string) {
    this.web3 = new Web3(rpcUrl);
    this.ws = new WebSocket(SHREDS_API_URL);
    
    this.ws.on('open', () => {
      console.log('Connected to Shreds API');
      this.subscribeToVRFEvents();
    });
    
    this.ws.on('message', (data) => {
      const message = JSON.parse(data.toString());
      if (message.type === 'vrf_fulfillment') {
        this.handleVRFFulfillment(message);
      }
    });
  }
  
  private subscribeToVRFEvents() {
    this.ws.send(JSON.stringify({
      type: 'subscribe',
      event: 'vrf_requests',
      address: VRF_COORDINATOR
    }));
  }
  
  private handleVRFFulfillment(message: any) {
    const { requestId, randomNumbers, proof } = message.data;
    console.log(\`VRF Request \${requestId} fulfilled:\`, randomNumbers);
  }
}`}
        />
      </section>
    </DocPage>
  );
}