// src/app/og/route.tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get('path') ?? '';

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: '#1E1E2F',
          color: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
        }}
      >
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: 60, color: '#FF4F00', marginBottom: 20, fontWeight: 'bold' }}>
            TaxCalculator365
          </div>
          <div style={{ fontSize: 32, color: '#94A3B8' }}>
            Preview for {path}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
