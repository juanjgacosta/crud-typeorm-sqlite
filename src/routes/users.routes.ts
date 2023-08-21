import { Router } from 'express'
import { createUserController } from '../modules/users/useCases/createUser'

const usersRoutes = Router()

usersRoutes.post('/', (req, res) => {
  return createUserController.handle(req, res)
})

export { usersRoutes }
