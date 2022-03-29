import { Posts } from "@prisma/client";

export interface ICreateUserDTO {
    id?: string;
    name: string;
    username: string;
    email: string;
    password: string;
    posts?: Posts[];
}