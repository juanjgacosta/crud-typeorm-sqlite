import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { RemoveUserUseCase } from './RemoveUserUseCase'

class RemoveUserController {
  async handle(req: Request, res: Response) {
    const { id } = req.params

    const removeUserUseCase = container.resolve(RemoveUserUseCase)
    const user = await removeUserUseCase.execute(id)

    return res.status(200).json({ message: `The User - ${user.email} - has been removed` })
  }
}

export { RemoveUserController }
