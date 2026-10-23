import { useState } from 'react'
import { stats } from './content'
import { formatEventDate } from './eventUtils'
import SectionTitle from './SectionTitle'
import styles from './style.module.css'

export default function Overview({ events, eventsError }) {
  const [eventIndex, setEventIndex] = useState(0)
  const currentEvent = events[eventIndex]

  function previousEvent() {
    setEventIndex((index) => index === 0 ? events.length - 1 : index - 1)
  }

  function nextEvent() {
    setEventIndex((index) => index === events.length - 1 ? 0 : index + 1)
  }

  return (
      <section className={styles.overview}>
        <div className={`${styles.container} ${styles.overviewGrid}`}>
          <div className={`${styles.cityCard} themeCard reveal`}>
            <div className={styles.cityTitle}>
              <SectionTitle label="Город у Каспия">Коротко о Махачкале</SectionTitle>
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

          <div className={`${styles.slider} themeCard reveal`}>
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
  )
}
