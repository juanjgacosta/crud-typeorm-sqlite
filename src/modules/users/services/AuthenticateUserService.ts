import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../shared/errors/AppError'
import { IUsersRepository } from '../repositories/IUsersRepository'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  name: string
  email: string
  token: string
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ email, password }: IRequest) {
    const user = await this.usersRepository.findUserByEmail(email)

    if (!user) {
      throw new AppError('Email/Password incorrect')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError('Email/Password incorrect')
    }

    const token = sign(
      {
        email: user.email,
      },
      '934651a3c23ade31c1328656b9497e19',
      {
        subject: user.id,
        expiresIn: '30m',
      },
    )

    const tokenReturn: IResponse = {
      name: user.name,
      email: user.email,
      token,
    }

    return tokenReturn
  }
}

export { AuthenticateUserService }
