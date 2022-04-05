import { AppError } from "@shared/errors/appError";

export function validateBodyAuth(username: string, password: string) {

    if(username === "" || username === undefined) {
        throw new AppError("Invalid Username", 422)
    }

    if(password === "" || password === undefined) {
        throw new AppError("Invalid Password", 422)
    }

    if(username === "" || username === undefined && password === "" || password === undefined) {
        throw new AppError("Invalid Parameters", 422)
    }

    return true
}