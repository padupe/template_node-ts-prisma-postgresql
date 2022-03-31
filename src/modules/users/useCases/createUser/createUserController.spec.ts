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

    it("Should not be able to craate a new User with username already exists", async () => {

        const response = await request(app).post("/users").send({
            name: "User Controller Error",
            username: "user-controller",
            email: "user.controller_error@email.com",
            password: "controllerError"
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message")
    })

    it("Should not be able to craate a new User with email already exists", async () => {

        const response = await request(app).post("/users").send({
            name: "User Controller Error",
            username: "user-controller.error",
            email: "user.controller@email.com",
            password: "controllerError"
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message")
    })

    it("Should not be able to craate a new User with email missing parameters", async () => {

        const response = await request(app).post("/users").send({
            name: "User Controller Error",
            email: "user.controller@email.com",
            password: "controllerError"
        })

        expect(response.status).toBe(500)
        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("message")
    })
})