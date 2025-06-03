RISE Shred API – Developer Toolkit Guide
What Are Shreds
Shreds in RISE Chain are essentially sub-blocks that enable ultra-fast transaction preconfirmations. Each shred contains a subset of transactions along with their receipts and all state changes (nonce updates, balance changes, storage modifications, contract code changes) produced by those transactions
docs.risechain.com
. Shreds are produced continuously and broadcast in real-time, rather than waiting for discrete block intervals
blog.risechain.com
. This means RISE can generate transaction confirmations within mere milliseconds, offering a user experience more akin to a modern web app than a typical blockchain
blog.risechain.com
. RISE’s Parallel EVM execution engine can even process transactions concurrently and package them into shreds on the fly
blog.risechain.com
, supporting incremental block construction: an L2 block is built piecewise from many shreds, deferring heavy tasks like Merkle trie updates until the full block is finalized
docs.risechain.com
. Some key benefits of RISE’s shred-based design include:
Reduced latency: By partitioning L2 blocks into smaller shreds and removing state merkleization from the critical path, end-to-end transaction processing latency is drastically lowered
blog.risechain.com
. Shreds are propagated and executed quickly, so users don’t wait an entire block time for feedback.
Fast preconfirmations: Users receive confirmations almost immediately after sending a transaction. Each shred is processed and disseminated in real-time without waiting for the whole block to complete, providing preconfirmations multiple times faster than traditional block-by-block workflows
blog.risechain.com
.
Early state updates: Network nodes apply state changes as soon as a shred arrives, rather than after full block consensus. This means account balances, contract state, etc. are updated network-wide within moments of the transaction, allowing applications to see the latest state instantly
blog.risechain.com
.
Efficient merkleization: Because shreds omit the state root (deferring it until the final L2 block is assembled), expensive Merkle trie computations are batched and performed less frequently. The changes from many shreds can be combined for a more efficient single update, significantly reducing the overhead compared to updating the trie for every sub-block
blog.risechain.com
.
Economically secured confirmations: Unlike a typical L2 “soft” confirmation which is just a promise from the sequencer, a shred comes with a signed, slashable commitment from the sequencer guaranteeing it will be included
blog.risechain.com
. This economic guarantee means users have recourse if a sequencer tries to drop or reorder a preconfirmed transaction, adding a layer of trustlessness to the speedy confirmations.
Shred API Explainer
Diagram: Transaction flow with Shreds. Blue paths (RPC) show the user sending a transaction to a RISE node and receiving a quick preconfirmation receipt. Orange paths (P2P) show the node forwarding the tx to the sequencer and the sequencer broadcasting a shred back to all nodes, which triggers the RPC receipt to the user. To unlock the benefits of shreds for DApp developers, RISE provides an extended JSON-RPC interface called the Shred API. (The standard Ethereum JSON-RPC was not designed with such low-latency, streaming use-cases in mind
blog.risechain.com
.) The Shred API allows clients to access real-time, preconfirmation data via WebSocket streaming. When a transaction is executed and included in a shred, subscribers are notified within ~100 ms (often much faster – in ideal conditions as low as ~5 ms from submission to confirmation
npmjs.com
). This real-time feed is delivered with a 99.9% uptime target, ensuring developers can rely on it for latency-sensitive applications. The Shred API is especially useful for use cases where every millisecond counts. For example, high-frequency trading engines, arbitrage bots, and other algorithmic trading systems can react to market events on RISE almost instantaneously, gaining an edge by receiving transaction outcomes faster than on any traditional chain
blog.risechain.com
. The near-immediate preconfirmations also bolster MEV protection – because the sequencer’s commitment to each shred is cryptographically bonded, it’s far more difficult (and financially risky) for the sequencer to revert or reorder transactions after giving a preconfirmation
blog.risechain.com
. Beyond trading, the Shred API enables real-time analytics and dashboards: developers can build live updating front-ends (for block explorers, DeFi dashboards, games, etc.) that reflect state changes and events as soon as they happen, providing end-users with an interactive, up-to-the-second experience.
API Examples
You can integrate with the Shred API either by using raw JSON-RPC calls or via the provided high-level client library, depending on your preference:
Direct JSON-RPC (WebSocket & HTTP)
The RISE Testnet endpoint supports WebSocket and HTTP JSON-RPC, similar to an Ethereum node. For streaming data, you’ll typically open a WebSocket connection to the node and use the rise_subscribe RPC method. For example, the public RISE Testnet WebSocket is at wss://testnet.riselabs.xyz/ws
docs.risechain.com
 (the HTTP endpoint is https://testnet.riselabs.xyz for one-off requests). Once connected via WebSocket, you send subscription requests or transactions as JSON-RPC messages. For instance, to subscribe to real-time contract events (logs), you would send a JSON payload like this:
json
Copy
Edit
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "rise_subscribe",
  "params": [
    "logs",
    {
      "address": "0x99dbe4aea58e518c50a1c04ae9b48c9f6354612f", 
      "topics": ["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"]
    }
  ]
}
This subscribes to logs from the contract at address 0x99dbe4... (in this case, filtering for the ERC-20 Transfer event by its topic). The node will respond with a subscription ID:
json
Copy
Edit
{"jsonrpc":"2.0","id":1,"result":"0x862db97373b7b4c0cebcdff1801c78b4"}
Thereafter, any matching event emits a notification via the WebSocket. For example, a log notification might look like:
json
Copy
Edit
{
  "jsonrpc": "2.0",
  "method": "rise_subscription",
  "params": {
    "subscription": "0x862db97373b7b4c0cebcdff1801c78b4",
    "result": {
      "address": "0xe03f4c6749c2b1b1638e0e42a1b1b33af1195c12",
      "topics": [
        "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
        "0x000000000000000000000000a54924e8bdd79e75626f9ae9bf139c669debd550",
        "0x0000000000000000000000000000000000000000000000000000000000000000"
      ],
      "data": "0x0000000000000000000000000000000000000000000000000000000000007134",
      "blockHash": null,
      "blockNumber": "0xc481e2",
      "transactionHash": "0xcd46330358ed58eced0b35e2466a6edf49c4a3e1e9402f16a3744a4f1ec83eb5",
      "logIndex": "0x0",
      "removed": false
    }
  }
}
Notably, the blockHash field in RISE log notifications is null – this indicates the transaction is included in a shred but not yet finalized in an L2 block
docs.risechain.com
. The log’s blockNumber and other fields still reference the eventual block context, but until the block is sealed, the log is considered “pending” (yet economically guaranteed by the shred). This behavior is similar to Ethereum’s eth_subscribe for logs except for the blockHash: null when preconfirmed. You can also subscribe to shreds themselves to get all transaction and state updates in real-time. A subscribe request for shreds uses the same rise_subscribe method with no additional parameters:
json
Copy
Edit
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "rise_subscribe",
  "params": []
}
This returns a subscription ID (just like the logs example). Shred notifications will then stream every time the sequencer produces a new shred. Each notification includes the shred’s index within its block, the list of transactions and receipts in that shred, and a map of all state changes caused by those transactions
docs.risechain.com
. For example:
json
Copy
Edit
{
  "jsonrpc": "2.0",
  "method": "rise_subscription",
  "params": {
    "subscription": "0x656cd5c476a0616f0f0e588949eab10e",
    "result": {
      "block_number": 12878495,
      "shred_idx": 19,
      "transactions": [
        {
          "transaction": {
            "nonce": "0x30",
            "to": "0x431bfa4dda71620e9e84ec4cfc0f70bf4559518e",
            "value": "0x23f66ed85c7c",
            "gas": "0x5208",
            "gasPrice": "0x186a0",
            "chainId": "0xaa39db",
            "hash": "0xea02d5268e0b90c079958f2169e92bf551cd0bcd8ad14af643f849c03b7043c6"
          },
          "receipt": {
            "status": "0x1",
            "cumulativeGasUsed": "0x668a0",
            "logs": []
          }
        }
      ],
      "state_changes": {
        "0x431bfa4dda71620e9e84ec4cfc0f70bf4559518e": {
          "nonce": 49,
          "balance": "0xabaad195142ac",
          "storage": {},
          "new_code": null
        },
        "0x4200000000000000000000000000000000000011": {
          "...": "..." 
        }
        // ...additional addresses and changes...
      }
    }
  }
}
In the above shred notification, we see one transaction (a simple ETH transfer) and its resulting receipt (status 0x1 = success), and the state_changes for addresses affected by this shred. In this case, the sender and receiver’s balances and nonces are updated, and a couple of system contract addresses (0x4200... prefixed addresses) have balance changes (e.g. the fee escrow or L1 bridge addresses). By subscribing to shreds, a client gets a comprehensive view of every state change and event before the block is finalized
docs.risechain.com
 – perfect for advanced monitoring or reactive DApps that want to act on pending transactions immediately. To use the Shred API via WebSocket in code, you can use any WebSocket client. For example, using Node.js with the popular ws library:
