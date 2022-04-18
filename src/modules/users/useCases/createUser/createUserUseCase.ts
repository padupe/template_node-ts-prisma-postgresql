import "reflect-metadata"
import { hashPassword } from "@auth/bcrypt";
import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { IResponseCreateUserDTO } from "@modules/users/dtos/IResponseCreateUserDTO";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/appError";
import { inject, injectable } from "tsyringe";
import { validateBodyCreateUser } from "@validation/validateBodyUsers";
import { logging } from "@utils/logging";

@injectable()
export class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute({ name, username, email, password }: ICreateUserDTO): Promise<IResponseCreateUserDTO> {
        
        validateBodyCreateUser({name, username, email, password})

        logging.debug(`createUseUseCase: name: ${name} | username: ${username} | email: ${email}.`)
        
        const usernameExists = await this.usersRepository.findByUsername(username)
        const emailExists = await this.usersRepository.findByEmail(email)

        if(usernameExists || emailExists) {
            logging.error("createUseUseCase: User already exists!")
            throw new AppError("User already exists!")
        }

        const user = await this.usersRepository.create({
            name,
            username,
            email,
            password: await hashPassword(password)
        })

        logging.debug("createUseUseCase: New User Registered!")

        return {
            message: "User registered",
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        }
    }
}