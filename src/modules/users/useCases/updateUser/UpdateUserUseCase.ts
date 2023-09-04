import { User } from '../../entities/User'
import { IUsersRepository } from '../../repositories/IUsersRepository'

interface IRequest {
  id: string
  name: string
  email: string
  company: string
  password: string
}

class UpdateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ id, name, email, company, password }: IRequest): Promise<User> {
    const userExists = await this.usersRepository.findUserById(id)

    if (!userExists) {
      throw new TypeError('User not registered')
    }

    const user = await this.usersRepository.updateUser({ id, name, email, company, password })
    return user
  }
}

export { UpdateUserUseCase }
