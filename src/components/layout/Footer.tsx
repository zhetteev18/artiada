import { navLinks, site } from '../../data/content'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line bg-surface py-12 text-ink-muted">
      <div className="site-shell">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md">
            <p className="text-lg font-semibold text-ink">{site.title}</p>
            <p className="mt-2 text-sm leading-relaxed">«{site.motto}»</p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Подвал">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-ink-muted transition-colors hover:text-ink"
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

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-line pt-8 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-ink-faint">
            © {year} Мировой и Российский Артийский комитет
          </p>
          <a
            href={`mailto:${site.email}`}
            className="text-xs text-ink-muted transition-colors hover:text-accent"
          >
            {site.email}
          </a>
        </div>
      </div>
    </footer>
  )
}
