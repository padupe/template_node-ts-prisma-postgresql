import { userDefault } from "@database/seed"
import { UsersRepository } from "@modules/users/infra/prisma/repositories/UsersRepository"
import { app } from "@shared/infra/http/app"
import request from "supertest"

let usersRepository: UsersRepository

describe("Find User by Id Controller", () => {

    beforeEach(async () => {
        usersRepository = new UsersRepository()
    })

    it("Should be able to show an User by id successfully", async () => {

        let test = await usersRepository.findByUsername(userDefault.username)

        const response = await request(app).get(`/users/id/${test.id}`)

        expect(response.status).toBe(200)
        expect.objectContaining("id")
        expect.objectContaining("username")
    })
    
    it("Should not be able to show an User by invalid id", async () => {

        let failedEmail = "fail"

        const response = await request(app).get(`/users/id/${failedEmail}`)

        expect(response.status).toBe(403)
        expect.objectContaining("message")
    })
})