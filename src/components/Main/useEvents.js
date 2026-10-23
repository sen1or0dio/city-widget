import { useEffect, useState } from 'react'
import { events as savedEvents } from '../../../backend/events'

export default function useEvents() {
  const [events, setEvents] = useState([])
  const [eventsError, setEventsError] = useState('')
  const [eventsLoading, setEventsLoading] = useState(true)

  function loadEvents() {
    fetch('/api/events')
      .then((response) => {
        if (!response.ok) throw new Error('Ошибка событий')
        return response.json()
      })
      .then((data) => {
        setEvents(data)
        setEventsLoading(false)
      })
      .catch(() => {
        setEvents(savedEvents)
        setEventsLoading(false)
      })
  }

  useEffect(() => {
    loadEvents()
  }, [])

  function retryEvents() {
    setEventsLoading(true)
    setEventsError('')
    loadEvents()
  }

  return { events, eventsError, eventsLoading, retryEvents }
}
