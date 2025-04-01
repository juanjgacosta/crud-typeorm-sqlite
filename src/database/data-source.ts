import { DataSource } from 'typeorm'

const databaseFile =
  process.env.NODE_ENV === 'test'
    ? './src/database/database.test.sqlite'
    : './src/database/database.sqlite'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  // host: 'localhost',
  // port: 4001,
  // username: 'root',
  // password: 'root',
  // database: './src/database/database.sqlite',
  database: databaseFile,
  synchronize: false,
  logging: false,
  entities: ['./src/modules/users/entities/**.ts'],
  migrations: ['./src/database/migrations/**.ts'],
})

AppDataSource.initialize()
  .then((async) => {
    console.log(`Database connection ok with: ${databaseFile}`)
  })
  .catch((err) => {
    console.error('Database error connection: ', err)
  })
