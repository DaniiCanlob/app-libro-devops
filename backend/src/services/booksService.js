import { modelBooks } from '../models/modelBooks.js'

const booksService = {
  getAllBooks: async () => {
    const data = await modelBooks.findAllBooks()
    return data
  }
}

export { booksService }
