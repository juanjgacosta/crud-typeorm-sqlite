import { User } from '../../entities/User'
import { IUsersRepository } from '../../repositories/IUsersRepository'

class ListUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(): Promise<User[]> {
    const users = await this.usersRepository.listUsers()
    return users
  }
}

export { ListUsersUseCase }
