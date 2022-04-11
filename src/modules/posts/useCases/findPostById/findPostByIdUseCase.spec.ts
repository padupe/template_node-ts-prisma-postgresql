import { userDefault } from "@database/seed";
import { PostsRepository } from "@modules/posts/infra/prisma/repositories/PostsRepository";
import { UsersRepository } from "@modules/users/infra/prisma/repositories/UsersRepository";
import { AppError } from "@shared/errors/appError";
import { FindPostByIdUseCase } from "./findPostByIdUseCase";

let usersRepository: UsersRepository
let postsRepository: PostsRepository
let findPostByIdUseCase: FindPostByIdUseCase

describe("Find an Post by Id", () => {

    beforeEach(() => {
        usersRepository = new UsersRepository()
        postsRepository = new PostsRepository()
        findPostByIdUseCase = new FindPostByIdUseCase(postsRepository)
    })

    it("Should be able to show an Post by Id", async () => {

        const author = await usersRepository.findByUsername(userDefault.username)
        const postTest = await postsRepository.create({title: "UseCase Test", author_id: author.id})

        const post = await findPostByIdUseCase.execute(postTest.id)

        expect(post).toHaveProperty("id")
        expect(post).toHaveProperty("title")
        expect(post).toHaveProperty("author")
    })

    it("Should not be able to show an Post by invalid Id", async () => {

        await expect(findPostByIdUseCase.execute("fail")).rejects.toEqual(new AppError("Post not found!", 400))
    })

    it("Should not be able to show an Post by invalid param", async () => {

        await expect(findPostByIdUseCase.execute(" ")).rejects.toEqual(new AppError("Invalid Parameters", 422))
    })
})