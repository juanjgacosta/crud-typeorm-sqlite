import { AppError } from '../../../shared/errors/AppError'
import { InMemoryUserRepository } from '../repositories/inMemory/InMemoryUserRepository'
import { CreateUserUseCase } from '../useCases/createUser/CreateUserUseCase'
import { AuthenticateUserUseCase } from '../useCases/authenticateUser/AuthenticateUserUseCase'

let inMemoryUserRepository: InMemoryUserRepository
let createUserUseCase: CreateUserUseCase
let authenticateUserUseCase: AuthenticateUserUseCase

describe('Authenticate User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    createUserUseCase = new CreateUserUseCase(inMemoryUserRepository)
    authenticateUserUseCase = new AuthenticateUserUseCase(inMemoryUserRepository)
  })

  it('should be able to authenticate a user', async () => {
    const user = {
      name: 'User Test',
      email: 'user.test@email.com',
      company: 'Company Test',
      password: 'test123',
      avatar: '',
    }

    const userResponse = await createUserUseCase.execute(user)
    // console.log(userResponse)
    expect(userResponse).toHaveProperty('id')

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    })

    expect(result).toHaveProperty('token')
  })

  it('should not be able to authenticate a nonexistent user', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'false@email.com',
        password: '1234',
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate with incorrect password', () => {
    expect(async () => {
      const user = {
        name: 'User Test Error',
        email: 'user.test@email.com',
        company: 'Company Test',
        password: 'test123',
        avatar: '',
      }

      const userResponse = await createUserUseCase.execute(user)

      await authenticateUserUseCase.execute({
        email: 'user.test@email.com',
        password: 'incorrectPassword',
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
