'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import ContactForm from './ContactForm';
import { trackEvent } from '@/lib/analytics';

const GOOGLE_MAPS_URL = process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL ?? 'https://maps.app.goo.gl/cSgXSzJW9VvLttSS7';

type Step = 'gate' | 'happy' | 'form';

export default function AtencionClienteGate() {
  const t = useTranslations('atencionCliente');
  const [step, setStep] = useState<Step>('gate');

  function chooseHappy() {
    trackEvent('review_gate_happy');
    setStep('happy');
  }

  function chooseOther() {
    trackEvent('review_gate_other');
    setStep('form');
  }

  const cardStyle: React.CSSProperties = {
    background: '#181310', border: '1px solid #2A2520', borderRadius: '16px',
    padding: '32px', textAlign: 'center', display: 'flex', flexDirection: 'column',
    alignItems: 'center', gap: '10px', cursor: 'pointer', transition: 'border-color 0.2s',
  };

  return (
    <div style={{ maxWidth: '780px', margin: '0 auto', padding: 'clamp(40px, 6vw, 72px) clamp(16px, 4vw, 24px) 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.35em', color: '#C17A3B', textTransform: 'uppercase', marginBottom: '16px' }}>
          {t('label')}
        </p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(30px, 5vw, 44px)', fontWeight: 700, lineHeight: 1.2, color: '#F2EDE4', margin: '0 0 16px' }}>
          {step === 'gate' ? t('headline') : step === 'happy' ? t('happy_title') : t('form_intro_title')}
        </h1>
        <p style={{ fontSize: '15px', color: '#9B8B7E', lineHeight: 1.7, margin: 0 }}>
          {step === 'gate' ? t('subheadline') : step === 'happy' ? t('happy_body') : t('form_intro_body')}
        </p>
      </div>

      {step === 'gate' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '16px' }}>
          <button
            type="button" onClick={chooseHappy} style={cardStyle}
            onMouseEnter={e => (e.currentTarget.style.borderColor = '#C17A3B')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = '#2A2520')}
          >
            <span style={{ fontSize: '32px' }} aria-hidden>🌟</span>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 700, color: '#F2EDE4' }}>{t('happy_option')}</span>
            <span style={{ fontSize: '13px', color: '#9B8B7E' }}>{t('happy_option_hint')}</span>
          </button>
          <button
            type="button" onClick={chooseOther} style={cardStyle}
            onMouseEnter={e => (e.currentTarget.style.borderColor = '#C17A3B')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = '#2A2520')}
          >
            <span style={{ fontSize: '32px' }} aria-hidden>💬</span>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 700, color: '#F2EDE4' }}>{t('other_option')}</span>
            <span style={{ fontSize: '13px', color: '#9B8B7E' }}>{t('other_option_hint')}</span>
          </button>
        </div>
      )}

      {step === 'happy' && (
        <div style={{ textAlign: 'center' }}>
          <a
            href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer"
            onClick={() => trackEvent('review_gate_google_click')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#C17A3B', color: '#F2EDE4',
              borderRadius: '100px', padding: '14px 28px', fontSize: '14px', fontWeight: 600, textDecoration: 'none',
            }}
          >
            {t('happy_cta')}
          </a>
          <div style={{ marginTop: '24px' }}>
            <button type="button" onClick={() => setStep('gate')} style={{ background: 'none', border: 'none', color: '#9B8B7E', fontSize: '13px', cursor: 'pointer', textDecoration: 'underline' }}>
              {t('back')}
            </button>
          </div>
        </div>
      )}

      {step === 'form' && (
        <div>
          <ContactForm origen="Atención Cliente" showTipoSelector />
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button type="button" onClick={() => setStep('gate')} style={{ background: 'none', border: 'none', color: '#9B8B7E', fontSize: '13px', cursor: 'pointer', textDecoration: 'underline' }}>
              {t('back')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
