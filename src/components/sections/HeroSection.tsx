import Link from 'next/link';

export default function HeroSection() {
  return (
    <div className="text-center py-16">
      <h1 className="text-6xl font-bold text-slate-900 mb-6">
        RISE <span className="text-rise-primary">Dev Toolkit</span>
      </h1>
      <p className="text-2xl text-slate-600 mb-12 max-w-3xl mx-auto">
        Build the next generation of blockchain applications on RISE - 
        the fastest Layer 2 with 10ms latency and 100k+ TPS.
      </p>
      
      <div className="flex justify-center gap-4 mb-16">
        <Link 
          href="/shred-api/explainer" 
          className="px-6 py-3 bg-rise-primary text-white rounded-lg hover:bg-rise-primary/90 transition-colors"
        >
          Get Started
        </Link>
        <Link 
          href="https://github.com/rise-l2/examples" 
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:border-rise-primary hover:text-rise-primary transition-colors"
        >
          View Examples
        </Link>
      </div>
    </div>
  );
}