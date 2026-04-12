import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

  const id = event.context.params?.id

  await prisma.contacto.delete({
    where: { id }
  })

  return {
    mensaje: 'Contacto eliminado correctamente'
  }

})