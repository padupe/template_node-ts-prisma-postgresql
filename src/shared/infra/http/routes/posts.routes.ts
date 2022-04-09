import { CreatePostController } from "@modules/posts/useCases/createPost/createPostController"
import { Router } from "express"
import { ensureAuthenticateUser } from "@middlewares/ensureAuthenticateUser"

export const postsRoutes = Router()

const createPostController = new CreatePostController()

postsRoutes.post("/", ensureAuthenticateUser, createPostController.handle)