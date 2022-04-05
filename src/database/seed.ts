import { prisma } from "./prismaClient"
import { hashPassword } from "../auth/bcrypt"

export const userDefault = {
    name: "User Test",
    username: "usertest",
    email: "usertest@email.com",
    password: process.env.PASSWORD_USER_DEFAULT
}

export async function clearDataBase() {
    await prisma.posts.deleteMany({ where: {} })
    await prisma.users.deleteMany({ where: {} })
}

export async function populateDataBase() {
    const userBase = await prisma.users.create({
        data: {
            name: userDefault.name,
            username: userDefault.username,
            email: userDefault.email,
            password: await hashPassword(String(userDefault.password))
        }
    })

    const userTest = await prisma.users.create({
        data: {
            name: "Sample User",
            username: "sampleusername",
            email: "sampleuser@email.com",
            password: await hashPassword(String(process.env.PASSWORD_USER_TEST))
        }
    })

    const posts = await prisma.posts.createMany({
        data: [
            { title: "Sample Title One", author: userBase.id },
            { title: "Sample Title Two", author: userBase.id },
            { title: "Sample Title Three", author: userBase.id }
        ]
    })
}

async function main() {
    await clearDataBase()
    await populateDataBase()
}
if (process.env.NODE_ENV !== 'test') {
    main()
      .catch((e) => {
        console.error(e);
        process.exit(1);
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
}