import "reflect-metadata"
import { validateParamString } from "@validation/validateParam";
import { IResponseFindUserDTO } from "@modules/users/dtos/IResponseFindUserDTO";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/appError";
import { inject, injectable } from "tsyringe";
import { logging } from "utils/logging";

interface IFindUserByEmail {
    email: string
}

@injectable()
export class FindUserByEmailUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute({ email }: IFindUserByEmail): Promise<IResponseFindUserDTO> {

        validateParamString(email)

        const user = await this.usersRepository.findByEmail(email)

        if(!user) {
            logging.error(`findUserByEmailUseCase: User not found by email: ${email}!`)
            throw new AppError("User not found!", 403)
        }

        logging.debug("findUserByEmailUseCase: User found!")

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