import { Request, Response } from 'express'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

class AuthenticateUserController {
  constructor(private authenticationUserUseCase: AuthenticateUserUseCase) {}
  async handle(req: Request, res: Response) {
    const { email, password } = req.body

    try {
      const token = await this.authenticationUserUseCase.execute({ email, password })
      return res.status(201).json(token)
    } catch (error) {
      const msgError = error as TypeError
      return res.status(400).json({ message: msgError.message })
    }
  }
}

export { AuthenticateUserController }
