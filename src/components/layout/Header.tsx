import { useEffect, useMemo, useRef, useState } from 'react'
import { navLinks, scrollSpySections, sectionNavMap, site, socials } from '../../data/content'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import { Button } from '../ui/Button'

type HeaderProps = {
  onParticipateClick: () => void
}

export function Header({ onParticipateClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const headerRef = useRef<HTMLElement>(null)
  const activeSectionId = useScrollSpy(scrollSpySections)

  const activeNav = useMemo(() => {
    const id = activeSectionId.replace('#', '')
    return sectionNavMap[id] ?? ''
  }, [activeSectionId])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const onPointerDown = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [])

  const handleNav = (href: string) => {
    setMenuOpen(false)
    setOpenDropdown(null)
    setMobileExpanded(null)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  const phoneHref = `tel:${site.organizationPhone.replace(/[^\d+]/g, '')}`

  const toggleDropdown = (href: string, hasChildren: boolean) => {
    if (!hasChildren) {
      handleNav(href)
      return
    }
    setOpenDropdown((prev) => (prev === href ? null : href))
  }

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ease-apple ${
        scrolled
          ? 'border-b border-line bg-white/90 shadow-header backdrop-blur-xl'
          : 'border-b border-transparent bg-white/75 backdrop-blur-lg'
      }`}
    >
      <div className="site-shell">
        <div className="flex min-h-[52px] items-center gap-3 sm:min-h-[56px] lg:gap-4">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              handleNav('#hero')
            }}
            className="flex shrink-0 items-center gap-2.5"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-sm font-semibold text-white sm:h-9 sm:w-9">
              А
            </span>
            <span className="hidden min-w-0 flex-col md:flex">
              <span className="truncate text-sm font-semibold leading-tight text-ink">
                Артийский комитет
              </span>
            </span>
          </a>

          <nav
            className="mx-auto hidden flex-1 items-center justify-center gap-1 lg:flex"
            aria-label="Основная навигация"
          >
            {navLinks.map((link) => {
              const hasChildren = Boolean(link.children?.length)
              const isActive = activeNav === link.href
              const isOpen = openDropdown === link.href

              return (
                <div key={link.href} className="relative">
                  <button
                    type="button"
                    onClick={() => toggleDropdown(link.href, hasChildren)}
                    className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[13px] font-medium transition-colors xl:px-3 xl:text-sm ${
                      isActive || isOpen
                        ? 'text-ink'
                        : 'text-ink-muted hover:text-ink'
                    }`}
                    aria-expanded={hasChildren ? isOpen : undefined}
                    aria-haspopup={hasChildren ? 'menu' : undefined}
                  >
                    {link.label}
                    {hasChildren && (
                      <svg
                        className={`h-3 w-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </button>

                  {hasChildren && isOpen && (
                    <div
                      role="menu"
                      className="absolute left-1/2 top-full z-50 mt-1.5 min-w-[200px] -translate-x-1/2 overflow-hidden rounded-xl border border-line bg-white py-1 shadow-card"
                    >
                      {link.children!.map((child) => (
                        <button
                          key={child.href + child.label}
                          type="button"
                          role="menuitem"
                          onClick={() => handleNav(child.href)}
                          className="block w-full px-4 py-2.5 text-left text-sm text-ink-muted transition-colors hover:bg-surface hover:text-ink"
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          <div className="ml-auto hidden shrink-0 lg:block">
            <div className="flex items-center gap-3">
              <div className="text-right">
                <a
                  href={phoneHref}
                  className="block whitespace-nowrap text-[13px] font-semibold leading-tight text-ink hover:text-accent xl:text-sm"
                >
                  {site.organizationPhone}
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-0.5 block max-w-[190px] truncate text-[11px] text-ink-faint hover:text-ink xl:max-w-[220px] xl:text-xs"
                >
                  {site.email}
                </a>
              </div>
              <div className="flex gap-1 border-l border-line pl-3">
                {socials.map((social) => (
                  <a
                    key={social.id}
                    href={social.href}
                    target={social.href.startsWith('tel:') ? undefined : '_blank'}
                    rel={social.href.startsWith('tel:') ? undefined : 'noopener noreferrer'}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-surface transition-colors hover:bg-surface/80"
                    title={social.title}
                  >
                    <img
                      src={social.iconUrl}
                      alt={social.title}
                      className="h-4 w-4 object-contain"
                      loading="lazy"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <Button
            variant="accent"
            className="hidden min-h-9 shrink-0 rounded-full px-4 text-xs xl:inline-flex xl:text-sm"
            onClick={onParticipateClick}
          >
            Заявка
          </Button>

          <button
            type="button"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink lg:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-t border-line bg-white transition-[max-height,opacity] duration-300 ease-apple lg:hidden ${
          menuOpen ? 'max-h-[90vh] overflow-y-auto opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="site-shell flex flex-col gap-0.5 py-3" aria-label="Мобильная навигация">
          {navLinks.map((link) => {
            const hasChildren = Boolean(link.children?.length)
            const expanded = mobileExpanded === link.href

            if (!hasChildren) {
              return (
                <button
                  key={link.href}
                  type="button"
                  className={`min-h-11 rounded-xl px-3 py-2.5 text-left text-[15px] font-medium ${
                    activeNav === link.href ? 'bg-surface text-ink' : 'text-ink-muted'
                  }`}
                  onClick={() => handleNav(link.href)}
                >
                  {link.label}
                </button>
              )
            }

            return (
              <div key={link.href}>
                <button
                  type="button"
                  className={`flex min-h-11 w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-[15px] font-medium ${
                    activeNav === link.href || expanded ? 'bg-surface text-ink' : 'text-ink-muted'
                  }`}
                  onClick={() =>
                    setMobileExpanded((prev) => (prev === link.href ? null : link.href))
                  }
                >
                  {link.label}
                  <svg
                    className={`h-4 w-4 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {expanded && (
                  <div className="mb-1 ml-3 flex flex-col gap-0.5 border-l border-line pl-3">
                    {link.children!.map((child) => (
                      <button
                        key={child.href + child.label}
                        type="button"
                        className="rounded-lg px-3 py-2 text-left text-sm text-ink-muted hover:text-ink"
                        onClick={() => handleNav(child.href)}
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}

          <div className="mt-2 border-t border-line pt-3">
            <a href={phoneHref} className="block text-[15px] font-semibold text-ink">
              {site.organizationPhone}
            </a>
            <a href={`mailto:${site.email}`} className="mt-1 block text-sm text-ink-muted">
              {site.email}
            </a>
            <div className="mt-3 flex flex-wrap gap-2">
              {socials.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target={social.href.startsWith('tel:') ? undefined : '_blank'}
                  rel={social.href.startsWith('tel:') ? undefined : 'noopener noreferrer'}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-surface"
                  title={social.title}
                >
                  <img src={social.iconUrl} alt={social.title} className="h-4 w-4 object-contain" />
                </a>
              ))}
            </div>
          </div>

          <Button variant="accent" className="mt-3 w-full rounded-full" onClick={onParticipateClick}>
            Подать заявку
          </Button>
        </nav>
      </div>
    </header>
  )
}
