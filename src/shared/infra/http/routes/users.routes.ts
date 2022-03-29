import { CreateUserController } from "@modules/users/useCases/createUser/createUserController"
import { Router } from "express"

export const usersRoutes = Router()

const createUserController = new CreateUserController()

usersRoutes.post("/", createUserController.handle)