import { inject, injectable } from 'tsyringe'

import { AppError } from '../../../../errors/AppError'
import { User } from '../../entities/User'
import { IUsersRepository } from '../../repositories/IUsersRepository'
@injectable()
class RemoveUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<User> {
    const user = await this.usersRepository.findUserById(id)

    if (!user) {
      throw new AppError('User not registered', 404)
    }

    await this.usersRepository.removeUser(id)
    return user
  }
}

export { RemoveUserUseCase }
