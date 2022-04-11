import { userDefault } from "@database/seed"
import { UsersRepository } from "@modules/users/infra/prisma/repositories/UsersRepository"
import { AppError } from "@shared/errors/appError"
import { ValidateAllowedAuthor } from "./validateAllowedAuthor"

let usersRepository: UsersRepository

describe("ValidateAuthorId function", () => {

    beforeEach(() => {
        usersRepository = new UsersRepository()
    })

    it("ValidateAllowedAuthor Successfully", async () => {

        let author = await usersRepository.findByUsername(userDefault.username)
        let id = author.id

        let test = await ValidateAllowedAuthor(author.id, id)
        expect(test).toBeTruthy()
    })

    it("ValidateAllowedAuthor failure by Invalid 'post_author'", async () => {
        
        let author = await usersRepository.findByUsername(userDefault.username)
        let id = author.id
        let failurePostAuthor = "fail"

        try {
            await ValidateAllowedAuthor(failurePostAuthor, id)
        } catch (error) {
            expect(error).toBeInstanceOf(AppError)
        }
    })

    it("ValidateAllowedAuthor failure by Invalid 'author_id'", async () => {
        
        let author = await usersRepository.findByUsername(userDefault.username)
        let failureAuthorId = "fail"

        try {
            await ValidateAllowedAuthor(author.id, failureAuthorId)
        } catch (error) {
            expect(error).toBeInstanceOf(AppError)
        }
    })
})