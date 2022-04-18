import { UsersRepository } from "@modules/users/infra/prisma/repositories/UsersRepository";
import { AppError } from "@shared/errors/appError";
import { logging } from "@utils/logging";

export async function validateAuthorId(author_id: string) {

    let usersRepository: UsersRepository
    usersRepository = new UsersRepository()

    const author = usersRepository.findById(author_id)

    if(!author) {
        logging.error("validateAuthorId: User not found!")
        throw new AppError("User not found!", 400)
    }

    logging.debug("validateAuthorId Success")

    return author
}