import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateUserService } from '../services/CreateUserService'

class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, company, password, avatar } = req.body

    const createUserService = container.resolve(CreateUserService)
    const user = await createUserService.execute({ name, email, company, password, avatar })

    return res.status(201).json(user)
  }
}

export { CreateUserController }
