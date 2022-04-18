import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import "reflect-metadata"
import { inject, injectable } from "tsyringe";
import { logging } from "@utils/logging";

@injectable()
export class FindAllUsersUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute() {

        logging.debug("findAllUsersUseCase: Found Users successfully")

        return this.usersRepository.findAll()
    }
}