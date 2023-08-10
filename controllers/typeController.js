import { TypeModel } from "../models/Type.js"

class TypeController {
  async get(req, res) {
    try {
      const types = await TypeModel.findAll()

      res.json(types)
    } catch (e) {
      res.status(500).json({
        message: e
      })
    }
  }

  async create(req, res) {
    const { name } = req.body

    if (!name) {
      return res.status(400).json({
        message: 'Введите название типа устройства'
      })
    }

    const type = await TypeModel.create({ name })

    res.json(type)
  }

  async edit(req, res) {
    try {
      const { id } = req.params
      const { name } = req.body

      if (!id) {
        return res.status(400).json({
          message: 'Неверный id'
        })
      }

      const updatedType = await TypeModel.update({ name }, { where: { id } })

      const type = await TypeModel.findOne({ where: { id } })

      res.json(type)
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

      TypeModel.findOne({ where: { id } }).then((result) => {
        return TypeModel.destroy({ where: { id } }).then((u) => {
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

export default new TypeController()