import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { router } from './src/routes/index.js'
import dotenv from 'dotenv'
/* import cloudinary from 'cloudinary'
import multer from 'multer' */

dotenv.config()

const app = express()
const port = process.env.PORT ?? 3000

/* cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

// Ruta para subir la foto de perfil
app.post('/upload', upload.single('profilePicture'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No se ha subido ningún archivo.')
  }

  // Subir la imagen a Cloudinary
  cloudinary.v2.uploader.upload_stream((error, result) => {
    if (error) return res.status(500).send(error)
    res.send(`Archivo subido exitosamente: ${result.secure_url}`)
  }).end(req.file.buffer)
}) */

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use('/api', router)

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`)
})
