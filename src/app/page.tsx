'use client';

import Link from 'next/link';
import { ArrowRight, Zap, Shuffle, Clock, Code2, Layers, Shield } from 'lucide-react';

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#000000', overflow: 'hidden' }}>
      {/* Navigation */}
      <nav style={{ 
        position: 'fixed', 
        top: 0, 
        width: '100%', 
        zIndex: 50, 
        backgroundColor: 'rgba(0, 0, 0, 0.8)', 
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #27272a'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
              <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                <div style={{ 
                  width: '32px', 
                  height: '32px', 
                  background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', 
                  borderRadius: '8px' 
                }} />
                <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff' }}>RISE</span>
              </Link>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <Link href="/shred-api" style={{ color: '#9ca3af', fontSize: '14px', fontWeight: '500', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}>
                  Shred API
                </Link>
                <Link href="/fast-vrf" style={{ color: '#9ca3af', fontSize: '14px', fontWeight: '500', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}>
                  Fast VRF
                </Link>
                <Link href="/time-oracle" style={{ color: '#9ca3af', fontSize: '14px', fontWeight: '500', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}>
                  Time Oracle
                </Link>
                <Link href="/docs" style={{ color: '#9ca3af', fontSize: '14px', fontWeight: '500', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}>
                  Docs
                </Link>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Link 
                href="https://github.com/rise-l2" 
                target="_blank"
                style={{ color: '#9ca3af', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
              >
                <svg style={{ width: '20px', height: '20px' }} fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ 
        position: 'relative',
        paddingTop: '128px',
        paddingBottom: '80px'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at top, rgba(59, 130, 246, 0.15), transparent 50%)',
          pointerEvents: 'none'
        }} />
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative' }}>
          <div style={{ textAlign: 'center', maxWidth: '1024px', margin: '0 auto' }}>
            <h1 style={{ 
              fontSize: '3rem',
              fontWeight: 'bold',
              marginBottom: '24px',
              color: '#ffffff',
              lineHeight: '1.1'
            }}>
              RISE <span style={{ 
                background: 'linear-gradient(to right, #3b82f6, #06b6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Documentation</span>
            </h1>
            <p style={{ 
              fontSize: '1.25rem',
              color: '#a1a1aa',
              marginBottom: '48px',
              lineHeight: '1.75',
              maxWidth: '800px',
              margin: '0 auto 48px'
            }}>
              Welcome to the RISE documentation hub. Here you'll find all the resources you need to integrate with RISE,
              a high-speed Ethereum Layer 2 blockchain with instant transaction confirmation.
            </p>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/shred-api/explainer" style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                color: '#ffffff',
                fontWeight: '500',
                borderRadius: '8px',
                textDecoration: 'none',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.3)';
              }}>
                Get Started <ArrowRight style={{ width: '16px', height: '16px' }} />
              </Link>
              <Link href="/docs" style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                padding: '12px 24px',
                border: '1px solid #27272a',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: '#ffffff',
                fontWeight: '500',
                borderRadius: '8px',
                textDecoration: 'none',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = '#3f3f46';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = '#27272a';
              }}>
                View Documentation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ padding: '80px 0', position: 'relative' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px'
          }}>
            {/* Shred API Card */}
            <Link href="/shred-api" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ 
                position: 'relative',
                padding: '32px',
                height: '100%',
                backgroundColor: 'rgba(24, 24, 27, 0.5)',
                backdropFilter: 'blur(8px)',
                borderRadius: '12px',
                border: '1px solid transparent',
                background: 'linear-gradient(rgba(24, 24, 27, 0.5), rgba(24, 24, 27, 0.5)) padding-box, linear-gradient(135deg, #3b82f6, #06b6d4) border-box',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{ 
                  width: '48px',
                  height: '48px',
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px',
                  transition: 'background-color 0.2s'
                }}>
                  <Zap style={{ width: '24px', height: '24px', color: '#60a5fa' }} />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '12px', color: '#ffffff' }}>Shred API</h3>
                <p style={{ color: '#a1a1aa', marginBottom: '24px', lineHeight: '1.6' }}>
                  The Shred API provides a low-latency interface for interacting with the RISE blockchain. 
                  It's designed for applications that require real-time data and fast transaction submission.
                </p>
                <span style={{ 
                  color: '#60a5fa',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  View Shred API Docs <ArrowRight style={{ width: '16px', height: '16px' }} />
                </span>
              </div>
            </Link>

            {/* Fast VRF Card */}
            <Link href="/fast-vrf" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ 
                position: 'relative',
                padding: '32px',
                height: '100%',
                backgroundColor: 'rgba(24, 24, 27, 0.5)',
                backdropFilter: 'blur(8px)',
                borderRadius: '12px',
                border: '1px solid transparent',
                background: 'linear-gradient(rgba(24, 24, 27, 0.5), rgba(24, 24, 27, 0.5)) padding-box, linear-gradient(135deg, #a855f7, #ec4899) border-box',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{ 
                  width: '48px',
                  height: '48px',
                  backgroundColor: 'rgba(168, 85, 247, 0.1)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px',
                  transition: 'background-color 0.2s'
                }}>
                  <Shuffle style={{ width: '24px', height: '24px', color: '#c084fc' }} />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '12px', color: '#ffffff' }}>Fast VRF</h3>
                <p style={{ color: '#a1a1aa', marginBottom: '24px', lineHeight: '1.6' }}>
                  Fast VRF is an internal low-latency Verifiable Random Function (VRF) tool available on RISE. 
                  It allows for the generation of verifiable randomness within your applications.
                </p>
                <span style={{ 
                  color: '#c084fc',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  View Fast VRF Docs <ArrowRight style={{ width: '16px', height: '16px' }} />
                </span>
              </div>
            </Link>

            {/* Time Oracle Card */}
            <Link href="/time-oracle" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ 
                position: 'relative',
                padding: '32px',
                height: '100%',
                backgroundColor: 'rgba(24, 24, 27, 0.5)',
                backdropFilter: 'blur(8px)',
                borderRadius: '12px',
                border: '1px solid transparent',
                background: 'linear-gradient(rgba(24, 24, 27, 0.5), rgba(24, 24, 27, 0.5)) padding-box, linear-gradient(135deg, #06b6d4, #10b981) border-box',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{ 
                  width: '48px',
                  height: '48px',
                  backgroundColor: 'rgba(6, 182, 212, 0.1)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px',
                  transition: 'background-color 0.2s'
                }}>
                  <Clock style={{ width: '24px', height: '24px', color: '#67e8f9' }} />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '12px', color: '#ffffff' }}>Time Oracle</h3>
                <p style={{ color: '#a1a1aa', marginBottom: '24px', lineHeight: '1.6' }}>
                  The Time Oracle provides high-resolution timestamps on the RISE chain, enabling applications 
                  to synchronize with the blockchain's time.
                </p>
                <span style={{ 
                  color: '#67e8f9',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  View Time Oracle Docs <ArrowRight style={{ width: '16px', height: '16px' }} />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section style={{ padding: '80px 0', borderTop: '1px solid #27272a' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ 
            fontSize: '2rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '64px',
            color: '#ffffff'
          }}>
            Why Build on <span style={{ 
              background: 'linear-gradient(to right, #3b82f6, #06b6d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>RISE</span>?
          </h2>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '32px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '64px',
                height: '64px',
                backgroundColor: '#27272a',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <Layers style={{ width: '32px', height: '32px', color: '#60a5fa' }} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '8px', color: '#ffffff' }}>10ms Latency</h3>
              <p style={{ color: '#a1a1aa' }}>Lightning-fast transaction confirmations for real-time applications</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '64px',
                height: '64px',
                backgroundColor: '#27272a',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <Code2 style={{ width: '32px', height: '32px', color: '#c084fc' }} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '8px', color: '#ffffff' }}>100k+ TPS</h3>
              <p style={{ color: '#a1a1aa' }}>Massive throughput for high-volume applications</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '64px',
                height: '64px',
                backgroundColor: '#27272a',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <Shield style={{ width: '32px', height: '32px', color: '#67e8f9' }} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '8px', color: '#ffffff' }}>EVM Compatible</h3>
              <p style={{ color: '#a1a1aa' }}>Deploy existing Ethereum smart contracts without modifications</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #27272a', padding: '32px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ 
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ 
                width: '24px',
                height: '24px',
                background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                borderRadius: '4px'
              }} />
              <span style={{ fontSize: '14px', color: '#a1a1aa' }}>© 2025 RISE Protocol</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <Link href="/docs" style={{ 
                fontSize: '14px',
                color: '#a1a1aa',
                textDecoration: 'none',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#a1a1aa'}>
                Documentation
              </Link>
              <Link href="https://github.com/rise-l2" style={{ 
                fontSize: '14px',
                color: '#a1a1aa',
                textDecoration: 'none',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#a1a1aa'}>
                GitHub
              </Link>
              <Link href="https://twitter.com/rise_l2" style={{ 
                fontSize: '14px',
                color: '#a1a1aa',
                textDecoration: 'none',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#a1a1aa'}>
                Twitter
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}