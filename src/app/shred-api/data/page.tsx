import DocPage from '@/components/templates/DocPage';

export default function ShredApiData() {
  return (
    <DocPage
      title="Shred API Data Formats"
      description="Understanding data structures and formats in the Shred API"
      currentSection="shred-api"
    >
      <section className="space-y-8">
        <div>
          <h2 className="text-3xl font-semibold mb-4">Shred Data Structure</h2>
          <pre className="bg-slate-100 p-4 rounded-lg overflow-x-auto">
{`{
  "shredId": "123456789",
  "slot": 456789,
  "index": 42,
  "version": 1,
  "timestamp": 1672531200000,
  "data": {
    "transactions": [
      {
        "hash": "0x1234...5678",
        "from": "0xaaaa...bbbb",
        "to": "0xcccc...dddd",
        "value": "1000000000000000000",
        "gasUsed": "21000"
      }
    ],
    "stateRoot": "0xabcd...efgh",
    "receiptsRoot": "0xijkl...mnop"
  }
}`}
          </pre>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-4">Event Types</h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li><code className="bg-slate-100 px-2 py-1 rounded">transfer</code> - Token transfer events</li>
            <li><code className="bg-slate-100 px-2 py-1 rounded">approval</code> - Token approval events</li>
            <li><code className="bg-slate-100 px-2 py-1 rounded">swap</code> - DEX swap events</li>
            <li><code className="bg-slate-100 px-2 py-1 rounded">mint</code> - NFT minting events</li>
          </ul>
        </div>
      </section>
    </DocPage>
  );
}