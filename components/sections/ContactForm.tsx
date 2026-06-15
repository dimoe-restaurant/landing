'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { trackEvent } from '@/lib/analytics';
import { trackPixelEvent } from '@/lib/meta-pixel';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const t = useTranslations('form');
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [marketing, setMarketing] = useState(false);

  function validate(data: FormData) {
    const errs: Record<string, string> = {};
    if (!String(data.get('nombre')).trim()) errs.nombre = t('err_name');
    const email = String(data.get('email')).trim();
    if (!email) errs.email = t('err_email_req');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = t('err_email_inv');
    const phone = String(data.get('telefono')).trim();
    if (phone && !/^\+?[\d\s\-()]{7,15}$/.test(phone)) errs.telefono = t('err_phone');
    if (!String(data.get('mensaje')).trim()) errs.mensaje = t('err_msg');
    return errs;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const errs = validate(data);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: data.get('nombre'),
          email: data.get('email'),
          telefono: String(data.get('telefono')).trim() || null,
          mensaje: data.get('mensaje'),
          marketing_consent: marketing,
        }),
      });
      if (res.ok) { setStatus('success'); trackEvent('form_submit_success'); trackPixelEvent('Lead'); }
      else setStatus('error');
    } catch { setStatus('error'); }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', background: '#0D0B09', border: '1px solid #2A2520',
    borderRadius: '10px', padding: '13px 16px', fontSize: '14px', color: '#F2EDE4',
    outline: 'none', transition: 'border-color 0.2s', fontFamily: 'var(--font-sans)', boxSizing: 'border-box',
  };

  if (status === 'success') {
    return (
      <div style={{ background: '#181310', border: '1px solid rgba(193,122,59,0.3)', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(193,122,59,0.15)', border: '1px solid rgba(193,122,59,0.4)', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C17A3B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 700, color: '#F2EDE4', margin: '0 0 8px' }}>{t('success_title')}</p>
        <p style={{ fontSize: '14px', color: '#9B8B7E', margin: 0 }}>{t('success_body')}</p>
      </div>
    );
  }

  return (
    <div style={{ background: '#181310', border: '1px solid #2A2520', borderRadius: '16px', padding: '32px' }}>
      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 700, color: '#F2EDE4', margin: '0 0 8px' }}>{t('title')}</h3>
      <p style={{ fontSize: '14px', color: '#9B8B7E', margin: '0 0 24px' }}>{t('subtitle')}</p>

      <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Nombre */}
        <div>
          <input name="nombre" type="text" placeholder={t('name')} autoComplete="name"
            style={{ ...inputStyle, borderColor: errors.nombre ? '#E85D5D' : '#2A2520' }}
            onFocus={e => (e.currentTarget.style.borderColor = '#C17A3B')}
            onBlur={e => (e.currentTarget.style.borderColor = errors.nombre ? '#E85D5D' : '#2A2520')} />
          {errors.nombre && <p style={{ fontSize: '12px', color: '#E85D5D', margin: '4px 0 0' }}>{errors.nombre}</p>}
        </div>

        {/* Email + Teléfono en fila */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <input name="email" type="email" placeholder={t('email')} autoComplete="email"
              style={{ ...inputStyle, borderColor: errors.email ? '#E85D5D' : '#2A2520' }}
              onFocus={e => (e.currentTarget.style.borderColor = '#C17A3B')}
              onBlur={e => (e.currentTarget.style.borderColor = errors.email ? '#E85D5D' : '#2A2520')} />
            {errors.email && <p style={{ fontSize: '12px', color: '#E85D5D', margin: '4px 0 0' }}>{errors.email}</p>}
          </div>
          <div>
            <input name="telefono" type="tel" placeholder={t('phone')} autoComplete="tel"
              style={{ ...inputStyle, borderColor: errors.telefono ? '#E85D5D' : '#2A2520' }}
              onFocus={e => (e.currentTarget.style.borderColor = '#C17A3B')}
              onBlur={e => (e.currentTarget.style.borderColor = errors.telefono ? '#E85D5D' : '#2A2520')} />
            {errors.telefono && <p style={{ fontSize: '12px', color: '#E85D5D', margin: '4px 0 0' }}>{errors.telefono}</p>}
          </div>
        </div>

        {/* Mensaje */}
        <div>
          <textarea name="mensaje" rows={4} placeholder={t('message')}
            style={{ ...inputStyle, resize: 'vertical', minHeight: '110px', borderColor: errors.mensaje ? '#E85D5D' : '#2A2520' }}
            onFocus={e => (e.currentTarget.style.borderColor = '#C17A3B')}
            onBlur={e => (e.currentTarget.style.borderColor = errors.mensaje ? '#E85D5D' : '#2A2520')} />
          {errors.mensaje && <p style={{ fontSize: '12px', color: '#E85D5D', margin: '4px 0 0' }}>{errors.mensaje}</p>}
        </div>

        {/* Consentimiento marketing */}
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
          <div style={{ position: 'relative', flexShrink: 0, marginTop: '1px' }}>
            <input type="checkbox" checked={marketing} onChange={e => setMarketing(e.target.checked)}
              style={{ position: 'absolute', opacity: 0, width: '16px', height: '16px', cursor: 'pointer' }} />
            <div style={{
              width: '16px', height: '16px', borderRadius: '4px', border: `1.5px solid ${marketing ? '#C17A3B' : '#2A2520'}`,
              background: marketing ? '#C17A3B' : 'transparent', transition: 'all 0.15s', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {marketing && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
            </div>
          </div>
          <span style={{ fontSize: '12px', color: '#9B8B7E', lineHeight: 1.5 }}>
            {t('marketing')}{' '}
            <a href="/privacidad" target="_blank" style={{ color: '#C17A3B', textDecoration: 'none' }}>
              ({t('privacy_link')})
            </a>
          </span>
        </label>

        {status === 'error' && (
          <p style={{ fontSize: '13px', color: '#E85D5D', margin: 0 }}>
            {t('error')} <a href="mailto:contacto@dimoe.cl" style={{ color: '#C17A3B' }}>contacto@dimoe.cl</a>
          </p>
        )}

        <button type="submit" disabled={status === 'loading'} style={{
          background: status === 'loading' ? 'rgba(193,122,59,0.6)' : '#C17A3B',
          color: '#F2EDE4', border: 'none', borderRadius: '100px', padding: '14px',
          fontSize: '14px', fontWeight: 600, cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          fontFamily: 'var(--font-sans)', transition: 'opacity 0.2s',
        }}>
          {status === 'loading' ? t('sending') : t('submit')}
        </button>
      </form>
    </div>
  );
}
