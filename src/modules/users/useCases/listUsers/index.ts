import { UsersRepository } from '../../repositories/implementations/UsersRepository'
import { ListUsersController } from './ListUsersController'
import { ListUsersUseCase } from './ListUsersUseCase'

const usersRepository = new UsersRepository()
const listUsersUseCase = new ListUsersUseCase(usersRepository)
const listUsersController = new ListUsersController(listUsersUseCase)

export { listUsersController }
