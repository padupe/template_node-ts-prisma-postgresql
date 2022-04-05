import "reflect-metadata"
import { validateParamString } from "validation/validateParam";
import { IResponseFindUser } from "@modules/users/dtos/IResponseFindUserDTO";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/appError";
import { inject, injectable } from "tsyringe";

interface IFindUserByEmail {
    email: string
}

@injectable()
export class FindByEmailUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute({ email }: IFindUserByEmail): Promise<IResponseFindUser> {

        validateParamString(email)

        const user = await this.usersRepository.findByEmail(email)

        if(!user) {
            throw new AppError("User not found!", 403)
        }

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