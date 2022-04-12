import { userDefault } from "@database/seed"
import { PostsRepository } from "@modules/posts/infra/prisma/repositories/PostsRepository"
import { UsersRepository } from "@modules/users/infra/prisma/repositories/UsersRepository"
import { app } from "@shared/infra/http/app"
import request from "supertest"

let usersRepository: UsersRepository
let postsRepository: PostsRepository

describe("Delete a Post by Id Controller", () => {

    beforeEach(() => {
        usersRepository = new UsersRepository()
        postsRepository = new PostsRepository()
    })

    it("Should be able to Delete an Post Successfully", async () => {

        let author = await usersRepository.findByUsername(userDefault.username)
        let post = await postsRepository.create({title: "Post Delet", author_id: author.id})

        let userAuth = await request(app).post("/authenticate").send({
            username: userDefault.username,
            password: userDefault.password
        })

        let { token } = userAuth.body

        const response = await request(app).delete(`/posts/${post.id}`).set({
            Authorization: `Bearer ${token}`
        })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("message")
        expect(response.body).toHaveProperty("post")
    })

    it("Should not be able to Delete an Post by Invalid Id", async () => {

        let author = await usersRepository.findByUsername(userDefault.username)
        await postsRepository.create({title: "Post Delet", author_id: author.id})

        let failurePostId = "fail"

        let userAuth = await request(app).post("/authenticate").send({
            username: userDefault.username,
            password: userDefault.password
        })

        let { token } = userAuth.body

        const response = await request(app).delete(`/posts/${failurePostId}`).set({
            Authorization: `Bearer ${token}`
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message")
    })

    it("Should not be able to Delete an Post by Invalid Token", async () => {

        let author = await usersRepository.findByUsername(userDefault.username)
        let post = await postsRepository.create({title: "Post Delet", author_id: author.id})

        let failureToken = "failureTokenTemplate"

        const response = await request(app).delete(`/posts/${post.id}`).set({
            Authorization: `Bearer ${failureToken}`
        })

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")
    })
})