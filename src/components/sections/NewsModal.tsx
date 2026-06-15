import { useEffect, useState } from 'react'
import { getNewsImages } from '../../data/media'
import type { NewsItem } from '../../data/news'
import { formatNewsDate } from '../../utils/newsFormat'

type NewsModalProps = {
  item: NewsItem
  onClose: () => void
}

export function NewsModal({ item, onClose }: NewsModalProps) {
  const images = getNewsImages(item.slug)
  const [photoIndex, setPhotoIndex] = useState(0)

  useEffect(() => {
    setPhotoIndex(0)
  }, [item.slug])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const currentImage = images[photoIndex] ?? images[0]

  return (
    <div
      className="fixed inset-0 z-[65] flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="news-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 animate-[fadeIn_0.3s_ease-out] bg-ink/70 backdrop-blur-md"
        aria-label="Закрыть"
        onClick={onClose}
      />
      <div className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white shadow-2xl animate-[slideUp_0.4s_ease-out] sm:rounded-3xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink shadow-md hover:bg-white"
          aria-label="Закрыть"
        >
          ✕
        </button>
        {currentImage && (
          <div className="relative aspect-video w-full overflow-hidden bg-ink/5">
            <img src={currentImage} alt="" className="h-full w-full object-cover" />
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-transform hover:scale-110"
                  onClick={() => setPhotoIndex((i) => (i <= 0 ? images.length - 1 : i - 1))}
                  aria-label="Предыдущее фото"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-transform hover:scale-110"
                  onClick={() => setPhotoIndex((i) => (i >= images.length - 1 ? 0 : i + 1))}
                  aria-label="Следующее фото"
                >
                  ›
                </button>
                <p className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-sm">
                  {photoIndex + 1} / {images.length}
                </p>
              </>
            )}
          </div>
        )}
        <div className="p-6 sm:p-8">
          <time dateTime={item.date} className="text-xs font-bold uppercase tracking-wider text-gold">
            {formatNewsDate(item.date)}
          </time>
          <h2 id="news-modal-title" className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
            {item.title}
          </h2>
          <div className="mt-4 space-y-3 whitespace-pre-line text-base leading-relaxed text-ink-muted">
            {item.body}
          </div>
          {images.length > 1 && (
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setPhotoIndex(i)}
                  className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                    i === photoIndex
                      ? 'border-gold shadow-glow'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
          {item.sourceUrl && (
            <a
              href={item.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block text-sm text-ink-muted underline-offset-2 hover:text-gold hover:underline"
            >
              Архивная ссылка
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
