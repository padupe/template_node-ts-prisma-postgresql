import { Request, Response } from "express"
import { container } from "tsyringe"
import { FindAllUsersUseCase } from "./findAllUsersUseCase"

export class FindAllUsersController {

    async handle(request: Request, response: Response): Promise<Response> {

        const findAllUsersUseCase = container.resolve(FindAllUsersUseCase)
        const users = await findAllUsersUseCase.execute()

        return response.status(200).json(users)
    }
}