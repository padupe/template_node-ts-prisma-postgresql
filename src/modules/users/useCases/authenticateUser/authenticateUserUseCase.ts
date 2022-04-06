import { verifyPassword } from "@auth/bcrypt";
import { signJWT } from "@auth/jsonWebToken";
import auth from "@config/auth";
import { IAuthenticateUserDTO } from "@modules/users/dtos/IAuthenticateUserDTO";
import { IResponseAuthenticateUserDTO } from "@modules/users/dtos/IResponseAuthenticateUserDTO";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { validateBodyAuth } from "@validation/validateBodyAuth";
import { inject, injectable } from "tsyringe"

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

        const userID = user.id
        const userEmail = user.email

        await verifyPassword(password, user.password)

        const token = signJWT({userID, userEmail}, String(secret_key), options)

        return {
            message: "User registered at App",
            token
        }
    }
}