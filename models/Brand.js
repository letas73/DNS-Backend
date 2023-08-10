import db from '../db.js'
import { DataTypes } from 'sequelize'

export const BrandModel = db.define('brand', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  logo: {
    type: DataTypes.STRING,
    allowNull: false
  }
})