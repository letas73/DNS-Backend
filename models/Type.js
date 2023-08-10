import db from '../db.js'
import { DataTypes } from 'sequelize'

export const TypeModel = db.define('type', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
})