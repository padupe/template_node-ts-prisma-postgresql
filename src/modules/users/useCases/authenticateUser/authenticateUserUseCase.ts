import "reflect-metadata"
import { verifyPassword } from "@auth/bcrypt";
import { signJWT } from "@auth/jsonWebToken";
import auth from "@config/auth";
import { IAuthenticateUserDTO } from "@modules/users/dtos/IAuthenticateUserDTO";
import { IResponseAuthenticateUserDTO } from "@modules/users/dtos/IResponseAuthenticateUserDTO";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { validateBodyAuth } from "@validation/validateBodyAuth";
import { inject, injectable } from "tsyringe"
import { AppError } from "@shared/errors/appError";

@injectable()
export class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute({ username, password }: IAuthenticateUserDTO): Promise<IResponseAuthenticateUserDTO>{

        validateBodyAuth(username, password)

        const { secret_key, options } = auth

        const user = await this.usersRepository.findByUsername(username)

        if(!user) {
            throw new AppError("User or Password Invalids", 401)
        }

        const userID = user.id
        const userEmail = user.email

        await verifyPassword(password, user.password)

        const token = signJWT({userEmail}, String(secret_key), {
            algorithm: options.algorithm,
            issuer: options.issuer,
            expiresIn: options.expiresIn,
            subject: userID,
        })

        return {
            message: "User registered at App",
            token
        }
    }
}