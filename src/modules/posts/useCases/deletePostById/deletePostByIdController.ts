import { Request, Response } from "express"
import { container } from "tsyringe"
import { DeletePostByIdUseCase } from "./deletePostByIdUseCase"

export class DeletePostByIDController {

    async handle(request: Request, response: Response) {

        const { author_id } = request
        const { id } = request.params

        const deletePostByIdUseCase = container.resolve(DeletePostByIdUseCase)
        await deletePostByIdUseCase.execute(id, author_id)

        return response.json(200)
    }
}