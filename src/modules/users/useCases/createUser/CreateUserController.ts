import { Request, Response } from 'express'
import { CreateUserUseCase } from './CreateUserUseCase'

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, company, password } = req.body
    // console.log('password: ', password)

    try {
      const user = await this.createUserUseCase.execute({ name, email, company, password })
      return res.status(201).json(user)
    } catch (error) {
      const msgError = error as TypeError
      return res.status(400).json({ message: msgError.message })
    }
  }
}

export { CreateUserController }
