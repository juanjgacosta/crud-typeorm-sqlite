import { AppError } from '../../../shared/errors/AppError'
import { InMemoryUserRepository } from '../repositories/inMemory/InMemoryUserRepository'
import { CreateUserUseCase } from '../services/createUser/CreateUserUseCase'
import { UpdateUserUseCase } from '../services/UpdateUserService'

let createUserUseCase: CreateUserUseCase
let updateUserUseCase: UpdateUserUseCase
let inMemoryUserRepository: InMemoryUserRepository

describe('Update User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    createUserUseCase = new CreateUserUseCase(inMemoryUserRepository)
    updateUserUseCase = new UpdateUserUseCase(inMemoryUserRepository)
  })

  it('should be able to update an existent user', async () => {
    const user = await createUserUseCase.execute({
      name: 'User Test',
      email: 'user.test@email.com',
      company: 'Company Test',
      password: 'test123',
      avatar: '',
    })

    expect(user).toHaveProperty('id')

    const updatedUser = await updateUserUseCase.execute({
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
      await updateUserUseCase.execute({
        id,
        name: 'User Updated',
        email: 'user.updated@email.com',
        company: 'Company Updated',
        password: 'newpassword123',
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
