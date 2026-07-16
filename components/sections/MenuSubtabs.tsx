'use client';

import { useRef } from 'react';
import { useScrollFade } from './use-scroll-fade';
import ScrollFadeEdges from './ScrollFadeEdges';

type Props = {
  labels: string[];
  active: string;
  onChange: (label: string) => void;
  bg: string;
};

export default function MenuSubtabs({ labels, active, onChange, bg }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const fade = useScrollFade(ref);

  if (labels.length <= 1) return null;

  return (
    <div ref={ref} className="menu-subtabs" role="tablist" onScroll={fade.onScroll} style={{
      position: 'relative',
      display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center',
      gap: '6px', paddingBottom: '20px', paddingLeft: '16px', paddingRight: '16px',
    }}>
      <ScrollFadeEdges bg={bg} showLeft={fade.showLeft} showRight={fade.showRight} />
      {labels.map(label => {
        const isActive = active === label;
        return (
          <button key={label} role="tab" aria-selected={isActive} onClick={() => onChange(label)}
            style={{
              background: isActive ? 'rgba(193,122,59,0.18)' : 'transparent',
              color: isActive ? '#C17A3B' : 'rgba(242,237,228,0.42)',
              border: `1px solid ${isActive ? 'rgba(193,122,59,0.5)' : 'rgba(242,237,228,0.12)'}`,
              padding: '5px 14px', borderRadius: '100px', fontSize: '10px', fontWeight: 600,
              letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.2s',
              fontFamily: 'var(--font-sans)', flexShrink: 0, textTransform: 'uppercase',
            }}
            onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = 'rgba(193,122,59,0.4)'; e.currentTarget.style.color = 'rgba(242,237,228,0.7)'; } }}
            onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor = 'rgba(242,237,228,0.12)'; e.currentTarget.style.color = 'rgba(242,237,228,0.42)'; } }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
