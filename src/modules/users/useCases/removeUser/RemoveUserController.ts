import { Request, Response } from 'express'
import { RemoveUserUseCase } from './RemoveUserUseCase'

class RemoveUserController {
  constructor(private removeUserUseCase: RemoveUserUseCase) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params
    try {
      const user = await this.removeUserUseCase.execute(id)
      return res.status(200).json({ message: `The User - ${user.email} - has been removed` })
    } catch (error) {
      const msgError = error as TypeError
      return res.status(404).json({ message: msgError })
    }
  }
}

export { RemoveUserController }
