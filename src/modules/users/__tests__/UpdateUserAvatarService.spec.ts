import { AppError } from '../../../shared/errors/AppError'
import { InMemoryUserRepository } from '../repositories/inMemory/InMemoryUserRepository'
import { UpdateUserAvatarService } from '../services/UpdateUserAvatarService'
import { CreateUserService } from '../services/CreateUserService'

let createUserService: CreateUserService
let updateUserAvatarService: UpdateUserAvatarService
let inMemoryUserRepository: InMemoryUserRepository

describe('Update User Avatar', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    createUserService = new CreateUserService(inMemoryUserRepository)
    updateUserAvatarService = new UpdateUserAvatarService(inMemoryUserRepository)
  })

  it('should be able to update the avatar of an existent user', async () => {
    const user = await createUserService.execute({
      name: 'User Test',
      email: 'user.test@email.com',
      company: 'Company Test',
      password: 'test123',
      avatar: '',
    })

    expect(user).toHaveProperty('id')

    await updateUserAvatarService.execute({ user_id: user.id, avatar_file: 'avatar.png' })
  })
  it('should not be able to update a avatar of an nonexistent user', () => {
    expect(async () => {
      const id = 'invalid-id'
      await updateUserAvatarService.execute({
        user_id: id,
        avatar_file: 'avatar.png',
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