typescript
Copy
Edit
import WebSocket from 'ws';

const ws = new WebSocket('wss://testnet.riselabs.xyz/ws');

ws.on('open', () => {
  // Subscribe to all shreds on open
  ws.send(JSON.stringify({
    jsonrpc: "2.0", id: 1,
    method: "rise_subscribe", params: []
  }));
});

ws.on('message', (data) => {
  const msg = JSON.parse(data.toString());
  if (msg.method === 'rise_subscription') {
    console.log("Received notification:", msg.params.result);
    // Here you can handle the shred or log data in msg.params.result
  }
});
The above snippet establishes a WebSocket connection and sends a rise_subscribe request for shreds. The message handler will log each incoming notification (in a real app, you would update your state, trigger other logic, etc.). If you wanted to subscribe to logs instead, you would include the "logs" topic and filter object in the params as shown in the earlier JSON example. Python Example: Similarly, in Python you could use the websocket-client library or asyncio websockets. For instance, using websocket-client in a simple script:
python
Copy
Edit
import websocket, json

ws = websocket.WebSocket()
ws.connect("wss://testnet.riselabs.xyz/ws")
# Subscribe to a specific contract's logs (replace address/topic as needed)
sub_req = {
    "jsonrpc": "2.0", "id": 1, "method": "rise_subscribe",
    "params": ["logs", {"address": "0xYourContractAddress", "topics": []}]
}
ws.send(json.dumps(sub_req))
result = json.loads(ws.recv())
print("Subscription ID:", result.get("result"))
while True:
    msg = json.loads(ws.recv())
    if msg.get("method") == "rise_subscription":
        print("New event:", msg["params"]["result"])
