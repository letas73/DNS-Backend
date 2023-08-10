import db from '../db.js'
import { DataTypes } from 'sequelize'

export const RecentModel = db.define('recent', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
})