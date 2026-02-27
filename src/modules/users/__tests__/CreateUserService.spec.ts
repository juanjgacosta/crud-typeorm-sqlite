import { AppError } from '../../../shared/errors/AppError'
import { InMemoryUserRepository } from '../repositories/inMemory/InMemoryUserRepository'
import { CreateUserService } from '../services/CreateUserService'

let createUserService: CreateUserService
let inMemoryUserRepository: InMemoryUserRepository

describe('Create User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    createUserService = new CreateUserService(inMemoryUserRepository)
  })

  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'User Test',
      email: 'user.test@email.com',
      company: 'Company Test',
      password: 'test123',
      avatar: '',
    })
    // console.log(user)
    expect(user).toHaveProperty('id')
  })

  it('should not be able to create a new user with e-mail that already exists', async () => {
    expect(async () => {
      const user1 = await createUserService.execute({
        name: 'User Test',
        email: 'user.test@email.com',
        company: 'Company Test',
        password: 'test123',
        avatar: '',
      })

      const user2 = await createUserService.execute({
        name: 'User Test',
        email: 'user.test@email.com',
        company: 'Company Test',
        password: 'test123',
        avatar: '',
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
