import { Router } from "express";
import basketController from "../controllers/basketController.js"
import checkAuth from "../middlewares/checkAuth.js";

const router = new Router()

router.get('/', checkAuth, basketController.show)
router.post('/', checkAuth, basketController.add)
router.delete('/:id', basketController.remove)

export default router