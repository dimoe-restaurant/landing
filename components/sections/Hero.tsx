'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6 text-center"
    >
      {/* Subtle texture overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#2A1F14_0%,_transparent_60%)] opacity-60" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center gap-6 max-w-3xl"
      >
        {/* Eyebrow */}
        <span className="text-sm font-medium uppercase tracking-[0.25em] text-accent">
          Paine · Chile · 2° Top Chile 2025
        </span>

        {/* Headline */}
        <h1 className="font-serif text-5xl font-bold leading-tight text-foreground sm:text-6xl md:text-7xl">
          La auténtica pizza{' '}
          <em className="not-italic text-accent">napolitana</em>
          {', '}a minutos de Santiago
        </h1>

        {/* Subline */}
        <p className="max-w-xl text-lg leading-relaxed text-foreground/70">
          Ingredientes frescos, masas de fermentación lenta y cócteles de autor.
          Para reunirte con quien más querés, en un lugar que lo vale.
        </p>

        {/* CTAs */}
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <a
            href="https://wa.me/56973694101?text=Hola!%20Quiero%20hacer%20una%20reserva"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-foreground transition-opacity hover:opacity-90"
          >
            Reservar mesa
          </a>
          <a
            href="#menu"
            className="inline-flex items-center justify-center rounded-full border border-foreground/20 px-8 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Ver la carta
          </a>
        </div>

        {/* Hours teaser */}
        <p className="mt-4 text-xs text-muted">
          Mar–Jue 12:30–22:30 &nbsp;·&nbsp; Vie–Sáb 13:00–00:00 &nbsp;·&nbsp; Dom 13:00–17:30
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-foreground/20 p-1.5">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="h-1.5 w-1 rounded-full bg-accent"
          />
        </div>
      </motion.div>
    </section>
  );
}
