import { PrismaClient } from "@prisma/client"

export const prisma = new PrismaClient({
    // Optional -> Query's Log's
    log: ['query', 'error']
})