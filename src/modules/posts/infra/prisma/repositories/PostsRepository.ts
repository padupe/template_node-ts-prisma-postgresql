import { Posts, PrismaClient } from "@prisma/client"
import { prisma } from "@database/prismaClient"
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository"
import { ICreatePostDTO } from "@modules/posts/dtos/ICreatePostDTO"

export class PostsRepository implements IPostsRepository {
    private repository: PrismaClient

    constructor() {
        this.repository = prisma
    }

    async create({ title, author_id }: ICreatePostDTO): Promise<Posts> {
        const post = await this.repository.posts.create({
            data: {
                title,
                author: author_id as string
            }
        })

        return post
    }

    async find(post_id: string): Promise<Posts> {
        const post = await this.repository.posts.findUnique({
            where: {
                id: post_id
            },
            select: {
                id: true,
                title: true,
                user: {
                    select: {
                        username: true,
                        id: true
                    }
                }
            }
        })

        //@ts-ignore
        return post
    }

    async update(post_id: string, title: string): Promise<Posts> {
        const post = await this.repository.posts.update({
            where: {
                id: post_id
            },
            data: {
                title
            }
        })

        return post
    }

    async delete(post_id: string): Promise<void> {
        await this.repository.posts.delete({
            where: {
                id: post_id
            }
        })
    }  
}