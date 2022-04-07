import { userDefault } from "@database/seed"
import { app } from "@shared/infra/http/app"
import request from "supertest"

const username = userDefault.username
const password = String(userDefault.password)

describe("Authenticate an User at App", () => {

    it("Should be able to Authenticate an User", async () => {

        const response = await request(app).post("/authenticate").send({
            username,
            password
        })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("message")
        expect(response.body).toHaveProperty("token")
    })

    it("Should no be able to Authenticate an User with incorret password", async () => {

        const response = await request(app).post("/authenticate").send({
            username,
            password: "fail"
        })

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")
    })

    it("Should no be able to Authenticate an User with invalid username", async () => {

        const response = await request(app).post("/authenticate").send({
            username: "fail",
            password
        })

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")
    })

    it("Should no be able to Authenticate an User with invalid parameters", async () => {

        const response = await request(app).post("/authenticate").send({
            username: "",
            password: ""
        })

        expect(response.status).toBe(422)
        expect(response.body).toHaveProperty("message")
    })
})