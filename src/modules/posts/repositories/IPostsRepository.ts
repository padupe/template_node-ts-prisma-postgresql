import { Posts } from "@prisma/client"
import { ICreatePostDTO } from "../dtos/ICreatePostDTO"

export interface IPostsRepository {
    create({ title, author_id }: ICreatePostDTO): Promise<Posts>
    find(post_id: string): Promise<Posts>
    update(post_id: string, title: string): Promise<Posts>
    delete(post_id: string): Promise<void>
}