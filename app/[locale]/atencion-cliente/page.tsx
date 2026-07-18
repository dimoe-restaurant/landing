import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Footer from '@/components/sections/Footer';
import ContactForm from '@/components/sections/ContactForm';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  return {
    title: isEn ? 'Customer Care — DiMOE Pizzería Napolitana | Paine' : 'Atención al Cliente — DiMOE Pizzería Napolitana | Paine',
    description: isEn
      ? 'Tell us about your visit to DiMOE — questions, suggestions or complaints reviewed personally by our team.'
      : 'Cuéntanos cómo fue tu visita a DiMOE — dudas, sugerencias o reclamos revisados personalmente por nuestro equipo.',
    alternates: {
      canonical: isEn ? 'https://dimoe.cl/en/atencion-cliente' : 'https://dimoe.cl/atencion-cliente',
    },
  };
}

export default async function AtencionClientePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isEn = locale === 'en';
  const t = await getTranslations('atencionCliente');

  return (
    <main style={{ background: '#0D0B09', paddingTop: '72px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px clamp(16px, 4vw, 24px) 0' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'rgba(242,237,228,0.45)', textDecoration: 'none' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          {isEn ? 'Back to home' : 'Volver al inicio'}
        </Link>
      </div>

      <div style={{ maxWidth: '620px', margin: '0 auto', padding: 'clamp(40px, 6vw, 72px) clamp(16px, 4vw, 24px) 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.35em', color: '#C17A3B', textTransform: 'uppercase', marginBottom: '16px' }}>
            {t('label')}
          </p>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(30px, 5vw, 44px)', fontWeight: 700, lineHeight: 1.2, color: '#F2EDE4', margin: '0 0 16px' }}>
            {t('headline')}
          </h1>
          <p style={{ fontSize: '15px', color: '#9B8B7E', lineHeight: 1.7, margin: 0 }}>
            {t('subheadline')}
          </p>
        </div>

        <ContactForm origen="Atención Cliente" showTipoSelector />
      </div>

      <div style={{ height: 'clamp(64px, 8vw, 96px)' }} />
      <Footer />
    </main>
  );
}
