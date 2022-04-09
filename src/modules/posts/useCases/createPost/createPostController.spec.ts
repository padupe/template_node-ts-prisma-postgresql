import { userDefault } from "@database/seed"
import { UsersRepository } from "@modules/users/infra/prisma/repositories/UsersRepository"
import { AuthenticateUserUseCase } from "@modules/users/useCases/authenticateUser/authenticateUserUseCase"
import { app } from "@shared/infra/http/app"
import request from "supertest"

let usersRepository: UsersRepository
let authenticateUserUseCase: AuthenticateUserUseCase

describe("Create a Post Controller", () => {

    beforeEach(() => {
        usersRepository = new UsersRepository()
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository)
    })

    it("Should be able to create a new Post", async () => {

        const userAuth = await request(app).post("/authenticate").send({
            username: userDefault.username,
            password: userDefault.password
        })

        let { token } = userAuth.body

        const response = await request(app).post("/posts").send({
            title: "Sample Title Post Controller"
        }).set({
            Authorization: `Bearer ${token}`
        })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("message")
        expect(response.body).toHaveProperty("post")
    })

    it("Should not be able to create a new Post with invalid token", async () => {

        let tokenfail = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"

        const response = await request(app).post("/posts").send({
            title: "Sample Title Post Controller"
        }).set({
            Authorization: `Bearer ${tokenfail}`
        })

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")
    })

    it("Should not be able to create a new Post without informing the Bearer Token", async () => {

        const response = await request(app).post("/posts").send({
            title: "Sample Title Post Controller"
        })

        expect(response.status).toBe(403)
        expect(response.body).toHaveProperty("message")
    })
})