import express from 'express'

const app = express()

app.use(express.json())
app.get('/', (req, res) => {
  const { name } = req.body
  return res.json({ message: 'ok' })
})

export { app }
