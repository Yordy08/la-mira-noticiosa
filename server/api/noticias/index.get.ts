import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async () => {
  const noticias = await prisma.noticia.findMany({
    orderBy: { fecha: 'desc' }
  })

  return noticias
})
