'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { trackEvent } from '@/lib/analytics';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const t = useTranslations('form');
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(data: FormData) {
    const errs: Record<string, string> = {};
    if (!String(data.get('nombre')).trim()) errs.nombre = t('err_name');
    const email = String(data.get('email')).trim();
    if (!email) errs.email = t('err_email_req');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = t('err_email_inv');
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
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ nombre: data.get('nombre'), email: data.get('email'), mensaje: data.get('mensaje') }) });
      if (res.ok) { setStatus('success'); trackEvent('form_submit_success'); }
      else setStatus('error');
    } catch { setStatus('error'); }
  }

  if (status === 'success') {
    return (
      <div style={{ background: '#181310', border: '1px solid rgba(193,122,59,0.3)', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
        <div style={{ fontSize: '40px', marginBottom: '16px' }}>✅</div>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 700, color: '#F2EDE4', margin: '0 0 8px' }}>{t('success_title')}</p>
        <p style={{ fontSize: '14px', color: '#9B8B7E', margin: 0 }}>{t('success_body')}</p>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = { width: '100%', background: '#0D0B09', border: '1px solid #2A2520', borderRadius: '10px', padding: '13px 16px', fontSize: '14px', color: '#F2EDE4', outline: 'none', transition: 'border-color 0.2s', fontFamily: 'var(--font-sans)', boxSizing: 'border-box' };

  return (
    <div style={{ background: '#181310', border: '1px solid #2A2520', borderRadius: '16px', padding: '32px' }}>
      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 700, color: '#F2EDE4', margin: '0 0 8px' }}>{t('title')}</h3>
      <p style={{ fontSize: '14px', color: '#9B8B7E', margin: '0 0 24px' }}>{t('subtitle')}</p>
      <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <input name="nombre" type="text" placeholder={t('name')} autoComplete="name" style={{ ...inputStyle, borderColor: errors.nombre ? '#E85D5D' : '#2A2520' }} onFocus={e => (e.currentTarget.style.borderColor = '#C17A3B')} onBlur={e => (e.currentTarget.style.borderColor = errors.nombre ? '#E85D5D' : '#2A2520')} />
          {errors.nombre && <p style={{ fontSize: '12px', color: '#E85D5D', margin: '4px 0 0' }}>{errors.nombre}</p>}
        </div>
        <div>
          <input name="email" type="email" placeholder={t('email')} autoComplete="email" style={{ ...inputStyle, borderColor: errors.email ? '#E85D5D' : '#2A2520' }} onFocus={e => (e.currentTarget.style.borderColor = '#C17A3B')} onBlur={e => (e.currentTarget.style.borderColor = errors.email ? '#E85D5D' : '#2A2520')} />
          {errors.email && <p style={{ fontSize: '12px', color: '#E85D5D', margin: '4px 0 0' }}>{errors.email}</p>}
        </div>
        <div>
          <textarea name="mensaje" rows={4} placeholder={t('message')} style={{ ...inputStyle, resize: 'vertical', minHeight: '110px', borderColor: errors.mensaje ? '#E85D5D' : '#2A2520' }} onFocus={e => (e.currentTarget.style.borderColor = '#C17A3B')} onBlur={e => (e.currentTarget.style.borderColor = errors.mensaje ? '#E85D5D' : '#2A2520')} />
          {errors.mensaje && <p style={{ fontSize: '12px', color: '#E85D5D', margin: '4px 0 0' }}>{errors.mensaje}</p>}
        </div>
        {status === 'error' && <p style={{ fontSize: '13px', color: '#E85D5D', margin: 0 }}>{t('error')} <a href="mailto:contacto@dimoe.cl" style={{ color: '#C17A3B' }}>contacto@dimoe.cl</a></p>}
        <button type="submit" disabled={status === 'loading'} style={{ background: status === 'loading' ? 'rgba(193,122,59,0.6)' : '#C17A3B', color: '#F2EDE4', border: 'none', borderRadius: '100px', padding: '14px', fontSize: '14px', fontWeight: 600, cursor: status === 'loading' ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-sans)' }}>
          {status === 'loading' ? t('sending') : t('submit')}
        </button>
      </form>
    </div>
  );
}
