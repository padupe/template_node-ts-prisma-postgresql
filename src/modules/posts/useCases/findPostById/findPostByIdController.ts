import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindPostByIdUseCase } from "./findPostByIdUseCase";

export class FindPostByIdController {

    async handle(request: Request, response: Response) {

        const { id } = request.params

        const findPostByIdUseCase = container.resolve(FindPostByIdUseCase)
        const post = await findPostByIdUseCase.execute(id)

        return response.status(200).json(post)
    }
}