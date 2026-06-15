'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MAPS = 'https://maps.app.goo.gl/cSgXSzJW9VvLttSS7';
const WA = 'https://wa.me/56973694101?text=Hola!%20Quiero%20hacer%20una%20reserva';
const THE_TOP = 'https://thetop.cl/post/mejores-pizzas-chile-2025/';
const SOPROLE = 'https://comunidadsoprolefp.cl/marisol-osorio-presenta-del-campo-a-tu-mesa-maestri-pizzaioli-2023-soprole-food-professionals/';

const ls: React.CSSProperties = {
  color: '#C17A3B',
  textDecoration: 'underline',
  textDecorationColor: 'rgba(193,122,59,0.35)',
};

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: '¿Dónde está DiMOE?',
    a: <>En Darío Pavez 16, Champa, Paine — a 40 km al sur de Santiago, unos 35–40 minutos por la Ruta 5 Sur. Estacionamiento gratuito. <a href={MAPS} target="_blank" rel="noopener noreferrer" style={ls}>Ver en Google Maps →</a></>,
  },
  {
    q: '¿Cuáles son los horarios?',
    a: 'Martes a jueves: 12:30–22:30 · Viernes y sábado: 13:00–00:00 · Domingo: 13:00–17:30. Lunes cerrado.',
  },
  {
    q: '¿Cómo se hace una reserva?',
    a: <><a href={WA} target="_blank" rel="noopener noreferrer" style={ls}>WhatsApp al +56 9 7369 4101</a> o completando el formulario de contacto en esta página. Sin seña ni cargo por reserva.</>,
  },
  {
    q: '¿Qué tipo de comida sirven?',
    a: 'Pizza napolitana cocinada en horno de leña, pastas artesanales elaboradas a diario y cócteles de autor. Todo con ingredientes frescos de inspiración italiana.',
  },
  {
    q: '¿Aceptan mascotas?',
    a: 'Sí, la terraza exterior es pet-friendly.',
  },
  {
    q: '¿Qué reconocimientos tiene DiMOE?',
    a: <><a href={THE_TOP} target="_blank" rel="noopener noreferrer" style={ls}>2° lugar en The Top Pizza Chile 2025</a> (Región Metropolitana) y 3° lugar en el <a href={SOPROLE} target="_blank" rel="noopener noreferrer" style={ls}>Maestri Pizzaioli de Soprole 2023</a>. Calificación de 4,8 ⭐ en <a href={MAPS} target="_blank" rel="noopener noreferrer" style={ls}>Google Maps</a>.</>,
  },
  {
    q: '¿Tienen opciones vegetarianas?',
    a: 'Sí. La carta incluye pizzas y pastas sin carne. Consulta a tu mozo por las opciones del día.',
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="preguntas-frecuentes"
      style={{ background: '#111009', padding: 'clamp(64px, 8vw, 96px) clamp(16px, 4vw, 24px)' }}
    >
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.35em', color: '#C17A3B', textTransform: 'uppercase', marginBottom: '12px' }}>
            Preguntas frecuentes
          </p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 700, color: '#F2EDE4', margin: 0, lineHeight: 1.18 }}>
            Todo lo que necesitas saber
          </h2>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              style={{ borderRadius: '8px', overflow: 'hidden', background: open === i ? '#1A1713' : 'transparent' }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  padding: '20px 24px',
                  background: 'none',
                  border: 'none',
                  borderBottom: open === i ? '1px solid rgba(193,122,59,0.15)' : '1px solid rgba(242,237,228,0.06)',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(15px, 2vw, 17px)', color: '#F2EDE4', lineHeight: 1.4 }}>
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.22 }}
                  style={{ flexShrink: 0, color: '#C17A3B', fontSize: '22px', lineHeight: 1, fontWeight: 300 }}
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p style={{ margin: 0, padding: '18px 24px 22px', fontFamily: 'var(--font-sans)', fontSize: '15px', color: 'rgba(242,237,228,0.72)', lineHeight: 1.7 }}>
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
