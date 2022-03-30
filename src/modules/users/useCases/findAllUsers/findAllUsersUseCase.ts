import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import "reflect-metadata"
import { inject, injectable } from "tsyringe";

@injectable()
export class FindAllUsersUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute() {

        const users = await this.usersRepository.findAll()

        return users
    }
}