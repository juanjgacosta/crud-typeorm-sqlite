import { Router } from 'express'
import { createUserController } from '../modules/users/useCases/createUser'
import { listUsersController } from '../modules/users/useCases/listUsers'
import { removeUserController } from '../modules/users/useCases/removeUser'
import { updateUserController } from '../modules/users/useCases/updateUser'
import { authenticationUserController } from '../modules/users/useCases/authenticateUser'

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

usersRoutes.put('/:id', (req, res) => {
  return updateUserController.handle(req, res)
})

usersRoutes.post('/login', (req, res) => {
  return authenticationUserController.handle(req, res)
})

export { usersRoutes }
