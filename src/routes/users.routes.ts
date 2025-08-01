import { Router } from 'express'
import { CreateUserController } from '../modules/users/useCases/createUser/CreateUserController'
import { ListUsersController } from '../modules/users/useCases/listUsers/ListUsersController'
import { RemoveUserController } from '../modules/users/useCases/removeUser/RemoveUserController'
import { UpdateUserController } from '../modules/users/useCases/updateUser/UpdateUserController'
import { authenticationUserController } from '../modules/users/useCases/authenticateUser'

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const usersRoutes = Router()

const createUserController = new CreateUserController()
const listUsersController = new ListUsersController()
const updateUserController = new UpdateUserController()
const removeUserController = new RemoveUserController()

usersRoutes.post('/', ensureAuthenticated, createUserController.handle)
usersRoutes.get('/', listUsersController.handle)
usersRoutes.put('/:id', ensureAuthenticated, updateUserController.handle)
usersRoutes.delete('/:id', ensureAuthenticated, removeUserController.handle)

usersRoutes.post('/auth', (req, res) => {
  return authenticationUserController.handle(req, res)
})

export { usersRoutes }
