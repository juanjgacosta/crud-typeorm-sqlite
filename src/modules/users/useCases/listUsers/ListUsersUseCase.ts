import { User } from '../../entities/User'
import { IUsersRepository, PublicUserInfoDTO } from '../../repositories/IUsersRepository'

class ListUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(): Promise<PublicUserInfoDTO[]> {
    const users = await this.usersRepository.listUsers()
    return users
  }
}

export { ListUsersUseCase }
