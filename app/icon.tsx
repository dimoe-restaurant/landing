import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        background: '#0D0B09',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0,
      }}>
        {/* Jarra simplificada */}
        <div style={{
          width: 10, height: 8,
          background: '#C17A3B',
          borderRadius: '50% 50% 40% 40%',
          marginBottom: 1,
        }} />
        <span style={{
          color: '#F2EDE4',
          fontSize: 13,
          fontWeight: 800,
          fontFamily: 'Georgia, serif',
          letterSpacing: '-0.5px',
          lineHeight: 1,
        }}>
          DiM
        </span>
      </div>
    </div>,
    { ...size },
  );
}
