import { Op } from "sequelize"
import { DeviceModel } from "../models/Device.js"
import { DeviceInfoModel } from '../models/DeviceInfo.js'

class DeviceController {
  async getAll(req, res) {
    try {
      const { typeId, brandId, limit, page, sortPrice } = req.query

      let offset = page * limit - limit
      let devices

      if (!brandId && !typeId) {
        devices = await DeviceModel.findAndCountAll({
          limit, offset,
          include: [{ model: DeviceInfoModel, as: 'info' }],
          order: [
            ['price', sortPrice]
          ]
        })
      }

      if (!brandId && typeId) {
        devices = await DeviceModel.findAndCountAll({
          where: { typeId }, limit, offset,
          include: [{ model: DeviceInfoModel, as: 'info' }],
          order: [
            ['price', sortPrice]
          ]
        })
      }

      if (brandId && !typeId) {
        devices = await DeviceModel.findAndCountAll({
          where: { brandId }, limit, offset,
          include: [{ model: DeviceInfoModel, as: 'info' }],
          order: [
            ['price', sortPrice]
          ]
        })
      }

      if (brandId && typeId) {
        devices = await DeviceModel.findAndCountAll({
          where: { typeId, brandId }, limit, offset,
          include: [{ model: DeviceInfoModel, as: 'info' }],
          order: [
            ['price', sortPrice]
          ]
        })
      }

      return res.json(devices)
    } catch (e) {
      res.status(500).json({
        message: e
      })
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params

      if (!id) {
        return res.status(400).json({
          message: 'Введите id товара'
        })
      }

      const device = await DeviceModel.findOne({
        where: { id },
        include: [{model: DeviceInfoModel, as: 'info'}]
      })

      if (!device) {
        return res.status(400).json({
          message: 'Товар не найден'
        })
      }

      res.json(device)
    } catch (e) {
      res.status(500).json({
        message: e
      })
    }
  }

  async create(req, res) {
    try {
      let { title, price, image, info, typeId, brandId } = req.body

      const device = await DeviceModel.create({
        title,
        price,
        image,
        typeId,
        brandId
      })

      if (info) {
        info = JSON.parse(info)
        info.forEach((i) => {
          DeviceInfoModel.create({
            title: i.title,
            text: i.text,
            deviceId: device.id
          })
        });
      }

      res.json(device)
    } catch (e) {
      res.status(500).json({
        message: e
      })
    }
  }

  async edit(req, res) {
    try {
      const { id } = req.params
      const { title, price, image, typeId, brandId, info } = req.body

      if (!id) {
        return res.status(400).json({
          message: 'Неверный id'
        })
      }

      const updatedDevice = await DeviceModel.update({ title, price, image, typeId, brandId }, { where: { id } })

      const device = await DeviceModel.findOne({
        where: { id },
        include: [{ model: DeviceInfoModel, as: 'info' }]
      })

      if (info) {
        const updatedInfo = await DeviceInfoModel.update({ title, text }, { where: { deviceId: device.id } })
      }

      res.json(device)
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

      const removeDeviceInfo = await DeviceInfoModel.destroy({ where: { deviceId: id } })

      DeviceModel.findOne({ where: { id } }).then((result) => {
        return DeviceModel.destroy({ where: { id } }).then((u) => {
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

export default new DeviceController()