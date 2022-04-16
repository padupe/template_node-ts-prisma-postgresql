import { AppError } from "@shared/errors/appError";
import { logging } from "utils/logging";

export function validateParamString(param: string) {

    const regex = /(?!^ +$)^.+$/g

    const validate = regex.test(param)
   
    if(!validate) {
        logging.error("validateParamString: Invalid Parameters")
        throw new AppError("Invalid Parameters", 422)
    }

    logging.debug("validateParamString Success")

    return true
}