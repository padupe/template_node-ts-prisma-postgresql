import { UsersRepository } from "@modules/users/infra/prisma/repositories/UsersRepository";
import { AppError } from "@shared/errors/appError";

export async function validateAuthorId(author_id: string) {

    let usersRepository: UsersRepository
    usersRepository = new UsersRepository()

    const author = usersRepository.findById(author_id)

    if(!author) {
        throw new AppError("User not found!", 400)
    }

    return author
}