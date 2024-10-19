import express from 'express'
import { authRoutes } from './authRoutes.js'
import { booksRoutes } from './booksRoutes.js'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/books', booksRoutes)

export { router }
