import { AppDataSource } from '../../../../database/data-source'
import { User } from '../../entities/User'
import { IUsersRepository } from '../IUsersRepository'
import { ICreateUserDTO, IUpdateUserAvatarDTO, PublicUserInfoDTO } from '../../dtos'
import { hash } from 'bcryptjs'

class UsersRepository implements IUsersRepository {
  async createUser({ id, name, email, company, password, avatar }: ICreateUserDTO): Promise<User> {
    const userRepository = AppDataSource.getRepository(User)

    const passwordHash = await hash(password, 8)

    const user = userRepository.create({
      id,
      name,
      email,
      company,
      password: passwordHash,
      avatar,
    })
    await userRepository.save(user)
    return user
  }
  async findUserByEmail(email: string): Promise<User> {
    const userRepository = AppDataSource.getRepository(User)
    const user = await userRepository.findOne({
      where: {
        email,
      },
    })
    return user
  }

  async findUserById(id: string): Promise<User> {
    const userRepository = AppDataSource.getRepository(User)
    const user = await userRepository.findOne({
      where: {
        id,
      },
    })
    return user
  }

  async listUsers(): Promise<PublicUserInfoDTO[]> {
    const userRepository = AppDataSource.getRepository(User)
    const users = await userRepository.find()
    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      company: user.company,
      avatar: user.avatar ? user.avatar : '',
      created_at: user.created_at,
      updated_at: user.updated_at,
    }))
  }

  async removeUser(id: string): Promise<User> {
    const userRepository = AppDataSource.getRepository(User)
    const user = await userRepository.findOne({
      where: {
        id,
      },
    })
    return await userRepository.remove(user)
  }

  updateUser({ id, name, email, company, password }: ICreateUserDTO): Promise<any> {
    const userRepository = AppDataSource.getRepository(User)

    const user = userRepository.update({ id }, { name, email, company, password })
    return user
  }

  updateUserAvatar({ id, avatar }: IUpdateUserAvatarDTO): Promise<any> {
    const userRepository = AppDataSource.getRepository(User)
    return userRepository.update({ id }, { avatar })
  }
}

export { UsersRepository }
