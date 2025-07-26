import { defineEventHandler, readBody, createError } from 'h3'
import bcrypt from 'bcrypt'
import { connect, getDatabase, getCollection } from '~/server/utils/mongodb'

interface Usuario {
  _id: string
  nombre: string
  correo: string
  clave: string // la contraseña encriptada está en el campo 'clave'
}

interface LoginBody {
  correo: string
  clave: string
}

export default defineEventHandler(async (event) => {
  try {
    if (event.method !== 'POST') {
      throw createError({
        statusCode: 405,
        statusMessage: 'Method Not Allowed',
      })
    }

    const body = await readBody<LoginBody>(event)
    const { correo, clave } = body

    if (!correo || !clave) {
      return {
        ok: false,
        error: 'Correo y clave son requeridos',
      }
    }
    const client = await connect()
    const db = await getDatabase(client)
    const collection = await getCollection<Usuario>(db, 'Registro') // tu colección es "registro"

    const usuario = await collection.findOne({ correo})
    console.log('🔍 Usuario encontrado:', usuario)


    if (!usuario) {
      return {
        ok: false,
        error: 'Usuario no encontrado o credenciales incorrectas',
      }
    }

    const isPasswordValid = await bcrypt.compare(clave, usuario.clave)
    console.log('🔐 Contraseña válida:', isPasswordValid)

    if (!isPasswordValid) {
      return {
        ok: false,
        error: 'Contraseña incorrecta',
      }
    }

    return {
      ok: true,
      mensaje: 'Login exitoso',
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        correo: usuario.correo,
      },
    }
  } catch (error: any) {
    console.error('❌ Error en login:', error)

    return {
      ok: false,
      error: 'Error interno del servidor',
      detalles: error.message || String(error),
    }
  }
})
