import { AliveController } from "@modules/alive/aliveController"
import { Router } from "express"

export const aliveRouter = Router()

const aliveController = new AliveController()
aliveRouter.get("/", aliveController.handle)