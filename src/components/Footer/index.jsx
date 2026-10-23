import styles from './style.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerLinks}>
          <a href="#news">Новости</a>
          <a href="#events">События</a>
          <a href="#services">Услуги</a>
          <a href="#contacts">Контакты</a>
        </div>

        <p>© 2026</p>
      </div>
    </footer>
  )
}
