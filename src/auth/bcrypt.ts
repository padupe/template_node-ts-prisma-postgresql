import { AppError } from "../shared/errors/appError"
import { hash, compare } from "bcrypt"
import { logging } from "utils/logging"

export async function hashPassword(password: string) {
    return await hash(password, 10)
}

export async function verifyPassword(password: string, comparePassword: string) {
    const result = await compare(password, comparePassword)
    
    if (result === false) {
        logging.error("User or Password Invalids")
        throw new AppError("User or Password Invalids", 401)
    }

    logging.debug("verifyPassword Success.")
    return result
}