'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { trackEvent } from '@/lib/analytics';

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const waUrl = `https://wa.me/56973694101?text=${encodeURIComponent(t('wa_message'))}`;

  return (
    <section id="inicio" style={{ position: 'relative', minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '72px 20px 0', overflow: 'hidden', background: '#0D0B09' }}>
      {/* Real photo background */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <Image src="/images/foto-3.jpg" alt="" fill priority style={{ objectFit: 'cover', objectPosition: 'center 35%' }} />
      </div>
      {/* Overlays */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.62)' }} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(61,26,8,0.5) 0%, transparent 70%)' }} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 40% 30% at 50% 100%, rgba(193,122,59,0.06) 0%, transparent 70%)' }} />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'relative', zIndex: 10, maxWidth: '900px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}
      >
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }} style={{ width: '48px', height: '1px', background: '#C17A3B' }} />

        <p className="eyebrow" style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.35em', color: '#C17A3B', textTransform: 'uppercase', margin: 0 }}>
          {t('eyebrow')}
        </p>

        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 10vw, 84px)', fontWeight: 700, lineHeight: 1.1, color: '#F2EDE4', margin: '8px 0 0', letterSpacing: '-0.01em' }}>
          {t('line1')}{' '}
          <em style={{ fontStyle: 'italic', color: '#C17A3B' }}>{t('accent')}</em>
          <br />
          {t('line2')}
        </h1>

        <p style={{ fontSize: 'clamp(14px, 1.6vw, 18px)', lineHeight: 1.65, color: 'rgba(242,237,228,0.62)', maxWidth: '560px', margin: '4px 0 0' }}>
          {t('subline')}
        </p>

        <div style={{ display: 'flex', gap: '12px', marginTop: '8px', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
          <a href={waUrl} target="_blank" rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { location: 'hero' })}
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#C17A3B', color: '#F2EDE4', padding: '14px 32px', borderRadius: '100px', fontSize: '14px', fontWeight: 600, textDecoration: 'none', transition: 'opacity 0.2s', flex: '1 1 auto', maxWidth: '260px' }}
          >
            {t('cta_reserve')}
          </a>
          <Link href="/carta"
            onClick={() => trackEvent('menu_click', { location: 'hero' })}
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', color: '#F2EDE4', border: '1px solid rgba(242,237,228,0.2)', padding: '14px 32px', borderRadius: '100px', fontSize: '14px', fontWeight: 600, textDecoration: 'none', transition: 'border-color 0.2s', flex: '1 1 auto', maxWidth: '260px' }}
          >
            {t('cta_menu')}
          </Link>
        </div>

        <p style={{ fontSize: '12px', color: '#9B8B7E', marginTop: '8px', letterSpacing: '0.02em' }}>
          {t('hours')}
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.6 }}
        style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)' }}
      >
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }} style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom, rgba(193,122,59,0.8), transparent)' }} />
      </motion.div>
    </section>
  );
}
