import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        background: '#0D0B09',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 36,
      }}
    >
      <span
        style={{
          color: '#C17A3B',
          fontSize: 110,
          fontWeight: 700,
          fontFamily: 'Georgia, serif',
          letterSpacing: '-4px',
          lineHeight: 1,
        }}
      >
        D
      </span>
    </div>,
    { ...size },
  );
}
