import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { foto, titular, descripcion, fecha, categoria } = body

  if (!foto || !titular || !descripcion || !fecha || !categoria) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Todos los campos son obligatorios',
    })
  }

  const noticia = await prisma.noticia.create({
    data: {
      foto,
      titular,
      descripcion,
      fecha: new Date(fecha),
      categoria,
    },
  })

  return {
    mensaje: 'Noticia creada correctamente',
    noticia,
  }
})
