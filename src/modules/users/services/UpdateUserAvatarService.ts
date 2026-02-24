import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../shared/errors/AppError'
import { IUsersRepository } from '../repositories/IUsersRepository'
import { deleteFile } from '../../../utils/file'

interface IRequest {
  user_id: string
  avatar_file: any
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    const user = await this.usersRepository.findUserById(user_id)
    if (!user) {
      throw new AppError('User not registered', 404)
    }

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`)
    }

    await this.usersRepository.updateUserAvatar({ id: user_id, avatar: avatar_file })
  }
}

export { UpdateUserAvatarService }
