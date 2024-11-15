import { AppError } from '../../../../errors/AppError'
import { UsersRepositoryInMemory } from '../../repositories/inMemory/UsersRepositoryInMemory'
import { CreateUserUseCase } from './CreateUserUseCase'

let createUserUseCase: CreateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory

describe('Create User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })

  it('Should be able to create a new user', async () => {
    const user = {
      name: 'User Test',
      email: 'usertest@email.com',
      company: 'Company user test',
      password: 'mudar123',
    }
    const userCreated = await createUserUseCase.execute(user)

    // console.log('userCreated: ', userCreated)

    expect(userCreated).toHaveProperty('id')
  })

  it('Should not be able to create a new user with same e-mail', async () => {
    expect(async () => {
      const user = {
        name: 'User Test',
        email: 'usertest@email.com',
        company: 'Company user test',
        password: 'mudar123',
      }
      const firstUserCreated = await createUserUseCase.execute(user)

      const secondUserCreated = await createUserUseCase.execute(user)
    }).rejects.toBeInstanceOf(AppError)
  })
})
