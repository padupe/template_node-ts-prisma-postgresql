import { userDefault } from "@database/seed"
import { UsersRepository } from "@modules/users/infra/prisma/repositories/UsersRepository"
import { AppError } from "@shared/errors/appError"
import { FindByUsernameUseCase } from "./findByUsernameUseCase"

let findByUsernameUseCase: FindByUsernameUseCase
let usersRepository: UsersRepository

describe("Find an User by username", () => {

    beforeEach(() => {
        usersRepository = new UsersRepository()
        findByUsernameUseCase = new FindByUsernameUseCase(usersRepository)
    })

    it("Should be able to show an user by username", async () => {

        const user = await findByUsernameUseCase.execute({ username: userDefault.username })
        expect(user).toHaveProperty("message")
        expect(user).toHaveProperty("user")
    })

    it("Should not be able to show an unregistered User", async () => {

        await expect(findByUsernameUseCase.execute({ username: "failed_user" })).rejects.toEqual(new AppError("User not found!", 403))
    })

    it("Should not be able to show an User by invalid param", async () => {

        await expect(findByUsernameUseCase.execute({ username: " " })).rejects.toEqual(new AppError("Invalid Parameters", 422))
    })
})