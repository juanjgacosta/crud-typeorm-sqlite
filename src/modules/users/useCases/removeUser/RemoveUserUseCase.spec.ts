import { AppError } from '../../../../errors/AppError'
import { InMemoryUserRepository } from '../../repositories/inMemory/InMemoryUserRepository'
import { CreateUserUseCase } from '../createUser/CreateUserUseCase'
import { RemoveUserUseCase } from './RemoveUserUseCase'

let createUserUseCase: CreateUserUseCase
let removeUserUseCase: RemoveUserUseCase
let inMemoryUserRepository: InMemoryUserRepository

describe('Remove User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    createUserUseCase = new CreateUserUseCase(inMemoryUserRepository)
    removeUserUseCase = new RemoveUserUseCase(inMemoryUserRepository)
  })

  it('should be able to remove an existent user', async () => {
    const user = await createUserUseCase.execute({
      name: 'User Test',
      email: 'user.test@email.com',
      company: 'Company Test',
      password: 'test123',
      avatar: '',
    })

    expect(user).toHaveProperty('id')

    const deletedUser = await removeUserUseCase.execute(user.id)
    // console.log(deletedUser)

    expect(deletedUser).toHaveProperty('id')
    expect(deletedUser.email).toBe('user.test@email.com')
  })

  it('should not be able to remove a nonexistent user', () => {
    expect(async () => {
      const id = 'invalid-id'
      await removeUserUseCase.execute(id)
    }).rejects.toBeInstanceOf(AppError)
  })
})
