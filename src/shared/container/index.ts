import { container } from 'tsyringe'

import { UsersRepository } from 'src/modules/users/repositories/implementations/UsersRepository'
import { IUsersRepository } from 'src/modules/users/repositories/IUsersRepository'

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository)
