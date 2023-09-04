import { UsersRepository } from '../../repositories/implementations/UsersRepository'
import { AuthenticateUserController } from './AuthenticateUserController'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

const userRepository = new UsersRepository()
const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository)
const authenticationUserController = new AuthenticateUserController(authenticateUserUseCase)

export { authenticationUserController }
