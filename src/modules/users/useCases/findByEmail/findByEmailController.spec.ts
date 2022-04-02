import { userDefault } from "@database/seed"
import { UsersRepository } from "@modules/users/infra/prisma/repositories/UsersRepository"
import { app } from "@shared/infra/http/app"
import request from "supertest"

let usersRepository: UsersRepository

describe("Find User by Email Controller", () => {

    beforeEach(async () => {
        usersRepository = new UsersRepository()
    })

    it("Should be able to show an User by email address successfully", async () => {

        let test = await usersRepository.findByEmail(userDefault.email)

        const response = await request(app).get(`/users/${test.email}`)

        expect(response.status).toBe(200)
        expect.objectContaining("message")
        expect.objectContaining("user")
    })
    
    it("Should not be able to show an User by invalid email", async () => {

        let failedEmail = "fail"

        const response = await request(app).get(`/users/${failedEmail}`)

        expect(response.status).toBe(403)
        expect.objectContaining("message")
    })
})