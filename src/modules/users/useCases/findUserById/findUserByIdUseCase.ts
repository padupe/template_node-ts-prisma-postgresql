import "reflect-metadata"
import { validateParamString } from "@validation/validateParam"
import { IResponseFindUserByIdDTO } from "@modules/users/dtos/IResponseFindUserByIdDTO"
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository"
import { AppError } from "@shared/errors/appError"
import { inject, injectable } from "tsyringe"


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
            throw new AppError("User not found!", 403)
        }

        return {
            id: user.id,
            username: user.username
        }
    }
}