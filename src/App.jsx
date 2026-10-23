import { useState } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import styles from './App.module.css'

export default function App() {
  const savedTheme = localStorage.getItem('theme') === 'dark'
  const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]')

  const [darkTheme, setDarkTheme] = useState(savedTheme)
  const [favorites, saveFavorites] = useState(savedFavorites)

  function changeTheme() {
    if (darkTheme) {
      setDarkTheme(false)
      localStorage.setItem('theme', 'light')
    } else {
      setDarkTheme(true)
      localStorage.setItem('theme', 'dark')
    }
  }

  function setFavorites(newFavorites) {
    saveFavorites(newFavorites)
    localStorage.setItem('favorites', JSON.stringify(newFavorites))
  }

  return (
    <div className={darkTheme ? styles.darkTheme : styles.lightTheme}>
      <Header darkTheme={darkTheme} changeTheme={changeTheme} favorites={favorites} setFavorites={setFavorites} />
      <Main favorites={favorites} setFavorites={setFavorites} />
      <Footer />
    </div>
  )
}
