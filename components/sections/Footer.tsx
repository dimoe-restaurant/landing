const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer style={{
      background: '#0D0B09',
      borderTop: '1px solid #2A2520',
      padding: '48px 24px',
    }}>
      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-start', gap: '32px', flexWrap: 'wrap',
      }}>
        {/* Brand */}
        <div>
          <p style={{
            fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 700,
            color: '#F2EDE4', margin: '0 0 4px',
          }}>DiMOE</p>
          <p style={{ fontSize: '13px', color: '#9B8B7E', margin: '0 0 2px' }}>Pizzería Napolitana y Restobar</p>
          <p style={{ fontSize: '12px', color: 'rgba(107,97,88,0.6)', margin: 0 }}>Paine, Chile</p>
        </div>

        {/* Nav */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {['#inicio', '#nosotros', '#menu', '#contacto'].map((href, i) => (
            <a key={href} href={href} style={{
              fontSize: '14px', color: '#9B8B7E', textDecoration: 'none',
              transition: 'color 0.2s',
            }}>
              {['Inicio', 'Nosotros', 'Carta', 'Contacto'][i]}
            </a>
          ))}
        </nav>

        {/* Social + contact */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { href: 'https://instagram.com/dimoe_restobar', text: '@dimoe_restobar' },
            { href: 'https://wa.me/56973694101', text: '+56 9 7369 4101' },
            { href: 'mailto:contacto@dimoe.cl', text: 'contacto@dimoe.cl' },
          ].map(l => (
            <a key={l.text} href={l.href} target="_blank" rel="noopener noreferrer" style={{
              fontSize: '14px', color: '#9B8B7E', textDecoration: 'none',
              transition: 'color 0.2s',
            }}>
              {l.text}
            </a>
          ))}
        </div>
      </div>

      <div style={{
        maxWidth: '1100px', margin: '32px auto 0',
        borderTop: '1px solid #2A2520', paddingTop: '24px',
        textAlign: 'center', fontSize: '12px', color: 'rgba(107,97,88,0.5)',
      }}>
        © {year} DiMOE. Todos los derechos reservados.
      </div>
    </footer>
  );
}
