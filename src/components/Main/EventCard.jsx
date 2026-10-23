import { formatEventDate, getCategoryName } from './eventUtils'
import styles from './style.module.css'

export default function EventCard({ event, isFavorite, onSelect, onToggleFavorite }) {
  return (
    <article
      className={`${styles.event} themeCard reveal`}
      onClick={() => onSelect(event)}
      onKeyDown={(keyEvent) => keyEvent.key === 'Enter' && onSelect(event)}
      role="button"
      tabIndex="0"
    >
      <button
        className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteSelected : ''}`}
        onClick={(clickEvent) => {
          clickEvent.stopPropagation()
          onToggleFavorite(event.id)
        }}
        onKeyDown={(keyEvent) => keyEvent.stopPropagation()}
        aria-label={isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
      >
        <svg className={styles.favoriteIcon} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 3H19V21L12 17L5 21V3Z" />
        </svg>
      </button>
      <span>{getCategoryName(event.category)}</span>
      <h3>{event.title}</h3><p>{event.venue}</p>
      <small className="themeMutedText">{formatEventDate(event.date)}, начало в {event.startTime}</small>
      <div><strong>{event.price}</strong><small>Популярность: {event.popularity}</small></div>
    </article>
  )
}
