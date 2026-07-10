import { contestGoals, contests, site } from '../../data/content'
import { FadeIn } from '../ui/FadeIn'
import { SectionHeading } from '../ui/SectionHeading'
import { Button } from '../ui/Button'

type ContestsSectionProps = {
  onParticipateClick: () => void
}

export function ContestsSection({ onParticipateClick }: ContestsSectionProps) {
  return (
    <section id="contests" className="section-alt scroll-mt-24 py-14 sm:py-16 lg:py-20">
      <div className="w-full">
        <FadeIn>
          <SectionHeading
            eyebrow="Конкурсы"
            title="Международные конкурсы и олимпиады"
            subtitle="Заявки принимаются по электронной почте"
          />
        </FadeIn>

        <FadeIn>
          <ul className="mb-10 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            {contestGoals.map((goal) => (
              <li
                key={goal}
                className="rounded-full border border-line bg-white px-4 py-2 text-sm text-ink-muted"
              >
                {goal}
              </li>
            ))}
          </ul>
        </FadeIn>

        <div className="grid gap-4 md:grid-cols-2">
          {contests.map((contest, index) => (
            <FadeIn key={contest.id} delay={index * 40}>
              <article className="apple-card flex h-full flex-col p-6">
                <span className="text-xs font-medium tabular-nums text-ink-faint">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-balance text-base font-semibold leading-snug text-ink sm:text-lg">
                  {contest.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                  {contest.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {contest.highlights.map((h) => (
                    <li
                      key={h}
                      className="rounded-md bg-surface px-2.5 py-1 text-xs text-ink-muted"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 border-t border-line pt-4">
                  <a
                    href={`mailto:${site.email}?subject=Заявка на конкурс`}
                    className="text-sm font-medium text-accent hover:underline"
                  >
                    {site.email}
                  </a>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="mt-12 flex flex-col gap-4 rounded-2xl bg-ink p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div className="text-white">
              <h3 className="text-xl font-semibold">Приём заявок</h3>
              <p className="mt-2 text-sm text-white/70">
                Отправьте заявку через форму или на {site.email}
              </p>
            </div>
            <Button
              variant="accent"
              className="shrink-0 rounded-full"
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
