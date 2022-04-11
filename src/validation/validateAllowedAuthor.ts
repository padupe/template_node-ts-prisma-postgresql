import { AppError } from "@shared/errors/appError";

export async function ValidateAllowedAuthor(post_author: string, author_id: string) {

    if(post_author != author_id) {
        throw new AppError("Invalid Token", 401)
    }

    return true
}