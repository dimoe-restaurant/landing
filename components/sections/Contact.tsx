'use client';

import { motion } from 'framer-motion';
import ContactForm from './ContactForm';

const WHATSAPP_URL = 'https://wa.me/56973694101?text=Hola!%20Quiero%20hacer%20una%20reserva';
const MAPS_LINK = 'https://www.google.com/maps/place/DiMOE+Pizzer%C3%ADa+y+Restobar/@-33.8555048,-70.7650772,18z';
const MAPS_EVENTS_LINK = 'mailto:contacto@dimoe.cl?subject=Consulta%20evento';

// OpenStreetMap embed: libre, sin API key, siempre funciona.
// Para usar Google Maps: Compartir → Insertar un mapa → copiar src y agregar
// como NEXT_PUBLIC_MAPS_EMBED_SRC en Vercel → Settings → Environment Variables.
const OSM_EMBED =
  'https://www.openstreetmap.org/export/embed.html?bbox=-70.7750772%2C-33.8655048%2C-70.7550772%2C-33.8455048&layer=mapnik&marker=-33.8555048%2C-70.7650772';

const MAPS_EMBED_SRC = process.env.NEXT_PUBLIC_MAPS_EMBED_SRC ?? OSM_EMBED;

const hours = [
  { days: 'Martes – Jueves', time: '12:30 – 22:30' },
  { days: 'Viernes – Sábado', time: '13:00 – 00:00' },
  { days: 'Domingo', time: '13:00 – 17:30' },
  { days: 'Lunes', time: 'Cerrado' },
];

const contacts = [
  { icon: '📱', text: '+56 9 7369 4101', href: WHATSAPP_URL },
  { icon: '✉️', text: 'contacto@dimoe.cl', href: 'mailto:contacto@dimoe.cl' },
  { icon: '📸', text: '@dimoe_restobar', href: 'https://instagram.com/dimoe_restobar' },
];

export default function Contact() {
  return (
    <section id="contacto" style={{ background: '#0D0B09', padding: 'clamp(64px, 8vw, 96px) clamp(16px, 4vw, 24px)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.35em', color: '#C17A3B', textTransform: 'uppercase', marginBottom: '16px' }} className="eyebrow">
            Visítanos
          </p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 700, lineHeight: 1.15, color: '#F2EDE4', margin: 0 }}>
            Te esperamos
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '16px' }}>

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ background: '#181310', border: '1px solid #2A2520', borderRadius: '16px', padding: '32px' }}
          >
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 700, color: '#F2EDE4', margin: '0 0 24px' }}>
              Horarios
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {hours.map(h => (
                <li key={h.days} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', color: '#9B8B7E' }}>{h.days}</span>
                  <span style={{ fontSize: '14px', fontWeight: 500, color: h.time === 'Cerrado' ? 'rgba(107,97,88,0.5)' : '#F2EDE4' }}>
                    {h.time}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ background: '#181310', border: '1px solid #2A2520', borderRadius: '16px', padding: '32px' }}
          >
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 700, color: '#F2EDE4', margin: '0 0 24px' }}>
              Ubicación
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
              <p style={{ margin: 0, color: '#F2EDE4', fontWeight: 500 }}>Darío Pavez 16, Champa</p>
              <p style={{ margin: 0, color: '#9B8B7E' }}>Paine, Región Metropolitana</p>
              <div style={{ height: '1px', background: '#2A2520', margin: '8px 0' }} />
              <p style={{ margin: 0, color: '#9B8B7E' }}>🚗 Estacionamiento propio</p>
              <p style={{ margin: 0, color: '#9B8B7E' }}>🚉 5 min desde Metrotren Hospital</p>
            </div>
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '20px', fontSize: '14px', fontWeight: 500, color: '#C17A3B', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Cómo llegar →
            </a>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ background: '#181310', border: '1px solid #2A2520', borderRadius: '16px', padding: '32px' }}
          >
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 700, color: '#F2EDE4', margin: '0 0 24px' }}>
              Contacto
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {contacts.map(c => (
                <a
                  key={c.text}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#9B8B7E', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#F2EDE4')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#9B8B7E')}
                >
                  <span style={{ fontSize: '18px', flexShrink: 0 }}>{c.icon}</span>
                  {c.text}
                </a>
              ))}
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '24px', background: '#C17A3B', color: '#F2EDE4', padding: '13px', borderRadius: '100px', fontSize: '14px', fontWeight: 600, textDecoration: 'none', transition: 'opacity 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Reservar por WhatsApp
            </a>
          </motion.div>
        </div>

        {/* Google Maps embed */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ marginTop: '16px', borderRadius: '16px', overflow: 'hidden', border: '1px solid #2A2520' }}
        >
          <iframe
            src={MAPS_EMBED_SRC}
            width="100%"
            height="360"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación DiMOE — Paine, Chile"
            allow="fullscreen"
          />
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              padding: '13px', background: '#181310', borderTop: '1px solid #2A2520',
              fontSize: '13px', fontWeight: 500, color: '#9B8B7E', textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#C17A3B')}
            onMouseLeave={e => (e.currentTarget.style.color = '#9B8B7E')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            Ver DiMOE en Google Maps →
          </a>
        </motion.div>

        {/* Events callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ marginTop: '16px', background: '#181310', border: '1px solid #2A2520', borderRadius: '16px', padding: '28px 32px', textAlign: 'center' }}
        >
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 700, color: '#F2EDE4', margin: '0 0 6px' }}>
            ¿Cumpleaños, matrimonio o evento empresarial?
          </p>
          <p style={{ fontSize: '14px', color: '#9B8B7E', margin: '0 0 14px' }}>
            Tenemos espacio y experiencia para hacer que tu evento sea especial.
          </p>
          <a
            href={MAPS_EVENTS_LINK}
            style={{ fontSize: '14px', fontWeight: 500, color: '#C17A3B', textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Consultar disponibilidad →
          </a>
        </motion.div>

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ marginTop: '16px' }}
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}
