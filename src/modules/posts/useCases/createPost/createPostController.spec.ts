import { userDefault } from "@database/seed"
import { UsersRepository } from "@modules/users/infra/prisma/repositories/UsersRepository"
import { app } from "@shared/infra/http/app"
import request from "supertest"

let usersRepository: UsersRepository

describe("Create a Post Controller", () => {

    beforeEach(() => {
        usersRepository = new UsersRepository()
    })

    it("Should be able to create a new Post", async () => {

        let user = await usersRepository.findByUsername(userDefault.username)

        const response = await request(app).post("/posts").send({
            title: "Sample Title Post Controller",
            author_id: user.id
        })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("message")
        expect(response.body).toHaveProperty("post")
    })
})