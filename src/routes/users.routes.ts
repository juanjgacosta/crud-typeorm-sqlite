import { Router } from 'express'
import { createUserController } from '../modules/users/useCases/createUser'
import { listUsersController } from '../modules/users/useCases/listUsers'

const usersRoutes = Router()

usersRoutes.post('/', (req, res) => {
  return createUserController.handle(req, res)
})

usersRoutes.get('/', (req, res) => {
  return listUsersController.handle(req, res)
})

export { usersRoutes }
