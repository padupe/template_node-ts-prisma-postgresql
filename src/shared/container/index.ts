import { PostsRepository } from "@modules/posts/infra/prisma/repositories/PostsRepository"
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository"
import { UsersRepository } from "@modules/users/infra/prisma/repositories/UsersRepository"
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository"
import { container } from "tsyringe"

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
)

container.registerSingleton<IPostsRepository>(
    "PostsRepository",
    PostsRepository
)