import { AppError } from '../../../../errors/AppError'
import { UsersRepositoryInMemory } from '../../repositories/inMemory/UsersRepositoryInMemory'
import { ICreateUserDTO } from '../../repositories/IUsersRepository'
import { CreateUserUseCase } from '../createUser/CreateUserUseCase'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory)
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })

  it('Should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      name: 'User Test',
      email: 'authenticateuser@email.com',
      company: 'Company user test',
      password: 'mudar123',
    }

    const userCreated = await createUserUseCase.execute(user)

    // console.log('userCreatedAuth: ', userCreated)

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    })

    // console.log('result: ', result)
    expect(result).toHaveProperty('token')
  })

  it('Should not be able to authenticate an nonexistent user', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'false@email.com',
        password: '1234',
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to authenticate with an incorrect password', () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: 'User Test Error',
        email: 'user@email.com',
        company: 'Company user test',
        password: 'mudar123',
      }
      const userCreated = await createUserUseCase.execute(user)

      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'incorrectPassword',
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
