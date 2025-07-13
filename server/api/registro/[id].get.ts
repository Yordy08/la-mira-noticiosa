import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID no proporcionado',
    })
  }

  const usuario = await prisma.registro.findUnique({
    where: { id },
    select: {
      id: true,
      nombre: true,
      correo: true,
      creadoEn: true
    }
  })

  if (!usuario) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Usuario no encontrado',
    })
  }

  return usuario
})
