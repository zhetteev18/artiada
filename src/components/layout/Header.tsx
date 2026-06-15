import { useEffect, useState } from 'react'
import { navLinks, site } from '../../data/content'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import { Button } from '../ui/Button'

type HeaderProps = {
  onParticipateClick: () => void
}

const spyIds = ['#hero', ...navLinks.map((l) => l.href)]

export function Header({ onParticipateClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const activeSection = useScrollSpy(spyIds)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const handleNav = (href: string) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  const onHero = !scrolled

  return (
    <header
      className={`fixed inset-x-0 top-0.5 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-ink/5 bg-white/85 py-2 shadow-sm backdrop-blur-xl'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="site-shell flex items-center justify-between gap-4">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault()
            handleNav('#hero')
          }}
          className="group flex min-w-0 items-center gap-3"
        >
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-display text-lg font-bold transition-colors ${
              onHero
                ? 'bg-white/15 text-gold-light'
                : 'bg-gradient-to-br from-gold/20 to-gold/5 text-gold-dark'
            }`}
          >
            А
          </span>
          <span className="min-w-0 flex flex-col">
            <span
              className={`truncate text-sm font-bold sm:text-base ${
                onHero ? 'text-white' : 'text-ink'
              }`}
            >
              Артийский комитет
            </span>
            <span
              className={`hidden truncate text-xs sm:block ${
                onHero ? 'text-white/65' : 'text-ink-muted'
              }`}
            >
              {site.motto}
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Основная навигация">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNav(link.href)
                }}
                className={`relative rounded-lg px-2.5 py-2 text-[13px] font-medium transition-all duration-300 xl:px-3 xl:text-sm ${
                  onHero
                    ? isActive
                      ? 'link-nav-active-hero text-white'
                      : 'text-white/75 hover:bg-white/10 hover:text-white'
                    : isActive
                      ? 'link-nav-active text-ink'
                      : 'text-ink-muted hover:bg-ink/5 hover:text-ink'
                }`}
              >
                {link.label}
                {isActive && (
                  <span
                    className={`absolute bottom-0.5 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full ${
                      onHero ? 'bg-gold-light' : 'bg-gold'
                    }`}
                  />
                )}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant={onHero ? 'gold' : 'primary'}
            className="hidden sm:inline-flex"
            onClick={onParticipateClick}
          >
            Принять участие
          </Button>

          <button
            type="button"
            className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-all xl:hidden ${
              onHero
                ? 'border-white/25 bg-white/10 text-white'
                : 'border-ink/10 bg-white text-ink shadow-sm'
            }`}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 xl:hidden ${
          menuOpen ? 'max-h-[480px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav
          className="mx-4 mb-4 flex flex-col gap-1 rounded-2xl border border-ink/5 bg-white/95 p-3 shadow-card-hover backdrop-blur-xl"
          aria-label="Мобильная навигация"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`min-h-11 rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                activeSection === link.href
                  ? 'bg-gold/10 text-ink'
                  : 'text-ink-muted hover:bg-ink/5'
              }`}
              onClick={(e) => {
                e.preventDefault()
                handleNav(link.href)
              }}
            >
              {link.label}
            </a>
          ))}
          <Button variant="gold" className="mt-2 w-full" onClick={onParticipateClick}>
            Принять участие
          </Button>
        </nav>
      </div>
    </header>
  )
}
