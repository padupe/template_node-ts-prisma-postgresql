import { Router } from "express"
import { postsRoutes } from "./posts.routes"
import { usersRoutes } from "./users.routes"

export const router = Router()

router.use("/users", usersRoutes)
router.use("/posts", postsRoutes)