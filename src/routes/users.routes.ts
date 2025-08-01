import { Router } from 'express'
import { CreateUserController } from '../modules/users/useCases/createUser/CreateUserController'
import { ListUsersController } from '../modules/users/useCases/listUsers/ListUsersController'
import { removeUserController } from '../modules/users/useCases/removeUser'
import { updateUserController } from '../modules/users/useCases/updateUser'
import { authenticationUserController } from '../modules/users/useCases/authenticateUser'

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const usersRoutes = Router()

const createUserController = new CreateUserController()
const listUsersController = new ListUsersController()

usersRoutes.post('/', ensureAuthenticated, createUserController.handle)
usersRoutes.get('/', listUsersController.handle)

usersRoutes.delete('/:id', ensureAuthenticated, (req, res) => {
  return removeUserController.handle(req, res)
})

usersRoutes.put('/:id', ensureAuthenticated, (req, res) => {
  return updateUserController.handle(req, res)
})

usersRoutes.post('/auth', (req, res) => {
  return authenticationUserController.handle(req, res)
})

export { usersRoutes }
