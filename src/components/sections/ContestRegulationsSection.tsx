import { useMemo, useState } from 'react'
import { useRegulations } from '../../hooks/useRegulations'
import type { ContestRegulation } from '../../data/contest-regulations'
import mediaManifest from '../../data/media-manifest.json'
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
      className={`h-5 w-5 shrink-0 text-ink-faint transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
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
  const photos = mediaManifest.regulations?.[item.id] || []

  return (
    <article className="group relative mb-4 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-line transition-all duration-300 hover:shadow-card-hover last:mb-0">
      <div className="absolute bottom-0 left-0 top-0 w-1 bg-gradient-to-b from-accent to-accent-dark opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex min-w-0 flex-1 items-start gap-4 text-left sm:items-center"
          aria-expanded={open}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-warm transition-colors duration-300 group-hover:bg-accent/10">
            <ChevronIcon open={open} />
          </div>
          
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center rounded-md bg-accent/10 px-2 py-1 text-xs font-semibold text-accent">
                {item.dates}
              </span>
              <span className="flex items-center text-xs text-ink-muted">
                <svg className="mr-1 h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {item.location}
              </span>
            </div>
            <h3 className="mt-2 text-lg font-semibold leading-tight text-ink transition-colors group-hover:text-accent">
              {item.title}
            </h3>
          </div>
        </button>

        <div className="flex shrink-0 items-center gap-3 pl-14 sm:pl-0">
          <a
            href={item.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-accent px-5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-md sm:min-h-11"
          >
            <PdfIcon />
            PDF
          </a>
          <a
            href={`mailto:${site.email}?subject=${encodeURIComponent(`Заявка: ${item.title}`)}`}
            className="inline-flex min-h-10 items-center justify-center rounded-xl border-2 border-line px-5 text-sm font-semibold text-ink transition-all hover:border-ink hover:bg-ink hover:text-white sm:min-h-11"
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
          <div className="border-t border-line/50 bg-surface-warm/50 px-5 py-5 sm:px-20">
            <p className="text-[15px] leading-relaxed text-ink-soft">{item.description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {item.nominations.map((n) => (
                <span
                  key={n}
                  className="rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-ink-muted shadow-sm ring-1 ring-line/50"
                >
                  {n}
                </span>
              ))}
            </div>

            {photos.length > 0 && (
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {photos.slice(0, 2).map((photo) => (
                  <img
                    key={photo}
                    src={photo}
                    alt={item.title}
                    className="aspect-video w-full rounded-xl object-contain bg-ink/5 shadow-sm ring-1 ring-line/50"
                  />
                ))}
              </div>
            )}

            <div className="mt-5 flex flex-col gap-3 rounded-xl bg-white p-4 text-sm shadow-sm ring-1 ring-line/50 sm:flex-row sm:items-center sm:justify-between">
              <span className="flex items-center gap-2 text-ink-muted">
                <svg className="h-4 w-4 text-ink-faint" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="font-mono text-xs">{fileName}</span>
              </span>
              {item.deadline && (
                <span className="flex items-center gap-2 text-ink-muted">
                  <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Приём заявок: <span className="font-semibold text-ink">{item.deadline}</span>
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
  const regulations = useRegulations()
  
  const groups = useMemo(() => {
    const years = [...new Set(regulations.map((r) => r.year))].sort()
    return years.map((year) => ({
      year,
      items: regulations.filter((r) => r.year === year),
    }))
  }, [regulations])
  
  const years = groups.map((g) => g.year)
  const [yearFilter, setYearFilter] = useState<YearFilter>('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return regulations.filter((item) => {
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
      className="relative overflow-hidden scroll-mt-24 bg-surface py-16 sm:py-24"
    >
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-full w-full max-w-[1200px] -translate-x-1/2">
        <div className="absolute left-10 top-20 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-gold/5 blur-3xl" />
      </div>

      <div className="site-shell relative z-10">
        <FadeIn>
          <SectionHeading
            eyebrow="Документы"
            title="Положения конкурсов"
            subtitle="Официальные документы с датами, номинациями и условиями участия. Для подачи заявки скачайте PDF или напишите нам."
          />
        </FadeIn>

        <FadeIn delay={40}>
          <div className="sticky top-[52px] z-20 mx-auto mb-8 mt-10 max-w-4xl rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-line/50 backdrop-blur-xl sm:top-[64px] sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="segment-control flex w-full rounded-xl bg-surface-warm p-1.5 shadow-inner sm:w-auto">
                <button
                  type="button"
                  onClick={() => setYearFilter('all')}
                  className={`segment-btn flex-1 rounded-lg px-5 py-2.5 text-[15px] transition-colors sm:flex-none ${
                    yearFilter === 'all'
                      ? 'bg-white font-semibold text-ink shadow-sm'
                      : 'text-ink-muted hover:bg-black/5 hover:text-ink'
                  }`}
                >
                  Все
                </button>
                {years.map((year) => (
                  <button
                    key={year}
                    type="button"
                    onClick={() => setYearFilter(year)}
                    className={`segment-btn flex-1 rounded-lg px-5 py-2.5 text-[15px] transition-colors sm:flex-none ${
                      yearFilter === year
                        ? 'bg-white font-semibold text-ink shadow-sm'
                        : 'text-ink-muted hover:bg-black/5 hover:text-ink'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>

              <label className="relative block w-full sm:max-w-[320px]">
                <span className="sr-only">Поиск по положениям</span>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Поиск по названию, городу..."
                  className="peer w-full rounded-xl border-0 bg-surface-warm py-3 pl-11 pr-4 text-[15px] text-ink shadow-inner outline-none transition-all placeholder:text-ink-faint focus:bg-white focus:ring-2 focus:ring-accent/30"
                />
                <svg
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-faint transition-colors peer-focus:text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.75}
                    d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
                  />
                </svg>
              </label>
            </div>
          </div>
        </FadeIn>

        <div className="mx-auto max-w-4xl">
          {filtered.length === 0 ? (
            <FadeIn delay={80}>
              <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-line bg-white/50 px-6 py-16 text-center backdrop-blur-sm">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface-warm text-2xl">
                  <svg className="h-8 w-8 text-ink-faint" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-ink">Ничего не найдено</h3>
                <p className="mt-2 max-w-sm text-[15px] text-ink-muted">
                  По вашему запросу нет положений. Попробуйте изменить фильтры или условия поиска.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery('')
                    setYearFilter('all')
                  }}
                  className="mt-6 inline-flex min-h-10 items-center justify-center rounded-xl bg-ink px-6 text-sm font-semibold text-white transition-colors hover:bg-ink-soft"
                >
                  Сбросить фильтры
                </button>
              </div>
            </FadeIn>
          ) : (
            <div className="flex flex-col">
              {filtered.map((item, index) => (
                <FadeIn key={item.id} delay={80 + Math.min(index * 20, 200)}>
                  <RegulationRow item={item} />
                </FadeIn>
              ))}
            </div>
          )}

          <FadeIn delay={120}>
            <p className="mt-10 text-center text-[13px] text-ink-faint">
              Все файлы положений можно найти в папке{' '}
              <code className="rounded-md border border-line bg-white px-2 py-1 font-mono text-[11px] text-ink-muted shadow-sm">
                /documents/contests/
              </code>
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
