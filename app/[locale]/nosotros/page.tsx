import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import Footer from '@/components/sections/Footer';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  return {
    title: isEn ? 'About Us — DiMOE Pizzería Napolitana | Paine' : 'Nosotros — DiMOE Pizzería Napolitana | Paine',
    description: isEn
      ? 'The story of Marisol and DiMOE: award-winning Neapolitan pizza born in Paine, Chile. 2nd best pizza in the Metropolitan Region, Top Chile 2025.'
      : 'La historia de Marisol y DiMOE: pizzería napolitana premiada nacida en Paine, Chile. 2° mejor pizza de la Región Metropolitana, Top Chile 2025.',
  };
}

const MAPS_LINK = 'https://maps.app.goo.gl/cSgXSzJW9VvLttSS7';
const WA_ES = 'https://wa.me/56973694101?text=Hola!%20Quiero%20hacer%20una%20reserva';
const WA_EN = "https://wa.me/56973694101?text=Hello!%20I'd%20like%20to%20make%20a%20reservation";
const THETOP_LINK = 'https://thetop.cl/post/mejores-pizzas-chile-2025/';
const SOPROLE_LINK = 'https://comunidadsoprolefp.cl/marisol-osorio-presenta-del-campo-a-tu-mesa-maestri-pizzaioli-2023-soprole-food-professionals/';

const milestones = [
  {
    year: '2019',
    es: 'DiMOE abre sus puertas en Paine. Horno de barro, masa fermentada y la idea de que una pizza napolitana de verdad podía nacer en una comuna como Paine.',
    en: 'DiMOE opens in Paine. A clay oven, fermented dough, and the belief that real Neapolitan pizza could be born in a small town like Paine.',
  },
  {
    year: '2023',
    href: SOPROLE_LINK,
    label_es: 'Maestri Pizzaioli · Soprole Food Professionals',
    label_en: 'Maestri Pizzaioli · Soprole Food Professionals',
    es: 'Marisol compitió con su pizza "Del Campo A Tu Mesa" en el concurso nacional Maestri Pizzaioli de Soprole Food Professionals, obteniendo el 3° lugar. La primera vez que la cocina de DiMOE se midió a nivel nacional.',
    en: 'Marisol competed with her pizza "Del Campo A Tu Mesa" at the national Maestri Pizzaioli competition by Soprole Food Professionals, finishing 3rd — the first time DiMOE\'s kitchen measured itself nationally.',
  },
  {
    year: '2024',
    es: 'DiMOE inaugura su primer local propio en Champa, Paine: terraza, patio pet-friendly, estacionamiento gratuito y el mismo horno de leña que empezó todo.',
    en: 'DiMOE opens its first own venue in Champa, Paine: terrace, pet-friendly courtyard, free parking, and the same wood-fired oven that started it all.',
  },
  {
    year: '2025',
    href: THETOP_LINK,
    label_es: '2° mejor pizza · The Top Chile',
    label_en: '2nd best pizza · The Top Chile',
    es: 'The Top Chile reconoció a DiMOE como el 2° mejor restaurante de pizza de la Región Metropolitana, con la Mechada e Cipolla. Un reconocimiento que confirmó lo que los clientes de Paine ya sabían.',
    en: 'The Top Chile recognized DiMOE as the 2nd best pizza restaurant in the Metropolitan Region, featuring the Mechada e Cipolla. An award that confirmed what Paine regulars already knew.',
  },
];

