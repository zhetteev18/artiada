import { socials } from '../../data/content'
import { FadeIn } from '../ui/FadeIn'
import { SectionHeading } from '../ui/SectionHeading'

export function SocialsSection() {
  return (
    <section
      id="socials"
      className="desktop-full-section scroll-mt-24 border-t border-ink/5 py-14 sm:py-16 lg:py-20"
    >
      <div className="w-full">
        <FadeIn>
          <SectionHeading
            eyebrow="Онлайн"
            title="Мы в соцсетях"
            subtitle="Подписывайтесь и пишите нам в удобном мессенджере или соцсети"
            align="center"
          />
        </FadeIn>

        <FadeIn>
          <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {socials.map((social) => {
              const isPhoneLink = social.href.startsWith('tel:')
              const content = (
                <>
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-ink/5">
                    <img
                      src={social.iconUrl}
                      alt=""
                      className="h-9 w-9 object-contain"
                      loading="lazy"
                    />
                  </span>
                  <p className="mt-5 font-display text-2xl font-semibold text-ink">
                    {social.title}
                  </p>
                  <p className="mt-2 text-sm text-ink-muted">{social.label}</p>
                </>
              )

              return (
                <a
                  key={social.id}
                  href={social.href}
                  {...(isPhoneLink
                    ? {}
                    : { target: '_blank', rel: 'noopener noreferrer' })}
                  className="card-interactive rounded-2xl border border-ink/5 bg-white p-6 text-center shadow-card"
                >
                  {content}
                </a>
              )
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
