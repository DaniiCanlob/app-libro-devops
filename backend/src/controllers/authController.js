import { z } from 'zod'
import { signToken } from '../utils/jwt.js'
import { authService } from '../services/authService.js'

const loginSchema = z.object({
  email: z.string().email('Formato del email no válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres')
})

const registerSchema = z.object({
  nombre: z.string().min(3, 'El nombre de usuario debe tener al menos 3 caracteres'),
  email: z.string().email('Formato del email no válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres')
})

const authController = {
  login: async (req, res) => {
    try {
      loginSchema.parse(req.body)

      const { email, password } = req.body

      const dataUser = await authService.findUserByEmail(email, password)
      const token = signToken({ id: dataUser.id_usuario })

      return res.status(200).cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60
      }).json({ user: dataUser, token })
    } catch (err) {
      return res.status(400).json({ message: 'Error al iniciar sesión', error: err.message })
    }
  },

  register: async (req, res) => {
    try {
      registerSchema.parse(req.body)
      const { nombre, email, password } = req.body
      const dataUser = await authService.createUser(nombre, email, password)
      return res.status(201).json({ dataUser })
    } catch (err) {
      return res.status(400).json({ message: 'No se pudo registrar el usuario', error: err.errors })
    }
  },

  logout: async (req, res) => {
    try {
      return res.status(200).clearCookie('token').json({ message: 'Sesión cerrada' })
    } catch (err) {
      return res.status(400).json({ message: 'Error al cerrar sesión', error: err.errors })
    }
  },

  user: async (req, res) => {
    try {
      const data = await authService.getUser()
      return res.status(200).json({ data })
    } catch (err) {
      return res.status(400).json({ message: 'Error al obtener los datos', error: err.errors })
    }
  }
}

export { authController }
