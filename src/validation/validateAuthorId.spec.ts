import { userDefault } from "@database/seed"
import { UsersRepository } from "@modules/users/infra/prisma/repositories/UsersRepository"
import { AppError } from "@shared/errors/appError"
import { validateAuthorId } from "./validateAuthorId"

let usersRepository: UsersRepository

describe("ValidateAuthorId function", () => {

    beforeEach(() => {
        usersRepository = new UsersRepository()
    })

    it("ValidateAuthorId Successfully", async () => {

        let author = await usersRepository.findByUsername(userDefault.username)

        let test = await validateAuthorId(author.id)
        expect(test).toBeTruthy()
    })

    it("ValidateAuthorId with failure Id", async () => {

        try {
            await validateAuthorId("fail")
        } catch(error) {
            expect(error).toBeInstanceOf(AppError)
        }
    })

    it("ValidateAuthorId failure", async () => {

        try {
            await validateAuthorId("")
        } catch(error) {
            expect(error).toBeInstanceOf(AppError)
        }
    })

    it("ValidateAuthorId with blank String", async () => {

        try {
            await validateAuthorId(String())
        } catch(error) {
            expect(error).toBeInstanceOf(AppError)
        }
    })
})