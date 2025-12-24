import { User } from '../entities/User'
import { ICreateUserDTO, IUpdateUserDTO, IUpdateUserAvatarDTO, PublicUserInfoDTO } from '../dtos'

interface IUsersRepository {
  createUser({ name, email, company, password, avatar }: ICreateUserDTO): Promise<User>
  findUserByEmail(email: string): Promise<User>
  findUserById(id: string): Promise<User>
  listUsers(): Promise<PublicUserInfoDTO[]>
  removeUser(id: string): Promise<User>
  updateUser({ id, name, email, company, password }: IUpdateUserDTO): Promise<any>
  updateUserAvatar({ id, avatar }: IUpdateUserAvatarDTO): Promise<any>
}

export { IUsersRepository }
