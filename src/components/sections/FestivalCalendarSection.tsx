import {
  fallbackFestivalCalendar,
  type FestivalEvent,
} from '../../data/editable-content'
import { useEditableContent } from '../../hooks/useEditableContent'
import { FadeIn } from '../ui/FadeIn'
import { SectionHeading } from '../ui/SectionHeading'

const statusLabels: Record<FestivalEvent['status'], string> = {
  planned: 'Планируется',
  open: 'Приём заявок',
  done: 'Завершено',
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return iso
  }
}

export function FestivalCalendarSection() {
  const events = useEditableContent<FestivalEvent>(
    '/content/festival-calendar.json',
    fallbackFestivalCalendar,
  )

  return (
    <section
      id="calendar"
      className="desktop-full-section scroll-mt-24 border-t border-ink/5 py-14 sm:py-16 lg:py-20"
    >
      <div className="w-full">
        <FadeIn>
          <SectionHeading
            eyebrow="Афиша"
            title="Календарь фестивалей"
            subtitle="Ближайшие конкурсы, фестивали и олимпиады Артийского движения"
          />
        </FadeIn>

        <div className="grid gap-5 lg:grid-cols-3">
          {events.map((event, index) => (
            <FadeIn key={event.id} delay={index * 60}>
              <article className="card-interactive h-full rounded-2xl border border-ink/5 bg-white p-6 shadow-card">
                <div className="flex items-start justify-between gap-4">
                  <time
                    dateTime={event.date}
                    className="rounded-xl bg-gold/10 px-3 py-2 text-sm font-bold text-gold-dark"
                  >
                    {formatDate(event.date)}
                  </time>
                  <span className="rounded-full bg-ink/5 px-3 py-1 text-xs font-semibold text-ink-muted">
                    {statusLabels[event.status] ?? event.status}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-semibold leading-tight text-ink">
                  {event.title}
                </h3>
                <p className="mt-2 text-sm font-semibold text-gold">{event.place}</p>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                  {event.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
