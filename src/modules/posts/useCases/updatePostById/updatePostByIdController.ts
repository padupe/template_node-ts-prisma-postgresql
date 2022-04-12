import { Request, Response } from "express"
import { container } from "tsyringe"
import { UpdatePostByIdUseCase } from "./updatePostByIdUseCase"

export class UpdatePostByIdController {

    async handle(request: Request, response: Response) {

        const { author_id } = request
        const { id } = request.params
        const { title } = request.body

        const updatePostByIdUseCase = container.resolve(UpdatePostByIdUseCase)
        const post = await updatePostByIdUseCase.execute(id, title, author_id)

        return response.status(202).json(post)
    }
}