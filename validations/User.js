import { body } from "express-validator"

export const authValidation = [
  body('email', 'Неверный email').isEmail(),
  body('password', 'Пароль должен состоять минимум из 4 символов').isLength({ min: 4 }),
]