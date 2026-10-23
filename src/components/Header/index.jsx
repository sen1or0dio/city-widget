import { useEffect, useState } from 'react'
import styles from './style.module.css'

const cities = [
  { name: 'Махачкала', latitude: 42.9849, longitude: 47.5047 },
  { name: 'Каспийск', latitude: 42.8816, longitude: 47.6392 },
  { name: 'Буйнакск', latitude: 42.8218, longitude: 47.1167 },
]

function getWeatherIcon(code) {
  if (code === 0) return '☀️'
  if (code <= 3) return '⛅'
  if (code <= 67) return '🌧️'
  if (code <= 77) return '❄️'
  if (code <= 82) return '🌦️'
  return '⛈️'
}

export default function Header({ darkTheme, changeTheme, favorites, setFavorites }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [favoritesOpen, setFavoritesOpen] = useState(false)
  const [favoriteEvents, setFavoriteEvents] = useState([])
  const [city, setCity] = useState(cities[0])
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecast, setForecast] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code&hourly=relative_humidity_2m&daily=weather_code,temperature_2m_max,apparent_temperature_max,wind_speed_10m_max&timezone=Europe%2FMoscow&forecast_days=5`

    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error('Ошибка погоды')
        return response.json()
      })
      .then((data) => {
        setCurrentWeather(data.current)

        const days = data.daily.time.map((date, index) => {
          return {
            date: date,
            code: data.daily.weather_code[index],
            temperature: Math.round(data.daily.temperature_2m_max[index]),
            feelsLike: Math.round(data.daily.apparent_temperature_max[index]),
            humidity: data.hourly.relative_humidity_2m[index * 24 + 12],
            wind: Math.round(data.daily.wind_speed_10m_max[index]),
          }
        })

        setForecast(days)
        setLoading(false)
      })
      .catch(() => {
        setError('Не удалось загрузить погоду')
        setLoading(false)
      })
  }, [city, retryCount])

  function retryWeather() {
    setLoading(true)
    setError('')
    setRetryCount(retryCount + 1)
  }

  function openFavorites() {
    fetch('/api/events')
      .then((response) => response.json())
      .then((events) => {
        const savedEvents = events.filter((event) => favorites.includes(event.id))
        setFavoriteEvents(savedEvents)
        setFavoritesOpen(true)
        setModalOpen(false)
      })
  }

  function removeFavorite(id) {
    const newEvents = favoriteEvents.filter((event) => event.id !== id)
    const newIds = newEvents.map((event) => event.id)

    setFavoriteEvents(newEvents)
    setFavorites(newIds)
  }

  return (
    <>
      <header id="top" className={`${styles.header} ${darkTheme ? styles.darkTheme : ''}`}>
        <div className={styles.container}>
          <a className={styles.logo} href="#top">
            <div className={styles.logoIcon}>
              <img src="/city-icon.svg" alt="На главную" />
            </div>
          </a>

          <nav className={styles.menu}>
            <a href="#news">Новости</a>
            <a href="#events">События</a>
            <a href="#city">Город</a>
            <a href="#services">Услуги</a>
          </nav>

          <div className={styles.rightBlock}>
            <div className={styles.weather}>
              <div className={styles.weatherTop}>
                <span className={styles.weatherIcon} aria-hidden="true">{currentWeather ? getWeatherIcon(currentWeather.weather_code) : '☁️'}</span>
                <p className={styles.weatherTemperature}>{currentWeather ? `${Math.round(currentWeather.temperature_2m)}°` : '--°'}</p>
              </div>
              <span className={styles.cityName}>{city.name}</span>
            </div>

            <button className={styles.searchButton} type="button" onClick={() => {
              setModalOpen(true)
              setFavoritesOpen(false)
            }} aria-label="Открыть прогноз погоды">
              <span className={styles.searchIcon} aria-hidden="true" />
            </button>

            <button className={styles.favoriteHeaderButton} type="button" onClick={openFavorites} aria-label="Открыть избранные события">
              <span className={`${styles.bookmarkIcon} ${styles.bookmarkActive}`} aria-hidden="true" />
            </button>

            <button className={styles.themeButton} type="button" onClick={changeTheme} aria-label="Сменить тему">
              <span className={`${styles.themeIcon} ${darkTheme ? '' : styles.moonIcon}`} aria-hidden="true">
                {darkTheme ? '☀︎' : ''}
              </span>
            </button>
          </div>
        </div>
      </header>

      {modalOpen && (
        <div className={styles.overlay} onClick={() => setModalOpen(false)}>
          <div className={`${styles.weatherModal} ${darkTheme ? styles.modalDark : ''}`} onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="weather-title">
            <button className={styles.closeButton} onClick={() => setModalOpen(false)} aria-label="Закрыть прогноз" autoFocus>×</button>
            <h2 id="weather-title">Погода на 5 дней</h2>

            <div className={styles.cityButtons}>
              {cities.map((item) => (
                <button className={city.name === item.name ? styles.activeCity : ''} key={item.name} onClick={() => {
                  setCity(item)
                  setLoading(true)
                  setError('')
                }}>
                  {item.name}
                </button>
              ))}
            </div>

            {loading && <div className={styles.loading}><span className={styles.spinner}></span><p>Загружаем погоду...</p></div>}
            {error && <div className={styles.error}><p>{error}</p><button onClick={retryWeather}>Повторить</button></div>}

            {!loading && !error && (
              <>
                <div className={styles.currentWeather}>
                  <span className={styles.currentIcon}>{getWeatherIcon(currentWeather.weather_code)}</span>
                  <div><small>Сейчас</small><strong>{Math.round(currentWeather.temperature_2m)}°</strong></div>
                  <p>Ощущается: <b>{Math.round(currentWeather.apparent_temperature)}°</b></p>
                  <p>Влажность: <b>{currentWeather.relative_humidity_2m}%</b></p>
                  <p>Ветер: <b>{Math.round(currentWeather.wind_speed_10m)} км/ч</b></p>
                </div>

                <div className={styles.forecast}>
                  {forecast.map((day) => (
                    <article key={day.date}>
                      <strong>{new Date(`${day.date}T00:00:00`).toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric', month: 'short' })}</strong>
                      <span className={styles.forecastIcon}>{getWeatherIcon(day.code)}</span>
                      <p>Температура: {day.temperature}°</p>
                      <p>Ощущается: {day.feelsLike}°</p>
                      <p>Влажность в 12:00: {day.humidity}%</p>
                      <p>Ветер: {day.wind} км/ч</p>
                    </article>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {favoritesOpen && (
        <div className={styles.overlay} onClick={() => setFavoritesOpen(false)}>
          <div className={`${styles.weatherModal} ${darkTheme ? styles.modalDark : ''}`} onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="favorites-title">
            <button className={styles.closeButton} onClick={() => setFavoritesOpen(false)} aria-label="Закрыть избранное" autoFocus>×</button>
            <h2 id="favorites-title">Избранные события</h2>

            {!favoriteEvents.length && <p>В избранном пока ничего нет</p>}

            <div className={styles.favoriteList}>
              {favoriteEvents.map((event) => (
                <article key={event.id}>
                  <div>
                    <small>{event.date}, {event.startTime}</small>
                    <h3>{event.title}</h3>
                    <p>{event.venue}</p>
                    <strong>{event.price}</strong>
                  </div>
                  <button onClick={() => removeFavorite(event.id)} aria-label={`Удалить ${event.title} из избранного`}>Удалить</button>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
