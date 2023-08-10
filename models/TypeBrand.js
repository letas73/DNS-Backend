import db from '../db.js'
import { DataTypes } from 'sequelize'

export const TypeBrandModel = db.define('type_brand', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
})