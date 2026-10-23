import { useState } from 'react'
import { createPortal } from 'react-dom'
import { events as savedEvents } from '../../../backend/events'
import styles from './style.module.css'

export default function Favorites({ darkTheme, favorites, setFavorites }) {
  const [favoritesOpen, setFavoritesOpen] = useState(false)
  const [favoriteEvents, setFavoriteEvents] = useState([])
  function openFavorites() {
    fetch('/api/events')
      .then((response) => response.json())
      .then((events) => {
        const savedEvents = events.filter((event) => favorites.includes(event.id))
        setFavoriteEvents(savedEvents)
        setFavoritesOpen(true)
      })
      .catch(() => {
        const favoriteSavedEvents = savedEvents.filter((event) => favorites.includes(event.id))
        setFavoriteEvents(favoriteSavedEvents)
        setFavoritesOpen(true)
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
            <button className={styles.favoriteHeaderButton} type="button" onClick={openFavorites} aria-label="Открыть избранные события">
              <span className={`${styles.bookmarkIcon} ${styles.bookmarkActive}`} aria-hidden="true" />
            </button>

      {favoritesOpen && createPortal(
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
        ,
        document.body
      )}
    </>
  )
}
