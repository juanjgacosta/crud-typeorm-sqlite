import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { AuthenticateUserService } from '../services/AuthenticateUserService'

class AuthenticateUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body

    const authenticateUserService = container.resolve(AuthenticateUserService)
    const token = await authenticateUserService.execute({ email, password })

    return res.status(201).json(token)
  }
}

export { AuthenticateUserController }
