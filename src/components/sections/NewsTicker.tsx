import { useEffect, useMemo, useState } from 'react'

import {

  getUpcomingRegulations,

  type ContestRegulation,

} from '../../data/contest-regulations'

import { getNewsImage, getRegulationImage } from '../../data/media'

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

      className="group w-[min(72vw,260px)] shrink-0 text-left sm:w-[280px]"

    >

      <div className="relative overflow-hidden rounded-xl bg-white/10 ring-1 ring-white/20 transition-transform duration-300 group-hover:scale-[1.01]">

        {imageSrc ? (

          <img

            src={imageSrc}

            alt=""

            className="aspect-[16/10] w-full object-cover"

            loading="lazy"

            decoding="async"

          />

        ) : (

          <div className="flex aspect-[16/10] w-full items-center justify-center bg-white/5">

            <span className="text-2xl opacity-40">📰</span>

          </div>

        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-3">

          <time

            dateTime={item.date}

            className="text-[11px] font-medium uppercase tracking-wide text-white/70 sm:text-xs"

          >

            {formatNewsDateShort(item.date)}

          </time>

          <p className="mt-0.5 line-clamp-2 text-sm font-medium leading-snug text-white sm:text-[15px]">

            {item.title}

          </p>

        </div>

      </div>

    </button>

  )

}



function ContestTickerCard({ item }: { item: ContestRegulation }) {

  const scrollToRegulations = () => {

    document

      .querySelector('#contest-regulations')

      ?.scrollIntoView({ behavior: 'smooth' })

  }



  return (

    <button

      type="button"

      onClick={scrollToRegulations}

      className="group w-[min(68vw,240px)] shrink-0 text-left sm:w-[260px]"

    >

      <div className="flex aspect-[16/10] flex-col justify-between rounded-xl bg-white/95 p-3 shadow-sm ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-[1.01] sm:p-3.5">

        <div className="flex items-center justify-between gap-2">

          <span className="text-[10px] font-semibold uppercase tracking-wide text-accent sm:text-[11px]">

            Афиша

          </span>

          <span className="text-[11px] text-ink-faint">{item.year}</span>

        </div>

        <div>

          <p className="text-[11px] font-medium text-ink-muted sm:text-xs">{item.dates}</p>

          <p className="mt-1 line-clamp-2 text-sm font-medium leading-snug text-ink">

            {item.title}

          </p>

        </div>

      </div>

    </button>

  )

}



function TickerGap() {

  return <span className="mx-2.5 w-2.5 shrink-0 sm:mx-3" aria-hidden />

}



type TickerEntry =

  | { kind: 'news'; item: NewsItem }

  | { kind: 'contest'; item: ContestRegulation }



function TickerTrack({

  entries,

  onSelectNews,

  ariaHidden,

}: {

  entries: TickerEntry[]

  onSelectNews: (item: NewsItem) => void

  ariaHidden?: boolean

}) {

  return (

    <div className="flex shrink-0 items-center" aria-hidden={ariaHidden}>

      {entries.map((entry, index) => (

        <div

          key={`${entry.kind}-${entry.item.id}-${ariaHidden ? 'dup' : 'main'}-${index}`}

          className="flex items-center"

        >

          {index > 0 && <TickerGap />}

          {entry.kind === 'news' ? (

            <TickerCard item={entry.item} onSelect={onSelectNews} />

          ) : (

            <ContestTickerCard item={entry.item} />

          )}

        </div>

      ))}

    </div>

  )

}



type NewsTickerProps = {

  overlay?: boolean

}



export function NewsTicker({ overlay = false }: NewsTickerProps) {

  const news = useNews()

  const upcomingContests = useMemo(() => getUpcomingRegulations(), [])

  const [active, setActive] = useState<NewsItem | null>(null)

  const [reduceMotion, setReduceMotion] = useState(false)



  const entries = useMemo<TickerEntry[]>(() => {

    const contestEntries: TickerEntry[] = upcomingContests.slice(0, 5).map((item) => ({

      kind: 'contest',

      item,

    }))

    const newsEntries: TickerEntry[] = news.slice(0, 8).map((item) => ({

      kind: 'news',

      item,

    }))



    if (contestEntries.length === 0) return newsEntries

    if (newsEntries.length === 0) return contestEntries



    const merged: TickerEntry[] = []

    const maxLen = Math.max(contestEntries.length, newsEntries.length)

    for (let i = 0; i < maxLen; i += 1) {

      if (i < contestEntries.length) merged.push(contestEntries[i])

      if (i < newsEntries.length) merged.push(newsEntries[i])

    }

    return merged

  }, [news, upcomingContests])



  useEffect(() => {

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')

    setReduceMotion(mq.matches)

    const handler = () => setReduceMotion(mq.matches)

    mq.addEventListener('change', handler)

    return () => mq.removeEventListener('change', handler)

  }, [])



  if (entries.length === 0) return null



  return (

    <>

      <div

        id="news-ticker"

        aria-label="Лента новостей и афиша конкурсов"

        className={`relative scroll-mt-24 ${

          overlay ? 'z-10 bg-transparent py-3 pb-5 sm:py-4 sm:pb-6' : 'border-y border-line bg-surface py-4'

        }`}

      >

        {overlay && (

          <>

            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-black/30 to-transparent sm:w-12" />

            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-black/30 to-transparent sm:w-12" />

          </>

        )}



        <div className="relative overflow-hidden">

          {reduceMotion ? (

            <div className="site-shell flex items-center gap-3 overflow-x-auto [-webkit-overflow-scrolling:touch] [scroll-snap-type:x_mandatory]">

              {entries.map((entry) => (

                <div key={`${entry.kind}-${entry.item.id}`} className="shrink-0 snap-center">

                  {entry.kind === 'news' ? (

                    <TickerCard item={entry.item} onSelect={setActive} />

                  ) : (

                    <ContestTickerCard item={entry.item} />

                  )}

                </div>

              ))}

            </div>

          ) : (

            <div className="animate-marquee-ticker flex w-max items-center [transform:translateZ(0)] hover:[animation-play-state:paused]">

              <TickerTrack entries={entries} onSelectNews={setActive} />

              <TickerGap />

              <TickerTrack entries={entries} onSelectNews={setActive} ariaHidden />

            </div>

          )}

        </div>

      </div>



      {active && <NewsModal item={active} onClose={() => setActive(null)} />}

    </>

  )

}


