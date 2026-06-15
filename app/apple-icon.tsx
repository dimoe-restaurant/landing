import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  const logo = readFileSync(join(process.cwd(), 'public', 'images', 'logo-transparent.png'));
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    <div
      style={{
        background: '#F2EDE4',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
        padding: '18px',
      }}
    >
      <img src={logoSrc} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    </div>,
    { ...size },
  );
}
