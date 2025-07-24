import { User } from '../entities/User'

interface ICreateUserDTO {
  id?: string
  name: string
  email: string
  company: string
  password: string
}

interface PublicUserInfoDTO {
  id: string
  name: string
  email: string
  company: string
  created_at: Date
  updated_at: Date
}

interface IUsersRepository {
  createUser({ name, email, company, password }: ICreateUserDTO): Promise<User>
  findUserByEmail(email: string): Promise<User>
  findUserById(id: string): Promise<User>
  listUsers(): Promise<PublicUserInfoDTO[]>
  removeUser(id: string): Promise<User>
  updateUser({ id, name, email, company, password }: ICreateUserDTO): Promise<any>
}

export { ICreateUserDTO, IUsersRepository, PublicUserInfoDTO }
