import "reflect-metadata"
import { validateParamString } from "@validation/validateParam"
import { IResponseFindUserDTO } from "@modules/users/dtos/IResponseFindUserDTO"
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository"
import { AppError } from "@shared/errors/appError"
import { inject, injectable } from "tsyringe"
import { logging } from "utils/logging"

interface IFindUserByUsername {
    username: string;
}

@injectable()
export class FindUserByUsernameUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute({ username }: IFindUserByUsername): Promise<IResponseFindUserDTO> {

        validateParamString(username)

        const user = await this.usersRepository.findByUsername(username)

        if(!user) {
            logging.error(`findUserByUsernameUseCase: User not found by username: ${username}!`)
            throw new AppError("User not found!", 403)
        }

        logging.debug("findUserByUsernameUseCase: Found User successfully")

        return {
            message: "User found!",
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        }
    }
}