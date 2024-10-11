import { Router } from 'express'
import { CreateUserController } from '../modules/users/useCases/createUser/CreateUserController'
import { ListUsersController } from '../modules/users/useCases/listUsers/ListUsersController'
import { RemoveUserController } from '../modules/users/useCases/removeUser/RemoveUserController'
import { UpdateUserController } from '../modules/users/useCases/updateUser/UpdateUserController'
import { authenticationUserController } from '../modules/users/useCases/authenticateUser'

const usersRoutes = Router()

const createUserController = new CreateUserController()
const listUsersController = new ListUsersController()
const removeUserController = new RemoveUserController()
const updateUserController = new UpdateUserController()

usersRoutes.post('/', createUserController.handle)

usersRoutes.get('/', listUsersController.handle)

usersRoutes.delete('/:id', removeUserController.handle)

usersRoutes.put('/:id', updateUserController.handle)

usersRoutes.post('/login', (req, res) => {
  return authenticationUserController.handle(req, res)
})

export { usersRoutes }
