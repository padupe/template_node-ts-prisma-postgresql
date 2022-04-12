import { userDefault } from "@database/seed"
import { PostsRepository } from "@modules/posts/infra/prisma/repositories/PostsRepository"
import { UsersRepository } from "@modules/users/infra/prisma/repositories/UsersRepository"
import { AppError } from "@shared/errors/appError";
import { DeletePostByIdUseCase } from "./deletePostByIdUseCase"

let usersRepository: UsersRepository
let postsRepository: PostsRepository
let deletePostByIdUseCase: DeletePostByIdUseCase

describe("Find an Post by Id", () => {

    beforeEach(() => {
        usersRepository = new UsersRepository()
        postsRepository = new PostsRepository()
        deletePostByIdUseCase = new DeletePostByIdUseCase(postsRepository)
    })

    it("Should be able to Delete an Post by Id", async () => {

        let author = await usersRepository.findByUsername(userDefault.username)
        let postTest = await postsRepository.create({title: "Delete Post Test", author_id: author.id})

        let post = await deletePostByIdUseCase.execute(postTest.id, author.id)

        expect(post).toHaveProperty("message")
        expect(post).toHaveProperty("post")
    })

    it("Should not be able to Delete an Post by invalid Id", async () => {

        let author = await usersRepository.findByUsername(userDefault.username)
        let postFailure = "fail"
        
        await expect(deletePostByIdUseCase.execute(postFailure, author.id)).rejects.toEqual(new AppError("Post not found!", 400))
    })

    it("Should not be able to Delete an Post by different author", async () => {

        let author = await usersRepository.findByUsername(userDefault.username)
        let postTest = await postsRepository.create({title: "Failure Post Test", author_id: author.id})
        let authorFailure = "fail"
        
        await expect(deletePostByIdUseCase.execute(postTest.id, authorFailure)).rejects.toEqual(new AppError("Invalid Token", 401))
    })

    it("Should not be able to Delete an Post by invalid Param", async () => {

        let author = await usersRepository.findByUsername(userDefault.username)
        let invalidParam = "  "
        
        await expect(deletePostByIdUseCase.execute(invalidParam, author.id)).rejects.toEqual(new AppError("Invalid Parameters", 422))
    })
})