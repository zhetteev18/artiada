import {
  fallbackContestResults,
  type ContestResult,
} from '../../data/editable-content'
import { useEditableContent } from '../../hooks/useEditableContent'
import { FadeIn } from '../ui/FadeIn'
import { SectionHeading } from '../ui/SectionHeading'

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return iso
  }
}

export function ContestResultsSection() {
  const results = useEditableContent<ContestResult>(
    '/content/contest-results.json',
    fallbackContestResults,
  )

  return (
    <section
      id="results"
      className="section-mesh desktop-full-section relative scroll-mt-24 py-14 sm:py-16 lg:py-20"
    >
      <div className="relative w-full">
        <FadeIn>
          <SectionHeading
            eyebrow="Результаты"
            title="Итоги конкурсов"
            subtitle="Победители, лауреаты и результаты прошедших мероприятий"
          />
        </FadeIn>

        <div className="grid gap-5 lg:grid-cols-2">
          {results.map((result, index) => (
            <FadeIn key={result.id} delay={index * 60}>
              <article className="card-interactive h-full overflow-hidden rounded-2xl border border-ink/5 bg-white shadow-card">
                <div className="border-b border-ink/5 p-6">
                  <time
                    dateTime={result.date}
                    className="text-xs font-bold uppercase tracking-wider text-gold"
                  >
                    {formatDate(result.date)}
                  </time>
                  <h3 className="mt-2 font-display text-2xl font-semibold leading-tight text-ink">
                    {result.title}
                  </h3>
                  <p className="mt-2 text-sm font-semibold text-ink-muted">
                    {result.nomination}
                  </p>
                </div>
                <div className="p-6">
                  <p className="whitespace-pre-line rounded-xl bg-gold/10 p-4 text-sm font-semibold leading-relaxed text-ink">
                    {result.winners}
                  </p>
                  <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-ink-muted">
                    {result.description}
                  </p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
