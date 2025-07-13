import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id

  await prisma.noticia.delete({
    where: { id }
  })

  return {
    mensaje: 'Noticia eliminada correctamente'
  }
})
