'use client';

import { motion } from 'framer-motion';

const categories = [
  {
    name: 'Pizzas',
    desc: 'Masa de fermentación lenta, horno de piedra. Napolitanas y al molde.',
    emoji: '🍕',
  },
  {
    name: 'Pastas',
    desc: 'Recetas artesanales con salsas preparadas al momento.',
    emoji: '🍝',
  },
  {
    name: 'Cócteles',
    desc: 'De autor y clásicos italianos. El Negroni que esperabas.',
    emoji: '🍹',
  },
  {
    name: 'Más',
    desc: 'Entradas, ensaladas, postres y opciones vegetarianas y veganas.',
    emoji: '🥗',
  },
];

export default function Menu() {
  return (
    <section id="menu" className="bg-background py-24 px-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col items-center gap-4 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left"
        >
          <div>
            <span className="text-sm font-medium uppercase tracking-[0.25em] text-accent">
              La carta
            </span>
            <h2 className="mt-3 font-serif text-4xl font-bold text-foreground sm:text-5xl">
              Para todos los gustos
            </h2>
          </div>
          <a
            href="https://dimoe.cl"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-foreground transition-opacity hover:opacity-90"
          >
            Ver carta completa →
          </a>
        </motion.div>

        {/* Category cards */}
        <div className="grid gap-6 sm:grid-cols-2">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex gap-5 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent/40"
            >
              <span className="text-4xl">{cat.emoji}</span>
              <div>
                <h3 className="font-serif text-xl font-semibold text-foreground">
                  {cat.name}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{cat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Online order CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 rounded-2xl border border-accent/30 bg-card p-6 text-center"
        >
          <p className="text-sm text-muted">
            ¿No podés venir hoy?
          </p>
          <p className="mt-1 font-serif text-lg font-semibold text-foreground">
            Pedí online y retirá en local
          </p>
          <a
            href="https://dimoe.cl"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
          >
            Pedir ahora →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
