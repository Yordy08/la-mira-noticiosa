// server/api/registro.post.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { nombre, correo, clave } = body

  if (!nombre || !correo || !clave) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Todos los campos son obligatorios',
    })
  }

  const usuarioExistente = await prisma.Registro.findUnique({
    where: { correo },
  })

  if (usuarioExistente) {
    throw createError({
      statusCode: 409,
      statusMessage: 'Este correo ya está registrado',
    })
  }

  const hashedClave = await bcrypt.hash(clave, 10)

  const nuevoUsuario = await prisma.Registro.create({
    data: {
      nombre,
      correo,
      clave: hashedClave,
    },
  })

  return {
    mensaje: 'Usuario registrado exitosamente',
    usuario: {
      id: nuevoUsuario.id,
      nombre: nuevoUsuario.nombre,
      correo: nuevoUsuario.correo,
      creadoEn: nuevoUsuario.creadoEn,
    },
  }
})
