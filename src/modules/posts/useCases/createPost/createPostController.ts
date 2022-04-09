import { Request, Response } from "express"
import { container } from "tsyringe"
import { CreatePostUseCase } from "./createPostUseCase"

export class CreatePostController {

    async handle(request: Request, response: Response) {

        const { author_id } = request
        const { title } = request.body

        const createPostUseCase = container.resolve(CreatePostUseCase)
        const post = await createPostUseCase.execute({title, author_id})

        return response.status(201).json(post)
    }
}