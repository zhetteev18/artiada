import { useState } from 'react'
import { getNewsImage } from '../../data/media'
import type { NewsItem } from '../../data/news'
import { useNews } from '../../hooks/useNews'
import { formatNewsDate } from '../../utils/newsFormat'
import { MediaImage } from '../ui/MediaImage'
import { FadeIn } from '../ui/FadeIn'
import { SectionHeading } from '../ui/SectionHeading'
import { NewsModal } from './NewsModal'

const INITIAL_VISIBLE = 6

function NewsCard({
  item,
  onOpen,
}: {
  item: NewsItem
  onOpen: (item: NewsItem) => void
}) {
  const imageSrc = getNewsImage(item.slug)

  return (
    <article className="card-interactive group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/5 bg-white shadow-card">
      <div className="relative aspect-[16/10] overflow-hidden">
        <MediaImage
          src={imageSrc}
          alt=""
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          fallback={<span className="text-4xl opacity-40">📰</span>}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <time
          dateTime={item.date}
          className="absolute left-3 top-3 rounded-lg bg-white/95 px-2.5 py-1 text-xs font-semibold text-ink shadow-sm backdrop-blur-sm"
        >
          {formatNewsDate(item.date)}
        </time>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-balance text-base font-bold leading-snug text-ink transition-colors group-hover:text-gold-dark sm:text-lg">
          {item.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted line-clamp-3">
          {item.excerpt}
        </p>
        <button
          type="button"
          onClick={() => onOpen(item)}
          className="mt-4 inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-gold transition-all group-hover:gap-2 hover:text-ink"
        >
          Читать подробнее
          <span aria-hidden>→</span>
        </button>
      </div>
    </article>
  )
}

export function NewsSection() {
  const news = useNews()
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE)
  const [active, setActive] = useState<NewsItem | null>(null)

  const visible = news.slice(0, visibleCount)
  const hasMore = visibleCount < news.length

  return (
    <section id="news" className="section-mesh desktop-full-section relative scroll-mt-24 py-14 sm:py-16 lg:py-20">
      <div className="relative w-full">
        <FadeIn>
          <SectionHeading
            eyebrow="Актуально"
            title="Новости"
            subtitle="События, конкурсы и мероприятия Мирового Артийского движения"
          />
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item, index) => (
            <FadeIn key={item.id} delay={index * 50}>
              <NewsCard item={item} onOpen={setActive} />
            </FadeIn>
          ))}
        </div>

        {hasMore && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => setVisibleCount((n) => Math.min(n + 6, news.length))}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-ink/10 bg-white px-8 text-sm font-semibold text-ink shadow-card transition-all hover:border-gold/40 hover:bg-gold/5 hover:shadow-card-hover"
            >
              Показать ещё
              <span className="rounded-full bg-gold/15 px-2 py-0.5 text-xs text-gold-dark">
                {news.length - visibleCount}
              </span>
            </button>
          </div>
        )}

        {active && <NewsModal item={active} onClose={() => setActive(null)} />}
      </div>
    </section>
  )
}
