import { Router } from "express";
import typeController from "../controllers/typeController.js"
import { checkRole } from "../middlewares/checkRole.js";

const router = new Router()

router.get('/', typeController.get)
router.post('/', checkRole('ADMIN'), typeController.create)
router.put('/:id', checkRole('ADMIN'), typeController.edit)
router.delete('/:id', checkRole('ADMIN'), typeController.remove)

export default router