import { AppError } from '../../../shared/errors/AppError'
import { InMemoryUserRepository } from '../repositories/inMemory/InMemoryUserRepository'
import { CreateUserService } from '../services/CreateUserService'
import { RemoveUserService } from '../services/RemoveUserService'

let createUserService: CreateUserService
let removeUserService: RemoveUserService
let inMemoryUserRepository: InMemoryUserRepository

describe('Remove User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    createUserService = new CreateUserService(inMemoryUserRepository)
    removeUserService = new RemoveUserService(inMemoryUserRepository)
  })

  it('should be able to remove an existent user', async () => {
    const user = await createUserService.execute({
      name: 'User Test',
      email: 'user.test@email.com',
      company: 'Company Test',
      password: 'test123',
      avatar: '',
    })

    expect(user).toHaveProperty('id')

    const deletedUser = await removeUserService.execute(user.id)
    // console.log(deletedUser)

    expect(deletedUser).toHaveProperty('id')
    expect(deletedUser.email).toBe('user.test@email.com')
  })

  it('should not be able to remove a nonexistent user', () => {
    expect(async () => {
      const id = 'invalid-id'
      await removeUserService.execute(id)
    }).rejects.toBeInstanceOf(AppError)
  })
})
