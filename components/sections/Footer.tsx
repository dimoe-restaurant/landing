export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
          {/* Brand */}
          <div>
            <p className="font-serif text-2xl font-bold text-foreground">DiMOE</p>
            <p className="mt-1 text-sm text-muted">Pizzería Napolitana y Restobar</p>
            <p className="mt-0.5 text-xs text-muted/60">Paine, Chile</p>
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-2 text-sm text-muted sm:items-end">
            <a href="#inicio" className="hover:text-foreground transition-colors">Inicio</a>
            <a href="#nosotros" className="hover:text-foreground transition-colors">Nosotros</a>
            <a href="#menu" className="hover:text-foreground transition-colors">Carta</a>
            <a href="#contacto" className="hover:text-foreground transition-colors">Contacto</a>
          </nav>

          {/* Social + contact */}
          <div className="flex flex-col gap-2 text-sm text-muted sm:items-end">
            <a
              href="https://instagram.com/dimoe_restobar"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Instagram @dimoe_restobar
            </a>
            <a
              href="https://wa.me/56973694101"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              +56 9 7369 4101
            </a>
            <a
              href="mailto:contacto@dimoe.cl"
              className="hover:text-foreground transition-colors"
            >
              contacto@dimoe.cl
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted/50">
          © {year} DiMOE. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
