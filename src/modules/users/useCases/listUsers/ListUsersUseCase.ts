import { inject, injectable } from 'tsyringe'
import { IUsersRepository, PublicUserInfoDTO } from '../../repositories/IUsersRepository'
@injectable()
class ListUsersUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(): Promise<PublicUserInfoDTO[]> {
    const users = await this.usersRepository.listUsers()
    return users
  }
}

export { ListUsersUseCase }
