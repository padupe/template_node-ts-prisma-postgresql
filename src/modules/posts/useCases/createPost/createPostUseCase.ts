import "reflect-metadata"
import { ICreatePostDTO } from "@modules/posts/dtos/ICreatePostDTO"
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository"
import { inject, injectable } from "tsyringe"
import { IResponseCreatePostDTO } from "@modules/posts/dtos/IResponseCreatePostDTO"
import { validateBodyPosts } from "@validation/validateBodyPosts"
import { validateAuthorId } from "@validation/validateAuthorId"

@injectable()
export class CreatePostUseCase {
    constructor(
        @inject("PostsRepository")
        private postsRepository: IPostsRepository
    ){}

    async execute({ title, author_id }: ICreatePostDTO): Promise<IResponseCreatePostDTO>{

        validateBodyPosts({ title })

        const post = await this.postsRepository.create({
            title,
            author_id
        })

        const author: string = author_id !== undefined ? author_id : ""

        const user = await validateAuthorId(author)

        return {
            message: "Post registered",
            post: {
                id: post.id,
                title: post.id,
                author: user.username
            }
        }
    }
}