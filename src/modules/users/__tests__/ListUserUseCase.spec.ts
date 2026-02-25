import { InMemoryUserRepository } from '../repositories/inMemory/InMemoryUserRepository'
import { CreateUserService } from '../services/CreateUserService'
import { ListUsersService } from '../services/ListUsersService'

let createUserService: CreateUserService
let inMemoryUserRepository: InMemoryUserRepository
let listUsersService: ListUsersService

describe('List Users', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    createUserService = new CreateUserService(inMemoryUserRepository)
    listUsersService = new ListUsersService(inMemoryUserRepository)
  })
  it('should be able to list all registered users', async () => {
    const user1 = await createUserService.execute({
      name: 'User Test 1',
      email: 'user1.test@email.com',
      company: 'Company Test 1',
      password: 'test123',
      avatar: '',
    })

    expect(user1).toHaveProperty('id')

    const user2 = await createUserService.execute({
      name: 'User Test 2',
      email: 'user2.test@email.com',
      company: 'Company Test 2',
      password: 'test123',
      avatar: '',
    })
    expect(user2).toHaveProperty('id')

    const users = await listUsersService.execute()
    // console.log('## users: ', users)

    expect(users).toHaveLength(2)
    expect(users[0]).toHaveProperty('id')
    expect(users[0]).toHaveProperty('name')
    expect(users[0]).toHaveProperty('email')
    expect(users[0]).toHaveProperty('company')
    expect(users[0]).toHaveProperty('password')
    expect(users[0]).toHaveProperty('avatar')
  })

  it('should return an empty array when there are no users', async () => {
    const users = await listUsersService.execute()

    expect(users).toEqual([])
  })
})
