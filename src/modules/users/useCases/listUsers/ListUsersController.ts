import { container } from 'tsyringe'

import { Request, Response } from 'express'
import { ListUsersUseCase } from './ListUsersUseCase'

class ListUsersController {
  async handle(req: Request, res: Response) {
    const listUsersUseCase = container.resolve(ListUsersUseCase)

    const users = await listUsersUseCase.execute()
    return res.status(200).json(users)
  }
}

export { ListUsersController }
