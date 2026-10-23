import Weather from './Weather'
import Favorites from './Favorites'
import styles from './style.module.css'

export default function Header({ darkTheme, changeTheme, favorites, setFavorites }) {
  return (
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
            <Weather darkTheme={darkTheme} />
            <Favorites darkTheme={darkTheme} favorites={favorites} setFavorites={setFavorites} />
            <button className={styles.themeButton} type="button" onClick={changeTheme} aria-label="Сменить тему">
              <span className={`${styles.themeIcon} ${darkTheme ? '' : styles.moonIcon}`} aria-hidden="true">
                {darkTheme ? '☀︎' : ''}
              </span>
            </button>
          </div>
        </div>
      </header>
  )
}
