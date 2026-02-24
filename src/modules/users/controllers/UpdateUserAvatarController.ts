import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateUserAvatarService } from '../services/UpdateUserAvatarService'

class UpdateUserAvatarController {
  async handle(req: Request, res: Response): Promise<Response> {
    // const { id } = req.user
    const { id } = req.params
    const avatar_file = req.file.filename

    console.log('##file: ', avatar_file)

    const updateUserAvatarService = container.resolve(UpdateUserAvatarService)

    await updateUserAvatarService.execute({ user_id: id, avatar_file })

    return res.status(204).send()
  }
}

export { UpdateUserAvatarController }
