import { contestGoals, contests, site } from '../../data/content'
import { FadeIn } from '../ui/FadeIn'
import { SectionHeading } from '../ui/SectionHeading'
import { Button } from '../ui/Button'

type ContestsSectionProps = {
  onParticipateClick: () => void
}

export function ContestsSection({ onParticipateClick }: ContestsSectionProps) {
  return (
    <section id="contests" className="section-mesh desktop-full-section relative scroll-mt-24 py-14 sm:py-16 lg:py-20">
      <div className="relative w-full">
        <FadeIn>
          <SectionHeading
            eyebrow="Конкурсы"
            title="Международные конкурсы и олимпиады"
            subtitle="Заявки принимаются по электронной почте"
          />
        </FadeIn>

        <FadeIn>
          <ul className="mb-12 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            {contestGoals.map((goal) => (
              <li
                key={goal}
                className="flex items-center gap-2 rounded-full border border-gold/20 bg-white/80 px-4 py-2 text-sm text-ink-muted shadow-sm backdrop-blur-sm"
              >
                <span className="text-gold">✦</span>
                {goal}
              </li>
            ))}
          </ul>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-2">
          {contests.map((contest, index) => (
            <FadeIn key={contest.id} delay={index * 60}>
              <article className="card-interactive group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/5 bg-white p-6 shadow-card">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 font-display text-lg font-bold text-gold-dark">
                  {index + 1}
                </div>
                <h3 className="text-balance text-base font-bold leading-snug text-ink transition-colors group-hover:text-gold-dark sm:text-lg">
                  {contest.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                  {contest.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {contest.highlights.map((h) => (
                    <li
                      key={h}
                      className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-ink-muted ring-1 ring-ink/5"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-ink/5 pt-5">
                  <a
                    href={`mailto:${site.email}?subject=Заявка на конкурс`}
                    className="text-sm font-semibold text-gold transition-colors hover:text-ink"
                  >
                    {site.email}
                  </a>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="relative mt-14 overflow-hidden rounded-3xl bg-gradient-to-br from-ink via-ink-soft to-ink p-8 shadow-card-hover sm:flex sm:items-center sm:justify-between sm:p-10">
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gold/20 blur-3xl"
              aria-hidden
            />
            <div className="relative text-white">
              <h3 className="font-display text-2xl font-semibold">Приём заявок</h3>
              <p className="mt-2 text-sm text-white/70">
                Отправьте заявку через форму или на {site.email}
              </p>
            </div>
            <Button
              variant="gold"
              className="relative mt-6 shrink-0 sm:mt-0"
              onClick={onParticipateClick}
            >
              Подать заявку
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
