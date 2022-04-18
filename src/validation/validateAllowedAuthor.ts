import { AppError } from "@shared/errors/appError";
import { logging } from "@utils/logging";

export async function ValidateAllowedAuthor(post_author: string, author_id: string) {

    if(post_author != author_id) {
        logging.error("validateAllowedAuthor: Invalid Token")
        throw new AppError("Invalid Token", 401)
    }

    logging.debug("validateAllowedAuthor Success")

    return true
}