import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

  const id = event.context.params?.id
  const body = await readBody(event)

  return await prisma.contacto.update({
    where: { id },
    data: {
      nombre: body.nombre,
      telefono: body.telefono,
      estado: body.estado
    }
  })

})