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
        borderRadius: 40,
      }}
    >
      <svg width="110" height="110" viewBox="0 0 24 24" fill="none">
        <path d="M9 3h6l1 3H8L9 3z" fill="#C17A3B" />
        <path d="M7 6h10l-1.5 12a1 1 0 01-1 .9H9.5a1 1 0 01-1-.9L7 6z" fill="#C17A3B" />
        <path d="M17 9c1.5 0 3 1 3 2.5S18.5 14 17 14" stroke="#C17A3B" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <circle cx="12" cy="20.5" r="1" fill="#F2EDE4" opacity="0.6" />
      </svg>
    </div>,
    { ...size },
  );
}
