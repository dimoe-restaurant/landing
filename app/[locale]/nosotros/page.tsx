import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import Footer from '@/components/sections/Footer';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  return {
    title: isEn ? 'About Us — DiMOE Pizzería Napolitana | Paine' : 'Nosotros — DiMOE Pizzería Napolitana | Paine',
    description: isEn
      ? 'The story behind DiMOE: a Neapolitan pizzeria born in Paine, Chile, recognized as the 2nd best pizza in the Metropolitan Region by The Top Chile 2025.'
      : 'La historia de DiMOE: una pizzería napolitana nacida en Paine, Chile, reconocida como la 2° mejor pizza de la Región Metropolitana por The Top Chile 2025.',
  };
}

const MAPS_LINK = 'https://maps.app.goo.gl/cSgXSzJW9VvLttSS7';
const WA_ES = 'https://wa.me/56973694101?text=Hola!%20Quiero%20hacer%20una%20reserva';
const WA_EN = "https://wa.me/56973694101?text=Hello!%20I'd%20like%20to%20make%20a%20reservation";
const THETOP_LINK = 'https://thetop.cl/post/mejores-pizzas-chile-2025/';
const SOPROLE_LINK = 'https://comunidadsoprolefp.cl/marisol-osorio-presenta-del-campo-a-tu-mesa-maestri-pizzaioli-2023-soprole-food-professionals/';

const milestones = [
  {
    year: '2020',
    es: 'Durante la pandemia, Marisol comienza a hacer pizza napolitana en casa para sus vecinos de Paine. Nace Moe Pizzas — solo para llevar, con lista de espera y mucho cariño.',
    en: 'During the pandemic, Marisol starts making Neapolitan pizza at home for her Paine neighbours. Moe Pizzas is born — takeout only, with a waiting list and a lot of love.',
  },
  {
    year: '2023',
    href: SOPROLE_LINK,
    label_es: 'Maestri Pizzaioli · Soprole Food Professionals',
    label_en: 'Maestri Pizzaioli · Soprole Food Professionals',
    es: 'Con la pizza "Del Campo A Tu Mesa" participa en el concurso nacional Maestri Pizzaioli de Soprole Food Professionals y obtiene el 3° lugar. Una validación que confirma lo que los vecinos de Paine ya sabían.',
    en: 'With the pizza "Del Campo A Tu Mesa", DiMOE enters the national Maestri Pizzaioli competition by Soprole Food Professionals and finishes 3rd — validating what the people of Paine already knew.',
  },
  {
    year: '2024',
    es: 'En abril, DiMOE abre su primer local propio en Champa, Paine. Terraza, patio pet-friendly, estacionamiento gratuito y el mismo horno de leña que empezó todo. Un lugar para quedarse.',
    en: 'In April, DiMOE opens its first own venue in Champa, Paine. Terrace, pet-friendly courtyard, free parking, and the same wood-fired oven that started everything. A place to stay awhile.',
  },
  {
    year: '2025',
    href: THETOP_LINK,
    label_es: '2° mejor pizza · The Top Chile',
    label_en: '2nd best pizza · The Top Chile',
    es: 'The Top Chile reconoce a DiMOE como el 2° mejor restaurante de pizza de la Región Metropolitana con la Mechada e Cipolla — demostrando que la mejor pizza no necesariamente está en Santiago.',
    en: 'The Top Chile recognizes DiMOE as the 2nd best pizza restaurant in the Metropolitan Region — proving that the best pizza doesn\'t have to be in Santiago.',
  },
  {
    year: '2026',
    es: 'DiMOE se muda a un local más grande en Champa. Más espacio para recibir más gente, una propuesta gastronómica ampliada en la mesa y el bar, y el mismo espíritu de siempre: hacer las cosas bien, con cariño.',
    en: 'DiMOE moves to a larger space in Champa — more room to welcome more guests, an expanded food and bar menu, and the same spirit as always: doing things right, with care.',
  },
];

const ChefIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C17A3B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M8 21h8M9.5 21v-5M14.5 21v-5M8 16c-2.2 0-4-1.6-4-3.6 0-1.9 1.5-3.4 3.4-3.6C7.7 7.1 9.7 5 12 5s4.3 2.1 4.6 3.8c1.9.2 3.4 1.7 3.4 3.6 0 2-1.8 3.6-4 3.6H8z" />
  </svg>
);

const WaiterIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C17A3B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4 7l7 4-7 4V7z" />
    <path d="M20 7l-7 4 7 4V7z" />
    <rect x="10.4" y="9.6" width="3.2" height="3.8" rx="0.6" />
  </svg>
);

const BarmanIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C17A3B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4 4h16l-8 9v7M8 20h8" />
    <path d="M6.5 6.5h11" />
  </svg>
);

const team = [
  { name: 'Alondra', icon: ChefIcon },
  { name: 'Bastián', icon: WaiterIcon },
  { name: 'Nicolás', icon: ChefIcon },
  { name: 'Paz', icon: WaiterIcon },
  { name: 'Osvaldo', icon: BarmanIcon },
  { name: 'Sandra', icon: ChefIcon },
  { name: 'Rodrigo', icon: ChefIcon },
  { name: 'Mishell', icon: ChefIcon },
  { name: 'Elías', icon: ChefIcon },
  { name: 'Danitza', icon: ChefIcon },
  { name: 'Diego', icon: ChefIcon },
  { name: 'Catalina', icon: ChefIcon },
  { name: 'Benjamín', icon: ChefIcon },
];

