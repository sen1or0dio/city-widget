export interface CityEvent {
  id: number
  category: 'concert' | 'cinema' | 'sport' | 'children'
  popularity: number
  date: string
  title: string
  venue: string
  startTime: string
  price: string
}

const today = new Date().toISOString().slice(0, 10)

export const events: CityEvent[] = [
  { id: 1, category: 'children', popularity: 92, date: today, title: 'Король-олень', venue: 'Русский театр им. М. Горького', startTime: '17:00', price: 'от 700 ₽' },
  { id: 2, category: 'children', popularity: 84, date: '2026-10-25', title: 'Золотая антилопа', venue: 'Дагестанский театр кукол', startTime: '11:00', price: 'от 350 ₽' },
  { id: 3, category: 'cinema', popularity: 72, date: '2026-10-26', title: 'Материнское поле', venue: 'Лакский театр им. Э. Капиева', startTime: '15:00', price: 'от 400 ₽' },
  { id: 4, category: 'concert', popularity: 95, date: today, title: 'Концерт к 120-летию Дмитрия Шостаковича', venue: 'Кумыкский театр им. А. Салаватова', startTime: '18:30', price: 'Цена на сайте' },
  { id: 5, category: 'concert', popularity: 98, date: '2026-11-06', title: 'SHAMAN. 30 лет на сцене', venue: 'Дом дружбы', startTime: '19:00', price: 'от 2 500 ₽' },
  { id: 6, category: 'concert', popularity: 77, date: '2026-11-08', title: 'Ринат Каримов', venue: 'Дом дружбы', startTime: '19:00', price: 'от 1 500 ₽' },
  { id: 7, category: 'concert', popularity: 89, date: '2026-11-10', title: 'Майкл. Легенда. Шоу с оркестром', venue: 'Дом дружбы', startTime: '19:00', price: 'от 1 500 ₽' },
  { id: 8, category: 'concert', popularity: 91, date: '2026-11-12', title: 'Симфония Майкла Джексона при свечах', venue: 'Кумыкский театр им. А. Салаватова', startTime: '19:00', price: 'от 1 900 ₽' },
  { id: 9, category: 'cinema', popularity: 80, date: today, title: 'Большой семейный кинопоказ', venue: 'Кинотеатр «Россия»', startTime: '16:00', price: 'от 300 ₽' },
  { id: 10, category: 'cinema', popularity: 68, date: '2026-11-16', title: 'Вечер короткометражного кино', venue: 'Дом дружбы', startTime: '18:30', price: 'Бесплатно' },
  { id: 11, category: 'sport', popularity: 86, date: today, title: 'Городской турнир по мини-футболу', venue: 'Дворец спорта имени Али Алиева', startTime: '12:00', price: 'Бесплатно' },
  { id: 12, category: 'sport', popularity: 75, date: '2026-11-21', title: 'Открытый забег «Каспийская миля»', venue: 'Родопский бульвар', startTime: '09:00', price: 'от 500 ₽' },
]
