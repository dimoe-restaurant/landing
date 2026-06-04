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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://landing-sagajardos-projects.vercel.app/images/logo-transparent.png"
        width={148}
        height={56}
        alt="DiMOE"
        style={{ objectFit: 'contain', filter: 'brightness(1.2)' }}
      />
    </div>,
    { ...size },
  );
}
