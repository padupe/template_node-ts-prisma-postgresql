import { Router } from "express"
import { authenticateRoutes } from "./authenticate.routes"
import { postsRoutes } from "./posts.routes"
import { usersRoutes } from "./users.routes"

export const router = Router()

router.use("/users", usersRoutes)
router.use("/authenticate", authenticateRoutes)
router.use("/posts", postsRoutes)