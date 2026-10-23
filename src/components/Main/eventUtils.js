export function formatEventDate(date) {
  const eventDate = new Date(date + 'T00:00:00')
  return eventDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
}

export function getCategoryName(category) {
  if (category === 'concert') return 'Концерт'
  if (category === 'cinema') return 'Кино'
  if (category === 'sport') return 'Спорт'
  return 'Для детей'
}

export function getPriceNumber(price) {
  const number = price.replace(/\D/g, '')
  return number ? Number(number) : 0
}
