import { aboutIntro, aboutText, vicePresidentMessage } from '../../data/content'
import { FadeIn } from '../ui/FadeIn'
import { SectionHeading } from '../ui/SectionHeading'

export function AboutSection() {
  const paragraphs = aboutText.split('\n\n').filter(Boolean)

  return (
    <section id="about" className="desktop-full-section scroll-mt-24 py-14 sm:py-16 lg:py-20">
      <div className="w-full">
        <FadeIn>
          <SectionHeading
            eyebrow="О нас"
            title={aboutIntro.replace(/"/g, '')}
            subtitle="Международный праздник — олимпиада искусств — Первая Артиада Мира"
          />
        </FadeIn>

        <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
          <FadeIn className="lg:col-span-3">
            <div className="glass-card space-y-5 p-6 sm:p-9">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed text-ink-muted first:text-lg first:font-medium first:text-ink sm:text-lg"
                >
                  {p}
                </p>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={120} className="lg:col-span-2">
            <aside className="relative h-full overflow-hidden rounded-3xl bg-gradient-to-br from-ink via-ink-soft to-ink p-6 text-white shadow-card-hover sm:p-8">
              <div
                className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-gold/25 blur-3xl"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-gold/10 blur-2xl"
                aria-hidden
              />
              <p className="relative whitespace-pre-line font-display text-lg leading-relaxed text-white/95">
                {vicePresidentMessage.greeting}
              </p>
              <div className="relative mt-8 border-t border-white/15 pt-6">
                <p className="font-display text-xl font-semibold text-gold-light">
                  {vicePresidentMessage.name}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-white/65 sm:text-sm">
                  {vicePresidentMessage.titles}
                </p>
              </div>
            </aside>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
