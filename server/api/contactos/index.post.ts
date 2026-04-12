import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

  const body = await readBody(event)

  const contacto = await prisma.contacto.create({
    data: {
      nombre: body.nombre,
      telefono: body.telefono
    }
  })

  return contacto
})