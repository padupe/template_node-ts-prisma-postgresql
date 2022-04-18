import { AppError } from "@shared/errors/appError";
import { logging } from "@utils/logging";

export function validateBodyAuth(username: string, password: string) {

    if(username === "" || username === undefined) {
        logging.error("Invalid Username at validateBodyAuth.")
        throw new AppError("Invalid Username", 422)
    }

    if(password === "" || password === undefined) {
        logging.error("Invalid Password at validateBodyAuth.")
        throw new AppError("Invalid Password", 422)
    }

    if(username === "" || username === undefined && password === "" || password === undefined) {
        logging.error("Invalid Parameters at validateBodyAuth.")
        throw new AppError("Invalid Parameters", 422)
    }

    logging.debug("validateBodyAuth Success")
    return true
}