import { app } from "@shared/infra/http/app"
import request from "supertest"

describe("Find all Users Controller", () => {

    it("Should be able to list all Users registered at App", async () => {

        const response = await request(app).get("/users")
        
        expect(response.status).toBe(200)
        expect.arrayContaining(Object({}))
    })
})