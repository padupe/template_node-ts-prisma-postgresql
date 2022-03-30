import { CreateUserController } from "@modules/users/useCases/createUser/createUserController"
import { FindAllUsersController } from "@modules/users/useCases/findAllUsers/findAllUsersController"
import { Router } from "express"

export const usersRoutes = Router()

const createUserController = new CreateUserController()
const findAllUsersController = new FindAllUsersController()

usersRoutes.post("/", createUserController.handle)
usersRoutes.get("/", findAllUsersController.handle)