# Flattened Src Directory Codebase

## src/app/api-docs/page.tsx

```typescript
"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import CodeTabs from "@/components/ui/CodeTabs";

export default function ApiDocsPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let currentSection: string | null = null;
      
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 100) {
          currentSection = section.id;
        }
      });
      
      setActiveSection(currentSection);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial active section
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex min-h-screen text-white font-sans">
      {/* Endpoint List */}
      <aside className="w-1/4 p-8 fixed top-16 left-0 h-[calc(100vh-4rem)] overflow-y-auto bg-black/30 backdrop-blur-sm border-r border-white/10">
        <motion.h2 
          className="text-xl font-bold mb-6 text-white gradient-text"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          API Reference
        </motion.h2>
        <nav className="flex flex-col space-y-3 text-sm">
          {/* RPC Methods */}
          <motion.h3 
            className="text-md font-semibold mt-4 mb-2 text-gray-200 pt-3 border-t border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            RPC Methods
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a 
              href="#rise_subscribe" 
              className={`block py-2 px-3 rounded-md transition-all ${activeSection === 'rise_subscribe' 
                ? 'text-white bg-gradient-primary' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              rise_subscribe
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <a 
              href="#eth_sendRawTransactionSync" 
              className={`block py-2 px-3 rounded-md transition-all ${activeSection === 'eth_sendRawTransactionSync' 
                ? 'text-white bg-gradient-primary' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              eth_sendRawTransactionSync
            </a>
          </motion.div>
        </nav>
      </aside>

      {/* Endpoint Details */}
      <main className="w-3/4 ml-[25%] p-8 pt-12">
        {/* REST API Sections Removed (get-shred, post-shred, get-block) */}

        {/* RPC Methods Start Here */}
        <motion.section 
          id="rise_subscribe" 
          className="mt-8 mb-24 p-8 rounded-xl bg-black/20 backdrop-blur-sm border border-white/10 shadow-glass"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            rise_subscribe
          </motion.h1>
          <motion.div 
            className="flex items-center mb-6"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span className="px-3 py-1 text-xs font-bold text-white bg-gradient-primary rounded-md shadow-glow">
              RPC METHOD
            </span>
            <p className="ml-4 text-gray-300 font-medium">WebSocket Subscription</p>
          </motion.div>
          <motion.p 
            className="text-gray-300 text-base mb-8 leading-relaxed max-w-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Subscribe to real-time notifications from the RISE network. Supports subscriptions to new logs matching filter criteria or to all newly created Shreds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h3 className="font-bold text-white text-xl border-t border-white/10 pt-6 mt-6 mb-4">Parameters</h3>
            <p className="text-gray-300 text-sm my-3 leading-relaxed">The <code className="bg-black/30 px-1.5 py-0.5 rounded text-brand-light-purple">params</code> field is an array. The first element is the subscription type (<code className="bg-black/30 px-1.5 py-0.5 rounded text-brand-light-purple">&quot;logs&quot;</code> or <code className="bg-black/30 px-1.5 py-0.5 rounded text-brand-light-purple">&quot;shreds&quot;</code>). The second element (if applicable) is an object containing filter criteria.</p>
            {/* Parameter table with glassmorphism styling */}
            <div className="mt-6 overflow-x-auto rounded-lg shadow-glass">
              <table className="min-w-full border border-white/10 overflow-hidden">
                <thead>
                  <tr className="bg-black/40 backdrop-blur-sm">
                    <th className="p-4 text-left text-sm font-medium text-gray-200">Parameter</th>
                    <th className="p-4 text-left text-sm font-medium text-gray-200">Type</th>
                    <th className="p-4 text-left text-sm font-medium text-gray-200">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr className="bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-colors">
                    <td className="p-4 text-sm text-white align-top font-mono">params[0]</td>
                    <td className="p-4 text-sm text-brand-cyan align-top">string</td>
                    <td className="p-4 text-sm text-gray-300 align-top">Subscription type: <code className="bg-black/30 px-1.5 py-0.5 rounded text-brand-light-purple">&quot;logs&quot;</code> or <code className="bg-black/30 px-1.5 py-0.5 rounded text-brand-light-purple">&quot;shreds&quot;</code>.</td>
                  </tr>
                  <tr className="bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-colors">
                    <td className="p-4 text-sm text-white align-top font-mono">params[1] (for &quot;logs&quot;)</td>
                    <td className="p-4 text-sm text-brand-cyan align-top">object</td>
                    <td className="p-4 text-sm text-gray-300 align-top">
                      Filter object for <code className="bg-black/30 px-1.5 py-0.5 rounded text-brand-light-purple">&quot;logs&quot;</code> subscription:
                      <ul className="list-disc pl-5 mt-2 space-y-1.5">
                        <li><code className="bg-black/30 px-1.5 py-0.5 rounded text-brand-light-purple">address</code> (optional): string | string[] - Contract address or addresses.</li>
                        <li><code className="bg-black/30 px-1.5 py-0.5 rounded text-brand-light-purple">topics</code> (optional): string[] - Array of topics to filter by.</li>
                      </ul>
                    </td>
                  </tr>
                  <tr className="bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-colors">
                    <td className="p-4 text-sm text-white align-top font-mono">params[1] (for &quot;shreds&quot;)</td>
                    <td className="p-4 text-sm text-brand-cyan align-top">N/A</td>
                    <td className="p-4 text-sm text-gray-300 align-top">No additional parameters for <code className="bg-black/30 px-1.5 py-0.5 rounded text-brand-light-purple">&quot;shreds&quot;</code> subscription (params array typically <code className="bg-black/30 px-1.5 py-0.5 rounded text-brand-light-purple">[&quot;shreds&quot;]</code>).</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h4 className="font-semibold text-white text-lg mt-8 mb-4 border-t border-white/10 pt-6">Request Examples</h4>
            
            <p className="text-gray-300 text-sm mb-3 mt-4 font-medium"><span className="inline-block bg-gradient-primary px-2 py-1 rounded text-white text-xs mr-2">1</span> Subscribe to Logs:</p>
            <CodeTabs
              tabs={[
                {
                  language: "json",
                  code: JSON.stringify({
                    jsonrpc: "2.0",
                    id: 1,
                    method: "rise_subscribe",
                    params: [
                      "logs",
                      {
                        address: "0x99dbe4aea58e518c50a1c04ae9b48c9f6354612f",
                        topics: ["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"],
                      },
                    ],
                  }, null, 2),
                },
                {
                  language: "typescript",
                  code: 
`// TypeScript (using a generic WebSocket client)\nconst socket = new WebSocket(\"wss://your-rise-node-endpoint/ws\");\n\nsocket.onopen = () => {\n  console.log(\"WebSocket connection established\");\n\n  const logSubscriptionRequest = {\n    jsonrpc: \"2.0\",\n    id: 1,\n    method: \"rise_subscribe\",\n    params: [\n      \"logs\",\n      {\n        address: \"0x99dbe4aea58e518c50a1c04ae9b48c9f6354612f\",\n        topics: [\"0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef\"],\n      },\n    ],\n  };\n  socket.send(JSON.stringify(logSubscriptionRequest));\n  console.log(\"Sent log subscription request:\", logSubscriptionRequest);\n};\n\nsocket.onmessage = (event) => {\n  const message = JSON.parse(event.data as string);\n  console.log(\"Received message:\", message);\n  // Handle subscription ID and notifications\n};\n\nsocket.onerror = (error) => console.error(\"WebSocket error:\", error);\nsocket.onclose = () => console.log(\"WebSocket connection closed\");`,
                },
                {
                  language: "python",
                  code: 
`import asyncio\nimport websockets\nimport json\n\nasync def subscribe_logs():\n    uri = \"wss://your-rise-node-endpoint/ws\"\n    async with websockets.connect(uri) as websocket:\n        print(\"WebSocket connection established\")\n        log_subscription_request = {\n            \"jsonrpc\": \"2.0\",\n            \"id\": 1,\n            \"method\": \"rise_subscribe\",\n            \"params\": [\n                \"logs\",\n                {\n                    \"address\": \"0x99dbe4aea58e518c50a1c04ae9b48c9f6354612f\",\n                    \"topics\": [\"0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef\"],\n                },\n            ],\n        }\n        await websocket.send(json.dumps(log_subscription_request))\n        print(f\"Sent log subscription request: {log_subscription_request}\")\n\n        while True:\n            try:\n                message_str = await websocket.recv()\n                message = json.loads(message_str)\n                print(f\"Received message: {message}\")\n            except websockets.exceptions.ConnectionClosed:\n                print(\"WebSocket connection closed\")\n                break\n\nif __name__ == \"__main__\":\n    asyncio.run(subscribe_logs())`,
                },
                {
                  language: "rust",
                  code: 
`use tokio_tungstenite::{connect_async, tungstenite::protocol::Message};\nuse url::Url;\nuse futures_util::{StreamExt, SinkExt};\nuse serde_json::json;\n\n#[tokio::main]\nasync fn main() -> Result<(), Box<dyn std::error::Error>> {\n    let connect_addr = \"wss://your-rise-node-endpoint/ws\";\n    let url = Url::parse(connect_addr)?;
\n    let (ws_stream, _) = connect_async(url).await.expect(\"Failed to connect\");\n    println!(\"WebSocket connection established\");\n    let (mut write, mut read) = ws_stream.split();\n\n    let log_subscription_request = json!({\n        \"jsonrpc\": \"2.0\",\n        \"id\": 1,\n        \"method\": \"rise_subscribe\",\n        \"params\": [\n            \"logs\",\n            {\n                \"address\": \"0x99dbe4aea58e518c50a1c04ae9b48c9f6354612f\",\n                \"topics\": [\"0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef\"],\n            },\n        ],\n    });\n    write.send(Message::Text(log_subscription_request.to_string())).await?;\n    println!(\"Sent log subscription request: {}\", log_subscription_request.to_string());\n\n    while let Some(msg) = read.next().await {\n        match msg {\n            Ok(Message::Text(text)) => println!(\"Received message: {}\", text),\n            Ok(Message::Close(_)) => { println!(\"Connection closed\"); break; }\n            Err(e) => { eprintln!(\"Error: {:?}\", e); break; }\n            _ => {}\n        }\n    }\n    Ok(())\n}`,
                },
              ]}
            />

            <p className="text-gray-300 text-sm mb-3 mt-6 font-medium"><span className="inline-block bg-gradient-primary px-2 py-1 rounded text-white text-xs mr-2">2</span> Subscribe to New Shreds:</p>
            <CodeTabs
              tabs={[
                {
                  language: "json",
                  code: JSON.stringify({
                    jsonrpc: "2.0",
                    id: 2,
                    method: "rise_subscribe",
                    params: ["shreds"], // Or [] based on final spec from content/rise_subscribe.md
                  }, null, 2),
                },
                {
                  language: "typescript",
                  code: 
`// TypeScript (WebSocket client - continued from above or new instance)\nsocket.onopen = () => { // Assuming socket is already defined and onopen is set
  // ... (previous onopen logic if combined)
  const shredSubscriptionRequest = {\n    jsonrpc: \"2.0\",\n    id: 2,\n    method: \"rise_subscribe\",\n    params: [\"shreds\"],\n  };\n  socket.send(JSON.stringify(shredSubscriptionRequest));\n  console.log(\"Sent shred subscription request:\", shredSubscriptionRequest);\n};`,
                },
                {
                  language: "python",
                  code: 
`# Python (websockets - continued from above or new instance)\nasync def subscribe_shreds():\n    uri = \"wss://your-rise-node-endpoint/ws\"\n    async with websockets.connect(uri) as websocket:\n        # ... (connection logic if separate)\n        shred_subscription_request = {\n            \"jsonrpc\": \"2.0\",\n            \"id\": 2,\n            \"method\": \"rise_subscribe\",\n            \"params\": [\"shreds\"],\n        }\n        await websocket.send(json.dumps(shred_subscription_request))\n        print(f\"Sent shred subscription request: {shred_subscription_request}\")\n        # ... (receive loop) ...`,
                },
                {
                  language: "rust",
                  code: 
`// Rust (tokio-tungstenite - continued from above or new instance)\n// Assuming 'write' and 'read' streams are available\nlet shred_subscription_request = json!({\n    \"jsonrpc\": \"2.0\",\n    \"id\": 2,\n    \"method\": \"rise_subscribe\",\n    \"params\": [\"shreds\"]\n});\nwrite.send(Message::Text(shred_subscription_request.to_string())).await?;\nprintln!(\"Sent shred subscription request: {}\", shred_subscription_request.to_string());\n// ... (read loop) ...`,
                },
              ]}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <h4 className="font-semibold text-white text-lg mt-8 mb-4 border-t border-white/10 pt-6">Response Examples</h4>
            <p className="text-gray-300 text-sm mb-3 font-medium"><span className="inline-block bg-gradient-primary px-2 py-1 rounded text-white text-xs mr-2">1</span> Initial Subscription Response (for Logs or Shreds):</p>
            <CodeTabs tabs={[{ language: "json", code: JSON.stringify({"jsonrpc":"2.0","id":1,"result":"0xSUBSCRIPTION_ID"}, null, 2) }]} />
            
            <p className="text-gray-300 text-sm mb-3 mt-6 font-medium"><span className="inline-block bg-gradient-primary px-2 py-1 rounded text-white text-xs mr-2">2</span> Log Notification:</p>
            <CodeTabs tabs={[{ language: "json", code: JSON.stringify({"jsonrpc":"2.0","method":"rise_subscription","params":{"subscription":"0xSUBSCRIPTION_ID","result":{"address":"0xe03f4c6749c2b1b1638e0e42a1b1b33af1195c12","topics":["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"],"data":"0x0000000000000000000000000000000000000000000000000000000000007134","blockHash":null,"blockNumber":"0xc481e2","transactionHash":"0xcd46330358ed58eced0b35e2466a6edf49c4a3e1e9402f16a3744a4f1ec83eb5","transactionIndex":"0x0","logIndex":"0x0","removed":false}}}, null, 2) }]} />
            
            <p className="text-gray-300 text-sm mb-3 mt-6 font-medium"><span className="inline-block bg-gradient-primary px-2 py-1 rounded text-white text-xs mr-2">3</span> Shred Notification (Conceptual):</p>
            <CodeTabs tabs={[{ language: "json", code: JSON.stringify({"jsonrpc":"2.0","method":"rise_subscription","params":{"subscription":"0xSUBSCRIPTION_ID_SHREDS","result":{"block_number":12878495,"shred_idx":19,"transactions":[{"transaction":{ /* ... transaction object ... */ },"receipt":{ /* ... receipt object ... */ }}],"state_changes":{ /* ... state changes object ... */ }}}}, null, 2) }]} />
            
            <div className="mt-8 p-4 bg-black/30 border border-white/10 rounded-lg">
              <p className="text-gray-300 text-sm flex items-center">
                <svg className="w-5 h-5 mr-2 text-brand-light-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Note: To unsubscribe, use the <code className="bg-black/30 mx-1 px-1.5 py-0.5 rounded text-brand-light-purple">rise_unsubscribe</code> method with the subscription ID.
              </p>
            </div>
          </motion.div>
        </motion.section>

        <motion.section 
          id="eth_sendRawTransactionSync" 
          className="mt-16 mb-24 p-8 rounded-xl bg-black/20 backdrop-blur-sm border border-white/10 shadow-glass"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.h1 
            className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            eth_sendRawTransactionSync
          </motion.h1>
          <motion.div 
            className="flex items-center mb-6"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <span className="px-3 py-1 text-xs font-bold text-white bg-gradient-primary rounded-md shadow-glow">
              RPC METHOD
            </span>
            <p className="ml-4 text-gray-300 font-medium">Synchronous Transaction Submission</p>
          </motion.div>
          <motion.p 
            className="text-gray-300 text-base mb-8 leading-relaxed max-w-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Sends a signed transaction and waits for it to be processed by the Shreds network, returning an immediate transaction receipt.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3 className="font-bold text-white text-xl border-t border-white/10 pt-6 mt-6 mb-4">Parameters</h3>
            <div className="mt-6 overflow-x-auto rounded-lg shadow-glass">
              <table className="min-w-full border border-white/10 overflow-hidden">
                <thead>
                  <tr className="bg-black/40 backdrop-blur-sm">
                    <th className="p-4 text-left text-sm font-medium text-gray-200">Parameter</th>
                    <th className="p-4 text-left text-sm font-medium text-gray-200">Type</th>
                    <th className="p-4 text-left text-sm font-medium text-gray-200">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr className="bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-colors">
                    <td className="p-4 text-sm text-white align-top font-mono">Signed Transaction Data</td>
                    <td className="p-4 text-sm text-brand-cyan align-top">string</td>
                    <td className="p-4 text-sm text-gray-300 align-top">The hex-encoded signed raw transaction (e.g., <code className="bg-black/30 px-1.5 py-0.5 rounded text-brand-light-purple">&quot;0x...&quot;</code>).</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <h3 className="font-bold text-white text-xl border-t border-white/10 pt-6 mt-8 mb-4">Request Example</h3>
            <CodeTabs
              tabs={[
                {
                  language: "json",
                  code: JSON.stringify({
                    jsonrpc: "2.0",
                    id: 1,
                    method: "eth_sendRawTransactionSync",
                    params: ["0xf86... (signed transaction data)"],
                  }, null, 2),
                },
                {
                  language: "typescript",
                  code: 
`// TypeScript (conceptual using fetch for HTTP POST)\nasync function sendSyncTransaction(signedTx: string): Promise<any> {\n  const endpoint = \"https://your-rise-node-endpoint/http\"; // Replace with actual HTTP endpoint\n  const requestBody = {\n    jsonrpc: \"2.0\",\n    id: 1,\n    method: \"eth_sendRawTransactionSync\",\n    params: [signedTx],\n  };\n\n  try {\n    const apiResponse: Response = await fetch(endpoint, {\n      method: \"POST\",\n      headers: { \"Content-Type\": \"application/json\" },\n      body: JSON.stringify(requestBody),\n    });\n    if (!apiResponse.ok) throw new Error('HTTP error! status: ' + apiResponse.status);\n    const data = await apiResponse.json();\n    console.log(\"Transaction receipt:\", data);\n    return data;\n  } catch (error) {\n    console.error(\"Error sending sync transaction:\", error);\n    throw error;\n  }\n}\n\n// Example usage:\n// const signedTxData = \"0xf86...\";\n// sendSyncTransaction(signedTxData).then(receipt => console.log(receipt));`,
                },
                {
                  language: "python",
                  code: 
`import requests\nimport json\n\ndef send_sync_transaction(signed_tx_data: str, endpoint: str = \"https://your-rise-node-endpoint/http\"):\n    headers = { \"Content-Type\": \"application/json\" }\n    payload = {\n        \"jsonrpc\": \"2.0\",\n        \"id\": 1,\n        \"method\": \"eth_sendRawTransactionSync\",\n        \"params\": [signed_tx_data],\n    }\n    try:\n        response = requests.post(endpoint, headers=headers, data=json.dumps(payload))\n        response.raise_for_status()\n        receipt = response.json()\n        print(f\"Transaction receipt: {receipt}\")\n        return receipt\n    except requests.exceptions.RequestException as e:\n        print(f\"Error sending transaction: {e}\")\n        raise\n\n# Example usage:\n# signed_tx = \"0xf86...\"\n// send_sync_transaction(signed_tx)`,
                },
                {
                  language: "rust",
                  code: 
`use reqwest::Client;\nuse serde_json::{json, Value};\nuse std::error::Error;\n\nasync fn send_sync_transaction(signed_tx_data: &str, endpoint: &str) -> Result<Value, Box<dyn Error>> {\n    let client = Client::new();\n    let payload = json!({\n        \"jsonrpc\": \"2.0\",\n        \"id\": 1,\n        \"method\": \"eth_sendRawTransactionSync\",\n        \"params\": [signed_tx_data]\n    });\n\n    let response = client.post(endpoint).json(&payload).send().await?;\n    if response.status().is_success() {\n        let receipt: Value = response.json().await?;\n        println!(\"Transaction receipt: {:?}\", receipt);\n        Ok(receipt)\n    } else {\n        Err(format!(\"HTTP error! status: {}\", response.status()).into())\n    }\n}\n\n// #[tokio::main]\n// async fn main() {\n//     let signed_tx = \"0xf86...\";\n//     match send_sync_transaction(signed_tx, \"https://your-rise-node-endpoint/http\").await {\n//         Ok(receipt) => println!(\"Receipt: {:?}\", receipt.get(\"result\")),\n//         Err(e) => eprintln!(\"Error: {}\", e),\n//     }\n// }`,
                },
              ]}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <h3 className="font-bold text-white text-xl border-t border-white/10 pt-6 mt-8 mb-4">Response Example (Transaction Receipt)</h3>
            <CodeTabs tabs={[{ language: "json", code: JSON.stringify({"jsonrpc":"2.0","id":1,"result":{"blockHash":"0xabc...","blockNumber":"0x1b4...","contractAddress":null,"cumulativeGasUsed":"0x33bc...","from":"0x123...","gasUsed":"0x15f90","logs":[],"logsBloom":"0x00...","status":"0x1","to":"0x456...","transactionHash":"0xdef...","transactionIndex":"0x0..."}}, null, 2) }]} />
            
            <div className="mt-8 p-4 bg-black/30 border border-white/10 rounded-lg">
              <p className="text-gray-300 text-sm flex items-center">
                <svg className="w-5 h-5 mr-2 text-brand-light-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                This method provides immediate feedback on transaction processing, including a receipt if the transaction is included in a Shred, even before full block finalization.
              </p>
            </div>
          </motion.div>
        </motion.section>
      </main>
    </div>
  );
}

