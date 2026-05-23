'use client';

import { motion } from 'framer-motion';

const hours = [
  { days: 'Martes – Jueves', time: '12:30 – 22:30' },
  { days: 'Viernes – Sábado', time: '13:00 – 00:00' },
  { days: 'Domingo', time: '13:00 – 17:30' },
  { days: 'Lunes', time: 'Cerrado' },
];

export default function Contact() {
  return (
    <section id="contacto" style={{ background: '#181310', padding: '96px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.35em', color: '#C17A3B', textTransform: 'uppercase', marginBottom: '16px' }}>
            Visitanos
          </p>
          <h2 style={{
            fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 5vw, 52px)',
            fontWeight: 700, lineHeight: 1.15, color: '#F2EDE4', margin: 0,
          }}>
            Te esperamos
          </h2>
        </motion.div>

        {/* 3-column cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>

          {/* Hours card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ background: '#0D0B09', border: '1px solid #2A2520', borderRadius: '16px', padding: '32px' }}
          >
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 700, color: '#F2EDE4', margin: '0 0 24px' }}>
              Horarios
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {hours.map(h => (
                <li key={h.days} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', color: '#6B6158' }}>{h.days}</span>
                  <span style={{
                    fontSize: '14px', fontWeight: 500,
                    color: h.time === 'Cerrado' ? 'rgba(107,97,88,0.5)' : '#F2EDE4',
                  }}>{h.time}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Location card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ background: '#0D0B09', border: '1px solid #2A2520', borderRadius: '16px', padding: '32px' }}
          >
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 700, color: '#F2EDE4', margin: '0 0 24px' }}>
              Ubicación
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: '#6B6158' }}>
              <p style={{ margin: 0, color: '#F2EDE4', fontWeight: 500 }}>Darío Pavez 16, Champa</p>
              <p style={{ margin: 0 }}>Paine, Región Metropolitana</p>
              <div style={{ height: '1px', background: '#2A2520', margin: '8px 0' }} />
              <p style={{ margin: 0 }}>🚗 Estacionamiento propio</p>
              <p style={{ margin: 0 }}>🚉 5 min desde Metrotren Hospital</p>
            </div>
            <a
              href="https://maps.google.com/?q=DiMOE+Paine+Chile"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-block', marginTop: '20px', fontSize: '14px', fontWeight: 500, color: '#C17A3B', textDecoration: 'none' }}
            >
              Abrir en Maps →
            </a>
          </motion.div>

          {/* Contact card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ background: '#0D0B09', border: '1px solid #2A2520', borderRadius: '16px', padding: '32px' }}
          >
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 700, color: '#F2EDE4', margin: '0 0 24px' }}>
              Contacto
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { icon: '📱', text: '+56 9 7369 4101', href: 'https://wa.me/56973694101' },
                { icon: '✉️', text: 'contacto@dimoe.cl', href: 'mailto:contacto@dimoe.cl' },
                { icon: '📸', text: '@dimoe_restobar', href: 'https://instagram.com/dimoe_restobar' },
              ].map(c => (
                <a key={c.text} href={c.href} target="_blank" rel="noopener noreferrer" style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  fontSize: '14px', color: '#6B6158', textDecoration: 'none',
                  transition: 'color 0.2s',
                }}>
                  <span style={{ fontSize: '20px' }}>{c.icon}</span>
                  {c.text}
                </a>
              ))}
            </div>
            <a
              href="https://wa.me/56973694101?text=Hola!%20Quiero%20hacer%20una%20reserva"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginTop: '24px', background: '#C17A3B', color: '#F2EDE4',
                padding: '13px', borderRadius: '100px', fontSize: '14px',
                fontWeight: 600, textDecoration: 'none',
              }}
            >
              Reservar por WhatsApp
            </a>
          </motion.div>
        </div>

        {/* Events callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            marginTop: '16px', background: '#0D0B09',
            border: '1px solid #2A2520', borderRadius: '16px',
            padding: '28px 32px', textAlign: 'center',
          }}
        >
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 700, color: '#F2EDE4', margin: '0 0 6px' }}>
            ¿Cumpleaños, matrimonio o evento empresarial?
          </p>
          <p style={{ fontSize: '14px', color: '#6B6158', margin: '0 0 14px' }}>
            Tenemos espacio y experiencia para hacer que tu evento sea especial.
          </p>
          <a href="mailto:contacto@dimoe.cl?subject=Consulta%20evento" style={{
            fontSize: '14px', fontWeight: 500, color: '#C17A3B', textDecoration: 'none',
          }}>
            Consultar disponibilidad →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
