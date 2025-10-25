<h1> CRUD </h1>

CRUD Project using Typeorm with sqlite database

<h2> Table of Contents</h2>

- [Project Setup](#project-setup)
- [Database Migrations](#database-migrations)
  - [Migration Commands](#migration-commands)
  - [Example](#example)
- [User entity](#user-entity)
- [User Schema Definition](#user-schema-definition)
- [User Avatar Upload](#user-avatar-upload)
  - [Key Features](#key-features)
  - [Example workflow](#example-workflow)
  - [Implementation Notes](#implementation-notes)
- [Additional Notes](#additional-notes)
- [Dependency Injection](#dependency-injection)
  - [How it works](#how-it-works)
- [API Documentation](#api-documentation)



## Project Setup

- Use the correct version of Node.js

```bash
$ nvm use
```

- Install necessary packages

```bash
$ npm install
```

- Run in development mode

```bash
$ npm run dev
```

## Database Migrations

The project uses **TypeORM** migrations to manage database schema changes in a controlled way.

### Migration Commands

| Action                               | Script (package.json)                                                                            | Terminal Command                                    |
| ------------------------------------ | ------------------------------------------------------------------------------------------------ | --------------------------------------------------- |
| 🆕 Create a new migration            | `"dev:migration:create": "typeorm migration:create ./src/database/migrations/$npm_config_name"`  | `npm run dev:migration:create --name=MigrationName` |
| ▶️ Run all pending migrations        | `"dev:migration:run": "npm run typeorm -- migration:run -d ./src/database/data-source.ts"`       | `npm run dev:migration:run`                         |
| ⏪ Revert the last applied migration | `"dev:migration:revert": "npm run typeorm -- migration:revert -d ./src/database/data-source.ts"` | `npm run dev:migration:revert`                      |

> **Note:** Each migration file contains two methods:
>
> - `up()`: defines the changes to apply (e.g., adding a table or column).
> - `down()`: defines how to revert those changes (e.g., dropping that table or column).
>
> Only one migration is reverted per execution of `migration:revert`.

### Example

Creating and applying a migration named `AlterUserAddAvatar`:

````bash
npm run dev:migration:create --name=AlterUserAddAvatar
npm run dev:migration:run
````

## User entity

The `User` entity represents an individual user within the application. It contains essential information such as the user's name, email, company, and authentication details.

## User Schema Definition

The `User` entity is defined with the following fields:

- **id** (`uuid`): The primary key for the user, automatically generated as a UUID.
- **name** (`varchar`): The user's full name.
- **email** (`varchar`): The user's email address, which should be unique within the system.
- **company** (`varchar`): The name of the company the user is associated with.
- **password** (`varchar`): The user's password, stored as a hashed string.
- **avatar** (`varchar`): A string reference to the user's avatar file in storage..
- **created_at** (`timestamp`): The date and time when the user was created, automatically set by the database.
- **updated_at** (`timestamp`): The date and time when the user's information was last updated, automatically set by the database.

## User Avatar Upload

- The project supports avatar uploads for users, implemented using the [`multer`](https://github.com/expressjs/multer) library.

### Key Features

- Each user can have only one avatar at a time.
- The uploaded file is stored locally (or in the configured storage service), and its path reference is saved in the avatar field of the User entity.
- When a user is deleted, the corresponding avatar file is also removed from storage automatically.

### Example workflow

1. Send a ```POST``` request to ```/users/:id/avatar``` with a ```multipart/form-data``` body containing the file field named avatar.
2. The server saves the file and updates the user record with the new avatar path.
3. If the user already had an avatar, the previous one is deleted before saving the new file.

### Implementation Notes

- File upload parsing and validation are handled by ```multer```.
- The upload logic resides in a dedicated service responsible for linking and removing avatar files.

## Additional Notes

- **Email Uniqueness**: The project verifies that the email field is unique to avoid duplicate user accounts.
- **Password Storage**: The password is always saved as an encrypted string for security reasons.
- **Avatar Lifecycle**: Each user has a single avatar, which is automatically deleted if the user is removed.

## Dependency Injection

This project follows the **Inversion of Control** principle by using the [`tsyringe`](https://github.com/microsoft/tsyringe) library for dependency injection.

By using dependency injection, the application achieves:

- ✅ Better separation of concerns
- ✅ Easier unit testing and mocking
- ✅ Decoupled service implementations

### How it works

Services and repositories are registered as injectable classes and resolved automatically by the container. This avoids direct instantiation (`new`) and allows greater flexibility and scalability.

For example:

```ts
@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: ICreateUserDTO) {
    // Implementation...
  }
}
````

## API Documentation

The API is documented using **Swagger (OpenAPI 3.0)**.  
You can access the interactive documentation at:

```bash
http://localhost:4000/documentation
```

This page allows you to explore available endpoints, request parameters, and response formats in a user-friendly interface.
