import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { RemoveUserService } from '../services/RemoveUserService'

class RemoveUserController {
  async handle(req: Request, res: Response) {
    const { id } = req.params

    const removeUserService = container.resolve(RemoveUserService)
    const user = await removeUserService.execute(id)

    return res.status(200).json({ message: `The User - ${user.email} - has been removed` })
  }
}

export { RemoveUserController }