This Python code connects to the RISE WebSocket, subscribes to logs, then continuously prints out incoming log events in real-time. (In practice you would likely add proper error handling, filtering of the specific events, etc.)
Note: Subscriptions require a WebSocket connection. If you use the HTTP RPC endpoint, you can still fetch data (e.g. poll eth_getTransactionReceipt or eth_getLogs), but you won’t get the push-based real-time updates. The true power of the Shred API is in its WebSocket streaming capabilities for instantaneous notifications.
Using the rise-shred-client Library
For developers building in JavaScript/TypeScript, the easiest way to work with RISE’s Shred API features is the rise-shred-client NPM package. This is a TypeScript SDK that wraps the RISE JSON-RPC, providing convenient methods for the custom shred features
npmjs.com
. In particular, it supports the new synchronous transaction method (see below) so you don’t have to manually manage subscription IDs or poll for receipts
npmjs.com
. You can install it with npm install rise-shred-client. The library integrates with popular Ethereum libraries like ethers.js and viem. For example, using it with ethers.js:
typescript
Copy
Edit
import { SyncTransactionProvider } from 'rise-shred-client';
import { Wallet } from 'ethers';

// Initialize a provider for RISE (Testnet RPC URL)
const provider = new SyncTransactionProvider('https://testnet.riselabs.xyz');
// (The provider can also accept a WebSocket URL if needed for subscriptions)

// Create a signing wallet (replace with your private key)
const wallet = new Wallet(PRIVATE_KEY, provider);

