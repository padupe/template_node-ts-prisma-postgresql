import { app } from "@shared/infra/http/app"
import request from "supertest"

describe("Create a User Controller", () => {

    it("Should be able to create a new User", async () => {

        const response = await request(app).post("/users").send({
            name: "User Controller",
            username: "user-controller",
            email: "user.controller@email.com",
            password: "controllerPass"
        })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("message")
        expect(response.body).toHaveProperty("user")
    })
})