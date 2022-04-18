import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { AppError } from "@shared/errors/appError";
import { logging } from "@utils/logging";

export function validateBodyCreateUser({ name, username, email, password }: ICreateUserDTO) {

    if(name === "" || name === undefined) {
        logging.error("validateBodyCreateUser: Invalid Name")
        throw new AppError("Invalid Name", 422)
    }
    
    if(username === "" || username === undefined) {
        logging.error("validateBodyCreateUser: Invalid Username")
        throw new AppError("Invalid Username", 422)
    }

    if(email === "" || email === undefined) {
        logging.error("validateBodyCreateUser: Invalid Email")
        throw new AppError("Invalid Email", 422)
    }
    
    if(password === "" || password === undefined) {
        logging.error("validateBodyCreateUser: Invalid Password")
        throw new AppError("Invalid Password", 422)
    }
    
    if(name === "" && username === "" && email === "" && password === "") {
        logging.error("validateBodyCreateUser: Invalid Parameters")
        throw new AppError("Invalid Parameters", 422)
    }

    logging.debug("validateBodyUsers Success")

    return true
}