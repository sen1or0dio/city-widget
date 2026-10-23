import express from 'express'
import { events } from './events'

const app = express()
const port = 3000

app.get('/', (_request, response) => {
  response.json({ message: 'City Widget API works', events: '/api/events' })
})

app.get('/api', (_request, response) => {
  response.json({ message: 'City Widget API works', events: '/api/events' })
})

app.get('/api/events', (_request, response) => {
  response.json(events)
})

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`)
})
