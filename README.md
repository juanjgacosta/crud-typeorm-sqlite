<h1 align="center"> CRUD API</h1>

<p align="center">
RESTful CRUD API built with Node.js, TypeScript, TypeORM and SQLite.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/node-%3E%3D18-green" />
  <img src="https://img.shields.io/badge/typescript-5.x-blue" />
  <img src="https://img.shields.io/badge/tested_with-jest-blue" />
  <img src="https://img.shields.io/badge/architecture-clean--architecture-orange" />
</p>


<h2> Table of Contents </h2>

- [About the Project](#about-the-project)
- [Tech Stack](#tech-stack)
- [Project Setup](#project-setup)
  - [1. Use the correct Node.js version](#1-use-the-correct-nodejs-version)
  - [2. Install dependencies](#2-install-dependencies)
  - [3. Run the project in development mode](#3-run-the-project-in-development-mode)
- [Database Migrations](#database-migrations)
  - [Migration Commands](#migration-commands)
  - [Example](#example)
- [User entity](#user-entity)
- [User Avatar Upload](#user-avatar-upload)
  - [Key Features](#key-features)
  - [Example workflow](#example-workflow)
- [Dependency Injection](#dependency-injection)
- [Testing](#testing)
  - [Testing Strategy](#testing-strategy)
  - [Run Tests](#run-tests)
- [API Documentation](#api-documentation)
- [Additional Notes](#additional-notes)



## About the Project

This is a **CRUD API for user management** built using **Node.js**, **TypeScript**, and **TypeORM**.

The project follows **Clean Architecture principles**, where business rules are implemented in **UseCases** and isolated from infrastructure concerns.

Main features:

- Create, list, update, and delete users
- Avatar upload and replacement
- Unit tests for all business rules
- Dependency injection with `tsyringe`
- SQLite database with TypeORM migrations

## Tech Stack

- **Node.js**
- **TypeScript**
- **Express**
- **TypeORM**
- **SQLite**
- **Jest** (unit testing)
- **tsyringe** (dependency injection)
- **multer** (file uploads)
- **bcryptjs** (password hashing)


## Project Setup

### 1. Use the correct Node.js version

```bash
$ nvm use
```

### 2. Install dependencies

```bash
$ npm install
```

### 3. Run the project in development mode

```bash
$ npm run dev
```

## Database Migrations

The project uses **TypeORM** migrations to manage database schema changes.

### Migration Commands

| Action                               | Script (package.json)                                                                            | Terminal Command                                    |
| ------------------------------------ | ------------------------------------------------------------------------------------------------ | --------------------------------------------------- |
| 🆕 Create a new migration            | `"dev:migration:create": "typeorm migration:create ./src/database/migrations/$npm_config_name"`  | `npm run dev:migration:create --name=MigrationName` |
| ▶️ Run migrations        | `"dev:migration:run": "npm run typeorm -- migration:run -d ./src/database/data-source.ts"`       | `npm run dev:migration:run`                         |
| ⏪ Revert last migration | `"dev:migration:revert": "npm run typeorm -- migration:revert -d ./src/database/data-source.ts"` | `npm run dev:migration:revert`                      |

### Example

Creating and applying a migration named `AlterUserAddAvatar`:

```bash
npm run dev:migration:create --name=AlterUserAddAvatar
npm run dev:migration:run
```


## User entity

The `User` entity represents an application user and contains:

| Field      | Type      | Description           |
| ---------- | --------- | --------------------- |
| id         | uuid      | Primary key           |
| name       | varchar   | User full name        |
| email      | varchar   | Unique email          |
| company    | varchar   | Company name          |
| password   | varchar   | Hashed password       |
| avatar     | varchar   | Avatar file reference |
| created_at | timestamp | Creation date         |
| updated_at | timestamp | Last update date      |


## User Avatar Upload

- The project supports avatar uploads using [`multer`](https://github.com/expressjs/multer).

### Key Features

- Each user can have only one avatar.
- The avatar is stored locally (or in the storage service), and its path reference is saved in the avatar field of the User entity.
- The avatar is automatically deleted when:
  - The user uploads a new one
  - The user is removed

### Example workflow

1. Send a `POST` request to `/users/:id/avatar` with a `multipart/form-data` body containing the file field named avatar.
2. The server saves the file and updates the user record with the new avatar path.
3. If the user already had an avatar, the previous one is deleted before saving the new file.

## Dependency Injection

The project uses [`tsyringe`](https://github.com/microsoft/tsyringe) to implement Inversion of Control.

Benefits:

- Better separation of concerns
- Easier testing
- Decoupled architecture

Example:

```ts
@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: ICreateUserDTO) {
    // business logic
  }
}
```

## Testing

The project includes **unit tests for all business rules**.

Each service (UseCase) has a dedicated test file using the naming convention:

```
*.spec.ts
```

### Testing Strategy

- Each **UseCase** is tested in isolation.
- An **InMemory repository** is used to avoid database dependency.
- Tests validate:
  - Successful execution flows
  - Error scenarios
  - Business rule constraints
- This approach guarantees:
  - Fast tests
  - Reliable business logic
  - Clear separation between infrastructure and domain logic

### Run Tests

To execute the test suite:

```bash
npm run test
```

## API Documentation

The API is documented using **Swagger (OpenAPI 3.0)**.  
Access it at:

```bash
http://localhost:4000/documentation
```

You can:
- Explore endpoints
- Test requests
- View parameters and responses


## Additional Notes

- **Email Uniqueness**: The project verifies that the email field is unique to avoid duplicate user accounts.
- **Password Storage**: The password is always saved as an encrypted string for security reasons.
- **Avatar Lifecycle**: Each user has a single avatar, which is automatically deleted if the user is removed.