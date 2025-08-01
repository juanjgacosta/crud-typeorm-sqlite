import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { PublicUserInfoDTO } from '../../dtos'
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
