import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id

  await prisma.registro.delete({
    where: { id },
  })

  return {
    mensaje: 'Usuario eliminado exitosamente'
  }
})
