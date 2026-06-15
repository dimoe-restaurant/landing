'use client';

import { motion } from 'framer-motion';
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
  return (
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
            Ambiente · Cocina · Barra
          </p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#F2EDE4', margin: 0, lineHeight: 1.15 }}>
            Vivilo en persona
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3" style={{ gap: '8px' }}>
          {photos.map((photo, i) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, scale: 1.04 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', aspectRatio: '1 / 1' }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
