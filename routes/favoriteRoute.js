import { Router } from "express";
import favoriteController from "../controllers/favoriteController.js"
import checkAuth from "../middlewares/checkAuth.js"

const router = new Router()

router.get('/', checkAuth, favoriteController.show)
router.post('/', checkAuth, favoriteController.add)
router.delete('/:id', favoriteController.remove)

export default router