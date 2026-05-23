'use client';

import { motion } from 'framer-motion';

const highlights = [
  {
    icon: '🌿',
    title: 'Ingredientes de primera',
    desc: 'Mozzarella fresca, tomates San Marzano y masa de fermentación lenta. Sin atajos.',
  },
  {
    icon: '🏆',
    title: '2° lugar Top Chile 2025',
    desc: 'Reconocidos por @thetopchile entre los mejores restaurantes del país.',
  },
  {
    icon: '🐶',
    title: 'Pet-friendly',
    desc: 'Tu mascota es bienvenida en nuestra terraza exterior. Más espacio, mejor ambiente.',
  },
  {
    icon: '🥗',
    title: 'Opciones para todos',
    desc: 'Platos vegetarianos y veganos para que nadie se quede sin su favorito.',
  },
];

export default function About() {
  return (
    <section id="nosotros" className="bg-card py-24 px-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-sm font-medium uppercase tracking-[0.25em] text-accent">
            Nuestra historia
          </span>
          <h2 className="mt-3 font-serif text-4xl font-bold text-foreground sm:text-5xl">
            Napolitano de corazón,{' '}
            <br className="hidden sm:block" />
            chileno de alma
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-foreground/65">
            DiMOE nació con una idea simple: traer la pizza de verdad al sur de Santiago.
            Sin shortcuts. Con la masa que merece tiempo, los ingredientes que hacen la
            diferencia y el ambiente donde querés quedarte.
          </p>
        </motion.div>

        {/* Highlights grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-background p-6"
            >
              <span className="text-3xl">{item.icon}</span>
              <h3 className="mt-4 font-serif text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Location callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-border bg-background p-8 text-center sm:flex-row sm:text-left"
        >
          <div className="flex-1">
            <p className="font-serif text-xl font-semibold text-foreground">
              A 35 minutos de Santiago
            </p>
            <p className="mt-1 text-sm text-muted">
              Darío Pavez 16, Champa, Paine · Estacionamiento propio · A 5 min del Metrotren Hospital
            </p>
          </div>
          <a
            href="https://maps.google.com/?q=DiMOE+Paine+Chile"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full border border-accent px-6 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-foreground"
          >
            Cómo llegar →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
