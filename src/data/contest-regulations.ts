export type ContestRegulation = {
  id: string
  title: string
  /** Человекочитаемые даты для карточки */
  dates: string
  /** ISO-дата начала для сортировки */
  dateStart: string
  location: string
  description: string
  nominations: string[]
  deadline?: string
  pdfUrl: string
  year: number
}

export const contestRegulations: ContestRegulation[] = [
  {
    id: 'yarche-vseh-2027',
    title: 'Международное первенство творческих коллективов «Ярче всех»',
    dates: '4–7 января 2027',
    dateStart: '2027-01-04',
    location: 'г. Нальчик, Кабардино-Балкария',
    description:
      'Новогодний международный конкурс для солистов и коллективов России и стран СНГ. Заезд 4 января, конкурс 5 января, гала-концерт и награждение 6 января.',
    nominations: [
      'инструментальное исполнительство',
      'вокал',
      'хореография',
      'декламация',
      'театр моды',
      'пленэр',
      'цирк',
    ],
    deadline: 'до начала конкурса',
    pdfUrl: '/documents/contests/yarche-vseh-2027.pdf',
    year: 2027,
  },
  {
    id: 'khrustalny-lotos-2027',
    title: 'Чемпионат Евразии «Хрустальный лотос»',
    dates: '24–27 марта 2027',
    dateStart: '2027-03-24',
    location: 'г. Элиста, Республика Калмыкия',
    description:
      'Многожанровый чемпионат искусств: вокал, инструментальное исполнительство, хореография, декламационное искусство.',
    nominations: ['вокал', 'инструмент', 'хореография', 'декламация'],
    deadline: 'до 10 марта 2027',
    pdfUrl: '/documents/contests/khrustalny-lotos-2027.pdf',
    year: 2027,
  },
  {
    id: 'elbrussky-khorofon-2027',
    title: 'II Международный конкурс-фестиваль «Эльбрусский хорофон»',
    dates: '31 марта — 3 апреля 2027',
    dateStart: '2027-03-31',
    location: 'г. Нальчик, Кабардино-Балкария',
    description:
      'Хоровой конкурс-фестиваль с мастер-классами, гала-концертом сводного хора и исполнением Гимна России на Эльбрусе.',
    nominations: ['детские хоры', 'юношеские хоры', 'женские хоры', 'смешанные хоры'],
    pdfUrl: '/documents/contests/elbrussky-khorofon-2027.pdf',
    year: 2027,
  },
  {
    id: 'ogni-dagestana-2027',
    title: 'III Международный многожанровый конкурс «Огни Дагестана»',
    dates: '30 апреля — 3 мая и 5–7 мая 2027',
    dateStart: '2027-04-30',
    location: 'с. Андреевка, Дербент — отель «Дербентские золотые пески»',
    description:
      'Многожанровый конкурс сценических искусств на берегу Каспийского моря. Конкурсные дни — 1 и 6 мая 2027.',
    nominations: ['хореография', 'вокал', 'хор', 'инструмент', 'художественное слово', 'театр'],
    deadline: 'до 20 апреля 2027',
    pdfUrl: '/documents/contests/ogni-dagestana-2027.pdf',
    year: 2027,
  },
  {
    id: 'lazurnaya-volna-2027',
    title: 'XI Международная олимпиада искусств «Лазурная волна — Сочи 2027»',
    dates: '12–17 июня 2027',
    dateStart: '2027-06-12',
    location: 'Лазаревский район, г. Сочи',
    description:
      'Олимпиада искусств на Черноморском побережье: вокал, инструментальное исполнительство, хореография, декламация.',
    nominations: ['вокал', 'инструмент', 'хореография', 'декламация'],
    deadline: 'до 25 мая 2027',
    pdfUrl: '/documents/contests/lazurnaya-volna-2027.pdf',
    year: 2027,
  },
  {
    id: 'belye-zhuravli-2026',
    title: 'I Международный конкурс «Белые журавли»',
    dates: '2–5 сентября 2026',
    dateStart: '2026-09-02',
    location: 'Хунзахский район, Дагестан — отель «Белые журавли»',
    description:
      'Конкурс чтецов и вокалистов имени Расула Гамзатова. Конкурсный день — 3 сентября 2026.',
    nominations: [
      'художественное слово',
      'вокал',
      'литературно-музыкальная композиция',
      'пленэр',
    ],
    deadline: 'до 20 августа 2026',
    pdfUrl: '/documents/contests/belye-zhuravli-2026.pdf',
    year: 2026,
  },
  {
    id: 'olimpiada-horeografii-2026',
    title: 'XXVI Международная олимпиада по хореографии',
    dates: '17–21 сентября 2026',
    dateStart: '2026-09-17',
    location: 'Лазаревский район, г. Сочи',
    description:
      'Олимпиада «Красота и доброта спасут мир!» — соло, малые формы и ансамбли во всех танцевальных жанрах.',
    nominations: ['классика', 'народный танец', 'эстрада', 'современный танец', 'хип-хоп'],
    deadline: 'до 1 сентября 2026',
    pdfUrl: '/documents/contests/olimpiada-horeografii-2026.pdf',
    year: 2026,
  },
  {
    id: 'olimpiada-horeografii-2027',
    title: 'XXVII Международная олимпиада по хореографии',
    dates: '17–21 сентября 2027',
    dateStart: '2027-09-17',
    location: 'Лазаревский район, г. Сочи',
    description:
      'Олимпиада «Красота и доброта спасут мир!» — соло, малые формы и ансамбли во всех танцевальных жанрах.',
    nominations: ['классика', 'народный танец', 'эстрада', 'современный танец', 'хип-хоп'],
    deadline: 'до 1 сентября 2027',
    pdfUrl: '/documents/contests/olimpiada-horeografii-2027.pdf',
    year: 2027,
  },
  {
    id: 'kubok-derbent-2026',
    title: 'Кубок «Танцы над древним Дербентом»',
    dates: '2–5 октября 2026',
    dateStart: '2026-10-02',
    location: 'с. Андреевка, Дербент — отель «Дербентские золотые пески»',
    description:
      'Гранд-купок по хореографии народов России и стран СНГ в рамках года «Единства народов России». Призовой фонд — 650 000 ₽.',
    nominations: ['хореография'],
    pdfUrl: '/documents/contests/kubok-derbent-2026.pdf',
    year: 2026,
  },
  {
    id: 'sozvezdie-druzhby-2026',
    title: 'XI Международный конкурс «Созвездие дружбы»',
    dates: '23–26 октября 2026',
    dateStart: '2026-10-23',
    location: 'г. Нальчик, Кабардино-Балкария',
    description:
      'Многожанровый конкурс: заезд 23 октября, конкурс 24 октября, гала-концерт и награждение 25 октября.',
    nominations: [
      'инструмент',
      'вокал',
      'хореография',
      'театр моды',
      'декламация',
      'пленэр',
    ],
    deadline: 'до 18 октября 2026',
    pdfUrl: '/documents/contests/sozvezdie-druzhby-2026.pdf',
    year: 2026,
  },
  {
    id: 'plener-derbent-2026',
    title: 'I Международный пленэр-конкурс «Золотые краски древнего Дербента»',
    dates: '27 октября — 1 ноября 2026',
    dateStart: '2026-10-27',
    location: 'г. Дербент — отель «Дербентские золотые пески»',
    description:
      'Пленэр-конкурс молодых художников: изобразительное творчество и декоративно-прикладное искусство.',
    nominations: ['живопись и графика', 'декоративно-прикладное искусство'],
    deadline: 'до 10 октября 2026',
    pdfUrl: '/documents/contests/plener-derbent-2026.pdf',
    year: 2026,
  },
  {
    id: 'artiada-2026',
    title: 'III Международный конкурс «Артиада народов России и стран СНГ»',
    dates: '17–20 декабря 2026',
    dateStart: '2026-12-17',
    location: 'г. Москва — ГК «Измайлово», Театр мимики и жеста',
    description:
      'Артийские сценические игры в предновогодней Москве: конкурс, гала-концерт, экскурсия в «Национальный центр Россия».',
    nominations: [
      'инструмент',
      'вокал',
      'хореография',
      'театр моды',
      'декламация',
      'пленэр',
      'цирк',
    ],
    pdfUrl: '/documents/contests/artiada-2026.pdf',
    year: 2026,
  },
  {
    id: 'artiada-2027',
    title: 'IV Международный конкурс «Артиада народов России и стран СНГ»',
    dates: '17–20 декабря 2027',
    dateStart: '2027-12-17',
    location: 'г. Москва — ГК «Измайлово», Театр мимики и жеста',
    description:
      'Артийские сценические игры в предновогодней Москве: конкурс, гала-концерт, экскурсия в «Национальный центр Россия».',
    nominations: [
      'инструмент',
      'вокал',
      'хореография',
      'театр моды',
      'декламация',
      'пленэр',
      'цирк',
    ],
    pdfUrl: '/documents/contests/artiada-2027.pdf',
    year: 2027,
  },
].sort((a, b) => a.dateStart.localeCompare(b.dateStart))

/** Ближайшие конкурсы для бегущей строки (от текущей даты) */
export function getUpcomingRegulations(from = new Date()): ContestRegulation[] {
  const today = from.toISOString().slice(0, 10)
  return contestRegulations.filter((r) => r.dateStart >= today)
}

export function groupRegulationsByYear(
  items: ContestRegulation[] = contestRegulations,
): { year: number; items: ContestRegulation[] }[] {
  const years = [...new Set(items.map((r) => r.year))].sort()
  return years.map((year) => ({
    year,
    items: items.filter((r) => r.year === year),
  }))
}
