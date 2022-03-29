import { Users, PrismaClient } from "@prisma/client"
import { prisma } from "@database/prismaClient"
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository"
import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO"

export class UsersRepository implements IUsersRepository {
    private repository: PrismaClient

    constructor() {
        this.repository = prisma
    }

    async create({ name, username, email, password }: ICreateUserDTO): Promise<Users> {
        const user = await this.repository.users.create({
            data: {
                name,
                username,
                email,
                password
            }
        })

        return user
    }

    async findAll(): Promise<Users[]> {
        const users = await this.repository.users.findMany({})
        return users
    }

    async findByEmail(email: string): Promise<Users> {
        const user = await this.repository.users.findUnique({
            where: {
                email
            }
        })

        //@ts-ignore
        return user
    }

    async findByUsername(username: string): Promise<Users> {
        const user = await this.repository.users.findUnique({
            where: {
                username
            }
        })

        //@ts-ignore
        return user
    }
}