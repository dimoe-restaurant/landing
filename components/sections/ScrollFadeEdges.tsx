'use client';

type Props = { bg: string; showLeft: boolean; showRight: boolean };

// Degradado sutil en los bordes de un contenedor con scroll horizontal —
// avisa que hay más contenido sin scrollbar visible ni flechas.
export default function ScrollFadeEdges({ bg, showLeft, showRight }: Props) {
  return (
    <>
      <div aria-hidden style={{
        position: 'absolute', top: 0, bottom: 0, left: 0, width: '28px',
        background: `linear-gradient(to right, ${bg}, transparent)`,
        opacity: showLeft ? 1 : 0, transition: 'opacity 0.2s ease', pointerEvents: 'none',
      }} />
      <div aria-hidden style={{
        position: 'absolute', top: 0, bottom: 0, right: 0, width: '28px',
        background: `linear-gradient(to left, ${bg}, transparent)`,
        opacity: showRight ? 1 : 0, transition: 'opacity 0.2s ease', pointerEvents: 'none',
      }} />
    </>
  );
}
