import "reflect-metadata"
import { validateParamString } from "@validation/validateParam"
import { IResponseFindUserByIdDTO } from "@modules/users/dtos/IResponseFindUserByIdDTO"
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository"
import { AppError } from "@shared/errors/appError"
import { inject, injectable } from "tsyringe"
import { logging } from "@utils/logging"


@injectable()
export class FindUserByIdUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute(user_id: string): Promise<IResponseFindUserByIdDTO> {

        validateParamString(user_id)

        const user = await this.usersRepository.findById(user_id)

        if(!user) {
            logging.error(`findUserByIdUseCase: User not found by id: ${user_id}!`)
            throw new AppError("User not found!", 403)
        }

        logging.debug("findUserByIdUseCase: Found User successfully")

        return {
            id: user.id,
            username: user.username
        }
    }
}