const values = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C17A3B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 2C8 2 4 6 4 10c0 6 8 12 8 12s8-6 8-12c0-4-4-8-8-8z"/><circle cx="12" cy="10" r="2"/></svg>
    ),
    es_title: 'Ingredientes sin atajos',
    en_title: 'No shortcuts on ingredients',
    es: 'Mozzarella fresca, tomates San Marzano y masa fermentada 48 horas. Los mismos ingredientes de Nápoles, acá en Paine.',
    en: 'Fresh mozzarella, San Marzano tomatoes, 48-hour fermented dough. The same ingredients as Naples, right here in Paine.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C17A3B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M17 11a5 5 0 0 0-10 0v2a5 5 0 0 0 10 0v-2z"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>
    ),
    es_title: 'Horno de leña a 450°C',
    en_title: 'Wood-fired at 450°C',
    es: 'El sabor que no se puede replicar en horno eléctrico. La corteza con leopardeo, el fondo crujiente, el borde ahumado.',
    en: 'The flavour you simply cannot replicate in an electric oven. Leopard crust, crispy base, smoky edge.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C17A3B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    ),
    es_title: 'Para todos',
    en_title: 'A table for everyone',
    es: 'Vegetarianos, veganos y omnívoros. El patio es pet-friendly. Porque una buena noche no deja a nadie fuera.',
    en: 'Vegetarians, vegans, meat lovers. The courtyard is pet-friendly. Because a good night out leaves no one behind.',
  },
];

