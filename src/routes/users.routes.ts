import { Router } from 'express'
import multer from 'multer'

import { CreateUserController } from '../modules/users/useCases/createUser/CreateUserController'
import { ListUsersController } from '../modules/users/useCases/listUsers/ListUsersController'
import { RemoveUserController } from '../modules/users/useCases/removeUser/RemoveUserController'
import { UpdateUserController } from '../modules/users/useCases/updateUser/UpdateUserController'
import { AuthenticateUserController } from '../modules/users/useCases/authenticateUser/AuthenticateUserController'

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

import { UpdateUserAvatarController } from '../modules/users/useCases/updateUserAvatarUseCase/UpdateUserAvatarController'
import uploadConfig from '../config/upoad'

const usersRoutes = Router()

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'))

const createUserController = new CreateUserController()
const listUsersController = new ListUsersController()
const updateUserController = new UpdateUserController()
const removeUserController = new RemoveUserController()
const authenticateUserController = new AuthenticateUserController()
const updateUserAvatarController = new UpdateUserAvatarController()

usersRoutes.post('/', ensureAuthenticated, createUserController.handle)
usersRoutes.get('/', listUsersController.handle)
usersRoutes.put('/:id', ensureAuthenticated, updateUserController.handle)
usersRoutes.delete('/:id', ensureAuthenticated, removeUserController.handle)

usersRoutes.post('/auth', authenticateUserController.handle)

usersRoutes.patch(
  '/:id/avatar',
  ensureAuthenticated,uploadAvatar.single('avatar'),
  updateUserAvatarController.handle
)

export { usersRoutes }
