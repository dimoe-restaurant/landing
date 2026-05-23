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
    <section id="contacto" className="bg-card py-24 px-6">
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
            Visitanos
          </span>
          <h2 className="mt-3 font-serif text-4xl font-bold text-foreground sm:text-5xl">
            Te esperamos
          </h2>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-3">
          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-border bg-background p-6"
          >
            <h3 className="font-serif text-lg font-semibold text-foreground">Horarios</h3>
            <ul className="mt-4 space-y-3">
              {hours.map((h) => (
                <li key={h.days} className="flex justify-between text-sm">
                  <span className="text-muted">{h.days}</span>
                  <span className={h.time === 'Cerrado' ? 'text-muted/50' : 'text-foreground font-medium'}>
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
            className="rounded-2xl border border-border bg-background p-6"
          >
            <h3 className="font-serif text-lg font-semibold text-foreground">Ubicación</h3>
            <div className="mt-4 space-y-2 text-sm text-muted">
              <p>Darío Pavez 16, Champa</p>
              <p>Paine, Región Metropolitana</p>
              <p className="mt-3 text-foreground/60">
                🚗 Estacionamiento propio<br />
                🚉 5 min desde Metrotren Hospital
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=DiMOE+Paine+Chile"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
            >
              Abrir en Maps →
            </a>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl border border-border bg-background p-6"
          >
            <h3 className="font-serif text-lg font-semibold text-foreground">Contacto</h3>
            <div className="mt-4 space-y-4">
              <a
                href="https://wa.me/56973694101?text=Hola!%20Quiero%20hacer%20una%20reserva"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-muted hover:text-foreground transition-colors"
              >
                <span className="text-xl">📱</span>
                <span>+56 9 7369 4101</span>
              </a>
              <a
                href="mailto:contacto@dimoe.cl"
                className="flex items-center gap-3 text-sm text-muted hover:text-foreground transition-colors"
              >
                <span className="text-xl">✉️</span>
                <span>contacto@dimoe.cl</span>
              </a>
              <a
                href="https://instagram.com/dimoe_restobar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-muted hover:text-foreground transition-colors"
              >
                <span className="text-xl">📸</span>
                <span>@dimoe_restobar</span>
              </a>
            </div>

            {/* Reserve CTA */}
            <a
              href="https://wa.me/56973694101?text=Hola!%20Quiero%20hacer%20una%20reserva"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex w-full items-center justify-center rounded-full bg-accent py-3 text-sm font-semibold text-foreground transition-opacity hover:opacity-90"
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
          className="mt-8 rounded-2xl border border-border bg-background p-6 text-center"
        >
          <p className="font-serif text-lg font-semibold text-foreground">
            ¿Cumpleaños, matrimonio o evento empresarial?
          </p>
          <p className="mt-1.5 text-sm text-muted">
            Tenemos espacio y experiencia para hacer que tu evento sea especial.
          </p>
          <a
            href="mailto:contacto@dimoe.cl?subject=Consulta%20evento"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
          >
            Consultar disponibilidad →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
