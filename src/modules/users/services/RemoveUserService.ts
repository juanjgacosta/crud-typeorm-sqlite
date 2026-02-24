import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../shared/errors/AppError'
import { User } from '../entities/User'
import { IUsersRepository } from '../repositories/IUsersRepository'
import { deleteFile } from '../../../utils/file'
@injectable()
class RemoveUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(id: string): Promise<User> {
    const user = await this.usersRepository.findUserById(id)

    if (!user) {
      throw new AppError('User not registered', 404)
    }

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`)
    }
    await this.usersRepository.removeUser(id)

    return user
  }
}

export { RemoveUserService }
