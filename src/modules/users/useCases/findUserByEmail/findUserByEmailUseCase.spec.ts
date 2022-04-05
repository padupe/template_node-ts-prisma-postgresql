import { userDefault } from "@database/seed"
import { UsersRepository } from "@modules/users/infra/prisma/repositories/UsersRepository"
import { AppError } from "@shared/errors/appError"
import { FindUserByEmailUseCase } from "./findUserByEmailUseCase"

let findUserByEmailUseCase: FindUserByEmailUseCase
let usersRepository: UsersRepository

describe("Find an User by email address", () => {

    beforeEach(() => {
        usersRepository = new UsersRepository()
        findUserByEmailUseCase = new FindUserByEmailUseCase(usersRepository)
    })

    it("Should be able to show an user by email address", async () => {

        const user = await findUserByEmailUseCase.execute({email:userDefault.email})
        expect(user).toHaveProperty("message")
        expect(user).toHaveProperty("user")
    })

    it("Should not be able to show an unregistered User", async () => {

        await expect(findUserByEmailUseCase.execute({email: "fail@fail.com"})).rejects.toEqual(new AppError("User not found!", 403))
    })

    it("Should not be able to show an User by invalid param", async () => {

        await expect(findUserByEmailUseCase.execute({email: " "})).rejects.toEqual(new AppError("Invalid Parameters", 422))
    })
})