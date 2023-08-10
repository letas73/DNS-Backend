import { UserModel } from '../models/User.js'
import { BasketModel } from '../models/Basket.js'
import { FavoriteModel } from '../models/Favorite.js'
import { RecentModel } from '../models/Recent.js' 
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const generateToken = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.JWT_KEY, { expiresIn: '24h' })
}

class UserController {
  async register(req, res) {
    try {
      const { email, password, role } = req.body

      const candidate = await UserModel.findOne({ where: { email } })

      if (candidate) {
        return res.status(403).json({
          message: 'Пользователь с таким email уже существует'
        })
      }

      const hashPassword = await bcrypt.hash(password, 6)

      const user = await UserModel.create({
        email,
        password: hashPassword,
        role
      })

      const basket = await BasketModel.create({ userId: user.id })
      const favorite = await FavoriteModel.create({ userId: user.id })
      const recent = await RecentModel.create({ userId: user.id })

      const token = generateToken(user.id, user.email, user.role)

      res.json({
        user,
        token
      })
    } catch (e) {
      res.status(500).json({
        message: e
      })
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body

      const user = await UserModel.findOne({ where: { email } })
      
      if (!user) {
        return res.status(400).json({
          message: 'Пользователь с таким email не найден'
        })
      }

      const validatePassword = bcrypt.compareSync(password, user.password)

      if (!validatePassword) {
        return res.status(402).json({
          message: 'Неверный email или пароль'
        })
      }

      const token = generateToken(user.id, user.email, user.role)

      res.json({
        user,
        token
      })
    } catch (e) {
      res.status(500).json({
        message: e
      })
    }
  }

  async update(req, res) {
    try {
      const { email, password, password_2 } = req.body

      const user = await UserModel.findOne({ where: {email} })

      if (!user) {
        return res.status(403).json({
          message: 'Неверный email'
        })
      }

      const truePassword = password === password_2

      if (!truePassword) {
        return res.status(400).json({
          message: 'Пароли не совпадают'
        })
      }

      const hashPassword = await bcrypt.hash(password, 6)

      const updateUser = await UserModel.update({ password: hashPassword }, { where: { email } })

      const newUser = await UserModel.findOne({ where: { email } })

      res.json({user: newUser})
    } catch (e) {
      res.status(500).json({
        message: e
      })
    }
  }

  async remove(req, res) {
    try {
      const { id } = req.params

      if (!id) {
        return res.status(400).json({
          message: 'Неверный id'
        })
      }

      const user = await UserModel.destroy({ where: { id } })

      res.json(user)
    } catch (e) {
      res.status(500).json({
        message: e
      })
    }
  }
  
  async check(req, res) {
    try {
      const user = await UserModel.findOne({ where: { id: req.userId } })

      if (!user) {
        return res.status(400).json({
          message: 'Пользователь не найден'
        })
      }

      res.json({user})
    } catch (e) {
      res.status(500).json({
        message: e
      })
    }
  }
}

export default new UserController()