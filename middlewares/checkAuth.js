import jwt from 'jsonwebtoken'

export default (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY)

      req.userId = decoded.id
    } catch (e) {
      return res.status(403).json({
        message: "Не авторизован"
      })
    }
  } else {
    return res.status(403).json({
      message: "Не авторизован"
    })
  }

  next()
}