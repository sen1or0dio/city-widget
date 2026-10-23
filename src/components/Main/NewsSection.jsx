import SectionTitle from './SectionTitle'
import styles from './style.module.css'

export default function NewsSection() {
  return (
      <section className={`${styles.section} themeSection`} id="news">
        <div className={styles.container}>
          <SectionTitle label="Актуальное">Новости города</SectionTitle>
          <div className={styles.news}>
            <article className={`${styles.mainNews} themeCard reveal`}>
              <img className={styles.newsImage} src="/makhachkala-city.jpg" alt="Панорама Махачкалы и Каспийского моря" />
              <div><small>19 октября 2026</small><h3>Самолёт S7 Новосибирск — Махачкала благополучно сел в Омске</h3><p className="themeMutedText">Посадка на запасном аэродроме произошла из-за технической неисправности.</p><a href="https://ria.ru/20261019/samolet-2125410683.html" target="_blank" rel="noreferrer">Читать →</a></div>
            </article>
            <div className={styles.sideNews}>
              {['На борту находились 173 пассажира', 'За пассажирами направили резервный самолёт'].map((text) => (
                <article className="themeCard reveal" key={text}><small>Новости рейса</small><h3>{text}</h3><a href="https://ria.ru/20261019/samolet-2125410683.html" target="_blank" rel="noreferrer">Читать →</a></article>
              ))}
            </div>
          </div>
        </div>
      </section>
  )
}
