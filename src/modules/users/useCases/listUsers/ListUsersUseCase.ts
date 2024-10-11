import { inject, injectable } from 'tsyringe'

import { User } from '../../entities/User'
import { IUsersRepository } from '../../repositories/IUsersRepository'
@injectable()
class ListUsersUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(): Promise<User[]> {
    const users = await this.usersRepository.listUsers()
    return users
  }
}

export { ListUsersUseCase }
