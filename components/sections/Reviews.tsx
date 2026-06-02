'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const GOOGLE_MAPS_URL = process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL ?? 'https://maps.app.goo.gl/cSgXSzJW9VvLttSS7';

const REVIEWS = [
  { id: 1, name: 'María J.', avatar: 'M', color: '#5B7FA6', rating: 5, text: 'La mejor pizza napolitana que he probado fuera de Italia. La masa de fermentación lenta marca una diferencia enorme. El ambiente es precioso y el servicio muy atento.', date: 'hace 2 semanas' },
  { id: 2, name: 'Felipe R.', avatar: 'F', color: '#6B9E78', rating: 5, text: 'Impresionante. Los cócteles de autor están muy bien ejecutados y las pastas son de un nivel que no esperaba encontrar en Paine. Vale mucho la pena el viaje desde Santiago.', date: 'hace 1 mes' },
  { id: 3, name: 'Carolina M.', avatar: 'C', color: '#A67B5B', rating: 5, text: 'Fuimos con nuestro perro y nos trataron increíble. La terraza es acogedora, la pizza de tomate San Marzano es sublime. Ya tenemos reserva para el próximo fin de semana.', date: 'hace 3 semanas' },
];

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#C17A3B" aria-hidden><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
      ))}
    </div>
  );
}

function GoogleLogo() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-label="Google" role="img">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

export default function Reviews() {
  const t = useTranslations('reviews');

  return (
    <section id="resenas" style={{ background: '#181310', padding: 'clamp(64px, 8vw, 96px) clamp(16px, 4vw, 24px)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: '20px' }}>
          <p className="eyebrow" style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.35em', color: '#C17A3B', textTransform: 'uppercase', marginBottom: '16px' }}>{t('label')}</p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 700, lineHeight: 1.15, color: '#F2EDE4', margin: '0 0 24px' }}>{t('headline')}</h2>
          <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#0D0B09', border: '1px solid #2A2520', borderRadius: '100px', padding: '10px 20px', textDecoration: 'none', transition: 'border-color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = '#C17A3B')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = '#2A2520')}
          >
            <GoogleLogo /><Stars count={5} />
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#F2EDE4' }}>5.0</span>
            <span style={{ fontSize: '13px', color: '#9B8B7E' }}>{t('google_label')}</span>
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span style={{ display: 'inline-block', fontSize: '12px', fontWeight: 600, letterSpacing: '0.12em', color: '#C17A3B', textTransform: 'uppercase', border: '1px solid rgba(193,122,59,0.35)', borderRadius: '100px', padding: '7px 20px' }}>{t('award')}</span>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(290px, 100%), 1fr))', gap: '16px' }}>
          {REVIEWS.map((review, i) => (
            <motion.div key={review.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ background: '#0D0B09', border: '1px solid #2A2520', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: review.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 700, flexShrink: 0 }}>{review.avatar}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: '#F2EDE4', margin: '0 0 2px' }}>{review.name}</p>
                  <p style={{ fontSize: '12px', color: '#9B8B7E', margin: 0 }}>{review.date}</p>
                </div>
                <GoogleLogo />
              </div>
              <Stars count={review.rating} />
              <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(242,237,228,0.65)', margin: 0 }}>&ldquo;{review.text}&rdquo;</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} style={{ textAlign: 'center', marginTop: '40px' }}>
          <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer"
            style={{ fontSize: '14px', fontWeight: 500, color: '#C17A3B', textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >{t('cta')}</a>
        </motion.div>
      </div>
    </section>
  );
}
