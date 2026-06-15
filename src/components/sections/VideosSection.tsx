import { videos } from '../../data/content'
import { getVideoCovers } from '../../data/media'
import { FadeIn } from '../ui/FadeIn'
import { MediaImage } from '../ui/MediaImage'
import { SectionHeading } from '../ui/SectionHeading'

export function VideosSection() {
  const covers = getVideoCovers()

  return (
    <section id="videos" className="section-mesh desktop-full-section relative scroll-mt-24 py-14 sm:py-16 lg:py-20">
      <div className="relative w-full">
        <FadeIn>
          <SectionHeading
            eyebrow="Медиа"
            title="Золотой микрофон"
            subtitle="Видеоматериалы Артийского движения"
          />
        </FadeIn>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {videos.map((video, index) => {
            const cover = covers[index]?.src ?? null
            return (
              <FadeIn key={video.id} delay={index * 50}>
                <article className="card-interactive group overflow-hidden rounded-2xl border border-ink/5 bg-white shadow-card">
                  <div className="relative aspect-video overflow-hidden">
                    <MediaImage
                      src={cover}
                      alt={video.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      fallback={
                        <div className="h-full w-full bg-gradient-to-br from-ink via-ink-soft to-gold/40" />
                      }
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-ink/25 transition-colors group-hover:bg-ink/40">
                      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-ink shadow-glow transition-all duration-300 group-hover:scale-110">
                        <svg className="ml-1 h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    </div>
                    <span className="absolute bottom-3 left-3 rounded-lg bg-black/55 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      Часть {video.id}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-ink">{video.title}</h3>
                  </div>
                </article>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
