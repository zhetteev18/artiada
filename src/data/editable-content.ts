export type FestivalEvent = {
  id: string
  title: string
  date: string
  place: string
  description: string
  status: 'planned' | 'open' | 'done'
}

export type ContestResult = {
  id: string
  title: string
  date: string
  nomination: string
  winners: string
  description: string
}

export const fallbackFestivalCalendar: FestivalEvent[] = [
  {
    id: 'nalchik-2026',
    title: 'Международный конкурс «Нальчик — подкова счастья»',
    date: '2026-05-01',
    place: 'Нальчик',
    description: 'Календарь можно редактировать в админ-панели.',
    status: 'planned',
  },
]

export const fallbackContestResults: ContestResult[] = [
  {
    id: 'sample-result',
    title: 'Итоги конкурсов',
    date: '2026-01-01',
    nomination: 'Общая номинация',
    winners: 'Добавьте победителей через админ-панель',
    description: 'Здесь будут опубликованы результаты конкурсов и фестивалей.',
  },
]
