import { ParticipationForm } from '../forms/ParticipationForm'

export function FormSidebar() {
  return (
    <aside className="hidden xl:block" aria-label="Форма участия">
      <div className="sticky top-24 w-[300px] pt-2 2xl:top-28 2xl:w-[320px]">
        <ParticipationForm variant="sidebar" />
      </div>
    </aside>
  )
}
