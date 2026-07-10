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
    <article className="apple-card group flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden">
        <MediaImage
          src={imageSrc}
          alt=""
          className="h-full w-full object-cover"
          fallback={<span className="text-4xl opacity-30">📰</span>}
        />
        <time
          dateTime={item.date}
          className="absolute left-3 top-3 rounded-md bg-white/95 px-2 py-1 text-xs font-medium text-ink"
        >
          {formatNewsDate(item.date)}
        </time>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-balance text-base font-semibold leading-snug text-ink sm:text-lg">
          {item.title}
        </h3>
        <p className="mt-2 flex-1 line-clamp-3 text-sm leading-relaxed text-ink-muted">
          {item.excerpt}
        </p>
        <button
          type="button"
          onClick={() => onOpen(item)}
          className="mt-4 inline-flex min-h-10 items-center gap-1 text-sm font-medium text-accent hover:underline"
        >
          Читать подробнее →
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
    <section id="news" className="scroll-mt-24 bg-surface py-14 sm:py-16 lg:py-20">
      <div className="w-full">
        <FadeIn>
          <SectionHeading
            eyebrow="Актуально"
            title="Новости"
            subtitle="События, конкурсы и мероприятия Мирового Артийского движения"
          />
        </FadeIn>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item, index) => (
            <FadeIn key={item.id} delay={index * 40}>
              <NewsCard item={item} onOpen={setActive} />
            </FadeIn>
          ))}
        </div>

        {hasMore && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => setVisibleCount((n) => Math.min(n + 6, news.length))}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong bg-white px-8 text-sm font-medium text-ink transition-colors hover:bg-surface"
            >
              Показать ещё
              <span className="rounded-full bg-surface px-2 py-0.5 text-xs text-ink-muted">
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
