import { Router } from "express"
import deviceController from "../controllers/deviceController.js"
import { checkRole } from "../middlewares/checkRole.js"

const router = new Router()

router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)
router.post('/', checkRole('ADMIN'), deviceController.create)
router.put('/:id', checkRole('ADMIN'), deviceController.edit)
router.delete('/:id', checkRole('ADMIN'), deviceController.remove)

export default router