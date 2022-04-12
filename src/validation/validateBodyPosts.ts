import { AppError } from "@shared/errors/appError"

export function validateBodyPosts (title: string) {

    if(title === "" || title === undefined) {
        throw new AppError("Invalid Title", 422)
    }

    return true
}