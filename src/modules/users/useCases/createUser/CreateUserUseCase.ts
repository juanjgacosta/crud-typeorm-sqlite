import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../errors/AppError'
import { User } from '../../entities/User'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { ICreateUserDTO } from '../../dtos'

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ name, email, company, password }: ICreateUserDTO): Promise<User> {
    const userExists = await this.usersRepository.findUserByEmail(email)

    if (userExists) {
      throw new AppError('User already registered')
    }

    const user = await this.usersRepository.createUser({ name, email, company, password })
    return user
  }
}

export { CreateUserUseCase }
