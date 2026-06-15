'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const photos = [
  { src: '/images/gs_fb_891682793088451_1440x1440.jpg', alt: 'Horno de leña a fuego vivo en DiMOE' },
  { src: '/images/gs_fb_1073951724861556_1440x1920.jpg', alt: 'Bruschetta con prosciutto y burrata' },
  { src: '/images/gs_fb_891682789755118_1440x1440.jpg', alt: 'Cócteles artesanales en la barra de DiMOE' },
  { src: '/images/gs_fb_868552525401478_1440x1800.jpg', alt: 'Pizza napolitana recién salida del horno' },
  { src: '/images/gs_fb_927719339484796_1440x1440.jpg', alt: 'Terraza exterior de DiMOE de noche, Paine' },
  { src: '/images/gs_fb_1073951738194888_1440x1920.jpg', alt: 'Ravioles con salsa cremosa y parmesano' },
];

export default function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(() => setActive(i => i != null ? (i - 1 + photos.length) % photos.length : null), []);
  const next = useCallback(() => setActive(i => i != null ? (i + 1) % photos.length : null), []);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active, close, prev, next]);

  return (
    <>
      <section style={{ background: '#0D0B09', padding: 'clamp(64px, 8vw, 80px) clamp(16px, 4vw, 24px)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '32px' }}
          >
            <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.35em', color: '#C17A3B', textTransform: 'uppercase', marginBottom: '12px' }}>
              La experiencia
            </p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#F2EDE4', margin: 0, lineHeight: 1.15 }}>
              Desde el horno hasta la terraza
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3" style={{ gap: '8px' }}>
            {photos.map((photo, i) => (
              <motion.button
                key={photo.src}
                onClick={() => setActive(i)}
                aria-label={`Ver foto: ${photo.alt}`}
                initial={{ opacity: 0, scale: 1.04 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                whileHover={{ scale: 1.02 }}
                style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', aspectRatio: '1 / 1', cursor: 'pointer', border: 'none', padding: 0, display: 'block', width: '100%' }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0)', transition: 'background 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.18)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0)')}
                />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={photos[active].alt}
            style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
          >
            {/* Imagen */}
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.22 }}
              onClick={e => e.stopPropagation()}
              style={{ position: 'relative', maxWidth: 'min(90vw, 900px)', maxHeight: '85vh', width: '100%', borderRadius: '12px', overflow: 'hidden' }}
            >
              <Image
                src={photos[active].src}
                alt={photos[active].alt}
                width={900}
                height={900}
                style={{ width: '100%', height: 'auto', maxHeight: '85vh', objectFit: 'contain', display: 'block' }}
                priority
              />
              {/* Caption */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.7))', padding: '24px 20px 16px' }}>
                <p style={{ margin: 0, fontSize: '13px', color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-sans)' }}>{photos[active].alt}</p>
              </div>
            </motion.div>

            {/* Botón cerrar */}
            <button
              onClick={close}
              aria-label="Cerrar"
              style={{ position: 'fixed', top: '20px', right: '20px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '50%', width: '40px', height: '40px', color: '#fff', fontSize: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}
            >×</button>

            {/* Prev */}
            <button
              onClick={e => { e.stopPropagation(); prev(); }}
              aria-label="Foto anterior"
              style={{ position: 'fixed', left: '16px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '50%', width: '44px', height: '44px', color: '#fff', fontSize: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >‹</button>

            {/* Next */}
            <button
              onClick={e => { e.stopPropagation(); next(); }}
              aria-label="Foto siguiente"
              style={{ position: 'fixed', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '50%', width: '44px', height: '44px', color: '#fff', fontSize: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >›</button>

            {/* Contador */}
            <div style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '6px' }}>
              {photos.map((_, i) => (
                <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: i === active ? '#C17A3B' : 'rgba(255,255,255,0.3)', transition: 'background 0.2s' }} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
