import { committees, site } from '../../data/content'
import { getHeroImage } from '../../data/media'
import { Button } from '../ui/Button'
import { FadeIn } from '../ui/FadeIn'

type HeroProps = {
  onParticipateClick: () => void
}

const stats = [
  { value: '1991', label: 'год основания' },
  { value: '17+', label: 'новостей и событий' },
  { value: '∞', label: 'искусство без границ' },
]

export function Hero({ onParticipateClick }: HeroProps) {
  const heroSrc = getHeroImage()

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative min-h-[75vh] overflow-hidden lg:min-h-[85vh]">
      <div className="absolute inset-0 -z-10" aria-hidden>
        {heroSrc ? (
          <img
            src={heroSrc}
            alt=""
            className="h-full w-full animate-ken-burns object-cover object-center"
            fetchPriority="high"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-ink via-ink-soft to-gold/30" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/55 to-ink/95" />
        <div className="absolute inset-0 bg-gradient-to-tr from-gold/10 via-transparent to-transparent" />
      </div>

      <div className="site-shell flex min-h-[75vh] flex-col justify-center py-24 lg:min-h-[85vh] lg:py-32">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16 xl:gap-20">
          <div>
            <FadeIn>
              <p className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white/95 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
                </span>
                Мировое Артийское Движение с 1991 года
              </p>
            </FadeIn>

            <FadeIn delay={80}>
              <h1 className="max-w-3xl font-display text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-[3.5rem]">
                <span className="block">Мировой и Российский</span>
                <span className="mt-1 block bg-gradient-to-r from-gold-light via-gold to-white/95 bg-clip-text text-transparent">
                  Артийский комитет
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={160}>
              <ul className="mt-7 flex max-w-2xl flex-col gap-2.5 lg:mt-8">
                {committees.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-base text-white/90 lg:text-lg">
                    <span className="mt-2.5 h-1.5 w-5 shrink-0 rounded-full bg-gradient-to-r from-gold to-gold-light" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn delay={220}>
              <blockquote className="mt-7 max-w-xl rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm lg:mt-8">
                <p className="font-display text-xl font-medium italic leading-snug text-white lg:text-2xl">
                  «{site.motto}»
                </p>
              </blockquote>
            </FadeIn>

            <FadeIn delay={300}>
              <div className="mt-8 flex flex-wrap gap-3 lg:mt-10">
                <Button variant="gold" onClick={onParticipateClick}>
                  Принять участие
                </Button>
                <Button
                  variant="secondary"
                  className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                  onClick={() => scrollTo('#about')}
                >
                  Узнать больше
                </Button>
                <button
                  type="button"
                  className="inline-flex min-h-11 items-center rounded-xl px-4 text-sm font-semibold text-white/75 transition-colors hover:text-gold-light"
                  onClick={() => scrollTo('#gallery')}
                >
                  Галерея →
                </button>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={200} className="hidden lg:block">
            <div className="grid w-[280px] gap-4 xl:w-[300px]">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-white/15 bg-white/5 px-6 py-5 text-center backdrop-blur-sm"
                >
                  <p className="font-display text-4xl font-bold text-gold-light">{s.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-white/60">{s.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Статистика на планшете/телефоне */}
        <FadeIn delay={380} className="mt-10 grid grid-cols-3 gap-3 lg:hidden">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-white/15 bg-white/5 px-2 py-3 text-center backdrop-blur-sm sm:px-4 sm:py-4"
            >
              <p className="font-display text-2xl font-bold text-gold-light sm:text-3xl">{s.value}</p>
              <p className="mt-0.5 text-[10px] uppercase tracking-wider text-white/60 sm:text-xs">
                {s.label}
              </p>
            </div>
          ))}
        </FadeIn>
      </div>

      <button
        type="button"
        onClick={() => scrollTo('#news-ticker')}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/50 transition-colors hover:text-white sm:flex lg:bottom-8"
        aria-label="Прокрутить к новостям"
      >
        <span className="text-[10px] uppercase tracking-widest">Листайте</span>
        <span className="flex h-10 w-6 justify-center rounded-full border border-white/30 p-1">
          <span className="h-2 w-1 animate-float rounded-full bg-gold" />
        </span>
      </button>
    </section>
  )
}
