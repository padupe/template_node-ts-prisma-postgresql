import { userDefault } from "@database/seed";
import { UsersRepository } from "@modules/users/infra/prisma/repositories/UsersRepository";
import { AppError } from "@shared/errors/appError";
import { AuthenticateUserUseCase } from "./authenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepository: UsersRepository

const username = userDefault.username
const password = String(userDefault.password)

describe("Authenticate an User at App", () => {

    beforeEach(() => {
        usersRepository = new UsersRepository()
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository)
    })

    it("Should be able to Authenticate an User", async () => {
        
        const auth = await authenticateUserUseCase.execute({username, password})

        expect(auth).toHaveProperty("message")
        expect(auth).toHaveProperty("token")
    })

    it("Should not be able to Authenticate an non existent User", async () => {

        await expect(authenticateUserUseCase.execute({
            username: "failure",
            password: "fail"
        })).rejects.toEqual(new AppError("User or Password Invalids", 401))
    })

    it("Should not be able to Authenticate an User with incorrect password", async () => {

        await expect(authenticateUserUseCase.execute({
            username,
            password: "failure"
        })).rejects.toEqual(new AppError("User or Password Invalids", 401))
    })

    it("Should not be able to Authenticate an User with incorrect username", async () => {

        await expect(authenticateUserUseCase.execute({
            username: "failure",
            password
        })).rejects.toEqual(new AppError("User or Password Invalids", 401))
    })
})