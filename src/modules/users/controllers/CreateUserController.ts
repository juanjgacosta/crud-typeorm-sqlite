import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateUserUseCase } from './CreateUserUseCase'

class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, company, password, avatar } = req.body

    const createUserUseCase = container.resolve(CreateUserUseCase)
    const user = await createUserUseCase.execute({ name, email, company, password, avatar })
    
    return res.status(201).json(user)
  }
}

export { CreateUserController }
