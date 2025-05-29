'use client';

import CodeExamplesTemplate from '@/components/templates/CodeExamplesTemplate';

const examples = [
  {
    title: 'Request Random Value',
    language: 'typescript',
    code: `import { Connection, PublicKey } from '@solana/web3.js';

async function requestRandomValue(seed: string) {
  const response = await fetch('https://api.rise.dev/api/v1/vrf/request', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      seed,
      callback: 'https://your-app.com/webhook'
    })
  });
  
  const data = await response.json();
  return data.requestId;
}`
  },
  {
    title: 'Get VRF Result',
    language: 'typescript',
    code: `async function getVRFResult(requestId: string) {
  const response = await fetch(
    \`https://api.rise.dev/api/v1/vrf/result/\${requestId}\`,
    {
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY'
      }
    }
  );
  
  const data = await response.json();
  
  if (data.status === 'completed') {
    console.log('Random value:', data.randomValue);
    console.log('Proof:', data.proof);
  }
  
  return data;
}`
  },
  {
    title: 'Verify VRF Proof',
    language: 'typescript',
    code: `async function verifyVRFProof(
  randomValue: string,
  proof: string,
  seed: string
) {
  const response = await fetch('https://api.rise.dev/api/v1/vrf/verify', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      randomValue,
      proof,
      seed
    })
  });
  
  const result = await response.json();
  return result.valid;
}`
  },
  {
    title: 'Solana Program Integration',
    language: 'rust',
    code: `use anchor_lang::prelude::*;
use vrf_program::cpi::accounts::VerifyRandomness;
use vrf_program::program::VrfProgram;

#[derive(Accounts)]
pub struct UseRandomness<'info> {
    #[account(mut)]
    pub game_state: Account<'info, GameState>,
    pub vrf_program: Program<'info, VrfProgram>,
    pub vrf_account: AccountInfo<'info>,
}

pub fn use_random_value(ctx: Context<UseRandomness>, proof: Vec<u8>) -> Result<()> {
    // Verify the randomness on-chain
    let cpi_accounts = VerifyRandomness {
        vrf_account: ctx.accounts.vrf_account.clone(),
    };
    
    let cpi_program = ctx.accounts.vrf_program.to_account_info();
    let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
    
    vrf_program::cpi::verify_randomness(cpi_ctx, proof)?;
    
    // Use the verified random value
    let random_value = ctx.accounts.vrf_account.random_value;
    ctx.accounts.game_state.last_roll = random_value % 6 + 1;
    
    Ok(())
}`
  }
];

export default function FastVRFCodeExamplesPage() {
  const formattedExamples = examples.map(example => ({
    ...example,
    description: 'Implementation example'
  }));

  return (
    <CodeExamplesTemplate
      title="Fast VRF Code Examples"
      description="Learn how to integrate Fast VRF into your application"
      currentSection="fast-vrf"
      examples={formattedExamples}
    />
  );
}