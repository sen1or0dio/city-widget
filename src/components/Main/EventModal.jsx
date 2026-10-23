import { formatEventDate, getCategoryName } from './eventUtils'
import styles from './style.module.css'

export default function EventModal({ event, isFavorite, onToggleFavorite, onClose }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={`${styles.modal} themeCard`} onClick={(clickEvent) => clickEvent.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="event-title">
        <button className={styles.close} onClick={onClose} aria-label="Закрыть событие" autoFocus>×</button>
        <span className={styles.eventCategory}>{getCategoryName(event.category)}</span>
        <h2 id="event-title">{event.title}</h2>
        <p><small>Дата</small><strong>{formatEventDate(event.date)}</strong></p>
        <p><small>Время</small><strong>{event.startTime}</strong></p>
        <p><small>Место</small><strong>{event.venue}</strong></p>
        <p><small>Цена</small><strong>{event.price}</strong></p>
        <button className={styles.modalFavorite} onClick={() => onToggleFavorite(event.id)}>
          <span className={`${styles.bookmarkIcon} ${isFavorite ? styles.bookmarkActive : ''}`} aria-hidden="true" />
          {isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
        </button>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  )
}
