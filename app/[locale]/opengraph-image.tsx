import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isEn = locale === 'en';

  const playfair = await fetch(
    'https://fonts.gstatic.com/s/playfairdisplay/v37/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtM.woff2'
  ).then(r => r.arrayBuffer()).catch(() => null);

  return new ImageResponse(
    <div
      style={{
        background: '#0D0B09',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        padding: '64px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 80% 70% at 20% 60%, rgba(61,26,8,0.85) 0%, transparent 65%)',
        display: 'flex',
      }} />

      {/* Right accent */}
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: '420px',
        background: 'radial-gradient(ellipse at right center, rgba(193,122,59,0.07), transparent 70%)',
        display: 'flex',
      }} />

      {/* Gold line */}
      <div style={{ width: '56px', height: '2px', background: '#C17A3B', marginBottom: '28px', display: 'flex' }} />

      {/* Brand name */}
      <div style={{
        fontSize: '104px',
        fontWeight: 700,
        color: '#F2EDE4',
        lineHeight: 1,
        letterSpacing: '-3px',
        fontFamily: playfair ? 'Playfair' : 'Georgia, serif',
        display: 'flex',
      }}>
        DiMOE
      </div>

      {/* Tagline */}
      <div style={{
        fontSize: '26px',
        color: 'rgba(242,237,228,0.55)',
        marginTop: '18px',
        fontFamily: 'system-ui, sans-serif',
        letterSpacing: '0.04em',
        display: 'flex',
      }}>
        {isEn ? 'Neapolitan Pizzeria & Restobar · Paine, Chile' : 'Pizzería Napolitana y Restobar · Paine, Chile'}
      </div>

      {/* Award badge */}
      <div style={{
        marginTop: '36px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        border: '1px solid rgba(193,122,59,0.45)',
        borderRadius: '100px',
        padding: '10px 24px',
        color: '#C17A3B',
        fontSize: '18px',
        fontWeight: 600,
        fontFamily: 'system-ui, sans-serif',
        letterSpacing: '0.06em',
      }}>
        🏆 {isEn ? '2nd Best Restaurant · Top Chile 2025' : '2° Mejor Restaurante · Top Chile 2025'}
      </div>
    </div>,
    {
      ...size,
      fonts: playfair ? [{ name: 'Playfair', data: playfair, weight: 700 }] : [],
    },
  );
}
