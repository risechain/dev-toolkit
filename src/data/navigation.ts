export interface NavItem {
  title: string;
  href: string;
  children?: NavItem[];
}

export const topNavigation: NavItem[] = [
  { title: 'Shred API', href: '/shred-api' },
  { title: 'Fast VRF', href: '/fast-vrf' },
  { title: 'Time Oracle', href: '/time-oracle' },
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
    { title: 'Integration Guide', href: '/fast-vrf/integration' },
    { title: 'Code Examples', href: '/fast-vrf/code-examples' },
  ],
  'time-oracle': [
    { title: 'Explainer', href: '/time-oracle/explainer' },
    { title: 'API Docs', href: '/time-oracle/api-docs' },
    { title: 'Code Examples', href: '/time-oracle/code-examples' },
  ],
};
