import { prisma } from "@database/prismaClient";
import { UsersRepository } from "@modules/users/infra/prisma/repositories/UsersRepository";
import { FindAllUsersUseCase } from "./findAllUsersUseCase";

let findAllUsersUseCase: FindAllUsersUseCase
let usersRepository: UsersRepository

describe("List all Users registered at App", () => {

    beforeEach(() => {
        usersRepository = new UsersRepository()
        findAllUsersUseCase = new FindAllUsersUseCase(usersRepository)
    })

    it("Should be able to list all Users", async () => {

        let result = await findAllUsersUseCase.execute()
        let users = await prisma.users.findMany({})

        expect(result).toHaveLength(users.length)
        expect(users).toHaveLength(result.length)
    })

    it("Should not be able to list all Users", async () => {

        let result = await findAllUsersUseCase.execute()
        let users = await prisma.users.findMany({})

        expect(result).not.toHaveLength(users.length-1);
        expect(result).not.toHaveLength(0);
        expect(result).not.toHaveLength(users.length+1);
        expect(users).not.toHaveLength(result.length-1);
        expect(users).not.toHaveLength(0);
        expect(users).not.toHaveLength(result.length+1);
    })
})