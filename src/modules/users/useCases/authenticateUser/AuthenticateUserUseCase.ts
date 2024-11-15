import { IUsersRepository } from '../../repositories/IUsersRepository'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { AppError } from '../../../../errors/AppError'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  email: string
  password: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
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
        expiresIn: '1d',
      }
    )

    return { token }
  }
}

export { AuthenticateUserUseCase }
