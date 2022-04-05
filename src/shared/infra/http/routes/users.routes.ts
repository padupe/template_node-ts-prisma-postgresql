import { CreateUserController } from "@modules/users/useCases/createUser/createUserController"
import { FindAllUsersController } from "@modules/users/useCases/findAllUsers/findAllUsersController"
import { FindByEmailController } from "@modules/users/useCases/findByEmail/findByEmailController"
import { FindByUsernameController } from "@modules/users/useCases/findByUsername/findByUsernameController"
import { Router } from "express"

export const usersRoutes = Router()

const createUserController = new CreateUserController()
const findAllUsersController = new FindAllUsersController()
const findByEmailController = new FindByEmailController()
const findByUsernameController = new FindByUsernameController()

usersRoutes.post("/", createUserController.handle)
usersRoutes.get("/", findAllUsersController.handle)
usersRoutes.get("/email/:email", findByEmailController.handle)
usersRoutes.get("/username/:username", findByUsernameController.handle)