import CodeBlock from '../ui/CodeBlock';

interface ApiEndpoint {
  method: string;
  path: string;
  description: string;
  example?: string;
}

interface ApiReferenceProps {
  title: string;
  baseUrl: string;
  endpoints: ApiEndpoint[];
}

export default function ApiReference({ title, baseUrl, endpoints }: ApiReferenceProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">{title}</h2>
        <p className="text-slate-600">Base URL: <code className="text-sm bg-slate-100 px-2 py-1 rounded">{baseUrl}</code></p>
      </div>

      <div className="space-y-6">
        {endpoints.map((endpoint, index) => (
          <div key={index} className="border border-slate-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className={`px-3 py-1 text-sm font-medium rounded-md ${
                endpoint.method === 'GET' ? 'bg-blue-100 text-blue-700' :
                endpoint.method === 'POST' ? 'bg-green-100 text-green-700' :
                endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {endpoint.method}
              </span>
              <code className="text-lg font-mono">{endpoint.path}</code>
            </div>
            
            <p className="text-slate-600 mb-4">{endpoint.description}</p>
            
            {endpoint.example && (
              <div>
                <h4 className="text-sm font-medium text-slate-700 mb-2">Example Request</h4>
                <CodeBlock code={endpoint.example} language="bash" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}