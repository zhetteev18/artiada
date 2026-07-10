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
    <section id="results" className="section-alt scroll-mt-24 py-14 sm:py-16 lg:py-20">
      <div className="w-full">
        <FadeIn>
          <SectionHeading
            eyebrow="Результаты"
            title="Итоги конкурсов"
            subtitle="Победители, лауреаты и результаты прошедших мероприятий"
          />
        </FadeIn>

        <div className="grid gap-4 lg:grid-cols-2">
          {results.map((result, index) => (
            <FadeIn key={result.id} delay={index * 40}>
              <article className="apple-card h-full overflow-hidden">
                <div className="border-b border-line p-6">
                  <time
                    dateTime={result.date}
                    className="text-xs font-medium uppercase tracking-wide text-ink-faint"
                  >
                    {formatDate(result.date)}
                  </time>
                  <h3 className="mt-2 text-xl font-semibold leading-tight text-ink">
                    {result.title}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-ink-muted">
                    {result.nomination}
                  </p>
                </div>
                <div className="p-6">
                  <p className="whitespace-pre-line rounded-xl bg-surface p-4 text-sm font-medium leading-relaxed text-ink">
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
