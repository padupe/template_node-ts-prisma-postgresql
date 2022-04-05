import { Users } from "@prisma/client"
import { ICreateUserDTO } from "../dtos/ICreateUserDTO"

export interface IUsersRepository {
    create({ name, username, email, password }: ICreateUserDTO): Promise<Users>
    findAll(): Promise<Users[]>
    findByEmail(email: string): Promise<Users>
    findById(user_id: string): Promise<Users>
    findByUsername(username: string): Promise<Users>
}