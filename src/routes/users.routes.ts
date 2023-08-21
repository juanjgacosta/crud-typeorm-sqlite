import { Router } from 'express'
import { createUserController } from '../modules/users/useCases/createUser'
import { listUsersController } from '../modules/users/useCases/listUsers'
import { removeUserController } from '../modules/users/useCases/removeUser'

const usersRoutes = Router()

usersRoutes.post('/', (req, res) => {
  return createUserController.handle(req, res)
})

usersRoutes.get('/', (req, res) => {
  return listUsersController.handle(req, res)
})

usersRoutes.delete('/:id', (req, res) => {
  return removeUserController.handle(req, res)
})

export { usersRoutes }
