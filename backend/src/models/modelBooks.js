import { db } from '../config/db.js'

const modelBooks = {
  findAllBooks: async () => {
    const [books] = await db.query('SELECT * FROM libros')
    return books
  }
}

export { modelBooks }
