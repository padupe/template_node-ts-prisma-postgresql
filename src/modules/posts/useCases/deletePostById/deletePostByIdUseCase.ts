import "reflect-metadata"
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository";
import { validateParamString } from "@validation/validateParam";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/appError";
import { validateAuthorId } from "@validation/validateAuthorId";
import { ValidateAllowedAuthor } from "@validation/validateAllowedAuthor";

@injectable()
export class DeletePostByIdUseCase {
    constructor(
        @inject("PostsRepository")
        private postsRepository: IPostsRepository
    ){}

    async execute(post_id: string, author_id: string): Promise<void> {

        await validateParamString(post_id)

        const post = await this.postsRepository.find(post_id)

        if(!post) {
            throw new AppError("Post not found!", 400)
        }

        //@ts-ignore
        await ValidateAllowedAuthor(post.user.id, author_id)

        await this.postsRepository.delete(post.id)
    }
}