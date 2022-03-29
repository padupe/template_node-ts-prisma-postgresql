import { clearDataBase, populateDataBase } from "@database/seed"
import { UsersRepository } from "@modules/users/infra/prisma/repositories/UsersRepository"
import { AppError } from "@shared/errors/appError"
import { CreateUserUseCase } from "./createUserUseCase"

let createUserUseCase: CreateUserUseCase
let usersRepository: UsersRepository

beforeAll(async () => {
    await clearDataBase()
    await populateDataBase()
})

afterAll(async () => {
    await clearDataBase()
    await populateDataBase()
})

const userTest = {
    name: "User Test Base",
    username: "usertest_base",
    email: "usertest.base@email.com",
    password: "passwordTest"
}

describe("Create User", () => {

    beforeEach(() => {
        usersRepository = new UsersRepository()
        createUserUseCase = new CreateUserUseCase(usersRepository)
    })

    it("Should be able to create a new User", async () => {

        let newUser = await createUserUseCase.execute({
            name: userTest.name,
            username: userTest.username,
            email: userTest.email,
            password: userTest.password
        })

        let findUserCreated = await usersRepository.findByEmail(userTest.email)

        expect(findUserCreated.email).toEqual(userTest.email)
    })

    it("Should not be able to create a new User with already registered username", async () => {

        await expect(createUserUseCase.execute({
            name: "User Two",
            username: userTest.username,
            email: "usertwo.test@email.com",
            password: "mypassword"
        })).rejects.toEqual(new AppError("User already exists!"))
    })

    it("Should not be able to create a new User with already registered email", async () => {

        await expect(createUserUseCase.execute({
            name: "User Three",
            username: "userthree_test",
            email: userTest.email,
            password: "mypassword"
        })).rejects.toEqual(new AppError("User already exists!"))
    })
})