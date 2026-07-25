'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

export const SUBMITTED_KEY = 'dimoe_lead_carta_submitted';
export const DISMISSED_UNTIL_KEY = 'dimoe_lead_carta_dismissed_until';
export const LEAD_BANNER_RESOLVED_EVENT = 'dimoe:lead-banner-resolved';
const DISMISS_COOLDOWN_MS = 24 * 60 * 60 * 1000;

type Status = 'idle' | 'loading' | 'success' | 'error';
type NativeDateInput = HTMLInputElement & { showPicker?: () => void };

export function leadBannerWillShow(): boolean {
  if (localStorage.getItem(SUBMITTED_KEY)) return false;
  const until = Number(localStorage.getItem(DISMISSED_UNTIL_KEY) ?? 0);
  return Date.now() >= until;
}

export default function LeadBanner() {
  const t = useTranslations('leadBanner');
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [marketing, setMarketing] = useState(false);
  const dobRef = useRef<HTMLInputElement>(null);
  const dobNativeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (leadBannerWillShow()) setVisible(true);
  }, []);

  function close() {
    localStorage.setItem(DISMISSED_UNTIL_KEY, String(Date.now() + DISMISS_COOLDOWN_MS));
    setVisible(false);
    window.dispatchEvent(new Event(LEAD_BANNER_RESOLVED_EVENT));
  }

  function onDobInput(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 8);
    let out = digits;
    if (digits.length > 2 && digits.length <= 4) out = `${digits.slice(0, 2)}/${digits.slice(2)}`;
    else if (digits.length > 4) out = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
    e.target.value = out;
  }

  function openCalendar() {
    const native = dobNativeRef.current as NativeDateInput | null;
    if (!native) return;
    if (typeof native.showPicker === 'function') {
      try { native.showPicker(); } catch { native.focus(); }
    } else {
      native.focus();
    }
  }

  function syncFromNative(e: React.ChangeEvent<HTMLInputElement>) {
    const [y, m, d] = e.target.value.split('-');
    if (y && m && d && dobRef.current) dobRef.current.value = `${d}/${m}/${y}`;
  }

  function validate(data: FormData) {
    const errs: Record<string, string> = {};
    if (!String(data.get('nombre')).trim()) errs.nombre = t('err_name');
    const email = String(data.get('email')).trim();
    if (!email) errs.email = t('err_email_req');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = t('err_email_inv');
    const phone = String(data.get('telefono')).trim();
    if (!phone) errs.telefono = t('err_phone_req');
    else if (!/^\+?[\d\s\-()]{7,15}$/.test(phone)) errs.telefono = t('err_phone_inv');
    const fecha = String(data.get('fechaNacimiento')).trim();
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(fecha)) errs.fechaNacimiento = t('err_dob');
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
      const res = await fetch('/api/lead-carta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: data.get('nombre'),
          email: data.get('email'),
          telefono: data.get('telefono'),
          fechaNacimiento: data.get('fechaNacimiento'),
          marketing_consent: marketing,
        }),
      });
      if (res.ok) {
        localStorage.setItem(SUBMITTED_KEY, '1');
        setStatus('success');
        window.dispatchEvent(new Event(LEAD_BANNER_RESOLVED_EVENT));
        setTimeout(() => setVisible(false), 1800);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (!visible) return null;

  const inputStyle: React.CSSProperties = {
    width: '100%', background: '#0D0B09', border: '1px solid #2A2520',
    borderRadius: '10px', padding: '11px 13px', fontSize: '13.5px', color: '#F2EDE4',
    outline: 'none', transition: 'border-color 0.2s', fontFamily: 'var(--font-sans)', boxSizing: 'border-box',
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t('title')}
      style={{
        position: 'fixed', inset: 0, zIndex: 55,
        background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div style={{
        width: '100%', maxWidth: '420px', maxHeight: '90vh', overflow: 'hidden',
        background: 'rgba(13,11,9,0.98)', border: '1px solid rgba(193,122,59,0.35)',
        borderRadius: '20px', padding: '22px 22px 24px', boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
      }}>
        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '12px 0' }}>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', fontWeight: 700, color: '#F2EDE4', margin: '0 0 6px' }}>{t('success_title')}</p>
            <p style={{ fontSize: '13px', color: '#9B8B7E', margin: 0 }}>{t('success_body')}</p>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '12px' }}>
              <div>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', fontWeight: 700, margin: '0 0 4px', color: '#F2EDE4' }}>{t('title')}</p>
                <p style={{ fontSize: '12px', color: '#9B8B7E', margin: 0, lineHeight: 1.5 }}>{t('subtitle')}</p>
              </div>
              <button type="button" onClick={close} aria-label={t('close')} style={{
                flexShrink: 0, width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #2A2520',
                background: '#0D0B09', color: '#9B8B7E', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <input name="nombre" type="text" placeholder={t('name')} autoComplete="name"
                  style={{ ...inputStyle, borderColor: errors.nombre ? '#E85D5D' : '#2A2520' }}
                  onFocus={e => (e.currentTarget.style.borderColor = '#C17A3B')}
                  onBlur={e => (e.currentTarget.style.borderColor = errors.nombre ? '#E85D5D' : '#2A2520')} />
                {errors.nombre && <p style={{ fontSize: '11px', color: '#E85D5D', margin: '4px 0 0' }}>{errors.nombre}</p>}
              </div>

              <div>
                <div style={{ position: 'relative' }}>
                  <input ref={dobRef} name="fechaNacimiento" type="text" inputMode="numeric" maxLength={10}
                    placeholder={t('dob_placeholder')} onChange={onDobInput}
                    style={{ ...inputStyle, paddingRight: '42px', borderColor: errors.fechaNacimiento ? '#E85D5D' : '#2A2520' }}
                    onFocus={e => (e.currentTarget.style.borderColor = '#C17A3B')}
                    onBlur={e => (e.currentTarget.style.borderColor = errors.fechaNacimiento ? '#E85D5D' : '#2A2520')} />
                  <button type="button" onClick={openCalendar} aria-label={t('open_calendar')} style={{
                    position: 'absolute', right: '5px', top: '5px', bottom: '5px', width: '34px', border: 'none',
                    borderRadius: '7px', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: '#C17A3B',
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                  </button>
                  <input ref={dobNativeRef} type="date" tabIndex={-1} aria-hidden="true" onChange={syncFromNative}
                    style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: '1px', height: '1px', left: 0, bottom: 0 }} />
                </div>
                {errors.fechaNacimiento && <p style={{ fontSize: '11px', color: '#E85D5D', margin: '4px 0 0' }}>{errors.fechaNacimiento}</p>}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <input name="email" type="email" placeholder={t('email')} autoComplete="email"
                    style={{ ...inputStyle, borderColor: errors.email ? '#E85D5D' : '#2A2520' }}
                    onFocus={e => (e.currentTarget.style.borderColor = '#C17A3B')}
                    onBlur={e => (e.currentTarget.style.borderColor = errors.email ? '#E85D5D' : '#2A2520')} />
                  {errors.email && <p style={{ fontSize: '11px', color: '#E85D5D', margin: '4px 0 0' }}>{errors.email}</p>}
                </div>
                <div>
                  <input name="telefono" type="tel" placeholder={t('phone')} autoComplete="tel"
                    style={{ ...inputStyle, borderColor: errors.telefono ? '#E85D5D' : '#2A2520' }}
                    onFocus={e => (e.currentTarget.style.borderColor = '#C17A3B')}
                    onBlur={e => (e.currentTarget.style.borderColor = errors.telefono ? '#E85D5D' : '#2A2520')} />
                  {errors.telefono && <p style={{ fontSize: '11px', color: '#E85D5D', margin: '4px 0 0' }}>{errors.telefono}</p>}
                </div>
              </div>

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '9px', cursor: 'pointer', marginTop: '2px' }}>
                <div style={{ position: 'relative', flexShrink: 0, marginTop: '1px' }}>
                  <input type="checkbox" checked={marketing} onChange={e => setMarketing(e.target.checked)}
                    style={{ position: 'absolute', opacity: 0, width: '15px', height: '15px', cursor: 'pointer' }} />
                  <div style={{
                    width: '15px', height: '15px', borderRadius: '4px', border: `1.5px solid ${marketing ? '#C17A3B' : '#2A2520'}`,
                    background: marketing ? '#C17A3B' : 'transparent', transition: 'all 0.15s', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {marketing && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
                  </div>
                </div>
                <span style={{ fontSize: '11px', color: '#9B8B7E', lineHeight: 1.5 }}>
                  {t('marketing')}{' '}
                  <a href="/privacidad" target="_blank" style={{ color: '#C17A3B', textDecoration: 'none' }}>
                    ({t('privacy_link')})
                  </a>
                </span>
              </label>

              {status === 'error' && (
                <p style={{ fontSize: '12px', color: '#E85D5D', margin: 0 }}>{t('error')}</p>
              )}

              <button type="submit" disabled={status === 'loading'} style={{
                background: status === 'loading' ? 'rgba(193,122,59,0.6)' : '#C17A3B',
                color: '#F2EDE4', border: 'none', borderRadius: '100px', padding: '12px',
                fontSize: '13.5px', fontWeight: 600, cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                fontFamily: 'var(--font-sans)', marginTop: '2px',
              }}>
                {status === 'loading' ? t('sending') : t('submit')}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
