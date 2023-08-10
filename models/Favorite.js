import db from '../db.js'
import { DataTypes } from 'sequelize'

export const FavoriteModel = db.define('favorite', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
})