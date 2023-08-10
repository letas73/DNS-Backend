import db from '../db.js'
import { DataTypes } from 'sequelize'

export const DeviceInfoModel = db.define('device_info', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false
  }
})