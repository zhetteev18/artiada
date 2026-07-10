import { useMemo, useState } from 'react'
import {
  contestRegulations,
  groupRegulationsByYear,
  type ContestRegulation,
} from '../../data/contest-regulations'
import { site } from '../../data/content'
import { FadeIn } from '../ui/FadeIn'
import { SectionHeading } from '../ui/SectionHeading'

type YearFilter = 'all' | number

function PdfIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
    </svg>
  )
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 text-ink-faint transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
    </svg>
  )
}

function RegulationRow({ item }: { item: ContestRegulation }) {
  const [open, setOpen] = useState(false)
  const fileName = item.pdfUrl.split('/').pop() ?? 'document.pdf'

  return (
    <article className="border-b border-line last:border-b-0">
      <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:gap-4 sm:py-3.5">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex min-w-0 flex-1 items-start gap-3 text-left sm:items-center"
          aria-expanded={open}
        >
          <ChevronIcon open={open} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <time
                dateTime={item.dateStart}
                className="text-xs font-medium tabular-nums text-ink-muted sm:text-sm"
              >
                {item.dates}
              </time>
              <span className="hidden h-1 w-1 rounded-full bg-ink-faint sm:inline-block" />
              <span className="text-xs text-ink-faint">{item.location}</span>
            </div>
            <h3 className="mt-1 text-[15px] font-medium leading-snug text-ink sm:text-base">
              {item.title}
            </h3>
          </div>
        </button>

        <div className="flex shrink-0 items-center gap-2 pl-7 sm:pl-0">
          <a
            href={item.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-full bg-accent px-4 text-sm font-medium text-white transition-colors hover:bg-accent-hover sm:min-h-9 sm:flex-none"
          >
            <PdfIcon />
            PDF
          </a>
          <a
            href={`mailto:${site.email}?subject=${encodeURIComponent(`Заявка: ${item.title}`)}`}
            className="inline-flex min-h-10 flex-1 items-center justify-center rounded-full border border-line-strong px-4 text-sm font-medium text-ink transition-colors hover:bg-surface sm:min-h-9 sm:flex-none"
          >
            Заявка
          </a>
        </div>
      </div>

      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-apple ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-line bg-surface/60 px-4 py-4 sm:px-6">
            <p className="text-sm leading-relaxed text-ink-muted">{item.description}</p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {item.nominations.map((n) => (
                <span
                  key={n}
                  className="rounded-md bg-white px-2.5 py-1 text-xs text-ink-muted ring-1 ring-line"
                >
                  {n}
                </span>
              ))}
            </div>

            <div className="mt-4 flex flex-col gap-2 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
              <span className="font-mono">{fileName}</span>
              {item.deadline && (
                <span>
                  Приём заявок: <span className="text-ink-muted">{item.deadline}</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export function ContestRegulationsSection() {
  const groups = groupRegulationsByYear(contestRegulations)
  const years = groups.map((g) => g.year)
  const [yearFilter, setYearFilter] = useState<YearFilter>('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return contestRegulations.filter((item) => {
      if (yearFilter !== 'all' && item.year !== yearFilter) return false
      if (!q) return true
      return (
        item.title.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.dates.toLowerCase().includes(q) ||
        item.nominations.some((n) => n.toLowerCase().includes(q))
      )
    })
  }, [query, yearFilter])

  return (
    <section
      id="contest-regulations"
      className="scroll-mt-24 border-t border-line bg-white py-14 sm:py-16 lg:py-20"
    >
      <div className="w-full">
        <FadeIn>
          <SectionHeading
            eyebrow="Документы"
            title="Положения конкурсов"
            subtitle="Официальные PDF с датами и условиями участия. Заявки: 07baa@mail.ru"
          />
        </FadeIn>

        <FadeIn delay={40}>
          <div className="sticky top-[52px] z-20 -mx-5 border-y border-line bg-white/95 px-5 py-3 backdrop-blur-xl sm:top-[56px] sm:-mx-0 sm:rounded-2xl sm:border sm:px-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="segment-control w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setYearFilter('all')}
                  className={`segment-btn flex-1 sm:flex-none ${yearFilter === 'all' ? 'segment-btn-active' : ''}`}
                >
                  Все
                </button>
                {years.map((year) => (
                  <button
                    key={year}
                    type="button"
                    onClick={() => setYearFilter(year)}
                    className={`segment-btn flex-1 sm:flex-none ${yearFilter === year ? 'segment-btn-active' : ''}`}
                  >
                    {year}
                  </button>
                ))}
              </div>

              <label className="relative block w-full sm:max-w-xs">
                <span className="sr-only">Поиск по положениям</span>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Поиск конкурса…"
                  className="w-full rounded-full border border-line bg-surface py-2.5 pl-10 pr-4 text-sm text-ink outline-none transition-[border-color,box-shadow] placeholder:text-ink-faint focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
                <svg
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
                  />
                </svg>
              </label>
            </div>

            <p className="mt-2 text-xs text-ink-faint">
              {filtered.length}{' '}
              {filtered.length === 1
                ? 'документ'
                : filtered.length < 5
                  ? 'документа'
                  : 'документов'}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-white sm:mt-6">
            {filtered.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <p className="text-sm text-ink-muted">Ничего не найдено</p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery('')
                    setYearFilter('all')
                  }}
                  className="mt-3 text-sm font-medium text-accent hover:underline"
                >
                  Сбросить фильтры
                </button>
              </div>
            ) : (
              <div className="divide-y divide-line px-4 sm:px-6">
                {filtered.map((item) => (
                  <RegulationRow key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
        </FadeIn>

        <FadeIn delay={120}>
          <p className="mt-6 text-center text-xs text-ink-faint sm:text-sm">
            Все файлы хранятся в{' '}
            <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[11px] text-ink-muted">
              /documents/contests/
            </code>
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
