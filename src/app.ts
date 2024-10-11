import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import { AppError } from './errors/AppError'

import { usersRoutes } from './routes/users.routes'

import './database/data-source.ts'

import './shared/container'

const app = express()

app.use(express.json())

app.use((request, response, next) => {
  response.on('finish', () => {
    console.log(`${request.method} ${request.originalUrl} ${response.statusCode}`)
  })
  next()
})

app.use('/users', usersRoutes)

app.get('/checkHealth', (req, res) => {
  return res.json({ message: 'ok' })
})

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    })
  }
  console.error(err)

  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  })
})

export { app }
