import { ICreatePostDTO } from "@modules/posts/dtos/ICreatePostDTO";
import { AppError } from "@shared/errors/appError";

export function validateBodyPosts ({ title, author_id }: ICreatePostDTO) {

    if(title === "" || title === undefined) {
        throw new AppError("Invalid Title", 422)
    }

    if(author_id === "" || author_id === undefined) {
        throw new AppError("Invalid Author ID", 422)
    }

    if(title === "" && author_id === "") {
        throw new AppError("Invalid Parameters", 422)
    }

    return true
}