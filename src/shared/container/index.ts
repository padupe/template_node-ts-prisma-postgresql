import { UsersRepository } from "@modules/users/infra/prisma/repositories/UsersRepository"
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository"
import { container } from "tsyringe"

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
)