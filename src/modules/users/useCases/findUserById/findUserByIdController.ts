import { Request, Response } from "express"
import { container } from "tsyringe"
import { FindUserByIdUseCase } from "./findUserByIdUseCase"

export class FindUserByIdController {

    async handle(request: Request, response: Response) {
        
        const { id } = request.params

        const findUserByIdUseCase = container.resolve(FindUserByIdUseCase)
        const user = await findUserByIdUseCase.execute(id)

        return response.status(200).json(user)
    }
}