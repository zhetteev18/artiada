import { useCallback, useEffect, useState } from 'react'
import { galleryImagePath, galleryImages } from '../../data/media'
import { FadeIn } from '../ui/FadeIn'
import { SectionHeading } from '../ui/SectionHeading'

export function GallerySection() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  const close = useCallback(() => setLightbox(null), [])

  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight')
        setLightbox((i) => (i === null ? null : Math.min(i + 1, galleryImages.length)))
      if (e.key === 'ArrowLeft')
        setLightbox((i) => (i === null ? null : Math.max(i - 1, 1)))
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [lightbox, close])

  return (
    <section id="gallery" className="desktop-full-section scroll-mt-24 bg-white/50 py-14 sm:py-16 lg:py-20">
      <div className="w-full">
        <FadeIn>
          <SectionHeading
            eyebrow="События"
            title="Галерея"
            subtitle="Конкурсы, фестивали и мероприятия Артийского движения"
          />
        </FadeIn>

        {galleryImages.length === 0 ? (
          <p className="text-center text-sm text-ink-muted">
            Добавьте фото в <code className="text-xs">public/images/gallery/</code> или через{' '}
            <a href="/admin" className="font-semibold text-gold underline-offset-2 hover:underline">
              админ-панель
            </a>
          </p>
        ) : (
          <div className="columns-2 gap-3 sm:columns-3 lg:columns-4 lg:gap-4">
            {galleryImages.map((item, index) => (
              <FadeIn
                key={item.id}
                delay={(index % 8) * 30}
                className="mb-3 break-inside-avoid lg:mb-4"
              >
                <button
                  type="button"
                  className="group relative w-full overflow-hidden rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  onClick={() => setLightbox(item.id)}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-105"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-ink/0 transition-all duration-500 group-hover:bg-ink/35">
                    <span className="flex h-12 w-12 scale-75 items-center justify-center rounded-full bg-white/90 text-xl text-ink opacity-0 shadow-lg transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                      +
                    </span>
                  </span>
                </button>
              </FadeIn>
            ))}
          </div>
        )}
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[70] flex animate-[fadeIn_0.25s_ease-out] items-center justify-center bg-ink/92 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр фото"
          onClick={close}
        >
          <button
            type="button"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            onClick={close}
            aria-label="Закрыть"
          >
            ✕
          </button>
          {lightbox > 1 && (
            <button
              type="button"
              className="absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition-transform hover:scale-110 sm:left-6"
              onClick={(e) => {
                e.stopPropagation()
                setLightbox((i) => (i === null ? null : i - 1))
              }}
              aria-label="Предыдущее фото"
            >
              ‹
            </button>
          )}
          {lightbox < galleryImages.length && (
            <button
              type="button"
              className="absolute right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition-transform hover:scale-110 sm:right-6"
              onClick={(e) => {
                e.stopPropagation()
                setLightbox((i) => (i === null ? null : i + 1))
              }}
              aria-label="Следующее фото"
            >
              ›
            </button>
          )}
          <img
            src={galleryImagePath(lightbox)}
            alt={`Артиада — фото ${lightbox}`}
            className="max-h-[90vh] max-w-full rounded-2xl object-contain shadow-2xl ring-1 ring-white/10"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white/90 backdrop-blur-md">
            {lightbox} / {galleryImages.length}
          </p>
        </div>
      )}
    </section>
  )
}
