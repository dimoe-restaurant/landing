'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    q: '¿Dónde está DiMOE?',
    a: 'En Darío Pavez 16, Champa, Paine — a 40 km al sur de Santiago, unos 35–40 minutos por la Ruta 5 Sur. Contamos con amplio estacionamiento gratuito.',
  },
  {
    q: '¿Cuáles son los horarios?',
    a: 'Martes a jueves: 12:30–22:30 · Viernes y sábado: 13:00–00:00 · Domingo: 13:00–17:30. Lunes cerrado.',
  },
  {
    q: '¿Cómo se hace una reserva?',
    a: 'Por WhatsApp al +56 9 7369 4101 o completando el formulario de contacto en esta página. No cobramos seña.',
  },
  {
    q: '¿Qué tipo de comida sirven?',
    a: 'Pizza napolitana cocinada en horno de leña, pastas artesanales elaboradas a diario con masa fresca y cócteles de autor. Todo con ingredientes frescos de inspiración italiana.',
  },
  {
    q: '¿Aceptan mascotas?',
    a: 'Sí, la terraza exterior de DiMOE es pet-friendly.',
  },
  {
    q: '¿Qué reconocimientos tiene DiMOE?',
    a: 'DiMOE obtuvo el 2° lugar en The Top Pizza Chile (Región Metropolitana) y el 2° lugar en el Premio Maestro Pizzaiolo de Soprole (2023). Tiene una calificación de 4,8 ⭐ en Google Maps.',
  },
  {
    q: '¿Tienen opciones vegetarianas?',
    a: 'Sí. Nuestra carta incluye pizzas y pastas sin carne. Pregúntale a tu mozo por las opciones del día.',
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
            Todo lo que necesitás saber
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
