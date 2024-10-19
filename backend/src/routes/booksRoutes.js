import express from 'express'
import { booksController } from '../controllers/booksController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const booksRoutes = express.Router()

booksRoutes.get('/', authMiddleware, booksController.getAllBooks)
/* router.get('/:id', booksController.getBookById)
router.post('/', booksController.createBook)
router.put('/:id', booksController.updateBook)
router.delete('/:id', booksController.deleteBook) */

export { booksRoutes }
