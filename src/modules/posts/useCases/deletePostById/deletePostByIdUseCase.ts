import "reflect-metadata"
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository"
import { validateParamString } from "@validation/validateParam"
import { inject, injectable } from "tsyringe"
import { AppError } from "@shared/errors/appError"
import { ValidateAllowedAuthor } from "@validation/validateAllowedAuthor"
import { IResponseDeletePostDTO } from "@modules/posts/dtos/IResponseDeletePostDTO"
import { logging } from "@utils/logging"

@injectable()
export class DeletePostByIdUseCase {
    constructor(
        @inject("PostsRepository")
        private postsRepository: IPostsRepository
    ){}

    async execute(post_id: string, author_id: string): Promise<IResponseDeletePostDTO> {

        await validateParamString(post_id)

        const post = await this.postsRepository.find(post_id)

        if(!post) {
            logging.error(`deletePostByIdUseCase: Post ${post_id} not found!`)
            throw new AppError("Post not found!", 400)
        }

        //@ts-ignore
        await ValidateAllowedAuthor(post.user.id, author_id)

        await this.postsRepository.delete(post.id)

        logging.debug("deletePostByIdUseCase: Post deleted successfully")

        return {
            message: "Post deleted",
            post: {
                id: post.id,
                title: post.title,
                //@ts-ignore
                author: post.user.username
            }
        }
    }
}