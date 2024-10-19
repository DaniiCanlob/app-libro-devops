import { booksService } from '../services/booksService.js'

const booksController = {
  getAllBooks: async (req, res) => {
    try {
      const data = await booksService.getAllBooks()
      return res.status(200).json({ data })
    } catch (err) {
      return res.status(400).json({ message: 'Error al obtener los libros', error: err.errors })
    }
  }
}

export { booksController }
