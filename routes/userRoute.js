import { Router } from "express"
import userController from "../controllers/userController.js"
import checkAuth from "../middlewares/checkAuth.js"
import handleValidationError from '../error/handleValidationError.js'
import { authValidation } from "../validations/User.js"

const router = new Router()

router.get('/check', checkAuth, userController.check)
router.post('/register', authValidation, handleValidationError, userController.register)
router.post('/login', authValidation, handleValidationError, userController.login)
router.patch('/reset', userController.update)
router.delete('/remove/:id', userController.remove)

export default router