'use client';

import { useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(data: FormData) {
    const errs: Record<string, string> = {};
    if (!String(data.get('nombre')).trim()) errs.nombre = 'El nombre es obligatorio';
    const email = String(data.get('email')).trim();
    if (!email) errs.email = 'El email es obligatorio';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Email inválido';
    if (!String(data.get('mensaje')).trim()) errs.mensaje = 'El mensaje es obligatorio';
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
          mensaje: data.get('mensaje'),
        }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div style={{ background: '#181310', border: '1px solid rgba(193,122,59,0.3)', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
        <div style={{ fontSize: '40px', marginBottom: '16px' }}>✅</div>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 700, color: '#F2EDE4', margin: '0 0 8px' }}>
          ¡Mensaje enviado!
        </p>
        <p style={{ fontSize: '14px', color: '#9B8B7E', margin: 0 }}>
          Te responderemos a la brevedad a <strong style={{ color: '#F2EDE4' }}>contacto@dimoe.cl</strong>
        </p>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', background: '#0D0B09', border: '1px solid #2A2520',
    borderRadius: '10px', padding: '13px 16px', fontSize: '14px',
    color: '#F2EDE4', outline: 'none', transition: 'border-color 0.2s',
    fontFamily: 'var(--font-sans)', boxSizing: 'border-box',
  };

  return (
    <div style={{ background: '#181310', border: '1px solid #2A2520', borderRadius: '16px', padding: '32px' }}>
      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 700, color: '#F2EDE4', margin: '0 0 8px' }}>
        Envianos un mensaje
      </h3>
      <p style={{ fontSize: '14px', color: '#9B8B7E', margin: '0 0 24px' }}>
        Reservas, eventos o cualquier consulta — respondemos rápido.
      </p>

      <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Nombre */}
        <div>
          <input
            name="nombre"
            type="text"
            placeholder="Tu nombre"
            autoComplete="name"
            style={{ ...inputStyle, borderColor: errors.nombre ? '#E85D5D' : '#2A2520' }}
            onFocus={e => (e.currentTarget.style.borderColor = '#C17A3B')}
            onBlur={e => (e.currentTarget.style.borderColor = errors.nombre ? '#E85D5D' : '#2A2520')}
          />
          {errors.nombre && <p style={{ fontSize: '12px', color: '#E85D5D', margin: '4px 0 0' }}>{errors.nombre}</p>}
        </div>

        {/* Email */}
        <div>
          <input
            name="email"
            type="email"
            placeholder="tu@email.com"
            autoComplete="email"
            style={{ ...inputStyle, borderColor: errors.email ? '#E85D5D' : '#2A2520' }}
            onFocus={e => (e.currentTarget.style.borderColor = '#C17A3B')}
            onBlur={e => (e.currentTarget.style.borderColor = errors.email ? '#E85D5D' : '#2A2520')}
          />
          {errors.email && <p style={{ fontSize: '12px', color: '#E85D5D', margin: '4px 0 0' }}>{errors.email}</p>}
        </div>

        {/* Mensaje */}
        <div>
          <textarea
            name="mensaje"
            rows={4}
            placeholder="¿En qué te podemos ayudar?"
            style={{ ...inputStyle, resize: 'vertical', minHeight: '110px', borderColor: errors.mensaje ? '#E85D5D' : '#2A2520' }}
            onFocus={e => (e.currentTarget.style.borderColor = '#C17A3B')}
            onBlur={e => (e.currentTarget.style.borderColor = errors.mensaje ? '#E85D5D' : '#2A2520')}
          />
          {errors.mensaje && <p style={{ fontSize: '12px', color: '#E85D5D', margin: '4px 0 0' }}>{errors.mensaje}</p>}
        </div>

        {status === 'error' && (
          <p style={{ fontSize: '13px', color: '#E85D5D', margin: 0 }}>
            Hubo un problema al enviar. Intentá de nuevo o escríbenos a{' '}
            <a href="mailto:contacto@dimoe.cl" style={{ color: '#C17A3B' }}>contacto@dimoe.cl</a>
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          style={{
            background: status === 'loading' ? 'rgba(193,122,59,0.6)' : '#C17A3B',
            color: '#F2EDE4', border: 'none', borderRadius: '100px',
            padding: '14px', fontSize: '14px', fontWeight: 600,
            cursor: status === 'loading' ? 'not-allowed' : 'pointer',
            transition: 'opacity 0.2s', fontFamily: 'var(--font-sans)',
          }}
        >
          {status === 'loading' ? 'Enviando...' : 'Enviar mensaje'}
        </button>
      </form>
    </div>
  );
}
