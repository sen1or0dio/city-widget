import { places } from './content'
import SectionTitle from './SectionTitle'
import styles from './style.module.css'

export default function PlacesSection() {
  return (
      <section className={`${styles.section} themeSection`}>
        <div className={styles.container}>
          <SectionTitle label="Рядом с вами">Полезные адреса</SectionTitle>
          <div className={styles.places}>
            {places.map(([icon, name, address, hours]) => (
              <article className={`${styles.place} themeCard reveal`} key={name}><img src={icon} alt="" /><div><h3>{name}</h3><p className="themeMutedText">{address}</p><span>{hours}</span></div></article>
            ))}
          </div>
        </div>
      </section>
  )
}
