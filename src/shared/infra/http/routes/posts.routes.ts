import { CreatePostController } from "@modules/posts/useCases/createPost/createPostController"
import { Router } from "express"
import { ensureAuthenticateUser } from "@middlewares/ensureAuthenticateUser"
import { DeletePostByIDController } from "@modules/posts/useCases/deletePostById/deletePostByIdController"
import { FindPostByIdController } from "@modules/posts/useCases/findPostById/findPostByIdController"

export const postsRoutes = Router()

const createPostController = new CreatePostController()
const findPostByIdController = new FindPostByIdController()
const deletePostByIdController = new DeletePostByIDController()

postsRoutes.post("/", ensureAuthenticateUser, createPostController.handle)
postsRoutes.get("/:id", findPostByIdController.handle)
postsRoutes.delete("/:id", ensureAuthenticateUser, deletePostByIdController.handle)