export default async function NosotrosPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isEn = locale === 'en';
  const waUrl = isEn ? WA_EN : WA_ES;

  return (
    <main style={{ background: '#0D0B09', paddingTop: '72px' }}>
      {/* Back link */}
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '24px clamp(16px, 4vw, 24px) 0' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'rgba(242,237,228,0.45)', textDecoration: 'none' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          {isEn ? 'Back to home' : 'Volver al inicio'}
        </Link>
      </div>

      {/* Hero */}
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: 'clamp(48px, 7vw, 80px) clamp(16px, 4vw, 24px) 0' }}>
        <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.35em', color: '#C17A3B', textTransform: 'uppercase', marginBottom: '16px' }}>
          {isEn ? 'Our story' : 'Nuestra historia'}
        </p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 6vw, 60px)', fontWeight: 700, color: '#F2EDE4', lineHeight: 1.1, margin: '0 0 24px' }}>
          {isEn ? <>Neapolitan at heart,<br /><span style={{ color: '#C17A3B' }}>Chilean at soul.</span></> : <>La pizza que Paine<br /><span style={{ color: '#C17A3B' }}>se merecía.</span></>}
        </h1>
        <p style={{ fontSize: 'clamp(15px, 2vw, 17px)', lineHeight: 1.75, color: 'rgba(242,237,228,0.65)', maxWidth: '600px', margin: 0 }}>
          {isEn
            ? 'Marisol went to compete — and came back with awards and one idea fixed in her head: do this right, no shortcuts. DiMOE grew alongside its regulars until it earned its own place in Champa: terrace, courtyard and wood-fired oven. Same flavour. Much more room to share it.'
            : 'Marisol salió a competir — y volvió con premios y con una sola idea en la cabeza: hacer esto bien, sin atajos. DiMOE fue creciendo junto a sus clientes hasta llegar a este local propio en Champa: terraza, patio y horno de leña. Mismo sabor. Mucho más espacio para compartirlo.'}
        </p>
      </div>

      {/* Photo */}
      <div style={{ maxWidth: '860px', margin: '48px auto 0', padding: '0 clamp(16px, 4vw, 24px)' }}>
        <div style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid #2A2520', background: '#181310', aspectRatio: '16/7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/about-marisol.jpg"
            alt={isEn ? 'Marisol, founder of DiMOE, shaping dough' : 'Marisol, fundadora de DiMOE, trabajando la masa'}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 25%', display: 'block' }}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          />
        </div>
        <p style={{ textAlign: 'center', fontSize: '12px', color: 'rgba(155,139,126,0.5)', marginTop: '10px', fontStyle: 'italic' }}>
          {isEn ? 'Marisol — founder, head chef, and the heart of DiMOE.' : 'Marisol — fundadora, chef y el alma de DiMOE.'}
        </p>
      </div>

      {/* Values */}
      <div style={{ maxWidth: '860px', margin: '72px auto 0', padding: '0 clamp(16px, 4vw, 24px)' }}>
        <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.25em', color: 'rgba(155,139,126,0.6)', textTransform: 'uppercase', marginBottom: '24px' }}>
          {isEn ? 'What we stand for' : 'Lo que nos define'}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: '16px' }}>
          {values.map((v) => (
            <div key={v.es_title} style={{ background: '#181310', border: '1px solid #2A2520', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(193,122,59,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {v.icon}
              </div>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', fontWeight: 700, color: '#F2EDE4', margin: 0 }}>
                {isEn ? v.en_title : v.es_title}
              </p>
              <p style={{ fontSize: '13px', lineHeight: 1.65, color: 'rgba(242,237,228,0.55)', margin: 0 }}>
                {isEn ? v.en : v.es}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div style={{ maxWidth: '860px', margin: '72px auto 0', padding: '0 clamp(16px, 4vw, 24px)' }}>
        <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.25em', color: 'rgba(155,139,126,0.6)', textTransform: 'uppercase', marginBottom: '32px' }}>
          {isEn ? 'The DiMOE story' : 'La historia DiMOE'}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {milestones.map((m, i) => (
            <div key={m.year} style={{ display: 'flex', gap: '24px', paddingBottom: i < milestones.length - 1 ? '32px' : 0 }}>
              {/* Year + line */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: '52px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#C17A3B', flexShrink: 0, marginTop: '4px' }} />
                {i < milestones.length - 1 && <div style={{ width: '1px', background: 'linear-gradient(to bottom, #C17A3B, #2A2520)', flex: 1, marginTop: '8px' }} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 700, color: '#F2EDE4', lineHeight: 1 }}>{m.year}</span>
                  {m.href && (
                    <a href={m.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', fontWeight: 600, color: '#C17A3B', border: '1px solid rgba(193,122,59,0.35)', borderRadius: '100px', padding: '3px 10px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                      {isEn ? m.label_en : m.label_es}
                    </a>
                  )}
                </div>
                <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(242,237,228,0.6)', margin: 0 }}>
                  {isEn ? m.en : m.es}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ maxWidth: '860px', margin: '72px auto 0', padding: '0 clamp(16px, 4vw, 24px)' }}>
        <div style={{ background: '#181310', border: '1px solid #2A2520', borderRadius: '20px', padding: 'clamp(32px, 5vw, 56px)', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 700, color: '#F2EDE4', margin: '0 0 12px', lineHeight: 1.2 }}>
            {isEn ? 'Come see it for yourself.' : 'Ven a conocernos.'}
          </p>
          <p style={{ fontSize: '14px', color: 'rgba(242,237,228,0.5)', margin: '0 0 28px', lineHeight: 1.6 }}>
            {isEn
              ? 'Darío Pavez 16, Champa, Paine — 35 min from Santiago. Terrace, courtyard, free parking and pet-friendly.'
              : 'Darío Pavez 16, Champa, Paine — a 35 minutos de Santiago. Terraza, patio, estacionamiento gratuito y pet-friendly.'}
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={waUrl} target="_blank" rel="noopener noreferrer"
              style={{ background: '#C17A3B', color: '#F2EDE4', fontSize: '14px', fontWeight: 600, padding: '13px 28px', borderRadius: '100px', textDecoration: 'none' }}
            >
              {isEn ? 'Book a table' : 'Reservar mesa'}
            </a>
            <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer"
              style={{ background: 'transparent', color: '#F2EDE4', fontSize: '14px', fontWeight: 500, padding: '13px 28px', borderRadius: '100px', textDecoration: 'none', border: '1px solid #2A2520' }}
            >
              {isEn ? 'Get directions' : 'Cómo llegar'}
            </a>
          </div>
        </div>
      </div>

      <div style={{ height: 'clamp(64px, 8vw, 96px)' }} />
      <Footer />
    </main>
  );
}
