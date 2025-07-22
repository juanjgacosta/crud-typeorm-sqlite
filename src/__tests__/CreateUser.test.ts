import request from 'supertest'
import { app } from '../../src/app'
import { AppDataSource } from '../../src/database/data-source'

describe('Create User', () => {
  beforeAll(() => {
    // TODO
  })

  it('Should be able to create a new user', async () => {
    const response = await request(app).post('/users').send({
      name: 'User Test',
      email: 'user@emailtest.com',
      company: 'Company Test',
      password: 'test123',
    })
    expect(response.status).toBe(201)
  })
})
