import { NextFunction, Request, Response } from "express"
import { AppError } from "@shared/errors/appError"
import { verifyJWT } from "@auth/jsonWebToken"
import auth from "@config/auth"
import { FindUserByIdUseCase } from "@modules/users/useCases/findUserById/findUserByIdUseCase"
import { UsersRepository } from "@modules/users/infra/prisma/repositories/UsersRepository"
import { IPayload } from "./dtos/IPayloadDTO"

let findUseByIdUseCase: FindUserByIdUseCase
let usersRepository: UsersRepository

export async function ensureAuthenticateUser(request: Request, response: Response, next: NextFunction) {

    usersRepository = new UsersRepository()
    findUseByIdUseCase = new FindUserByIdUseCase(usersRepository)

    const { secret_key, options } = auth
    const authenticateHeader = request.headers.authorization

    if(!authenticateHeader) {
        throw new AppError("Token Missing", 403)
    }

    const [, token] = authenticateHeader.split(" ")

    try {
        //@ts-ignore
        const { sub } = verifyJWT(token, String(secret_key), options) as IPayload

        const user = await findUseByIdUseCase.execute(sub)

        if(!user) {
            throw new AppError("Invalid Token", 401) 
        }

        request.author_id = sub

        return next()

    } catch (error) {
        throw new AppError("Invalid Token", 401)
    }
}