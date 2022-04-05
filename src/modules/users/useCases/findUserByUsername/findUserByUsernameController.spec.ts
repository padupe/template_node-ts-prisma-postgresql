import { userDefault } from "@database/seed"
import { UsersRepository } from "@modules/users/infra/prisma/repositories/UsersRepository"
import { app } from "@shared/infra/http/app"
import request from "supertest"

let usersRepository: UsersRepository

describe("Find User by Username Controller", () => {

    beforeEach(async () => {
        usersRepository = new UsersRepository()
    })

    it("Should be able to show an User by username", async () => {

        let test = await usersRepository.findByUsername(userDefault.username)

        const response = await request(app).get(`/users/username/${test.username}`)

        expect(response.status).toBe(200)
        expect.objectContaining("message")
        expect.objectContaining("user")
    })

    it("Should not be able to show an User by invalid username", async () => {

        let failedUsername = "failuere_user"

        const response = await request(app).get(`/users/username/${failedUsername}`)

        expect(response.status).toBe(403)
        expect.objectContaining("message")
    })
})