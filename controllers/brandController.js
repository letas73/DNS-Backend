import { BrandModel } from "../models/Brand.js"

class BrandController {
  async get(req, res) {
    try {
      const brands = await BrandModel.findAll()

      res.json(brands)
    } catch (e) {
      res.status(500).json({
        message: e
      })
    }
  }

  async create(req, res) {
    const { name, logo } = req.body

    if (!name) {
      return res.status(400).json({
        message: 'Введите название типа устройства'
      })
    }

    const brand = await BrandModel.create({ name, logo })

    res.json(brand)
  }

  async edit(req, res) {
    try {
      const { id } = req.params
      const { name, logo } = req.body

      if (!id) {
        return res.status(400).json({
          message: 'Неверный id'
        })
      }

      const updatedBrand = await BrandModel.update({ name, logo }, { where: { id } })

      const brand = await BrandModel.findOne({ where: { id } })

      res.json(brand)
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

      BrandModel.findOne({ where: { id } }).then((result) => {
        return BrandModel.destroy({ where: { id } }).then((u) => {
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

export default new BrandController()