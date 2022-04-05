import { CreatePostController } from "@modules/posts/useCases/createPost/createPostController"
import { Router } from "express"

export const postsRoutes = Router()

const createPostController = new CreatePostController()

postsRoutes.post("/", createPostController.handle)