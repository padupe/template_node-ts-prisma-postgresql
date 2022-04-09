import { ICreatePostDTO } from "@modules/posts/dtos/ICreatePostDTO";
import { AppError } from "@shared/errors/appError";

export function validateBodyPosts ({ title }: ICreatePostDTO) {

    if(title === "" || title === undefined) {
        throw new AppError("Invalid Title", 422)
    }

    return true
}