import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../errors/AppError'
import { User } from '../../entities/User'
import { IUsersRepository } from '../../repositories/IUsersRepository'

interface IRequest {
  id: string
  name: string
  email: string
  company: string
  password: string
}

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ id, name, email, company, password }: IRequest): Promise<User> {
    const userExists = await this.usersRepository.findUserById(id)

    if (!userExists) {
      throw new AppError('User not registered', 404)
    }

    const user = await this.usersRepository.updateUser({ id, name, email, company, password })
    return user
  }
}

export { UpdateUserUseCase }
