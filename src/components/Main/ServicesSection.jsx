import { useState } from 'react'
import { services } from './content'
import SectionTitle from './SectionTitle'
import styles from './style.module.css'

export default function ServicesSection() {
  const [service, setService] = useState(null)

  return (
    <>
      <section className={styles.section} id="services">
        <div className={styles.container}>
          <SectionTitle label="Полезное">Популярные услуги</SectionTitle>
          <div className={styles.services}>
            {services.map((item) => (
              <button className={`${styles.service} themeCard reveal`} key={item.title} onClick={() => setService(item)}>
                <img src={item.icon} alt="" /><h3>{item.title}</h3><p className="themeMutedText">{item.text}</p>
              </button>
            ))}
          </div>
        </div>
      </section>
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
    </>
  )
}
