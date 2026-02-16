import { ICreateUserDTO, IUpdateUserDTO, PublicUserInfoDTO, IUpdateUserAvatarDTO } from '../../dtos'
import { User } from '../../entities/User'
import { IUsersRepository } from '../IUsersRepository'
import { hash } from 'bcryptjs'

class InMemoryUserRepository implements IUsersRepository {
  users: User[] = []

  async createUser({ name, email, company, password, avatar }: ICreateUserDTO): Promise<User> {
    const passwordHash = await hash(password, 8)

    const user = new User()
    Object.assign(user, {
      name,
      email,
      company,
      password: passwordHash,
      avatar,
    })

    this.users.push(user)
    return user
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.users.find((i) => i.email === email)
  }

  async findUserById(id: string): Promise<User> {
    return this.users.find((i) => i.id === id)
  }

  async listUsers(): Promise<PublicUserInfoDTO[]> {
    return this.users
  }

  async updateUser({ id, name, email, company, password }: IUpdateUserDTO): Promise<any> {
    const user = await this.findUserById(id)

    user.name = name !== undefined ? name : user.name
    user.email = email !== undefined ? email : user.email
    user.company = company !== undefined ? company : user.company
    if (password !== undefined) {
      user.password = await hash(password, 8)
    } else {
      user.password = user.password
    }

    return user
  }

  async removeUser(id: string): Promise<User> {
    // const user = await this.findUserById(id)
    const index = this.users.findIndex((user) => user.id === id)

    if (index === -1) {
      return null
    }

    const [removedUser] = this.users.splice(index, 1)
    return removedUser
  }

  async updateUserAvatar({ id, avatar }: IUpdateUserAvatarDTO): Promise<any> {
    const user = await this.findUserById(id)

    if (!user) {
      return null
    }

    user.avatar = avatar
    return user
  }
}

export { InMemoryUserRepository }
