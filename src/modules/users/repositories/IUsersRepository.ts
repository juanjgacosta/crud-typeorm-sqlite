import { User } from '../entities/User'
import { ICreateUserDTO, PublicUserInfoDTO } from '../dtos'

interface IUsersRepository {
  createUser({ name, email, company, password }: ICreateUserDTO): Promise<User>
  findUserByEmail(email: string): Promise<User>
  findUserById(id: string): Promise<User>
  listUsers(): Promise<PublicUserInfoDTO[]>
  removeUser(id: string): Promise<User>
  updateUser({ id, name, email, company, password }: ICreateUserDTO): Promise<any>
}

export { IUsersRepository }
