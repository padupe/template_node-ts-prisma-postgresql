import { userDefault } from "@database/seed"
import { UsersRepository } from "@modules/users/infra/prisma/repositories/UsersRepository"
import { AppError } from "@shared/errors/appError"
import { FindUserByIdUseCase } from "./findUserByIdUseCase"

let findUserByIdUseCase: FindUserByIdUseCase
let usersRepository: UsersRepository

describe("Find an User by username", () => {

    beforeEach(() => {
        usersRepository = new UsersRepository()
        findUserByIdUseCase = new FindUserByIdUseCase(usersRepository)
    })

    it("Should be able to show an user by username", async () => {

        const userTest = await usersRepository.findByUsername(userDefault.username)

        const user = await findUserByIdUseCase.execute(userTest.id)
        expect(user).toHaveProperty("id")
        expect(user).toHaveProperty("username")
    })

    it("Should not be able to show an unregistered User", async () => {

        await expect(findUserByIdUseCase.execute("failed_user")).rejects.toEqual(new AppError("User not found!", 403))
    })

    it("Should not be able to show an User by invalid param", async () => {

        await expect(findUserByIdUseCase.execute(" ")).rejects.toEqual(new AppError("Invalid Parameters", 422))
    })
})