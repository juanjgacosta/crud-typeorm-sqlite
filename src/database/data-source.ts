import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  // host: 'localhost',
  // port: 4001,
  // username: 'root',
  // password: 'root',
  database: './src/database/database.sqlite',
  synchronize: false,
  logging: false,
  entities: ['./src/modules/users/entities/**.ts'],
  migrations: ['./src/database/migrations/**.ts'],
})

AppDataSource.initialize().then((async) => {
  console.log('Database connection ok')
}).catch((err) => {
  console.error('Database error connection: ', err)
})