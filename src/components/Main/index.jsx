import { useEffect } from 'react'
import Hero from './Hero'
import Overview from './Overview'
import ServicesSection from './ServicesSection'
import NewsSection from './NewsSection'
import EventsSection from './EventsSection'
import PlacesSection from './PlacesSection'
import useEvents from './useEvents'

export default function Main({ favorites, setFavorites }) {
  const { events, eventsError, eventsLoading, retryEvents } = useEvents()

  useEffect(() => {
    const items = document.querySelectorAll('.reveal')

    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('visible'))
      return
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('visible', entry.isIntersecting)
      })
    }, { threshold: 0.1 })

    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  })

  return (
    <main>
      <Hero />
      <Overview events={events} eventsError={eventsError} />
      <ServicesSection />
      <NewsSection />
      <EventsSection events={events} eventsLoading={eventsLoading} eventsError={eventsError} retryEvents={retryEvents} favorites={favorites} setFavorites={setFavorites} />
      <PlacesSection />
    </main>
  )
}
