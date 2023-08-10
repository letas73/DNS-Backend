import db from '../db.js'
import { DataTypes } from 'sequelize'

export const BasketModel = db.define('basket', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
})