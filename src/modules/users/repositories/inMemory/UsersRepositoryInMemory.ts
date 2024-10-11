import { User } from '../../entities/User'
import { ICreateUserDTO, IUsersRepository } from '../IUsersRepository'

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = []

  async createUser({ name, email, company, password }: ICreateUserDTO): Promise<User> {
    const user = new User()
    Object.assign(user, {
      name,
      email,
      company,
      password,
    })

    this.users.push(user)

    return user
  }
  async findUserByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email)
    return user
  }
  findUserById(id: string): Promise<User> {
    throw new Error('Method not implemented.')
  }
  async listUsers(): Promise<User[]> {
    const all = this.users
    return all
  }
  removeUser(id: string): Promise<User> {
    throw new Error('Method not implemented.')
  }
  updateUser({ id, name, email, company, password }: ICreateUserDTO): Promise<any> {
    throw new Error('Method not implemented.')
  }
}

export { UsersRepositoryInMemory }
