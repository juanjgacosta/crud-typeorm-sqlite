import { container } from 'tsyringe'
import { IUsersRepository } from '../../modules/users/repositories/IUsersRepository'
import { UsersRepository } from '../../modules/users/repositories/implementations/UsersRepository'
// import { InMemoryUserRepository } from '../../modules/users/repositories/inMemory/InMemoryUserRepository'

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository)
// container.registerSingleton<IUsersRepository>('UsersRepository', InMemoryUserRepository)
