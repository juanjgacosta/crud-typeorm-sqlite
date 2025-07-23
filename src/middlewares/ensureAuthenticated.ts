import { Request, Response, NextFunction } from 'express'
import { AppError } from '../errors/AppError'
import { verify } from 'jsonwebtoken'
import { TokenExpiredError } from 'jsonwebtoken'
import { UsersRepository } from '../modules/users/repositories/implementations/UsersRepository'

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHEader = req.headers.authorization

  if (!authHEader) {
    throw new AppError('Token missing', 401)
  }

  const [, token] = authHEader.split(' ')

  try {
    const decoded = verify(token, '934651a3c23ade31c1328656b9497e19')

    console.log('### decoded: ', decoded)

    const userId = decoded.sub

    const usersRepository = new UsersRepository()

    const user = await usersRepository.findUserById(userId as string)
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      throw new AppError('Token expired', 401)
    }
    throw new AppError('User does not exists!', 401)
  }
  next()
}
