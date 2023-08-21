import { User } from '../../entities/User'
import { IUsersRepository } from '../../repositories/IUsersRepository'

interface IRequest {
  name: string
  email: string
  company: string
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ name, email, company }: IRequest): Promise<User> {
    const userExists = await this.usersRepository.findUserByEmail(email)

    if (userExists) {
      throw new TypeError('User already registered')
    }

    const user = await this.usersRepository.createUser({ name, email, company })
    return user
  }
}

export { CreateUserUseCase }
