import { AuthenticateUserController } from "@modules/users/useCases/authenticateUser/authenticateUserController"
import { Router } from "express"

export const authenticateRoutes = Router()

const authenticateUserController = new AuthenticateUserController()

authenticateRoutes.post("/", authenticateUserController.handle)