import jwt from 'jsonwebtoken'

export const checkRole = function (role) {
  return function (req, res, next) {

    if (req.method === 'OPTIONS') {
      next()
    }

    try {
      const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

      if (!token) {
        return res.status(401).json({
          message: 'Не авторизован'
        })
      }

      const decoded = jwt.verify(token, process.env.JWT_KEY)

      if (decoded.role !== role) {
        return res.status(403).json({
          message: 'Нет доступа'
        })
      }

      req.userId = decoded.id
      next()
    } catch (e) {
      res.status(401).json({
        message: 'Пользователь не авторизован'
      })
    }
  }
}