import 'reflect-metadata'
import express from 'express'
import { usersRoutes } from './routes/users.routes'

import './database/data-source.ts'

const app = express()

app.use(express.json())
app.use('/users', usersRoutes)
app.get('/', (req, res) => {
  const { name } = req.body
  return res.json({ message: 'ok' })
})

export { app }
