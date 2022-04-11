import "reflect-metadata"
import { validateParamString } from "@validation/validateParam"
import { IResponseFindPostByIdDTO } from "@modules/posts/dtos/IResponseFindPostByIdDTO"
import { inject, injectable } from "tsyringe"
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository"
import { AppError } from "@shared/errors/appError"

@injectable()
export class FindPostByIdUseCase {
    constructor(
        @inject("PostsRepository")
        private postsRepository: IPostsRepository
    ){}

    async execute(post_id: string): Promise<IResponseFindPostByIdDTO> {

        validateParamString(post_id)

        const post = await this.postsRepository.find(post_id)

        if(!post){
            throw new AppError("Post not found!", 400)
        }

        return {
            id: post.id,
            title: post.title,
            author: {
                //@ts-ignore
                id: post.user.id,
                //@ts-ignore
                username: post.user.username
            }
        }
    }
}