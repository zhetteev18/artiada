import { navLinks, site } from '../../data/content'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink py-12 text-white/80">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 top-0 h-48 w-48 rounded-full bg-gold/10 blur-3xl"
        aria-hidden
      />

      <div className="relative site-shell">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md">
            <p className="font-display text-2xl font-semibold text-white">{site.title}</p>
            <p className="mt-2 font-display text-lg italic text-gold-light">
              «{site.motto}»
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Подвал">
            {navLinks.slice(0, 5).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-white/60 transition-colors hover:text-gold-light"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-white/45">
            © {year} Мировой и Российский Артийский комитет
          </p>
          <a
            href={`mailto:${site.email}`}
            className="text-xs text-white/55 transition-colors hover:text-gold-light"
          >
            {site.email}
          </a>
        </div>
      </div>
    </footer>
  )
}
