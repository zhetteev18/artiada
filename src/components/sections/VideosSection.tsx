import { videos } from '../../data/content'
import { getVideoCovers } from '../../data/media'
import { FadeIn } from '../ui/FadeIn'
import { MediaImage } from '../ui/MediaImage'
import { SectionHeading } from '../ui/SectionHeading'

export function VideosSection() {
  const covers = getVideoCovers()

  return (
    <section id="videos" className="scroll-mt-24 bg-white py-14 sm:py-16 lg:py-20">
      <div className="w-full">
        <FadeIn>
          <SectionHeading
            eyebrow="Медиа"
            title="Золотой микрофон"
            subtitle="Видеоматериалы Артийского движения"
          />
        </FadeIn>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {videos.map((video, index) => {
            const cover = covers[index]?.src ?? null
            return (
              <FadeIn key={video.id} delay={index * 40}>
                <article className="apple-card overflow-hidden">
                  <div className="relative aspect-video overflow-hidden bg-surface">
                    <MediaImage
                      src={cover}
                      alt={video.title}
                      className="h-full w-full object-cover"
                      fallback={
                        <div className="h-full w-full bg-ink/5" />
                      }
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink shadow-sm">
                        <svg className="ml-0.5 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    </div>
                    <span className="absolute bottom-3 left-3 rounded-md bg-black/60 px-2 py-1 text-xs font-medium text-white">
                      Часть {video.id}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-ink">{video.title}</h3>
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
