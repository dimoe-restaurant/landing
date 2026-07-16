import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import Footer from '@/components/sections/Footer';
import AtencionClienteGate from '@/components/sections/AtencionClienteGate';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  return {
    title: isEn ? 'Customer Care — DiMOE Pizzería Napolitana | Paine' : 'Atención al Cliente — DiMOE Pizzería Napolitana | Paine',
    description: isEn
      ? 'Tell us about your visit to DiMOE — questions, suggestions or complaints reviewed personally by our team.'
      : 'Cuéntanos cómo fue tu visita a DiMOE — dudas, sugerencias o reclamos revisados personalmente por nuestro equipo.',
  };
}

export default async function AtencionClientePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isEn = locale === 'en';

  return (
    <main style={{ background: '#0D0B09', paddingTop: '72px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px clamp(16px, 4vw, 24px) 0' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'rgba(242,237,228,0.45)', textDecoration: 'none' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          {isEn ? 'Back to home' : 'Volver al inicio'}
        </Link>
      </div>

      <AtencionClienteGate />

      <div style={{ height: 'clamp(64px, 8vw, 96px)' }} />
      <Footer />
    </main>
  );
}
