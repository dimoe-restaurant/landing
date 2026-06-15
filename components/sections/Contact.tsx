'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import ContactForm from './ContactForm';
import { IconInstagram, IconWhatsApp, IconEmail, IconCar, IconTrain } from '@/components/ui/icons';

const MAPS_LINK = 'https://maps.app.goo.gl/cSgXSzJW9VvLttSS7';
const MAPS_EVENTS_LINK = 'mailto:contacto@dimoe.cl?subject=Consulta%20evento';
const MAPS_EMBED_SRC =
  process.env.NEXT_PUBLIC_MAPS_EMBED_SRC ??
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3313.3253644014685!2d-70.7650772!3d-33.8555048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9663239102a9c7b3%3A0xaa780e0ebd0b1ca6!2sDiMOE%20Pizzer%C3%ADa%20y%20Restobar!5e0!3m2!1ses!2scl!4v1780368939737!5m2!1ses!2scl';

export default function Contact() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const waUrl = `https://wa.me/56973694101?text=${encodeURIComponent(t('wa_message'))}`;

  const hours = [
    { days: t('day1'), time: '12:30 – 22:30' },
    { days: t('day2'), time: '13:00 – 00:00' },
    { days: t('day3'), time: '13:00 – 17:30' },
    { days: t('day4'), time: t('closed') },
  ];

  const contacts = [
    { Icon: IconWhatsApp, color: '#25D366', text: '+56 9 7369 4101', href: waUrl },
    { Icon: IconEmail, color: '#C17A3B', text: 'contacto@dimoe.cl', href: 'mailto:contacto@dimoe.cl' },
    { Icon: IconInstagram, color: '#E1306C', text: '@dimoe_restobar', href: 'https://instagram.com/dimoe_restobar' },
  ];

  return (
    <section id="contacto" style={{ background: '#181310', padding: 'clamp(64px, 8vw, 96px) clamp(16px, 4vw, 24px)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p className="eyebrow" style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.35em', color: '#C17A3B', textTransform: 'uppercase', marginBottom: '16px' }}>{t('label')}</p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 700, lineHeight: 1.15, color: '#F2EDE4', margin: 0 }}>{t('headline')}</h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '16px' }}>

          {/* Hours */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            style={{ background: '#0D0B09', border: '1px solid #2A2520', borderRadius: '16px', padding: '32px' }}
          >
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 700, color: '#F2EDE4', margin: '0 0 24px' }}>{t('hours_title')}</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {hours.map(h => (
                <li key={h.days} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', color: '#9B8B7E' }}>{h.days}</span>
                  <span style={{ fontSize: '14px', fontWeight: 500, color: h.time === t('closed') ? 'rgba(155,139,126,0.5)' : '#F2EDE4' }}>{h.time}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Location */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            style={{ background: '#0D0B09', border: '1px solid #2A2520', borderRadius: '16px', padding: '32px' }}
          >
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 700, color: '#F2EDE4', margin: '0 0 24px' }}>{t('location_title')}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
              <p style={{ margin: 0, color: '#F2EDE4', fontWeight: 500 }}>{t('address')}</p>
              <p style={{ margin: 0, color: '#9B8B7E' }}>{t('region')}</p>
              <div style={{ height: '1px', background: '#2A2520', margin: '8px 0' }} />
              <p style={{ margin: 0, color: '#9B8B7E', display: 'flex', alignItems: 'center', gap: '8px' }}><IconCar size={15} />{t('parking')}</p>
              <p style={{ margin: 0, color: '#9B8B7E', display: 'flex', alignItems: 'center', gap: '8px' }}><IconTrain size={15} />{t('metro')}</p>
            </div>
            <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '20px', fontSize: '14px', fontWeight: 500, color: '#C17A3B', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              {t('directions')}
            </a>
          </motion.div>

          {/* Contact */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
            style={{ background: '#0D0B09', border: '1px solid #2A2520', borderRadius: '16px', padding: '32px' }}
          >
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 700, color: '#F2EDE4', margin: '0 0 24px' }}>{t('contact_title')}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {contacts.map(c => (
                <a key={c.text} href={c.href} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#9B8B7E', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#F2EDE4')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#9B8B7E')}
                >
                  <span style={{ color: c.color, flexShrink: 0, display: 'flex' }}><c.Icon size={18} /></span>
                  {c.text}
                </a>
              ))}
            </div>
            <a href={waUrl} target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '24px', background: '#C17A3B', color: '#F2EDE4', padding: '13px', borderRadius: '100px', fontSize: '14px', fontWeight: 600, textDecoration: 'none', transition: 'opacity 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              {t('wa_reserve')}
            </a>
          </motion.div>
        </div>

        {/* Google Maps embed */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          style={{ marginTop: '16px', borderRadius: '16px', overflow: 'hidden', border: '1px solid #2A2520' }}
        >
          <iframe src={MAPS_EMBED_SRC} width="100%" height="360" style={{ border: 0, display: 'block' }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="DiMOE — Paine, Chile" allow="fullscreen" />
          <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '13px', background: '#181310', borderTop: '1px solid #2A2520', fontSize: '13px', fontWeight: 500, color: '#9B8B7E', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#C17A3B')}
            onMouseLeave={e => (e.currentTarget.style.color = '#9B8B7E')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
            {t('maps_link')}
          </a>
        </motion.div>

        {/* Events callout */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
          style={{ marginTop: '16px', background: '#0D0B09', border: '1px solid #2A2520', borderRadius: '16px', padding: '28px 32px', textAlign: 'center' }}
        >
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 700, color: '#F2EDE4', margin: '0 0 6px' }}>{t('event_title')}</p>
          <p style={{ fontSize: '14px', color: '#9B8B7E', margin: '0 0 14px' }}>{t('event_desc')}</p>
          <a href={MAPS_EVENTS_LINK}
            style={{ fontSize: '14px', fontWeight: 500, color: '#C17A3B', textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            {t('event_cta')}
          </a>
        </motion.div>

        {/* Contact form */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} style={{ marginTop: '16px' }}>
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}