// Prepare a raw transaction (for example, a simple ETH transfer)
const tx = await wallet.populateTransaction({
  to: targetAddress,
  value: amountInWei
});
const signedTx = await wallet.signTransaction(tx);

// Send the transaction and wait synchronously for the receipt:
const receipt = await provider.sendRawTransactionSync(signedTx);
console.log("Transaction confirmed in block", receipt.blockNumber.toString());
In the above, SyncTransactionProvider extends an ethers Provider to add the sendRawTransactionSync method. We sign a transaction as usual, then call sendRawTransactionSync which submits it to RISE and waits for the transaction’s inclusion in a shred, returning the receipt. Under the hood, this method eliminates the need to poll for a receipt—our code resumes once the transaction is actually confirmed in a shred. The receipt object is a standard Ethereum transaction receipt containing status, transactionHash, blockNumber, gas used, event logs, etc., just as you’d get from eth_getTransactionReceipt
npmjs.com
. The rise-shred-client library also provides a Viem integration. For example, you can create a viem public client with a synchronous transport:
typescript
Copy
Edit
import { createSyncPublicClient, syncTransport } from 'rise-shred-client';
import { privateKeyToAccount } from 'viem/accounts';

const client = createSyncPublicClient({
  transport: syncTransport('https://testnet.riselabs.xyz')
});
const account = privateKeyToAccount(PRIVATE_KEY);
// (Use client with viem methods as usual, it will handle sendRawTransactionSync internally when you send transactions)
Using this SDK, your DApp’s transaction workflow becomes simpler and faster. You send a transaction and immediately get a confirmed receipt back, typically within a few tens of milliseconds. In fact, if your client is geographically close to the RISE sequencer, the end-to-end latency for a transaction can be on the order of only a few milliseconds
npmjs.com
!
rise_subscribe Example (Real-Time Feeds)
To solidify how subscriptions work, let’s walk through a specific example using rise_subscribe for both logs and shreds:
Subscribing to contract logs: Suppose you want to monitor an ERC-20 token contract for Transfer events in real time. Using rise_subscribe, you can subscribe to the logs from that contract address with the topic for the Transfer(address,address,uint256) signature. As shown above, you’d send a request with "method": "rise_subscribe", "params": ["logs", { ... }]. The RISE node will immediately respond with a subscription ID. Thereafter, each time a Transfer event is emitted in a new shred, you’ll receive a JSON-RPC notification containing the log. Your application could use this to update a UI (e.g. token transfer feed) almost instantly as transfers occur. Remember, the blockHash will be null in these notifications (since the containing block isn’t finalized yet)
docs.risechain.com
, but the event is guaranteed by the sequencer’s commitment to eventually include it
blog.risechain.com
. If needed, once the block is finalized you can correlate the log via its transactionHash or wait for a later notification (or poll) with the real block hash.
Subscribing to shreds: If you need a broader feed of all transactions and state changes (for example, writing a real-time block explorer or an arbitrage bot watching all pending trades), you’d subscribe with "params": [] (no filter, meaning subscribe to all shreds). Each shred notification will give you a bundle of transactions that were processed together and the incremental state diff. You could, for instance, detect a large swap in a DEX contract by observing the state_changes for that contract’s liquidity pool balances in the shred notification, or simply by the presence of certain logs within the shred’s transactions. This is powerful for MEV bots or analytics: you get insight into every pending transaction’s effect on state with sub-100ms latency, allowing you to react before the next shred or block. Use caution, however – this is a high-volume stream. Under heavy network activity, shreds could arrive very frequently. Ensure your client is efficient at processing the incoming data.
Unsubscribing: Should you need to cancel a subscription, RISE supports an RPC call rise_unsubscribe which takes the subscription ID (returned by rise_subscribe) as a parameter, similar to Ethereum’s eth_unsubscribe. This will stop the WebSocket feed for that subscription. In practice, you might maintain a single WebSocket connection with multiple subscriptions (e.g. one for shreds, one for certain logs), and you can manage them via their IDs.
eth_sendRawTransactionSync Example (Synchronous TX Submission)
One of the hallmark features of the Shred API is the ability to submit transactions and get the result immediately, using the custom eth_sendRawTransactionSync RPC method. This method sends a raw signed transaction to the RISE sequencer and blocks until the transaction is included in a shred, returning the transaction’s receipt in the response
npmjs.com
. It essentially combines eth_sendRawTransaction and the follow-up eth_getTransactionReceipt polling into one step. JSON-RPC example: To use this via direct RPC, you would send an HTTP POST (or a WebSocket message) with a payload like:
json
Copy
Edit
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "eth_sendRawTransactionSync",
  "params": ["0x02f8..."] 
}
Here, the parameter is the raw serialized transaction hex (exactly as you’d pass to a normal eth_sendRawTransaction). The response, if successful, will contain a result field with the full receipt object. For example, a response might be:
json
Copy
Edit
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "transactionHash": "0x4e3f3c3e...9f1b", 
    "status": "0x1",
    "blockNumber": "0x1312ca3", 
    "blockHash": "0xb2c5...f8e2",
    "gasUsed": "0x5208",
    "logs": [ ... ],
    "logsBloom": "0x...", 
    "contractAddress": null
    /* ...other receipt fields... */
  }
}
This indicates the transaction was included (status 0x1 means success) in block number 0x1312ca3. Essentially, by the time you get this response, your transaction has already been processed and preconfirmed in a shred. The whole round-trip typically takes on the order of tens of milliseconds. In fact, as noted, if your client is very near the sequencer data center, the latency can be as low as ~5 ms
npmjs.com
 – the transaction is executed and the result returned almost instantly. TypeScript example with rise-shred-client: Using the earlier setup with SyncTransactionProvider, sending a transaction synchronously is straightforward. For example:
