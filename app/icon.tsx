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
      }}
    >
      <span
        style={{
          color: '#C17A3B',
          fontSize: 22,
          fontWeight: 700,
          fontFamily: 'Georgia, serif',
          letterSpacing: '-1px',
          lineHeight: 1,
        }}
      >
        D
      </span>
    </div>,
    { ...size },
  );
}
