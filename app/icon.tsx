import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:39847';

  return new ImageResponse(
    <div
      style={{
        background: '#F2EDE4',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2px',
      }}
    >
      <img
        src={`${baseUrl}/images/logo-transparent.png`}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </div>,
    { ...size },
  );
}
