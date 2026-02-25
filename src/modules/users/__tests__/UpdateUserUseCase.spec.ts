import { AppError } from '../../../shared/errors/AppError'
import { InMemoryUserRepository } from '../repositories/inMemory/InMemoryUserRepository'
import { CreateUserService } from '../services/CreateUserService'
import { UpdateUserService } from '../services/UpdateUserService'

let createUserService: CreateUserService
let updateUserService: UpdateUserService
let inMemoryUserRepository: InMemoryUserRepository

describe('Update User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    createUserService = new CreateUserService(inMemoryUserRepository)
    updateUserService = new UpdateUserService(inMemoryUserRepository)
  })

  it('should be able to update an existent user', async () => {
    const user = await createUserService.execute({
      name: 'User Test',
      email: 'user.test@email.com',
      company: 'Company Test',
      password: 'test123',
      avatar: '',
    })

    expect(user).toHaveProperty('id')

    const updatedUser = await updateUserService.execute({
      id: user.id,
      name: 'User Updated',
      email: 'user.updated@email.com',
      company: 'Company Updated',
      password: 'newpassword123',
    })

    expect(updatedUser.name).toBe('User Updated')
    expect(updatedUser.email).toBe('user.updated@email.com')
  })

  it('should not be able to update a nonexistent user', () => {
    expect(async () => {
      const id = 'invalid-id'
      await updateUserService.execute({
        id,
        name: 'User Updated',
        email: 'user.updated@email.com',
        company: 'Company Updated',
        password: 'newpassword123',
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
