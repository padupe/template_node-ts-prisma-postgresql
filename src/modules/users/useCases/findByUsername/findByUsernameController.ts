import { Request, Response } from "express"
import { container } from "tsyringe"
import { FindByUsernameUseCase } from "./findByUsernameUseCase"

export class FindByUsernameController {

    async handle(request: Request, response: Response) {

        const { username } = request.params

        const findByUsernameUseCase = container.resolve(FindByUsernameUseCase)
        const user = await findByUsernameUseCase.execute({ username })

        return response.status(200).json(user)
    }
}