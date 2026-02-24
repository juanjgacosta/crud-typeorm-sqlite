import { Router } from 'express'
import multer from 'multer'

import { CreateUserController } from '../modules/users/controllers/CreateUserController'
import { ListUsersController } from '../modules/users/controllers/ListUsersController'
import { RemoveUserController } from '../modules/users/controllers/RemoveUserController'
import { UpdateUserController } from '../modules/users/controllers/UpdateUserController'
import { AuthenticateUserController } from '../modules/users/controllers/AuthenticateUserController'

import { ensureAuthenticated } from '../shared/middlewares/ensureAuthenticated'

import { UpdateUserAvatarController } from '../modules/users/controllers/UpdateUserAvatarController'
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
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle,
)

export { usersRoutes }
