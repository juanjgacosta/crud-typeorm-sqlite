<h1> CRUD </h1>

CRUD Project using Typeorm with sqlite database

<h2> Table of Contents</h2>

- [Project Setup](#project-setup)
- [User entity](#user-entity)
- [User Schema Definition](#user-schema-definition)
- [Additional Notes](#additional-notes)

## Project Setup

- Use the correct version of Node.js

```bash
$ nvm use
```

- Install necessary packages

```bash
$ yarn
```

- Run in development mode

```bash
$ yarn dev
```

## User entity

The `User` entity represents an individual user within the application. It contains essential information such as the user's name, email, company, and authentication details.

## User Schema Definition

The `User` entity is defined with the following fields:

- **id** (`uuid`): The primary key for the user, automatically generated as a UUID.
- **name** (`varchar`): The user's full name.
- **email** (`varchar`): The user's email address, which should be unique within the system.
- **company** (`varchar`): The name of the company the user is associated with.
- **password** (`varchar`): The user's password, stored as a hashed string.
- **created_at** (`timestamp`): The date and time when the user was created, automatically set by the database.
- **updated_at** (`timestamp`): The date and time when the user's information was last updated, automatically set by the database.

## Additional Notes

- **Email Uniqueness**: The project verifies that the email field is unique to avoid duplicate user accounts.
- **Password Storage**: The password is always saved as an encrypted string for security reasons.
