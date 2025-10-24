import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { AppError } from '../../../../errors/AppError'
import { deleteFile } from '../../../../utils/file'

interface IRequest {
  user_id: string
  avatar_file: any
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}
  async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    const user = await this.usersRepository.findUserById(user_id)
    if (!user) {
      throw new AppError('User not registered', 404)
    }

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`)
    }
    
    user.avatar = avatar_file

    await this.usersRepository.createUser(user)
  }
}

export { UpdateUserAvatarUseCase }
