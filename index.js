import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import sequelize from './db.js'
import { models } from './models/index.js'
import multer from 'multer'
import routes from './routes/index.js'

const app = express()

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads')
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage })

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))

app.post('/upload', upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`
  })
})

app.use('/api', routes)

const startedApp = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server started on port: ${process.env.PORT}`);
    })
  } catch (e) {
    console.log(e);
  }
}

startedApp()