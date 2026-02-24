import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateUserService } from '../services/UpdateUserService'

class UpdateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { name, email, company, password } = req.body

    const updateUserService = container.resolve(UpdateUserService)

    await updateUserService.execute({ id, name, email, company, password })

    return res.status(200).json({ message: `user - ${email} - updated` })
  }
}

export { UpdateUserController }
