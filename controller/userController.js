import {UserModel} from '../models/userModel.js'
import bcrypt from 'bcrypt'
import 'dotenv/config'
import jwt from 'jsonwebtoken'

export class UserController {
  constructor() {
    this.UserModel = UserModel
  }

  register = async (req, res) => {
    const {username, email, role, password} = req.body

    try {
      const salt = await bcrypt.genSalt(10)
      const hashed = await bcrypt.hash(password, salt)

      const user = await this.UserModel.register({
        username,
        email,
        role,
        password: hashed,
      })
      // Hay que quitar que muestre al usuario
      console.log(user)
      res.status(201).json({
        message: 'Usuario registrado correctamente',
        usuario: user,
      })
    } catch (error) {
      res.status(500).json({error: 'Error al registrar usuario :('})
    }
  }

  login = async (req, res) => {
    const {email, password} = req.body
    try {
      const user = await this.UserModel.getUserByEmail({email})
      if (!user.email) {
        return status(404).json({error: 'Error, credenciales incorrectas?'})
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password)
      if (!isPasswordCorrect) {
        return status(401).json({error: 'Error, credenciales incorrectas?'})
      }

      // Generar token
      const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      })

      res.status(200).json({token})
    } catch (error) {
      res.status(500).json({error: 'Error al intentar iniciar sesión'})
    }
  }
}
