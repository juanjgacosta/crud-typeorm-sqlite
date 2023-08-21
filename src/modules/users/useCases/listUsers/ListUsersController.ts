import { Request, Response } from 'express'
import { ListUsersUseCase } from './ListUsersUseCase'

class ListUsersController {
  constructor(private listUsersUseCase: ListUsersUseCase) {}

  async handle(req: Request, res: Response) {
    const users = await this.listUsersUseCase.execute()
    return res.status(200).json(users)
  }
}

export { ListUsersController }
