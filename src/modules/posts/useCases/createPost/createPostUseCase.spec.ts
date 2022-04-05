import { AppError } from "@shared/errors/appError"
import { UsersRepository } from "@modules/users/infra/prisma/repositories/UsersRepository"
import { CreatePostUseCase } from "./createPostUseCase"
import { PostsRepository } from "@modules/posts/infra/prisma/repositories/PostsRepository"
import { userDefault } from "@database/seed"

let createPostUseCase: CreatePostUseCase
let usersRepository: UsersRepository
let postsRepository: PostsRepository

describe("Create Post", () => {

    beforeEach(() => {
        usersRepository = new UsersRepository()
        postsRepository = new PostsRepository()
        createPostUseCase = new CreatePostUseCase(postsRepository, usersRepository)
    })

    it("Should be able to create a new Post", async () => {

        let author = await usersRepository.findByUsername(userDefault.username)

        let test = await createPostUseCase.execute({
            title: "Title Post Test",
            author_id: author.id
        })

        expect(test).toHaveProperty("message")
        expect(test).toHaveProperty("post")
    })
})