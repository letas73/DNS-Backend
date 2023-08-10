import { Router } from 'express'
import UserRoute from './userRoute.js'
import DeviceRoute from './deviceRoute.js'
import BasketRoute from './basketRoute.js'
import FavoriteRoute from './favoriteRoute.js'
import TypeRoute from './typeRoute.js'
import BrandRoute from './brandRoute.js'
import RecentRoute from './recentRoute.js'

const router = new Router()

router.use('/user', UserRoute)
router.use('/device', DeviceRoute)
router.use('/basket', BasketRoute)
router.use('/favorite', FavoriteRoute)
router.use('/type', TypeRoute)
router.use('/brand', BrandRoute)
router.use('/recent', RecentRoute)

export default router