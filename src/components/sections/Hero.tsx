import { site } from '../../data/content'
import { getHeroImage } from '../../data/media'
import { Button } from '../ui/Button'
import { FadeIn } from '../ui/FadeIn'
import { NewsTicker } from './NewsTicker'

type HeroProps = {
  onParticipateClick: () => void
}

export function Hero({ onParticipateClick }: HeroProps) {
  const heroSrc = getHeroImage()

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative overflow-hidden bg-ink">
      <div className="absolute inset-0" aria-hidden>
        {heroSrc ? (
          <img
            src={heroSrc}
            alt=""
            className="h-full w-full object-cover object-center opacity-90"
            fetchPriority="high"
            decoding="async"
          />
        ) : (
          <div className="h-full w-full bg-surface" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
      </div>

      <div className="site-shell relative flex min-h-[52vh] flex-col justify-end pb-4 pt-24 sm:min-h-[68vh] sm:pb-6 sm:pt-32">
        <FadeIn>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-white/70 sm:text-sm">
            Мировое Артийское Движение · с 1991 года
          </p>
        </FadeIn>

        <FadeIn delay={60}>
          <h1 className="mt-3 max-w-4xl text-left text-[1.5rem] font-bold leading-[1.15] tracking-tight text-white sm:mt-4 sm:text-3xl lg:text-[2.5rem]">
            <span className="block">Мировой Артийский Комитет</span>
            <span className="block mt-2 text-gold">Евразийский континентальный Артийский Комитет</span>
            <span className="block mt-2">Национальный Артийский комитет России</span>
          </h1>
        </FadeIn>

        <FadeIn delay={120}>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80 sm:mt-4 sm:text-lg">
            {site.motto}
          </p>
        </FadeIn>

        <FadeIn delay={180}>
          <div className="mt-5 flex flex-wrap items-center gap-2.5 sm:mt-8 sm:gap-3">
            <Button
              variant="accent"
              className="min-h-10 rounded-full px-5 text-sm sm:min-h-11 sm:px-7"
              onClick={onParticipateClick}
            >
              Подать заявку
            </Button>
            <button
              type="button"
              onClick={() => scrollTo('#contest-regulations')}
              className="inline-flex min-h-10 items-center rounded-full border border-white/30 px-5 text-sm font-medium text-white transition-colors hover:bg-white/10 sm:min-h-11 sm:px-6"
            >
              Положения
            </button>
            <button
              type="button"
              onClick={() => scrollTo('#calendar')}
              className="inline-flex min-h-10 items-center rounded-full px-4 text-sm font-medium text-white/80 transition-colors hover:text-white sm:min-h-11 sm:px-5"
            >
              Календарь →
            </button>
          </div>
        </FadeIn>
      </div>

      <NewsTicker overlay />
    </section>
  )
}