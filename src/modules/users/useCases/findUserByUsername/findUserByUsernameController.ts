import { Request, Response } from "express"
import { container } from "tsyringe"
import { FindUserByUsernameUseCase } from "./findUserByUsernameUseCase"

export class FindUserByUsernameController {

    async handle(request: Request, response: Response) {

        const { username } = request.params

        const findUserByUsernameUseCase = container.resolve(FindUserByUsernameUseCase)
        const user = await findUserByUsernameUseCase.execute({ username })

        return response.status(200).json(user)
    }
}