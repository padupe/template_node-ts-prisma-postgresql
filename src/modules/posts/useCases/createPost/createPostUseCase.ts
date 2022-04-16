import "reflect-metadata"
import { ICreatePostDTO } from "@modules/posts/dtos/ICreatePostDTO"
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository"
import { inject, injectable } from "tsyringe"
import { IResponseCreatePostDTO } from "@modules/posts/dtos/IResponseCreatePostDTO"
import { validateBodyPosts } from "@validation/validateBodyPosts"
import { validateAuthorId } from "@validation/validateAuthorId"
import { logging } from "utils/logging"

@injectable()
export class CreatePostUseCase {
    constructor(
        @inject("PostsRepository")
        private postsRepository: IPostsRepository
    ){}

    async execute({ title, author_id }: ICreatePostDTO): Promise<IResponseCreatePostDTO>{

        validateBodyPosts(title)

        logging.debug(`createPostUseCase: title: ${title} | author_id: ${author_id}.`)

        const post = await this.postsRepository.create({
            title,
            author_id
        })

        const author: string = author_id !== undefined ? author_id : ""

        const user = await validateAuthorId(author)

        logging.debug("createPostUseCase: New Post Registered")

        return {
            message: "Post registered",
            post: {
                id: post.id,
                title: post.title,
                author: user.username
            }
        }
    }
}