const values = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C17A3B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    es_title: 'Un lugar para volver',
    en_title: 'A place to return to',
    es: 'Cada visita se siente como llegar a casa. Atención personalizada, ambiente cálido y el detalle de siempre — con o sin reserva.',
    en: 'Every visit feels like coming home. Personalized attention, warm atmosphere and the same care every time — with or without a reservation.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C17A3B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
    es_title: 'Ingredientes sin atajos',
    en_title: 'Ingredients without shortcuts',
    es: 'Mozzarella fresca, tomates San Marzano, masa fermentada 48 horas. Los mismos ingredientes de Nápoles, acá en Paine.',
    en: 'Fresh mozzarella, San Marzano tomatoes, 48-hour fermented dough. The same ingredients as Naples, right here in Paine.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C17A3B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    es_title: 'Parte de Paine',
    en_title: 'Part of the community',
    es: 'Talleres, música en vivo, actividades familiares. DiMOE es más que una pizzería — es un punto de encuentro para la gente de Paine.',
    en: 'Workshops, live music, family events. DiMOE is more than a restaurant — it\'s a meeting point for the people of Paine.',
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
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 6vw, 60px)', fontWeight: 700, color: '#F2EDE4', lineHeight: 1.1, margin: '0 0 28px' }}>
          {isEn
            ? <><span style={{ color: '#C17A3B' }}>More than a pizzeria.</span><br />A place to belong.</>
            : <><span style={{ color: '#C17A3B' }}>Más que una pizzería.</span><br />Un lugar para quedarse.</>}
        </h1>
        <p style={{ fontSize: 'clamp(15px, 2vw, 17px)', lineHeight: 1.8, color: 'rgba(242,237,228,0.65)', maxWidth: '620px', margin: '0 0 20px' }}>
          {isEn
            ? 'DiMOE was born during the pandemic from a simple conviction: Paine deserved a place where quality and warmth go hand in hand. What started as a takeout-only operation has grown into a full restaurant — terrace, courtyard, wood-fired oven — where each visit feels like coming home.'
            : 'DiMOE nació durante la pandemia con una convicción simple: Paine merecía un lugar donde la calidad y la calidez fueran de la mano. Lo que empezó solo para llevar creció hasta convertirse en un restaurante propio — con terraza, patio y horno de leña — donde cada visita se siente como volver a casa.'}
        </p>
        <p style={{ fontSize: 'clamp(14px, 1.8vw, 16px)', lineHeight: 1.8, color: 'rgba(242,237,228,0.5)', maxWidth: '620px', margin: 0 }}>
          {isEn
            ? 'The team believes that memorable dining experiences, attentive service and great cocktails don\'t belong only to Santiago. They belong in Paine too.'
            : 'La convicción es que las experiencias gastronómicas memorables, la atención personalizada y los buenos cócteles no son solo para Santiago. También son para Paine.'}
        </p>
      </div>

      {/* Photo */}
      <div style={{ maxWidth: '860px', margin: '56px auto 0', padding: '0 clamp(16px, 4vw, 24px)' }}>
        <div style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid #2A2520', background: '#181310', aspectRatio: '16/7', position: 'relative' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/landing-actual-3.jpg"
            alt={isEn ? 'Marisol, founder of DiMOE, shaping dough' : 'Marisol, fundadora de DiMOE, trabajando la masa'}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', display: 'block' }}
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

      {/* Equipo */}
      <div style={{ maxWidth: '860px', margin: '72px auto 0', padding: '0 clamp(16px, 4vw, 24px)' }}>
        <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.25em', color: 'rgba(155,139,126,0.6)', textTransform: 'uppercase', marginBottom: '24px' }}>
          {isEn ? 'Team' : 'Equipo'}
        </p>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(24px, 3.5vw, 34px)', fontWeight: 700, color: '#F2EDE4', lineHeight: 1.2, margin: '0 0 16px' }}>
          {isEn
            ? 'The team behind DiMOE that makes it possible'
            : 'El equipo detrás de DiMOE que hace esto posible'}
        </h2>
        <p style={{ fontSize: 'clamp(14px, 1.8vw, 16px)', lineHeight: 1.8, color: 'rgba(242,237,228,0.6)', maxWidth: '620px', margin: '0 0 32px' }}>
          {isEn
            ? "None of this would be possible without the incredible team that brings DiMOE to life every single day, so they can give our guests the best of themselves."
            : 'Nada de esto sería posible sin el tremendo equipo que hace andar DiMOE día a día, para darles a ustedes lo mejor de sí mismos.'}
        </p>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <div style={{ maxWidth: '360px', margin: '0 auto 24px', borderRadius: '20px', overflow: 'hidden', border: '1px solid #2A2520', background: '#181310', aspectRatio: '3/4', position: 'relative' }}>
          <img
            src="/images/equipo-dimoe.jpg"
            alt={isEn ? 'The DiMOE team, recognized by The Top Chile as the 2nd best pizza in the Metropolitan Region' : 'El equipo DiMOE, reconocido por The Top Chile como la 2° mejor pizza de la Región Metropolitana'}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
          />
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {team.map((member) => (
            <span
              key={member.name}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#181310',
                border: '1px solid #2A2520',
                borderRadius: '100px',
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: 500,
                color: 'rgba(242,237,228,0.85)',
              }}
            >
              <span style={{ display: 'inline-flex' }}>{member.icon}</span>
              {member.name}
            </span>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div style={{ maxWidth: '860px', margin: '72px auto 0', padding: '0 clamp(16px, 4vw, 24px)' }}>
        <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.25em', color: 'rgba(155,139,126,0.6)', textTransform: 'uppercase', marginBottom: '32px' }}>
          {isEn ? 'The DiMOE story' : 'La historia DiMOE'}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {milestones.map((m, i) => (
            <div key={m.year} style={{ display: 'flex', gap: '24px', paddingBottom: i < milestones.length - 1 ? '32px' : 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: '52px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#C17A3B', flexShrink: 0, marginTop: '5px' }} />
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
            {isEn ? 'Come and see for yourself.' : 'Ven a conocernos.'}
          </p>
          <p style={{ fontSize: '14px', color: 'rgba(242,237,228,0.5)', margin: '0 0 28px', lineHeight: 1.6 }}>
            {isEn
              ? 'Darío Pavez 16, Champa, Paine — 35 min from Santiago. Terrace, courtyard, free parking, pet-friendly.'
              : 'Darío Pavez 16, Champa, Paine — a 35 minutos de Santiago. Terraza, patio, estacionamiento gratuito, pet-friendly.'}
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
