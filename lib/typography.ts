import type { CSSProperties } from 'react';

export type TextStyle = Pick<
  CSSProperties,
  'fontFamily' | 'fontSize' | 'fontWeight' | 'lineHeight' | 'letterSpacing' | 'textTransform' | 'fontStyle'
>;

const serif = 'var(--font-serif)';

export const typography = {
  // Display — serif
  displayLg: { fontFamily: serif, fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, lineHeight: 1.15 },
  displayMd: { fontFamily: serif, fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '0.04em', textTransform: 'uppercase' },

  // Títulos — serif
  titleMd: { fontFamily: serif, fontSize: '17px', fontWeight: 700, lineHeight: 1.3 }, // banners HH/Semanal, card selector home
  titleSm: { fontFamily: serif, fontSize: '15px', fontWeight: 700, lineHeight: 1.3, letterSpacing: '0.05em', textTransform: 'uppercase' }, // nombre de grupo
  itemName: { fontFamily: serif, fontSize: '15px', fontWeight: 700, lineHeight: 1.3 },
  itemNameCompact: { fontFamily: serif, fontSize: '13px', fontWeight: 700, lineHeight: 1.3 },

  // Cuerpo — sans
  body: { fontSize: '14px', fontWeight: 400, lineHeight: 1.65 }, // descripción regular
  bodySm: { fontSize: '13px', fontWeight: 400, lineHeight: 1.5 }, // footer de precios, back link
  price: { fontSize: '14px', fontWeight: 600, lineHeight: 1.3 },
  priceCompact: { fontSize: '13px', fontWeight: 600, lineHeight: 1.3 },

  // Meta — sans, 11px
  caption: { fontSize: '11px', fontWeight: 500, letterSpacing: '0.06em' }, // subtítulos de banner (grupo usa override fontWeight:400 para paridad exacta)
  note: { fontSize: '14px', fontWeight: 400, lineHeight: 1.65, fontStyle: 'italic' }, // nota de item — igualada a `body` (fix #223)
  eyebrow: { fontSize: '11px', fontWeight: 500, letterSpacing: '0.35em', textTransform: 'uppercase' },
  overline: { fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase' }, // nota premio

  // Navegación — sans, pills
  navTab: { fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em' },
  navSubtab: { fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' },
  badge: { fontSize: '10px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' },

  // Footer /carta
  linkSm: { fontSize: '12px', fontWeight: 400 },
} as const satisfies Record<string, TextStyle>;

export type TypographyRole = keyof typeof typography;
