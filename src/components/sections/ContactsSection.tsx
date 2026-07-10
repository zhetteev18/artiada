import { site, socials } from '../../data/content'
import { FadeIn } from '../ui/FadeIn'
import { SectionHeading } from '../ui/SectionHeading'

const contactItems = [
  {
    type: 'organizationPhone',
    label: 'Телефон организации',
    value: site.organizationPhone,
    href: `tel:${site.organizationPhone.replace(/[^\d+]/g, '')}`,
  },
  {
    type: 'email',
    label: 'Email',
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    type: 'address',
    label: 'Адрес',
    value: site.address,
    href: null,
  },
] as const

export function ContactsSection() {
  return (
    <section
      id="contacts"
      className="scroll-mt-24 border-t border-line bg-surface py-14 sm:py-16 lg:py-20"
    >
      <div className="w-full">
        <FadeIn>
          <SectionHeading eyebrow="Связь" title="Контакты" align="center" />
        </FadeIn>

        <FadeIn>
          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3">
            {contactItems.map((item) => {
              const inner = (
                <>
                  <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">
                    {item.label}
                  </p>
                  <p className="mt-2 break-all text-base font-semibold text-ink">{item.value}</p>
                </>
              )

              if (item.href) {
                return (
                  <a
                    key={item.type}
                    href={item.href}
                    className="apple-card p-6 text-center transition-colors hover:border-accent/30"
                  >
                    {inner}
                  </a>
                )
              }

              return (
                <div
                  key={item.type}
                  className="rounded-2xl border border-line bg-white p-6 text-center"
                >
                  {inner}
                </div>
              )
            })}
          </div>

          <div className="mx-auto mt-10 flex max-w-4xl flex-col items-center gap-4 border-t border-line pt-8">
            <p className="text-sm font-medium text-ink-muted">Мы в соцсетях</p>
            <div className="flex flex-wrap justify-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target={social.href.startsWith('tel:') ? undefined : '_blank'}
                  rel={social.href.startsWith('tel:') ? undefined : 'noopener noreferrer'}
                  className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-surface"
                >
                  <img src={social.iconUrl} alt="" className="h-5 w-5 object-contain" />
                  {social.title}
                </a>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
