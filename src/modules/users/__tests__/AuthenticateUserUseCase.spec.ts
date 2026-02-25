import { AppError } from '../../../shared/errors/AppError'
import { InMemoryUserRepository } from '../repositories/inMemory/InMemoryUserRepository'
import { CreateUserService } from '../services/CreateUserService'
import { AuthenticateUserService } from '../services/AuthenticateUserService'

let inMemoryUserRepository: InMemoryUserRepository
let createUserService: CreateUserService
let authenticateUserService: AuthenticateUserService

describe('Authenticate User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    createUserService = new CreateUserService(inMemoryUserRepository)
    authenticateUserService = new AuthenticateUserService(inMemoryUserRepository)
  })

  it('should be able to authenticate a user', async () => {
    const user = {
      name: 'User Test',
      email: 'user.test@email.com',
      company: 'Company Test',
      password: 'test123',
      avatar: '',
    }

    const userResponse = await createUserService.execute(user)
    // console.log(userResponse)
    expect(userResponse).toHaveProperty('id')

    const result = await authenticateUserService.execute({
      email: user.email,
      password: user.password,
    })

    expect(result).toHaveProperty('token')
  })

  it('should not be able to authenticate a nonexistent user', () => {
    expect(async () => {
      await authenticateUserService.execute({
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

      const userResponse = await createUserService.execute(user)

      await authenticateUserService.execute({
        email: 'user.test@email.com',
        password: 'incorrectPassword',
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
