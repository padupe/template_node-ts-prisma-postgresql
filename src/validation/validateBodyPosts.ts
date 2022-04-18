import { AppError } from "@shared/errors/appError"
import { logging } from "@utils/logging"

export function validateBodyPosts (title: string) {

    if(title === "" || title === undefined) {
        logging.error("validateBodyPosts: Invalid Title")
        throw new AppError("Invalid Title", 422)
    }

    logging.debug("validateBodyPosts Success")

    return true
}