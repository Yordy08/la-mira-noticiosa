import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  const body = await readBody(event)

  const noticia = await prisma.noticia.update({
    where: { id },
    data: {
      ...body,
      fecha: body.fecha ? new Date(body.fecha) : undefined
    },
  })

  return {
    mensaje: 'Noticia actualizada',
    noticia,
  }
})
