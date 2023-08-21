import { User } from '../entities/User'

interface ICreateUserDTO {
  id?: string
  name: string
  email: string
  company: string
}

interface IUsersRepository {
  createUser({ name, email, company }: ICreateUserDTO): Promise<User>
  findUserByEmail(email: string): Promise<User>
  findUserById(id: string): Promise<User>
  listUsers(): Promise<User[]>
  removeUser(id: string): Promise<User>
  updateUser({ id, name, email, company }: ICreateUserDTO): Promise<any>
}

export { ICreateUserDTO, IUsersRepository }
