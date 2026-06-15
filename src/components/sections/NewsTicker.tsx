import { useEffect, useState } from 'react'
import { getNewsImage } from '../../data/media'
import type { NewsItem } from '../../data/news'
import { useNews } from '../../hooks/useNews'
import { formatNewsDateShort } from '../../utils/newsFormat'
import { NewsModal } from './NewsModal'

function TickerCard({
  item,
  onSelect,
}: {
  item: NewsItem
  onSelect: (item: NewsItem) => void
}) {
  const imageSrc = getNewsImage(item.slug)

  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className="group flex w-[min(88vw,400px)] shrink-0 items-center gap-3.5 py-2 text-left sm:w-[420px] sm:gap-4 lg:w-[360px] xl:w-[380px]"
    >
      {imageSrc ? (
        <img
          src={imageSrc}
          alt=""
          className="h-16 w-16 shrink-0 rounded-lg object-cover shadow-[0_4px_16px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-[1.03] sm:h-[4.5rem] sm:w-[4.5rem] lg:h-14 lg:w-14 lg:rounded-md xl:h-16 xl:w-16"
        />
      ) : (
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-white/10 text-xl lg:h-14 lg:w-14">
          📰
        </span>
      )}
      <span className="min-w-0 flex-1">
        <time
          dateTime={item.date}
          className="text-[11px] font-semibold text-gold-light sm:text-xs [text-shadow:0_1px_4px_rgba(0,0,0,0.45)]"
        >
          {formatNewsDateShort(item.date)}
        </time>
        <span className="mt-1 line-clamp-2 font-display text-base font-semibold leading-snug text-white transition-colors group-hover:text-gold-light sm:text-lg lg:text-[15px] lg:leading-snug xl:text-base [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">
          {item.title}
        </span>
      </span>
    </button>
  )
}

function TickerDivider() {
  return (
    <span
      className="mx-2 h-12 w-px shrink-0 self-center bg-white/20 lg:mx-3 lg:h-14"
      aria-hidden
    />
  )
}

function TickerTrack({
  items,
  onSelect,
  ariaHidden,
}: {
  items: NewsItem[]
  onSelect: (item: NewsItem) => void
  ariaHidden?: boolean
}) {
  return (
    <div className="flex shrink-0 items-center pr-6 lg:pr-8" aria-hidden={ariaHidden}>
      {items.map((item, index) => (
        <div key={`${item.id}-${ariaHidden ? 'dup' : 'main'}-${index}`} className="flex items-center">
          {index > 0 && <TickerDivider />}
          <TickerCard item={item} onSelect={onSelect} />
        </div>
      ))}
    </div>
  )
}

export function NewsTicker() {
  const news = useNews()
  const [active, setActive] = useState<NewsItem | null>(null)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mq.matches)
    const handler = () => setReduceMotion(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  if (news.length === 0) return null

  return (
    <>
      <section
        id="news-ticker"
        aria-label="Лента новостей"
        className="relative z-20 scroll-mt-24 border-y border-white/10 bg-ink/20 py-4 backdrop-blur-md lg:py-5"
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-ink/35 to-transparent lg:w-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-ink/35 to-transparent lg:w-20" />

        <div className="relative overflow-hidden">
          {reduceMotion ? (
            <div className="site-shell flex items-center gap-0 overflow-x-auto [-webkit-overflow-scrolling:touch] [scroll-snap-type:x_mandatory]">
              {news.map((item, index) => (
                <div key={item.id} className="flex shrink-0 snap-center items-center">
                  {index > 0 && <TickerDivider />}
                  <TickerCard item={item} onSelect={setActive} />
                </div>
              ))}
            </div>
          ) : (
            <div className="animate-marquee-ticker flex w-max items-center hover:[animation-play-state:paused]">
              <TickerTrack items={news} onSelect={setActive} />
              <TickerDivider />
              <TickerTrack items={news} onSelect={setActive} ariaHidden />
            </div>
          )}
        </div>
      </section>

      {active && <NewsModal item={active} onClose={() => setActive(null)} />}
    </>
  )
}
