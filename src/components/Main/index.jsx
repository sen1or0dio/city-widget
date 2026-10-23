import { useEffect, useState } from 'react'
import styles from './style.module.css'

const services = [
  {
    title: 'Транспорт', text: 'Маршруты и расписание', icon: '/transport-icon.svg',
    organization: 'Министерство транспорта Республики Дагестан',
    address: 'проспект Имама Шамиля, 1Б', phone: '+7 (8722) 60-91-60', hours: 'Пн–Пт, 9:00–18:00',
  },
  {
    title: 'ЖКХ', text: 'Оплата и обращения', icon: '/home-icon.svg',
    organization: 'Министерство строительства и ЖКХ Республики Дагестан',
    address: 'проспект Имама Шамиля, 58', phone: '+7 (8722) 51-73-21', hours: 'Пн–Пт, 9:00–18:00',
  },
  {
    title: 'Здоровье', text: 'Больницы и аптеки', icon: '/health-icon.svg',
    organization: 'Городская клиническая больница Махачкалы',
    address: 'улица Лаптиева, 89', phone: '122 или +7 (8722) 55-37-62', hours: 'Ежедневно',
  },
  {
    title: 'Образование', text: 'Школы и детские сады', icon: '/education-icon.svg',
    organization: 'Управление образования Махачкалы',
    address: 'улица Магомеда Ярагского, 53', phone: '+7 (8722) 67-06-08', hours: 'Пн–Пт, 9:00–18:00',
  },
]

const stats = [
  ['625 тыс.', 'жителей'],
  ['3', 'городских района'],
  ['134 978', 'музейных экспонатов'],
  ['121', 'городской маршрут'],
]

const places = [
  ['/home-icon.svg', 'Администрация Махачкалы', 'площадь Ленина, 2', 'Пн–Пт, 9:00–18:00'],
  ['/education-icon.svg', 'МФЦ Республики Дагестан', 'проспект Насрутдинова, 1', 'Государственные услуги'],
  ['/health-icon.svg', 'Национальный музей им. А. Тахо-Годи', 'улица Даниялова, 31', 'Вт–Вс, 10:00–18:00'],
]

function Title({ label, children }) {
  return <div className={styles.title}><span>{label}</span><h2>{children}</h2></div>
}

function formatEventDate(date) {
  const eventDate = new Date(date + 'T00:00:00')
  return eventDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
}

function getCategoryName(category) {
  if (category === 'concert') return 'Концерт'
  if (category === 'cinema') return 'Кино'
  if (category === 'sport') return 'Спорт'
  return 'Для детей'
}

function getPriceNumber(price) {
  const number = price.replace(/\D/g, '')
  return number ? Number(number) : 0
}

