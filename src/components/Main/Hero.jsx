import styles from './style.module.css'

export default function Hero() {
  return (
      <section className={styles.hero} id="city">
        <div className={styles.container}>
          <div className="reveal">
            <h1>Махачкала — город у Каспийского моря</h1>
            <p>Новости, городские услуги и актуальная афиша в одном месте.</p>
            <a className={styles.mainButton} href="#services">Все услуги</a>
          </div>
          <div className={`${styles.map} reveal`}>
            <div className={styles.mapTitle}>
              <strong>Махачкала</strong>
              <a href="https://www.openstreetmap.org/?mlat=42.9849&mlon=47.5047#map=13/42.9849/47.5047" target="_blank" rel="noreferrer">Открыть карту ↗</a>
            </div>
            <iframe title="Карта Махачкалы" src="https://www.openstreetmap.org/export/embed.html?bbox=47.415%2C42.935%2C47.595%2C43.035&layer=mapnik&marker=42.9849%2C47.5047" loading="lazy" />
          </div>
        </div>
      </section>
  )
}
