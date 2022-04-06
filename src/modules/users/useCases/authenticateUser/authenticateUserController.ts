import { Request, Response } from "express"
import { container } from "tsyringe"
import { AuthenticateUserUseCase } from "./authenticateUserUseCase"

export class AuthenticateUserController {

    async handle(request: Request, response: Response): Promise<Response> {

        const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)
        const auth = await authenticateUserUseCase.execute(request.body)

        return response.json(auth)
    }
}