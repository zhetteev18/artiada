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
      className="scroll-mt-24 bg-white py-14 sm:py-16 lg:py-20"
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
              <article className="apple-card h-full p-6">
                <div className="flex items-start justify-between gap-4">
                  <time
                    dateTime={event.date}
                    className="text-sm font-medium tabular-nums text-ink-muted"
                  >
                    {formatDate(event.date)}
                  </time>
                  <span className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-ink-muted">
                    {statusLabels[event.status] ?? event.status}
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-semibold leading-tight text-ink">
                  {event.title}
                </h3>
                <p className="mt-2 text-sm font-medium text-accent">{event.place}</p>
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
