import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { AppError } from "@shared/errors/appError";

export function validateBodyCreateUser({ name, username, email, password }: ICreateUserDTO) {

    if(name === "" || name === undefined) {
        throw new AppError("Invalid Name", 422)
    }
    
    if(username === "" || username === undefined) {
        throw new AppError("Invalid Username", 422)
    }

    if(email === "" || email === undefined) {
        throw new AppError("Invalid Email", 422)
    }
    
    if(password === "" || password === undefined) {
        throw new AppError("Invalid Password", 422)
    }
    
    if(name === "" && username === "" && email === "" && password === "") {
        throw new AppError("Invalid Parameters", 422)
    }

    return true
}