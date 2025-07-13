import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id

  const noticia = await prisma.noticia.findUnique({
    where: { id }
  })

  if (!noticia) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Noticia no encontrada'
    })
  }

  return noticia
})
