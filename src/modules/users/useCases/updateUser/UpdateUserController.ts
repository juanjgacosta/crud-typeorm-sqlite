import { container } from 'tsyringe'

import { Request, Response } from 'express'
import { UpdateUserUseCase } from './UpdateUserUseCase'

class UpdateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { name, email, company, password } = req.body

    const updateUserUseCase = container.resolve(UpdateUserUseCase)

    const user = await updateUserUseCase.execute({ id, name, email, company, password })

    return res.status(200).json({ message: `user - ${email} - updated` })
  }
}

export { UpdateUserController }
