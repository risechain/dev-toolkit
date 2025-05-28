import Link from 'next/link';
import { Zap, Shuffle, Clock } from 'lucide-react';

const features = [
  {
    title: 'Shred API',
    description: 'Real-time blockchain data streaming with microsecond latency',
    icon: Zap,
    href: '/shred-api',
    color: 'text-rise-primary'
  },
  {
    title: 'Fast VRF',
    description: 'Ultra-fast verifiable random functions for gaming and DeFi',
    icon: Shuffle,
    href: '/fast-vrf',
    color: 'text-rise-secondary'
  },
  {
    title: 'Time Oracle',
    description: 'Precise timestamping for time-sensitive applications',
    icon: Clock,
    href: '/time-oracle',
    color: 'text-rise-accent'
  }
];

export default function FeatureGrid() {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {features.map((feature) => {
        const Icon = feature.icon;
        return (
          <Link 
            key={feature.href}
            href={feature.href} 
            className="group p-8 border border-slate-200 rounded-lg hover:border-rise-primary transition-all hover:shadow-lg"
          >
            <div className={`${feature.color} mb-4`}>
              <Icon size={48} />
            </div>
            <h2 className="text-2xl font-semibold mb-4 group-hover:text-rise-primary">
              {feature.title}
            </h2>
            <p className="text-slate-600">
              {feature.description}
            </p>
          </Link>
        );
      })}
    </div>
  );
}