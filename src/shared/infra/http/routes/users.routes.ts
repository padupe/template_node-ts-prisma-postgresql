import { CreateUserController } from "@modules/users/useCases/createUser/createUserController"
import { FindAllUsersController } from "@modules/users/useCases/findAllUsers/findAllUsersController"
import { FindUserByEmailController } from "@modules/users/useCases/findUserByEmail/findUserByEmailController"
import { FindUserByUsernameController } from "@modules/users/useCases/findUserByUsername/findUserByUsernameController"
import { Router } from "express"

export const usersRoutes = Router()

const createUserController = new CreateUserController()
const findAllUsersController = new FindAllUsersController()
const findUserByEmailController = new FindUserByEmailController()
const findUserByUsernameController = new FindUserByUsernameController()

usersRoutes.post("/", createUserController.handle)
usersRoutes.get("/", findAllUsersController.handle)
usersRoutes.get("/email/:email", findUserByEmailController.handle)
usersRoutes.get("/username/:username", findUserByUsernameController.handle)