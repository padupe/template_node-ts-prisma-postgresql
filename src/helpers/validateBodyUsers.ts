import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { AppError } from "@shared/errors/appError";

export function validateBodyCreateUser({ name, username, email, password }: ICreateUserDTO) {

    if(name === "" || username === "" || email === "" || password === "") {
        throw new AppError("Invalid Parameters", 400)
    }

    return true
}