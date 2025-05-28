'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import PageLayout from '../layout/PageLayout';
import { ArrowRight } from 'lucide-react';

interface SectionLink {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
  color: string;
}

interface SectionLandingPageProps {
  title: string;
  description: string;
  currentSection: string;
  heroContent?: ReactNode;
  links: SectionLink[];
  customContent?: ReactNode;
}

export default function SectionLandingPage({ 
  title, 
  description, 
  currentSection, 
  heroContent,
  links,
  customContent 
}: SectionLandingPageProps) {
  return (
    <PageLayout currentSection={currentSection}>
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section style={{ 
          position: 'relative',
          paddingTop: '48px',
          paddingBottom: '48px'
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at top, rgba(59, 130, 246, 0.1), transparent 50%)',
            pointerEvents: 'none'
          }} />
          
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <h1 style={{ 
              fontSize: '3.5rem',
              fontWeight: 'bold',
              marginBottom: '24px',
              background: 'linear-gradient(to right, #3b82f6, #06b6d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {title}
            </h1>
            <p style={{ 
              fontSize: '1.25rem',
              color: '#a1a1aa',
              marginBottom: '48px',
              maxWidth: '800px',
              margin: '0 auto 48px',
              lineHeight: '1.75'
            }}>
              {description}
            </p>
            
            {heroContent && (
              <div style={{ marginBottom: '48px' }}>
                {heroContent}
              </div>
            )}
          </div>
        </section>

        {/* Navigation Cards */}
        <section style={{ paddingBottom: '48px' }}>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {links.map((link, index) => (
              <Link 
                key={link.href} 
                href={link.href} 
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div style={{ 
                  position: 'relative',
                  padding: '32px',
                  height: '100%',
                  backgroundColor: 'rgba(24, 24, 27, 0.5)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = link.color;
                  e.currentTarget.style.boxShadow = `0 20px 40px rgba(0, 0, 0, 0.2)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <div style={{ 
                    marginBottom: '20px',
                    color: link.color
                  }}>
                    {link.icon}
                  </div>
                  <h3 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: 'bold', 
                    marginBottom: '12px', 
                    color: '#ffffff' 
                  }}>
                    {link.title}
                  </h3>
                  <p style={{ 
                    color: '#a1a1aa', 
                    marginBottom: '20px', 
                    lineHeight: '1.6' 
                  }}>
                    {link.description}
                  </p>
                  <div style={{ 
                    color: link.color,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    Explore <ArrowRight style={{ width: '16px', height: '16px' }} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Custom Content Section */}
        {customContent && (
          <section style={{ 
            paddingTop: '48px', 
            borderTop: '1px solid rgba(255, 255, 255, 0.1)' 
          }}>
            {customContent}
          </section>
        )}
      </div>
    </PageLayout>
  );
}