typescript
Copy
Edit
const signedTx = "0x02f8a...";  // your pre-signed transaction hex
const provider = new SyncTransactionProvider('https://testnet.riselabs.xyz');
const receipt = await provider.sendRawTransactionSync(signedTx);
console.log("TX included in block", Number(receipt.blockNumber));
console.log("Gas used:", BigInt(receipt.cumulativeGasUsed).toString());
When this promise resolves, receipt will be a normal receipt object. You can then, for instance, confirm receipt.status is 0x1 (success), or retrieve any events from receipt.logs. No explicit waiting or polling is needed on your end – the library handled that by waiting for the shred that contains your transaction. Python example: If you prefer Python (using web3.py or raw requests), you can achieve the same synchronous submit. For instance, using requests to call the RPC:
python
Copy
Edit
import requests, json

raw_tx = "0x02f8a080...";  # raw signed transaction hex
payload = {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "eth_sendRawTransactionSync",
    "params": [ raw_tx ]
}
resp = requests.post("https://testnet.riselabs.xyz", json=payload).json()
receipt = resp.get('result')
print("Tx receipt:", receipt)
if receipt and receipt.get('status') == '0x1':
    print("Transaction succeeded in block", int(receipt['blockNumber'], 16))
This will POST the transaction and block until the RISE node responds with the receipt. The receipt dictionary can then be used as needed. Using web3.py, you could similarly add a custom RPC method call for eth_sendRawTransactionSync and integrate it into that framework. Why use synchronous submission? For many DApps, especially in DeFi/trading, knowing immediately whether a transaction succeeded or failed (and in which block) is extremely valuable. For example, a trading bot might submit a transaction and within 100 ms get a receipt that it was mined in shred #N, block #M – at which point it can confidently proceed to submit the next transaction (or handle a failure) without waiting for block confirmations. This pattern eliminates a lot of complexity in transaction handling. You no longer need to implement a polling loop to check if a transaction was included; the API guarantees the inclusion (or failure) response instantly. This synchronous call is unique to RISE Chain’s API and is made possible by the incredibly low latency of the RISE sequencer and network. It’s worth noting that behind the scenes, the sequencer is still producing shreds continuously – the RPC node simply waits for the shred containing your transaction to be formed, then returns the receipt. From the developer’s perspective, it feels like a normal function call that just happens to mine a transaction very fast.