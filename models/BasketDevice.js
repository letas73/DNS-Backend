import db from '../db.js'
import { DataTypes } from 'sequelize'

export const BasketDeviceModel = db.define('basket_device', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  count: {
    type: DataTypes.INTEGER
  }
})