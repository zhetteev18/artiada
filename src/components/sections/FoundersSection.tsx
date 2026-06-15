import { founders } from '../../data/content'
import { getCofounderDocs, getPersonImage } from '../../data/media'
import { FadeIn } from '../ui/FadeIn'
import { MediaImage } from '../ui/MediaImage'
import { SectionHeading } from '../ui/SectionHeading'

export function FoundersSection() {
  const cofounderDocs = getCofounderDocs()

  return (
    <section id="founders" className="desktop-full-section scroll-mt-24 py-14 sm:py-16 lg:py-20">
      <div className="w-full">
        <FadeIn>
          <SectionHeading eyebrow="Руководство" title="Наши соучредители" />
        </FadeIn>

        <div className="space-y-10">
          {founders.map((founder, index) => (
            <FadeIn key={founder.id} delay={index * 80}>
              <article className="card-interactive overflow-hidden rounded-3xl border border-ink/5 bg-white shadow-card">
                <div className="grid lg:grid-cols-12">
                  <div className="group relative flex min-h-[320px] items-center justify-center overflow-hidden bg-gradient-to-br from-surface to-white p-3 lg:col-span-4 lg:min-h-[420px] lg:p-5">
                    <MediaImage
                      src={getPersonImage(founder.id as 'tarbokov' | 'betuaganov')}
                      alt={founder.name}
                      className="max-h-[420px] w-full object-contain object-center transition-transform duration-700 group-hover:scale-[1.02] lg:max-h-[560px]"
                      fallback={
                        <span className="font-display text-6xl font-bold text-gold/30">
                          {founder.name
                            .split(' ')
                            .map((w) => w[0])
                            .slice(0, 2)
                            .join('')}
                        </span>
                      }
                    />
                  </div>
                  <div className="flex flex-col justify-center p-6 sm:p-10 lg:col-span-8">
                    <h3 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                      {founder.name}
                    </h3>
                    <p className="mt-2 text-sm font-bold uppercase tracking-wider text-gold">
                      {founder.role}
                    </p>
                    <p className="mt-5 whitespace-pre-line text-base leading-relaxed text-ink-muted">
                      {founder.message}
                    </p>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <h3 className="mb-8 mt-16 text-center text-sm font-bold uppercase tracking-[0.2em] text-ink-muted">
            Документы и творческие союзы — соучредители фестиваля
          </h3>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {cofounderDocs.map((doc, index) => (
              <FadeIn key={doc.id} delay={index * 50}>
                {doc.src ? (
                  <a
                    href={doc.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-interactive group block overflow-hidden rounded-2xl border border-ink/5 bg-white shadow-card"
                  >
                    <div className="aspect-[3/4] overflow-hidden bg-surface p-2">
                      <img
                        src={doc.src}
                        alt={doc.title}
                        loading="lazy"
                        className="h-full w-full object-contain object-center transition-transform duration-700 group-hover:scale-[1.02]"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-sm font-semibold text-ink group-hover:text-gold-dark">
                        {doc.title}
                      </p>
                      <p className="mt-1 text-xs text-ink-muted">{doc.subtitle}</p>
                    </div>
                  </a>
                ) : (
                  <div className="overflow-hidden rounded-2xl border border-dashed border-ink/15 bg-white/80 p-4">
                    <MediaImage
                      src={null}
                      alt={doc.title}
                      className="aspect-[3/4] w-full rounded-xl"
                    />
                    <p className="mt-3 text-sm font-semibold text-ink">{doc.title}</p>
                    <p className="mt-1 text-xs text-ink-muted">{doc.subtitle}</p>
                  </div>
                )}
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