```

End of src/app/api-docs/page.tsx

---

## src/app/data/page.tsx

```typescript
'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import dynamic from 'next/dynamic';

// Use dynamic import with no SSR for Three.js components
const ShredVisualizer = dynamic(
  () => import('@/components/visualizers/ShredVisualizer'),
  { ssr: false }
);

// NetworkPropagation is not used in this component
// Removed to fix linting error

// Mock data - in a real app, you would fetch this from an API
const txData = [
  { name: '18:00', throughput: 4000 },
  { name: '18:05', throughput: 3000 },
  { name: '18:10', throughput: 5000 },
  { name: '18:15', throughput: 4780 },
  { name: '18:20', throughput: 6090 },
  { name: '18:25', throughput: 5500 },
  { name: '18:30', throughput: 7200 },
];

const latencyData = [
  { name: 'RISE', latency: 1.5, fill: '#A076F9' },
  { name: 'MegaETH', latency: 25.3, fill: '#76F9A0' },
  { name: 'Base', latency: 48.2, fill: '#4287f5' },
  { name: 'Arbitrum', latency: 92.7, fill: '#f542e3' },
];

export default function DataPage() {
  return (
    <main className="flex-1 p-8 md:p-12 overflow-y-auto ml-64">
      <h1 className="text-4xl font-bold mb-8">Shreds Network Activity</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* TPS Chart Widget */}
        <div className="p-6 bg-transparent backdrop-blur-md border border-gray-800/50 rounded-xl">
          <h3 className="text-xl font-bold mb-4">Transaction Throughput (TPS)</h3>
          <div className="w-full h-72">
            <ResponsiveContainer>
              <LineChart data={txData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#373737" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#121212', border: '1px solid #373737' }} 
                  formatter={(value) => [`${value} TPS`, 'Throughput']}
                />
                <Line 
                  type="monotone" 
                  dataKey="throughput" 
                  stroke="#A076F9" 
                  strokeWidth={2} 
                  dot={{ r: 4 }} 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Latency Comparison */}
        <div className="p-6 bg-transparent backdrop-blur-md border border-gray-800/50 rounded-xl">
          <h3 className="text-xl font-bold mb-4">Latency Comparison (ms)</h3>
          <div className="w-full h-72">
            <ResponsiveContainer>
              <BarChart data={latencyData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#373737" horizontal={false} />
                <XAxis type="number" stroke="#888" />
                <YAxis dataKey="name" type="category" stroke="#888" width={80} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#121212', border: '1px solid #373737' }} 
                  formatter={(value) => [`${value} ms`, 'Latency']}
                />
                <Bar dataKey="latency" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Live Shred Propagation */}
        <div className="p-6 bg-transparent backdrop-blur-md border border-gray-800/50 rounded-xl">
          <h3 className="text-xl font-bold mb-4">Live Shred Propagation</h3>
          <p className="text-gray-400 mb-4">Real-time visualization of shreds being broadcast across the network.</p>
          <div className="w-full h-72 bg-rise-dark/30 rounded-lg overflow-hidden">
            {/* Advanced 3D visualization of shreds */}
            <ShredVisualizer
              blocks={5}
              blockMoveSpeed={1.2}
              shredSpawnRate={0.06}
              interactive
            />
          </div>
        </div>

        {/* Network Status */}
        <div className="p-6 bg-transparent backdrop-blur-md border border-gray-800/50 rounded-xl">
          <h3 className="text-xl font-bold mb-4">Network Status</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-transparent backdrop-blur-md border border-gray-800/50 rounded-lg">
              <span className="text-gray-400">Current Block Height</span>
              <span className="font-mono text-white">1,283,471</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-transparent backdrop-blur-md border border-gray-800/50 rounded-lg">
              <span className="text-gray-400">Active Validators</span>
              <span className="font-mono text-white">548</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-transparent backdrop-blur-md border border-gray-800/50 rounded-lg">
              <span className="text-gray-400">Avg. Shred Size</span>
              <span className="font-mono text-white">12.7 KB</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-transparent backdrop-blur-md border border-gray-800/50 rounded-lg">
              <span className="text-gray-400">Shred Time</span>
              <span className="font-mono text-brand-cyan">1.2 ms</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

```

End of src/app/data/page.tsx

---

## src/app/docs/page.tsx

```typescript
import Link from 'next/link';

export default function DocsPage() {
  return (
    <div className="flex min-h-screen text-white">
      {/* Sidebar */}
      <aside className="w-64 p-8 border-r border-gray-800 fixed top-16 left-0 h-[calc(100vh-4rem)] overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Documentation</h2>
        <nav className="flex flex-col space-y-2">
          <a href="#core-concepts" className="text-gray-400 hover:text-white">Core Concepts</a>
          <a href="#incremental-construction" className="text-gray-400 hover:text-white">Incremental Block Construction</a>
          <a href="#real-time-apis" className="text-gray-400 hover:text-white">Real-time APIs</a>
          <nav className="flex flex-col space-y-1 pl-4">
            <a href="#rise-subscribe" className="text-gray-400 hover:text-white text-sm">rise_subscribe</a>
            <a href="#send-transaction-sync" className="text-gray-400 hover:text-white text-sm">sendTransactionSync</a>
          </nav>
          <a href="#guides" className="text-gray-400 hover:text-white">Building with Shreds</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto ml-64">
        <section id="core-concepts">
          <h1 className="text-4xl font-bold mb-4">Core Concepts</h1>
          <p className="text-gray-400 mb-6">
            Shreds are the fundamental unit of data transfer and preconfirmation on Risechain. A Shred acts as a sub-block containing a subset of transactions, their receipts, all resulting state changes (account balances, nonces, storage, contract code updates), and logs. Instead of waiting for entire blocks, nodes propagate these smaller, more manageable data chunks that can be processed in parallel. This architecture is key to Risechain&apos;s ability to deliver significant benefits, including:
          </p>
          <ul className="list-disc pl-10 space-y-1 text-gray-300 mb-6">
            <li><strong>Reduced Latency:</strong> Parallel processing of Shreds drastically cuts down transaction processing time.</li>
            <li><strong>Fast Preconfirmations:</strong> Users receive confirmations almost immediately as Shreds are processed, without waiting for full block finalization.</li>
            <li><strong>Early State Updates:</strong> The network achieves faster state synchronization as nodes update their local state upon Shred arrival.</li>
            <li><strong>Efficient Merkleization:</strong> Resource-intensive merkleization is deferred until full L2 block completion, optimizing the process.</li>
          </ul>
          <div className="p-4 my-4 bg-rise-gray rounded-lg border border-gray-800">
            <p><strong className="text-brand-cyan">Key Insight:</strong> Parallel validation and processing of shreds is what unlocks massive throughput gains and low-latency preconfirmations compared to traditional monolithic block propagation.</p>
          </div>
        </section>

        <section id="incremental-construction" className="mt-12">
          <h2 className="text-3xl font-bold mb-4 border-t border-gray-800 pt-8">Incremental Block Construction</h2>
          <p className="text-gray-400 mb-6">
            Risechain employs incremental block construction to achieve fast preconfirmations. Canonical L2 blocks are partitioned into smaller segments called Shreds. Each Shred contains a subset of transactions and their state changes. Critically, a Shred does not perform full merkleization for speed; instead, it records a <code>changeset_root</code> commitment to all state modifications within it. These Shreds are propagated quickly, allowing nodes to update their state and issue preconfirmations almost immediately, well before the full L2 block is finalized.
          </p>
          <div className="my-8 p-6 bg-rise-gray/30 rounded-lg border border-gray-800">
            <h3 className="text-xl font-bold mb-4">Benefits of Shreds</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Reduced latency through parallel processing</li>
              <li>Fast preconfirmations without waiting for full blocks</li>
              <li>Early state updates for faster network synchronization</li>
              <li>Efficient merkleization by deferring until the full block is complete</li>
            </ul>
          </div>
        </section>

        <section id="real-time-apis" className="mt-12">
          <h2 className="text-3xl font-bold mb-4 border-t border-gray-800 pt-8">Real-time APIs</h2>
          <p className="text-gray-400 mb-6">
            Leverage Risechain&apos;s unique architecture for real-time data streams and synchronous transaction handling using the following key API methods.
          </p>

          <section id="rise-subscribe" className="mt-8">
            <h3 className="text-2xl font-semibold mb-3">Subscribing to Real-time Data with <code>rise_subscribe</code></h3>
            <p className="text-gray-400 mb-4">
              The <code>rise_subscribe</code> RPC method allows your application to listen for real-time events on the Risechain network. This is crucial for use cases requiring immediate updates, such as live dashboards, trading bots, or advanced network monitoring tools.
            </p>
            <p className="text-gray-400 mb-4">
              You can subscribe to two main types of events:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4">
              <li><strong>Logs:</strong> Receive notifications for contract events (logs) as they are emitted and included in a Shred. You can filter logs by contract address and topics. A key feature is that the <code>blockHash</code> field in the log notification will be <code>null</code> if the transaction is only in a Shred and not yet finalized in a full block, indicating a preconfirmation.</li>
              <li><strong>Shreds:</strong> Receive detailed notifications for each new Shred, including all its transactions, receipts, and state changes. This gives a comprehensive, up-to-date view of network activity before blocks are finalized.</li>
            </ul>
            <h4 className="text-lg font-semibold mt-6 mb-2">Conceptual Examples:</h4>
            <p className="text-gray-400 mb-2"><strong>Subscribing to Logs:</strong></p>
            <pre className="bg-gray-900 p-4 rounded-md text-sm overflow-x-auto"><code>{`{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "rise_subscribe",
  "params": [
    "logs",
    {
      "address":  "0x99dbe4aea58e518c50a1c04ae9b48c9f6354612f",
      "topics":  ["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"]
    }
  ]
}`}</code></pre>
            <p className="text-gray-400 mt-3 mb-2">Initial Response (Subscription ID):</p>
            <pre className="bg-gray-900 p-4 rounded-md text-sm overflow-x-auto"><code>{`{"jsonrpc":"2.0","id":1,"result":"0x862db97373b7b4c0cebcdff1801c78b4"}`}</code></pre>
            <p className="text-gray-400 mt-3 mb-2">Example Log Notification (note <code>blockHash: null</code>):</p>
            <pre className="bg-gray-900 p-4 rounded-md text-sm overflow-x-auto"><code>{`{
  "jsonrpc": "2.0",
  "method": "rise_subscription",
  "params": {
    "subscription": "0x862db97373b7b4c0cebcdff1801c78b4",
    "result": {
      "address": "0xe03f4c6749c2b1b1638e0e42a1b1b33af1195c12",
      "topics": ["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"],
      "data": "0x...",
      "blockHash": null,
      "blockNumber": "0xc481e2",
      "transactionHash": "0xcd46...eb5",
      "transactionIndex": "0x0",
      "logIndex": "0x0",
      "removed": false
    }
  }
}`}</code></pre>
            <p className="text-gray-400 mt-6 mb-2"><strong>Subscribing to New Shreds:</strong></p>
            <pre className="bg-gray-900 p-4 rounded-md text-sm overflow-x-auto"><code>{`{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "rise_subscribe",
  "params": ["shreds"]
}`}</code></pre>
            <p className="text-gray-400 mt-3 mb-2">Initial Response (Subscription ID):</p>
            <pre className="bg-gray-900 p-4 rounded-md text-sm overflow-x-auto"><code>{`{"jsonrpc":"2.0","id":2,"result":"0x656cd5c476a0616f0f0e588949eab10e"}`}</code></pre>
            <p className="text-gray-400 mt-3 mb-2">Example Shred Notification (conceptual, structure may vary):</p>
            <pre className="bg-gray-900 p-4 rounded-md text-sm overflow-x-auto"><code>{`{
  "jsonrpc":"2.0",
  "method":"rise_subscription",
  "params":{
    "subscription":"0x656cd5c476a0616f0f0e588949eab10e",
    "result":{
      "block_number":12878495,
      "shred_idx":19,
      "transactions": [/* ...array of transactions with receipts... */],
      "state_changes": {/* ...map of state changes... */}
    }
  }
}`}</code></pre>
            <Link href="/api-docs#rise_subscribe" className="text-brand-purple hover:underline mt-6 inline-block">
              View <code>rise_subscribe</code> API Details →
            </Link>
          </section>

          <section id="send-transaction-sync" className="mt-8">
            <h3 className="text-2xl font-semibold mb-3">Achieving Synchronous Transactions with <code>sendTransactionSync</code></h3>
            <p className="text-gray-400 mb-4">
              For applications requiring immediate feedback on transaction status, Risechain offers a way to send transactions and receive their receipts synchronously, once they are included in a Shred. This is achieved via the <code>eth_sendRawTransactionSync</code> RPC method.
            </p>
            <p className="text-gray-400 mb-4">
              Unlike the standard <code>eth_sendRawTransaction</code> which returns a transaction hash and requires polling for the receipt, <code>eth_sendRawTransactionSync</code> blocks until the transaction is preconfirmed in a Shred and returns the full transaction receipt directly. This simplifies application logic and enhances user experience by providing instant confirmation.
            </p>
            <p className="text-gray-400 mb-4">
              Client-side libraries, such as the one including <code>createSyncPublicClient</code>, often provide convenient wrappers (e.g., a <code>sendRawTransactionSync</code> function) around this RPC method to make integration seamless.
            </p>
            <h4 className="text-lg font-semibold mt-6 mb-2">Conceptual Examples:</h4>
            <p className="text-gray-400 mb-2"><strong>Sending a Synchronous Transaction:</strong></p>
            <pre className="bg-gray-900 p-4 rounded-md text-sm overflow-x-auto"><code>{`{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "eth_sendRawTransactionSync",
  "params": ["0xYOUR_SIGNED_TRANSACTION_DATA_HERE"]
}`}</code></pre>
            <p className="text-gray-400 mt-3 mb-2">Response (Full Transaction Receipt):</p>
            <pre className="bg-gray-900 p-4 rounded-md text-sm overflow-x-auto"><code>{`{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x...",
    "blockNumber": "0x...",
    "contractAddress": null, // Or address if a contract was created
    "cumulativeGasUsed": "0x...",
    "from": "0x...",
    "gasUsed": "0x...",
    "logs": [/* ...array of logs... */],
    "logsBloom": "0x...",
    "status": "0x1", // 0x1 for success, 0x0 for failure
    "to": "0x...",
    "transactionHash": "0x...",
    "transactionIndex": "0x..."
    // ... other receipt fields
  }
}`}</code></pre>
            <Link href="/api-docs#eth_sendRawTransactionSync" className="text-brand-purple hover:underline mt-6 inline-block">
              View <code>eth_sendRawTransactionSync</code> API Details →
            </Link>
          </section>
        </section>

        <section id="guides" className="mt-12">
          <h2 className="text-3xl font-bold mb-4 border-t border-gray-800 pt-8">Building with Shreds</h2>
          <p className="text-gray-400 mb-6">
            Developers can leverage Shreds to build applications that require extremely low latency and high throughput.
            Below are guides to help you get started:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="p-6 bg-rise-gray/30 rounded-lg border border-gray-800 hover:bg-rise-gray/50 transition-colors">
              <h3 className="text-xl font-bold mb-2">Getting Started</h3>
              <p className="text-gray-400 mb-4">Introduction to Shreds, core concepts, and key APIs like <code>rise_subscribe</code> and <code>sendTransactionSync</code>. Basic integration patterns.</p>
              <Link href="/api-docs" className="text-brand-purple hover:underline">
                Read Guide →
              </Link>
            </div>
            <div className="p-6 bg-rise-gray/30 rounded-lg border border-gray-800 hover:bg-rise-gray/50 transition-colors">
              <h3 className="text-xl font-bold mb-2">Advanced Techniques</h3>
              <p className="text-gray-400 mb-4">Optimizing for ultra-low latency. Learn how to combine <code>rise_subscribe</code> with <code>sendTransactionSync</code> for advanced, real-time applications.</p>
              <Link href="#" className="text-brand-purple hover:underline">
                Read Guide →
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

```

End of src/app/docs/page.tsx

---

## src/app/globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Base Colors */
  --background: #121212; /* rise-dark */
  --foreground: #ffffff;
  --rise-gray: #1E1E1E;
  --brand-purple: #6B37BC;
  --brand-light-purple: #9747FF;
  --brand-blue: #5BC2FF;
  --brand-cyan: #5BC2FF;
  
  /* Glass Effects */
  --glass-bg: rgba(255, 255, 255, 0.05);
  --glass-bg-hover: rgba(255, 255, 255, 0.08);
  --glass-border: rgba(255, 255, 255, 0.1);
  --glass-border-hover: rgba(255, 255, 255, 0.2);
  --glass-blur: 20px;
  --glass-blur-strong: 40px;
  
  /* Enhanced Gradients */
  --gradient-primary: linear-gradient(135deg, #6B37BC 0%, #9747FF 50%, #5BC2FF 100%);
  --gradient-secondary: linear-gradient(45deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  --gradient-accent: linear-gradient(90deg, #9747FF 0%, #5BC2FF 100%);
  --gradient-glow: radial-gradient(circle, rgba(107, 55, 188, 0.3) 0%, transparent 70%);
  
  /* Shadows & Glows */
  --shadow-glass: 0 8px 32px rgba(0, 0, 0, 0.37);
  --shadow-glow: 0 8px 32px rgba(107, 55, 188, 0.3);
  --shadow-glow-hover: 0 12px 48px rgba(107, 55, 188, 0.4);
  --shadow-inner: inset 0 2px 4px rgba(255, 255, 255, 0.1);
  
  /* Animation Variables */
  --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-bounce: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --transition-elastic: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

body {
  color: var(--foreground);
  background: radial-gradient(circle at top left, #1b1b1b 0%, #0a0a0a 100%);
  font-family: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
  overflow-x: hidden;
}

/* Base Glass Components */
.glass-card {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: 1rem;
  box-shadow: var(--shadow-glass);
  transition: var(--transition-smooth);
  position: relative;
  overflow: hidden;
}

.glass-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  opacity: 0.5;
}

.glass-card:hover {
  background: var(--glass-bg-hover);
  border-color: var(--glass-border-hover);
  box-shadow: var(--shadow-glow-hover);
  transform: translateY(-4px);
}

/* Navigation Glass */
.glass-nav {
  background: rgba(18, 18, 18, 0.8);
  backdrop-filter: blur(var(--glass-blur-strong));
  -webkit-backdrop-filter: blur(var(--glass-blur-strong));
  border-bottom: 1px solid var(--glass-border);
  position: sticky;
  top: 0;
  z-index: 100;
}

/* Enhanced Buttons */
.btn-primary {
  background: var(--gradient-primary);
  border: 1px solid var(--glass-border);
  border-radius: 0.75rem;
  padding: 0.875rem 2rem;
  font-weight: 600;
  color: white;
  position: relative;
  overflow: hidden;
  transition: var(--transition-smooth);
  box-shadow: var(--shadow-glow);
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.btn-primary:hover::before {
  left: 100%;
}

.btn-primary:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: var(--shadow-glow-hover);
}

.btn-secondary {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: 0.75rem;
  padding: 0.875rem 2rem;
  font-weight: 500;
  color: white;
  transition: var(--transition-smooth);
}

.btn-secondary:hover {
  background: var(--glass-bg-hover);
  border-color: var(--glass-border-hover);
  transform: translateY(-1px);
}

/* Gradient Text */
.gradient-text {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  display: inline-block;
}

/* Performance Metrics Cards */
.metric-card {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: 1.5rem;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  transition: var(--transition-bounce);
}

.metric-card::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: var(--gradient-glow);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.metric-card:hover::after {
  opacity: 0.1;
}

.metric-card:hover {
  transform: scale(1.05) translateY(-8px);
  border-color: var(--glass-border-hover);
}

/* Code Blocks Enhancement */
.code-block {
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  padding: 1.5rem;
  font-family: 'Geist Mono', monospace;
  position: relative;
  overflow: hidden;
}

.code-block::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--gradient-accent);
}

/* Loading States */
.loading-shimmer {
  background: linear-gradient(
    90deg,
    var(--glass-bg) 25%,
    var(--glass-bg-hover) 50%,
    var(--glass-bg) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}

/* Custom scrollbar for the dark theme */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: var(--rise-gray);
}

::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #444;
}

/* Custom animations */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .glass-card {
    border-radius: 0.75rem;
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    padding: 1.5rem;
  }
  
  .btn-primary, .btn-secondary {
    padding: 0.75rem 1.5rem;
    font-size: 0.875rem;
  }
  
  .metric-card {
    padding: 1.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .animate-pulse,
  .btn-primary::before,
  .glass-card:hover,
  .metric-card:hover,
  .loading-shimmer {
    animation: none;
    transition: none;
    transform: none;
  }
}

```

End of src/app/globals.css

---

## src/app/page.tsx

```typescript
'use client';

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Dynamic imports for heavy components
const ParticleNetworkHero = dynamic(() => import('@/components/animations/ParticleNetworkHero'), { ssr: false });
const TransactionFlowVisualizer = dynamic(() => import('@/components/animations/TransactionFlowVisualizer'), { ssr: false });

const performanceMetrics = [
  {
    value: "1.5ms",
    label: "Confirmation Time",
    comparison: "60x faster than competitors",
    icon: "⚡",
    color: "text-brand-purple"
  },
  {
    value: "7,200",
    label: "Transactions Per Second",
    comparison: "Continuous processing",
    icon: "🚀",
    color: "text-brand-cyan"
  },
  {
    value: "99.9%",
    label: "Network Uptime",
    comparison: "Economically secured",
    icon: "🛡️",
    color: "text-green-400"
  }
];

const features = [
  {
    title: "Real-time Preconfirmations",
    description: "Get instant transaction confirmations through economically secured shred propagation, eliminating the need to wait for block finalization.",
    icon: "⚡",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "Parallel Processing",
    description: "Shreds enable concurrent transaction processing across multiple lanes, dramatically increasing throughput and reducing bottlenecks.",
    icon: "🔄",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    title: "Web-scale APIs",
    description: "Built-in real-time subscriptions and synchronous transaction methods make integration seamless for modern applications.",
    icon: "🌐",
    gradient: "from-green-500 to-teal-500"
  }
];

const useCases = [
  {
    title: "DeFi Trading",
    description: "Execute trades with millisecond confirmations, perfect for arbitrage and high-frequency strategies.",
    metrics: ["1.5ms confirmations", "Zero MEV", "Real-time prices"]
  },
  {
    title: "Gaming & NFTs",
    description: "Create responsive gaming experiences with instant asset transfers and state updates.",
    metrics: ["Instant moves", "Real-time inventory", "Live leaderboards"]
  },
  {
    title: "Enterprise Apps",
    description: "Build business applications that feel as responsive as traditional databases.",
    metrics: ["API-first design", "99.9% uptime", "Enterprise SLAs"]
  }
];

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeMetric, setActiveMetric] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Cycle through metrics
    const interval = setInterval(() => {
      setActiveMetric(prev => (prev + 1) % performanceMetrics.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      {/* Background Effects */}
      <ParticleNetworkHero />
      
      <main className="relative min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants} className="mb-8">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6">
                Blockchain at{" "}
                <span className="gradient-text inline-block">
                  Web Speed
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                Shreds revolutionize blockchain performance through parallel processing and real-time confirmations. 
                Build applications that respond instantly, scale infinitely, and never compromise on security.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link href="/docs" className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-3">
                <span>Get Started</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              
              <Link href="/api-docs" className="btn-secondary text-lg px-8 py-4 inline-flex items-center gap-3">
                <span>View API Docs</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </Link>
            </motion.div>

            {/* Performance Metrics */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {performanceMetrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  className={`metric-card group cursor-pointer ${
                    activeMetric === index ? 'border-white/30' : ''
                  }`}
                  whileHover={{ scale: 1.05 }}
                  onHoverStart={() => setActiveMetric(index)}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">{metric.icon}</div>
                    <div className={`text-4xl md:text-5xl font-bold mb-2 ${metric.color}`}>
                      {metric.value}
                    </div>
                    <div className="text-white font-medium mb-1">{metric.label}</div>
                    <div className="text-sm text-gray-400">{metric.comparison}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Live Demo Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                See Shreds in <span className="gradient-text">Action</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Watch real-time transaction processing through parallel shred lanes. 
                This visualization shows how transactions flow from queue to confirmation in milliseconds.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <TransactionFlowVisualizer />
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Built for <span className="gradient-text">Modern Applications</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Shreds provide the infrastructure for the next generation of blockchain applications, 
                combining the security of decentralization with the performance of centralized systems.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="glass-card p-8 group hover:scale-105 transition-all duration-300"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-black/20">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Perfect for <span className="gradient-text">Any Use Case</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                From high-frequency trading to gaming and enterprise applications, 
                Shreds provide the performance foundation your users expect.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {useCases.map((useCase, index) => (
                <motion.div
                  key={useCase.title}
                  className="glass-card p-8 relative overflow-hidden group"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <h3 className="text-2xl font-bold mb-4 text-white">{useCase.title}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">{useCase.description}</p>
                  
                  <div className="space-y-2">
                    {useCase.metrics.map((metric, metricIndex) => (
                      <div key={metricIndex} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-gradient-primary rounded-full"></div>
                        <span className="text-gray-400">{metric}</span>
                      </div>
                    ))}
                  </div>

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-4xl mx-auto text-center glass-card p-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Build the <span className="gradient-text">Future</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Join the revolution in blockchain performance. Start building applications 
              that respond instantly and scale without limits.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/docs" className="btn-primary text-lg px-8 py-4">
                Start Building Today
              </Link>
              <Link href="/api-docs" className="btn-secondary text-lg px-8 py-4">
                Explore the APIs
              </Link>
            </div>
            
            <div className="mt-8 text-sm text-gray-400">
              No setup required • Free testnet access • Full documentation
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
}

```

End of src/app/page.tsx

---

## src/components/Footer.tsx

```typescript
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-transparent backdrop-blur-md border-t border-gray-800/50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Tagline */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-iridescent-gradient rounded-full"></div>
              <span className="font-bold text-white">Shreds</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              The next evolution in blockchain efficiency.
            </p>
          </div>

          {/* Links - Documentation */}
          <div className="col-span-1">
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Documentation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/docs#core-concepts" className="text-gray-400 hover:text-white transition-colors">
                  Core Concepts
                </Link>
              </li>
              <li>
                <Link href="/docs#incremental-construction" className="text-gray-400 hover:text-white transition-colors">
                  Incremental Construction
                </Link>
              </li>
              <li>
                <Link href="/docs#guides" className="text-gray-400 hover:text-white transition-colors">
                  Building with Shreds
                </Link>
              </li>
            </ul>
          </div>

          {/* Links - API */}
          <div className="col-span-1">
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">API Reference</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/api-docs#get-shred" className="text-gray-400 hover:text-white transition-colors">
                  Get Shred
                </Link>
              </li>
              <li>
                <Link href="/api-docs#post-shred" className="text-gray-400 hover:text-white transition-colors">
                  Create Shred
                </Link>
              </li>
              <li>
                <Link href="/api-docs#get-block" className="text-gray-400 hover:text-white transition-colors">
                  Get Block
                </Link>
              </li>
            </ul>
          </div>

          {/* Links - Connect */}
          <div className="col-span-1">
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://github.com/risechain/shreds" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://twitter.com/risechain" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://discord.gg/risechain" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  Discord
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-800">
          <p className="text-center text-xs text-gray-500">
            © {new Date().getFullYear()} Risechain. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

```

End of src/components/Footer.tsx

---

## src/components/Navigation.tsx

```typescript
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  href: string;
  label: string;
  icon?: string;
  description?: string;
}

const navItems: NavItem[] = [
  { 
    href: '/', 
    label: 'Home', 
    icon: '🏠',
    description: 'Platform overview' 
  },
  { 
    href: '/docs', 
    label: 'Docs', 
    icon: '📚',
    description: 'Documentation & guides' 
  },
  { 
    href: '/api-docs', 
    label: 'API', 
    icon: '⚡',
    description: 'API reference' 
  },
  { 
    href: '/data', 
    label: 'Data', 
    icon: '📊',
    description: 'Live network data' 
  },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <motion.header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'glass-nav shadow-lg' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full opacity-90"></div>
                </div>
                <motion.div
                  className="absolute -inset-2 bg-gradient-primary rounded-full opacity-20 blur-sm"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2] 
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: 'easeInOut' 
                  }}
                />
              </motion.div>
              
              <div className="flex items-center">
                <span className="font-bold text-xl text-white group-hover:gradient-text transition-all duration-300">
                  Shreds
                </span>
                <span className="text-gray-400 text-sm ml-2 flex items-center">
                  by
                  <img 
                    src="/RISE_Light.png" 
                    alt="RISE" 
                    className="ml-1 h-4 opacity-80 group-hover:opacity-100 transition-opacity" 
                  />
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <div 
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setHoveredItem(item.href)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Link
                    href={item.href}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                      isActive(item.href)
                        ? 'text-white bg-white/10 backdrop-blur-sm'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="text-xs">{item.icon}</span>
                    {item.label}
                    
                    {/* Active indicator */}
                    {isActive(item.href) && (
                      <motion.div
                        className="absolute bottom-0 left-1/2 w-1 h-1 bg-gradient-primary rounded-full"
                        layoutId="activeIndicator"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        style={{ translateX: '-50%', translateY: '150%' }}
                      />
                    )}
                  </Link>

                  {/* Hover tooltip */}
                  <AnimatePresence>
                    {hoveredItem === item.href && item.description && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-black/80 backdrop-blur-sm text-white text-xs rounded-lg border border-white/10 whitespace-nowrap z-50"
                      >
                        {item.description}
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/80 rotate-45 border-t border-l border-white/10"></div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden sm:flex items-center gap-4">
              <motion.a 
                href="https://github.com/risechain/shreds"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm font-medium flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/10 bg-black/90 backdrop-blur-xl"
            >
              <div className="container mx-auto px-4 py-4">
                <nav className="space-y-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                        isActive(item.href)
                          ? 'text-white bg-white/10 backdrop-blur-sm'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span className="text-base">{item.icon}</span>
                      <div>
                        <div>{item.label}</div>
                        {item.description && (
                          <div className="text-xs text-gray-500">{item.description}</div>
                        )}
                      </div>
                    </Link>
                  ))}
                </nav>
                
                <div className="mt-4 pt-4 border-t border-white/10">
                  <a 
                    href="https://github.com/risechain/shreds"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-16"></div>
    </>
  );
}

```

End of src/components/Navigation.tsx

---

## src/components/animations/NetworkPropagation.tsx

```typescript
'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function NetworkPropagation() {
  const mountRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 2, 0.1, 1000);
    camera.position.z = 50;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(600, 300);
    renderer.setClearColor(0x121212, 0.5);
    mountRef.current.appendChild(renderer.domElement);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 10, 10);
    scene.add(directionalLight);
    
    // Create a network of nodes
    const nodeCount = 30;
    const nodes: THREE.Mesh[] = [];
    const nodePositions: THREE.Vector3[] = [];
    const nodeMaterial = new THREE.MeshPhongMaterial({
      color: 0x6B37BC,
      emissive: 0x2b0b55
    });
    const nodeGeometry = new THREE.SphereGeometry(0.5, 16, 16);
    
    // Create nodes in a distributed network pattern
    for (let i = 0; i < nodeCount; i++) {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial.clone());
      
      // Distribute nodes in a somewhat spherical pattern
      const radius = 15 + Math.random() * 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      node.position.set(x, y, z);
      nodePositions.push(node.position.clone());
      scene.add(node);
      nodes.push(node);
    }
    
    // Create connections between nodes (edges of the network)
    const connections: THREE.Line[] = [];
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x9747FF,
      transparent: true,
      opacity: 0.3
    });
    
    // Connect each node to several nearby nodes
    for (let i = 0; i < nodeCount; i++) {
      // Find 2-4 nearest nodes to connect to
      const connectionCount = 2 + Math.floor(Math.random() * 3);
      const distances = nodePositions.map((pos, index) => ({
        index,
        distance: nodePositions[i].distanceTo(pos)
      }));
      
      // Sort by distance and skip the first one (itself)
      distances.sort((a, b) => a.distance - b.distance);
      
      for (let j = 1; j <= connectionCount && j < distances.length; j++) {
        const targetIndex = distances[j].index;
        
        // Create a line between the nodes
        const points = [
          nodePositions[i],
          nodePositions[targetIndex]
        ];
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(lineGeometry, lineMaterial);
        scene.add(line);
        connections.push(line);
      }
    }
    
    // Shreds animation
    const shreds: {
      mesh: THREE.Mesh,
      startNode: number,
      targetNode: number,
      progress: number,
      speed: number,
      size: number,
      active: boolean
    }[] = [];
    
    // Create 25 shreds
    for (let i = 0; i < 25; i++) {
      const shredSize = 0.2 + Math.random() * 0.3;
      const shredGeometry = new THREE.BoxGeometry(shredSize, shredSize, shredSize);
      const shredMaterial = new THREE.MeshPhongMaterial({
        color: 0x5BC2FF,
        emissive: 0x5BC2FF,
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.9
      });
      
      const shredMesh = new THREE.Mesh(shredGeometry, shredMaterial);
      shredMesh.visible = false;
      scene.add(shredMesh);
      
      shreds.push({
        mesh: shredMesh,
        startNode: 0,
        targetNode: 0,
        progress: 0,
        speed: 0.01 + Math.random() * 0.04, // Random speed for each shred
        size: shredSize,
        active: false
      });
    }
    
    // Origin node (sequencer) - make it bigger and special
    const sequencerNodeIndex = 0;
    nodes[sequencerNodeIndex].scale.set(2, 2, 2);
    (nodes[sequencerNodeIndex].material as THREE.MeshPhongMaterial).color.set(0x6B37BC);
    (nodes[sequencerNodeIndex].material as THREE.MeshPhongMaterial).emissive.set(0x9747FF);
    (nodes[sequencerNodeIndex].material as THREE.MeshPhongMaterial).emissiveIntensity = 0.4;
    
    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      
      // Gently rotate the entire network
      scene.rotation.y += 0.002;
      scene.rotation.x = Math.sin(Date.now() * 0.0005) * 0.1;
      
      // Randomly activate a shred if fewer than 15 are active
      const activeShredCount = shreds.filter(s => s.active).length;
      if (activeShredCount < 15 && Math.random() < 0.05) {
        const inactiveShreds = shreds.filter(s => !s.active);
        if (inactiveShreds.length > 0) {
          const shredToActivate = inactiveShreds[Math.floor(Math.random() * inactiveShreds.length)];
          shredToActivate.active = true;
          shredToActivate.progress = 0;
          shredToActivate.startNode = sequencerNodeIndex;
          
          // Pick a random target node that's not the sequencer
          let targetNode;
          do {
            targetNode = Math.floor(Math.random() * nodeCount);
          } while (targetNode === sequencerNodeIndex);
          
          shredToActivate.targetNode = targetNode;
          shredToActivate.mesh.visible = true;
          
          // Position at the start node
          shredToActivate.mesh.position.copy(nodePositions[shredToActivate.startNode]);
          
          // Make the sequencer node pulse when emitting a shred
          (nodes[sequencerNodeIndex].material as THREE.MeshPhongMaterial).emissiveIntensity = 0.6;
          setTimeout(() => {
            (nodes[sequencerNodeIndex].material as THREE.MeshPhongMaterial).emissiveIntensity = 0.3;
          }, 100);
        }
      }
      
      // Update shreds animation
      shreds.forEach(shred => {
        if (shred.active) {
          // Move along the path from start to target
          shred.progress += shred.speed;
          
          if (shred.progress >= 1) {
            // Reached the target node
            shred.mesh.position.copy(nodePositions[shred.targetNode]);
            
            // Make the target node light up briefly
            const targetNodeMaterial = nodes[shred.targetNode].material as THREE.MeshPhongMaterial;
            const originalColor = targetNodeMaterial.color.clone();
            const originalEmissive = targetNodeMaterial.emissive.clone();
            const originalEmissiveIntensity = targetNodeMaterial.emissiveIntensity;
            
            targetNodeMaterial.color.set(0x5BC2FF);
            targetNodeMaterial.emissive.set(0x5BC2FF);
            targetNodeMaterial.emissiveIntensity = 0.5;
            
            setTimeout(() => {
              targetNodeMaterial.color.copy(originalColor);
              targetNodeMaterial.emissive.copy(originalEmissive);
              targetNodeMaterial.emissiveIntensity = originalEmissiveIntensity;
            }, 200);
            
            // Set a new target or deactivate
            if (Math.random() < 0.7) {
              // Keep propagating to another node
              shred.startNode = shred.targetNode;
              
              // Find a new target node that's connected to the current one
              const connectedNodes = [];
              for (let i = 0; i < nodeCount; i++) {
                if (i !== shred.startNode && 
                    nodePositions[shred.startNode].distanceTo(nodePositions[i]) < 30) {
                  connectedNodes.push(i);
                }
              }
              
              if (connectedNodes.length > 0) {
                shred.targetNode = connectedNodes[Math.floor(Math.random() * connectedNodes.length)];
                shred.progress = 0;
              } else {
                // No connected nodes found, deactivate
                shred.active = false;
                shred.mesh.visible = false;
              }
            } else {
              // Stop propagation
              shred.active = false;
              shred.mesh.visible = false;
            }
          } else {
            // Interpolate position between start and target nodes
            const startPos = nodePositions[shred.startNode];
            const targetPos = nodePositions[shred.targetNode];
            
            shred.mesh.position.lerpVectors(startPos, targetPos, shred.progress);
            
            // Rotate the shred as it moves
            shred.mesh.rotation.x += 0.05;
            shred.mesh.rotation.y += 0.05;
          }
        }
      });
      
      renderer.render(scene, camera);
    }
    
    // Start animation
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (mountRef.current) {
        const width = mountRef.current.clientWidth;
        const height = 300; // Fixed height
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial sizing
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of geometries and materials
      nodeGeometry.dispose();
      nodes.forEach(node => {
        (node.material as THREE.MeshPhongMaterial).dispose();
      });
      
      connections.forEach(connection => {
        connection.geometry.dispose();
        (connection.material as THREE.LineBasicMaterial).dispose();
      });
      
      shreds.forEach(shred => {
        (shred.mesh.geometry as THREE.BoxGeometry).dispose();
        (shred.mesh.material as THREE.MeshPhongMaterial).dispose();
      });
    };
  }, []);
  
  return (
    <div 
      ref={mountRef} 
      className="w-full h-[300px]"
      aria-label="3D animation showing shreds propagating through a network"
    />
  );
}

```

End of src/components/animations/NetworkPropagation.tsx

---

## src/components/animations/ParticleNetworkHero.tsx

```typescript
'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

// Particle interface
interface Particle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  connections: string[];
  id: string;
  size: number;
  color: THREE.Color;
  pulseIntensity: number;
  pulseSpeed: number;
  isActive: boolean;
}

// Detect if we're on a mobile device to reduce particle count
const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

// Particles component
function Particles() {
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;
  
  // Create particles
  const [particles, setParticles] = useState<Particle[]>(() => {
    const count = isMobile() ? 100 : 300;
    const temp: Particle[] = [];
    
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 15;
      const y = (Math.random() - 0.5) * 15;
      const z = (Math.random() - 0.5) * 5;
      
      temp.push({
        position: new THREE.Vector3(x, y, z),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01
        ),
        connections: [],
        id: `particle-${i}`,
        size: Math.random() * 0.2 + 0.1,
        color: new THREE.Color(
          0.5 + Math.random() * 0.2,  // R
          0.2 + Math.random() * 0.3,  // G
          0.8 + Math.random() * 0.2   // B
        ),
        pulseIntensity: Math.random() * 0.5 + 0.5,
        pulseSpeed: Math.random() * 0.5 + 0.5,
        isActive: Math.random() > 0.7
      });
    }
    
    return temp;
  });
  
  // Points reference
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  
  // Animation frame
  useFrame(({ clock }) => {
    if (!pointsRef.current || !linesRef.current) return;
    
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const colors = pointsRef.current.geometry.attributes.color.array as Float32Array;
    const sizes = pointsRef.current.geometry.attributes.size.array as Float32Array;
    
    // Update particles
    const updatedParticles = [...particles];
    const time = clock.getElapsedTime();
    
    updatedParticles.forEach((particle, i) => {
      // Update position
      particle.position.add(particle.velocity);
      
      // Boundaries check
      if (Math.abs(particle.position.x) > 10) particle.velocity.x *= -1;
      if (Math.abs(particle.position.y) > 10) particle.velocity.y *= -1;
      if (Math.abs(particle.position.z) > 5) particle.velocity.z *= -1;
      
      // Update position in buffer
      const idx = i * 3;
      positions[idx] = particle.position.x;
      positions[idx + 1] = particle.position.y;
      positions[idx + 2] = particle.position.z;
      
      // Pulsing effect
      const pulse = Math.sin(time * particle.pulseSpeed) * 0.5 + 0.5;
      const size = particle.size * (1 + pulse * particle.pulseIntensity * 0.3);
      sizes[i] = size * aspect;
      
      // Color based on activity
      const colorIdx = i * 3;
      if (particle.isActive) {
        // Active particles are more blue/cyan
        colors[colorIdx] = 0.3 + pulse * 0.1;
        colors[colorIdx + 1] = 0.5 + pulse * 0.2;
        colors[colorIdx + 2] = 0.9;
      } else {
        // Inactive particles are more purple
        colors[colorIdx] = 0.5 + pulse * 0.1;
        colors[colorIdx + 1] = 0.2 + pulse * 0.1;
        colors[colorIdx + 2] = 0.8;
      }
    });
    
    // Find connections between particles
    const connections: [number, number][] = [];
    const linePositions: number[] = [];
    const lineColors: number[] = [];
    
    updatedParticles.forEach((p1, i) => {
      updatedParticles.forEach((p2, j) => {
        if (i !== j) {
          const distance = p1.position.distanceTo(p2.position);
          if (distance < 3) {
            connections.push([i, j]);
            
            // Line positions
            linePositions.push(p1.position.x, p1.position.y, p1.position.z);
            linePositions.push(p2.position.x, p2.position.y, p2.position.z);
            
            // Line colors
            const alpha = 1 - distance / 3;
            lineColors.push(0.5, 0.2, 0.8, 0.5, 0.2, 0.8);
          }
        }
      });
    });
    
    // Update line geometry
    if (linePositions.length > 0) {
      const lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      lineGeometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));
      linesRef.current.geometry.dispose();
      linesRef.current.geometry = lineGeometry;
    }
    
    // Update attributes
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.geometry.attributes.color.needsUpdate = true;
    pointsRef.current.geometry.attributes.size.needsUpdate = true;
  });
  
  // Create geometries
  const particleGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particles.length * 3);
  const colors = new Float32Array(particles.length * 3);
  const sizes = new Float32Array(particles.length);
  
  particles.forEach((particle, i) => {
    const idx = i * 3;
    positions[idx] = particle.position.x;
    positions[idx + 1] = particle.position.y;
    positions[idx + 2] = particle.position.z;
    
    colors[idx] = particle.color.r;
    colors[idx + 1] = particle.color.g;
    colors[idx + 2] = particle.color.b;
    
    sizes[i] = particle.size * aspect;
  });
  
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
  
  // Vertex shader
  const vertexShader = `
    attribute float size;
    varying vec3 vColor;
    
    void main() {
      vColor = color;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = size * (300.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `;
  
  // Fragment shader
  const fragmentShader = `
    varying vec3 vColor;
    
    void main() {
      if (length(gl_PointCoord - vec2(0.5, 0.5)) > 0.5) discard;
      gl_FragColor = vec4(vColor, 1.0);
    }
  `;
  
  return (
    <>
      <points ref={pointsRef} geometry={particleGeometry}>
        <shaderMaterial
          attach="material"
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          vertexColors
          transparent
        />
      </points>
      
      <lineSegments ref={linesRef}>
        <lineBasicMaterial attach="material" vertexColors transparent opacity={0.2} />
      </lineSegments>
    </>
  );
}

// Camera controls
function CameraControls() {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.z = 10;
  }, [camera]);
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.05;
    camera.position.x = Math.sin(t) * 2;
    camera.position.y = Math.cos(t) * 2;
    camera.lookAt(0, 0, 0);
  });
  
  return null;
}

// Main component
export default function ParticleNetworkHero() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  if (prefersReducedMotion) {
    // Simplified static version for users who prefer reduced motion
    return (
      <div className="absolute inset-0 -z-10 opacity-30 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-purple/20 to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-brand-purple/10 blur-3xl"></div>
        <div className="absolute top-1/3 right-1/3 w-48 h-48 rounded-full bg-brand-light-purple/10 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-brand-cyan/10 blur-3xl"></div>
      </div>
    );
  }
  
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas dpr={[1, 2]}>
        <CameraControls />
        <Particles />
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} intensity={0.5} levels={3} mipmapBlur />
        </EffectComposer>
      </Canvas>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 pointer-events-none"></div>
    </div>
  );
}

```

End of src/components/animations/ParticleNetworkHero.tsx

---

## src/components/animations/ShredsAnimation.tsx

```typescript
'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// ShredsAnimation: Visualizes blocks being broken into shreds and processed in parallel
export default function ShredsAnimation() {
  const mountRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(300, 300);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);
    
    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Create the main block (representing a blockchain block)
    const blockGeometry = new THREE.BoxGeometry(2, 2, 2);
    const blockMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xA076F9,
      transparent: true,
      opacity: 0.9,
      emissive: 0xA076F9,
      emissiveIntensity: 0.2,
    });
    const block = new THREE.Mesh(blockGeometry, blockMaterial);
    scene.add(block);
    
    // Create smaller boxes (shreds) that will animate out from the main block
    const shredSize = 0.4;
    const shreddingAnimationDuration = 3000; // ms
    const shreds: THREE.Mesh[] = [];
    const shredMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x76F9A0,
      transparent: true,
      opacity: 0.9,
      emissive: 0x76F9A0,
      emissiveIntensity: 0.3,
    });
    
    const positions = [
      [-1, 1, 1], [0, 1, 1], [1, 1, 1],
      [-1, 0, 1], [0, 0, 1], [1, 0, 1],
      [-1, -1, 1], [0, -1, 1], [1, -1, 1],
      [-1, 1, 0], [0, 1, 0], [1, 1, 0],
      [-1, 0, 0], [0, 0, 0], [1, 0, 0],
      [-1, -1, 0], [0, -1, 0], [1, -1, 0],
      [-1, 1, -1], [0, 1, -1], [1, 1, -1],
      [-1, 0, -1], [0, 0, -1], [1, 0, -1],
      [-1, -1, -1], [0, -1, -1], [1, -1, -1],
    ];
    
    positions.forEach((pos) => {
      const shredGeometry = new THREE.BoxGeometry(shredSize, shredSize, shredSize);
      const shred = new THREE.Mesh(shredGeometry, shredMaterial);
      shred.position.set(pos[0] * shredSize, pos[1] * shredSize, pos[2] * shredSize);
      shred.visible = false; // Initially hidden
      scene.add(shred);
      shreds.push(shred);
    });
    
    // Animation state
    let animationState = 'idle'; // 'idle', 'shredding', 'processing', 'reconstructing'
    let animationStartTime = 0;
    let animationProgress = 0;

    // For orbit effect
    const shredOrbits: {radius: number, speed: number, axis: string, originalPos: THREE.Vector3}[] = [];
    
    // Setup shred orbits
    shreds.forEach((shred) => {
      const radius = 1.5 + Math.random() * 1.5;
      const speed = 0.5 + Math.random() * 1.5;
      const axis = ['x', 'y', 'z'][Math.floor(Math.random() * 3)];
      
      shredOrbits.push({
        radius,
        speed,
        axis,
        originalPos: shred.position.clone()
      });
    });
    
    // Animation logic
    function animate() {
      requestAnimationFrame(animate);
      
      const currentTime = Date.now();
      
      // Rotate the main block slowly when visible
      if (block.visible) {
        block.rotation.x += 0.005;
        block.rotation.y += 0.01;
      }
      
      // State machine for the animation sequence
      switch (animationState) {
        case 'idle':
          // Wait in idle state, then start the shredding animation
          if (Math.random() < 0.005) { // Randomly trigger the animation sequence
            animationState = 'shredding';
            animationStartTime = currentTime;
            block.visible = true;
            shreds.forEach(shred => {
              shred.visible = false;
              shred.position.copy(new THREE.Vector3(0, 0, 0)); // Reset positions
            });
          }
          break;
          
        case 'shredding':
          // Animation to break the block into shreds
          animationProgress = (currentTime - animationStartTime) / shreddingAnimationDuration;
          
          if (animationProgress >= 1) {
            // Transition to processing state
            animationState = 'processing';
            animationStartTime = currentTime;
            block.visible = false;
            shreds.forEach(shred => {
              shred.visible = true;
            });
          } else {
            // Shredding animation
            const scaleDown = 1 - animationProgress;
            block.scale.set(scaleDown, scaleDown, scaleDown);
            
            if (animationProgress > 0.5) {
              // Start showing shreds in second half of the animation
              const shredVisibilityProgress = (animationProgress - 0.5) * 2; // 0 to 1 during second half
              
              shreds.forEach((shred, index) => {
                const shouldBeVisible = index / shreds.length < shredVisibilityProgress;
                shred.visible = shouldBeVisible;
                
                if (shouldBeVisible) {
                  // Initial positions for shreds (coming from the center)
                  const moveProgress = (shredVisibilityProgress - (index / shreds.length)) * 5;
                  const clampedMoveProgress = Math.min(1, Math.max(0, moveProgress));
                  
                  const orbit = shredOrbits[index];
                  const targetPos = orbit.originalPos.clone().multiplyScalar(clampedMoveProgress);
                  shred.position.copy(targetPos);
                }
              });
            }
          }
          break;
          
        case 'processing':
          // Animation for shreds processing in parallel
          animationProgress = (currentTime - animationStartTime) / 5000; // 5 seconds of processing
          
          // Orbit animation for shreds
          shreds.forEach((shred, index) => {
            const orbit = shredOrbits[index];
            const angle = currentTime * 0.001 * orbit.speed;
            
            // Different orbit paths based on the assigned axis
            if (orbit.axis === 'x') {
              shred.position.y = Math.sin(angle) * orbit.radius;
              shred.position.z = Math.cos(angle) * orbit.radius;
              shred.position.x = orbit.originalPos.x;
            } else if (orbit.axis === 'y') {
              shred.position.x = Math.sin(angle) * orbit.radius;
              shred.position.z = Math.cos(angle) * orbit.radius;
              shred.position.y = orbit.originalPos.y;
            } else {
              shred.position.x = Math.sin(angle) * orbit.radius;
              shred.position.y = Math.cos(angle) * orbit.radius;
              shred.position.z = orbit.originalPos.z;
            }
            
            // Rotate the shreds
            shred.rotation.x += 0.01;
            shred.rotation.y += 0.02;
          });
          
          if (animationProgress >= 1) {
            // Transition to reconstructing state
            animationState = 'reconstructing';
            animationStartTime = currentTime;
          }
          break;
          
        case 'reconstructing':
          // Animation to reconstruct the block from shreds
          animationProgress = (currentTime - animationStartTime) / 2000; // 2 seconds to reconstruct
          
          if (animationProgress >= 1) {
            // Transition back to idle
            animationState = 'idle';
            block.visible = true;
            block.scale.set(1, 1, 1);
            shreds.forEach(shred => {
              shred.visible = false;
            });
          } else {
            // Move shreds back to center
            shreds.forEach((shred) => {
              const moveProgress = animationProgress;
              shred.position.multiplyScalar(1 - moveProgress);
              
              // Fade out shreds
              (shred.material as THREE.MeshPhongMaterial).opacity = 0.9 * (1 - moveProgress);
            });
            
            // Fade in the block
            block.visible = true;
            const scaleUp = animationProgress;
            block.scale.set(scaleUp, scaleUp, scaleUp);
            (block.material as THREE.MeshPhongMaterial).opacity = 0.9 * animationProgress;
          }
          break;
      }
      
      renderer.render(scene, camera);
    }
    
    // Start the animation
    animate();
    
    // Cleanup function
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of geometries and materials
      blockGeometry.dispose();
      blockMaterial.dispose();
      shreds.forEach(shred => {
        (shred.geometry as THREE.BoxGeometry).dispose();
      });
      (shredMaterial as THREE.MeshPhongMaterial).dispose();
    };
  }, []);
  
  return (
    <div 
      ref={mountRef} 
      className="w-full h-full flex items-center justify-center"
      aria-label="3D animation visualizing blockchain blocks being broken into shreds"
    />
  );
}

```

End of src/components/animations/ShredsAnimation.tsx

---

## src/components/animations/TransactionFlowVisualizer.tsx

```typescript
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Transaction {
  id: string;
  hash: string;
  from: string;
  to: string;
  value: string;
  gasPrice: string;
  timestamp: number;
  status: 'pending' | 'processing' | 'confirmed' | 'failed';
  shredId?: string;
  confirmationTime?: number;
}

interface ShredLane {
  id: string;
  transactions: Transaction[];
  isProcessing: boolean;
  processingStartTime?: number;
}

const MOCK_ADDRESSES = [
  '0x742d35Cc6639C0532fCc86A47c11e9C3',
  '0x8ba1f109551bD432803012645Hac136c',
  '0x1234567890ABCDEF1234567890ABCDEF',
  '0xDEADBEEF123456789ABCDEF123456789',
  '0x9876543210FEDCBA9876543210FEDCBA'
];

const generateMockTransaction = (): Transaction => ({
  id: Math.random().toString(36).substr(2, 9),
  hash: `0x${Math.random().toString(16).substr(2, 64)}`,
  from: MOCK_ADDRESSES[Math.floor(Math.random() * MOCK_ADDRESSES.length)],
  to: MOCK_ADDRESSES[Math.floor(Math.random() * MOCK_ADDRESSES.length)],
  value: (Math.random() * 10).toFixed(4),
  gasPrice: (20 + Math.random() * 50).toFixed(0),
  timestamp: Date.now(),
  status: 'pending'
});

export default function TransactionFlowVisualizer() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [shredLanes] = useState<ShredLane[]>(() => 
    Array.from({ length: 4 }, (_, i) => ({
      id: `lane-${i}`,
      transactions: [],
      isProcessing: false
    }))
  );
  const [confirmedTransactions, setConfirmedTransactions] = useState<Transaction[]>([]);
  const [isActive, setIsActive] = useState(true);
  const [metrics, setMetrics] = useState({
    tps: 0,
    avgConfirmationTime: 0,
    totalProcessed: 0
  });

  const intervalsRef = useRef<NodeJS.Timeout[]>([]);

  // Generate new transactions
  const generateTransaction = useCallback(() => {
    if (!isActive) return;
    
    const newTx = generateMockTransaction();
    setTransactions(prev => [...prev.slice(-19), newTx]);
    
    // Randomly assign to a shred lane after a short delay
    setTimeout(() => {
      const availableLane = shredLanes.find(lane => !lane.isProcessing);
      if (availableLane) {
        setTransactions(prev => 
          prev.map(tx => 
            tx.id === newTx.id 
              ? { ...tx, status: 'processing', shredId: availableLane.id }
              : tx
          )
        );
        
        // Process in shred lane
        setTimeout(() => {
          const confirmationTime = 1 + Math.random() * 3; // 1-4ms
          setTransactions(prev => 
            prev.map(tx => 
              tx.id === newTx.id 
                ? { ...tx, status: 'confirmed', confirmationTime }
                : tx
            )
          );
          
          // Move to confirmed transactions
          setTimeout(() => {
            setConfirmedTransactions(prev => [
              { 
                ...newTx, 
                status: 'confirmed', 
                confirmationTime,
                shredId: availableLane.id 
              },
              ...prev.slice(0, 9)
            ]);
            
            setTransactions(prev => prev.filter(tx => tx.id !== newTx.id));
          }, 500);
        }, 800 + Math.random() * 400);
      }
    }, 200 + Math.random() * 300);
  }, [isActive, shredLanes]);

  // Auto-generate transactions
  useEffect(() => {
    if (isActive) {
      const interval = setInterval(generateTransaction, 400 + Math.random() * 600);
      intervalsRef.current.push(interval);
      return () => clearInterval(interval);
    }
  }, [isActive, generateTransaction]);

  // Update metrics
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const recentConfirmed = confirmedTransactions.filter(
        tx => now - tx.timestamp < 10000
      );
      
      setMetrics({
        tps: recentConfirmed.length / 10,
        avgConfirmationTime: recentConfirmed.reduce(
          (acc, tx) => acc + (tx.confirmationTime || 0), 0
        ) / Math.max(recentConfirmed.length, 1),
        totalProcessed: confirmedTransactions.length
      });
    }, 1000);

    intervalsRef.current.push(interval);
    return () => clearInterval(interval);
  }, [confirmedTransactions]);

  // Cleanup intervals
  useEffect(() => {
    return () => {
      intervalsRef.current.forEach(clearInterval);
    };
  }, []);

  const truncateHash = (hash: string) => 
    `${hash.slice(0, 6)}...${hash.slice(-4)}`;

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl backdrop-blur-xl border border-white/10">
      {/* Header with Controls */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold gradient-text mb-2">
            Live Shreds Processing
          </h2>
          <p className="text-gray-400">
            Real-time visualization of parallel transaction processing
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsActive(!isActive)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              isActive 
                ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
                : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
            }`}
          >
            {isActive ? 'Pause' : 'Resume'}
          </button>
          
          <button
            onClick={generateTransaction}
            className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all"
          >
            Inject Transaction
          </button>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-brand-cyan">
            {metrics.tps.toFixed(1)}
          </div>
          <div className="text-sm text-gray-400">TPS</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-brand-purple">
            {metrics.avgConfirmationTime.toFixed(1)}ms
          </div>
          <div className="text-sm text-gray-400">Avg Confirmation</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-white">
            {metrics.totalProcessed}
          </div>
          <div className="text-sm text-gray-400">Total Processed</div>
        </div>
      </div>

      {/* Main Flow Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Input Queue */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2 animate-pulse"></div>
            Transaction Queue
          </h3>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            <AnimatePresence>
              {transactions.filter(tx => tx.status === 'pending').map((tx) => (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, x: -20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.9 }}
                  className="glass-card p-3 hover:border-yellow-400/50 transition-all"
                >
                  <div className="flex justify-between items-start text-sm">
                    <div className="flex-1">
                      <div className="font-mono text-white mb-1">
                        {truncateHash(tx.hash)}
                      </div>
                      <div className="text-gray-400 text-xs">
                        {truncateHash(tx.from)} → {truncateHash(tx.to)}
                      </div>
                      <div className="text-brand-cyan text-xs mt-1">
                        {tx.value} ETH • {tx.gasPrice} gwei
                      </div>
                    </div>
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Processing Lanes */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <div className="w-3 h-3 bg-purple-400 rounded-full mr-2 animate-pulse"></div>
            Shred Processing
          </h3>
          
          <div className="space-y-3">
            {shredLanes.map((lane, index) => (
              <div key={lane.id} className="glass-card p-4 relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-300">
                    Lane {index + 1}
                  </span>
                  <div className={`w-2 h-2 rounded-full ${
                    transactions.some(tx => tx.shredId === lane.id && tx.status === 'processing')
                      ? 'bg-purple-400 animate-pulse' 
                      : 'bg-gray-600'
                  }`}></div>
                </div>
                
                {/* Processing Animation */}
                {transactions.some(tx => tx.shredId === lane.id && tx.status === 'processing') && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-400"
                  />
                )}
                
                <div className="text-xs text-gray-400">
                  {transactions.find(tx => tx.shredId === lane.id && tx.status === 'processing')
                    ? `Processing ${truncateHash(transactions.find(tx => tx.shredId === lane.id)?.hash || '')}`
                    : 'Idle'
                  }
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Confirmed Output */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            Confirmed Transactions
          </h3>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            <AnimatePresence>
              {confirmedTransactions.map((tx) => (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, x: 20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="glass-card p-3 border-green-400/20 hover:border-green-400/50 transition-all"
                >
                  <div className="flex justify-between items-start text-sm">
                    <div className="flex-1">
                      <div className="font-mono text-white mb-1">
                        {truncateHash(tx.hash)}
                      </div>
                      <div className="text-gray-400 text-xs">
                        {truncateHash(tx.from)} → {truncateHash(tx.to)}
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-brand-cyan text-xs">
                          {tx.value} ETH
                        </span>
                        <span className="text-green-400 text-xs font-medium">
                          ✓ {tx.confirmationTime?.toFixed(1)}ms
                        </span>
                      </div>
                    </div>
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Flowing Data Streams Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-0.5 w-32 bg-gradient-to-r from-transparent via-purple-400 to-transparent"
            style={{
              top: `${20 + i * 30}%`,
              left: '-10%',
            }}
            animate={{
              x: ['0%', '120vw'],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </div>
  );
}

```

End of src/components/animations/TransactionFlowVisualizer.tsx

---

## src/components/ui/CodeTabs.tsx

```typescript
"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Prism from 'prismjs';

// Import language definitions
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash'; // For curl examples or shell scripts
// Add other languages as needed: import 'prismjs/components/prism-jsx';

// Import a Prism CSS theme
import 'prismjs/themes/prism-tomorrow.css'; 

export type CodeTab = {
  language: string;
  code: string;
};

export default function CodeTabs({ tabs }: { tabs: CodeTab[] }) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null); // Ref for the code element

  useEffect(() => {
    if (codeRef.current && tabs[active]) {
      // Set the language class for Prism
      codeRef.current.className = `language-${tabs[active].language.toLowerCase()}`;
      // Highlight the current code block
      Prism.highlightElement(codeRef.current);
    }
  }, [active, tabs]); // Re-run when active tab or tabs content changes

  // Copy code to clipboard
  const copyToClipboard = () => {
    if (tabs[active]) {
      navigator.clipboard.writeText(tabs[active].code).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  if (tabs.length === 0) {
    return null;
  }

  // Ensure the language name is compatible with Prism's class naming (e.g., 'typescript' -> 'ts')
  const getPrismLanguageClass = (lang: string) => {
    const langLower = lang.toLowerCase();
    if (langLower === 'typescript') return 'ts';
    if (langLower === 'python') return 'py';
    if (langLower === 'rust') return 'rust';
    if (langLower === 'json') return 'json';
    if (langLower === 'bash' || langLower === 'shell' || langLower === 'curl') return 'bash';
    // Default or fallback if no specific mapping
    return langLower;
  };

  // Get language display name
  const getLanguageDisplayName = (lang: string) => {
    const langLower = lang.toLowerCase();
    if (langLower === 'typescript') return 'TypeScript';
    if (langLower === 'python') return 'Python';
    if (langLower === 'rust') return 'Rust';
    if (langLower === 'json') return 'JSON';
    if (langLower === 'bash' || langLower === 'shell') return 'Bash';
    if (langLower === 'curl') return 'cURL';
    // Capitalize first letter for other languages
    return lang.charAt(0).toUpperCase() + lang.slice(1);
  };

  // Get language icon
  const getLanguageIcon = (lang: string) => {
    const langLower = lang.toLowerCase();
    if (langLower === 'typescript') return '📘';
    if (langLower === 'python') return '🐍';
    if (langLower === 'rust') return '⚙️';
    if (langLower === 'json') return '📋';
    if (langLower === 'bash' || langLower === 'shell' || langLower === 'curl') return '💻';
    return '📄';
  };

  return (
    <div className="code-block mb-8 overflow-hidden">
      <div className="flex justify-between items-center bg-black/50 backdrop-blur-sm border-b border-white/10 rounded-t-lg px-4 py-2">
        <div className="flex space-x-1">
          {tabs.map((tab, i) => (
            <motion.button
              key={tab.language}
              onClick={() => setActive(i)}
              className={`px-3 py-1.5 text-sm rounded-md font-mono focus:outline-none transition-all flex items-center gap-2 ${active === i 
                ? "bg-gradient-primary text-white" 
                : "bg-black/30 text-gray-400 hover:bg-black/50 hover:text-white"}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-xs">{getLanguageIcon(tab.language)}</span>
              {getLanguageDisplayName(tab.language)}
              {active === i && (
                <motion.div
                  layoutId="activeCodeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </div>
        <motion.button
          onClick={copyToClipboard}
          className="text-gray-400 hover:text-white text-sm flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-white/5 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {copied ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              Copy Code
            </>
          )}
        </motion.button>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          <pre className={`p-6 text-sm bg-black/40 backdrop-blur-sm rounded-b-lg overflow-x-auto language-${getPrismLanguageClass(tabs[active].language)} border border-t-0 border-white/10`}>
            <code 
              ref={codeRef} 
              className={`language-${getPrismLanguageClass(tabs[active].language)} font-mono`}
              dangerouslySetInnerHTML={{ __html: Prism.highlight(tabs[active].code, Prism.languages[getPrismLanguageClass(tabs[active].language)], getPrismLanguageClass(tabs[active].language)) }}
            />
          </pre>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

```

End of src/components/ui/CodeTabs.tsx

---

## src/components/visualizers/ShredVisualizer.tsx

```typescript
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, StatsGl } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

type BlockProps = {
  startX: number;
  idx: number;
  blockMoveSpeed: number;
  shredSpawnRate: number;
  shredsPerRow: number;
  rows: number;
  onReset?: () => void;
};

function Block({
  startX,
  idx,
  blockMoveSpeed,
  shredSpawnRate,
  shredsPerRow,
  rows,
  onReset,
}: BlockProps) {
  const group = useRef<THREE.Group>(null!);
  const [shreds, setShreds] = useState<number>(0);
  const totalShreds = rows * shredsPerRow;

  useFrame((_, delta) => {
    group.current.position.x -= blockMoveSpeed * delta;
    group.current.rotation.y += 0.5 * delta;
    if (group.current.position.x < -10) {
      group.current.position.x = startX;
      setShreds(0);
      onReset?.();
    }
  });

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    const target = Math.min(
      totalShreds,
      Math.floor(elapsed / shredSpawnRate) % (totalShreds + 1)
    );
    if (target !== shreds) setShreds(target);
  });

  const shredGeo = useMemo(() => new THREE.BoxGeometry(0.15, 0.15, 0.15), []);

  return (
    <group ref={group} position={[startX, 0, idx * -1]}>
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial
          transparent
          opacity={0.15}
          color={shreds === totalShreds ? "#5BC2FF" : "#6B37BC"}
        />
      </mesh>

      {Array.from({ length: shreds }).map((_, i) => {
        const row = Math.floor(i / shredsPerRow);
        const col = i % shredsPerRow;
        return (
          <mesh
            key={i}
            geometry={shredGeo}
            position={[
              -0.75 + (col * 1.5) / (shredsPerRow - 1),
              -0.75 + (row * 1.5) / (rows - 1),
              0,
            ]}
          >
            <meshStandardMaterial color="#9747FF" />
          </mesh>
        );
      })}

      {shreds === totalShreds && (
        <mesh>
          <sphereGeometry args={[1.2, 16, 16]} />
          <meshBasicMaterial color="#9747FF" transparent opacity={0.1} />
        </mesh>
      )}
    </group>
  );
}

export default function ShredVisualizer({
  blocks = 4,
  blockMoveSpeed = 1.4,
  shredSpawnRate = 0.08,
  shredsPerRow = 5,
  rows = 5,
  interactive = false,
}: {
  blocks?: number;
  blockMoveSpeed?: number;
  shredSpawnRate?: number;
  shredsPerRow?: number;
  rows?: number;
  interactive?: boolean;
}) {
  const startPositions = useMemo(
    () => Array.from({ length: blocks }, (_, i) => i * 5),
    [blocks]
  );

  return (
    <Canvas camera={{ position: [0, 2.5, 7], fov: 45 }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {startPositions.map((x, i) => (
        <Block
          key={i}
          idx={i}
          startX={x}
          blockMoveSpeed={blockMoveSpeed}
          shredSpawnRate={shredSpawnRate}
          shredsPerRow={shredsPerRow}
          rows={rows}
        />
      ))}

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.01, 0]}>
        <planeGeometry args={[50, 10]} />
        <meshStandardMaterial color="#1E1E1E" />
      </mesh>

      {interactive && <OrbitControls enablePan={false} />}
      <StatsGl />
      <Html position={[0, -1.3, 0]}>
        <p style={{ color: "#999", fontSize: 12, textAlign: "center" }}>
          Blocks filling with shreds → finalisation
        </p>
      </Html>
    </Canvas>
  );
}

```

End of src/components/visualizers/ShredVisualizer.tsx

---

## src/types/rise-shred-client.d.ts

```typescript
// Type declarations for rise-shred-client
// This is a mock declaration file for documentation examples

declare module 'rise-shred-client' {
  interface TransactionResponse {
    hash: string;
    blockNumber?: number;
    confirmations: number;
    wait(confirmations?: number): Promise<TransactionReceipt>;
  }

  interface TransactionReceipt {
    blockHash: string;
    blockNumber: number;
    contractAddress: string | null;
    status: number;
    transactionHash: string;
  }

  interface Signer {
    address: string;
    signTransaction(transaction: unknown): Promise<string>;
  }

  export class SyncTransactionProvider {
    constructor(url: string, options?: Record<string, unknown>);
    
    // Add methods that might be used in examples
    getSigner(): Signer;
    sendTransaction(tx: Record<string, unknown>): Promise<TransactionResponse>;
    waitForTransaction(hash: string): Promise<TransactionReceipt>;
  }
}

```

End of src/types/rise-shred-client.d.ts

---

