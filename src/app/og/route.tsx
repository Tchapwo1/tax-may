// src/app/og/route.tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get('path') ?? '';
  
  // Dynamic branding based on path
  const isLandlord = path.includes('landlord');
  const isSA = path.includes('self-assessment');
  const title = isSA ? 'Self-Assessment Modelling' : isLandlord ? 'Landlord Tax Modelling' : 'PAYE Salary Calculator';
  const description = isSA 
    ? 'Composite Portfolio • PA Taper • HICBC'
    : isLandlord 
    ? 'Section 24 • Rental Profit • Marginal Tax' 
    : 'Income Tax • NI • Student Loan • Comparison';

  return new ImageResponse(
    (
      <div
        style={{
          background: '#1E1E2F',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
        }}
      >
        {/* Decorative Grid Background */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            backgroundImage: 'radial-gradient(circle, #FF4F00 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          position: 'relative',
          textAlign: 'center'
        }}>
          {/* Brand Logo Area */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            marginBottom: '40px'
          }}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              background: '#FF4F00', 
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white'
            }}>
              T
            </div>
            <div style={{ 
              fontSize: '32px', 
              color: '#FF4F00', 
              fontWeight: 'black',
              letterSpacing: '-0.05em'
            }}>
              TaxCalculator365
            </div>
          </div>

          <div style={{ 
            fontSize: '72px', 
            color: 'white', 
            fontWeight: 'black',
            marginBottom: '20px',
            letterSpacing: '-0.02em',
            lineHeight: 1.1
          }}>
            {title}
          </div>
          
          <div style={{ 
            fontSize: '32px', 
            color: '#94A3B8',
            maxWidth: '800px',
            fontWeight: 'medium'
          }}>
            {description}
          </div>
        </div>

        {/* Footer Bar */}
        <div style={{
          position: 'absolute',
          bottom: '80px',
          display: 'flex',
          gap: '24px',
          color: '#475569',
          fontSize: '20px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          <span>Modern UK Tax Precision</span>
          <span>•</span>
          <span>Deterministic Modelling</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
