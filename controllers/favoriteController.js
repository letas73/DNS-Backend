import { FavoriteModel } from '../models/Favorite.js'
import { FavoriteDeviceModel } from '../models/FavoriteDevice.js'

class FavoriteController {
  async show(req, res) {
    try {
      const userId = req.userId

      const favorite = await FavoriteModel.findOne({ where: { userId } })
      const favoriteDevices = await FavoriteDeviceModel.findAll({ where: { favoriteId: favorite.id } })

      res.json(favoriteDevices)
    } catch (e) {
      res.status(500).json({
        message: e
      })
    }
  }

  async add(req, res) {
    try {
      const userId = req.userId
      const { deviceId, title, price, image } = req.body

      const favorite = await FavoriteModel.findOne({ where: { userId } })
      const favoriteDevice = await FavoriteDeviceModel.create({ favoriteId: favorite.id, deviceId, title, price, image })

      res.json(favoriteDevice)
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

      FavoriteDeviceModel.findOne({ where: { id } }).then((result) => {
        return FavoriteDeviceModel.destroy({ where: { id } }).then((u) => {
          return res.json(result)
        })
      })
    } catch (e) {
      res.status(500).json({
        message: e
      })
    }
  }
}

export default new FavoriteController()