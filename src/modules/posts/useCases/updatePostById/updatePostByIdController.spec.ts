import { userDefault } from "@database/seed"
import { PostsRepository } from "@modules/posts/infra/prisma/repositories/PostsRepository"
import { UsersRepository } from "@modules/users/infra/prisma/repositories/UsersRepository"
import { app } from "@shared/infra/http/app"
import request from "supertest"

let usersRepository: UsersRepository
let postsRepository: PostsRepository

describe("Update Post by Id Controller", () => {

    beforeEach(async() => {
        usersRepository = new UsersRepository()
        postsRepository = new PostsRepository()
    })

    it("Shold be able to Update an Post Successfully", async () => {

        let author = await usersRepository.findByUsername(userDefault.username)
        let post = await postsRepository.create({title: "Post for Update", author_id: author.id})

        let userAuth = await request(app).post("/authenticate").send({
            username: userDefault.username,
            password: userDefault.password
        })

        let { token } = userAuth.body

        const response = await request(app).put(`/posts/${post.id}`).send({
            title: "Post Update Controller"
        }).set({
            Authorization: `Bearer ${token}`
        })

        expect(response.status).toBe(202)
        expect(response.body).toHaveProperty("message")
        expect(response.body).toHaveProperty("post")
    })

    it("Shold not be able to Update an Post Successfully by Invalid Id", async () => {

        let author = await usersRepository.findByUsername(userDefault.username)
        await postsRepository.create({title: "Post Failure Id", author_id: author.id})

        let failureId = "fail"

        let userAuth = await request(app).post("/authenticate").send({
            username: userDefault.username,
            password: userDefault.password
        })

        let { token } = userAuth.body

        const response = await request(app).put(`/posts/${failureId}`).send({
            title: "Post Failure at Update Controller"
        }).set({
            Authorization: `Bearer ${token}`
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message")
    })

    it("Shold not be able to Update an Post Successfully by Invalid Token", async () => {

        let author = await usersRepository.findByUsername(userDefault.username)
        let post = await postsRepository.create({title: "Post Failure Token", author_id: author.id})

        let failureToken = "fail"

        const response = await request(app).put(`/posts/${post.id}`).send({
            title: "Post Failure at Update Controller"
        }).set({
            Authorization: `Bearer ${failureToken}`
        })

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")
    })

    it("Shold not be able to Update an Post by Invalid Title", async () => {

        let author = await usersRepository.findByUsername(userDefault.username)
        let post = await postsRepository.create({title: "Post Failure Title", author_id: author.id})

        let userAuth = await request(app).post("/authenticate").send({
            username: userDefault.username,
            password: userDefault.password
        })

        let { token } = userAuth.body

        const response = await request(app).put(`/posts/${post.id}`).send({
            title: ""
        }).set({
            Authorization: `Bearer ${token}`
        })

        expect(response.status).toBe(422)
        expect(response.body).toHaveProperty("message")
    })

    it("Shold not be able to Update an Post Successfully by Invalid Param", async () => {

        let author = await usersRepository.findByUsername(userDefault.username)
        await postsRepository.create({title: "Post Failure Param", author_id: author.id})

        let failureParam = "  "

        let userAuth = await request(app).post("/authenticate").send({
            username: userDefault.username,
            password: userDefault.password
        })

        let { token } = userAuth.body

        const response = await request(app).put(`/posts/${failureParam}`).send({
            title: "Post Failure at Update Controller"
        }).set({
            Authorization: `Bearer ${token}`
        })

        expect(response.status).toBe(404)
    })
})