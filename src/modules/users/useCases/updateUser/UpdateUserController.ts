import { Request, Response } from 'express'
import { UpdateUserUseCase } from './UpdateUserUseCase'

class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { name, email, company, password } = req.body

    try {
      const user = await this.updateUserUseCase.execute({ id, name, email, company, password })
      return res.status(200).json({ message: `user - ${email} - updated` })
    } catch (error) {
      const msgError = error as TypeError
      return res.status(404).json({ message: msgError.message })
    }
  }
}

export { UpdateUserController }
