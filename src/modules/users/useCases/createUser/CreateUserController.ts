import { Request, Response } from 'express'
import { CreateUserUseCase } from './CreateUserUseCase'

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, company, password } = req.body

    const user = await this.createUserUseCase.execute({ name, email, company, password })

    return res.status(201).json(user)
  }
}

export { CreateUserController }
