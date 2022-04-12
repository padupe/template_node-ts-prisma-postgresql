import { userDefault } from "@database/seed"
import { UsersRepository } from "@modules/users/infra/prisma/repositories/UsersRepository"
import { PostsRepository } from "@modules/posts/infra/prisma/repositories/PostsRepository"
import { UpdatePostByIdUseCase } from "./updatePostByIdUseCase"
import { AppError } from "@shared/errors/appError"

let usersRepository: UsersRepository
let postsRepository: PostsRepository
let updatePostByIdUseCase: UpdatePostByIdUseCase

describe("Update an Post by Id", () => {

    beforeEach(() => {
        usersRepository = new UsersRepository()
        postsRepository = new PostsRepository()
        updatePostByIdUseCase = new UpdatePostByIdUseCase(postsRepository)
    })

    it("Should be able to update an Post by Id", async () => {

        let author = await usersRepository.findByEmail(userDefault.email)
        let postTest = await postsRepository.create({title: "Create Post Test", author_id: author.id})

        let newTitle = "Update Post Test"

        let post = await updatePostByIdUseCase.execute(postTest.id, newTitle, author.id)

        expect(post).toHaveProperty("message")
        expect(post).toHaveProperty("post")
    })

    it("Should not be able to update an Post by invalid Title", async () => {

        let author = await usersRepository.findByEmail(userDefault.email)
        let postTest = await postsRepository.create({title: "Create Post Test", author_id: author.id})

        let invalidTitle = ""

        await expect(updatePostByIdUseCase.execute(postTest.id, invalidTitle, author.id)).rejects.toEqual(new AppError("Invalid Title", 422))
    })

    it("Should not be able to update an Post by invalid Id", async () => {

        let author = await usersRepository.findByEmail(userDefault.email)

        let newTitle = "Update Post Failure"

        await expect(updatePostByIdUseCase.execute("fail", newTitle, author.id)).rejects.toEqual(new AppError("Post not found!", 400))
    })

    it("Should not be able to update an Post by different Author", async () => {

        let author = await usersRepository.findByEmail(userDefault.email)
        let postTest = await postsRepository.create({title: "Create Post Test", author_id: author.id})

        let newTitle = "Update Post Failure"
        let authorFail = "different-author"

        await expect(updatePostByIdUseCase.execute(postTest.id, newTitle, authorFail)).rejects.toEqual(new AppError("Invalid Token", 401))
    })

    it("Should not be able to update an Post by invalid Param", async () => {

        let author = await usersRepository.findByEmail(userDefault.email)

        let invalidParam = "  "
        let newTitle = "Update Post Failure"

        await expect(updatePostByIdUseCase.execute(invalidParam, newTitle, author.id)).rejects.toEqual(new AppError("Invalid Parameters", 422))
    })
})