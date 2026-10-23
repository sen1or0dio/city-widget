import express from 'express'

const app = express()
const port = 3000

app.get('/api/health', (_request, response) => {
  response.json({ message: 'Server works' })
})

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`)
})
