import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isEn = locale === 'en';

  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:39847';

  const playfair = await fetch(
    'https://fonts.gstatic.com/s/playfairdisplay/v37/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtM.woff2'
  ).then(r => r.arrayBuffer()).catch(() => null);

  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', background: '#0D0B09', position: 'relative' }}>

      {/* Foto de fondo — mesa con pizzas */}
      <img
        src={`${baseUrl}/images/landing-actual-4.jpg`}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }}
      />

      {/* Overlay izquierdo: opaco para legibilidad del texto */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(105deg, rgba(13,11,9,0.96) 0%, rgba(13,11,9,0.85) 42%, rgba(13,11,9,0.35) 68%, rgba(13,11,9,0.05) 100%)', display: 'flex' }} />

      {/* Overlay inferior: profundidad */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to top, rgba(13,11,9,0.75) 0%, transparent 55%)', display: 'flex' }} />

      {/* Línea dorada vertical izquierda */}
      <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 3, background: 'linear-gradient(to bottom, transparent 0%, #C17A3B 30%, #C17A3B 70%, transparent 100%)', display: 'flex' }} />

      {/* Contenido */}
      <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '52px 68px' }}>

        {/* Top: eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 28, height: 1.5, background: '#C17A3B', display: 'flex' }} />
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.28em', color: '#C17A3B', fontFamily: 'system-ui, sans-serif', textTransform: 'uppercase' }}>
            {isEn ? 'Paine · Chile' : 'Paine · Chile'}
          </span>
        </div>

        {/* Bottom: marca + tagline + badge */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

          {/* Nombre */}
          <div style={{
            fontSize: 108,
            fontWeight: 700,
            color: '#F2EDE4',
            lineHeight: 0.9,
            letterSpacing: '-4px',
            fontFamily: playfair ? 'Playfair' : 'Georgia, serif',
            display: 'flex',
          }}>
            DiMOE
          </div>

          {/* Subrayado dorado */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 20 }}>
            <div style={{ width: 52, height: 2, background: '#C17A3B', display: 'flex' }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#C17A3B', display: 'flex' }} />
          </div>

          {/* Tagline */}
          <div style={{
            marginTop: 18,
            fontSize: 22,
            color: 'rgba(242,237,228,0.6)',
            letterSpacing: '0.12em',
            fontFamily: 'system-ui, sans-serif',
            textTransform: 'uppercase',
            display: 'flex',
          }}>
            {isEn ? 'Neapolitan Pizzeria & Restobar' : 'Pizzería Napolitana y Restobar'}
          </div>

          {/* Award pill */}
          <div style={{ display: 'flex', marginTop: 24 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: 'rgba(193,122,59,0.12)',
              border: '1px solid rgba(193,122,59,0.45)',
              borderRadius: 100,
              padding: '10px 22px',
              color: '#C17A3B',
              fontSize: 16,
              fontWeight: 600,
              fontFamily: 'system-ui, sans-serif',
              letterSpacing: '0.04em',
            }}>
              🏆 {isEn ? '2nd Best Restaurant · Top Chile 2025' : '2° Mejor Restaurante · Top Chile 2025'}
            </div>
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: playfair ? [{ name: 'Playfair', data: playfair, weight: 700 }] : [],
    },
  );
}
