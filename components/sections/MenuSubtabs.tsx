'use client';

import { typography } from '@/lib/typography';

type Props = {
  labels: string[];
  active: string;
  onChange: (label: string) => void;
};

// Sin fade de bordes acá a propósito: en pills cortos ("Gin", "Bar") un
// degradado de 28px tapa buena parte del texto y lo hace ver "apagado" —
// el propio pill cortado a la mitad ya es la señal de que hay más scroll.
export default function MenuSubtabs({ labels, active, onChange }: Props) {
  if (labels.length <= 1) return null;

  return (
    <div className="menu-subtabs" role="tablist" style={{
      position: 'relative',
      display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center',
      gap: '6px', paddingBottom: '20px', paddingLeft: '16px', paddingRight: '16px',
    }}>
      {labels.map(label => {
        const isActive = active === label;
        return (
          <button key={label} role="tab" aria-selected={isActive} onClick={() => onChange(label)}
            style={{
              background: isActive ? 'rgba(193,122,59,0.18)' : 'transparent',
              color: isActive ? '#C17A3B' : 'rgba(242,237,228,0.42)',
              border: `1px solid ${isActive ? 'rgba(193,122,59,0.5)' : 'rgba(242,237,228,0.12)'}`,
              padding: '5px 14px', borderRadius: '100px', ...typography.navSubtab,
              cursor: 'pointer', transition: 'all 0.2s',
              fontFamily: 'var(--font-sans)', flexShrink: 0,
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
