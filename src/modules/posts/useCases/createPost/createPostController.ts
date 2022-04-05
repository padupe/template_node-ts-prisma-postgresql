import { Request, Response } from "express"
import { container } from "tsyringe"
import { CreatePostUseCase } from "./createPostUseCase"

export class CreatePostController {

    async handle(request: Request, response: Response) {

        const createPostUseCase = container.resolve(CreatePostUseCase)
        const post = await createPostUseCase.execute(request.body)

        return response.status(201).json(post)
    }
}