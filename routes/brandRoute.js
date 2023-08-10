import { Router } from "express";
import brandController from "../controllers/brandController.js"
import { checkRole } from "../middlewares/checkRole.js";

const router = new Router()

router.get('/', brandController.get)
router.post('/', checkRole('ADMIN'), brandController.create)
router.put('/:id', checkRole('ADMIN'), brandController.edit)
router.delete('/:id', checkRole('ADMIN'), brandController.remove)

export default router