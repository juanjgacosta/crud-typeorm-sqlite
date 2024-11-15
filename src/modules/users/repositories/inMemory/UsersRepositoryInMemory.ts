import { User } from '../../entities/User'
import { ICreateUserDTO, IUsersRepository } from '../IUsersRepository'
import { hash } from 'bcryptjs'

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = []

  async createUser({ name, email, company, password }: ICreateUserDTO): Promise<User> {
    const user = new User()

    const passwordHash = await hash(password, 8)

    Object.assign(user, {
      name,
      email,
      company,
      password: passwordHash,
    })

    this.users.push(user)

    return user
  }
  async findUserByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email)
  }
  async findUserById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id)
  }
  async listUsers(): Promise<User[]> {
    return this.users
  }
  removeUser(id: string): Promise<User> {
    throw new Error('Method not implemented.')
  }
  updateUser({ id, name, email, company, password }: ICreateUserDTO): Promise<any> {
    throw new Error('Method not implemented.')
  }
}

export { UsersRepositoryInMemory }
