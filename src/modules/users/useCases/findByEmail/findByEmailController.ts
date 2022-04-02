import { Request, Response } from "express"
import { container } from "tsyringe"
import { FindByEmailUseCase } from "./findByEmailUseCase"

export class FindByEmailController {

    async handle(request: Request, response: Response) {

        const { email } = request.params

        const findByEmailUseCase = container.resolve(FindByEmailUseCase)
        const user = await findByEmailUseCase.execute({email})

        return response.status(200).json(user)
    }
}