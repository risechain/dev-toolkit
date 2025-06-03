export interface NavItem {
  title: string;
  href: string;
  children?: NavItem[];
}

export const topNavigation: NavItem[] = [
  { title: 'Shred API', href: '/shred-api' },
  { title: 'Fast VRF', href: '/fast-vrf' },
  { title: 'Time Oracle', href: '/time-oracle' },
  { title: 'Resources', href: '/resources' },
];

export const sideNavigation: Record<string, NavItem[]> = {
  'shred-api': [
    { title: 'Explainer', href: '/shred-api/explainer' },
    { 
      title: 'API Docs', 
      href: '/shred-api/api-docs',
      children: [
        { title: 'Getting Started', href: '/shred-api/api-docs#getting-started' },
        { title: 'RPC Methods', href: '/shred-api/api-docs#rpc-methods' },
        { title: 'WebSocket', href: '/shred-api/api-docs#websocket' },
      ]
    },
    { title: 'Code Examples', href: '/shred-api/code-examples' },
    { title: 'Data Formats', href: '/shred-api/data' },
  ],
  'fast-vrf': [
    { title: 'Explainer', href: '/fast-vrf/explainer' },
    { 
      title: 'Integration Guide', 
      href: '/fast-vrf/integration',
      children: [
        { title: 'Quick Start', href: '/fast-vrf/integration#quick-start' },
        { title: 'How It Works', href: '/fast-vrf/integration#how-it-works' },
        { title: 'Ultra-Fast Results with Shreds', href: '/fast-vrf/integration#shreds-api' },
        { title: 'API Reference', href: '/fast-vrf/integration#api-reference' },
        { title: 'Best Practices', href: '/fast-vrf/integration#best-practices' },
        { title: 'Support', href: '/fast-vrf/integration#support' },
      ]
    },
    { 
      title: 'Code Examples', 
      href: '/fast-vrf/code-examples',
      children: [
        { title: 'Basic Integration', href: '/fast-vrf/code-examples#basic-integration' },
        { title: 'Simple Dice Game', href: '/fast-vrf/code-examples#dice-game' },
        { title: 'NFT with Random Traits', href: '/fast-vrf/code-examples#random-nft' },
        { title: 'Lottery System', href: '/fast-vrf/code-examples#lottery-system' },
        { title: 'Shreds API Integration', href: '/fast-vrf/code-examples#shreds-integration' },
      ]
    },
  ],
  'time-oracle': [
    { title: 'Explainer', href: '/time-oracle/explainer' },
    { title: 'API Docs', href: '/time-oracle/api-docs' },
    { title: 'Code Examples', href: '/time-oracle/code-examples' },
  ],
};
