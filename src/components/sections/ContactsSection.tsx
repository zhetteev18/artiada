import { site } from '../../data/content'
import { FadeIn } from '../ui/FadeIn'
import { SectionHeading } from '../ui/SectionHeading'

const contactItems = [
  {
    type: 'organizationPhone',
    label: 'Номер организации',
    value: site.organizationPhone,
    href: `tel:${site.organizationPhone.replace(/[^\d+]/g, '')}`,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8 21h8m-4-4v4m-7-4h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    type: 'email',
    label: 'Email',
    value: site.email,
    href: `mailto:${site.email}`,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    type: 'address',
    label: 'Адрес',
    value: site.address,
    href: null,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
] as const

export function ContactsSection() {
  return (
    <section id="contacts" className="desktop-full-section scroll-mt-24 border-t border-ink/5 py-14 sm:py-16 lg:py-20">
      <div className="w-full">
        <FadeIn>
          <SectionHeading eyebrow="Связь" title="Контакты" align="center" />
        </FadeIn>

        <FadeIn>
          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3">
            {contactItems.map((item) => {
              const inner = (
                <>
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15 text-gold-dark transition-colors group-hover:bg-gold/25">
                    {item.icon}
                  </span>
                  <p className="mt-4 text-xs font-bold uppercase tracking-wider text-ink-muted">
                    {item.label}
                  </p>
                  <p className="mt-1 break-all text-sm font-semibold text-ink transition-colors group-hover:text-gold-dark">
                    {item.value}
                  </p>
                </>
              )

              if (item.href) {
                return (
                  <a
                    key={item.type}
                    href={item.href}
                    className="card-interactive group rounded-2xl border border-ink/5 bg-white p-6 text-center shadow-card"
                  >
                    {inner}
                  </a>
                )
              }

              return (
                <div
                  key={item.type}
                  className="rounded-2xl border border-ink/5 bg-white p-6 text-center shadow-card"
                >
                  {inner}
                </div>
              )
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
