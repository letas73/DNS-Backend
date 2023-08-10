import { UserModel } from './User.js'
import { DeviceModel } from './Device.js'
import { FavoriteModel } from './Favorite.js'
import { FavoriteDeviceModel } from './FavoriteDevice.js'
import { RecentModel } from './Recent.js'
import { RecentDeviceModel } from './RecentDevice.js'
import { BasketModel } from './Basket.js'
import { BasketDeviceModel } from './BasketDevice.js'
import { DeviceInfoModel } from './DeviceInfo.js'
import { TypeModel } from './Type.js'
import { BrandModel } from './Brand.js'
import { TypeBrandModel } from './TypeBrand.js'

UserModel.hasOne(BasketModel)
BasketModel.belongsTo(UserModel)

UserModel.hasOne(FavoriteModel)
FavoriteModel.belongsTo(UserModel)

UserModel.hasOne(RecentModel)
RecentModel.belongsTo(UserModel)

BasketModel.hasMany(BasketDeviceModel)
BasketDeviceModel.belongsTo(BasketModel)

FavoriteModel.hasMany(FavoriteDeviceModel)
FavoriteDeviceModel.belongsTo(FavoriteModel)

RecentModel.hasMany(RecentDeviceModel)
RecentDeviceModel.belongsTo(RecentModel)

DeviceModel.hasOne(BasketDeviceModel)
BasketDeviceModel.belongsTo(DeviceModel)

DeviceModel.hasOne(RecentDeviceModel)
RecentDeviceModel.belongsTo(DeviceModel)

DeviceModel.hasOne(FavoriteDeviceModel)
FavoriteDeviceModel.belongsTo(DeviceModel)

DeviceModel.hasMany(DeviceInfoModel, { as: 'info' })
DeviceInfoModel.belongsTo(DeviceModel)

TypeModel.hasMany(DeviceModel)
DeviceModel.belongsTo(TypeModel)

BrandModel.hasMany(DeviceModel)
DeviceModel.belongsTo(BrandModel)

TypeModel.belongsToMany(BrandModel, { through: TypeBrandModel })
BrandModel.belongsToMany(TypeModel, { through: TypeBrandModel })

export const models = {
  UserModel,
  DeviceModel,
  DeviceInfoModel,
  BasketModel,
  BasketDeviceModel,
  FavoriteModel,
  FavoriteDeviceModel,
  RecentModel,
  RecentDeviceModel,
  TypeModel,
  BrandModel,
  TypeBrandModel
}