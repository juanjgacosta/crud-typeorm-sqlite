import { Router } from 'express'

import { CreateUserController } from '../modules/users/useCases/createUser/CreateUserController'
import { ListUsersController } from '../modules/users/useCases/listUsers/ListUsersController'
import { RemoveUserController } from '../modules/users/useCases/removeUser/RemoveUserController'
import { UpdateUserController } from '../modules/users/useCases/updateUser/UpdateUserController'
import { AuthenticateUserController } from '../modules/users/useCases/authenticateUser/AuthenticateUserController'

const usersRoutes = Router()

const createUserController = new CreateUserController()
const listUsersController = new ListUsersController()
const removeUserController = new RemoveUserController()
const updateUserController = new UpdateUserController()
const authenticationUserController = new AuthenticateUserController()

usersRoutes.post('/', createUserController.handle)

usersRoutes.get('/', listUsersController.handle)

usersRoutes.delete('/:id', removeUserController.handle)

usersRoutes.put('/:id', updateUserController.handle)

usersRoutes.post('/login', authenticationUserController.handle)

export { usersRoutes }
