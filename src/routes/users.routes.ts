import { Router } from 'express'
import { CreateUserController } from '../modules/users/useCases/createUser/CreateUserController'
import { ListUsersController } from '../modules/users/useCases/listUsers/ListUsersController'
import { RemoveUserController } from '../modules/users/useCases/removeUser/RemoveUserController'
import { UpdateUserController } from '../modules/users/useCases/updateUser/UpdateUserController'
import { AuthenticateUserController } from '../modules/users/useCases/authenticateUser/AuthenticateUserController'

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const usersRoutes = Router()

const createUserController = new CreateUserController()
const listUsersController = new ListUsersController()
const updateUserController = new UpdateUserController()
const removeUserController = new RemoveUserController()
const authenticateUserController = new AuthenticateUserController()

usersRoutes.post('/', ensureAuthenticated, createUserController.handle)
usersRoutes.get('/', listUsersController.handle)
usersRoutes.put('/:id', ensureAuthenticated, updateUserController.handle)
usersRoutes.delete('/:id', ensureAuthenticated, removeUserController.handle)

usersRoutes.post('/auth', authenticateUserController.handle)

export { usersRoutes }
