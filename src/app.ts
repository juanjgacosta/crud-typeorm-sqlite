import 'reflect-metadata'
import express from 'express'
import { AppDataSource } from './database/data-source'
import { usersRoutes } from './routes/users.routes'

const app = express()

app.use(express.json())
app.use('/users', usersRoutes)
app.get('/', (req, res) => {
  const { name } = req.body
  return res.json({ message: 'ok' })
})

AppDataSource.initialize().then((async) => {
  console.log('Database connection ok')
})

export { app }