export default function Main({ favorites, setFavorites }) {
  const [events, setEvents] = useState([])
  const [eventsError, setEventsError] = useState('')
  const [eventsLoading, setEventsLoading] = useState(true)
  const [eventIndex, setEventIndex] = useState(0)
  const [service, setService] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [category, setCategory] = useState('all')
  const [sortType, setSortType] = useState('all')
  const currentEvent = events[eventIndex]

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

  function loadEvents() {
    fetch('/api/events')
      .then((response) => {
        if (!response.ok) throw new Error('Ошибка событий')
        return response.json()
      })
      .then((data) => {
        setEvents(data)
        setEventsLoading(false)
      })
      .catch(() => {
        setEventsError('Не удалось загрузить события')
        setEventsLoading(false)
      })
  }

  useEffect(() => {
    loadEvents()
  }, [])

  function retryEvents() {
    setEventsLoading(true)
    setEventsError('')
    loadEvents()
  }

  function toggleFavorite(id) {
    let newFavorites

    if (favorites.includes(id)) {
      newFavorites = favorites.filter((eventId) => eventId !== id)
    } else {
      newFavorites = [...favorites, id]
    }

    setFavorites(newFavorites)
  }

  function previousEvent() {
    if (eventIndex === 0) {
      setEventIndex(events.length - 1)
    } else {
      setEventIndex(eventIndex - 1)
    }
  }

  function nextEvent() {
    if (eventIndex === events.length - 1) {
      setEventIndex(0)
    } else {
      setEventIndex(eventIndex + 1)
    }
  }

  return (
    <main>
      <section className={styles.hero} id="city">
        <div className={styles.container}>
          <div>
            <span className={styles.label}>Столица Дагестана</span>
            <h1>Махачкала — город у Каспийского моря</h1>
            <p>Новости, городские услуги и актуальная афиша в одном месте.</p>
            <a className={styles.mainButton} href="#services">Все услуги</a>
          </div>
          <div className={styles.map}>
            <div className={styles.mapTitle}>
              <strong>Махачкала</strong>
              <a href="https://www.openstreetmap.org/?mlat=42.9849&mlon=47.5047#map=13/42.9849/47.5047" target="_blank" rel="noreferrer">Открыть карту ↗</a>
            </div>
            <iframe title="Карта Махачкалы" src="https://www.openstreetmap.org/export/embed.html?bbox=47.415%2C42.935%2C47.595%2C43.035&layer=mapnik&marker=42.9849%2C47.5047" loading="lazy" />
          </div>
        </div>
      </section>

      <section className={styles.overview}>
        <div className={`${styles.container} ${styles.overviewGrid}`}>
          <div className={`${styles.cityCard} themeCard`}>
            <div className={styles.cityTitle}>
              <Title label="Город у Каспия">Коротко о Махачкале</Title>
              <span className={styles.badge}>Основана в 1857 году</span>
            </div>
            <p className="themeMutedText">Столица Дагестана и крупный центр Северного Кавказа между предгорьями и побережьем Каспийского моря.</p>
            <article className={styles.mayor}>
              <div>
                <small>Глава города</small>
                <h3>Джамбулат Шапиевич Салавов</h3>
                <p>Избран 9 октября 2025 года. Ранее возглавлял Минтранс Дагестана.</p>
                <a href="https://mhkgorsobr.ru/2025/12/25/5422/" target="_blank" rel="noreferrer">Официальная информация ↗</a>
              </div>
            </article>
            <div className={styles.stats}>
              {stats.map(([number, text]) => <div key={text}><strong>{number}</strong><span className="themeMutedText">{text}</span></div>)}
            </div>
          </div>

          <div className={`${styles.slider} themeCard`}>
            <div className={styles.sliderTop}><span>Лента событий</span><span>{events.length ? `${eventIndex + 1} / ${events.length}` : ''}</span></div>
            <div className={`${styles.slide} themeCard`}>
              {currentEvent ? <>
                <span>{formatEventDate(currentEvent.date)}</span>
                <h2>{currentEvent.title}</h2>
                <p>{currentEvent.venue}</p>
                <small>Начало в {currentEvent.startTime}</small>
                <strong>{currentEvent.price}</strong>
              </> : <p className="themeMutedText">{eventsError || 'Загружаем события…'}</p>}
            </div>
            <div className={styles.sliderButtons}>
              <button onClick={previousEvent} aria-label="Предыдущее событие" disabled={!events.length}>←</button>
              <div>
                {events.map((event, index) => <button className={index === eventIndex ? styles.activeDot : ''} key={event.id} onClick={() => setEventIndex(index)} aria-label={`Событие ${index + 1}`} />)}
              </div>
              <button onClick={nextEvent} aria-label="Следующее событие" disabled={!events.length}>→</button>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} id="services">
        <div className={styles.container}>
          <Title label="Полезное">Популярные услуги</Title>
          <div className={styles.services}>
            {services.map((item) => (
              <button className={`${styles.service} themeCard`} key={item.title} onClick={() => setService(item)}>
                <img src={item.icon} alt="" /><h3>{item.title}</h3><p className="themeMutedText">{item.text}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} themeSection`} id="news">
        <div className={styles.container}>
          <Title label="Актуальное">Новости города</Title>
          <div className={styles.news}>
            <article className={`${styles.mainNews} themeCard`}>
              <img className={styles.newsImage} src="/makhachkala-city.jpg" alt="Панорама Махачкалы и Каспийского моря" />
              <div><small>19 октября 2026</small><h3>Самолёт S7 Новосибирск — Махачкала благополучно сел в Омске</h3><p className="themeMutedText">Посадка на запасном аэродроме произошла из-за технической неисправности.</p><a href="https://ria.ru/20261019/samolet-2125410683.html" target="_blank" rel="noreferrer">Читать →</a></div>
            </article>
            <div className={styles.sideNews}>
              {['На борту находились 173 пассажира', 'За пассажирами направили резервный самолёт'].map((text) => (
                <article className="themeCard" key={text}><small>Новости рейса</small><h3>{text}</h3><a href="https://ria.ru/20261019/samolet-2125410683.html" target="_blank" rel="noreferrer">Читать →</a></article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} id="events">
        <div className={styles.container}>
          <Title label="Афиша">Все события</Title>

          <div className={`${styles.eventFilters} themeCard`}>
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
              <article
                className={`${styles.event} themeCard`}
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                onKeyDown={(keyEvent) => keyEvent.key === 'Enter' && setSelectedEvent(event)}
                role="button"
                tabIndex="0"
              >
                <button
                  className={`${styles.favoriteButton} ${favorites.includes(event.id) ? styles.favoriteSelected : ''}`}
                  onClick={(clickEvent) => {
                    clickEvent.stopPropagation()
                    toggleFavorite(event.id)
                  }}
                  onKeyDown={(keyEvent) => keyEvent.stopPropagation()}
                  aria-label={favorites.includes(event.id) ? 'Убрать из избранного' : 'Добавить в избранное'}
                >
                  <svg className={styles.favoriteIcon} viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 3H19V21L12 17L5 21V3Z" />
                  </svg>
                </button>
                <span>{getCategoryName(event.category)}</span>
                <h3>{event.title}</h3><p>{event.venue}</p><small className="themeMutedText">{formatEventDate(event.date)}, начало в {event.startTime}</small>
                <div><strong>{event.price}</strong><small>Популярность: {event.popularity}</small></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} themeSection`}>
        <div className={styles.container}>
          <Title label="Рядом с вами">Полезные адреса</Title>
          <div className={styles.places}>
            {places.map(([icon, name, address, hours]) => (
              <article className={`${styles.place} themeCard`} key={name}><img src={icon} alt="" /><div><h3>{name}</h3><p className="themeMutedText">{address}</p><span>{hours}</span></div></article>
            ))}
          </div>
        </div>
      </section>

      {selectedEvent && (
        <div className={styles.overlay} onClick={() => setSelectedEvent(null)}>
          <div className={`${styles.modal} themeCard`} onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="event-title">
            <button className={styles.close} onClick={() => setSelectedEvent(null)} aria-label="Закрыть событие" autoFocus>×</button>
            <span className={styles.eventCategory}>
              {getCategoryName(selectedEvent.category)}
            </span>
            <h2 id="event-title">{selectedEvent.title}</h2>
            <p><small>Дата</small><strong>{formatEventDate(selectedEvent.date)}</strong></p>
            <p><small>Время</small><strong>{selectedEvent.startTime}</strong></p>
            <p><small>Место</small><strong>{selectedEvent.venue}</strong></p>
            <p><small>Цена</small><strong>{selectedEvent.price}</strong></p>
            <button className={styles.modalFavorite} onClick={() => toggleFavorite(selectedEvent.id)}>
              <span className={`${styles.bookmarkIcon} ${favorites.includes(selectedEvent.id) ? styles.bookmarkActive : ''}`} aria-hidden="true" />
              {favorites.includes(selectedEvent.id) ? 'Убрать из избранного' : 'Добавить в избранное'}
            </button>
            <button onClick={() => setSelectedEvent(null)}>Закрыть</button>
          </div>
        </div>
      )}

      {service && (
        <div className={styles.overlay} onClick={() => setService(null)}>
          <div className={`${styles.modal} themeCard`} onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="service-title">
            <button className={styles.close} onClick={() => setService(null)} aria-label="Закрыть информацию" autoFocus>×</button>
            <img src={service.icon} alt="" /><h2 id="service-title">{service.title}</h2>
            <p><small>Организация</small><strong>{service.organization}</strong></p>
            <p><small>Адрес</small><strong>{service.address}</strong></p>
            <p><small>Телефон</small><strong>{service.phone}</strong></p>
            <p><small>Режим работы</small><strong>{service.hours}</strong></p>
            <button onClick={() => setService(null)}>Понятно</button>
          </div>
        </div>
      )}
    </main>
  )
}
