import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Menu from '@/components/sections/Menu';
import CartaFooter from '@/components/sections/CartaFooter';
import { getMenu, getMenuPreview } from '@/lib/menu';
import { FALLBACK_MENU } from '@/lib/menu-fallback';

export const maxDuration = 30;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  return {
    title: isEn ? 'Menu — DiMOE Pizzería Napolitana | Paine' : 'Carta — DiMOE Pizzería Napolitana | Paine',
    description: isEn
      ? 'Full menu: Neapolitan pizzas, artisan pasta, craft cocktails, desserts and bar. Prices in CLP.'
      : 'Carta completa: pizzas napolitanas, pastas artesanales, cócteles de autor, postres y bar. Precios en CLP.',
  };
}

export default async function CartaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isEn = locale === 'en';
  const { isEnabled: isPreview } = await draftMode();
  const notionData = isPreview ? await getMenuPreview(locale) : await getMenu(locale);
  const menuData = notionData
    ? { ...notionData, VINOS: FALLBACK_MENU.VINOS, SEMANAL: FALLBACK_MENU.SEMANAL }
    : FALLBACK_MENU;

  const publishedData = isPreview ? await getMenu(locale) : null;
  const hasUnpublishedChanges = isPreview && JSON.stringify(notionData) !== JSON.stringify(publishedData);

  return (
    <main style={{ background: '#0D0B09' }}>
      {hasUnpublishedChanges && (
        <div style={{ background: '#B45309', color: '#FFF7ED', textAlign: 'center', padding: '10px 16px', fontSize: '14px', fontWeight: 600 }}>
          ⚠️ {isEn ? 'There are unpublished changes' : 'Hay cambios sin publicar'}
        </div>
      )}
      {/* Back link */}
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '24px clamp(16px, 4vw, 24px) 0' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'rgba(242,237,228,0.45)', textDecoration: 'none', transition: 'color 0.2s' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'block', flexShrink: 0 }}><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          <span style={{ display: 'inline-block', lineHeight: '14px' }}>{isEn ? 'Back to home' : 'Volver al inicio'}</span>
        </Link>
      </div>

      <Menu menu={menuData} />
      <CartaFooter />
    </main>
  );
}
