import { userDefault } from "@database/seed"
import { UsersRepository } from "@modules/users/infra/prisma/repositories/UsersRepository"
import { AppError } from "@shared/errors/appError"
import { FindUserByUsernameUseCase } from "./findUserByUsernameUseCase"

let findUserByUsernameUseCase: FindUserByUsernameUseCase
let usersRepository: UsersRepository

describe("Find an User by username", () => {

    beforeEach(() => {
        usersRepository = new UsersRepository()
        findUserByUsernameUseCase = new FindUserByUsernameUseCase(usersRepository)
    })

    it("Should be able to show an user by username", async () => {

        const user = await findUserByUsernameUseCase.execute({ username: userDefault.username })
        expect(user).toHaveProperty("message")
        expect(user).toHaveProperty("user")
    })

    it("Should not be able to show an unregistered User", async () => {

        await expect(findUserByUsernameUseCase.execute({ username: "failed_user" })).rejects.toEqual(new AppError("User not found!", 403))
    })

    it("Should not be able to show an User by invalid param", async () => {

        await expect(findUserByUsernameUseCase.execute({ username: " " })).rejects.toEqual(new AppError("Invalid Parameters", 422))
    })
})