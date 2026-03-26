import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Thakkadi — Free Legal Calculators for Indian Lawyers';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#FAFAF8',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Brand name */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 700,
            color: '#0D9488',
            letterSpacing: '-2px',
            marginBottom: 12,
            display: 'flex',
          }}
        >
          Thakkadi
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: '#4B5563',
            fontWeight: 500,
            marginBottom: 48,
            display: 'flex',
          }}
        >
          Free Legal Calculators for Indian Lawyers
        </div>

        {/* Calculator labels */}
        <div
          style={{
            display: 'flex',
            gap: 20,
          }}
        >
          {['Limitation Periods', 'Court Fees', 'Stamp Duty'].map((label) => (
            <div
              key={label}
              style={{
                padding: '12px 28px',
                borderRadius: 8,
                background: '#CCFBF1',
                border: '1px solid #99F6E4',
                color: '#0F766E',
                fontSize: 20,
                fontWeight: 600,
                display: 'flex',
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: 28,
            fontSize: 16,
            color: '#9CA3AF',
            display: 'flex',
          }}
        >
          thakkadi.in — No login, no data stored, 100% client-side
        </div>
      </div>
    ),
    { ...size }
  );
}
