import { userDefault } from "@database/seed"
import { PostsRepository } from "@modules/posts/infra/prisma/repositories/PostsRepository"
import { UsersRepository } from "@modules/users/infra/prisma/repositories/UsersRepository"
import { app } from "@shared/infra/http/app"
import request from "supertest"

let usersRepository: UsersRepository
let postsRepository: PostsRepository

describe("Find Post by Id Controller", () => {

    beforeEach(async () => {
        usersRepository = new UsersRepository()
        postsRepository = new PostsRepository()
    })

    it("Should be able to show an Post by id successfully", async () => {

        let author = await usersRepository.findByUsername(userDefault.username)
        let postTest = await postsRepository.create({title: "UseCase Test", author_id: author.id})
        let test = postTest.id

        const response = await request(app).get(`/posts/${test}`)

        expect(response.status).toBe(200)
        expect.objectContaining("id")
        expect.objectContaining("title")
        expect.objectContaining("author")
    })

    it("Should not be able to show an Post by invalid id", async () => {

        let failedId = "fail"

        const response = await request(app).get(`/posts/${failedId}`)

        expect(response.status).toBe(400)
        expect.objectContaining("message")
    })

    it("Should not be able to show an Post by invalid Param", async () => {

        let invalidParam = "  "

        const response = await request(app).get(`/posts/${invalidParam}`)

        expect(response.status).toBe(404)
    })
})