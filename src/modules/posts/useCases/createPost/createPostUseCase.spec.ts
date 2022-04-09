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
        postsRepository = new PostsRepository()
        usersRepository = new UsersRepository()
        createPostUseCase = new CreatePostUseCase(postsRepository)
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

    it("Should not be able to create a new Post with invalid Title", async () => {

        let author = await usersRepository.findByUsername(userDefault.username)

        await expect(createPostUseCase.execute({
            title: "",
            author_id: author.id
        })).rejects.toEqual(new AppError("Invalid Title", 422))
    })
})