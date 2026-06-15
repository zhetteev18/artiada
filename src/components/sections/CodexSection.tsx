import { useState } from 'react'
import { codex, nominations } from '../../data/content'
import { FadeIn } from '../ui/FadeIn'
import { SectionHeading } from '../ui/SectionHeading'

export function CodexSection() {
  const [expandedNomination, setExpandedNomination] = useState<number | null>(null)

  return (
    <section id="codex" className="section-mesh desktop-full-section relative scroll-mt-24 py-14 sm:py-16 lg:py-20">
      <div className="relative w-full">
        <FadeIn>
          <SectionHeading
            eyebrow="Документ"
            title={codex.title}
            subtitle={codex.subtitle}
          />
        </FadeIn>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          <FadeIn>
            <div className="glass-card h-full p-6 sm:p-8">
              <p className="whitespace-pre-line text-sm font-medium text-ink-muted">
                {codex.approved}
              </p>
              <h3 className="mt-8 font-display text-xl font-semibold text-gold">От автора</h3>
              <p className="mt-3 text-base leading-relaxed text-ink-muted">{codex.fromAuthor}</p>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div>
              <p className="mb-6 text-sm leading-relaxed text-ink-muted">{codex.note}</p>
              <h3 className="mb-5 font-display text-xl font-semibold text-ink">
                Номинации Артиады
              </h3>
              <ol className="grid gap-2 sm:grid-cols-2">
                {nominations.map((item, i) => (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedNomination((prev) => (prev === i ? null : i))
                      }
                      className={`flex w-full gap-3 rounded-xl border px-3 py-3 text-left text-sm transition-all duration-300 ${
                        expandedNomination === i
                          ? 'border-gold/40 bg-gold/10 shadow-sm'
                          : 'border-ink/5 bg-white/90 hover:border-gold/25 hover:bg-gold/5'
                      }`}
                    >
                      <span className="shrink-0 font-mono text-xs font-bold text-gold">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="min-w-0 break-words text-ink-muted">{item}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
