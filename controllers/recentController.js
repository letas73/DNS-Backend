import { RecentModel } from '../models/Recent.js'
import { RecentDeviceModel } from '../models/RecentDevice.js'

class RecentController {
  async get(req, res) {
    try {
      const userId = req.userId

      const recent = await RecentModel.findOne({ where: { userId } })
      const recentDevice = await RecentDeviceModel.findAll({
        where: { recentId: recent.id }, limit: 9,
        order: [
          ['updatedAt', 'DESC']
        ]
      })

      res.json(recentDevice)
    } catch (e) {
      res.status(500).json({
        message: e
      })
    }
  }

  async add(req, res) {
    try {
      const userId = req.userId
      const { title, price, image, deviceId } = req.body

      const recent = await RecentModel.findOne({ where: { userId } })

      const alreadyRecentDevice = await RecentDeviceModel.findOne({ where: { deviceId, recentId: recent.id } })

      if (!alreadyRecentDevice) {
        const recentDevice = await RecentDeviceModel.create({ title, price, image, deviceId, recentId: recent.id })
        return res.json(recentDevice)
      } else {
        return res.status(400).json({
          message: 'Товар уже добавлен в "недавно просмотренные товары"'
        })
      }
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

      RecentDeviceModel.findOne({ where: { id } }).then((result) => {
        return RecentDeviceModel.destroy({ where: { id } }).then((u) => {
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

export default new RecentController()