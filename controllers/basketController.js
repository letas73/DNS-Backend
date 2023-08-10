import { BasketModel } from '../models/Basket.js'
import { BasketDeviceModel } from '../models/BasketDevice.js'
import { DeviceModel } from '../models/Device.js'

class BasketController {
  async show(req, res) {
    try {
      const userId = req.userId

      const basket = await BasketModel.findOne({ where: { userId } })
      const basketDevices = await BasketDeviceModel.findAll({ where: { basketId: basket.id } })
      
      res.json(basketDevices)
    } catch (e) {
      res.status(500).json({
        message: e
      })
    }
  }

  async add(req, res) {
    try {
      const userId = req.userId
      const { deviceId, title, image, price } = req.body

      const basket = await BasketModel.findOne({ where: { userId } })

      const alreadyBasketDevice = await BasketDeviceModel.findOne({ where: { deviceId, basketId: basket.id } })

      if (alreadyBasketDevice) {
        const device = await BasketDeviceModel.update({ count: alreadyBasketDevice.count+=1 },
          { where: { deviceId, basketId: basket.id } }
        )
      } else {
        const device = await BasketDeviceModel.create({ basketId: basket.id, deviceId, title, price, image, count: 1 })
      }

      const basketDevice = await BasketDeviceModel.findOne({ where: { deviceId, basketId: basket.id } })

      res.json(basketDevice)
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

      BasketDeviceModel.findOne({ where: { id } }).then((result) => {
        return BasketDeviceModel.destroy({ where: { id } }).then((u) => {
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

export default new BasketController()