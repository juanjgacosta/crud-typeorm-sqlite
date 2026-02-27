import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListUsersService } from '../services/ListUsersService'

class ListUsersController {
  async handle(req: Request, res: Response) {
    const listUsersService = container.resolve(ListUsersService)
    const users = await listUsersService.execute()
    return res.status(200).json(users)
  }
}

export { ListUsersController }
