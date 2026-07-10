import { aboutIntro, aboutText, vicePresidentMessage } from '../../data/content'
import { FadeIn } from '../ui/FadeIn'
import { SectionHeading } from '../ui/SectionHeading'

export function AboutSection() {
  const paragraphs = aboutText.split('\n\n').filter(Boolean)

  return (
    <section id="about" className="scroll-mt-24 bg-white py-14 sm:py-16 lg:py-20">
      <div className="w-full">
        <FadeIn>
          <SectionHeading
            eyebrow="О нас"
            title={aboutIntro.replace(/"/g, '')}
            subtitle="Международный праздник — олимпиада искусств — Первая Артиада Мира"
          />
        </FadeIn>

        <div className="grid gap-6 lg:grid-cols-5 lg:gap-8">
          <FadeIn className="lg:col-span-3">
            <div className="apple-card space-y-5 p-6 sm:p-8">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed text-ink-muted first:text-lg first:font-medium first:text-ink"
                >
                  {p}
                </p>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={80} className="lg:col-span-2">
            <aside className="apple-card h-full bg-ink p-6 text-white sm:p-8">
              <p className="whitespace-pre-line text-base leading-relaxed text-white/90">
                {vicePresidentMessage.greeting}
              </p>
              <div className="mt-8 border-t border-white/15 pt-6">
                <p className="text-lg font-semibold">{vicePresidentMessage.name}</p>
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
