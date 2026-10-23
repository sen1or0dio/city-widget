import { useEffect, useState } from 'react'
import { getPriceNumber } from './eventUtils'
import EventCard from './EventCard'
import EventModal from './EventModal'
import SectionTitle from './SectionTitle'
import styles from './style.module.css'

export default function EventsSection({ events, eventsLoading, eventsError, retryEvents, favorites, setFavorites }) {
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [category, setCategory] = useState('all')
  const [sortType, setSortType] = useState('all')
  const filteredEvents = events.filter((event) => {
    const text = searchText.toLowerCase()
    const found = event.title.toLowerCase().includes(text) || event.venue.toLowerCase().includes(text)
    const correctCategory = category === 'all' || event.category === category

    return found && correctCategory
  }).sort((firstEvent, secondEvent) => {
    if (sortType === 'price') return getPriceNumber(firstEvent.price) - getPriceNumber(secondEvent.price)
    if (sortType === 'popular') return secondEvent.popularity - firstEvent.popularity
    if (sortType === 'all') return 0
    const dateComparison = firstEvent.date.localeCompare(secondEvent.date)
    return dateComparison || firstEvent.startTime.localeCompare(secondEvent.startTime)
  })

  function toggleFavorite(id) {
    let newFavorites

    if (favorites.includes(id)) {
      newFavorites = favorites.filter((eventId) => eventId !== id)
    } else {
      newFavorites = [...favorites, id]
    }

    setFavorites(newFavorites)
  }

  useEffect(() => {
    const items = document.querySelectorAll('#events .reveal')
    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('visible'))
      return
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.target.classList.toggle('visible', entry.isIntersecting))
    }, { threshold: 0.1 })
    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  })

  return (
    <>
      <section className={styles.section} id="events">
        <div className={styles.container}>
          <SectionTitle label="Афиша">Все события</SectionTitle>

          <div className={`${styles.eventFilters} themeCard reveal`}>
            <input
              type="text"
              placeholder="Поиск по названию или месту"
              aria-label="Поиск событий"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />

            <select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Категория события">
              <option value="all">Все события</option>
              <option value="concert">Концерты</option>
              <option value="cinema">Кино</option>
              <option value="sport">Спорт</option>
              <option value="children">Для детей</option>
            </select>

            <select value={sortType} onChange={(event) => setSortType(event.target.value)} aria-label="Сортировка событий">
              <option value="all">Все события</option>
              <option value="time">По времени</option>
              <option value="price">По цене</option>
              <option value="popular">По популярности</option>
            </select>
          </div>

          <div className={styles.events}>
            {eventsLoading && <div className={styles.eventLoading}><span className={styles.spinner}></span><p>Загружаем события...</p></div>}

            {eventsError && !eventsLoading && (
              <div className={styles.eventError}>
                <p>{eventsError}</p>
                <button onClick={retryEvents}>Повторить</button>
              </div>
            )}

            {!eventsLoading && !eventsError && !filteredEvents.length && <p className="themeMutedText">Ничего не найдено</p>}

            {!eventsLoading && !eventsError && filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} isFavorite={favorites.includes(event.id)} onSelect={setSelectedEvent} onToggleFavorite={toggleFavorite} />
            ))}
          </div>
        </div>
      </section>
      {selectedEvent && <EventModal event={selectedEvent} isFavorite={favorites.includes(selectedEvent.id)} onToggleFavorite={toggleFavorite} onClose={() => setSelectedEvent(null)} />}
    </>
  )
}
