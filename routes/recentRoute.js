import { Router } from "express"
import recentController from "../controllers/recentController.js"
import checkAuth from "../middlewares/checkAuth.js"

const router = new Router()

router.get('/', checkAuth, recentController.get)
router.post('/', checkAuth, recentController.add)
router.delete('/:id', checkAuth, recentController.remove)

export default router