import "reflect-metadata"
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository"
import { inject, injectable } from "tsyringe"
import { IResponseUpdatePostDTO } from "@modules/posts/dtos/IResponseUpdatePostDTO"
import { validateParamString } from "@validation/validateParam"
import { AppError } from "@shared/errors/appError"
import { ValidateAllowedAuthor } from "@validation/validateAllowedAuthor"
import { validateBodyPosts } from "@validation/validateBodyPosts"

@injectable()
export class UpdatePostByIdUseCase {
    constructor(
        @inject("PostsRepository")
        private postsRepository: IPostsRepository
    ){}

    async execute(post_id: string, title: string, author_id: string): Promise<IResponseUpdatePostDTO> {

        await validateParamString(post_id)

        const post = await this.postsRepository.find(post_id)

        if(!post) {
            throw new AppError("Post not found!", 400)
        }

        validateBodyPosts(title)

        //@ts-ignore
        await ValidateAllowedAuthor(post.user.id, author_id)

        const update = await this.postsRepository.update(post_id, title)

        return {
            message: "Post update",
            post: {
                id: update.id,
                new_title: update.title,
                //@ts-ignore
                author: post.user.username
            }
        }
    }
}