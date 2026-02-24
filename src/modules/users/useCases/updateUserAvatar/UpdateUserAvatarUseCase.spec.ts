import { InMemoryUserRepository } from '../../repositories/inMemory/InMemoryUserRepository'
import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase'
import { CreateUserUseCase } from '../createUser/CreateUserUseCase'
import { AppError } from '../../../../errors/AppError'

let createUserUseCase: CreateUserUseCase
let updateUserAvatarUseCase: UpdateUserAvatarUseCase
let inMemoryUserRepository: InMemoryUserRepository

describe('Update User Avatar', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    createUserUseCase = new CreateUserUseCase(inMemoryUserRepository)
    updateUserAvatarUseCase = new UpdateUserAvatarUseCase(inMemoryUserRepository)
  })

  it('should be able to update the avatar of an existent user', async () => {
    const user = await createUserUseCase.execute({
      name: 'User Test',
      email: 'user.test@email.com',
      company: 'Company Test',
      password: 'test123',
      avatar: '',
    })

    expect(user).toHaveProperty('id')

    await updateUserAvatarUseCase.execute({ user_id: user.id, avatar_file: 'avatar.png' })
  })
  it('should not be able to update a avatar of an nonexistent user', () => {
    expect(async () => {
      const id = 'invalid-id'
      await updateUserAvatarUseCase.execute({
        user_id: id,
        avatar_file: 'avatar.png',
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
